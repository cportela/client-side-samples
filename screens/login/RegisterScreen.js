import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  Dimensions,
  KeyboardAvoidingView,
  Switch,
  Keyboard,
  ScrollView
} from 'react-native';
import Moment from 'moment';
import { misc, fonts, baseColors } from '../../utils/theme-primitives';
import MinimalInput from '../../components/MinimalInput';
import { getAvatar, getRandomAvatar } from '../../components/avatars';
import AvatarSelector from '../../components/AvatarSelector';
import PickList from '../../components/PickList';
import PaddedText from '../../components/PaddedText';
import DateTimePicker from '@react-native-community/datetimepicker';
import WhiteButton from '../../components/WhiteButton';
import { inject, observer } from 'mobx-react';
import OkCancelHeader from '../../components/OkCancelHeader';
import { good_string } from '../../utils/core';
import { Alert } from '../../components/Prompt';

@inject('User')
@observer
export default class RegisterScreen extends Component {
  static navigationOptions = {
    title: 'Signup'
  };

  constructor(props) {
    super(props);

    const now = new Date();

    this.state = {
      email: '',
      pwd: '',
      pwd_confirm: '',
      fname: '',
      lname: '',
      zip: '',
      gender: 0,
      dob: new Date(now.getFullYear() - 18, now.getMonth(), now.getDate()),
      can_be_operator: false,
      avatar: null,
      pickGender: false,
      pickAvatar: false,
      pickDob: false
    }
  }

  componentDidMount = () => {
    const { avatar, gender } = this.state;
    if (!avatar) {
      this.setState({ avatar: getRandomAvatar(gender === 0).id });
    }
  }

  validatePassword = (value) => {
    const {
      pwd,
      pwd_confirm,
    } = this.state;
    return pwd === pwd_confirm;
  }

  validateRequired = (value) => {
    return !!value;
  }

  onOk = () => {
    const { User, navigation } = this.props;
    const { email, pwd, pwd_confirm, lname, gender, dob, fname, zip, can_be_operator, avatar } = this.state;
    const fields = [];

    fields.push({ field: 'Email', status: good_string(email) });
    fields.push({ field: 'Last name', status: good_string(lname) });
    fields.push({ field: 'Gender', status: gender >= 0 });
    fields.push({ field: 'First name', status: good_string(fname) });
    fields.push({ field: 'Password', status: good_string(pwd) });
    fields.push({ field: 'Password confirmation', status: good_string(pwd_confirm) });
    fields.push({ field: 'Date of birth', status: !!dob });
    fields.push({ field: 'Zip', status: good_string(zip) });

    const title = 'Sign Up Information';
    let msg = '';
    const bad_fields = fields.filter(f => !f.status);
    if (bad_fields.length > 0) {
      msg = `The following fields are required and must be specified:\n\n${bad_fields.map(bf => bf.field).join(', ')}`;
    } else if (pwd !== pwd_confirm) {
      msg = 'Please be sure that your password and confirmation password values are identical';
      this.setState({ pwd: '', pwd_confirm: '' });
    }

    if (msg) {
      Alert.alert(title, msg);
    } else {
      User.register({ email, pwd, lname, gender, dob, fname, zip, avatar, has_avatar: true }, can_be_operator).then(() => {
        Alert.alert('Sign Up', 'User successfully created. Please expect a confirmation email to arrive soon.');
        navigation.navigate('Login');
      }).catch(err => {
        Alert.alert('Network error', err.toString());
      });
    }
  }

  onCancel = () => {
    const { navigation } = this.props;
    navigation.navigate('Login');
  }

