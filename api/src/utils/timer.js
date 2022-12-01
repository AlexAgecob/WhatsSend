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


module.exports = {
    doSomething
}