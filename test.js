// const {Translate} = require('@google-cloud/translate').v2;
// require('dotenv').config();

// // Your credentials
// const CREDENTIALS = require('./long-ratio-408512-31eb2593c4e6.json');

// // Configuration for the client
// const translate = new Translate({
//     credentials: CREDENTIALS,
//     projectId: CREDENTIALS.project_id
// });

// const detectLanguage = async (text) => {

//     try {
//         let response = await translate.detect(text);
//         return response[0].language;
//     } catch (error) {
//         console.log(`Error at detectLanguage --> ${error}`);
//         return 0;
//     }
// }

// // detectLanguage('Oggi è lunedì')
// //     .then((res) => {
// //         console.log(res);
// //     })
// //     .catch((err) => {
// //         console.log(err);
// //     });

// const translateText = async (text, targetLanguage) => {

//     try {
//         let [response] = await translate.translate(text, targetLanguage);
//         return response;
//     } catch (error) {
//         console.log(`Error at translateText --> ${error}`);
//         return 0;
//     }
// };

// translateText('Oggi è lunedì', 'en')
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

const axios = require("axios");

const subscriptionKey = "5a6b87fa889f4bb1b7945095f990d7b7"; // Bu kısmı kendi anahtarınızla değiştirin
const endpoint = "https://api.cognitive.microsofttranslator.com";
const region = "eastus"; // Örneğin, "eastus" gibi bir değer

async function translateText(text, toLanguage) {
  const path = "/translate?api-version=3.0";
  const params = `&to=${toLanguage}`;

  const url = `${endpoint}${path}${params}`;

  const headers = {
    "Ocp-Apim-Subscription-Key": subscriptionKey,
    "Ocp-Apim-Subscription-Region": region,
    "Content-type": "application/json",
  };

  const body = [{ text }];

  try {
    const response = await axios.post(url, body, { headers });
    const translation = response.data[0].translations[0].text;
    console.log(`Original Text: ${text}`);
    console.log(`Translated Text: ${translation}`);
    return translation;
  } catch (error) {
    console.error(
      "Translation error:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
}

// Kullanım örneği
translateText("Hello, world!", "tr"); // İngilizce'den Türkçe'ye çeviri
