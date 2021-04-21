import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { fonts, baseColors } from '../utils/theme-primitives';


const OPACITY_ANIMATION_DURATION = 1000;

class Label extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { style, textStyle, labelColor, text } = this.props;

    return (
      <View style={[style]} >
        <Text style={[textStyle, { color: labelColor }]}>{text}</Text>
      </View>
    );
  }
}

export default class MinimalInput extends Component {
  constructor(props, context) {
    super(props, context);
    const { onChange, onChangeText } = props;
    this.onChange = onChange;
    this.onChangeText = onChangeText;
    this._dirty = false;
  }

  handleOnChangeText = (param) => {
    this._dirty = true;
    if (typeof this.onChangeText === 'function') {
      return this.onChangeText(param);
    }
  }

  handleOnChange = (param) => {
    this._dirty = true;
    if (typeof this.onChange === 'function') {
      return this.onChange(param);
    }
  }

  render() {
    const cloned_props = { ...this.props };
    const {
      required,
      style,
      containerStyle,
      validate,
      error,
      value,
      label = '',
      placeholder = '',
      errorStyle = {},
      requiredColor = 'red',
      labelColor = '#777',
      fixed_label = false,
      editable = true
    } = cloned_props;

    // Remove properties that do not need to be passed down
    // to the native TextInput component
    delete cloned_props.required;
    delete cloned_props.style;
    delete cloned_props.containerStyle;
    delete cloned_props.validate;
    delete cloned_props.error;
    delete cloned_props.label;
    delete cloned_props.errorStyle;
    delete cloned_props.requiredColor;
    delete cloned_props.labelColor;
    delete cloned_props.fixed_label;
    delete cloned_props.onChange;
    delete cloned_props.onChangeText;

    let is_valid = true;
    let validationError = '';
    if (typeof validate === 'function') {
      try {
        // If validate returns a string we interpret that to mean
        // that the value is invalid and that the return value is
        // an error description string.
        validationError = validate(value);
        is_valid = typeof validationError !== 'string';
      } catch (e) {
        // Swallow the exception, nothgn we can do about it...
        validationError = '';
      }
    }
    const valid_input = (typeof value === 'string' && value.length > 0);
    const non_empty = fixed_label || valid_input;

    return (
      <View style={[styles.container, containerStyle]}>
        <Label non_empty={non_empty} style={styles.label} textStyle={styles.labelText} text={cloned_props.value && (label || placeholder)} labelColor={labelColor} />
        <View style={styles.textArea}>
          <Text style={[styles.asterisk, { color: requiredColor }]}>{(required && !valid_input) ? '*' : ''}</Text>
          <TextInput
            placeholderTextColor={'#888'}
            {...cloned_props}
            onChange={this.handleOnChange}
            onChangeText={this.handleOnChangeText}
            style={[styles.textInput, style, !is_valid && styles.invalid, !editable && styles.disabled]} />
        </View>
        <View style={styles.error}>
          <Text style={[styles.errorText, errorStyle]}>{this._dirty && (validationError || error)}</Text>
        </View>
      </View>
    );
  }
}

const ASTERISK_WIDTH = 14;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    paddingRight: 10
  },
  label: {
    height: 18,
    paddingLeft: 1 * ASTERISK_WIDTH,
    alignSelf: 'flex-start',
    paddingBottom: 0,
    marginBottom: 4
  },
  labelText: {
    ...fonts.medium,
    color: '#999',
    fontWeight: '400'
  },
  textArea: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  error: {
    height: 14,
    paddingLeft: ASTERISK_WIDTH * 1,
    paddingRight: 2,
    alignSelf: 'flex-start',
  },
  errorText: {
    ...fonts.verysmall,
    marginTop: 2,
    color: 'red',
    fontWeight: '500'
  },
  invalid: {
    borderBottomColor: 'red'
  },
  disabled: {
    color: baseColors.light
  },
  asterisk: {
    width: ASTERISK_WIDTH,
    marginRight: 0,
    marginLeft: 0
  },
  textInput: {
    flex: 1,
    ...fonts.small,
    color: '#666',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#888',
    paddingBottom: 4,
    paddingLeft: 0
  }
});
