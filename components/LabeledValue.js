
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fonts, baseColors } from '../utils/theme-primitives';

const LabeledValue = (props) => {
  const {
    label = '',
    value = '',
    label_width = 130,
    mode = 'horiz',
    labelTextStyle = {},
    valueTextStyle = {}
  } = props;
  const valueStr = (value === null || value === undefined) ? '***' : value.toString();
  const content = mode === 'horiz' ? (
    <View style={styles.horiz_container}>
      <View style={[styles.labelContainer, label_width >= 0 && { width: label_width }]}>
        <Text style={[styles.labelText, labelTextStyle]}>{label}</Text>
      </View>
      <View style={styles.valueContainer}>
        <Text style={[styles.valueText, valueTextStyle, valueStr.startsWith('***') && styles.red]}>
          {value}
        </Text>
      </View>
    </View>
  ) : mode === 'vert_centered' ? (
    <View style={[styles.vert_container, label_width >= 0 && { width: label_width }, { alignItems: 'center' }]}>
      <Text style={[styles.labelText, labelTextStyle]}>{label}</Text>
      <Text
        numberOfLines={1}
        ellipsizeMode={'tail'}
        style={[styles.valueText, valueTextStyle, valueStr.startsWith('***') && styles.red]}>
        {value}
      </Text>
    </View>
  ) : mode === 'vert_flushed' ? (
    <View style={[styles.vert_container, { alignItems: 'flex-start' }]}>
      <Text style={[styles.labelText, labelTextStyle]}>{label}</Text>
      <Text style={[styles.valueText, valueTextStyle, valueStr.startsWith('***') && styles.red]}>
        {value}
      </Text>
    </View>
  ) : mode === 'horiz_left' ? (
    <View style={styles.horiz_container}>
      <View style={[styles.labelContainerLeft, label_width >= 0 && { width: label_width }]}>
        <Text style={[styles.labelText, labelTextStyle]}>{label}</Text>
      </View>
      <View style={styles.valueContainer}>
        <Text style={[styles.valueText, valueTextStyle, valueStr.startsWith('***') && styles.red]}>
          {value}
        </Text>
      </View>
    </View>
  ) : null;

  return content;
}

const styles = StyleSheet.create({
  vert_container: {
    flexDirection: 'column'
  },
  horiz_container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 4
  },
  labelContainerLeft: {
    marginRight: 10,
    alignItems: 'flex-start'
  },
  labelContainer: {
    paddingBottom: 4,
    marginRight: 10,
    alignItems: 'flex-end'
  },
  labelText: {
    fontWeight: '400',
    color: baseColors.medium,
    textTransform: 'uppercase',
    ...fonts.verysmall
  },
  valueContainer: {
    flex: 1,
    paddingBottom: 4,
  },
  valueText: {
    ...fonts.medium,
    color: baseColors.tint1
  },
  red: {
    color: 'red',
    fontWeight: '700'
  }
});

export default LabeledValue;
