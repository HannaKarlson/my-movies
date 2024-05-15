import React from 'react';
import {View, Text, useWindowDimensions, StyleSheet} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import ListView from './ListView';
import {useSelector} from 'react-redux';
import {selectFavorites} from '../redux/favorites';
import watchList, {selectWatchList} from '../redux/watchList';
import colors from '../theme/colors';

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: colors.white,
  },
  tabBar: {
    backgroundColor: colors.linkBlue,
  },
});

const ListsScreen = ({navigation}) => {
  const favorites = useSelector(selectFavorites);
  const watchList = useSelector(selectWatchList);
  const layout = useWindowDimensions();
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
    />
  );
  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <ListView data={favorites} navigation={navigation} />;
      case 'second':
        return <ListView data={watchList} navigation={navigation} />;
      default:
        return null;
    }
  };

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Favorites'},
    {key: 'second', title: 'Watchlist'},
  ]);
  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={renderTabBar}
    />
  );
};

export default ListsScreen;
