/* eslint-disable react/prop-types */
import React from 'react';
import {
  View
} from 'react-native';

const VerticalSpacer = ({ height, bg }) => {
  return (
    <View style={[{ height }, bg && { backgroundColor: bg }]}>
    </View>
  )
};

export default VerticalSpacer;
