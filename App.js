/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, ActivityIndicator} from 'react-native';
import { List, ListItem } from 'react-native-elements';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends React.Component {

  state = {
    data: [],
    page: 0,
    loading: false,
  };

  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ loading: true });
    const response = await fetch(
    `https://randomuser.me/api?results=15&seed=hi`
  );
  const json = await response.json();
    this.setState(state => ({
      data: [...state.data, ...json.results],
      loading: false
    }));
  };

  handleEnd = () => {
    this.setState(state => ({ page: state.page + 1 }), () => this.fetchData());
  };

  render() {
    return (
      <View style={styles.container}>
        <List>
          <FlatList
            data={this.state.data}
            keyExtractor={(x, i) => i}
            onEndReached={() => this.handleEnd()}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() =>
              this.state.loading
                ? null
                : <ActivityIndicator size="large" animating />}
            renderItem={({ item }) =>
              <ListItem
                roundAvatar
                avatar={{ uri: item.picture.thumbnail }}
                title={`${item.name.first} ${item.name.last}`}
              />}
          />
        </List>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  }
});