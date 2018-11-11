import React, { Component } from 'react';
import { View, SafeAreaView, Text, TextInput, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../services/api';

export default class New extends Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        newTweet: '',
    }

    handleInputCHange = newTweet => {
        this.setState({ newTweet })
    }

    handleNewTweet = async () => {
        const content = this.state.newTweet;

        const author = await AsyncStorage.getItem("@GoTwitter:username");

        await api.post('tweets', {content, author});

        this.goBack();
    };

    goBack = () => {
        this.props.navigation.pop();
    };
    
    render() {
        return(
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.goBack}>
                        <Icon
                            name="close"
                            size={24}
                            color="#4BB0FF"
                        ></Icon>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={this.handleNewTweet}>
                        <Text 
                            style={styles.buttonText}
                        >
                            Twetar
                        </Text>
                    </TouchableOpacity>
                </View>
                <TextInput 
                    style={styles.input}
                    multiline
                    placeholder="O que está acontecendo?"
                    value={this.state.newTweet}
                    onChangeText={this.handleInputCHange}
                    placeholderTextColor="#999"
                    returnKeyType="send"
                    onSubmitEditing={this.handleNewTweet}
                >
                </TextInput>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },

    header: {
        paddingTop: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    button: {
        height: 32,
        paddingHorizontal: 20,
        borderRadius: 16,
        backgroundColor: "#4BB0EE",
        justifyContent: "center",
        alignItems: "center"
    },

    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold"
    },

    input: {
        margin: 20,
        fontSize: 16,
        color: "#333"
    }
});
