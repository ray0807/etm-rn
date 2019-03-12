import React, {Component} from 'react';
import {TextInput, View, StyleSheet, Dimensions} from 'react-native';
import Button from 'react-native-button';
import BaseScreen from './BaseScreen'

import {resetToHomeAction} from '../../App'

let WINDOW_WIDTH = Dimensions.get('window').width;

import {BACKGROUND_COLOR, SEND_COLOR} from '../config/Config'

import {login} from '../utils/http'


//force video glimpse venue material misery math cube work point jelly pledge
//AQ3ySa6PiU1f3VR9S4LsmJKRU1bW6U5Pfa

export default class LoginScreen extends BaseScreen {
    constructor() {
        super()
        this.state = {
            secret: '',
            secondSecret: ''
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
            <View style={styles.laout}>

                <TextInput
                    style={styles.input}
                    placeholder="请输入密码"
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({secret: text})}/>
                <TextInput
                    style={styles.input}
                    placeholder="请输入二级密码"
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({secondSecret: text})}/>

                <Button
                    style={{
                        fontSize: 20, color: '#fff'
                    }}
                    styleDisabled={{color: '#999999'}}
                    containerStyle={{
                        height: 45,
                        width: null,
                        marginTop: 40,
                        marginLeft: 20,
                        marginRight: 20,
                        marginBottom: 20,
                        backgroundColor: SEND_COLOR,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={() => this.transfer()}
                >
                    登录
                </Button>
            </View>

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
        marginTop: 20,
        paddingLeft: 5,
        borderColor: '#ccc',
        borderRadius: 4
    },
    laout: {
        margin: 5,
        backgroundColor: '#fff',
        padding: 10,
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
