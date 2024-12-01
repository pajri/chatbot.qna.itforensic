import dotenv from "dotenv";
import readline from "readline";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs/promises";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

export async function initializeChat() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    let chat = null;
    let historyChatArray = []

    const histories = await loadHistory();
    
    histories.forEach(h => {
        const _h = {
            role: "user",
            parts: [{ text: h }]
        }
        historyChatArray.push(_h)
    });

    chat = model.startChat({
        history: historyChatArray,
        generationConfig: { maxOutputTokens: 200 },
    });

    return chat;
}

async function loadHistory() {
    let history = [];
    const rule = await fs.readFile('data/rule.txt', 'utf8');
    const basic = await fs.readFile('data/definition_and_basic_concepts.txt', 'utf8');

    history.push(rule);
    history.push(basic);
    return history;
}

async function run() {
    let chat = await initializeChat();

    async function askAndRespond() {
        rl.question("You: ", async (msg) => {
            if (msg.toLowerCase() === "exit") {
                rl.close();
            } else {
                const result = await chat.sendMessage(msg);
                const response = await result.response;
                const text = await response.text();
                console.log("AI: \n", text);
                console.log("------------------------------------------");
                askAndRespond();
            }
        });
    }

    askAndRespond(); // Start the conversation loop
}

// run();
