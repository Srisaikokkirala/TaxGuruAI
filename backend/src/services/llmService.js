const axios = require("axios");
const { SYSTEM_PROMPT } = require("../config/constants");

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL =
  process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
const GROQ_BASE_URL = "https://api.groq.com/openai/v1";

function trimConversation(messages, limit = 14) {
  return messages.slice(-limit);
}

async function generateTaxReply(conversationMessages = []) {
  if (!GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is missing in the .env file.");
  }

  const endpoint = `${GROQ_BASE_URL}/chat/completions`;

  const payload = {
    model: GROQ_MODEL,
    temperature: 0.3,
    max_tokens: 700,
    messages: trimConversation([
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      ...conversationMessages,
    ]),
  };

  const headers = {
    Authorization: `Bearer ${GROQ_API_KEY}`,
    "Content-Type": "application/json",
  };

  console.log("========== GROQ REQUEST ==========");
  console.log("Endpoint:", endpoint);
  console.log("Model:", GROQ_MODEL);
  console.log("Payload:");
  console.log(JSON.stringify(payload, null, 2));

  try {
    const response = await axios.post(endpoint, payload, {
      headers,
      timeout: 60000,
    });

    console.log("========== GROQ RESPONSE ==========");
    console.log("Status:", response.status);
    console.log(JSON.stringify(response.data, null, 2));

    const reply = response.data?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      throw new Error("Groq returned an empty response.");
    }

    return reply;
  } catch (error) {
    console.error("========== GROQ ERROR ==========");

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error(JSON.stringify(error.response.data, null, 2));

      return {
        success: false,
        provider: "groq",
        status: error.response.status,
        error: error.response.data,
      };
    }

    console.error(error.message);
    throw error;
  }
}

module.exports = {
  generateTaxReply,
};