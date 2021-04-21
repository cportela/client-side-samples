/* eslint-disable react/prop-types */
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fonts, baseColors } from '../utils/theme-primitives';

const ToolbarItem = props => {
  const { item, textStyle = {}, contentStyle = {} } = props;
  const { key, label, image, icon = null, disabled_icon = null, action, style = {}, resizeMode = 'contain', disabled = false } = item;

  const content = icon ? (disabled ? disabled_icon : icon) : label ? (
    <Text style={[styles.labelText, textStyle]}>{label}</Text>
  ) : <Image resizeMode={resizeMode} style={styles.button} source={image} />

  return disabled ? (
    <View style={[styles.touchable, style]} key={key} >
      <View style={styles.container}>
        {content}
      </View>
    </View>
  ) : (
      <TouchableOpacity
        style={[styles.touchable, style]}
        onPress={action}
        key={key} >
        <View style={styles.container}>
          {content}
        </View>
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    paddingVertical: 6
  },
  button: {
    width: 30,
    height: 30
  },
  touchable: {
    padding: 0
  },
  labelText: {
    alignSelf: 'center',
    color: baseColors.tint1,
    ...fonts.small,
    fontWeight: '600'
  }
});

export default ToolbarItem;
