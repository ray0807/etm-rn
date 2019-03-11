import React, {Component} from 'react';
import {Button, YellowBox, StyleSheet, View, Text} from 'react-native';

import BaseScreen from '../BaseScreen'

export default class VoteScreen extends BaseScreen {


    static navigationOptions = {
        title: '投票',
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>转账</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 15,
    },
});
