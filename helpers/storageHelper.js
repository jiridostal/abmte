import AsyncStorage from '@react-native-community/async-storage';

export const getLocations = async () => {
  try {
    const value = await AsyncStorage.getItem('@locations');
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return [];
    }
  } catch (e) {}
};

export const addLocation = async location => {
  try {
    const locations = await getLocations();
    locations.push(location);
    await AsyncStorage.setItem('@locations', JSON.stringify(locations));
  } catch (e) {
    console.log(e);
  }
};

export const removeLocation = async index => {
  try {
    const locations = await getLocations();
    locations.splice(index, 1);
    await AsyncStorage.setItem('@locations', JSON.stringify(locations));
  } catch (e) {
    console.log(e);
  }
};

export const removeAllLocations = async () => {
  try {
    await AsyncStorage.setItem('@locations', JSON.stringify([]));
  } catch (e) {
    console.log(e);
  }
};

export const editLocation = async (index, text) => {
  try {
    const locations = await getLocations();
    locations[index].text = text;
    await AsyncStorage.setItem('@locations', JSON.stringify(locations));
  } catch (e) {
    console.log(e);
  }
};

export const saveZoom = async value => {
  try {
    console.log(value);
    await AsyncStorage.setItem('@mapzoom', JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

export const getZoom = async () => {
  try {
    const value = await AsyncStorage.getItem('@mapzoom');
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return '0.1';
    }
  } catch (e) {}
};
