import * as cheerio from "cheerio";

const LABEL = "TIMER";
console.time(LABEL);

// const URL = "https://demotywatory.pl/losuj";
const URL = "https://demotywatory.pl";
const query = "img.demot";
const images = [];

(async () => {
    const request = await fetch(URL);
    const html = await request.text();

    const $ = cheerio.load(html);
    $(query).each((i, el) => {
        const link = $(el).attr("src");
        images.push(link);
    });

    console.log(images);
    console.timeEnd(LABEL);
})();