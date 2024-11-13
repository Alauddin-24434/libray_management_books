"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allRoutes = void 0;
const express_1 = __importDefault(require("express"));
const member_route_1 = require("../modules/Member/member.route");
const book_route_1 = require("../modules/Book/book.route");
const borrow_route_1 = require("../modules/BorrowRecord/borrow.route");
const router = express_1.default.Router();
// dynamic route
const routeConfig = [
    {
        path: "/",
        routes: member_route_1.memberRoutes,
    },
    {
        path: "/",
        routes: book_route_1.bookRoutes,
    },
    {
        path: "/",
        routes: borrow_route_1.borrowRoutes,
    },
];
routeConfig.forEach((config) => {
    router.use(config.path, config.routes);
});
exports.allRoutes = router;
