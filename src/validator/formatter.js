const trim = function () {
    const a = (" Harsh Jain  ")
    let result = a.trim()
    console.log(result)
}
module.exports.trim = trim

const changeToLowerCase = function () {
    const a = (" Harsh Jain ")
    let result = a.toLowerCase()
    console.log(result)
}

module.exports.changeToLowerCase = changeToLowerCase


const changeToUpperCase = function () {
    const a = (" Harsh Jain ")
    let result = a.toUpperCase()
    console.log(result)
}
module.exports.changeToUpperCase = changeToUpperCase
