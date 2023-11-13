import { rest } from "msw";
import { success } from "./commonData";
import {
  quotationCollectList0,
  quotationCollectList1,
  quotationCollectList2,
  quotationList,
} from "./quotationData";

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const quotationHandlers = [
  rest.get("/api/quotation", async (req, res, ctx) => {
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
    return res(ctx.status(200), ctx.json(quotationList));
  }),

  rest.post("/api/quotation", async (req, res, ctx) => {
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
    return res(ctx.status(200), ctx.json(success));
  }),

  rest.put("/api/quotation/:quotationId", async (req, res, ctx) => {
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
    return res(ctx.status(200), ctx.json(success));
  }),

  rest.delete("/api/quotation/:quotationId", async (req, res, ctx) => {
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
    return res(ctx.status(200), ctx.json(success));
  }),

  rest.post("/api/match/confirm", async (req, res, ctx) => {
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
    return res(ctx.status(200), ctx.json(success));
  }),

  rest.post("/api/quotation/confirm/:quotationId", async (req, res, ctx) => {
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
    return res(ctx.status(200), ctx.json(success));
  }),

  rest.get("/api/quotation/all", async (req, res, ctx) => {
    await sleep(500);
    const accessToken = req.headers.get("Authorization");
    const page = req.url.searchParams.get("page");
    if (!accessToken) {
      return res(
        ctx.status(403),
        ctx.json({
          code: 403,
          message: "Not authorized",
        }),
      );
    }
    if (page === "0") {
      return res(ctx.status(200), ctx.json(quotationCollectList0));
    }
    if (page === "1") {
      return res(ctx.status(200), ctx.json(quotationCollectList1));
    }
    if (page === "2") {
      return res(ctx.status(200), ctx.json(quotationCollectList2));
    }
    return res(
      ctx.status(200),
      ctx.json({ success: true, response: { chats: [] }, error: null }),
    );
  }),
];
