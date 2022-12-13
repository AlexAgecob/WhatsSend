import { Router } from "express";

const venomRoutes = Router();

import { VenomController } from '../controllers/VenomController.js'

const venomController = new VenomController();

venomRoutes.post('/send/message', async (request, response) => {
    return venomController.sendMessage(request, response)
})

venomRoutes.get('/logged', async (request, response) => {
    return venomController.isLogged(request, response)
})

export { venomRoutes };
