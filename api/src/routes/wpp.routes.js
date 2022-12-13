import { Router } from "express";

const wppRoutes = Router();

import { WppController } from "../controllers/WppController.js";

const wppController = new WppController();

wppRoutes.post('/send/message', async (request, response) => {
    return wppController.sendMessage(request, response)
})

wppRoutes.get('/logged', async (request, response) => {
    return wppController.isLogged(request, response)
})

export { wppRoutes };
