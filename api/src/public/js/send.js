const api = axios.create({
    baseURL: 'http://localhost:3333/',
})

const button = document.getElementById("send-message");

const sendNumbersWhats = async () => {
    let dataField   = $('#floatingTextarea1').val().replace(/^\s+|\s+$/gm, '');
    let msgField    = $('#floatingTextarea2').val();

    let dataSplitField = dataField.split("\n");

    let msgFieldComplete =''

    let numberFieldArray = [];
    let nameFieldArray  = [];
    let bindFieldArray  = [];
    let msgFieldArray = [];

    for(let i = 0; i < dataSplitField.length; i++){
        let dataSplitFieldSend = dataSplitField[i].split(",")

        numberFieldArray.push(dataSplitFieldSend[0])
        nameFieldArray.push(dataSplitFieldSend[1])
        bindFieldArray.push(dataSplitFieldSend[2])

        msgFieldComplete = msgField.replace('@valueOne', dataSplitFieldSend[1])
        msgFieldComplete = msgFieldComplete.replace('@valueTwo', dataSplitFieldSend[2])

        msgFieldArray.push(msgFieldComplete)

        // console.log(dataSplitFieldSend[0])
        // console.log(dataSplitFieldSend[1])
        // console.log(dataSplitFieldSend[2])
        
        // console.log(msgFieldComplete)
        // console.log("_________________________________")
    }

    console.log(numberFieldArray)
    console.log(nameFieldArray)
    console.log(bindFieldArray)
    console.log(msgFieldArray)

    try {
        await api.post(`/venom/send/message`, {
            numbers: numberFieldArray,
            messages: msgFieldArray
        })
            .then(res => {
                if (res.status == 200) {
                    $('#floatingTextarea1').val('');
                    console.log(res.data)
                    // text.value = 'Correto'
                } else {
                    console.log(res);
                }
            })
            .catch(err => {
                console.log(err);
            });
    } catch {
        console.log('Erro ')
    }
}

button.addEventListener('click', async () => {
    sendNumbersWhats()
})
