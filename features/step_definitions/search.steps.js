const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { getText, clickElement } = require("../../lib/commands.js");

let browser;
let page;

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (url) {
  try {
    await this.page.goto(url, { setTimeout: 5000 });
  } catch (error) {
    throw new Error(`Failed to navigate to ${url} with error: ${error}`);
  }
});

//выбираем односвободное место на завтра "Зверополис"

When("chooses tomorrow of the film screening", async function () {
  return await clickElement(
    this.page,
    "body > nav > a:nth-child(2) > span.page-nav__day-number",
    { setTimeout: 5000 }
  );
});

When("choose a movie showing time tomorrow", async function () {
  return await clickElement(
    this.page,
    "body > main > section:nth-child(1) > div.movie-seances__hall > ul > li > a",
    { setTimeout: 10000 }
  );
});

When("selects empty one seat in the hall", async function () {
  return await clickElement(
    this.page,
    "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(5) > span:nth-child(5)",
    { setTimeout: 6000 }
  );
});

Then("gets the opportunity to book them", async function () {
  await this.page.waitForTimeout(1000);
  const actual = await getText(this.page, "body > main > section > button", {
    setTimeout: 6000,
  });
  expect(actual).to.contain("Забронировать");
});

//бронируем два свободных места через 3 дня "терминатор"

When("choose to show a movie in 3 days", async function () {
  return await clickElement(this.page, "body > nav > a:nth-child(4)", {
    setTimeout: 5000,
  });
});

When("select a movie showing time in 3 days", async function () {
  return await clickElement(
    this.page,
    "body > main > section:nth-child(2) > div.movie-seances__hall > ul > li > a",
    { setTimeout: 10000 }
  );
});

When("selects empty first seat in the hall", async function () {
  return await clickElement(
    this.page,
    "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(4) > span:nth-child(9)",
    { setTimeout: 6000 }
  );
});

When("selects empty second seat in the hall", async function () {
  return await clickElement(
    this.page,
    "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(4) > span:nth-child(10)",
    { setTimeout: 6000 }
  );
});
``;

When("go to the page with information about booked tickets", async function () {
  return await clickElement(this.page, "body > main > section > button", {
    setTimeout: 6000,
  });
});

When("go to the page with QR-code tickets", async function () {
  return await clickElement(this.page, "body > main > section > div > button", {
    setTimeout: 6000,
  });
});

Then(
  "receive information about the booked ticket and QR-code",
  async function () {
    await this.page.waitForTimeout(1000);
    const actual = await getText(
      this.page,
      "body > main > section > header > h2",
      {
        setTimeout: 6000,
      }
    );
    expect(actual).to.contain("Электронный билет");
  }
);

//выбираем одно занятое место через 3 дня "терминатор"

Then("the place is occupied", async function () {
  // await this.page.waitForTimeout(1000);
  const busy = await this.page.$eval(
    "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(4) > span:nth-child(9)",
    (el) => el.classList.contains("buying-scheme__chair_taken"),
    {
      setTimeout: 6000,
    }
  );
  expect(busy).to.be.true;
});
