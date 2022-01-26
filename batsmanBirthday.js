const request = require("request");
const cheerio = require("cheerio");
const { text } = require("cheerio/lib/api/manipulation");
const url =
  "https://www.espncricinfo.com/series/india-in-south-africa-2021-22-1277060/south-africa-vs-india-3rd-odi-1277084/full-scorecard";
request(url, cb);
function cb(error, response, html) {
  if (error) {
    console.log("error");
  } else {
    extractHTML(html);
  }
}

function extractHTML(html) {
  let $ = cheerio.load(html);
  let batsmanArry = $(".table.batsman tbody tr a");
  let allBatters = "";
  for (let i = 0; i < batsmanArry.length; i++) {
    let hasclass = $(batsmanArry[i]).hasClass("extras");
    if (hasclass == false) {
      allBatters = $(batsmanArry[i]).text();
      let url = $(batsmanArry[i]).attr("href");
      url = "https://www.espncricinfo.com" + url;
      getBirthday(url, allBatters);
    }
  }
}
function getBirthday(url, allBatters) {
  request(url, cb);
  function cb(error, response, html) {
    if (error) {
      console.log("error");
    } else {
      extract(html);
    }
  }

  function extract(html) {
    let $ = cheerio.load(html);
    let birth = $(".player-card-description.gray-900");
    let date = "";
    date = $(birth[1]).text();
    console.log(allBatters);
    console.log(date);
  }
}
