import React, {Component} from 'react';
import {Button, YellowBox, StyleSheet, View, Text} from 'react-native';

import BaseScreen from '../BaseScreen'

export default class SecondScreen extends BaseScreen {


    static navigationOptions = {
        title: '设置密码',
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>设置密码</Text>
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
