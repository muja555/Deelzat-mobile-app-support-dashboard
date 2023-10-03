import React, {useEffect, useState} from "react";
import {conversationListStyle as style} from "./conversation-list.style"
import firebase from "../../firebase"
import ConversationListItem from "../conversation-list-item/conversation-list-item.component";
import {SUPPORT_ACCOUNT} from "../../misc/support-account";

const PAGE_SIZE = 10;

const ConversationList = (props) => {

    const {
        onClickItem = (item) => {},
        onClickAvatar = (item) => {},
        viewStyle = {},
        filterIsStarred = false,
    } = props;


    let conversationsQuery =
        firebase.firestore()
            .collection(`users/${SUPPORT_ACCOUNT.userId}/chat_rooms`);
    if (filterIsStarred) {
        conversationsQuery = conversationsQuery.where("isStarred", "==", filterIsStarred)
    }
    conversationsQuery = conversationsQuery.orderBy('lastMessageTime', "desc")
        .limit(PAGE_SIZE);


    const [currentPage, currentPageSet] = useState(1);
    const [conversations, conversationsSet] = useState([]);
    const [lastDoc, lastDocSet] = useState()

    const updateList = (newLatestConv, remove = false) => {
        const currIndex = conversations.findIndex(conv => conv.roomName === newLatestConv.roomName);
        if (currIndex === -1) {
            conversationsSet(oldConvs => [newLatestConv, ...oldConvs]);
        }
        else {
            const _temp = [...conversations];
            _temp.splice(currIndex, 1);
            if (!remove) {
                _temp.unshift(newLatestConv);
            }
            conversationsSet(_temp);
        }
    }

    useEffect(() => {

        let ignoreUpdate = true;

        const latestConRef = firebase.firestore()
            .collection(`users/${SUPPORT_ACCOUNT.userId}/chat_rooms`)
            .orderBy('lastMessageTime', "desc")
            .limit(1);

        return latestConRef.onSnapshot(querySnap => {

            if (ignoreUpdate) {
                ignoreUpdate = false;
                return;
            }

            const changes = querySnap.docChanges();

            if (changes.length > 0) {

                const latestChange = changes[changes.length - 1]
                const latestConv = latestChange.doc.data();

                if (latestChange.type === "added") {

                    updateList(latestConv);
                } else if (latestChange?.type === "modified") {

                    updateList(latestConv);
                } else if (latestChange?.type === "removed") {

                    updateList(latestConv, true);
                }
            }
        });

    }, [conversations]);

    useEffect(() => {

        // fetch chat list
        if (lastDoc) {
            conversationsQuery
                .startAfter(lastDoc)
                .get()
                .then(docData => {
                    lastDocSet(docData.docs[docData.docs.length - 1])
                    conversationsSet(oldConvs => [...oldConvs, ...docData.docs?.map(docSnap => docSnap.data())]);
                });
        }
        else {
            conversationsQuery
                .get()
                .then(docData => {
                    lastDocSet(docData.docs[docData.docs.length - 1])
                    conversationsSet(docData.docs?.map(docSnap => docSnap.data()));
                });
        }

    }, [currentPage]);

    const onScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            currentPageSet(oldPage => oldPage + 1)
        }
    }

    return (
        <div style={{...style.scrollContainer, ...viewStyle}} onScroll={onScroll}>
            {
                conversations.map((item, index) => (
                    <React.Fragment key={item.roomName + "_" + index} >
                        <ConversationListItem item={item} onClickItem={onClickItem} onClickAvatar={onClickAvatar}/>
                        <div style={style.separator} />
                    </React.Fragment>
                ))
            }
        </div>
    )
}

export default ConversationList
