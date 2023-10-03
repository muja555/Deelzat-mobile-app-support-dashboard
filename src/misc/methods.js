const url = require("url");

const getUserImage = (imageUrl) => {
    if (imageUrl?.includes("fbsbx") && imageUrl?.includes("asid")) {
        const queryObject = url.parse(imageUrl,true).query;
        const fbId = queryObject.asid;
        return `https://graph.facebook.com/${fbId}/picture?type=large`;
    }
    return imageUrl;
}
export {getUserImage as getUserImage}


const NOFIT_URL = 'https://firebasestorage.googleapis.com/v0/b/deelzat-76871.appspot.com/o/slack.mp3?alt=media&token=fa301062-a63a-4869-b6fb-0373252c4d6f';
const playAlertSound = () => {

    var beepsound = new Audio(NOFIT_URL);
    beepsound.play().then(console.log).catch(console.error);
}
export {playAlertSound as playAlertSound}


const formatDate = (timeStr) => {
    if (!timeStr) {
        return '';
    }

    let temp = timeStr.split("T")[0].split("-").reverse(),
        newFormat;

    temp[0] = temp.splice(1, 1, temp[0])[0];
    newFormat = temp.join("/");
    if (newFormat.charAt(0) === "0") {
        newFormat = newFormat.slice(1);
    }

    return newFormat + '   (month/day/year)';

}
export {formatDate as formatDate}

export function removeEmptyKeys(obj) {
    Object.entries(obj).forEach(([k, v]) => {
        (v ?? delete obj[k]);

        if (obj[k] === '(not set)' || obj[k] === '') {
            delete obj[k];
        }

        if (v && typeof v === 'object') {
            removeEmptyKeys(v)
        }
    });
}
