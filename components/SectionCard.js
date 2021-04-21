import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { fonts, baseColors } from '../utils/theme-primitives';

export default class SectionCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.scroller}>
          {children}
        </View>
      </View>
    );
  }
}

SectionCard.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    marginBottom: 34,
    alignSelf: 'stretch',
    backgroundColor: baseColors.white,
    borderRadius: 10,
    borderColor: baseColors.white,
    borderWidth: 1
  },
  scroller: {
    flex: 1,
    margin: 0,
    padding: 0,
    alignSelf: 'stretch',
  }
});
