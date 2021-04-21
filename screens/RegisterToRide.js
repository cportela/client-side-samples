import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
  Alert
} from 'react-native';
import { tb_icon_size, fonts, baseColors } from '../utils/theme-primitives';
import BackHeader from '../components/BackHeader';
import { ScrollView } from 'react-native-gesture-handler';
import { inject, observer } from 'mobx-react';
import { Ionicons } from '@expo/vector-icons';
import DetailsSection from '../components/DetailsSection';
import LabeledValue from '../components/LabeledValue';
import Moment from 'moment';
import { formatter } from '../utils/formatter';
import MinimalInput from '../components/MinimalInput';
import GenericButton from '../components/GenericButton';
import { good_string } from '../utils/core';
import CircledIconButton from '../components/CircledIconButton';
import VerticalSpacer from '../components/VerticalSpacer';

@inject('User')
@inject('AppState')
@observer
export default class RegisterToRide extends Component {
  static navigationOptions = {
    headerShown: false
  };

  constructor(props) {
    super(props);
    this.state = {
      card_alias: '',
      name_on_card: '',
      card_number: '',
      exp_month: '',
      exp_year: '',
      cvc: '',
      forceDisable: false,
      selected_card: -1
    }
  }

  componentDidMount = () => {
    const { User } = this.props;
    User.retrieveCards().catch(err => {
      Alert.alert('Network Error', err.toString());
    });
  }

  onOk = () => {
    const { User, AppState, navigation } = this.props;
    const { retrieved_event } = AppState;
    const { user_cards } = User;
    Keyboard.dismiss();
    const { selected_card } = this.state;
    if (selected_card >= 0) {
      User.charge(retrieved_event.id, user_cards[selected_card].id, 2500).then(results => {
        Alert.alert('Register to Ride', `${User.fname}, you have successfully registered for this event!`, [
          {
            text: 'OK', onPress: () => {
              this.setState({ forceDisable: false });
              AppState.retrieveEvent(retrieved_event.id).catch(err => { });
              User.retrieveHistory().catch(() => { });
              AppState.loadMyEvents().catch(() => { });
              navigation.goBack();
            }
          }
        ], { cancelable: false });
      }).catch(error => {
        Alert.alert('Network error', error.toString());
      });
    } else {
      Alert.alert('Register to Ride', `${User.fname}, please select a payment method or add a new card to your account.`);
    }
  }

  addCard = () => {
    const { card_alias, name_on_card, card_number, exp_month, exp_year, cvc } = this.state;

    Keyboard.dismiss();
    this.setState({ forceDisable: true });
    const { User, AppState } = this.props;
    User.registerCard({
      cc_alias: card_alias,
      name: name_on_card,
      number: card_number,
      exp_month: exp_month,
      exp_year: exp_year,
      cvc: cvc
    }, {}).then(result => {
      User.retrieveCards().catch(err => { });
      this.setState({
        card_alias: '',
        name_on_card: '',
        card_number: '',
        exp_month: '',
        exp_year: '',
        cvc: '',
        selected_card: -1,
        forceDisable: false
      });
    }).catch(error => {
      Alert.alert('Network error', error.toString());
      this.setState({ forceDisable: false });
    })
  }

