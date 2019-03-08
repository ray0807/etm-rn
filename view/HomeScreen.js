import React, {Component} from 'react';
import {Button,YellowBox, StyleSheet, View,Text} from 'react-native';

// onPress={() => navigate('Profile', {name: 'Jane'})}
let socket = require('socket.io-client')('http://etm.red:8096');

console.ignoredYellowBox = ['Remote debugger'];
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);


socket.on('connect', function() {
    // console.warn("connect!!");
});

socket.on('blocks/change', function(data) {
    if (data && data.height > 0) {
        // console.warn('应用节点正常出块！height:',data.height);
    }else{
        // console.warn('应用节点没有出块！！！data:',data);
    }

});
socket.on('disconnect', function() {
    // console.warn("connect!!");
});

export default class HomeScreen extends React.Component {


    static navigationOptions = {
        title: 'entanmo wallet',
    };

    render() {
        const {navigate} = this.props.navigation;
        return (

            <View style={styles.container}>
                <Button title="登录" style={styles.instructions} onPress={() => console.log('socket:',socket,'|||str:',{str})}>
                </Button>
                <Button title="注册" style={styles.instructions}>
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
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 15,
    },
});
