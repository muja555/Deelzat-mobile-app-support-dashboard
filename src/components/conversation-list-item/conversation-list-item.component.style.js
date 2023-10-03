const style = {

    container: {
        width: '98%',
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        height: 70,
        alignItems: 'center',
        cursor: 'pointer',
        paddingLeft: 5,
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: '50%',
    },
    senderName: {
        fontSize: 15,
        fontFamily: 'Book',
        fontWeight: '700',
        marginBottom: 5,
    },
    textContainer: {
        display: 'flex',
        width: '90%',
        flexDirection: 'column',
        marginStart: 24,
        paddingTop: 1,
        marginLeft: 20,
        alignItems: 'flex-start'
    },
    senderNameContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    messageTime: {

    },
    messageText: {
        fontSize: 15,
        fontWeight: 400,
    },
    separator: {
        height: 2,
        width: '100%',
        backgroundColor: 'black'
    }
}

export { style as conversationsItemStyle };
