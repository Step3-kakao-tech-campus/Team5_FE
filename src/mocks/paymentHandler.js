import { rest } from "msw";
import { sucess, paymentsConfirm } from "./responseData";

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const paymentHandlers = [
  rest.post("/payments/save", async (req, res, ctx) => {
    await sleep(500);
    const isAuthenticated = localStorage.getItem("token");
    if (!isAuthenticated) {
      return res(
        ctx.status(403),
        ctx.json({
          code: 403,
          message: "Not authorized",
        })
      );
    }
    return res(ctx.status(200), ctx.json(sucess));
  }),

  rest.post("/payments/confirm", async (req, res, ctx) => {
    await sleep(500);
    const isAuthenticated = localStorage.getItem("token");
    if (!isAuthenticated) {
      return res(
        ctx.status(403),
        ctx.json({
          code: 403,
          message: "Not authorized",
        })
      );
    }
    return res(ctx.status(200), ctx.json(paymentsConfirm));
  }),

  rest.post("/payments/upgrade", async (req, res, ctx) => {
    await sleep(500);
    const isAuthenticated = localStorage.getItem("token");
    if (!isAuthenticated) {
      return res(
        ctx.status(403),
        ctx.json({
          code: 403,
          message: "Not authorized",
        })
      );
    }
    return res(ctx.status(200), ctx.json(sucess));
  }),
];
