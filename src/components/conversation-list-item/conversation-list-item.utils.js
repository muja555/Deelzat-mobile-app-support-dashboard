import TimeAgo from "javascript-time-ago";
import enLocale from "javascript-time-ago/locale/en"

let timeAgoInitialized = false;
if (!timeAgoInitialized) {
    TimeAgo.addDefaultLocale(enLocale)
    timeAgoInitialized = true;
}


let timeFormatter;
const getTimeSince = (dateMillis) => {

    if (!dateMillis)
        return '';

    if (!timeFormatter) {
        timeFormatter = new TimeAgo('ar')
    }

    return timeFormatter.format(dateMillis)
}
export {getTimeSince as getTimeSince}
