import { create } from '@wppconnect-team/wppconnect';
import fs from 'fs';

import { excludeFile } from '../../utils/excludeFile.js';

class WppConnectService {

    constructor() {
        this.connect = null;

        const folder = './src/public/assets/code/';
        const folderApp = './api/dist/public/assets/code/';
        const folderQrCode = './src/public/assets/code/out.png';
        const folderQrCodeApp = './api/dist/public/assets/code/out.png';
        const folderTokens = './tokens';
        // const folderTokensApp = './';

        create({
            session: 'WhatsappMessager',
            catchQR: (base64Qr, asciiQR) => {
                var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
                    response = {};

                if (matches.length !== 3) {
                    return new Error('Invalid input string');
                }
                response.type = matches[1];
                response.data = new Buffer.from(matches[2], 'base64');

                var imageBuffer = response;
                fs.writeFile(
                    `${process.env.NODE_ENV === "dev" ? folder : folderApp}` + 'out.png',
                    imageBuffer['data'],
                    'binary',
                    function (err) {
                        if (err != null) {
                            console.log(err);
                        }
                    }
                );
            },
            disableWelcome: true,
            logQR: false,
            autoClose: 0,
            folderNameToken: `${process.env.NODE_ENV === "dev" ? folderTokens : folderTokens}`,
            // {
            //     multidevice: true,
            //     mkdirFolderToken: `${process.env.NODE_ENV === "dev" ? folderTokens : folderTokens}`,
            //     disableSpins: true,
            // }
        })
            .then((client) => {
                excludeFile(process.env.NODE_ENV === "dev" ? folderQrCode : folderQrCodeApp)

                this.connect = client;
                this.start(client)
            })
            .catch((erro) => {
                console.log(erro);
            });
    }

    async start(client) {
        client.onMessage((message) => {
            if (message.body === 'Hello') {
                client
                    .sendText(message.from, 'Olá como posso ajuda-lo?')
                    .then((result) => {
                        console.log('Result: ', result);
                    })
                    .catch((erro) => {
                        console.error('Error when sending: ', erro);
                    });
            }
        });
    }

    async verifyNumber(number) {
        try {
            const chat = this.connect.checkNumberStatus(`${number}`)
                .then((result) => {
                    // console.log('Result: ', result);
                    return result;
                }).catch((erro) => {
                    // console.error('Error when sending: ', erro);
                    return erro
                });

            return chat
        } catch (err) {
            console.log(err)
        }
    }

    async sendMessage(number, message) {
        try {
            const messageSend = await this.connect.sendText(number, message)
                // .then((result) => {
                //     return result;
                // }).catch((erro) => {
                //     return erro
                // });

                // console.log(messageSend)

            // return messageSend;
        } catch (err) {
            console.log("Error: ", err)
        }
    }

    async verifyLogin() {
        try {
            const isLogged = await this.connect.isLoggedIn();

            return isLogged

        } catch (err) {
            return false
        }
    }
}

export { WppConnectService }


