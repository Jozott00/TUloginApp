import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityComponent
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const StdButton = props => {
  return (
    <TouchableOpacity style={styles.buttonBody} onPress={props.onPress}>
      {/* <Text style={styles.buttonText}>{props.children}</Text> */}
      <Icon name="plus" color={'white'} size={25} />
    </TouchableOpacity>
  );
};

const RoundButton = props => {
  return (
    <TouchableOpacity style={styles.roundButton} onPress={props.onPress}>
      {/* <Text style={styles.buttonText}>{props.children}</Text> */}
      <Icon name="chevron-left" color={'white'} size={25} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonBody: {
    backgroundColor: '#00aeef',
    width: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },

  roundButton: {
    backgroundColor: '#006699',
    shadowColor: 'gray',
    width: 43,
    shadowOffset: {
      width: 1,
      height: 3
    },
    position: 'absolute',
    bottom: 10,
    left: 10,
    shadowOpacity: 0.25,
    shadowRadius: 3,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  },

  buttonText: {
    color: 'white',
    fontSize: 19,
    fontWeight: '600'
  }
});

export { StdButton, RoundButton };
