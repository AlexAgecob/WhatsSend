import { create } from 'venom-bot';
import path from 'path'
import fs from 'fs';

import { excludeFile } from '../../utils/excludeFile.js';
// import { verfifyNumber } from '../../utils/verifyNumbers.js';

// const connect = 'alou';

class venomBot {

    // static connects = connect;

    constructor() {
        this.connect = null;

        const folder = './src/public/assets/code/';
        const folderApp = './api/dist/public/assets/code/';
        const folderQrCode = './src/public/assets/code/out.png';
        const folderQrCodeApp = './api/dist/public/assets/code/out.png';
        const folderTokens = './';
        // const folderTokensApp = './';

        create(
            'WhatsappMessager',
            (base64Qr, asciiQR, attempts, urlCode) => {
                // console.log(base64Qr)
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
                    // 'out.png',
                    imageBuffer['data'],
                    'binary',
                    function (err) {
                        if (err != null) {
                            console.log(err);
                        }
                    }
                );
            },
            undefined,
            {
                multidevice: true,
                folderNameToken: 'tokens',
                mkdirFolderToken: `${process.env.NODE_ENV === "dev" ? folderTokens : folderTokens}`,
                logQR: false,
                disableSpins: true,
                disableWelcome: true,
                autoClose: 0
            }
        )
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
        // console.log(this.connect)
        client.onMessage((message) => {
            if (message.body === 'Hi' && message.isGroupMsg === false) {
                client
                    .sendText(message.from, 'Welcome Venom 🕷')
                    .then((result) => {
                        console.log('Result: ', result); //return object success
                    })
                    .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                    });
            }
        });
    }

    async verifyNumber(number) {

        console.log(number)

        try {
            const chat = this.connect.checkNumberStatus(`${number}`)
                .then((result) => {
                    console.log('Result: ', result); //return object success
                    return result;
                }).catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                    return erro
                });
                
            return chat
        } catch (err) {
            console.log(err)
        }

        // let numero = String(number)

        // try {
        //     const chat = await this.connect.checkNumberStatus(numero)
        //         .then((result) => {
        //             console.log('Result: ', result); //return object success
        //         }).catch((erro) => {
        //             console.error('Error when sending: ', erro); //return object error
        //         });
        // } catch (err) {
        //     console.log(err)
        // }

    }

    async sendMessage({ number, message }) {
        try {
            await this.connect.sendText(number, message)
                .then((result) => {
                    // console.log('Result: ', result.sendMsgResult._value);
                    return result;
                }).catch((erro) => {
                    // console.error('Error when sending: ', erro);
                    return erro
                });

            // return messageSend
            // results.push({ Success: 'Message sent', Number: numbers[i] })
        } catch {
            console.log("almfklqmof")
            //     results.push({ Error: 'Sending error', Number: numbers[i] })
        }
    }


    async verifyLogin() {
        try {
            const isLogged = await this.connect.isConnected();

            return isLogged

        } catch (err) {
            return false
        }
    }



}

export { venomBot }


