import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Text, Image, Clipboard, TouchableOpacity} from 'react-native';
import Button from 'react-native-button';
import BaseScreen from '../BaseScreen'

import {BACKGROUND_COLOR, SEND_COLOR} from '../../config/Config'

import {setSecondPassword} from '../../utils/http'
import {crypto} from 'etm-js-rn'

export default class PersonalScreen extends BaseScreen {

    constructor() {
        super()
        this.state = {
            secondPassword1: '',
            secondPassword2: '',
            isDisabled: true
        }
        this.setSecondPasswordCallback = this.setSecondPasswordCallback.bind(this)
    }


    static navigationOptions = {
        title: '个人中心',
    };

//satoshi color congress fortune dynamic income venture defy motion extra crouch crane
    setSecondPasswordCallback(data) {
        if (data.success) {
            console.warn('设置成功')
        } else {
            console.warn('设置失败')
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.laout}>
                    <Text style={styles.textLabel}>
                        地址:
                    </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.textShow}>
                            {global.user.address}
                        </Text>
                        <TouchableOpacity onPress={() => {
                            Clipboard.setString(global.user.address);
                            console.warn('复制成功')
                        }}>
                            <Image style={{height: 20, width: 20, marginTop: 10}}
                                   source={require('../../../img/copy.png')}
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.textLabel}>
                        公钥:
                    </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.textShow}>
                            {crypto.getKeys(global.user.secret).publicKey}
                        </Text>
                        <TouchableOpacity onPress={() => {
                            Clipboard.setString(crypto.getKeys(global.user.secret).publicKey);
                            console.warn('复制成功')

                        }}>
                            <Image style={{height: 20, width: 20, marginTop: 10}}
                                   source={require('../../../img/copy.png')}
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.textLabel1}>
                        二级密码:
                    </Text>
                    <TextInput
                        style={styles.normalInput}
                        placeholder="请输入二级密码"
                        editable={global.user.secondSecret.length == 0}
                        onChangeText={
                            (text) => {
                                this.setState({secondPassword1: text})
                                if (text && text.length > 0 && text == this.state.secondPassword2) {
                                    this.setState({isDisabled: false})
                                } else {
                                    this.setState({isDisabled: true})
                                }
                            }
                        }
                    />
                    <TextInput
                        style={styles.normalInput}
                        placeholder="再次输入二级密码"
                        editable={global.user.secondSecret.length == 0}
                        onChangeText={(text) => {
                            this.setState({secondPassword2: text})
                            if (text && text.length > 0 && text == this.state.secondPassword1) {
                                this.setState({isDisabled: false})
                            } else {
                                this.setState({isDisabled: true})
                            }
                        }}
                    />

                    <Button
                        style={{
                            fontSize: 20, color: '#fff'
                        }}
                        styleDisabled={{color: '#999999'}}
                        disabled={this.state.isDisabled}
                        containerStyle={{
                            height: 45,
                            width: null,
                            marginTop: 10,
                            backgroundColor: SEND_COLOR,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={() => setSecondPassword(global.user.secret, this.state.secondPassword1, this.setSecondPasswordCallback)}
                    >
                        {global.user.secondSecret.length == 0 ? '确认设置' : '您已经设置过二级密码'}
                    </Button>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: BACKGROUND_COLOR,
    },
    normalInput: {
        width: null,
        height: 36,
        borderWidth: 1,
        marginTop: 10,
        paddingLeft: 10,
        borderColor: '#ccc',
        borderRadius: 4
    },
    etmLabel: {
        width: null,
        height: 36,
        borderWidth: 1,
        marginTop: 10,
        padding: 10,
        borderColor: '#ccc',
        borderBottomRightRadius: 4,
        borderTopRightRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc'
    },
    addressInput: {
        flex: 1,
        width: null,
        height: 36,
        borderWidth: 1,
        paddingLeft: 10,
        marginTop: 10,
        borderColor: '#ccc',
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
    },
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: BACKGROUND_COLOR,
    },
    laout: {
        margin: 10,
        backgroundColor: '#fff',
        padding: 10,
    },
    textLabel: {
        fontSize: 18,
        color: '#666',
        marginTop: 30
    },
    textLabel1: {
        fontSize: 18,
        color: '#666',
        marginTop: 40
    },
    textShow: {
        flex: 1,
        fontSize: 14,
        color: '#555',
        marginTop: 10
    }
});
