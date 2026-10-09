const cheerio = require("cheerio");

async function test() {
  const url = "https://rheva-fe.vercel.app";
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" }
    });
    const html = await res.text();
    const $ = cheerio.load(html);
    let ogImage = $('meta[property="og:image"]').attr("content");
    console.log("OG:", ogImage);
    const firstImg = $('img').first().attr("src");
    console.log("First Img:", firstImg);
  } catch(e) {
    console.error(e);
  }
}
test();
