import React from 'react';
import '../../styles.css'
import {ConversationsTabsStyle as style} from './conversations-tabs.style'

const ConversationsTabs = (props) => {

    const {
        isStarredTabSelected = false,
        onSelectTab = (isStarredTab) => {}
    } = props;

    return (
        <div style={style.container}>
            <div
                className={`conversations-list-tab-button ${isStarredTabSelected ? "conversations-list-tab-button-selected" : ""}`}
                onClick={() => onSelectTab(true)}>
                starred
            </div>
            <div
                className={`conversations-list-tab-button ${!isStarredTabSelected ? "conversations-list-tab-button-selected" : ""}`}
                onClick={() => onSelectTab(false)}>
                all
            </div>
        </div>
    )
}

export default ConversationsTabs;
