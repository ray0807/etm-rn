import React, {Component} from 'react';
import {TextInput, View, StyleSheet, Dimensions} from 'react-native';
import Button from 'react-native-button';
import BaseScreen from './BaseScreen'

let WINDOW_WIDTH = Dimensions.get('window').width;

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
        // 使用key来保存数据。这些数据一般是全局独有的，常常需要调用的。
        // 除非你手动移除，这些数据会被永久保存，而且默认不会过期。
        storage.save({
            key: 'loginState',  // 注意:请不要在key中使用_下划线符号!
            data: {
                userid: '1001',
                userName: 'userName',
                token: 'token'
            },

            // 如果不指定过期时间，则会使用defaultExpires参数
            // 如果设为null，则永不过期
            // 8个小时后过期
            expires: 1000 * 3600 * 8
        });
        //用户登录数据
        global.user = {
            loginState: true,//登录状态
            userData: {userid: '1001', userName: 'userName', token: 'token'},//用户数据

        };
        // global.user.loginState = true;//设置登录状态
        // global.user.userData = {userid: '1001', userName: 'userName', token: 'token'};//保存用户数据

        console.warn("secret:", this.state.secret)
        // setTimeout(() => {
        //     this.props.navigation.navigate('Home')//跳转到用户页面
        // }, 2000)
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
