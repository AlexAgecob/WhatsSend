import { WppConnectService } from '../services/WppConnect/WppConnectService.js'
import { delay } from '../utils/delay.js'

const wpp = new WppConnectService()

class WppController {
    async sendMessage(request, response) {
        const { numbers, messages, timer } = request.body;

        let results = [];

        for (let i = 0; i < numbers.length; i++) {
            const telefoneTratado = numbers[i] + '@c.us';
            const message = messages[i];

            const numberExist = await wpp.verifyNumber(telefoneTratado)
            // console.log('verify', numberExist);

            console.log(numbers[i].length)

            if (numberExist.status === 200 && numbers[i].length === 12) {
                try {
                    const messageSend = await wpp.sendMessage(telefoneTratado, message);
                    // console.log('message', messageSend)

                    results.push({ Status: 'Enviado', Number: numbers[i] })
                } catch {
                    results.push({ Status: 'Erro', Number: numbers[i] })
                }

            }
            else if (numberExist.status === 200 && numbers[i].length === 13) {
                results.push({ Status: 'Número com 9', Number: numbers[i] })

            }else {
                console.log("Error", numberExist)
                results.push({ Status: `Número não existe`, Number: numbers[i], Status: numberExist })
            }

            await delay(Number(timer))
        }

        return response.status(200).json({result: results});
    }

    async isLogged(request, response) {
        const isLogged = await wpp.verifyLogin();

        if (isLogged == true) {
            return response.json({ Login: "Authenticate" })
        }

        return response.json({ Login: "Unauthenticated" })
    }
}

export { WppController }