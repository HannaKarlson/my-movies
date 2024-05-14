import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {
  fetchMovies,
  createGuestSession,
  getAccount,
} from '../services/services';
import colors from '../theme/colors';
import MoviePreview from './MoviePreview';
import HomeScreenSkeleton from './HomeScreenSkeleton';

const styles = StyleSheet.create({
  errorView: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
  },
  errorText: {
    color: colors.darkText,
    fontSize: 20,
  },
  link: {
    color: colors.linkBlue,
    fontSize: 24,
    textDecorationLine: 'underline',
  },
  container: {
    backgroundColor: colors.lightGray,
    paddingHorizontal: 10,
  },
  itemSeparatorComponent:{
    height:20
  }
});

const ItemSeparatorComponent = () => {
  return(
    <View style={styles.itemSeparatorComponent} />
  )
}

const HomeScreen = ({navigation}) => {
  const userSessionId = useRef();
  const [isLogged, setIsLogged] = useState(false);
  const [fetchingMovies, setFetchingMovies] = useState(true);
  const [movies, setMovies] = useState([]);
  const startGuestSession = async () => {
    setFetchingMovies(true)
    const result = await createGuestSession();
    if (result?.guest_session_id) {
      userSessionId.current = result?.guest_session_id;
      setIsLogged(true);
    }
    else{
      setFetchingMovies(false)
    }
  };
  useEffect(() => {
    startGuestSession();
  }, []);
  useEffect(() => {
    if (isLogged) {
      const getMovies = async () => {
        const movies = await fetchMovies();
        setMovies(movies);
        setFetchingMovies(false)
      };
      getMovies();
    }
  }, [isLogged]);



  if (!isLogged && !fetchingMovies) {
    return (
      <View style={styles.errorView}>
        <View style={styles.center}>
          <Text style={styles.errorText}>An error occured, check your internet connection</Text>
          <TouchableOpacity onPress={startGuestSession}>
            <Text style={styles.link}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (fetchingMovies) {
    return <HomeScreenSkeleton />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}
        data={movies}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <MoviePreview item={item} navigation={navigation} />
        )}
        ItemSeparatorComponent={<ItemSeparatorComponent/>}
        ListHeaderComponent={<ItemSeparatorComponent/>}
      />
    </View>
  );
};

export default HomeScreen;
