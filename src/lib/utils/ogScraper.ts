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
    
    // Fallback to screenshot if no OG image found
    if (!ogImage) {
      // Use a free screenshot service API
      return `https://image.thum.io/get/width/1200/crop/630/noanimate/${url}`;
    }
    
    return ogImage || "";
  } catch (error) {
    console.error(`Failed to scrape OG image for ${url}:`, error);
    return "";
  }
}
