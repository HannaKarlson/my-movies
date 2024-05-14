import React, {useState} from 'react';
import {View, Text, Image, Dimensions, Button} from 'react-native';
import colors from '../theme/colors';

const deviceWidth = Dimensions.get('window').width;

const MovieDetailsScreen = ({route}: Props) => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const overview = route.params?.movie.overview || 'No overview available...';
  const title = route.params?.movie.title || '';
  const backdrop = route.params?.movie.backdrop_path;
  const releaseDate = route.params?.movie.release_date||'Not avialable'
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
      <Text style={{color: colors.darkText, padding: 10, fontWeight:600}}>{`Release date: ${releaseDate}`}</Text>
      <Text style={{color: colors.darkText, padding: 10, paddingTop:0}}>{overview}</Text>
    </View>
  );
};

export default MovieDetailsScreen;
