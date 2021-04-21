/* eslint-disable react/prop-types */
import React from 'react';
import { fonts, baseColors } from '../utils/theme-primitives';
import {
  View
} from 'react-native';
import CityStateZip from './CityStateZip';
import PaddedText from './PaddedText';

const AddressBlock = props => {
  const {
    address = {},
    style = {},
    textStyle = {},
    vpad = 2,
    hpad = 0,
    size = 12,
    tint = baseColors.medium
  } = props;
  const { address1, address2, city, state, zip, name, phone, email, web } = address;
  const container_style = {
    paddingVertical: vpad,
    paddingHorizontal: hpad
  };
  const text = {
    color: tint,
    fontSize: size,
  };

  return (
    <View style={[container_style, style]}>
      {name ? <PaddedText style={[text, { ...fonts.medium }, textStyle]}>{name}</PaddedText> : null}
      {address1 ? <PaddedText vpad={vpad} style={[text, textStyle]}>{address1}</PaddedText> : null}
      {address2 ? <PaddedText vpad={vpad} style={[text, textStyle]}>{address2}</PaddedText> : null}
      <CityStateZip city={city} vpad={vpad} state={state} zip={zip} size={size} hpad={hpad} tint={tint} />
      {phone ? <PaddedText vpad={vpad} style={[text, textStyle]}>{phone}</PaddedText> : null}
      {email ? <PaddedText vpad={vpad} style={[text, textStyle]}>{email}</PaddedText> : null}
      {web ? <PaddedText vpad={vpad} style={[text, textStyle]}>{web}</PaddedText> : null}
    </View>
  );
};

export default AddressBlock;
