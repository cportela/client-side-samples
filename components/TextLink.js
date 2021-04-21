/* eslint-disable react/prop-types */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { fonts, baseColors } from '../utils/theme-primitives';
import { MaterialIcons } from '@expo/vector-icons';

const TextLink = (props) => {
  const { text, icon_name = 'chevron-right', onPress } = props;

  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <Text style={styles.text}>{text}</Text>
          <MaterialIcons name={icon_name} size={20} />
        </View>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    textTransform: 'uppercase',
    ...fonts.small,
    color: baseColors.tint1
  }
});

export default TextLink;
