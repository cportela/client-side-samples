/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation, StyleSheet } from 'react-native';
import { tb_icon_size, fonts, baseColors } from '../utils/theme-primitives';
import { Ionicons } from '@expo/vector-icons';
import { publish } from '../utils/pub-sub';

export const Alert = {
  alert(title, message, cta = [], options = {}) {
    const buttons = cta.length > 0 ? cta : [{ text: 'OK', onPress: () => publish('alert-close') }];
    const { cancelable = false } = options;
    publish('alert', {
      title,
      message,
      cta: buttons,
      cancelable
    });
  },
  close() {
    publish('alert-close');
  }
};



export default class Prompt extends Component {

  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }

  render() {
    const { title = '', message = '', cta = [], onPress, cancelable = true } = this.props;
    const handleOnPress = (onPress) => {
      onPress();
      publish('alert-close');
    }

    return (
      <View style={styles.container}>
        <View style={styles.msgContainer}>
          <View style={styles.titleContainer}>
            {cancelable ? (
              <View style={styles.closeContainer} >
                <TouchableOpacity onPress={() => publish('alert-close')}>
                  <View style={{ paddingVertical: 4, paddingHorizontal: 15 }}>
                    <Ionicons name={'ios-close'} size={tb_icon_size} color={baseColors.tint1} />
                  </View>
                </TouchableOpacity>
              </View>
            ) : null}
            <Text style={styles.titleText}>{title}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.msgText}>{message}</Text>
          </View>
          <View style={styles.ctaRowContainer}>
            {cta.map((btn, index) => {
              return (
                <TouchableOpacity key={index.toString()} onPress={() => handleOnPress(btn.onPress)}>
                  <View style={styles.ctaContainer}>
                    <Text style={styles.ctaText}>{btn.text}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  msgContainer: {
    margin: 12,
    minHeight: 280,
    maxHeight: 310,
    minWidth: '90%',
    backgroundColor: 'white',
    borderRadius: 6,
  },
  titleContainer: {
    padding: 8,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: baseColors.tint2_contrast3,
    // borderBottomWidth: 1,
    borderBottomColor: baseColors.tint1,
    borderTopEndRadius: 6,
    borderTopLeftRadius: 6
  },
  closeContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    // paddingHorizontal: 9
  },
  titleText: {
    ...fonts.medium,
    color: baseColors.medium,
    textTransform: 'uppercase'
  },
  textContainer: {
    padding: 18,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  msgText: {
    textAlign: 'center',
    ...fonts.largie,
    color: baseColors.medium
  },
  ctaRowContainer: {
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  ctaContainer: {
    minWidth: 100,
    padding: 8,
    backgroundColor: baseColors.tint1,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  ctaText: {
    ...fonts.small,
    color: baseColors.white,
    textTransform: 'uppercase'
  }
})

