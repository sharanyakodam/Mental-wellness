import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
      { inputs: message },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`, // put your Hugging Face key in .env
        },
      }
    );

    const botReply = response.data[0]?.generated_text || "I’m here to listen.";
    res.json({ reply: botReply });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ reply: "Error: unable to connect to Hugging Face API." });
  }
});

app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));
