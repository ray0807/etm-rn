import React, {Component} from 'react';
import {YellowBox, StyleSheet, View, Text} from 'react-native';

import Button from 'react-native-button';

import BaseScreen from './BaseScreen'
import {BASE_URL, GET_ADDRESS_URL, USER_KEY} from '../config/Config'


let socket = require('socket.io-client')(BASE_URL);

import {afterRegisterAction} from '../../App'


console.ignoredYellowBox = ['Remote debugger'];
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);


export default class HomeScreen extends BaseScreen {

    constructor() {
        super()
        this.state = {
            blockNums: 0,
            balance: 0,
            isHiddenLogin: false,
        }

        // socket.on('connect', function () {
        //     // console.warn("connect!!");
        //
        // });


        socket.on('blocks/change', this.getBlockHeight);
        // socket.on('disconnect', function () {
        //     // console.warn("connect!!");
        // });


    }

    getBlockHeight = (data) => {
        if (data && data.height > 0) {
            this.setState({blockNums: data.height});
        }
        if (global.user && global.user.loginState && global.user.address) {
            fetch(GET_ADDRESS_URL + global.user.address)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                }).then((json) => {
                if (json && json.success) {
                    this.setState({balance: (json.balance / 1e8).toFixed(2)});
                }
            }).catch((error) => {
                console.error(error);
            });
        }

    }


    static navigationOptions = {
        title: 'wallet',
    };

    doLogin() {
        // this.props.navigation.navigate('Test')
        this.props.navigation.dispatch(afterRegisterAction)
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={{margin: 2, padding: 20, flexDirection: 'row', backgroundColor: '#FFFFFF'}}>
                    <View style={styles.blockStyle}>
                        <Text style={styles.noteTextStyle}>我的余额(ETM)</Text>
                        <Text style={styles.bigTextStyle}>{this.state.balance}</Text>
                    </View>
                    <View style={{width: 1, marginTop: 10, marginBottom: 10, backgroundColor: '#cccccc'}}></View>
                    <View style={styles.blockStyle}>
                        <Text style={styles.noteTextStyle}>区块高度</Text>
                        <Text style={styles.bigTextStyle}>{this.state.blockNums}</Text>
                    </View>

                </View>
                {
                    //如果登录了就隐藏
                    // global.user &&
                    <Button
                        style={{fontSize: 20, color: '#333333'}}
                        styleDisabled={{color: '#999999'}}
                        containerStyle={{
                            padding: 10,
                            height: 45,
                            overflow: 'hidden',
                            borderRadius: 4,
                            backgroundColor: '#ffffff'
                        }}
                        onPress={() => this.doLogin()}>
                        登录
                    </Button>
                }

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#FBFBFB',
    },
    blockStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    bigTextStyle: {
        fontSize: 25,
        color: '#333333',
        marginTop: 5
    },
    noteTextStyle: {
        fontSize: 20,
        color: '#666666'
    }
});
