import React, {memo} from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';
import MoviePreview from './MoviePreview';
import colors from '../theme/colors';

const styles = StyleSheet.create({
  itemSeparatorComponent: {
    height: 20,
  },
  container: {
    backgroundColor: colors.lightGray,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  view: {
    flex: 1,
  },
  emptyView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '60%',
  },
  emptyText: {
    fontSize: 20,
    color: colors.darkText,
  },
});

const ItemSeparatorComponent = () => {
  return <View style={styles.itemSeparatorComponent} />;
};

const ListEmptyComponent = () => {
  return (
    <View style={styles.emptyView}>
      <Text style={styles.emptyText}>No movie added</Text>
    </View>
  );
};

const ListView = ({data, navigation, children}) => {
  return (
    <View style={styles.view}>
      <FlatList
        initialNumToRender={5}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <MoviePreview item={item} navigation={navigation} />
        )}
        ItemSeparatorComponent={<ItemSeparatorComponent />}
        ListHeaderComponent={<ItemSeparatorComponent />}
        ListEmptyComponent={<ListEmptyComponent />}
      />
      {children}
    </View>
  );
};

export default memo(ListView);
