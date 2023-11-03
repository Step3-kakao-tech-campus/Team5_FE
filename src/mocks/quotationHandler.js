import { rest } from "msw";
import { success } from "./commonData";
import {
  quotationCollectList1,
  quotationCollectList2,
  quotationCollectList3,
  quotationList,
} from "./quotationData";

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const quotationHandlers = [
  rest.get("/quotations", async (req, res, ctx) => {
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

  rest.post("/quotations", async (req, res, ctx) => {
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

  rest.put("/quotations/:quotationId", async (req, res, ctx) => {
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

  rest.post("/match/confirmAll", async (req, res, ctx) => {
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

  rest.post("/quotations/confirm/:quotationId", async (req, res, ctx) => {
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

  rest.get("/quotations/collect", async (req, res, ctx) => {
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
    if (page === "1") {
      return res(ctx.status(200), ctx.json(quotationCollectList1));
    }
    if (page === "2") {
      return res(ctx.status(200), ctx.json(quotationCollectList2));
    }
    if (page === "3") {
      return res(ctx.status(200), ctx.json(quotationCollectList3));
    }
    return res(
      ctx.status(200),
      ctx.json({ success: true, response: [], error: null }),
    );
  }),
];
