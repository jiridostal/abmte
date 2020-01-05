import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, List} from 'react-native-paper';
import {
  editLocation,
  getLocations,
  removeLocation,
} from '../helpers/storageHelper';
import SaveLocationDialog from './SaveLocationDialog';
import {Linking} from 'react-native';

export default class ListScreen extends React.Component {
  state = {
    savedLocations: [],
    modalVisible: false,
    text: '',
    currentIndex: 0,
  };

  _showModal = index => {
    const item = this.state.savedLocations[index];
    this.setState({text: item.text, modalVisible: true, currentIndex: index});
  };
  _hideModal = () => this.setState({modalVisible: false});

  getSavedLocations = async () => {
    const locations = await getLocations();
    this.setState({savedLocations: locations});
  };

  deleteLocation = async index => {
    await removeLocation(index);
    this.getSavedLocations();
  };

  editLocation = async () => {
    const {currentIndex, text} = this.state;
    await editLocation(currentIndex, text);
    this.getSavedLocations();
    this._hideModal();
  };

  componentDidMount() {
    this.getSavedLocations();
  }

  render() {
    return (
      <React.Fragment>
        <Button
          mode={'outlined'}
          style={styles.saveButton}
          onPress={this.getSavedLocations}>
          Refresh
        </Button>
        <List.Section
          style={styles.list}
          title={`${this.state.savedLocations.length} Saved Location${
            this.state.savedLocations.length !== 1 ? 's' : ''
          }`}>
          {this.state.savedLocations.map((item, index) => (
            <List.Accordion
              title={item.text}
              description={`${item.latitude}, ${item.longitude}`}
              left={() => <List.Icon icon="map-marker" />}>
              <List.Item
                title="Show details"
                onPress={() =>
                  Linking.openURL(
                    `https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}`,
                  )
                }
                left={() => <List.Icon icon="google-maps" />}
              />
              <List.Item
                title="Edit"
                onPress={() => this._showModal(index)}
                left={() => <List.Icon icon="pencil" />}
              />
              <List.Item
                title="Delete"
                onPress={() => this.deleteLocation(index)}
                left={() => <List.Icon icon="delete" />}
              />
            </List.Accordion>
          ))}
        </List.Section>
        <SaveLocationDialog
          hideModal={this._hideModal}
          onSave={this.editLocation}
          onTextChange={text => this.setState({text})}
          visible={this.state.modalVisible}
          textValue={this.state.text}
        />
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    zIndex: -999999,
  },
});
