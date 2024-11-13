"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from the .env file
dotenv_1.default.config();
const config = {
    port: process.env.PORT || 5000, // Default to 3000 if PORT is not set
    nodeEnv: process.env.NODE_ENV, // Default to 'development' if NODE_ENV is not set
    dbUrl: process.env.DATABASE_URL, // MongoDB connection string from .env
};
exports.default = config;
