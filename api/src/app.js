const express = require('express');
const path = require('path');
const venom = require('venom-bot');
const fs = require('fs');

const { doSomething } = require('./utils/timer');
const { verfifyNumber } = require('./utils/verifyNumber');
const { excludeFile } = require('./utils/excludeFile');

const app = express();
app.use(express.json());

const folder = path.join(__dirname, '../src/public/assets/code/');
const folderQrCode = path.join(__dirname, '../src/public/assets/code/out.png');

// const indexRouter = require('./routes/index');
// const venomRouter = require('./routes/venom');

// app.use('/', indexRouter);
// app.use('/venom', venomRouter);

const connect = async () => {
    // let folder = path.join(__dirname, '../../qrcode/');
    // let folderApp = path.join(__dirname, '../../../../../qrcode/');
    venom.create(
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
                `${process.env.NODE_ENV === "dev" ? folder : folder}` + 'out.png',
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
            logQR: false,
            disableSpins: true,
            disableWelcome: true
        }
    )
        .then((client) => {
            excludeFile(folderQrCode)

            start(client)
        })
        .catch((erro) => {
            console.log(erro);
        });
}

function start(client) {
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

    // Send Message
    app.post('/venom/send/message', async (request, response) => {
        const { numbers, messages } = request.body;

        let results = [];

        for (let i = 0; i < numbers.length; i++) {
            const telefoneTratado = numbers[i] + '@c.us';
            const message = messages[i];

            const numberExist = await verfifyNumber(client, telefoneTratado)

            if (numberExist == 200) {
                try {
                    // console.log(telefoneTratado)
                    // console.log(message)
                    const messageSend = await client.sendText(telefoneTratado, message)
                        .then((result) => {
                            console.log('Result: ', result.sendMsgResult._value);
                            return result;
                        }).catch((erro) => {
                            console.error('Error when sending: ', erro);
                            return erro
                        });
                    
                    results.push({ Success: 'Message sent', Number: numbers[i] })
                } catch {
                    results.push({ Error: 'Sending error', Number: numbers[i] })
                }

            } else {
                console.log(numberExist)
                results.push({ Error: `Non-existent number`, Number: numbers[i] })
            }

            await doSomething()
        }

        return response.status(200).json(results);
    })

    app.get('/venom/logged', async (request, response) => {
        try {
            const connect = await client.isConnected();

            if (connect == true) {
                // fs.readFile(__dirname + '/public/pages/send.html', 'utf8', (err, data) => {
                //     response.send(data);
                // });
                return response.json({ Login: "Authenticate" })
            }

            return response.json({ Login: "Unauthenticated" })

        } catch (err) {
            return response.status(400).send()

        }
        // return response.json(connect);
    })

    app.get('/whats/send', async (request, response) => {

        fs.readFile(__dirname + '/public/pages/send.html', 'utf8', (err, data) => {
            response.send(data);
        });
    
    })

}



// GetQrCode
app.get('/qrcode', async (request, response) => {
    try {
        let folderImg = path.join(__dirname, '../src/public/assets/code/out.png');

        const verifyImg = fs.existsSync(folderImg);

        if (verifyImg) {
            const imgBase64 = "data:image/png;base64," + fs.readFileSync(folderImg, 'base64');

            return response.json({ Image: imgBase64 });
        }

        // return response.status(400).json({Image: "Not Found"});
        return response.status(204).send();

    } catch (err) {
        console.log(err);
        return response.status(400);
    }
})

excludeFile(folderQrCode)

connect()

app.use(express.static(__dirname + '/public'))

module.exports = app;