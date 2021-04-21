/* eslint-disable react/prop-types */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { fonts, baseColors } from '../utils/theme-primitives';

const GenericButton = (props) => {
  const {
    vpad = 10,
    hpad = 10,
    enabled = true,
    onPress,
    title = '',
    containerStyle = {},
    textStyle = {},
    tint = baseColors.tint1
  } = props;
  return enabled ? (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, { backgroundColor: tint, shadowColor: tint, paddingHorizontal: hpad, paddingVertical: vpad }, containerStyle]}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  ) : (
      <View style={[styles.container, { backgroundColor: baseColors.light, paddingHorizontal: hpad, paddingVertical: vpad, shadowOpacity: 0 }, containerStyle]}>
        <Text style={[styles.text, textStyle, { color: baseColors.very_light }]}>{title}</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 12,
    marginVertical: 0,
    marginHorizontal: 0,
    borderRadius: 6,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: {
      width: -4,
      height: 4
    }
  },
  text: {
    color: baseColors.white
  }
});

export default GenericButton;
