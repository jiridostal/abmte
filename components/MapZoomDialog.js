import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Dialog, RadioButton} from 'react-native-paper';
import {zoomValues} from './SettingsScreen';

const MapZoomDialog = ({
  visible,
  hideModal,
  zoomValue,
  onZoomChange,
  onSave,
}) => {
  return (
    <Dialog visible={visible} onDismiss={hideModal}>
      <Dialog.Title>Set default map zoom</Dialog.Title>
      <Dialog.Content>
        <RadioButton.Group
          onValueChange={value => onZoomChange(value)}
          value={zoomValue}>
          {zoomValues.map(item => (
            <View style={styles.menuItem}>
              <RadioButton value={item.value} />
              <Text>{item.name}</Text>
            </View>
          ))}
        </RadioButton.Group>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={hideModal}>Cancel</Button>
        <Button onPress={onSave}>Save</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MapZoomDialog;
