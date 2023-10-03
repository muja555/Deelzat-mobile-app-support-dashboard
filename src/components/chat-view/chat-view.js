import React, {useCallback, useState} from 'react';
import {chatViewStyle as style} from "./chat-view.style";
import ConversationList from "../conversation-list/conversation-list.component";
import ConversationRoom from "../conversation-room/conversation-room";
import useWindowDimensions from "../../misc/window-dimensions";
import ConversationsTabs from "../conversations-tabs/conversations-tabs";
import ConversationsOptionsModal from "../conversation-options-modal/conversation-options-modal";
import {deleteChatRoomForUser, getRoomName, updateRoomDataForUser} from "../conversation-room/conversation-room.util";
import {SUPPORT_ACCOUNT} from "../../misc/support-account";

const TABS_HEIGHT = 50;

const ChatView = () => {

    const [selectedUserId, selectedUserIdSet] = useState();
    const [isStarredTabSelected, isStarredTabSelectedSet] = useState(false);

    const [isModalVisible, isModalVisibleSet] = useState(false);
    const [optionsItem, optionsItemSet] = useState();

    const { height, width } = useWindowDimensions();

    const onClickConversation = (item) => {
        selectedUserIdSet(item.otherUser?.userId)
    }

    const onClickAvatar = (item) => {
        optionsItemSet(item);
        isModalVisibleSet(true);
    };

    const onCloseModal = () => {
        isModalVisibleSet(false);
        optionsItemSet();
    }

    const onClickStar = () => {
        const roomName = getRoomName(optionsItem.otherUser.userId, SUPPORT_ACCOUNT.userId);
        updateRoomDataForUser(SUPPORT_ACCOUNT.userId, roomName, {
            ...optionsItem,
            isStarred: !optionsItem.isStarred
        })
        onCloseModal();
    }

    const onClickRemove = () => {
        const itemUserId = optionsItem.otherUser.userId;

        if (itemUserId === selectedUserId) {
            selectedUserIdSet();
        }

        const roomName = getRoomName(itemUserId, SUPPORT_ACCOUNT.userId);
        deleteChatRoomForUser(SUPPORT_ACCOUNT.userId, roomName);
        onCloseModal();
    }

    return (
        <div>
            <div style={{...style.container, ...{height: height}}}>
                <div style={style.leftPanel}>
                    <ConversationsTabs
                        onSelectTab={isStarredTabSelectedSet}
                        isStarredTabSelected={isStarredTabSelected}/>
                    <ConversationList
                        key={"==is starred: " + isStarredTabSelected} // to invoke refresh on change selection
                        filterIsStarred={isStarredTabSelected}
                        viewStyle={{...style.conversationsList, ...{height: height - TABS_HEIGHT}}}
                        onClickAvatar={onClickAvatar}
                        onClickItem={onClickConversation}/>
                </div>
                <div style={style.separator}/>
                <div style={style.messagesView}>
                    {
                        (selectedUserId) &&
                        <ConversationRoom key={selectedUserId} toUserId={selectedUserId}/>
                    }
                </div>
            </div>
            {
                (isModalVisible) &&
                <ConversationsOptionsModal
                    onClose={onCloseModal}
                    onClickStar={onClickStar}
                    onClickRemove={onClickRemove}/>
            }
        </div>
    )
}

export default ChatView
