import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Platform,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView
} from 'react-native';
import Moment from 'moment';
import { tb_icon_size, misc, fonts, baseColors } from '../utils/theme-primitives';
import MinimalInput from '../components/MinimalInput';
import PaddedText from '../components/PaddedText';
import DateTimePicker from '@react-native-community/datetimepicker';
import WhiteButton from '../components/WhiteButton';
import BackHeader from '../components/BackHeader';
import ToolbarItem from '../components/ToolbarItem';
import { Ionicons } from '@expo/vector-icons';
import AddressBlock from '../components/AddressBlock';
import { inject, observer } from 'mobx-react';
import { good_string } from '../utils/core';
import { Alert } from '../components/Prompt';

@inject('User')
@inject('AppState')
@observer
export default class NewEventScreen extends Component {
  static navigationOptions = {
    headerShown: false
  };

  constructor(props) {
    super(props);
    this.initState();
  }

  initialDate = () => {
    const now = new Date(Date.now());
    const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 30, 0);
    return startDate;
  }
  initState = () => {
    const startDate = this.initialDate();
    this.state = {
      name: '',
      startDate,
      url: '',
      sanctioningBody: '',
      fee: 2500,
      description: '',
      venue: 0,
      facebook: '',
      twitter: '',
      instagram: '',
      pickStartDate: false,
      pickStartTime: false
    }
  }

  componentDidMount = () => {
  }

  itemSelected = (venue) => {
    this.setState({ venue });
  }

  onOk = () => {
    const { User, AppState, navigation } = this.props;
    const {
      name,
      startDate,
      url,
      sanctioningBody,
      fee,
      description,
      venue,
      facebook,
      twitter,
      instagram
    } = this.state;
    const fields = [];

    Keyboard.dismiss();
    fields.push({ field: 'Event name', status: good_string(name) });

    const title = 'New Event Info';
    let msg = '';
    // if the start_date is today simply accept it, even if it is an earlier time
    // than right now, however, do not accept a date pior to today.
    const today = Moment().format('L');
    const event_date = Moment(startDate).format('L');
    if (Moment(event_date).isBefore(today)) {
      msg = `You cannot create an event in the past\n\nPlease change the event's start date and try again`;
    } else {
      const bad_fields = fields.filter(f => !f.status);
      if (bad_fields.length > 0) {
        msg = `The following fields are required and must be specified:\n\n${bad_fields.map(bf => bf.field).join(', ')}`;
      } else if (venue === 0) {
        msg = 'You must select an exisiting venue, or create a new one, for this event';
      }
    }

    if (msg) {
      Alert.alert(title, msg);
    } else {
      AppState.createEvent({
        name,
        start_date: startDate,
        event_url: url || '',
        description: description || '',
        facebook: facebook || facebook,
        twitter: twitter || '',
        instagram: instagram || '',
        event_type_id: 1,
        event_status: 0,
        is_private: 0,
        is_standard_ride: 1,
        venue_id: venue.id,
        operator_id: User.id,
        entry_fee: fee || 2500
      }).then(() => {
        Alert.alert('New Event', `New Event '${name}' was successfully created.`, [
          {
            text: 'OK', onPress: () => {
              this.initState();
              navigation.goBack();
            }
          },
        ], { cancelable: false });
      }).catch(err => {
        Alert.alert('Network error', err.toString(0));
      });
    }
  }

  render() {
    const { navigation } = this.props;
    const {
      name,
      startDate,
      url,
      sanctioningBody,
      fee,
      description,
      venue,
      facebook,
      twitter,
      instagram,
      pickStartDate,
      pickStartTime
    } = this.state;
    const { width } = Dimensions.get('screen');
    const tb_style = {
      paddingLeft: 24,
      paddingVertical: 4
    }
    const tb = [
      {
        key: 'search',
        label: null,
        style: tb_style,
        image: null,
        icon: <Ionicons name={'md-search'} size={tb_icon_size} color={baseColors.tint1} />,
        action: () => {
          navigation.navigate('Venues', {
            selected: true,
            itemSelected: this.itemSelected,
            prompt: 'Select from the list or tap + to create a new venue'
          });
        }
      }];

    const rightItems = [{
      key: 'save',
      label: null,
      style: tb_style,
      image: null,
      icon: <Ionicons name={'md-checkmark'} size={tb_icon_size} color={baseColors.tint1} />,
      action: () => {
        this.onOk();
      }
    }];

    return (
      <SafeAreaView style={styles.container}>
        <BackHeader inSafeArea={true} title={`NEW EVENT`} rightItems={rightItems} />
        <KeyboardAvoidingView style={styles.inputArea} behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.inner}>
            <View style={styles.datesContainer}>
              <View style={styles.dateContainer}>
                <PaddedText vpad={4} style={[styles.genderText]}>{'Date & time'}</PaddedText>
                <WhiteButton
                  buttonStyle={{ width: 110 }}
                  onPress={() => { Keyboard.dismiss(); this.setState({ pickStartDate: true, pickStartTime: false }) }}
                  text={startDate ? Moment(new Date(startDate)).format('MM/DD/YYYY') : '(tap here)'} />
                <WhiteButton
                  buttonStyle={{ width: 100, marginLeft: 10 }}
                  onPress={() => { Keyboard.dismiss(); this.setState({ pickStartTime: true, pickStartDate: false }) }}
                  text={startDate ? Moment(new Date(startDate)).format('hh:mm A') : '(tap here)'} />
              </View>
            </View>
            <MinimalInput
              fixed_label={true}
              required={true}
              label={'Name'}
              error={''}
              placeholder={'Event name'}
              value={name}
              autoFocus={true}
              onChangeText={name => this.setState({ name })} />
            <MinimalInput
              fixed_label={true}
              label={'Description'}
              numberOfLines={2}
              multiline={true}
              error={''}
              placeholder={'Description'}
              value={description}
              onChangeText={description => this.setState({ description })} />
            <MinimalInput
              fixed_label={true}
              label={'Website'}
              error={''}
              placeholder={'Website'}
              value={url}
              onChangeText={url => this.setState({ url })} />
            <MinimalInput
              fixed_label={true}
              label={'Facebook'}
              error={''}
              placeholder={'Facebook'}
              value={facebook}
              onChangeText={facebook => this.setState({ facebook })} />
            <View style={styles.datesContainer}>
              <MinimalInput
                containerStyle={{ flex: 1 }}
                fixed_label={true}
                label={'Instagram'}
                error={''}
                placeholder={'Instagram'}
                value={instagram}
                onChangeText={instagram => this.setState({ instagram })} />
              <MinimalInput
                containerStyle={{ flex: 1 }}
                fixed_label={true}
                label={'Twitter'}
                error={''}
                placeholder={'Twitter'}
                value={twitter}
                onChangeText={twitter => this.setState({ twitter })} />
            </View>
            <View style={styles.toolbar}>
              <Text style={styles.venueLabel}>{'VENUE'}</Text>
              {tb.map((item, index) => {
                return <ToolbarItem
                  key={index.toString()}
                  item={item} />;
              })}
            </View>
            <View style={styles.venueContainer}>
              <AddressBlock address={venue} />
            </View>
          </ScrollView>
          {pickStartDate && !pickStartTime && (
            <View style={styles.datePicker}>
              <TouchableOpacity onPress={() => this.setState({ pickStartDate: false, pickStartTime: false })}>
                <Text style={{ alignSelf: 'flex-end', color: baseColors.tint1 }}>DONE</Text>
              </TouchableOpacity>
              <DateTimePicker
                value={startDate}
                mode={'date'}
                display={'default'}
                minuteInterval={30}
                onChange={(event, date) => {
                  this.setState({ startDate: date || this.initialDate(), pickStartDate: Platform.OS === 'ios' })
                }} />
            </View>
          )}
          {pickStartTime && !pickStartDate && (
            <View style={styles.datePicker}>
              <TouchableOpacity onPress={() => this.setState({ pickStartDate: false, pickStartTime: false })}>
                <Text style={{ alignSelf: 'flex-end', color: baseColors.tint1 }}>DONE</Text>
              </TouchableOpacity>
              <DateTimePicker
                value={startDate}
                mode={'time'}
                display={'default'}
                minuteInterval={30}
                onChange={(event, date) => {
                  this.setState({ startDate: date || this.initialDate(), pickStartTime: Platform.OS === 'ios' })
                }} />
            </View>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  datePicker: {
    marginVertical: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: baseColors.tint1
  },
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    backgroundColor: baseColors.white,
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  inner: {
    width: '100%',
    flex: 1,
  },
  venueContainer: {
    flexDirection: 'row',
    marginLeft: 20,
    padding: 0,
    paddingVertical: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: baseColors.tint1
  },
  venuerowsContainer: {
    flex: 1
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 20
  },
  buttonContainer: {
    alignItems: 'center'
  },
  datesContainer: {
    width: '100%',
    paddingHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 0
  },
  inputArea: {
    flex: 1,
    width: '100%',
    padding: 20
  },
  nameArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  genderText: {
    ...fonts.medium,
    paddingHorizontal: 10,
    color: baseColors.medium
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 20
  },
  headingText: {
    ...fonts.extralarge,
    color: '#9b9b9b'
  },
  logo: {
    width: 180,
    height: 100,
    marginVertical: 20
  },
  forgotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  forgot: {
    alignSelf: 'center',
    fontWeight: '300',
    color: '#4a4a4a',
    ...fonts.medium,
    marginRight: 8
  },
  venueLabel: {
    color: baseColors.tint1,
    paddingHorizontal: 0,
  },
  linkColor: {
    color: baseColors.tint1
  },
  text: {
    ...misc.big_center_text,
  }
});
