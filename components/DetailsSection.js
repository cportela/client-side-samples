/* eslint-disable react/prop-types */
import React from 'react';
import { fonts, baseColors } from '../utils/theme-primitives';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

const DetailsSection = props => {
  const { title = '', style = {}, children = [], childrenStyle = {} } = props;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.title} >
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={[styles.childrenContainer, childrenStyle]} >
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    marginBottom: 20
  },
  title: {
    paddingVertical: 4,
    paddingLeft: 10,
  },
  text: {
    textTransform: 'uppercase',
    ...fonts.medium,
    color: baseColors.tint1
  },
  childrenContainer: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    paddingVertical: 14,
    backgroundColor: baseColors.very_light
  }
});

export default DetailsSection;
