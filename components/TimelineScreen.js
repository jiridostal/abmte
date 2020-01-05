import moment from 'moment';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, List, Text} from 'react-native-paper';
import {getLocations} from '../helpers/storageHelper';
import SaveLocationDialog from './SaveLocationDialog';

export default class TimelineScreen extends React.Component {
  state = {
    savedLocations: [],
  };

  getSavedLocations = async () => {
    const locations = await getLocations();
    this.setState({savedLocations: locations});
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
        <List.Section style={styles.list} title={`Timeline`}>
          {this.state.savedLocations.map((item, index) => (
            <List.Item
              title={
                <React.Fragment>
                  <Text style={{fontWeight: 'bold'}}>
                    {moment(item.timestamp).format('DD.MM.YYYY HH:mm')}
                  </Text>{' '}
                  - {item.text}
                </React.Fragment>
              }
              left={() => <List.Icon icon="timeline-text-outline" />}>
              asdas
            </List.Item>
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
