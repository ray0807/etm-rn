import React, {Component} from 'react';
import {Text} from 'react-native';
import BaseScreen from './BaseScreen'

export default class LoginScreen extends BaseScreen {
    constructor() {
        super()
    }

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
        global.user.loginState = true;//设置登录状态
        global.user.userData = {userid: '1001', userName: 'userName', token: 'token'};//保存用户数据

        setTimeout(() => {
            this.props.navigation.navigate('Home')//跳转到用户页面
        }, 2000)
    }

    render() {
        return (<Text>login</Text>)
    }
}
