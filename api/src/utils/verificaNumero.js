async function verificaNumero(connect, number) {


    console.log(number)
    const chat = await connect.checkNumberStatus(number)
        .then((result) => {
            console.log('Result: ', result.status); //return object success
            return result.status;
        }).catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
            return erro
        });


    return chat
}

export { verificaNumero }