import React, {Component} from 'react';
import {TextInput, View, StyleSheet, Dimensions} from 'react-native';
import Button from 'react-native-button';
import BaseScreen from './BaseScreen'

import {resetToHomeAction} from '../../App'

let WINDOW_WIDTH = Dimensions.get('window').width;

import {BACKGROUND_COLOR} from '../config/Config'

import {login} from '../utils/http'


//force video glimpse venue material misery math cube work point jelly pledge
//AQ3ySa6PiU1f3VR9S4LsmJKRU1bW6U5Pfa

export default class LoginScreen extends BaseScreen {
    constructor() {
        super()
        this.state = {
            secret: '',
        }
        this.loginCallback = this.loginCallback.bind(this)
    }

    static navigationOptions = {
        title: '登录',
    };


    loginCallback(data) {
        if (data) {
            this.props.navigation.dispatch(resetToHomeAction)  //跳转到首页
        } else {
            console.warn("登录出错")
        }
        
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
                onPress={() => login(this.state.secret, this.loginCallback)}
            >
                登录
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
        marginTop: 100,
        paddingLeft: 5,
        borderColor: '#ccc',
        borderRadius: 4
    },
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
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
    }
});