  render() {
    const { navigation } = this.props;
    const {
      email,
      pwd,
      pwd_confirm,
      lname,
      gender,
      dob,
      fname,
      zip,
      can_be_operator,
      pickGender,
      avatar,
      pickAvatar,
      pickDob
    } = this.state;
    const { width } = Dimensions.get('screen');
    const gender_items = [
      { label: 'Male', value: 0 },
      { label: 'Female', value: 1 },
      { label: 'Other', value: 2 }
    ];
    let avatar_image;
    if (avatar) {
      avatar_image = getAvatar(avatar).img;
    }
    const gender_text = gender_items.find(g => g.value === gender).label;

    return (
      <SafeAreaView style={styles.container}>
        <OkCancelHeader inSafeArea={true} title={'SIGN UP'} onOk={this.onOk} onCancel={this.onCancel} />
        <KeyboardAvoidingView style={styles.inputArea} behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.inner}>
            <View style={styles.avatarContainer}>
              <TouchableOpacity onPress={() => { Keyboard.dismiss(); this.setState({ pickAvatar: true }) }}>
                {avatar_image}
              </TouchableOpacity>
              <PaddedText vpad={4} style={[styles.genderText, { ...fonts.verysmall }]}>{'(tap to change)'}</PaddedText>
            </View>
            <View>
              <View style={styles.genderContainer}>
                <PaddedText style={[styles.genderText, { width: 100 }]}>{'Gender: '}</PaddedText>
                <WhiteButton buttonStyle={{ width: 140 }} onPress={() => { Keyboard.dismiss(); this.setState({ pickGender: true }) }}
                  text={gender_text} />
              </View>
            </View>
            <View>
              <View style={styles.genderContainer}>
                <PaddedText style={[styles.genderText, { width: 100 }]}>{'Date of birth: '}</PaddedText>
                <WhiteButton buttonStyle={{ width: 140 }} onPress={() => { Keyboard.dismiss(); this.setState({ pickDob: true }) }}
                  text={dob ? Moment(new Date(dob)).format('MM/DD/YYYY') : '(tap to select)'} />
              </View>
            </View>
            <MinimalInput
              fixed_label={true}
              required={true}
              label={'Email'}
              error={''}
              autoCapitalize={'none'}
              placeholder={'User email'}
              value={email}
              onChangeText={email => this.setState({ email })} />
            <MinimalInput
              fixed_label={true}
              secureTextEntry={true}
              required={true}
              label={'Password'}
              error={''}
              autoCapitalize={'none'}
              placeholder={'User password'}
              value={pwd}
              onChangeText={pwd => this.setState({ pwd })}
              validate={value => { return this.validatePassword(value) }} />
            <MinimalInput
              fixed_label={true}
              secureTextEntry={true}
              required={true}
              label={'Confirm Password'}
              error={''}
              autoCapitalize={'none'}
              placeholder={'Confirm password'}
              value={pwd_confirm}
              onChangeText={pwd_confirm => this.setState({ pwd_confirm })}
              validate={value => { return this.validatePassword(value) }} />
            <View style={styles.nameArea}>
              <View style={{ flex: 1 }}>
                <MinimalInput
                  fixed_label={true}
                  secureTextEntry={false}
                  required={true}
                  label={'First'}
                  error={''}
                  autoCapitalize='sentences'
                  placeholder={'First name'}
                  value={fname}
                  onChangeText={fname => this.setState({ fname })} />
              </View>
              <View style={{ flex: 1 }}>
                <MinimalInput
                  fixed_label={true}
                  secureTextEntry={false}
                  required={true}
                  label={'Last'}
                  error={''}
                  autoCapitalize='sentences'
                  placeholder={'Last name'}
                  value={lname}
                  onChangeText={lname => this.setState({ lname })} />
              </View>
              <View style={{ flex: 0.5 }}>
                <MinimalInput
                  fixed_label={true}
                  secureTextEntry={false}
                  required={true}
                  label={'Zip'}
                  error={''}
                  placeholder={'Zip'}
                  value={zip}
                  onChangeText={zip => this.setState({ zip })} />
              </View>
            </View>
            <View style={styles.canBeOperator}>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                <PaddedText style={[styles.genderText, { width: 200 }]}>{'Request Operator status: '}</PaddedText>
                <Switch
                  trackColor={{ false: baseColors.light, true: baseColors.light }}
                  thumbColor={can_be_operator ? baseColors.tint1 : baseColors.very_light}
                  ios_backgroundColor={baseColors.light}
                  onValueChange={can_be_operator => this.setState({ can_be_operator })}
                  value={can_be_operator} />
              </View>
            </View>
            <View style={{height: 100}}></View>
          </ScrollView>
        </KeyboardAvoidingView>
        {pickGender ? <PickList
          value={gender}
          onChange={value => this.setState({ pickGender: false, gender: value })}
          onOk={value => this.setState({ pickGender: false, gender: value })}
          onCancel={() => this.setState({ pickGender: false })}
          title={'PICK GENDER'}
          items={gender_items}
          prompt={'Please pick one gender from the list below'} /> : null}
        {pickAvatar ? <AvatarSelector
          id={avatar}
          onOk={a => this.setState({ pickAvatar: false, avatar: a.id })}
          onCancel={() => this.setState({ pickAvatar: false })}
        /> : null}
        {pickDob ? (
          <View style={styles.datePicker}>
            <TouchableOpacity onPress={() => this.setState({ pickDob: false })}>
              <Text style={{ alignSelf: 'flex-end', color: baseColors.tint1 }}>DONE</Text>
            </TouchableOpacity>
            <DateTimePicker
              timeZoneOffsetInMinutes={0}
              value={dob || new Date()}
              mode={'date'}
              format={'YYYY-MM-DD'}
              display={'spinner'}
              onChange={(event, dob) => {
                this.setState({ dob, pickDob: Platform.OS === 'ios' })
              }} />
          </View>
        ) : null}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    backgroundColor: baseColors.white,
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  canBeOperator: {
    paddingHorizontal: 20
  },
  datePicker: {
    marginVertical: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: baseColors.tint1,
    width: '100%'
  },
  inner: {
    width: '100%',
    flex: 1,
  },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 22,
    paddingVertical: 10
  },
  avatarContainer: {
    alignItems: 'center',
    padding: 22,
    paddingVertical: 10
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
  loginButton: {
    alignItems: 'center',
    backgroundColor: baseColors.tint1,
    padding: 12,
    marginVertical: 10,
    marginHorizontal: 40,
    borderRadius: 6,

    shadowColor: baseColors.tint1,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: {
      width: -4,
      height: 4
    },
    minWidth: 140
  },
  loginButtonText: {
    color: 'white'
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
  linkColor: {
    color: baseColors.tint1
  },
  text: {
    ...misc.big_center_text,
  }
});
