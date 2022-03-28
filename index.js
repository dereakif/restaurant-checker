const inquirer = require("inquirer");
const puppeteer = require("puppeteer-extra");
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

const rop = "republic-of-pancake-kadikoy-caferaga-mah-moda-istanbul";
const bento = "bento-noodles-kadikoy-rasimpasa-mah-istanbul";
const cro = "croissantci-kadikoy-osmanaga-mah-istanbul";
const rolls = "rolls-bowls-kadikoy-caferaga-mah-moda-istanbul";
const restaurantMap = { rop, bento, cro, rolls };

puppeteer.use(StealthPlugin());
const checkPage = async (url) => {
  const browser = await puppeteer.launch({ headless: true });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });
  const popup2 = await page.evaluate(
    () =>
      document.querySelector("div#alternative-restaurant-popup.vale")?.innerHTML
  );
  if (popup2) {
    console.log("CLOSED");
  } else {
    console.log("OPEN");
  }

  await browser.close();
};

inquirer
  .prompt([
    {
      type: "list",
      name: "restaurant",
      message: "Where do you want to eat?",
      choices: ["rop", "bento", "cro", "rolls"],
    },
  ])
  .then(({ restaurant }) => {
    const url = `https://www.yemeksepeti.com/${restaurantMap[restaurant]}`;
    checkPage(url);
  });
