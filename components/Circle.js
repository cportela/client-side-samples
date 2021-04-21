/* eslint-disable react/prop-types */
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { fonts, baseColors } from '../utils/theme-primitives';

const Circle = props => {
  const {
    hat,
    hatColor = baseColors.tint1,
    index,
    diameter = 10,
    filled = false,
    bg = '#d8d8d8',
    fillTint = '#19a5ed',
    spacing = 4,
    squared = false,
    onSelect,
    digits
  } = props;

  const style = {
    borderWidth: 0,
    backgroundColor: filled ? fillTint : bg,
    borderRadius: squared ? 0 : diameter / 2,
    height: diameter,
    width: diameter,
    margin: spacing,
    marginRight: spacing * 2,
    alignItems: 'center',
    justifyContent: 'center'
  };

  function onPress() {
    if (typeof onSelect === 'function' && index !== undefined) {
      onSelect(index);
    }
  }

  return (
    <TouchableOpacity onPress={onPress}>
      {hat && (
        <View style={{ width: 2, backgroundColor: hatColor, height: hat, alignSelf: "center" }} />
      )}
      <View style={[style]}>
        {digits && (
          <Text style={{ ...fonts.verysmall, color: "white" }}>
            {digits.toString()}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Circle;
