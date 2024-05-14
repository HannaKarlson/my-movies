import axios from 'axios';
import {BASE_URL, API_KEY} from 'react-native-dotenv';

export const fetchMovies = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}movie/popular?api_key=${API_KEY}`,
    );
    return [...response.data.results];
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const createGuestSession = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}authentication/guest_session/new?api_key=${API_KEY}`,
    );
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const fetchConfiguration = async () => {
  try{
  const response = await axios.get(
    `${BASE_URL}configuration?api_key=${API_KEY}`,
  );
  return response.data} catch(e){
    console.log(e);
    return null;
  };
};
