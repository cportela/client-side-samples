/* eslint-disable react/prop-types */
import React from 'react';
import GenericHeader from './GenericHeader';
import { Ionicons } from '@expo/vector-icons';
import { tb_icon_size, baseColors } from '../utils/theme-primitives';


const OkCancelHeader = props => {
  const { onCancel, onOk, title } = props;
  const leftItems = [{
    key: 'cancel',
    label: '',
    icon: <Ionicons name={'md-close'} size={tb_icon_size} color={baseColors.tint1} />,
    action: onCancel
  }];
  const rightItems = [{
    key: 'ok',
    label: '',
    icon: <Ionicons name={'md-checkmark'} size={tb_icon_size} color={baseColors.tint1} />,
    action: onOk
  }];
  const cloned_props = { ...props };
  delete cloned_props.onCancel;
  delete cloned_props.onOk;
  delete cloned_props.okLabel;
  delete cloned_props.cancelLabel;
  delete cloned_props.title;

  return (
    <GenericHeader
      {...cloned_props}
      leftItems={leftItems}
      rightItems={rightItems}
      title={title} />
  );
};

export default OkCancelHeader;
