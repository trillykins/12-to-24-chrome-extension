
const text = document.querySelectorAll('h1,h2,h3,h4,h5,p,li,td,caption,span,div')
const regex = new RegExp(/(0?[1-9]|1[0-2])(:([0-5]\d))?\s?((?:A|P)\.?M\.?)/gi)

for (let i = 0; i < text.length; i++) {
    if (regex.test(text[i].innerHTML)) {
        // console.log(text[i].innerHTML)
        const matches = text[i].innerHTML.match(regex)
        for (const match of matches) {
            // Converting rules taken from: https://www.freecodecamp.org/news/mathematics-converting-am-pm-to-24-hour-clock/
            if (match.toLowerCase().endsWith('am')) {
                // 12 AM: subtract 12 hours
                if (match.startsWith("12")) {
                    const replacement = match.toLowerCase().replace("12:", "00:").replace(" am", "");
                    text[i].innerHTML = text[i].innerHTML.replace(match, replacement)
                    // console.log("Replaced (" + match + ") with (" + replacement + ")")
                } else {
                    // 01:00 AM - 12:59 PM: Same, just remove AM suffix
                    const replacement = match.toLowerCase().replace("am", "")
                    text[i].innerHTML = text[i].innerHTML.replace(match, replacement)
                    // console.log("Replaced (" + match + ") with (" + replacement + ")")
                }
            } else if (match.toLowerCase().endsWith('pm')) {
                if (match.startsWith("12")) {
                    // Same as above (just the 12 PM match)
                    const replacement = match.toLowerCase().replace("pm", "")
                    text[i].innerHTML = text[i].innerHTML.replace(match, replacement)
                    // console.log("Replaced (" + match + ") with (" + replacement + ")")
                } else {
                    // 01:00 PM - 12:59 AM (add 12 hours)
                    const indexOfColon = match.indexOf(":")
                    let hours = parseInt(match.substring(0, indexOfColon))
                    hours += 12
                    let replacement = match.toLowerCase().replace("pm", "")
                    replacement = hours + replacement.substring(indexOfColon)
                    text[i].innerHTML = text[i].innerHTML.replace(match, replacement)
                    // console.log("Replaced (" + match + ") with (" + replacement + ")")
                }
            }
        }
    }
}