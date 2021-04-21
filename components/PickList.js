/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { fonts, baseColors } from '../utils/theme-primitives';
import CancelHeader from './CancelHeader';

export default class PickList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { renderer, items = [], value, onChange, onCancel, title = '', prompt = 'Please select an item from the list' } = this.props;

    return (
      <View style={styles.container}>
        <CancelHeader title={title} onOk={this._onOk} onCancel={onCancel} />
        <View style={styles.instructions}>
          <Text style={styles.text}>{prompt}</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroller}>
          <View style={styles.list}>
            {items.map((item, index) => {
              const selected = item.value === value;
              const lastInList = index + 1 === items.length;
              return (
                <TouchableOpacity key={index.toString()} onPress={() => onChange(item.value)} >
                  {typeof renderer === 'function' ? (
                    <View style={styles.renderedContainer}>
                      {renderer(item, index, lastInList, selected)}
                    </View>
                  ) : (
                      <View style={[styles.itemContainer, selected && styles.itemSelected]} >
                        <Text style={[styles.itemText, selected && styles.selected]}>{item.label}</Text>
                      </View>
                    )}
                </TouchableOpacity>
              )
            })}
          </View>
        </ScrollView>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    position: 'absolute',
    backgroundColor: 'white',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  instructions: {
    padding: 20
  },
  text: {
    color: baseColors.medium,
  },
  itemText: {
    color: baseColors.medium,
    ...fonts.largie
  },
  scroller: {
    width: '100%',
    flex: 1,
  },
  list: {
    paddingTop: 8,
    paddingHorizontal: 15,
  },
  itemContainer: {
    margin: 3,
    padding: 4,
    paddingVertical: 8,
    paddingTop: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: baseColors.light
  },
  itemSelected: {
    borderBottomColor: baseColors.tint1
  },
  selected: {
    color: baseColors.tint1,
    fontWeight: '600'
  },
  renderedContainer: {

  }
});
