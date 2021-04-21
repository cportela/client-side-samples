import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Circle from './Circle';

export default class PagerCrumbs extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    crumbCount: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    onSelect: PropTypes.func,
    float: PropTypes.bool
  };

  render() {
    const { crumbCount, current = 0, onSelect, float = false } = this.props;
    const crumbs = [];
    for (let i = 0; i < crumbCount; i++) {
      crumbs.push(
        <Circle
          index={i}
          key={i}
          diameter={12}
          filled={current === i}
          bg={'#d8d8d8'}
          fillTint={'#19a5ed'}
          tint={'#19a5ed'}
          squared={false}
          onSelect={onSelect} />
      );
    }
    return (
      <View style={[styles.container, float && { position: "absolute", bottom: 4, left: 4, right: 4 }]} >
        {crumbs}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    padding: 8,
    paddingTop: 0,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});
