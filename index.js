const puppeteer = require("puppeteer");
const fs = require("fs");
const db = require("./config/db");
const Character = require("./Model/Character");

(async () => {
  try {
    await db.connect();
  } catch (e) {
    console.error(e);
  }

  const browser = await puppeteer.launch({
    headless: false,
    executablePath:
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  });
  const page = await browser.newPage();
  var informationCharacters = [];
  const homeUrl = "https://tftactics.gg/champions";

  page.setViewport({ width: 1280, height: 720 });

  await page.goto(homeUrl);

  console.time("Crawl");
  let characters = await page.evaluate(() => {
    let temp = document.querySelectorAll(".characters-item");
    let res = [];
    for (let i of temp) {
      res.push(i.href);
    }
    return res;
  });

  for (let i of characters) {
    await page.goto(i);
    let information = await page.evaluate(() => {
      let res = {};
      res["icon"] = document.querySelector(".character-image").src;
      res["name"] = document
        .querySelector(".character-portrait h1")
        .outerText.split("TFT ")
        .join("");
      let items = document.querySelector(".character-items");
      items = items.querySelectorAll(".character-icon");
      res["items"] = Array.from(items).map((x) => x.src);
      let stats = document.querySelector(".stats-list");
      stats = stats.querySelectorAll("li");
      let information = {};
      for (i of stats) {
        let kq = i.outerText.split(":");
        information[kq[0]] = kq[1];
      }
      res["information"] = information;
      information = {};
      let abilities = document.querySelectorAll(".character-ability");
      information["name"] = abilities[0].querySelector(
        ".ability-description h2"
      ).textContent;
      information["type"] = abilities[0].querySelector(
        ".ability-description h4"
      ).textContent;
      information["detail"] = abilities[0].querySelector(
        ".ability-description p"
      ).textContent;
      information["bouns"] = Array.from(
        abilities[0].querySelectorAll(".ability-description li")
      ).map((x) => x.textContent);
      information["img"] = abilities[0].querySelector(".ability-image").src;

      res["origin"] = abilities[1].querySelector(
        ".ability-description h2"
      ).textContent;
      res["class"] = [];
      for (let i = 2; i < abilities.length; i++) {
        res["class"].push(
          abilities[i].querySelector(".ability-description h2").textContent
        );
      }
      return res;
    });
    let character = new Character(information);
    character.save(function (err) {
      if (err) console.error(err);
    });
  }

  console.timeEnd("Crawl");
  browser.close();
})();
