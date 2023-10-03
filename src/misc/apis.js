
// input notifyUserWithMessage = {
//     to_user_id: string;
//     from_user_id: string;
//     sender_name: string;
//     avatar: string;
//     message: string;
// }

// input updateToken = {
//     to_user_id: string;
//     from_user_id: string;
//     sender_name: string;
//     avatar: string;
//     message: string;
// }

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const FIREBASE_FUNCTIONS = process.env.REACT_APP_FIREBASE_FUNCTOINS;
const API_KEY =  process.env.REACT_APP_API_KEY


const postChatMessage = (input) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(input)
    };
    return fetch(`${FIREBASE_FUNCTIONS}/messageSender`, requestOptions);
}
export {postChatMessage as postChatMessage}


const notifyUserWithMessage = (input) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(input)
    };
    return fetch(BASE_URL +
        '/app/messaging/web/notify' +
        '?api_key=' + API_KEY,
        requestOptions)

}
export {notifyUserWithMessage as notifyUserWithMessage}


const updateToken = (input) => {
    console.log(JSON.stringify(input));
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(input)
    };
    return fetch(BASE_URL +
        '/app/devices',
        requestOptions)
}
export {updateToken as updateToken}


const getShopData = (shopId) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': BASE_URL
        },
    };
    return fetch(BASE_URL+
        '/app/shop/' + shopId +
        '?api_key=' + API_KEY,
        requestOptions)
        .then(data => data.json())

}
export {getShopData as getShopData}
