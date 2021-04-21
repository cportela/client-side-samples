/* eslint-disable react/prop-types */
import React from 'react';
import GenericHeader from './GenericHeader';
import { withNavigation } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { tb_icon_size, baseColors } from '../utils/theme-primitives';
import { Keyboard } from 'react-native';

const BackHeader = props => {
  const { title, rightItems, navigation, action } = props;
  const leftItems = [{
    key: 'back',
    label: null,
    image: null,
    icon: <Ionicons name={'ios-arrow-back'} size={tb_icon_size} color={baseColors.tint1} />,
    action: () => {
      Keyboard.dismiss();
      if (typeof action === 'function') {
        action();
      } else {
        navigation.goBack();
      }
    }
  }];

  const cloned_props = { ...props };
  delete cloned_props.title;

  return (
    <GenericHeader {...cloned_props} leftItems={leftItems} rightItems={rightItems} title={title} />
  );
};

export default withNavigation(BackHeader);
