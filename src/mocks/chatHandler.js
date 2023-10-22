import { rest } from "msw";
import { chatIdHJ, chatIdAR } from "./chatData";

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const chatHandlers = [
  rest.post("/chat", async (req, res, ctx) => {
    await sleep(500);
    const accessToken = req.headers.get("Authorization");
    if (!accessToken) {
      return res(
        ctx.status(403),
        ctx.json({
          code: 403,
          message: "Not authorized",
        }),
      );
    }
    if (req.body.plannerId === 1) {
      return res(ctx.status(200), ctx.json(chatIdHJ));
    }
    return res(ctx.status(200), ctx.json(chatIdAR));
  }),
];
