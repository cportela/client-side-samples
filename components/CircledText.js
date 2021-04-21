/* eslint-disable react/prop-types */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CircledText = props => {
  const {
    size = 45,
    bg = '#70b4ff',
    color = '#f9fbff',
    fontSize = 18,
    fontWeight = '400',
    text = '??',
    hasShadow = true,
    shadowColor = '#000',
    shadowOpacity = 0.3,
    shadowRadius = 4,
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
    text: {
      color,
      fontSize,
      fontWeight
    },
    shadow: {
      shadowColor,
      shadowOpacity,
      shadowRadius,
      shadowOffset
    }
  });

  return (
    <View
      style={[styles.container, hasShadow && styles.shadow]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default CircledText;
