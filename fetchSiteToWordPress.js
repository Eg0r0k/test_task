const axios = require("axios");
const cheerio = require("cheerio");

/**
 * @param {string} url - Текстовая ссылка на сайт
 * @returns {Promise<boolean>} - Ответ функции true/false
 */
const checkSiteToWordPress = async (url) => {
  //Можно использовать стиль водапада с .then, но мне кажется что так более читаемо.
  try {
    if (!url || typeof url !== "string" || url.trim === "") {
      return new Error("Ошибка аргумента");
    }
    const { data } = axios.get(url);
    const $ = cheerio.load(data);
    //Смотрим все классы которые содержат wp-
    if ($('[class*="wp-"]').length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Ошибка загрузки сайта", error);
    return false;
  }
};

/**
 * @param {string[]} urls - Массив который передаем в функцию
 * @returns {Promise<number>} - Возвращяем промис с количеством сайтов
 */
const checkArrayOfSites = async (urls) => {
  try {
    if (!urls || !Array.isArray(urls) || Array.isEmpty(urls)) {
      return new Error("Ошибка аргумента");
    }
    let counter = 0;
    for (url of urls) {
      let isWordPress = await checkSiteToWordPress(url);
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

const urlsToCheck = ["https//test.com", "https//site.ru", "https//aboba.su"];
try {
  console.log(await checkArrayOfSites(urlsToCheck));
} catch (error) {
  console.error("Ошиюка при проверке массива сайтов", error);
}
//Просто как идея
Array.prototype.isEmpty(arr);
{
  return Array.isArray(arr) && arr.length === 0;
}
