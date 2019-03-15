import React, {Component} from 'react';
import {View, ListView, Image, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';

import {LINE_COLOR, INCOME_COLOR, OUT_COLOR, NORMAL_SIZE} from '../config/Config'

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
    }

    componentDidMount() {
        getBalanceTranscations(global.user.address, this.getTranscation)
    }

    getTranscation(data) {
        if (data && data.success) {
            data.transactions.forEach((item) => {
                this.state.dataArray.push({
                    "senderId": item.senderId,
                    "recipientId": item.recipientId,
                    "height": item.height,
                    "message": item.message,
                    "id": item.id,
                    "amount": (item.balance / 1e8).toFixed(2),
                })
            })
        }
        this.state.dataArray.sort((itemA, itemB) => {
            return itemA.height - itemB.height
        })
        console.warn(this.state.dataArray)

    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={ds.cloneWithRows(this.state.dataArray)}
                    renderRow={this._renderRow}
                />
            </View>
        )
    }

    _renderRow = (item, sectionID, rowID, itemIndex, itemID) => {
        return (
            <TouchableOpacity style={styles.cellContainer} onPress={() => {
            }}>
                <View style={{alignItems: 'center', flex: 1}}>
                    <Text style={{
                        color: (BALANCE_COLOR[itemIndex % 2]),
                        fontSize: 25
                    }}>{"+" + item.amount + " ETM"}</Text>

                </View>
                <View>
                    <Text style={styles.title}>{"交易ID:\n" + item.id}</Text>
                    <Text style={styles.title}>{"发送地址:\n" + item.senderId}</Text>
                    <Text style={styles.title}>{"收款地址:\n" + item.recipientId}</Text>
                    <Text style={styles.title}>{"信息:" + item.msg}</Text>
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
        padding: 10,


        marginLeft: 10,
        marginRight: 10
    },
    image: {
        width: 50,
        height: 50,
    },
    title: {
        marginTop: 10,
        fontSize: NORMAL_SIZE,
        color: '#666'
    },

});