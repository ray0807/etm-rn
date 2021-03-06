/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, Text, View, TouchableOpacity, Image} from 'react-native';
import {createStackNavigator, createAppContainer, NavigationActions, StackActions} from 'react-navigation';
import HomeScreen from './js/screen/HomeScreen'
import TestScreen from './js/screen/TestScreen'
import LoginScreen from './js/screen/LoginScreen'
import SplashScreen from "./js/screen/SplashScreen";
import TransferScreen from "./js/screen/chain/TransferScreen";
import VoteScreen from "./js/screen/chain/VoteScreen";
import PersonalScreen from "./js/screen/chain/PersonalScreen";
import EponyScreen from "./js/screen/dapp/EponyScreen";
import SecretScreen from "./js/screen/dapp/SecretScreen";


//全局存储

import './js/utils/Global'


const MainNavigator = createStackNavigator({
        Splash: {
            screen: SplashScreen
        },
        Home:
            {
                screen: HomeScreen, navigationOptions: ({navigation, screeProps}) => ({
                //这里设置StackNavigator属性和一般情况下Tabbar不同页面可能会不同的属性
                headerRight:
                    <TouchableOpacity onPress={() => navigation.dispatch(afterRegisterAction)}>
                        <Image style={{width: 20, height: 20, marginRight: 10}}
                               source={require('./img/icon_login.png')}/>
                    </TouchableOpacity>,
                //设置StackNavigator属性
                title: 'wallet',

            })
            },
        Test: {
            screen: TestScreen
        },
        Login: {
            screen: LoginScreen
        },
        Transfer: {
            screen: TransferScreen
        },
        Vote: {
            screen: VoteScreen
        },
        Personal: {
            screen: PersonalScreen
        },
        Epony: {
            screen: EponyScreen
        },
        Secret: {
            screen: SecretScreen
        },
    },
    {
        initialRouteName: 'Home', // 默认显示界面
        navigationOptions:
            {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
                headerStyle: {
                    elevation: 0, shadowOpacity:
                        0, height:
                        48, backgroundColor:
                        "#2196f3"
                }
                ,
                headerTitleStyle: {
                    color: '#fff', fontSize:
                        16
                }
                , //alignSelf:'center'  文字居中
                headerBackTitleStyle: {
                    color: '#fff', fontSize:
                        12
                }
                ,
                // headerTintColor:{},
                gesturesEnabled: true,//是否支持滑动返回收拾，iOS默认支持，安卓默认关闭

            }
        ,
        backBehavior: true,
        mode:
            'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
        headerMode:
            'screen', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
        onTransitionStart:
            (Start) => {
                console.log('导航栏切换开始');
            },  // 回调
        onTransitionEnd:
            () => {
                console.log('导航栏切换结束');
            }  // 回调
    }
    )
;

const defaultGetStateForAction = MainNavigator.router.getStateForAction;

MainNavigator.router.getStateForAction = (action, state) => {
    //页面是MeScreen并且 global.user.loginState = false || ''（未登录）
    //首次进入Splash
    // if (!action.routeName) {
    //     this.routes = [
    //         {key: 'id-' + Date.now(), routeName: 'Splash'},
    //     ];
    //     return {
    //         routes,
    //         index: this.routes.length - 1,
    //     };
    // }
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


//app.js
//注册之后自动跳转到登录页面中，并且重置导航stack，使得不能返回注册页面
export const afterRegisterAction = StackActions.reset({
    index: 1,   //1表示当前调度到Login页面
    actions: [  //新的导航操作历史
        NavigationActions.navigate({routeName: 'Home'}),
        NavigationActions.navigate({routeName: 'Login'}),
    ]
})

//回到首页，且清空stack中的其他的导航记录。
export const resetToHomeAction = StackActions.reset({
    index: 0,   //对应actions中的index。指定当前页面。
    actions: [  //替换之后的导航记录
        NavigationActions.navigate({routeName: 'Home'})
    ]
})

const App = createAppContainer(MainNavigator);

export default App;
