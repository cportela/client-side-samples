/* eslint-disable react/prop-types */
import React from 'react';
import { baseColors } from '../utils/theme-primitives';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

const CityStateZip = props => {
  const {
    city = '',
    state = '',
    zip = '',
    style = {},
    textStyle = {},
    vpad = 0,
    hpad = 0,
    size = 12,
    tint = baseColors.tint1
  } = props;
  const parts = [];
  if (city) {
    parts.push(city);
  }
  if (state) {
    parts.push(state);
  }
  const city_state = parts.join(', ');
  const container_style = {
    paddingVertical: vpad,
    paddingHorizontal: hpad
  }
  const text = {
    color: tint,
    fontSize: size
  }
  return (
    <View style={[styles.container, container_style, style]}>
      <Text style={[text, textStyle]}>{city_state}</Text>
      <Text style={[text, textStyle]}>{' '}</Text>
      <Text style={[text, textStyle]}>{zip}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
});

export default CityStateZip;
