import { rest } from "msw";

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
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        response: {
          chatId: 21001,
        },
        error: null,
      }),
    );
  }),
];
