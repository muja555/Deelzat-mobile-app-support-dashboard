import React from 'react';
import {conversationRoomHeaderStyle as style} from "./conversation-room-header.style";
import {formatDate, getUserImage, removeEmptyKeys} from "../../misc/methods";
import {JsonTable} from "react-json-to-html";

const ConversationRoomHeader = (props) => {
    const {
        avatarUrl,
        title,
        shopId,
        shopData,
        userId,
    } = props;


    const data1 = {
        user_id: userId || '',
        shop_id: shopId || '',
        shop_name: shopData?.name || 'not set',
        created_at: formatDate(shopData?.createdAt) || 'not created'
    }

    const data2 = {
        shop_address: {
            city: shopData?.address?.city || 'not set',
            country: shopData?.address?.country || 'not set',
            street: shopData?.address?.street || 'not set',
        },
        shop_contact: {
            whatsapp: shopData?.extra_data?.whatsapp_number || 'not set',
            email: shopData?.user?.email || 'not set',
        },
    }

    return (
        <div style={style.bigContainer}>
            <div style={style.container}>
                <div style={style.titleDiv}>
                    <div style={{height: 5}} />
                    <div style={style.titleName}>
                        {title}
                    </div>
                    <div style={{height: 5}} />
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-around'}}>
                        <JsonTable json={data1}
                                   css={style.jsonTable}/>
                        <div style={{width: 10}}/>
                        <JsonTable json={data2}
                                   css={style.jsonTable}/>
                    </div>
                </div>
                <div style={style.imageContainer}>
                    <img style={style.avatar} src={getUserImage(avatarUrl)}/>
                </div>
            </div>
            <div style={style.separator}/>
        </div>
    )
}

export default ConversationRoomHeader;
