import React, {Component} from 'react';
import {TextInput, View, StyleSheet, Dimensions} from 'react-native';
import Button from 'react-native-button';
import BaseScreen from './BaseScreen'
import {crypto} from 'etm-js-rn'

import {resetToHomeAction} from '../../App'

let WINDOW_WIDTH = Dimensions.get('window').width;

import {SAVE_LOGIN_URL, USER_KEY} from '../config/Config'

import {storage} from '../utils/Storage'

//force video glimpse venue material misery math cube work point jelly pledge
//AQ3ySa6PiU1f3VR9S4LsmJKRU1bW6U5Pfa

export default class LoginScreen extends BaseScreen {
    constructor() {
        super()
        this.state = {
            secret: '',
        }
    }

    static navigationOptions = {
        title: '登录',
    };


    login() {


        fetch(SAVE_LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'magic': 'personal',
                'version': ''
            },
            body: JSON.stringify({"publicKey": crypto.getKeys(this.state.secret).publicKey}),
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).then((json) => {
            if (json && json.success) {

                global.user = {
                    loginState: true,//登录状态
                    userData: {},//用户数据
                    secret: this.state.secret,
                    address: json.account.address
                };
                this.props.navigation.dispatch(resetToHomeAction)  //跳转到首页
                storage.save(USER_KEY, {"secret": this.state.secret, "address": json.account.address})
            }
        }).catch((error) => {
            console.error(error);
        });


    }
    

    render() {
        return (<View style={styles.container}>

            <TextInput
                style={styles.input}
                placeholder="请输入密码"
                secureTextEntry={true}
                onChangeText={(text) => this.setState({secret: text})}/>
            <Button
                style={{fontSize: 20, color: '#333333'}}
                styleDisabled={{color: '#999999'}}
                containerStyle={{
                    padding: 10,
                    height: 45,
                    width: WINDOW_WIDTH - 40,
                    margin: 20,
                    overflow: 'hidden',
                    borderRadius: 4,
                    backgroundColor: '#ffffff'
                }}
                onPress={() => this.login()}
            >
                登录
            </Button>
            <Button
                style={{fontSize: 20, color: '#333333'}}
                containerStyle={{

                    padding: 10,
                    height: 45,
                    width: WINDOW_WIDTH - 40,
                    marginLeft: 20,
                    marginRight: 20,
                    overflow: 'hidden',
                    borderRadius: 4,
                    backgroundColor: '#ffffff'
                }}
                styleDisabled={{color: '#999999'}}
                // onPress={() => this._handlePress()}
            >
                注册
            </Button>
        </View>)
    }
}
const styles = StyleSheet.create({
    input: {
        width: WINDOW_WIDTH - 40,
        height: 45,
        borderWidth: 1,
        marginLeft: 20,
        marginRight: 20,
        paddingLeft: 5,
        borderColor: '#ccc',
        borderRadius: 4
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
