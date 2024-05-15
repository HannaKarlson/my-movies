import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import colors from '../theme/colors';

export const imageWidth = Dimensions.get('screen').width * 0.35;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: 'white',
  },
  hStack: {
    flexDirection: 'row',
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: imageWidth,
    height: imageWidth * 1.5,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  placeholder: {
    position: 'absolute',
    backgroundColor: colors.structureGray,
  },
  textView: {
    flex: 1,
    padding: 10,
  },
  title: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkText,
  },
  overview: {
    fontSize: 14,
    color: colors.darkText,
  },
});

const MoviePreview = ({item, navigation}) => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const overview = item.overview || 'No overview available...';
  const title = item.title || 'No title available...';
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('MovieDetails', {movie: item});
      }}>
      <View style={styles.container}>
        <View style={styles.hStack}>
          <Image
            onLoadEnd={() => setShowPlaceholder(false)}
            resizeMode="contain"
            style={styles.image}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            }}
          />
          {showPlaceholder && (
            <View style={[styles.image, styles.placeholder]} />
          )}
          <View style={styles.textView}>
            <Text style={styles.title}>{title}</Text>
            <Text numberOfLines={5} style={styles.overview}>
              {overview}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MoviePreview;
