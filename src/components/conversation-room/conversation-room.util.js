import firebase from '../../firebase'

const getRoomName = (user1, user2) => {
    return user1 > user2?
        user2 + "-" + user1
        : user1 + "-" + user2;

}
export {getRoomName as getRoomName}


const updateRoomDataForUser = (forUserId, roomName, messageData) => {

    return firebase.firestore().collection(`users/${forUserId}/chat_rooms`)
        .doc(roomName)
        .set(messageData, {merge: true}).catch(console.warn)
}
export {updateRoomDataForUser as updateRoomDataForUser}


const getChatProfileFromFirestore = (firebase, userId) =>  firebase.firestore().collection('users')
    .doc(userId)
    .get()
    .then(doc => doc.data())
    .catch(console.warn)
export {getChatProfileFromFirestore as getChatProfileFromFirestore}


const deleteChatRoomForUser = (forUserId, roomName) => firebase.firestore().collection(`users/${forUserId}/chat_rooms`)
    .doc(roomName)
    .delete()
    .catch(console.warn)
export {deleteChatRoomForUser as deleteChatRoomForUser}


