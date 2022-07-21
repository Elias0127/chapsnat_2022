import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { getAuth, } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const auth = getAuth();

    async function handleSubmit() {
        console.log("handle submit envoked!!")

        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.bigBlue}>Login Here</Text>
                <View style={styles.inputView1}>
                    <TextInput
                        placeholder='Email'
                        placeholderTextColor="#003f5c"
                        onChangeText={(email) => setEmail(email)}
                    />
                </View>
                <View style={styles.inputView2}>
                    <TextInput
                        placeholder='Password'
                        secureTextEntry={true}
                        placeholderTextColor="#003f5c"
                        onChangeText={(password) => setPassword(password)}
                    />
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={() => {
                    handleSubmit();
                }}>
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.redirectBtn} onPress={() => {
                    navigation.navigate("Signup")
                }}>
                    <Text>Sign up </Text>
                </TouchableOpacity>
            </View>

        </>
    )
}
const styles = StyleSheet.create({

    container: {
        backgroundColor: 'yellow',

    },
    redirectBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "grey",
        color: "white",
        marginLeft: '9%'
    },
    inputView1: {
        backgroundColor: 'white',
        color: '#3A59FF',
        width: "60%",
        borderRadius: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        marginLeft: '19%',
        padding: "2%",
        fontSize: 27,
        marginTop: '10%'
    },
    inputView2: {
        backgroundColor: 'white',
        color: '#3A59FF',
        width: "60%",
        borderRadius: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        marginLeft: '19%',
        padding: "2%",
        fontSize: 27,
        marginTop: '5%'
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginLeft: '9%',
        backgroundColor: "#FF1493",
    },
    bigBlue: {
        backgroundColor: 'white',
        color: '#3A59FF',
        width: "75%",
        borderRadius: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        marginLeft: '11%',
        padding: "2%",
        fontSize: 27,
        marginTop: '50%'
    }
})





