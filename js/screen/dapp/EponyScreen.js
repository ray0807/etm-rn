import React, {Component} from 'react';
import {WebView, Linking} from 'react-native';

import BaseScreen from '../BaseScreen'

export default class EponyScreen extends BaseScreen {


    static navigationOptions = {
        title: 'Epony',
    };

    // _injectJavaScript = () => `
    //     var a = document.getElementsByTagName('a');
    //     for(var i = 0; i < a.length; i++){
    //         a[i].onclick = function (event) {
    //             window.postMessage(this.href);
    //             event.preventDefault();
    //         }
    //     }
    // `

    _onMessage = (e) => {
        console.warn(e)
        // Linking.openURL(e.nativeEvent.data).catch(err => console.error('An error occurred', err))
    }

    render() {
        return (
            <WebView
                onMessage={this._onMessage}
                style={{flex: 1}}
                source={{uri: 'http://epony.cn'}}
                // injectedJavaScript={this._injectJavaScript()}
            />
        );
    }
}

