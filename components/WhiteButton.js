/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { fonts, baseColors } from '../utils/theme-primitives';

const WhiteButton = (props) => {
  const { enabled = true, children, onPress, buttonStyle = {}, textStyle = {}, text = '' } = props;
  return enabled ? (
    <TouchableOpacity onPress={onPress} >
      <View style={[styles.button, buttonStyle]}>
        <Text style={[styles.buttonText, textStyle]}>{children || text}</Text>
      </View>
    </TouchableOpacity >
  ) : (
      <View style={[styles.button, buttonStyle]}>
        <Text style={[styles.buttonText, textStyle]}>{children || text}</Text>
      </View>
    )
}


const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: baseColors.white,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginVertical: 0,
    marginHorizontal: 0,
    borderColor: baseColors.tint1,
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
    minWidth: 40
  },
  buttonText: {
    color: baseColors.tint1
  }
});

export default WhiteButton;
