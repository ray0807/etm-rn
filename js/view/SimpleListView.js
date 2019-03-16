import React, {Component} from 'react';
import {View, ListView, Image, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';

import {LINE_COLOR, INCOME_COLOR, OUT_COLOR, BACKGROUND_COLOR} from '../config/Config'

import {getBalanceTranscations} from '../utils/http'

export const data = [
    {
        title: '啤酒',
    },
    {
        title: '面包',
    },
    {
        title: '蛋糕',
    },
    {
        title: '糖果',
    },
    {
        title: '辣椒',
    },
    {
        title: '薯条',
    },
    {
        title: '饮料',
    },
    {
        title: '鸡蛋',
    },
    {
        title: '火腿',
    },
    {
        title: '热狗',
    },
    {
        title: '冰激凌',
    },
    {
        title: '冰棍',
    },
    {
        title: '柠檬',
    },
    {
        title: '蘑菇',
    },
    {
        title: '橘子',
    },
    {
        title: '披萨',
    },
    {
        title: '萝卜',
    },
    {
        title: '西瓜',
    },
];

const BALANCE_COLOR = [INCOME_COLOR, OUT_COLOR]

const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
});

export class SimpleListView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataArray: [],
            balanceColor: INCOME_COLOR,
        }
        this.getTranscation = this.getTranscation.bind(this)
        this._renderHeader = this._renderHeader.bind(this)
    }

    componentDidMount() {
        getBalanceTranscations(global.user.address, this.getTranscation)
    }

    getTranscation(data) {
        if (data && data.success) {
            data.transactions.forEach((item) => {
                if (item.balance && item.balance > 0) {
                    this.state.dataArray.push({
                        "senderId": item.senderId,
                        "recipientId": item.recipientId,
                        "height": item.height,
                        "message": item.message ? item.message : '没有附加信息',
                        "id": item.id,
                        "amount": (item.balance / 1e8).toFixed(2),
                    })
                }
            })
        }
        this.state.dataArray.sort((itemA, itemB) => {
            return itemA.height - itemB.height
        })
        console.warn(this.state.dataArray)

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
                    <Text style={{fontSize: 30, color: (BALANCE_COLOR[itemIndex % 2])}}>+</Text>
                    <Text style={{
                        color: (BALANCE_COLOR[itemIndex % 2]),
                        fontSize: 25
                    }}>{item.amount}</Text>
                    <Text style={{fontSize: 25, color: (BALANCE_COLOR[itemIndex % 2])}}> ETM</Text>
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
                    <Text style={styles.title}>{item.msg}</Text>
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
        height: 50,
        marginLeft: 10,
        fontSize: 12,
        color: '#222'
    },
    titleLabel: {
        height: 30,
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