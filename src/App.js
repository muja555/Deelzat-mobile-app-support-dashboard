import React, {useState} from "react";
import "./App.css";
import ChatView from "./components/chat-view/chat-view";
import PushNotificationHandler from "./components/push-notification-handler/push-notification-handler.component";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
// } from "react-router-dom";

import ReactiveButton from 'reactive-button';
import {useAuth0} from "@auth0/auth0-react";
import useWindowDimensions from "./misc/window-dimensions";

const App = () => {

    const {
        isAuthenticated,
        loginWithRedirect,
        error,
    } = useAuth0();

    const {height, width} = useWindowDimensions();

    console.log("App.js " + "errore", error)
    console.log("App.js " + "isAuthenticated", isAuthenticated)



    if (!isAuthenticated) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20%'}}>
                <PushNotificationHandler/>
                <ReactiveButton   idleText={'Login'}
                                  type='button'
                                  buttonState={'idle'}
                                  width={width / 6}
                                  rounded={true}
                                  height={height / 11}
                                  onClick={loginWithRedirect} />
            </div>
        )
    }

    return (
        <>
            <PushNotificationHandler/>
            <ChatView/>
        </>
        // <Router>
        //   <div>
        //     {/* A <Switch> looks through its children <Route>s and
        //       renders the first one that matches the current URL. */}
        //     <Switch>
        //       {/*<Route path="/chatroom/:toUserId" component={ConversationRoom} />*/}
        //       <Route path="/">
        //         <ConversationListComponent onClickItem={onClickConversation} />
        //         <ConversationRoom match={{
        //           params: {
        //             toUserId: 'email|60fe5cfad1ce9f9dc8cd0796'
        //           }
        //         }}/>
        //       </Route>
        //     </Switch>
        //   </div>
        // </Router>
    )
}

export default App;
