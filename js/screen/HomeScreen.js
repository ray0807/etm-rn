import React, {Component} from 'react';
import {YellowBox, StyleSheet, View, Text} from 'react-native';

import Button from 'react-native-button';

import BaseScreen from './BaseScreen'


let socket = require('socket.io-client')('http://etm.red:8096');

console.ignoredYellowBox = ['Remote debugger'];
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);


export default class HomeScreen extends BaseScreen {

    constructor() {
        super()
        this.state = {
            blockNums: 0,
            balance: 0
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
    }


    static navigationOptions = {
        title: 'entanmo wallet',
    };

    _handlePress() {
        this.props.navigation.navigate('Test')
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>

                <View style={{margin: 2, padding: 20, flexDirection: 'row', backgroundColor: '#FFFFFF'}}>
                    <View style={styles.blockStyle}>
                        <Text style={styles.noteTextStyle}>我的余额(ETM)</Text>
                        <Text style={styles.bigTextStyle}>1000</Text>
                    </View>
                    <View style={{width: 1, marginTop: 10, marginBottom: 10, backgroundColor: '#cccccc'}}></View>
                    <View style={styles.blockStyle}>
                        <Text style={styles.noteTextStyle}>区块高度</Text>
                        <Text style={styles.bigTextStyle}>{this.state.blockNums}</Text>
                    </View>

                </View>
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
                    onPress={() => this._handlePress()}>
                    登录
                </Button>

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
