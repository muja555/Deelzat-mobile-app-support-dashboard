const style = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        width: '100%',
    },
    leftPanel: {
        width: '35%',
        flexDirection: 'column',
    },
    conversationsList: {
        overflowY: 'scroll',
    },
    messagesView: {
        width: '70%',
        overflowY: 'scroll',
    },
    separator: {
        width: 2,
        backgroundColor: '#aaa'
    },
    modalContainer: {
        position: 'absolute',
        margin: 'auto',
        zIndex: 1000,
        width: '40%',
        height: '40%',
        top: 0, left: 0, right: 0, bottom: 0,
        borderColor: 'grey',
        borderWidth: 2,
    }
}

export {style as chatViewStyle}
