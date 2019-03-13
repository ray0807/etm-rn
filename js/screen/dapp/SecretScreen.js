import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Button from 'react-native-button';

import BaseScreen from '../BaseScreen'
import {SEND_COLOR} from '../../config/Config'

import {encodeString, decodeString} from '../../utils/CryptoUtils'

export default class SecretScreen extends BaseScreen {

    constructor() {
        super()

    }

    static navigationOptions = {
        title: 'SecretScreen',
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
                        let enMessage = encodeString('hello ray','269b62b831022f902ab5a5405b89e244d70a2d0fa86dd02d5fd1923804ffc930')
                        console.warn('encodeMessage:',enMessage)
                        // let deMessage = decodeString(enMessage,'imitate stem inflict wrong galaxy wonder meat body regular menu custom crater')
                        // console.warn('decodeMessage:',deMessage)
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
