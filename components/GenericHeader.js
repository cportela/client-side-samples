import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { isIphoneX } from '../utils/iphone';
import { fonts, baseColors } from '../utils/theme-primitives';
import ToolbarItem from './ToolbarItem';


export default class GenericHeader extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    leftItems: PropTypes.arrayOf(PropTypes.object),
    rightItems: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    textStyle: PropTypes.object,
    inSafeArea: PropTypes.bool
  };

  render() {
    const {
      leftItems,
      rightItems,
      title,
      buttonStyle,
      textStyle = {},
      transparent = false,
      inSafeArea = false
    } = this.props;

    const left =
      leftItems &&
      leftItems.map((item, index) => {
        return <ToolbarItem key={index.toString()} item={item} textStyle={textStyle} />;
      });

    const titleContent =
      typeof title === 'string' ? (
        <Text style={[styles.titleText, textStyle]}>{title}</Text>
      ) : (
          title
        );

    const right =
      rightItems ?
        rightItems.map((item, index) => {
          return (
            <ToolbarItem
              key={index.toString()}
              item={item}
              contentStyle={[buttonStyle]}
              textStyle={textStyle}
            />
          );
        }) : null;

    const iphoneAdjustment = {
      marginTop: 30
    };

    const transparency = {
      backgroundColor: 'transparent'
    };

    return (
      <View style={[styles.container, transparent && transparency, !inSafeArea && isIphoneX() && iphoneAdjustment]}>
        <View style={styles.innerContainer}>
          <View style={styles.left}>{left}</View>
          <View style={styles.title}>{titleContent}</View>
          <View style={styles.right}>{right}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    paddingHorizontal: 15,
    width: '100%'
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: 44
  },
  left: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  right: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  transparency: {
    color: 'white',
    fontWeight: '600'
  },
  titleText: {
    // padding: 8,
    color: baseColors.tint1,
    ...fonts.largie,
    fontWeight: '500'
  }
});
