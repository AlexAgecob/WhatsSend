const venom = require('venom-bot');

function Msg(number, message) {

    venom.create().then((client) => start(client));

    function start(client) {
        client
            .sendText(number, message)
            .then((result) => {
                console.log('Result: ', result.status);
                // process.exit(1);
            })
            .catch((erro) => {
                console.error('Error no Processo: ', erro.status); //return object error
            });
    }

};
exports.Msg = Msg;