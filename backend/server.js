// server.js
import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PAYHERO_BASE_URL = "https://api.payhero.co.ke/api/v1";
const AUTH_HEADER = "Basic " + Buffer.from(
  process.env.PAYHERO_USERNAME + ":" + process.env.PAYHERO_PASSWORD
).toString("base64");

app.post("/api/payhero/stk-push", async (req, res) => {
  try {
    const { amount, phoneNumber, reference, description } = req.body;

    const payload = {
      account_no: process.env.PAYHERO_ACCOUNT_ID,
      amount,
      phone_no: phoneNumber,
      reference,
      description,
      callback_url: process.env.CALLBACK_URL
    };

    const response = await axios.post(
      `${PAYHERO_BASE_URL}/stkpush`,
      payload,
      { headers: { Authorization: AUTH_HEADER } }
    );

    res.json(response.data);

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: error.response?.data || "STK push failed" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
