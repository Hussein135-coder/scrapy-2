// const {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } = require("@google/generative-ai");
require("dotenv").config();

const apiKey = process.env.GEMINI_API_KEY;
console.log(apiKey);
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
//   systemInstruction:
//     "قم بتحليل الرسالة بشكل جيد فإن كانت محتواه يخص التربية او التعليم او الدراسة او الامتحانات او النتائج اي كل ما يخص طلاب المدارس والجامعات، قم بإرسال هذه الكلمة 'تعليمي' فقط أما غير ذلك قم بإرسال هذه الجملة فقط 'غير تعليمي' ",
// });

// const generationConfig = {
//   temperature: 0.6,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 8192,
//   responseMimeType: "text/plain",
// };

// const safetySettings = [
//   {
//     category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//     threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//   },
//   {
//     category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//     threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//   },
//   {
//     category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
//     threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//   },
//   {
//     category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
//     threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//   },
// ];

// let chatSession = model.startChat({
//   generationConfig,
//   safetySettings,
//   history: [],
// });

// let history = [];

const aiPost = async (userInput) => {
  try {
    console.log("In Ai Post...");
    //console.log(userInput,'User Input...');

    // const result = await chatSession.sendMessage(userInput);
    // history.push({ role: "user", parts: [{ text: userInput }] });
    // history.push({
    //   role: "model",
    //   parts: [{ text: result.response.text() }],
    // });

    // chatSession = model.startChat({
    //   generationConfig,
    //   safetySettings,
    //   history,
    // });

    //const result = await model.generateContent(userInput);

    //console.log(result.response.text());
    //return result.response.text();
    return "تعليمي";
  } catch (error) {
    console.log(error);
    return "fail";
  }
};

module.exports = aiPost;
