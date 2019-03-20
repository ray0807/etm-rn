import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Button from 'react-native-button';

import BaseScreen from '../BaseScreen'
import {SEND_COLOR, icons} from '../../config/Config'

import {getSecretUserInfo, registerSecretDapp} from '../../utils/http'

import {getRandom} from '../../utils/util'
import {randomName} from '../../utils/RandomName'


export default class SecretScreen extends BaseScreen {

    constructor() {
        super()

    }

    componentDidMount() {
        getSecretUserInfo(global.user.address, (data) => {
            if (data.user) {
                //设置内容
                console.warn(data.user)
            } else {
                //用户不存在 提示用户是否注册
                registerSecretDapp(icons[getRandom(icons.length)], randomName(), global.user.secret, (d) => {
                    console.warn(d)
                })
            }
        })
    }


    static navigationOptions = {
        title: '秘密',
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
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
                    onPress={() => {

                    }}
                >
                    登录
                </Button>
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
    }
});