  render() {
    const { card_alias, name_on_card, card_number, exp_month, exp_year, cvc, forceDisable, selected_card } = this.state;
    const { User, AppState, navigation } = this.props;
    const { retrieved_event } = AppState;
    const { user_cards = [] } = User;
    const { start_date, end_date, operator_name, event_url, sanctioning_body_name, entry_fee } = retrieved_event;
    const rightItems = [{
      key: 'register',
      label: null,
      icon: <Ionicons name={'md-card'} size={tb_icon_size} color={baseColors.tint1} />,
      action: this.onOk
    }];
    // const user_cards = [];
    const enable_button = forceDisable ? false : (
      good_string(card_alias) && good_string(name_on_card) && good_string(card_number) && good_string(exp_month) && good_string(exp_year) && good_string(cvc)
    );
    const fontFamily = Platform.OS === 'ios' ? 'Courier' : 'monospace';

    return (
      <SafeAreaView style={styles.container}>
        <BackHeader inSafeArea={true} navigation={navigation} title={'REGISTER TO RIDE'} rightItems={rightItems} />
        <KeyboardAvoidingView style={styles.inputArea} behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scroller}>
            <DetailsSection title={'EVENT YOU ARE REGISTERING FOR'}>
              {start_date ? <LabeledValue label_width={100} label={'START DATE'} value={Moment(new Date(start_date)).format('ddd, MMM D YYYY')} /> : null}
              {(end_date || start_date) ? <LabeledValue label_width={100} label={'END DATE'} value={Moment(new Date(end_date || start_date)).format('ddd, MMM D YYYY')} /> : null}
              {operator_name ? <LabeledValue label_width={100} label={'Event Operator'} value={operator_name} /> : null}
              {event_url ? <LabeledValue label_width={100} label={'Event url'} value={event_url} /> : null}
              {sanctioning_body_name ? <LabeledValue label_width={100} label={'SANCTIONING'} value={sanctioning_body_name} /> : null}
              {entry_fee ? <LabeledValue label_width={100} label={'ENTRY FEE'} value={formatter.format(entry_fee / 100)} /> : null}
            </DetailsSection>
            <View>
              <DetailsSection title={`PAYMENT METHODS`}>
                {user_cards.length === 0 ? (
                  <View>
                    <Text style={styles.text}>{'You have no credit cards on file, please add a new form of payment below'}</Text>
                  </View>
                ) : (
                    <View>
                      <Text style={{ paddingVertical: 8, ...fonts.small, color: baseColors.dark }}>{'Select a card to use for payment or add a new one below'}</Text>
                      {user_cards.map((cc, index) => {
                        return (
                          <View key={index.toString()} style={{ flexDirection: 'row', padding: 4, alignItems: 'center', justifyContent: 'flex-start', paddingRight: 20 }}>
                            <CircledIconButton icon_size={15} icon={selected_card === index ? 'md-checkmark' : ''} size={20} onPress={() => this.setState({ selected_card: index })} />
                            <Text style={{ fontFamily, paddingLeft: 10, ...fonts.small, color: baseColors.medium }}>{`${cc.cc_alias || 'No Alias'}`}</Text>
                            <View style={{ flex: 1 }}>
                              <Text style={{ fontFamily, paddingLeft: 10, alignSelf: 'flex-end', ...fonts.small, color: baseColors.medium }}>{`....-${cc.last4}`}</Text>
                            </View>
                          </View>
                        )
                      })}
                    </View>
                  )}
              </DetailsSection>
              <DetailsSection title={'NEW CARD'}>
                {/* {cc_errors ? (
                  <View style={{ paddingHorizontal: 10 }}>
                    <Text style={styles.errorText}>{cc_errors}</Text>
                  </View>
                ) : null} */}
                <GenericButton
                  enabled={enable_button}
                  title={'ADD CARD'}
                  vpad={5} hpad={4}
                  textStyle={styles.buttonText}
                  containerStyle={styles.buttonContainer}
                  onPress={this.addCard} />
                <MinimalInput
                  fixed_label={true}
                  required={true}
                  label={'Card alias'}
                  error={''}
                  placeholder={'A name to recognize this card later'}
                  value={card_alias}
                  onChangeText={card_alias => this.setState({ card_alias })} />
                <MinimalInput
                  fixed_label={true}
                  required={true}
                  label={'Name'}
                  error={''}
                  placeholder={'Name as it appears on the card'}
                  value={name_on_card}
                  onChangeText={name_on_card => this.setState({ name_on_card })} />
                <MinimalInput
                  fixed_label={true}
                  required={true}
                  label={'Card number'}
                  error={''}
                  placeholder={'Card number'}
                  autoCapitalize={'none'}
                  value={card_number}
                  onChangeText={card_number => this.setState({ card_number })} />
                <View style={styles.card_expiration}>
                  <View style={{ flex: 1 }}>
                    <MinimalInput
                      fixed_label={true}
                      required={true}
                      label={'Exp month'}
                      error={''}
                      placeholder={'Exp month'}
                      autoCapitalize={'none'}
                      keyboardType={'number-pad'}
                      value={exp_month}
                      onChangeText={exp_month => this.setState({ exp_month })} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <MinimalInput
                      fixed_label={true}
                      required={true}
                      label={'Exp year'}
                      error={''}
                      placeholder={'Exp year'}
                      autoCapitalize={'none'}
                      keyboardType={'number-pad'}
                      value={exp_year}
                      onChangeText={exp_year => this.setState({ exp_year })} />
                  </View>
                  <View style={{ flex: 0.6 }}>
                    <MinimalInput
                      fixed_label={true}
                      required={true}
                      label={'CVC'}
                      error={''}
                      placeholder={'CVC'}
                      autoCapitalize={'none'}
                      keyboardType={'numeric'}
                      value={cvc}
                      onChangeText={cvc => this.setState({ cvc })} />
                  </View>
                </View>
              </DetailsSection>
            </View>
            <VerticalSpacer height={50} />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: baseColors.white,
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  scroller: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  title: {
    paddingVertical: 4,
    paddingLeft: 10,
  },
  text: {
    ...fonts.medium,
    color: baseColors.tint1
  },
  card_expiration: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttonContainer: {
    width: 80,
    alignSelf: 'flex-end'
  },
  buttonText: {
    ...fonts.verysmall
  },
  inputArea: {
    flex: 1
  },
  errorText: {
    color: 'red',
    ...fonts.verysmall
  }
});
