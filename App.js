import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/components/HomeScreen';
import MovieDetailsScreen from './src/components/MovieDetailsScreen';
import ListsScreen from './src/components/ListsScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Popular'}}
        />
        <Stack.Screen
          name="MovieDetails"
          component={MovieDetailsScreen}
          options={{title: 'Details'}}
        />
        <Stack.Screen
        name='ListsScreen'
        component={ListsScreen}
        options={{title:'My Lists'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
