import { venomBot } from '../services/venom/venomBot.js';

import { delay } from '../utils/delay.js'

const venom = new venomBot();

class VenomController {
    async sendMessage(request, response) {
        const { numbers, messages, timer } = request.body;

        let results = [];

        for (let i = 0; i < numbers.length; i++) {
            const telefoneTratado = numbers[i] + '@c.us';
            const message = messages[i];

            const numberExist = await venom.verifyNumber(telefoneTratado)

            // console.log('verify', numberExist);

            if (numberExist == 200) {
                try {
            //         // console.log(telefoneTratado)
            //         // console.log(message)

            //         const messageSend = await venom.sendMessage(telefoneTratado, message);

            //         console.log(messageSend)

                    results.push({ Success: 'Message sent', Number: numbers[i] })

                } catch {
                    results.push({ Error: 'Sending error', Number: numbers[i] })
                }

            } else {
            //     // console.log(numberExist)
                results.push({ Error: `Non-existent number`, Number: numbers[i], Status: numberExist })
            }

            await delay(Number(timer))
        }

        return response.status(200).json(results);
    }

    async isLogged(request, response) {
        const isLogged = await venom.verifyLogin();

        if (isLogged == true) {

            return response.json({ Login: "Authenticate" })
        }

        return response.json({ Login: "Unauthenticated" })
    }
}

export { VenomController }