/* eslint-disable react/prop-types */
import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { baseColors } from '../utils/theme-primitives';

const CircledIconButton = props => {
  const {
    enabled = true,
    onPress,
    size = 45,
    icon_size = 45 / 2,
    icon = 'md-close',
    bg = baseColors.tint1,
    fg = baseColors.white,
    hasShadow = false,
    shadowColor = '#000',
    shadowOpacity = 0.3,
    shadowRadius = 10,
    shadowOffset = { width: 0, height: 5 }
  } = props;
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      height: size,
      width: size,
      borderRadius: size / 2,
      backgroundColor: bg
    },
    shadow: {
      shadowColor,
      shadowOpacity,
      shadowRadius,
      shadowOffset
    }
  });

  return enabled ? (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, hasShadow && styles.shadow]}>
        {icon ? <Ionicons name={icon} size={icon_size} color={fg} /> : null}
      </View>
    </TouchableOpacity>
  ) : (
      <View style={[styles.container, hasShadow && styles.shadow]}>
        <Ionicons name={icon} size={icon_size / 2} color={fg} />
      </View>
    );
};

export default CircledIconButton;
