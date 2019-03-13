import React, {Component} from 'react';

import BaseScreen from '../BaseScreen'

import {WebView} from '../../view/WebView';

export default class EponyScreen extends BaseScreen {


    static navigationOptions = {
        title: 'Epony',
    };


    _refWebView = (webview) => {
        this.webview = webview;
    }

    render() {
        return (
            <WebView

                ref={this._refWebView}
                source={{uri: 'http://epony.cn'}}
                style={{flex: 1}}
            />
        );
    }
}

