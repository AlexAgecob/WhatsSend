const api = axios.create({
    baseURL: 'http://localhost:3333/',
})

const button = document.getElementById("send-message");

const sendNumbersWhats = async () => {
    let dataField = $('#floatingTextarea1').val().replace(/^\s+|\s+$/gm, '');
    let msgField = $('#floatingTextarea2').val();
    let timer = $("#sleep-sender").val()

    // Clean values
    $('#send-success').text('--')
    $('#send-error').text('--')
    $('#send-total').text('--')
    $('#send-nine-additional').text('--')

    let dataSplitField = dataField.split("\n");

    let msgFieldComplete = ''

    let numberFieldArray = [];
    let nameFieldArray = [];
    let bindFieldArray = [];
    let msgFieldArray = [];

    for (let i = 0; i < dataSplitField.length; i++) {
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

    // console.log(numberFieldArray)
    // console.log(nameFieldArray)
    // console.log(bindFieldArray)
    // console.log(msgFieldArray)

    $('body').addClass("loading");
    $('html, body').animate({ scrollTop: 0 }, 'fast');

    let countSucesso = 0;
    let countError = 0;
    let countNineAdditional = 0;

    let boxValueRessult = []

    try {
        await api.post(`/wpp/send/message`, {
            numbers: numberFieldArray,
            messages: msgFieldArray,
            timer: timer
        })
            .then(res => {
                if (res.status == 200) {

                    // Remove o carregamento
                    $('body').removeClass("loading");
                    $('#floatingTextarea1').val('');

                    $('#staticBackdrop').addClass('show')
                    // $('staticBackdrop').show();

                    console.log(res.data.result)

                    for (let i = 0; i < res.data.result.length; i++) {
                        if (res.data.result[i].Status == 'Enviado') {
                            countSucesso = countSucesso + 1;

                        } else if (res.data.result[i].Status == 'Erro') {
                            countError = countError + 1;

                        } else if (res.data.result[i].Status == 'Número com 9') {
                            countNineAdditional = countNineAdditional + 1;

                        } else if (res.data.result[i].Status == 'Número não existe') {
                            countError = countError + 1;
                        }

                        boxValueRessult += `Status: ${res.data.result[i].Status} | Número: ${res.data.result[i].Number}\n`

                    }
                    $('#floatingTextarea-results').val(boxValueRessult)

                    // console.log('Sucesso', countSucesso)
                    // console.log('Erro', countError)
                    // console.log('9 adicional', countNineAdditional)

                    $('#send-success').text(countSucesso)
                    $('#send-error').text(countError)
                    $('#send-nine-additional').text(countNineAdditional)
                    $('#send-total').text(res.data.result.length)

                } else {
                    $('body').removeClass("loading");
                    alert(`Erro no envio, status != 200: ${res}`)
                    console.log(res);
                }
            })
            .catch(err => {
                $('body').removeClass("loading");
                alert(`Erro no envio: ${err}`)
                console.log(err);
            });
    } catch (err) {
        $('body').removeClass("loading");
        alert(`Erro geral no envio: ${err}`)
        console.log('Erro ')
    }
}

button.addEventListener('click', async () => {
    sendNumbersWhats()
})

/* MUDA O VALOR DE ENVIO */
$("#sleep-sender").change(function () {
    var sleepCurrent = $('#sleep-sender').val();
    localStorage.setItem('sleep', sleepCurrent * 1000);
    console.log(sleepCurrent)

    /* VALIDA VALOR RECEBIDO */
    if (sleepCurrent < 60) {
        $('#time-send').text(`${sleepCurrent}s`);
    } else {
        $('#time-send').text("1Min");
    }
});

// Button close modal of results
$('#button-close-modal-results').click(async () => {
    $('#floatingTextarea-results').val('')

    $('#staticBackdrop').removeClass("show");
    $('#staticBackdrop').addClass("hide");
})


// Button info
document.getElementById("liveToastBtn").addEventListener('click', async () => {
    if (document.getElementById('liveToast').className.indexOf('hide') !== -1) {
        document.getElementById("liveToast").classList.remove('hide');
        document.getElementById("liveToast").classList.add('show');
    } else if (document.getElementById('liveToast').className.indexOf('show') !== -1) {
        document.getElementById("liveToast").classList.remove('show');
        document.getElementById("liveToast").classList.add('hide');
    }
})
