import React, {Component} from 'react';
import {View, ListView, Image, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';

import {LINE_COLOR, INCOME_COLOR, OUT_COLOR, NORMAL_SIZE} from '../config/Config'

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

export class SimpleListView extends Component {

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: ds.cloneWithRows(data),
            balanceColor:INCOME_COLOR,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
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
                    <Text style={{color: (BALANCE_COLOR[itemIndex % 2]), fontSize: 25}}>+550000 ETM</Text>

                </View>
                <View>
                    <Text style={styles.title}>{"发送地址:" + item.title}</Text>
                    <Text style={styles.title}>{"收款地址:" + item.title}</Text>
                    <Text style={styles.title}>{"信息:" + item.title}</Text>
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