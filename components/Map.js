import React from 'react';
import {StyleSheet} from 'react-native';
import MapView from 'react-native-maps';

const Map = ({userLocation, markers}) => {
  return (
    <MapView style={styles.map} region={userLocation}>
      <MapView.Marker
        title="Current Position"
        pinColor={'blue'}
        coordinate={userLocation}
      />
      {markers.map(({latitude, longitude, text}) => (
        <MapView.Marker
          coordinate={{latitude, longitude}}
          title={text}
          key={Math.random()}
        />
      ))}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    zIndex: -9999,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
