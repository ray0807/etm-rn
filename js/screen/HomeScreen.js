import React, {Component} from 'react';
import {YellowBox, StyleSheet, View, Text, ScrollView} from 'react-native';


import BaseScreen from './BaseScreen'
import {BASE_URL, GET_ADDRESS_URL, USER_KEY, BACKGROUND_COLOR} from '../config/Config'


let socket = require('socket.io-client')(BASE_URL);


import MainGrid from '../view/Gridview'
import DappMainGrid from '../view/DappGridview'

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


    render() {
        let navi = this.props.navigation
        return (
            <View style={styles.container}>
                <ScrollView>
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
                    <Text style={styles.introStyle}>
                        主链操作
                    </Text>
                    <View style={{marginLeft: 10, marginRight: 10, backgroundColor: '#fff'}}>
                        <MainGrid navi={navi}/>

                    </View>
                    <Text style={styles.introStyle}>
                        Dapps
                    </Text>
                    <View style={{marginLeft: 10, marginRight: 10, backgroundColor: '#fff'}}>
                        <DappMainGrid navi={navi}/>

                    </View>

                    <Text style={styles.introStyle}>
                        交易记录
                    </Text>
                    <View style={{height: 100, backgroundColor: '#ffffff'}}/>
                </ScrollView>


                <View style={{flex: 1}}/>


                {
                    //如果登录了就隐藏
                    global.user &&
                    <View/>
                    /*<Button
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
                    </Button>*/
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
        backgroundColor: BACKGROUND_COLOR,
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
    },
    rightIcon: {
        height: 20,
        width: 20
    },
    scrollViewStyle: {
        height: 200,
    },
    itemStyle: {
        // 尺寸
        width: 1000,
        height: 200
    },
    introStyle: {
        fontSize: 18,
        color: '#666666',
        margin: 10
    },
});
