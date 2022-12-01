// BUSCA LINKS
$('#generate-numbers').click(()=> {
    $('#floatingTextarea1').val('');
    $('#floatingTextarea2').val('');

    let selectDddConsult = $('#select-ddd-search').val();
    let selectUfConsult = $('#select-uf-search').val();
    let selectQuantiadeConsult = $('#select-quantidade-search').val();

    const configs = {
        dddConfig: selectDddConsult,
        ufConfig: selectUfConsult,
        quantidadeConfig: selectQuantiadeConsult,
    };

    // console.log(configs);

    getNumbers(configs);

    // DESABILITA BOTAO DE GERAR LINKS
    $('#generate-numbers').prop("disabled", true);
    $('.button-generate').css("background", "#57595c");

    setTimeout(function(){
        // HABILITA BOTAO DE GERAR LINKS
        $('#geraLinks-todos').prop("disabled", false);
        $('.button-generate').css("background", "#1875ff");
    },120000)// 2 minutos

    // HABILITA BOTAO ATUALIZAR LINKS
    $('.button-update').css("background", "#1875ff");
    $('#update-numbers').prop("disabled", false);
});

const getNumbers = (configs) =>{
    let dataJson = {
        ddd_Consult: configs.dddConfig,
        uf_Consult:  configs.ufConfig,
        qtd_Consult: configs.quantidadeConfig,
    }

    $.ajax({
        url: '<?php echo base_url("/home/exports/get/$userId")?>',
        type: 'POST',
        data: JSON.stringify(dataJson),
        success: function(result){
            console.log(result)
            let response = JSON.parse(result);
            console.log(response);
        
            let dddArray = [];
            let numberArray = [];
            
            for(let i=0; i<response.length; i++){
                dddArray.push(response[i].ddd_mailing);
                numberArray.push(response[i].numero_mailing);
            }
            
            geraLinksAll(numberArray, dddArray);
        },
        error: function(resError){
            console.log(resError);
        }
    });
};

const geraLinksAll = (result, resultDdd) =>{
    let boxValueDdd = '';
    let boxWhatsapp = '';

    let boxValueDddResult = '';
    let boxWhatsappResult = '';

    for(let i=0; i<result.length; i++){
        let linha = result[i]
        let linhaResult = linha

        boxValueDddResult = boxValueDdd += `55${resultDdd[i]}${linhaResult}\n`
        boxWhatsappResult = boxWhatsapp += `https://wa.me/55${resultDdd[i]}${linhaResult}\n`
    }
    
    $('#floatingTextarea1').val(boxValueDddResult)
    $('#floatingTextarea2').val(boxWhatsappResult)
};