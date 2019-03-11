import React, {Component} from 'react';

export default class BaseScreen extends React.Component {
    constructor() {
        super()

    }

    //解决内存泄漏
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

}