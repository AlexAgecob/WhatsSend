// document.getElementById('qr-code-img').onerror = function() {
//     // alert('Xi, deu erro!');
//     console.log("erro")
// }

// console.log('sss')


// function is_img(file) {
// var img = new Image();
// img.src = file;
// img.onload = function() {
// console.log("A imagem " + file + " existe");
// }
// img.onerror = function() {
// console.log("A imagem " + file + " NAO existe");
// }
// }
// is_img("../assets/code/out.png");
// is_img("imagem-garfield-2.jpg");

const api = axios.create({
    baseURL: 'http://localhost:3333/',
})

const timer = (seconds) => {
    let time = seconds * 1000
    return new Promise(res => setTimeout(res, time))
}

const doSomething = async () => {
    for (var i = 0; i < 5; i++) {
        // console.log("Looping... " + i);
        await timer(1);
    }
}

// function getQrcode() {
//     try {
//         api.get('/qrcode')
//             .then(res => {
//                 console.log(res.data)

//                 // return res.data

//                 // if (res.status == 200) {
//                 //     console.log(res.data)
//                 // } else {
//                 //     console.log(res);
//                 // }
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     } catch {
//         console.log('Erro ')
//     }
// }


async function getQrcode() {
    let qrcodeIsValid = false;
    // let count = 0

    while (!qrcodeIsValid) {
        try {
            await api.get('/qrcode')
                .then(res => {
                    if (res.status == 200) {
                        // console.log(res.data.Image)

                        document.getElementById("loading").classList.add('hide');

                        $('#qr-code-img').attr('src', res.data.Image)
                        document.getElementById("qr-code-img").classList.remove('hide');
                        document.getElementById("qr-code-img").classList.add('show');


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

        await doSomething()

        try {
            await api.get('/venom/logged')
                .then(res => {
                    if (res.data.Login == 'Authenticate') {
                        qrcodeIsValid = true;
                        console.log(res.data.Login)
                        
                        window.location.href = 'http://localhost:3333/whats/send';

                    } else {
                        console.log(res);
                        // console.log(res.status)
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        } catch (err) {
            console.log('Erro: venom/logged')
        }




        // count = count + 1
        // if (count == 5) {
        // qrcodeIsValid = true;
        // console.log('acabou')
        // }
    }

}


// const result = getQrcode();

// console.log(result)

getQrcode()

// console.log('sllslslslsl')

