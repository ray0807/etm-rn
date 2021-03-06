import React, {Component} from 'react';
import {View, ListView, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {LINE_COLOR, INCOME_COLOR, OUT_COLOR, BACKGROUND_COLOR} from '../config/Config'

import {getBalanceTranscations} from '../utils/http'

import {utils} from 'etm-js-rn'

let moment = require('moment')

const BALANCE_COLOR = [INCOME_COLOR, OUT_COLOR];

const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
});

export class SimpleListView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataArray: [],
            balanceColor: INCOME_COLOR,
        };
        this.getTranscation = this.getTranscation.bind(this);
        this._renderHeader = this._renderHeader.bind(this)
        this.formatTime = this.formatTime.bind(this)
    }

    componentDidMount() {
        this.props.onRef(this)

    }

    formatTime(timestamp) {
        return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
    }

    homeClick = () => {
        this.state.dataArray = []
        getBalanceTranscations(global.user.address, this.getTranscation)

    };

    getTranscation(data) {
        if (data && data.success) {
            data.transactions.forEach((item) => {
                if (item.amount && item.amount > 0) {
                    this.state.dataArray.push({
                        "senderId": item.senderId,
                        "recipientId": item.recipientId,
                        "height": item.height,
                        "message": item.message ? item.message : '没有附加信息',
                        "id": item.id,
                        "amount": (item.amount / 1e8).toFixed(2),
                        "label": item.senderId == global.user.address ? "-" : "+",
                        "ts": item.timestamp
                    })
                }
            })
        }
        this.state.dataArray.sort((itemA, itemB) => {
            return itemB.height - itemA.height
        });

    }

    _renderHeader() {
        return (
            <View>
                <Text style={styles.introStyle}>
                    交易记录
                </Text>
                {
                    this.state.dataArray.length == 0 &&
                    <View style={{
                        height: 200, backgroundColor: '#fff', justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{fontSize: 30, color: '#999'}}>
                            暂无任何交易信息
                        </Text>

                    </View>

                }
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={ds.cloneWithRows(this.state.dataArray)}
                    renderRow={this._renderRow}
                    enableEmptySections={true}
                    renderHeader={this._renderHeader}
                />
            </View>
        )
    }

    _renderRow = (item, sectionID, rowID, itemIndex, itemID) => {
        return (
            <TouchableOpacity style={styles.cellContainer} onPress={() => {
            }}>
                <View style={{
                    alignItems: 'center',
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 20,
                    marginBottom: 20
                }}>
                    <Text style={{fontSize: 30, color: (BALANCE_COLOR[itemIndex % 2])}}>{item.label}</Text>
                    <Text style={{
                        color: (BALANCE_COLOR[itemIndex % 2]),
                        fontSize: 25
                    }}>{item.amount}</Text>
                    <Text style={{fontSize: 25, color: (BALANCE_COLOR[itemIndex % 2])}}> ETM</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={styles.titleLabel}>交易时间:</Text>
                    <Text style={styles.title1}>{this.formatTime(utils.slots.getRealTime(item.ts))}</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={styles.titleLabel}>交易凭证:</Text>
                    <Text style={styles.title}>{item.id}</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={styles.titleLabel}>发送地址:</Text>
                    <Text style={styles.title}>{item.senderId}</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={styles.titleLabel}>收款地址:</Text>
                    <Text style={styles.title}>{item.recipientId}</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={styles.titleLabel}>附加信息:</Text>
                    <Text style={styles.title1}>{item.message}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#fff'
    },
    cellContainer: {
        borderBottomWidth: 0.5,
        borderColor: LINE_COLOR,
        padding: 5,
        marginLeft: 10,
        marginRight: 10
    },
    image: {
        width: 50,
        height: 50,
    },
    title: {
        flex: 1,
        height: 36,
        marginLeft: 10,
        fontSize: 12,
        color: '#222'
    },
    title1: {
        flex: 1,
        height: 36,
        marginLeft: 10,
        fontSize: 14,
        color: '#222'
    },
    titleLabel: {
        height: 36,
        fontSize: 14,
        color: '#666'
    },
    introStyle: {
        fontSize: 18,
        backgroundColor: BACKGROUND_COLOR,
        color: '#666666',
        paddingTop: 10,
        paddingBottom: 10
    },

});