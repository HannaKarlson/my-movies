import React, {useState} from 'react';
import {Text, View, Image, ImageBackground, TouchableOpacity, Dimensions} from 'react-native';
import {fetchConfiguration} from '../services/services';
import colors from '../theme/colors';

type Props = {
  navigation:Object,
  item: {
    title: string;
    poster_path: string;
    overview: string;
  };
};

export const imageWidth = Dimensions.get('screen').width * 0.35

const MoviePreview = ({item, navigation}) => {
const [showPlaceholder, setShowPlaceholder] = useState(true)
  const overview = item.overview || 'No overview available...';
  const title = item.title || 'No title available...';
  return (
    <TouchableOpacity onPress={() => {navigation.navigate('MovieDetails', {movie:item})}}>
    <View style={{borderRadius: 20, backgroundColor: 'white'}}>
      <View
        style={{flexDirection: 'row', borderRadius: 20, overflow: 'hidden'}}>
        <Image
        onLoadEnd={() => setShowPlaceholder(false)}
          resizeMode="contain"
          style={{
            width: imageWidth,
            height: imageWidth * 1.5,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
           
          }}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          }}
        />
       {showPlaceholder&& <View  style={{
            width: imageWidth,
            height: imageWidth * 1.5,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            position:'absolute',
            backgroundColor:colors.structureGray
           
          }}/>}
        <View style={{flex: 1, padding: 10}}>
          <Text
            style={{
              marginBottom: 5,
              fontSize: 16,
              fontWeight: 'bold',
              color: colors.darkText,
            }}>
            {title}
          </Text>
          <Text
            numberOfLines={5}
            style={{fontSize: 14, color: colors.darkText}}>
            {overview}
          </Text>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  );
};

export default MoviePreview;