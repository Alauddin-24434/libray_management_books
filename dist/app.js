"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const notFound_1 = require("./app/middleware/notFound");
const routes_1 = require("./app/routes");
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// all routes
app.use("/api", routes_1.allRoutes);
app.use(globalErrorHandler_1.default);
// not found  middleware
app.use(notFound_1.notFound);
exports.default = app;
