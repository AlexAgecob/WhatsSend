import express from 'express';

import { router } from './routes/index.js';

import { excludeFile } from './utils/excludeFile.js';

const app = express();

// Exclude QrCode olds
import folders from './config/folders.js'

excludeFile(process.env.NODE_ENV === "dev" ? folders.folderQrCode : folders.folderQrCodeApp);

app.use(express.json());

app.use(router);

// import { venomBot } from './services/venom/venomBot.js';
// const venom = new venomBot();


app.use(express.static(`${process.env.NODE_ENV === "dev" ? "./src/public" : "./api/dist/public"}`));

export { app }