import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
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
import ListView from './ListView';

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
  itemSeparatorComponent: {
    height: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    backgroundColor: colors.linkBlue,
    padding: 10,
    borderRadius: 10,
  },
});

const HomeScreen = ({navigation}) => {
  const [isLogged, setIsLogged] = useState(false);
  const [fetchingMovies, setFetchingMovies] = useState(true);
  const [movies, setMovies] = useState([]);
  const startGuestSession = async () => {
    setFetchingMovies(true);
    const result = await createGuestSession();
    if (result?.guest_session_id) {
      setIsLogged(true);
    } else {
      setFetchingMovies(false);
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
        setFetchingMovies(false);
      };
      getMovies();
    }
  }, [isLogged]);

  if (!isLogged && !fetchingMovies) {
    return (
      <View style={styles.errorView}>
        <View style={styles.center}>
          <Text style={styles.errorText}>
            An error occured, check your internet connection
          </Text>
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
    <ListView data={movies} navigation={navigation}>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('ListsScreen')}>
        <Text style={styles.buttonText}>My lists</Text>
      </TouchableOpacity>
    </ListView>
  );
};

export default HomeScreen;
