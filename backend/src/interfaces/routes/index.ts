import { Router } from "express";
import { authRouter } from "./auth";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ estado: "ok" });
});

router.use("/auth", authRouter);

export { router };
