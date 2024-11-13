import express from "express";
import { memberRoutes } from "../modules/Member/member.route";
import { bookRoutes } from "../modules/Book/book.route";
import { borrowRoutes } from "../modules/BorrowRecord/borrow.route";

const router = express.Router();

// dynamic route

const routeConfig = [
  {
    path: "/",
    routes: memberRoutes,
  },
  {
    path: "/",
    routes: bookRoutes,
  },
  {
    path: "/",
    routes: borrowRoutes,
  },
];

routeConfig.forEach((config) => {
  router.use(config.path, config.routes);
});

export const allRoutes = router;
