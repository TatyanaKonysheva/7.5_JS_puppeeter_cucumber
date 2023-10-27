const puppeteer = require("puppeteer");
const { clickElement, getText, getClass } = require("./lib/commands.js");
let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(async () => {
  page.close();
});

describe("Ticket booking", () => {
  beforeEach(async () => {
    await page.goto("http://qamid.tmweb.ru/client/index.php");
  });

  jest.setTimeout(60000);

  test("Successful booking of two tickets", async () => {
    await page.waitForSelector("h1");
    await clickElement(page, "body > nav > a:nth-child(4)"); //выбираем день
    await clickElement(
      page,
      "body > main > section:nth-child(2) > div.movie-seances__hall > ul > li > a"
    ); //выбираем сеанс
    await clickElement(
      page,
      "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(4) > span:nth-child(3)"
    ); //выбираем первое место
    await clickElement(
      page,
      "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(4) > span:nth-child(4)"
    ); //выбираем второе место
    await clickElement(page, "body > main > section > button"); //клик по кнопке "Забронированть"
    const actual = await getText(page, "body > main > section > div > button");
    expect(actual).toContain("Получить код бронирования");
    await clickElement(page, "body > main > section > div > button"); // получение qr кода
    const actual2 = await getText(page, "body > main > section > header > h2");
    expect(actual2).toContain("Электронный билет");
  }, 120000);

  test("Successful booking of one ticket", async () => {
    await page.waitForSelector("h1");
    await clickElement(
      page,
      "body > nav > a:nth-child(2) > span.page-nav__day-number"
    ); //выбираем день
    await clickElement(
      page,
      "body > main > section:nth-child(1) > div.movie-seances__hall > ul > li > a"
    ); // выбираем сеанс
    await clickElement(
      page,
      "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(5) > span:nth-child(5)"
    ); //выбираем место
    const actual = await getText(page, "body > main > section > button");
    expect(actual).toContain("Забронировать");
  });

  test("Unsuccessful booking of one ticket", async () => {
    await page.waitForSelector("h1");
    await clickElement(page, "body > nav > a:nth-child(4)"); //выбираем день
    await clickElement(
      page,
      "body > main > section:nth-child(2) > div.movie-seances__hall > ul > li > a"
    ); //выбираем сеанс
    const busy = await page.$eval(
      "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(4) > span:nth-child(1)",
      (el) => el.classList.contains("buying-scheme__chair_taken")
    );
    expect(busy).toBeTruthy();
  }, 120000);
});
