import React, { useState, useEffect } from "react";
import { FlatList, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import db from "../firebase";

export default function HomeScreen({ navigation }) {

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate("Chat")}
            >
                <Text style={styles.item}>hello</Text>
            </TouchableOpacity>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});