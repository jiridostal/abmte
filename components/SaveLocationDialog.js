import React from 'react';
import {Button, Dialog, TextInput} from 'react-native-paper';

const SaveLocationDialog = ({
  visible,
  hideModal,
  textValue,
  onTextChange,
  onSave,
}) => {
  return (
    <Dialog visible={visible} onDismiss={hideModal} style={{zIndex: 9999}}>
      <Dialog.Title>Enter location name</Dialog.Title>
      <Dialog.Content>
        <TextInput
          value={textValue}
          mode={'outlined'}
          onChangeText={text => onTextChange(text)}
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={hideModal}>Cancel</Button>
        <Button onPress={onSave}>Save</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default SaveLocationDialog;
