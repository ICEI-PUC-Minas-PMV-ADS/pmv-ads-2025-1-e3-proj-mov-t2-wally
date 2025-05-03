import React from "react";
import { StyleSheet, Pressable, Text } from "react-native";

type BlueButtonProps = {
    text: string;
    color: "blue" | "lightblue";
}

function BlueButton({ text, color }: BlueButtonProps) {
    return(
        <>
        <Pressable style={[styles.container, styles[color]]} android_ripple={{color: "#dddddd"}}
        >
            <Text style={styles.text}>{text}</Text>
        </Pressable>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        
        width: 300,
        paddingVertical: 15,
        paddingHorizontal: 110,
        marginVertical: 5,
        borderRadius: 10,
    },
    blue: {
        backgroundColor: "#48A6A7",
    },
    lightblue: {
        backgroundColor: "#9ACBD0",
    },
    text: {
        width: 98,
        color: "#fff",
        textAlign: "center",
        fontFamily: "Poppins_700Bold",
        
    }
})

export default BlueButton;