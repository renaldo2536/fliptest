import React, { Component } from 'react';
import {
    StyleSheet, Text, View,
    TouchableOpacity, Image, FlatList, RefreshControl, Dimensions
} from 'react-native';
import axios from 'axios';

const ScreenHeight = Dimensions.get("window").height
const ScreenWidth = Dimensions.get("window").width

export default class home extends Component {
    render() {
        return (
            <View style={{ backgroundColor: 'white', height: ScreenHeight, width: ScreenWidth }}>

            </View>
        );
    }
}