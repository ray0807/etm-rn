import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Text, Image, Clipboard, TouchableOpacity} from 'react-native';
import Button from 'react-native-button';

import BaseScreen from '../BaseScreen'

import {BACKGROUND_COLOR, LINE_COLOR, SEND_COLOR} from '../../config/Config'


import {transaction} from 'etm-js-rn'
import {sendETM} from '../../utils/http'

export default class TransferScreen extends BaseScreen {

    constructor() {
        super();
        this.state = {
            receiveAddress: '',
            msg: '',
            amount: '',
        }

    }

    //获取剪切板文字
    // async getClipboardContent() {
    //     try {
    //         let content = await Clipboard.getString();
    //         console.warn("content:", content)
    //     } catch (e) {
    //         console.warn("getClipboardContent error:", e.toString())
    //     }
    // }

    sendCallback(data) {

        if (data) {
            if (data && data.success) {
                console.warn(data)
            } else {
                console.warn(data.error)
            }
        } else {
            console.warn("服务器出错")
        }
    }

    transfer() {
        if (this.validate()) {
            sendETM(this.state.receiveAddress, Number(this.state.amount) * 1e8, this.state.msg, global.user.secret, '', this.sendCallback)
        }
    }

    validate() {
        try {
            if (Number(this.state.amount) <= 0) {
                //转账金额不能小于0
                console.warn("转账金额不能小于0")
                return false
            }
            if (this.state.receiveAddress.length < 0 || !this.state.receiveAddress.startsWith("A")) {
                //转账金额不能小于0
                console.warn("非法接收地址:", this.state.receiveAddress)
                return false
            }
            if (this.state.receiveAddress == global.user.address) {
                //转账金额不能小于0
                console.warn("不允许给自己的地址转账")
                return false
            }
            return true

        } catch {
            return false;
        }
    }

    static navigationOptions = {
        title: '转账',
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.laout}>
                    <Text style={styles.textLabel}>
                        发送者地址:
                    </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.textShow}>
                            {global.user.address}
                        </Text>
                        <TouchableOpacity onPress={() => {
                            Clipboard.setString(global.user.address);

                        }}>
                            <Image style={{height: 20, width: 20, marginTop: 10}}
                                   source={require('../../../img/copy.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.textLabel1}>
                        接收者地址:
                    </Text>
                    <TextInput
                        style={styles.normalInput}
                        placeholder="接收者地址"
                        onChangeText={(text) => this.setState({receiveAddress: text})}/>

                    <Text style={styles.textLabel1}>
                        转账金额:
                    </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <TextInput
                            style={styles.addressInput}
                            keyboardType='numeric'
                            placeholder="请输入转账金额"
                            onChangeText={(text) => {
                                this.setState(
                                    {amount: text.replace(/[^0-9.]*/g, '')}
                                )
                                // this.props.onChangeText(Number(text).toFixed(2));
                            }
                            }
                            value={this.state.amount}
                        />
                        <Text style={styles.etmLabel}>ETM</Text>
                    </View>
                    <Text style={styles.textLabel1}>
                        手续费:
                    </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <TextInput
                            style={styles.addressInput}
                            defaultValue={'0.1'}
                            editable={false}
                        />
                        <Text style={styles.etmLabel}>ETM</Text>
                    </View>

                    <Text style={styles.textLabel1}>
                        备注信息:
                    </Text>
                    <TextInput
                        style={styles.normalInput}
                        placeholder="请输入备注信息"
                        onChangeText={(text) => this.setState({msg: text})}/>


                    <Button
                        style={{
                            fontSize: 20, color: '#fff'
                        }}
                        styleDisabled={{color: '#999999'}}
                        containerStyle={{
                            height: 45,
                            width: null,
                            marginTop: 40,
                            backgroundColor: SEND_COLOR,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={() => this.transfer()}
                    >
                        登录
                    </Button>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
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
        marginTop: 10
    },
    textLabel1: {
        fontSize: 18,
        color: '#666',
        marginTop: 20
    },
    textShow: {
        flex: 1,
        fontSize: 14,
        color: '#555',
        marginTop: 10
    },
    line: {
        marginTop: 20,
        height: 0.5,
        width: null,
        backgroundColor: LINE_COLOR
    }
});
