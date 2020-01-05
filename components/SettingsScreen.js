import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DataTable, Headline, List} from 'react-native-paper';
import {getZoom, removeAllLocations, saveZoom} from '../helpers/storageHelper';
import MapZoomDialog from './MapZoomDialog';

export const zoomValues = [
  {name: 'Far', value: '0.5'},
  {name: 'Normal', value: '0.1'},
  {name: 'Close', value: '0.01'},
];

export default class SettingsScreen extends React.Component {
  state = {
    zoomModalVisible: false,
    zoomValue: zoomValues[1].value,
  };

  changeZoom = value => {
    this.setState({zoomValue: value});
  };

  getZoom = async () => {
    const zoomValue = await getZoom();
    this.setState({zoomValue});
  };

  _showZoomModal = () => this.setState({zoomModalVisible: true});
  _hideZoomModal = () => this.setState({zoomModalVisible: false});

  saveZoom = async () => {
    await saveZoom(this.state.zoomValue);
    this.getZoom();
    this._hideZoomModal();
  };

  deleteAll = () => {
    removeAllLocations();
  };

  componentDidMount() {
    this.getZoom();
  }

  render() {
    console.log(this.state.zoomValue);
    return (
      <React.Fragment>
        <MapZoomDialog
          visible={this.state.zoomModalVisible}
          hideModal={this._hideZoomModal}
          zoomValue={this.state.zoomValue}
          onZoomChange={this.changeZoom}
          onSave={this.saveZoom}
        />
        <List.Section style={styles.list} title="Settings">
          <List.Item
            title="Map Zoom"
            description={
              zoomValues.find(item => item.value === this.state.zoomValue).name
            }
            onPress={this._showZoomModal}
            left={() => <List.Icon icon="map-search-outline" />}
          />
          <List.Item
            title="Clear All Data"
            onPress={this.deleteAll}
            left={() => (
              <List.Icon color="#000" icon="delete" color="darkred" />
            )}
          />
        </List.Section>
        <View style={{margin: 20}}>
          <Headline>Application details</Headline>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Attribute</DataTable.Title>
              <DataTable.Title>Value</DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
              <DataTable.Cell>Name</DataTable.Cell>
              <DataTable.Cell>ABMTE - project</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Author</DataTable.Cell>
              <DataTable.Cell>Jiří Dostál</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Version</DataTable.Cell>
              <DataTable.Cell>0.001alpha</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Release date</DataTable.Cell>
              <DataTable.Cell>5.1.2020</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    zIndex: -999999,
  },
});
