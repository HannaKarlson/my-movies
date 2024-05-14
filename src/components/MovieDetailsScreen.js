import React, {useState} from 'react';
import {View, Text, Image, Dimensions, Button, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {selectFavorites, addFavorite, removeFavorite} from '../redux/favorites';
import watchList, {
  selectWatchList,
  addToWatchList,
  removeFromWatchList,
} from '../redux/watchList';

import colors from '../theme/colors';

const styles = StyleSheet.create({
  pressableText:{
    color:colors.linkBlue,
    fontSize:14,
    fontWeight:'bold'

  }
})

const deviceWidth = Dimensions.get('window').width;

const ListActionPressable = ({movie, onPress, title}) => {
  return(
  <TouchableOpacity disabled={!movie} onPress={onPress}>
    <Text style={styles.pressableText}>{title}</Text>
  </TouchableOpacity>)
}

const MovieDetailsScreen = ({route}: Props) => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const movie = route.params?.movie;
  const overview = route.params?.movie.overview || 'No overview available...';
  const title = route.params?.movie.title || '';
  const backdrop = route.params?.movie.backdrop_path;
  const releaseDate = route.params?.movie.release_date || 'Not avialable';
  const favorites = useSelector(selectFavorites);
  const watchList = useSelector(selectWatchList);
  const isFavorite =
    favorites.findIndex(favorite => favorite.id === movie.id) !== -1;
  const isOnWatchList =
    watchList.findIndex(watchListItem => watchListItem.id === movie.id) !== -1;
  const favoriteButtonTitle = isFavorite
    ? 'Remove from favorites'
    : 'Add to favorites';
  const watchListButtonTitle = isOnWatchList
    ? 'Remove from watchlist'
    : 'Add to watchlist';
  const dispatch = useDispatch();

  const handlePressFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(movie));
    } else {
      dispatch(addFavorite(movie));
    }
  };
  const handlePressWatchList = () => {
    if (isOnWatchList) {
      dispatch(removeFromWatchList(movie));
    } else {
      dispatch(addToWatchList(movie));
    }
  };
  const renderImage = () => {
    if (!backdrop) {
      return (
        <View
          style={{
            width: deviceWidth,
            height: deviceWidth * 0.563,
            backgroundColor: colors.structureGray,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>No image available</Text>
        </View>
      );
    }
    return (
      <>
        <Image
          onLoadEnd={() => setShowPlaceholder(false)}
          resizeMode="contain"
          style={{width: deviceWidth, height: deviceWidth * 0.563}}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${backdrop}`,
          }}
        />
        {showPlaceholder && (
          <View
            style={{
              width: deviceWidth,
              height: deviceWidth * 0.563,
              position: 'absolute',
              backgroundColor: colors.structureGray,
            }}
          />
        )}
      </>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          margin: 10,
          color: colors.darkText,
        }}>
        {title}
      </Text>
      {renderImage()}
      <Text
        style={{
          color: colors.darkText,
          padding: 10,
          fontWeight: 600,
        }}>{`Release date: ${releaseDate}`}</Text>
      <Text style={{color: colors.darkText, padding: 10, paddingTop: 0}}>
        {overview}
      </Text>
      <View style={{flexDirection: 'row', margin:10, marginTop:20, justifyContent:'space-around'}}>
        <ListActionPressable movie={movie} onPress={handlePressFavorite} title={favoriteButtonTitle}/>
        <ListActionPressable movie={movie} onPress={handlePressWatchList} title={watchListButtonTitle}/>
      </View>
    </View>
  );
};

export default MovieDetailsScreen;
