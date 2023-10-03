import React, {useEffect, useState} from 'react';
import {conversationsItemStyle as style} from "./conversation-list-item.component.style";
import {getTimeSince} from "./conversation-list-item.utils";
import {SUPPORT_ACCOUNT} from "../../misc/support-account";
import {getUserImage, playAlertSound} from "../../misc/methods";

// const Cotainer = styled.a`
//   transition: opacity 0.5s;
//   background-color: ${({ isGlowing }) => (isGlowing ? 'red' : 'white')};
// `;

const ConversationListItem = (props) => {

    const {
        item = {},
        onClickItem = (item) => {},
        onClickAvatar = (item) => {},
    } = props;


    const [isGlowing, isGlowingSet] = useState(false);

    const getMessageText = () => {

        const isThisSender = SUPPORT_ACCOUNT.userId === item.lastMessageSender;

        if (item.lastMessage === 'image' && isThisSender) {
            return 'لقد قمت بإرسال صورة'
        } else if (item.lastMessage === 'image') {
            return 'قام بإرسال صورة'
        } else {
            return `${isThisSender ? 'أنت: ' : ''}${item?.lastMessage}`;
        }
    }


    useEffect(() => {

        const messageListener = (message) => {

            const fromUserId = message?.data?.data?.with_user_id;
            if (item.otherUser.userId === fromUserId) {

                isGlowingSet(true);
                setTimeout(() => {
                    isGlowingSet(false);
                }, 500);
            }
        }

        navigator.serviceWorker.addEventListener("message", messageListener);

        return () => {
            navigator.serviceWorker.removeEventListener("message", messageListener);
        }

    }, []);

    useEffect(() => {

        if (isGlowing) {
            playAlertSound();
        }
    }, [isGlowing]);

    return (
        <a style={{...style.container}}
           role="button"
           tabIndex={0}
           className={isGlowing? 'glowOut' : (!item.isStarred? 'glowIn': 'starredNotGlow')}
           onClick={() => onClickItem(item)}>
            <img
                onClick={() => onClickAvatar(item)}
                style={style.avatar}
                src={getUserImage(item?.otherUser?.avatar)}/>
            <div style={style.textContainer}>
                <div style={style.senderNameContainer}>
                    <div style={style.senderName}>
                        {item?.otherUser?.name}
                    </div>
                    <div style={style.messageTime}>
                        {getTimeSince(item.lastMessageTime)}
                    </div>
                </div>
                <div style={style.messageText}>
                    {getMessageText()}
                </div>
            </div>
        </a>
    );

}
export default ConversationListItem;
