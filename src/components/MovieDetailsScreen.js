import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {selectFavorites, addFavorite, removeFavorite} from '../redux/favorites';
import watchList, {
  selectWatchList,
  addToWatchList,
  removeFromWatchList,
} from '../redux/watchList';

import colors from '../theme/colors';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  pressableText: {
    color: colors.linkBlue,
    fontSize: 14,
    fontWeight: 'bold',
  },
  image: {
    width: deviceWidth,
    height: deviceWidth * 0.563,
  },
  noImage: {
    backgroundColor: colors.structureGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    position: 'absolute',
    backgroundColor: colors.structureGray,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    color: colors.darkText,
  },
  releaseDate: {
    color: colors.darkText,
    padding: 10,
    fontWeight: '600',
  },
  overview: {
    color: colors.darkText,
    padding: 10,
    paddingTop: 0,
  },
  pressableContainer: {
    flexDirection: 'row',
    margin: 10,
    marginTop: 20,
  },
});

const ListActionPressable = ({movie, onPress, title}) => {
  return (
    <TouchableOpacity
      disabled={!movie}
      onPress={onPress}
      style={{flex: 1, alignItems: 'center'}}>
      <Text style={styles.pressableText}>{title}</Text>
    </TouchableOpacity>
  );
};

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
        <View style={[styles.image, styles.noImage]}>
          <Text>No image available</Text>
        </View>
      );
    }
    return (
      <>
        <Image
          onLoadEnd={() => setShowPlaceholder(false)}
          resizeMode="contain"
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${backdrop}`,
          }}
        />
        {showPlaceholder && <View style={[styles.image, styles.placeholder]} />}
      </>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {renderImage()}
      <Text style={styles.releaseDate}>{`Release date: ${releaseDate}`}</Text>
      <Text style={styles.overview}>{overview}</Text>
      <View style={styles.pressableContainer}>
        <ListActionPressable
          movie={movie}
          onPress={handlePressFavorite}
          title={favoriteButtonTitle}
        />
        <ListActionPressable
          movie={movie}
          onPress={handlePressWatchList}
          title={watchListButtonTitle}
        />
      </View>
    </View>
  );
};

export default MovieDetailsScreen;
