$('#number9Add').change(() => {
    $('#number9Remove').prop('checked', false)
})
$('#number9Remove').change(() => {
    $('#number9Add').prop('checked', false)
})

// ATUALIZA LINKS
$('#update-numbers').click(() => {
    let number9Add = $('#number9Add').prop('checked');
    let number9Remove = $('#number9Remove').prop('checked');

    const cheks9 = {
        add: number9Add,
        remove: number9Remove,
    };

    updateNumbersInTextBox(cheks9);
});

// FUNÇÃO ATUALIZA NUMEROS
const updateNumbersInTextBox = (cheks9) => {
    // DADOS INPUT
    let numbersRow = $('#floatingTextarea1').val().replace(/^\s+|\s+$/g, "");

    let result = numbersRow.split("\n");

    //DADOS CHEKS
    let cheksAdd9 = cheks9.add;
    let cheksRemove9 = cheks9.remove;

    //VARIAVEIS RECEBEM OS DADOS
    let boxValueDddResultNov = '';
    let boxWhatsappResultNov = '';
    let boxValueDddNov = '';
    let boxWhatsappNov = '';

    // // ARRAYS
    let dddLineArray = [];
    let numberLineArray = [];

    if (cheksAdd9 === true) {
        for (let i = 0; i < result.length; i++) {
            let linha = result[i]

            let data = linha.split(",")
   
            let dddLine = data[0].slice(2, 4);
            let numberLine = data[0].slice(4, 13);

            dddLineArray.push(dddLine);
            numberLineArray.push(numberLine);

            if (numberLineArray[i].length === 8) {
                boxValueDddResultNov = boxValueDddNov += `55${dddLineArray[i]}9${numberLineArray[i]},${data[1]},${data[2]}\n`
            }
            else {
                boxValueDddResultNov = boxValueDddNov += `55${dddLineArray[i]}${numberLineArray[i]},${data[1]},${data[2]}\n`
            }
        }
    } else if (cheksRemove9 === true) {
        for (let i = 0; i < result.length; i++) {
            let linha = result[i]

            let data = linha.split(",")

            let linhaReplace

            let dddLine = data[0].slice(2, 4);
            let numberLine = data[0].slice(4, 13)

            dddLineArray.push(dddLine);
            numberLineArray.push(numberLine);

            if (numberLineArray[i].length === 9) {

                linhaReplace = numberLineArray[i].replace(/^./, "");

                boxValueDddResultNov = boxValueDddNov += `55${dddLineArray[i]}${linhaReplace},${data[1]},${data[2]}\n`
            } else {
                boxValueDddResultNov = boxValueDddNov += `55${dddLineArray[i]}${numberLineArray[i]},${data[1]},${data[2]}\n`
            }
        }
    } else if (cheksRemove9 === false && cheksAdd9 === false) {
        for (let i = 0; i < result.length; i++) {
            let linha = result[i]

            let data = linha.split(",")

            let dddLine = data[0].slice(2, 4);
            let numberLine = data[0].slice(4, 13)

            dddLineArray.push(dddLine);
            numberLineArray.push(numberLine);

            boxValueDddResultNov = boxValueDddNov += `55${dddLineArray[i]}${numberLineArray[i]},${data[1]},${data[2]}\n`
        }
    }
    $('#floatingTextarea1').val(boxValueDddResultNov)
}