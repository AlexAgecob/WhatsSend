var express = require('express');
var router = express.Router();

const { doSomething } = require('../utils/timer');
const { verfifyNumber } = require('../utils/verifyNumber');

/* GET users listing. */
router.post('/send/message', async function (request, response, next) {
    const { numbers, messages } = request.body;

    let results = [];

    for (let i = 0; i < numbers.length; i++) {
        const telefoneTratado = numbers[i] + '@c.us';
        const message = messages[i];

        const numberExist = await verfifyNumber(client, telefoneTratado)

        if (numberExist == 200) {
            try {
                console.log(telefoneTratado)
                console.log(message)
                const messageSend = await client.sendText(telefoneTratado, message)
                    .then((result) => {
                        console.log('Result: ', result.sendMsgResult._value);
                        return result;
                    }).catch((erro) => {
                        console.error('Error when sending: ', erro);
                        return erro
                    });

                // console.log(messageSend)
                results.push({ Success: 'Message sent', Number: numbers[i] })
            } catch {
                results.push({ Error: 'Sending error', Number: numbers[i] })
            }

        } else {
            results.push({ Error: `Non-existent number`, Number: numbers[i] })
        }


        await doSomething()
    }

    return response.status(200).json(results);
});

module.exports = router;
