/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { tb_icon_size, fonts, baseColors } from '../utils/theme-primitives';
import GenericHeader from './GenericHeader';
import CircledText from './CircledText';
import { Ionicons } from '@expo/vector-icons';
import LocalStorage from '../stores/LocalStorage';
import { inject, observer } from 'mobx-react';


const PinButtom = (props) => {
  const { onPress, text, pressed, next_route } = props;
  return (
    <TouchableOpacity onPress={onPress} >
      <CircledText size={60} text={text} fontSize={24} bg={pressed ? baseColors.dark : baseColors.tint1} />
    </TouchableOpacity>
  )
}

@inject('User')
@observer
export default class Pin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      digits: []
    }
  }

  addDigit = digit => {
    const { digits } = this.state;
    if (digits.length < 4 && digits.indexOf(digit) < 0) {
      this.setState({ digits: [...digits, digit] })
    }
  }

  onOk = () => {
    const { navigation, User } = this.props;
    const next_route = navigation.getParam('next_route', '');
    const { digits = [] } = this.state;
    LocalStorage.setItem(`pin_${User.email.toLowerCase()}`, digits.join('').toString());
    navigation.navigate(next_route);
  }

  render() {
    const { title = 'PIN CODE', prompt = 'Specify your 4-digit SECRET PIN code\nBe sure to memorize this code!' } = this.props;
    const { digits = [] } = this.state;

    const rightItems = [
      {
        key: 'clear',
        label: '',
        icon: <Ionicons name={'md-nuclear'} size={tb_icon_size} color={baseColors.tint1} />,
        action: () => this.setState({ digits: [] }),
        disabled_icon: <Ionicons name={'md-nuclear'} size={tb_icon_size} color={baseColors.light} />,
        disabled: digits.length === 0
      },
      {
        key: 'ok',
        label: '',
        icon: <Ionicons name={'md-checkmark'} size={tb_icon_size} color={baseColors.tint1} />,
        action: this.onOk,
        style: { paddingLeft: 20 },
        disabled_icon: <Ionicons name={'md-checkmark'} size={tb_icon_size} color={baseColors.light} />,
        disabled: digits.length !== 4
      }];

    return (
      <View style={styles.container} >
        <GenericHeader title={title} rightItems={rightItems} buttonStyle={{ margingLeft: 10 }} />
        <View style={styles.instructions}>
          <Text style={styles.text}>{prompt}</Text>
        </View>
        <View style={styles.instructions}>
          <Text style={styles.pinText}>{digits.join('') || ' '}</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroller}>
          <View style={styles.list}>
            <View style={styles.row}>
              <PinButtom text={'1'} pressed={digits.indexOf('1') >= 0} onPress={() => this.addDigit('1')} />
              <PinButtom text={'2'} pressed={digits.indexOf('2') >= 0} onPress={() => this.addDigit('2')} />
              <PinButtom text={'3'} pressed={digits.indexOf('3') >= 0} onPress={() => this.addDigit('3')} />
            </View>
            <View style={styles.row}>
              <PinButtom text={'4'} pressed={digits.indexOf('4') >= 0} onPress={() => this.addDigit('4')} />
              <PinButtom text={'5'} pressed={digits.indexOf('5') >= 0} onPress={() => this.addDigit('5')} />
              <PinButtom text={'6'} pressed={digits.indexOf('6') >= 0} onPress={() => this.addDigit('6')} />
            </View>
            <View style={styles.row}>
              <PinButtom text={'7'} pressed={digits.indexOf('7') >= 0} onPress={() => this.addDigit('7')} />
              <PinButtom text={'8'} pressed={digits.indexOf('8') >= 0} onPress={() => this.addDigit('8')} />
              <PinButtom text={'9'} pressed={digits.indexOf('9') >= 0} onPress={() => this.addDigit('9')} />
            </View>
            <View style={[styles.row, { justifyContent: 'center' }]}>
              <PinButtom text={'0'} pressed={digits.indexOf('0') >= 0} onPress={() => this.addDigit('0')} />
            </View>
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
  row: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 60
  },
  instructions: {
    alignItems: 'center',
    padding: 10
  },
  text: {
    paddingVertical: 4,
    textAlign: 'center',
    color: baseColors.medium,
  },
  pinText: {
    ...fonts.verylarge,
    color: baseColors.medium,
  },
  scroller: {
    width: '100%',
    flex: 1,
  },
  list: {
    paddingTop: 8,
    paddingHorizontal: 15,
  }
});
