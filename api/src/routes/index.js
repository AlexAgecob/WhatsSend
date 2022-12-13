import { Router } from "express";

import { appRoutes } from "./app.routes.js";
import { wppRoutes } from "./wpp.routes.js";

const router = Router();

router.use("/app", appRoutes);
// router.use("/venom", venomRoutes);
router.use("/wpp", wppRoutes);



export { router }