// services/payhero.js
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api";

// Create axios instance for your backend
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 20000
});

/**
 * 1️⃣ INITIATE STK PUSH (via Backend)
 */
export const initiateSTKPush = async ({
  amount,
  phoneNumber,
  accountReference,
  transactionDesc,
  metadata = {}
}) => {
  try {
    const phoneValidation = validatePhoneNumber(phoneNumber);
    if (!phoneValidation.isValid) {
      throw new Error(phoneValidation.message);
    }

    const formattedAmount = Math.round(Number(amount));
    if (!formattedAmount || formattedAmount < 10) {
      throw new Error("Amount must be at least KSh 10");
    }

    const reference = accountReference || generateReference("VAL");

    const payload = {
      amount: formattedAmount,
      phoneNumber: phoneValidation.formatted,
      reference,
      description: transactionDesc || "Valentine Gift 💝",
      metadata
    };

    const response = await api.post("/payhero/stk-push", payload);

    return {
      success: true,
      message: "STK Push sent successfully",
      data: response.data
    };

  } catch (error) {
    let errorMessage = "Payment failed. ";

    if (error.response) {
      errorMessage += error.response.data?.message || error.response.statusText;
    } else if (error.request) {
      errorMessage += "No response from server.";
    } else {
      errorMessage += error.message;
    }

    return {
      success: false,
      error: errorMessage
    };
  }
};


/**
 * 2️⃣ TEST CONNECTION (Backend Health Check)
 */
export const testPayHeroConnection = async () => {
  try {
    const response = await api.get("/health");
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};


/**
 * 3️⃣ FORMAT PHONE NUMBER
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return "";

  let cleaned = phone.replace(/\D/g, "");

  if (cleaned.startsWith("0")) {
    cleaned = "254" + cleaned.substring(1);
  } else if (cleaned.startsWith("7")) {
    cleaned = "254" + cleaned;
  } else if (cleaned.startsWith("+254")) {
    cleaned = cleaned.substring(1);
  } else if (!cleaned.startsWith("254")) {
    cleaned = "254" + cleaned;
  }

  return cleaned;
};


/**
 * 4️⃣ VALIDATE PHONE NUMBER
 */
export const validatePhoneNumber = (phone) => {
  if (!phone) {
    return { isValid: false, formatted: "", message: "Phone number is required" };
  }

  const formatted = formatPhoneNumber(phone);
  const isValid = /^254[0-9]{9}$/.test(formatted);

  return {
    isValid,
    formatted,
    message: isValid ? "Valid" : "Invalid phone number. Use: 0712345678"
  };
};


/**
 * 5️⃣ GENERATE REFERENCE
 */
export const generateReference = (prefix = "VAL") => {
  return `${prefix}${Date.now()}${Math.random()
    .toString(36)
    .substring(2, 6)}`.substring(0, 20);
};


/**
 * 6️⃣ FORMAT AMOUNT
 */
export const formatAmount = (amount) => {
  return Number(amount).toLocaleString("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0
  });
};

export default {
  initiateSTKPush,
  testPayHeroConnection,
  validatePhoneNumber,
  formatPhoneNumber,
  generateReference,
  formatAmount
};
