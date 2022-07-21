import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, } from 'firebase/firestore';
import db from "../../firebase";
import { DATE_FORMAT } from 'react-native-gifted-chat';




const auth = getAuth();

export function useAuthentication() {
    const [user, setUser] = useState();
    const [userData, setData] = useState();

    useEffect(() => {
        const unsubscribeFromAuthStatusChanged = onAuthStateChanged(auth, (user) => {



            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                setUser(user);
                const docRef = doc(db, "users", user.uid);
                getDoc(docRef).then((dataSnapshot) => {
                    console.log("Document data:", dataSnapshot.data());
                    setData(dataSnapshot.data())
                    console.log(user);

                })

            } else {
                // User is signed out
                setUser(undefined);
            }
        });

        return unsubscribeFromAuthStatusChanged;
    }, []);

    return {
        user,
        userData
    };
}