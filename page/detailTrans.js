import React, { Component } from 'react';
import {
    StyleSheet, Text, View,
    TouchableOpacity, Image, FlatList, RefreshControl, Dimensions
} from 'react-native';
import axios from 'axios';

const ScreenHeight = Dimensions.get("window").height
const ScreenWidth = Dimensions.get("window").width

function detailTrans({ navigation }) {
    alert(JSON.stringify(navigation.getParam('data')))
    return (
        <View style={{ backgroundColor: 'blue', height: ScreenHeight, width: ScreenWidth }}>

        </View>
    );
}

detailTrans.navigationOptions = ({ navigation }) => {
    const name = 'Detail Transaction';
    return {
        title: name,
        headerTintColor: 'black',
        headerTitleStyle: {
            fontSize: 20,
            color: 'black',
            fontWeight: '200',
        },
    };
};

export default detailTrans