/* eslint-disable react/prop-types */
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts, baseColors } from '../utils/theme-primitives';

const IconButton = props => {
  const { icon, size = 28, tint = baseColors.tint1, style = {}, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress} >
      <View style={[styles.container, style]}>
        <Ionicons name={icon} size={size} color={tint} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contaner: {
    padding: 2
  }
})

export default IconButton;
