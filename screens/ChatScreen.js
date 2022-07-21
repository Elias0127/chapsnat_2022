import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import db from "../firebase";
import { collection, onSnapshot, updateDoc, arrayUnion, doc } from "firebase/firestore";
import { useAuthentication } from '../utils/hooks/useAuthentication';

export default function ChatScreen({ navigation }) {
    const [messages, setMessages] = useState([]);
    const { user, userData } = useAuthentication();
    console.log(userData, "userdata in chat screen");

    useEffect(() => {
        let unsubscribeFromNewSnapshots = onSnapshot(doc(db, "Chats", "myfirstchat"), (snapshot) => {
            console.log("New Snapshot! ", snapshot.data().messages);
            setMessages(snapshot.data().messages);
        });

        return function cleanupBeforeUnmounting() {
            unsubscribeFromNewSnapshots();
        };
    }, []);

    const onSend = useCallback(async (messages = []) => {
        await updateDoc(doc(db, "Chats", "myfirstchat"), {
            messages: arrayUnion(messages[0])
        });
        // setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, []);

    return (
        <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={
                userData
            }
            inverted={false}
            showUserAvatar={true}
            renderUsernameOnMessage={true}
        />
    );
}