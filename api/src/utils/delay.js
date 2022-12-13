const delay = (seconds) => {
    let time = seconds * 1000
    return new Promise(res => setTimeout(res, time))
}

export { delay };