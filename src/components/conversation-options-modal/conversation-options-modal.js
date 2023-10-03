import React from 'react';
import {conversationOptionsModalStyle as style} from "./conversation-options-modal.style";
import {ReactComponent as StarIcon} from '../../assets/icons/Star.svg';
import {ReactComponent as DeleteIcon} from '../../assets/icons/Delete.svg';

const ConversationsOptionsModal = (props) => {

    const {
        onClickRemove = (item) => {},
        onClickStar = (item) => {},
        onClose = () => {},
    } = props;

    return (
        <div className={'options-modal'}>
            <div style={style.closeBtn} onClick={onClose}>
                X
            </div>
            <div style={style.buttonsContainer}>
                <button style={style.starButton} onClick={onClickStar}>
                    star/unstar conversation
                    <StarIcon />
                </button>
                <button style={style.deleteButton} onClick={onClickRemove}>
                    remove conversation
                    <DeleteIcon />
                </button>
            </div>
        </div>
    )
}

export default ConversationsOptionsModal;
