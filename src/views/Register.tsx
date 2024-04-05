import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

const RegisterScreen: React.FC = () => {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [phone, setPhone] = useState('');

    const handleRegister = () => {
        console.log(name, lastname, email, password, passwordConfirmation, phone);
    };

    return (
        <View style={styles.container}>
            <Text>Register</Text>
            <TextInput label="Name" value={name} onChangeText={setName} />
            <TextInput label="Lastname" value={lastname} onChangeText={setLastname} />
            <TextInput label="Email" value={email} onChangeText={setEmail} />
            <TextInput label="Password" secureTextEntry value={password} onChangeText={setPassword} />
            <TextInput label="Confirm Password" secureTextEntry value={passwordConfirmation} onChangeText={setPasswordConfirmation} />
            <TextInput label="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
            <Button mode="contained" onPress={handleRegister}>Register</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
});

export default RegisterScreen;
