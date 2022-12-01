const verfifyNumber = async (connect, number) => {

    const chat = await connect.checkNumberStatus(number)
        .then((result) => {
            // console.log('Result: ', result.status); //return object success
            return result.status;
        }).catch((erro) => {
            // console.error('Error when sending: ', erro); //return object error
            return erro
        });

    return chat
}

module.exports = {
    verfifyNumber
} 