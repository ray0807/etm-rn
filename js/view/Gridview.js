import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import GridView from 'react-native-gridview';

const itemsPerRow = 3;

import {NORMAL_SIZE} from '../config/Config'

// Use data from an array...
// const data = Array(20)
//     .fill(null)
//     .map((item, index) => index + 1);

const data = ['转账', '投票', '个人中心']

const iconUrl = [require('../../img/transfer.png'), require('../../img/vote.png'), require('../../img/personal.png')]

// ...or create your own data source.
// This will randomly allocate 1-3 items per row, and will be used
// if the `randomizeRows` prop is `true`.
const randomData = [];
for (let i = 0; i < data.length; i) {
    const endIndex = 1 + i;
    randomData.push(data[i]);
    i = endIndex;
}
const dataSource = new GridView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
}).cloneWithRows(randomData);

export default function MainGrid(props) {
    return (
        <GridView
            data={data}
            dataSource={props.randomizeRows ? dataSource : null}
            itemsPerRow={itemsPerRow}
            renderItem={(item, sectionID, rowID, itemIndex, itemID) => {
                return (
                    <TouchableOpacity onPress={() => {
                        switch (itemIndex) {
                            case 0:
                                props.navi.navigate('Transfer')
                                break;
                            case 1:
                                console.warn("暂未开放")
                                // props.navi.navigate('Vote')
                                break;
                            case 2:
                                props.navi.navigate('Personal')

                                break;

                        }
                    }}>
                        <View style={{flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center',}}>
                            <Image style={{width: 40, height: 40}} source={iconUrl[itemIndex]}/>
                            <Text style={{marginTop: 10, fontSize: NORMAL_SIZE}}>{data[itemIndex]}</Text>
                        </View>
                    </TouchableOpacity>
                );
            }}
        />
    );
}