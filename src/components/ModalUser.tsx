import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

type Props = {};

const ModalUser = (props: Props) => {
  return (
    <View style={styles.container}>
      <View>
        <Text>ModalUser</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#ffdddd',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});

export default ModalUser;
