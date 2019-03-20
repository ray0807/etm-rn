import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';

import BaseScreen from '../BaseScreen'
import {SEND_COLOR, icons, BACKGROUND_COLOR, LINE_COLOR} from '../../config/Config'

import {getSecretUserInfo, registerSecretDapp} from '../../utils/http'

import {getRandom} from '../../utils/util'
import {randomName} from '../../utils/RandomName'


let WINDOW_WIDTH = Dimensions.get('window').width;


export default class SecretScreen extends BaseScreen {

    constructor() {
        super()

    }

    componentDidMount() {
        if (global.user) {
            getSecretUserInfo(global.user.address, (data) => {
                if (!data) return
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
    }


    static navigationOptions = ({navigation, screeProps}) => ({
        //这里设置StackNavigator属性和一般情况下Tabbar不同页面可能会不同的属性
        headerRight:
            <TouchableOpacity onPress={() => {
            }}>
                <Image style={{width: 20, height: 20, marginRight: 10}}
                       source={require('../../../img/send.png')}/>
            </TouchableOpacity>,
        //设置StackNavigator属性
        title: '秘密',

    })

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={{
                    width: WINDOW_WIDTH - 20,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    margin: 10,
                    padding: 10,
                    borderRadius: 3
                }}>
                    <Image roundAsCircle={true}
                           style={{
                               width: 50,
                               height: 50,
                               borderRadius: 25,
                               borderColor: '#ddd',
                               borderWidth: 1,
                               marginTop: 10
                           }}
                           imageStyle={{borderRadius: 25}}
                           source={{uri: 'http://imgv2.oss-cn-shanghai.aliyuncs.com/images/rn/image/beer.png'}}>

                    </Image>
                    <Text style={styles.nickName}>
                        中国吧啦巴拉巴拉
                    </Text>
                    <View style={{marginTop: 20, height: 0.5, width: WINDOW_WIDTH - 20, backgroundColor: LINE_COLOR}}/>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.blockStyle}>
                            <Text style={styles.tabStyle}>接收的信息</Text>
                        </View>
                        <View style={styles.blockStyle}>
                            <Text style={styles.tabStyle}>发送的信息</Text>
                        </View>
                    </View>


                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BACKGROUND_COLOR,
    },
    nickName: {
        marginTop: 10,
        color: '#333',
        fontSize: 25

    },
    tabStyle: {
        marginTop: 10,
        fontSize: 16,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    blockStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    }
});
