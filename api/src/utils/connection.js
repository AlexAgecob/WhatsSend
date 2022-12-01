const venom = require('venom-bot');

const connect = () => {
    venom.create({
        session: 'WhatsappMessager',
        multidevice: true
    })
        .then((client) => {
            return client
        })
        .catch((erro) => {
            console.log(erro);
        });
}

// export default connect ;
module.exports = {
    connect
}