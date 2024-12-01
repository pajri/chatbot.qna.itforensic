import { Client } from 'whatsapp-web.js';
import { GoogleGenerativeAI } from "@google/generative-ai";
import qrcode from 'qrcode-terminal';
import dotenv from "dotenv";
import fs from "fs/promises";
import { initializeChat } from "./history.js";

// Load environment variables
dotenv.config();

// Initialize WhatsApp client
const client = new Client();

// Initialize Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
let chat;

// QR Code generation
function handleQR(qr) {
    console.log("Generate QR code for WhatsApp login:");
    qrcode.generate(qr, { small: true });
    console.log("Done generate QR code for WhatsApp login:");

}

// Handle client ready state
function handleReady() {
    console.log("WhatsApp client is ready!");
}

// Process incoming messages
async function handleMessage(msg) {
    try {
        if (msg.body === 'Hallo') {
            return msg.reply('Hallo my name is Zootopia');
        }

        if (msg.body === '!ping') {
            return msg.reply('pong');
        }

        if (msg.body.startsWith('!echo ')) {
            return msg.reply(msg.body.slice(6));
        }

        if (msg.body === '!mediainfo' && msg.hasMedia) {
            return handleMediaInfo(msg);
        }

        await processGenerativeAIResponse(msg);
    } catch (error) {
        console.error("Error processing message:", error);
        msg.reply("Sorry, I encountered an error while processing your request.");
    }
}

// Handle media info
async function handleMediaInfo(msg) {
    msg.reply("I am sorry. I am just answering a text-based chat.");
    const attachmentData = await msg.downloadMedia();
    const mediaInfo = `
        *Media info*
        MimeType: ${attachmentData.mimetype}
        Filename: ${attachmentData.filename || "N/A"}
        Data (length): ${attachmentData.data.length}
    `;
    msg.reply(mediaInfo);
}

// Process messages with Google Generative AI
async function processGenerativeAIResponse(msg) {
    const result = await chat.sendMessage([{ text: msg.body }]);
    const responseText = result.response.text();
    msg.reply(responseText);
}

// Initialize the WhatsApp client and set up event listeners
async function main() {
    chat = await initializeChat();

    client.on('qr', handleQR);
    client.on('ready', handleReady);
    client.on('message', handleMessage);

    client.initialize();
}

main().catch((error) => {
    console.error("Failed to initialize the application:", error);
});
