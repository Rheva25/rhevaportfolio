import * as cheerio from "cheerio";

export async function scrapeOgImage(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" },
      next: { revalidate: 3600 }
    });
    if (!res.ok) return "";
    
    const html = await res.text();
    const $ = cheerio.load(html);
    
    let ogImage = $('meta[property="og:image"]').attr("content");
    if (!ogImage) {
      ogImage = $('meta[name="twitter:image"]').attr("content");
    }
    
    // Fallback to first image if no OG image
    if (!ogImage) {
      const firstImg = $('img').first().attr("src");
      if (firstImg) {
        if (firstImg.startsWith("http")) {
          ogImage = firstImg;
        } else if (firstImg.startsWith("/")) {
          const urlObj = new URL(url);
          ogImage = `${urlObj.origin}${firstImg}`;
        }
      }
    }
    
    return ogImage || "";
  } catch (error) {
    console.error(`Failed to scrape OG image for ${url}:`, error);
    return "";
  }
}
