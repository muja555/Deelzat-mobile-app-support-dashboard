import React, {useEffect, useRef, useState} from 'react';
import {conversationRoomStyle as style} from "./conversation-room.style";
import 'react-chat-elements/dist/main.css';
import {ReactComponent as SendIcon} from '../../assets/icons/SendArrow.svg';
import {ReactComponent as AttachIcon} from '../../assets/icons/NewGallery.svg';
import {ReactComponent as CloseIcon} from '../../assets/icons/Close.svg';
import '../../styles.css';
import {
    Input,
    MessageList,
} from 'react-chat-elements';

import {getChatProfileFromFirestore, getRoomName} from "./conversation-room.util";
import {SUPPORT_ACCOUNT} from "../../misc/support-account";
import firebase from "../../firebase"
import useWindowDimensions from "../../misc/window-dimensions";
import ConversationRoomHeader from "../conversation-room-header/conversation-room-header";
import {getShopData, postChatMessage} from "../../misc/apis";


const INPUT_HEIGHT = 50;
const HEADER_HEIGHT = 100;


//const ConversationRoom = ({match}) => {

    // const {toUserId} = match.params;

const ConversationRoom = (props) => {

    const {
        toUserId
    } = props;

    const [messages, messagesSet] = useState([])
    const [otherUser, otherUserSet] = useState();
    const [shopData, shopDataSet] = useState();
    const [inputText, inputTextSet] = useState('');
    const [sendButtonDisabled, sendButtonDisabledSet] = useState();
    const {height, width} = useWindowDimensions();

    const [imageToSend, imageToSendSet] = useState();
    const [showImageInput, showImageInputSet] = useState(false);
    const [imageUploadPercentage, imageUploadPercentageSet] = useState(false);

    const inputRef = useRef(null);
    const messageListRef = useRef(null);
    const imageRef = useRef(null);

    const roomName = getRoomName(toUserId, SUPPORT_ACCOUNT.userId)

    useEffect(() => {

        // Get other user profile
        getChatProfileFromFirestore(firebase, toUserId)
            .then(otherUserSet);

        // Fetch messages
        const messageRef = firebase.firestore().collection('chat_rooms')
            .doc(roomName)
            .collection('messages')
            .orderBy('createdAt', "desc")
            .limit(20)

        return messageRef.onSnapshot((querySnap) => {

            const _messages = querySnap.docs.map(docSnap => {
                const data = docSnap.data();
                if (data.createdAt) {
                    return {
                        ...docSnap.data(),
                        createdAt: docSnap.data().createdAt.toDate(),
                        position: 'left'
                    }
                } else {
                    return {
                        ...docSnap.data(),
                        createdAt: new Date(),
                    }
                }
            });

            messagesSet(mapMessages(_messages))
        });

    }, []);

    // Get shop data
    useEffect(() => {

        if (!otherUser?.shopId) {
            shopDataSet();
        } else {
            getShopData(otherUser?.shopId)
                .then(shopDataSet)
                .catch(console.warn)
        }
    }, [otherUser])


    // Scroll to bottom on each message
    useEffect(() => {
        messageListRef?.current?.scrollIntoView({behavior: "instant"});
    }, [messages]);


    const sendMessage = () => {

        if (sendButtonDisabled) {
            return;
        }

        const toSend = {
            text: inputText?.trim(),
            createdAt: new Date(),
            sentBy: SUPPORT_ACCOUNT.userId,
            sentTo: toUserId,
            user: SUPPORT_ACCOUNT,
        }

        if (imageToSend?.downloadURL) {
            toSend.image = imageToSend.downloadURL;
        }

        console.log("conversation-room.js " + "toSend.image", toSend.image);

        postChatMessage({
            other_user: otherUser,
            sender_user: SUPPORT_ACCOUNT,
            room_name: roomName,
            message: toSend,
            is_support_conv: true
        })
            .then(console.log)
            .catch(console.warn);

        inputTextSet('')
        inputRef.current.clear();

        showImageInputSet(false);
        imageToSendSet();
        imageUploadPercentageSet(0);
    }

    const inputTextOnChange = (e) => {
        inputTextSet(e.target.value);
    }

    const onOpen = (msg) => {
        window.open(msg?.data?.uri)
    }

    const clickOnAttachImage = () => {
        showImageInputSet(true);
    }


    const onFileChange = (e) => {
        const files = e.target.files;
        if (files?.length > 0) {
            let file = files[0];
            file.src = URL.createObjectURL(file);
            imageToSendSet(file);

            startUploading(file);

            setTimeout(() => {
                imageRef?.current?.scrollIntoView({behavior: "smooth"});
            }, 100);
        }
    }


    const startUploading = (file) => {

        const fileName = `${SUPPORT_ACCOUNT.userId}_${Math.random().toString(36).substring(7)}.jpg`;
        const folderName = new Date().toLocaleDateString('en-US').replace(/\//g, '-').replace(',', '-');
        const filePath = `chat_media/${roomName}/${folderName}/${fileName}`;

        const uploadTask = firebase.storage()
            .ref(filePath)
            .put(file);

        imageToSendSet(old => ({
            ...old,
            filePath,
            uploadTask
        }))

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                imageUploadPercentageSet(prog);
            },
            (error) => console.log(error),
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    imageToSendSet(old => ({
                        ...old,
                        downloadURL: url
                    }));
                });
            }
        );
    }

    const removeImageToSend = () => {
        imageToSend?.uploadTask?.cancel();

        firebase.storage()
            .ref(imageToSend.filePath)
            .delete()
            .then(() => {
                console.log('delete complete');
            })
            .catch(console.warn);

        showImageInputSet(false);
        imageToSendSet();
        imageUploadPercentageSet(0);
    }

    useEffect(() => {

        let disableSend = false;
        if (!inputText && !imageToSend) {
            disableSend = true;
        }

        if (imageToSend && imageUploadPercentage < 99) {
            disableSend = true;
        }

        sendButtonDisabledSet(disableSend);

    }, [imageUploadPercentage, imageToSend, inputText]);


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setTimeout(sendMessage, 50);
        }
    }

    return (
        <div style={style.container}>
            <ConversationRoomHeader
                userId={toUserId}
                shopId={otherUser?.shopId}
                avatarUrl={otherUser?.avatar}
                shopData={shopData}
                title={otherUser?.name}/>
            <div style={{
                ...style.messageList,
                ...{height: height - INPUT_HEIGHT - HEADER_HEIGHT}
            }}>
                <MessageList
                    lockable={true}
                    downButtonBadge={10}
                    onOpen={onOpen}
                    dataSource={messages}/>
                <div ref={messageListRef}/>
            </div>
            <div style={style.composer}>
                {
                    (showImageInput) &&
                    <input type="file" accept="image/*" onChange={onFileChange}/>
                }
                <Input
                    placeholder="Type message"
                    defaultValue=""
                    ref={inputRef}
                    multiline={true}
                    onKeyDown={handleKeyDown}
                    onChange={inputTextOnChange}
                    rightButtons={
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <a style={style.sendIcon}
                               onClick={clickOnAttachImage}>
                                <AttachIcon/>
                            </a>
                            <a style={{...style.sendIcon, opacity: sendButtonDisabled ? 0.5 : 1}}
                               onClick={sendMessage}>
                                <SendIcon/>
                            </a>
                        </div>
                    }/>
            </div>
            {
                (!!imageToSend) &&
                <div style={{display: 'flex'}}>
                    <img src={imageToSend.src} ref={imageRef} style={{
                        width: 100,
                        height: 100
                    }}/>
                    <a onClick={removeImageToSend}>
                        <div style={{marginLeft: -15, backgroundColor: 'white', borderRadius: 10, height: 20}}>
                            <CloseIcon style={{width: 17, height: 17, paddingRight: -10}}/>
                        </div>
                    </a>
                    <div style={{color: '#ff00aa', fontSize: 25, marginLeft: -70, marginTop: 40, fontWeight: 'bold'}}>
                        {imageUploadPercentage >= 100 ? '✓' : '%' + imageUploadPercentage}
                    </div>
                </div>
            }
        </div>
    );
}

export default ConversationRoom;


const mapMessages = (_messages) => {

    const newMessages = [];

    // Make a new message bubble for each image,
    // If a message contains multiple images.
    _messages.forEach(message => {

        if (message.images) {
            message.images.split(',').forEach(image => newMessages.push({...message, image: image}))
        } else {
            newMessages.push(message)
        }
    });

    return newMessages.map(msg => {

        const position = msg.sentBy === SUPPORT_ACCOUNT.userId? 'right': 'left';

        const mapped = {
            ...msg,
            position,
            type: "text",
        };

        if (msg.image) {
            mapped.type = 'photo'
            mapped.data = {
                uri: msg.image,
                width: 250,
                height: 250,
            };
        }

        mapped.date = mapped.createdAt;
        return mapped;
    }).reverse();
}
