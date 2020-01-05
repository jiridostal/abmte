import Geolocation from '@react-native-community/geolocation';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {addLocation, getLocations, getZoom} from '../helpers/storageHelper';
import Map from './Map';
import SaveLocationDialog from './SaveLocationDialog';

export default class MapScreen extends React.Component {
  state = {
    userLocation: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
    },
    modalVisible: false,
    text: '',
    markers: [],
  };

  _showModal = () => this.setState({modalVisible: true});
  _hideModal = () => this.setState({modalVisible: false});

  saveLocation = () => {
    const {
      userLocation: {longitude, latitude},
      text,
    } = this.state;
    this._hideModal();
    addLocation({latitude, longitude, text, timestamp: Date.now()});
    this.getMarkers();
  };

  getMarkers = async () => {
    const markers = await getLocations();
    this.setState({markers});
  };

  getCurrentLocation = async () => {
    const zoom = await getZoom();
    this.getMarkers();
    Geolocation.getCurrentPosition(
      ({coords: {latitude, longitude}}) => {
        this.setState({
          userLocation: {
            latitude,
            longitude,
            latitudeDelta: parseFloat(zoom),
            longitudeDelta: parseFloat(zoom),
          },
        });
      },
      err => console.log(err),
    );
  };

  componentDidMount() {
    this.getCurrentLocation();
    this.getMarkers();
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <SaveLocationDialog
          hideModal={this._hideModal}
          onSave={this.saveLocation}
          onTextChange={text => this.setState({text})}
          visible={this.state.modalVisible}
          textValue={this.state.text}
        />
        <Map
          userLocation={this.state.userLocation}
          markers={this.state.markers}
        />
        <Button
          mode={'outlined'}
          style={styles.centerButton}
          onPress={this.getCurrentLocation}
          icon="crosshairs-gps">
          Center
        </Button>
        <Button
          mode={'outlined'}
          style={styles.refreshButton}
          onPress={this.getMarkers}
          icon={'refresh'}>
          Refresh
        </Button>
        <Button
          mode={'contained'}
          style={styles.saveButton}
          onPress={this._showModal}
          icon={'content-save'}>
          Save location
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: -9999,
  },
  centerButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
  },
  saveButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  refreshButton: {
    position: 'absolute',
    bottom: 60,
    right: 10,
    backgroundColor: 'white',
  },
});
