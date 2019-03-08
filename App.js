/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, Text, View} from 'react-native';
import {transaction} from 'etm-js-rn'
import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './view/HomeScreen'
import TestScreen from './view/TestScreen'




const instructions = Platform.select({
  ios: 'transaction:'+JSON.stringify(transaction.createTransaction('AAA',10000,'test','aaaa aaa','')),
  android:'transaction:'+JSON.stringify(transaction.createTransaction('AAA',10000,'test','aaaa aaa',''))
});

const MainNavigator = createStackNavigator({
    Home: {screen: HomeScreen},
    Test: {screen: TestScreen},
});

const App = createAppContainer(MainNavigator);

export default App;


//
// type Props = {};
// export default class App extends Component<Props> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Welcome to React Native!</Text>
//         <Text style={styles.instructions}>To get started, edit App.js</Text>
//         <Text style={styles.instructions}>{instructions}</Text>
//       </View>
//     );
//   }
// }

