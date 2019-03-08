import React, {Component} from 'react';
import {Button,YellowBox, StyleSheet, View,Text} from 'react-native';


export default class TestScreen extends React.Component {


    static navigationOptions = {
        title: 'TestScreen',
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text> 'TestScreen'</Text>
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
