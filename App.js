/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, Text, View} from 'react-native';
import {transaction} from 'etm-js-rn'
import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './js/screen/HomeScreen'
import TestScreen from './js/screen/TestScreen'
import LoginScreen from './js/screen/LoginScreen'
import SplashScreen from "./js/screen/SplashScreen";


//全局存储

import './js/utils/Global'


// const instructions = Platform.select({
//     ios: 'transaction:' + JSON.stringify(transaction.createTransaction('AAA', 10000, 'test', 'aaaa aaa', '')),
//     android: 'transaction:' + JSON.stringify(transaction.createTransaction('AAA', 10000, 'test', 'aaaa aaa', ''))
// });

const MainNavigator = createStackNavigator({
    Splash: {screen: SplashScreen},
    Home: {screen: HomeScreen},
    Test: {screen: TestScreen},
    Login: {screen: LoginScreen},

}, {
    // initialRouteName: 'Splash', // 默认显示界面
    // navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
    //     headerStyle: {elevation: 0, shadowOpacity: 0, height: 48, backgroundColor: "#2196f3"},
    //     headerTitleStyle: {color: '#fff', fontSize: 16}, //alignSelf:'center'  文字居中
    //     headerBackTitleStyle: {color: '#fff', fontSize: 12},
    //     // headerTintColor:{},
    //     gesturesEnabled: true,//是否支持滑动返回收拾，iOS默认支持，安卓默认关闭
    //
    // },
    // mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
    // headerMode: 'screen', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
    // onTransitionStart: (Start) => {
    //     console.log('导航栏切换开始');
    // },  // 回调
    // onTransitionEnd: () => {
    //     console.log('导航栏切换结束');
    // }  // 回调
});

const defaultGetStateForAction = MainNavigator.router.getStateForAction;

MainNavigator.router.getStateForAction = (action, state) => {
    //页面是MeScreen并且 global.user.loginState = false || ''（未登录）
    if (action.routeName === 'Home' && (!global.user || !global.user.loginState)) {
        this.routes = [
            ...state.routes,
            {key: 'id-' + Date.now(), routeName: 'Login', params: {name: 'name1'}},
        ];
        return {
            ...state,
            routes,
            index: this.routes.length - 1,
        };
    }
    return defaultGetStateForAction(action, state);
};


const App = createAppContainer(MainNavigator);

export default App;
