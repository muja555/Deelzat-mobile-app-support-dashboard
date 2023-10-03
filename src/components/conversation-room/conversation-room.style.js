const style = {
    container: {
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    messageList: {
        width: '100%',
        marginTop: 10,
        overflowY: 'scroll',
        overflowX: 'scroll'
    },
    composer: {
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1,
        justifyContent: 'flex-end',
    },
    sendIcon: {
        paddingLeft: 20,
        cursor:'pointer',
    },
    galleryIcon: {
        paddingRight: 20,
        cursor:'pointer',
    }
}

export {style as conversationRoomStyle};
