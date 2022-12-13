import { Router } from "express";
import fs from 'fs';

const appRoutes = Router();


appRoutes.get('/qrcode', async (request, response) => {
    try {
        let folderImg = './src/public/assets/code/out.png';
        let folderImgApp = './api/dist/public/assets/code/out.png';

        const verifyImg = fs.existsSync(process.env.NODE_ENV === "dev" ? folderImg : folderImgApp);

        if (verifyImg) {
            const imgBase64 = "data:image/png;base64," + fs.readFileSync(process.env.NODE_ENV === "dev" ? folderImg : folderImgApp, 'base64');

            return response.json({ Image: imgBase64 });
        }

        // return response.status(400).json({Image: "Not Found"});
        return response.status(204).send();

    } catch (err) {
        console.log(err);
        return response.status(400);
    }
})

// Page sends
appRoutes.get('/whats/send', async (request, response) => {

    fs.readFile(process.env.NODE_ENV === 'dev' ? './src/public/pages/send.html' : './api/dist/public/pages/send.html', 'utf8', (err, data) => {
        response.send(data);
    });

})

export { appRoutes };
