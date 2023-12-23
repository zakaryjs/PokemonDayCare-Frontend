//@desc function to get the users current time
// used for account portal page

let getTime = () => {
    let myDate = new Date()
    let hours = myDate.getHours()
    let welcome

    if (hours < 12) {
        welcome = "morning"
     } else if (hours >= 12 && hours <= 17) {
        welcome = "afternoon"
     } else if (hours >= 17 && hours <= 24) {
        // eslint-disable-next-line no-unused-vars
        welcome = "evening" }

        return welcome
}

module.exports = {getTime}