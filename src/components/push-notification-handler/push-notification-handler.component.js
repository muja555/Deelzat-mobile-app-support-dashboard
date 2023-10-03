import React, {useEffect, useState} from 'react';
import {messaging} from '../../firebase';
import {updateToken} from "../../misc/apis";
import {SUPPORT_ACCOUNT} from "../../misc/support-account";
import UID from 'uniquebrowserid';

function PushNotificationHandler() {

    const [serviceWorker, serviceWorkerSet] = useState();

    const updateTokenAPI = (token) => {
        var userAgent = navigator.userAgent;
        updateToken({
            token: token,
            device_id: new UID().completeID(),
            os: 'web',
            logged_in: true,
            user_id: SUPPORT_ACCOUNT.userId,
            token_valid: true,
            locale: 'ar',
            app_version: '10',
            app_build: '999',
            app_version_build: '999',
            brand: userAgent,
            os_version: '1'
        })
    }

    useEffect(() => {

        (async () => {

            if ("serviceWorker" in navigator) {

                console.log("==== service worker found");
                navigator.serviceWorker
                    .register("./firebase-messaging-sw.js")
                    .then(function(registration) {
                        console.log("Registration successful, scope is:", registration.scope);
                        serviceWorkerSet(registration);
                    })
                    .catch(function(err) {
                        console.log("Service worker registration failed, error:", err);
                    });
            } else {

                console.log("==== no service worker !");
            }

        })();
    }, []);


    useEffect(() => {

        if (messaging && serviceWorker) {
            messaging.requestPermission()
                .then(async function() {
                    const token = await messaging.getToken({
                        vapidKey: "BEJ5YzlndS-gfH1dxSqLFO83P19ir5GZ9W0h0l35dX5BWXoAq_nGEoh5rq29L70i376uNtolZtTpNMYoe0tyHws",
                        serviceWorkerRegistration: serviceWorker
                    });
                    updateTokenAPI(token);
                    console.log("=== token: ", token);
                })
                .catch(function(err) {
                    console.log("Unable to get permission to notify.", err);
                });
        }

    }, [serviceWorker]);

    return (
        <></>
    );
}

export default PushNotificationHandler;
