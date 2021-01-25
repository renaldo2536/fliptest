import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import searchPage from './page/searchPage'
import detailTrans from './page/detailTrans'

const AppNavigator = createStackNavigator({
  SearchPage: {
    screen: searchPage,
  },
  Detail:{
    screen: detailTrans
  }
});

export default createAppContainer(AppNavigator);