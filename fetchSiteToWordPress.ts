const axios = require("axios");
const cheerio = require("cheerio");
export {};

//Такую же типизацию проделаем и тут. 
const checkSiteToWordPress = async (url: string): Promise<boolean> => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    if ($(`[class*="wp-"]`).length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Ошибка загрузки сайта", error);
    return false;
  }
};

const checkArrayOfSites = async (urls: Array<string>): Promise<number> => {
  try {
    let counter: number = 0;
    for (let url of urls) {
      const isWordPress = await checkSiteToWordPress(url);
      if (isWordPress) {
        counter++;
      }
    }
    return counter;
  } catch (error) {
    console.error("Ошиюка при проверке массива сайтов", error);
    return 0;
  }
};

const urlsToCheck: Array<string> = [
  "https//test.com",
  "https//site.ru",
  "https//aboba.su",
];
try {
  console.log(await checkArrayOfSites(urlsToCheck));
} catch (error) {
  console.error("Ошиюка при проверке массива сайтов", error);
}
