const style = {
    bigContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        minHeight: 80,
        backgroundColor: '#00A698'
    },
    separator: {
        width: '100%',
        height: 10,
        backgroundColor: '#09877d'
    },
    avatar: {
        width: 80,
        height: 80,
        marginLeft: -10,
        borderRadius: '50%',
        borderWidth: 1,
        borderColor: '#444'
    },
    titleName: {
        marginRight: 20,
        color: 'white',
        fontSize: 16,
        fontWeight: 800,
    },
    shopIdTitle: {
        marginRight: 20,
        color: 'white',
        fontSize: 12,
    },
    imageContainer: {
        flexDirection: 'column',
        width: '10%',
        height: '100%',
        display: 'flex',
        marginLeft: -50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleDiv: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    jsonTable: {
        jsonTr: {
            borderRadius: 2,
            height: '2px',
        },
        jsonTd: {
            padding: '5px',
            borderSpacing: '1px',
            borderRadius: '1px',
        },
        rowSpacer: {
            height: '2px'
        },
        rootElement: {
            padding: '5px',
            borderSpacing: '2px',
            backgroundColor: '#ffac44',
            fontFamily: 'Arial',
            borderRadius: '5px'
        },
        subElement: {
            padding: '5px',
            borderSpacing: '2px',
            backgroundColor: '#DDDDDD',
            fontWeight: 'bold',
            fontFamily: 'Arial',
            borderRadius: '5px',
            color: '#000'
        },
        dataCell: {
            borderSpacing: '2px',
            backgroundColor: '#ffffff',
            fontFamily: 'Arial',
            borderRadius: '5px',
        }
    }
}

export { style as conversationRoomHeaderStyle };
