import { rest } from "msw";
import { chatId } from "./chatData";

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const chatHandlers = [
  rest.post("/chat", async (req, res, ctx) => {
    await sleep(500);
    const isAuthenticated = localStorage.getItem("token");
    if (!isAuthenticated) {
      return res(
        ctx.status(403),
        ctx.json({
          code: 403,
          message: "Not authorized",
        }),
      );
    }
    return res(ctx.status(200), ctx.json(chatId));
  }),
];
