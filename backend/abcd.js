require("dotenv").config();

console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY);
console.log("OPENAI_BASE_URL:", process.env.OPENAI_BASE_URL);
console.log("OPENAI_MODEL:", process.env.OPENAI_MODEL);

const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL,
});

async function main() {
    const response = await client.chat.completions.create({
        model: process.env.OPENAI_MODEL,
        messages: [
            {
                role: "user",
                content: "Hello"
            }
        ]
    });

    console.log(response.choices[0].message.content);
}

main().catch(console.error);