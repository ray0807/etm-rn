import React, {Component, PropTypes} from 'react';
import {
    View,
    Animated,
    StatusBar,
    Dimensions,
} from 'react-native';
import BaseScreen from './BaseScreen'

let WINDOW_WIDTH = Dimensions.get('window').width;


export default class SplashScreen extends BaseScreen {

    ae() {
        this.props.navigation.navigate('Home')
    }

    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0.4),
        };
    }

    // static navigationOptions = {
    //     title: 'Wallet',
    // };

    componentDidMount() {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 1,
                duration: 1500,
            }
        ).start(() => {
            //动画执行完毕
            this.ae()
        });
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar backgroundColor="blue" barStyle="light-content"/>
                <View>
                    <StatusBar hidden={true}/>
                </View>
                <Animated.Image style={{flex: 1, width: WINDOW_WIDTH, height: null, opacity: this.state.fadeAnim}}
                                source={require('../../img/sp.jpg')}/>
            </View>

        );
    }

}