/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView
} from 'react-native';
import { misc, fonts, baseColors } from '../../utils/theme-primitives';
import MinimalInput from '../../components/MinimalInput';
import GenericButton from '../../components/GenericButton';
import BackHeader from '../../components/BackHeader';
import LocalStorage from '../../stores/LocalStorage';
import Loader from '../../components/Loader';
import { validateEmail, validateZip } from '../../utils/validators';
import { inject, observer } from 'mobx-react';
import { Alert } from '../../components/Prompt';

@inject('User')
@observer
export default class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailError: '',
      pin: '',
      pinError: '',
      pwd: '',
      pwdConfirm: '',
      zip: '',
      zipError: '',
      loading: false
    }
  }

  handlePwdChange = () => {
    const { User } = this.props;
    Keyboard.dismiss();
    const { email, pin, zip, pwd, pwdConfirm } = this.state;
    this.setState({ loading: true });
    setTimeout(() => {
      Keyboard.dismiss();
      LocalStorage.getItem(`pin_${email.toLowerCase()}`, null).then(result => {
        if (parseInt(result) === parseInt(pin)) {
          User.reset(email, zip, pwd).then(user => {
            Alert.alert('Password reset', 'Your password has been successfully reset',
              [{
                text: 'OK', onPress: () => {
                  this.setState({ pin: '', email: '', zip: '', pwd: '', pwdConfirm: '' });
                  this.goBack();
                }
              }],
              { cancelable: false }
            );
          }).catch(err => {
            Alert.alert('Password reset', 'Please correct the provided information and try again',
              [{ text: 'OK', onPress: () => { } }],
              { cancelable: false }
            );
          })
        } else {
          Alert.alert('Password reset', 'Please double-check the provided information and then try again',
            [{ text: 'OK', onPress: () => { } }],
            { cancelable: false }
          );
        }
        this.setState({ loading: false });
      })
    }, 3000);
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.navigate('Login');
  }

  onBlur = () => {
    const { email, pin, zip, pwd, pwdConfirm } = this.state;
    this.setState({
      emailError: validateEmail(email) ? '' : 'Malformed email address',
      pinError: pin.length != 4 ? 'Specifiy exactly 4 digits' : '',
      zipError: validateZip(zip) ? '' : 'Invalid USA or CAD zip'
    });
  }

  render() {
    const { navigation } = this.props;
    const { email, emailError, pin, pinError, zip, zipError, pwd, pwdConfirm, loading = false } = this.state;
    const enabled = (pwd === pwdConfirm) && (pin.length == 4) && validateEmail(email) && validateZip(zip);

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <BackHeader action={this.goBack} inSafeArea={true} title={'PASSWORD RESET'} navigation={navigation} />
          <KeyboardAvoidingView style={styles.inner} behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
            <ScrollView style={{ flex: 1 }}>
              <View style={styles.inputArea}>
                <MinimalInput
                  fixed_label={true}
                  required={true}
                  label={'User email'}
                  error={emailError}
                  placeholder={'Email specified at setup'}
                  value={email}
                  keyboardType={'email-address'}
                  autoCapitalize={'none'}
                  onBlur={this.onBlur}
                  onChangeText={email => this.setState({ email })} />
                <MinimalInput
                  fixed_label={true}
                  required={true}
                  label={'Zip code'}
                  error={zipError}
                  placeholder={'Zip code specified at setup'}
                  value={zip}
                  keyboardType={'default'}
                  autoCapitalize={'none'}
                  onBlur={this.onBlur}
                  onChangeText={zip => this.setState({ zip })} />
                <MinimalInput
                  fixed_label={true}
                  required={true}
                  label={'Secret PIN'}
                  error={pinError}
                  placeholder={'Secret 4-digit PIN'}
                  value={pin}
                  keyboardType={'numeric'}
                  autoCapitalize={'none'}
                  onBlur={this.onBlur}
                  onChangeText={pin => this.setState({ pin })} />
                <MinimalInput
                  fixed_label={true}
                  secureTextEntry={true}
                  required={true}
                  label={'New Password'}
                  error={''}
                  placeholder={'Your new password'}
                  value={pwd}
                  autoCapitalize={'none'}
                  onBlur={this.onBlur}
                  onChangeText={pwd => this.setState({ pwd })}
                  validate={value => this.validatePassword(value)} />
                <MinimalInput
                  fixed_label={true}
                  secureTextEntry={true}
                  required={true}
                  label={'Confirm your new password'}
                  error={''}
                  placeholder={'Confirm password'}
                  value={pwdConfirm}
                  autoCapitalize={'none'}
                  onBlur={this.onBlur}
                  onChangeText={pwdConfirm => this.setState({ pwdConfirm })}
                  validate={value => this.validatePassword(value)} />
                <View style={styles.loginButton}>
                  <GenericButton enabled={enabled} vpad={10} title={'CHANGE PASSWORD'} onPress={this.handlePwdChange} />
                </View>
                <View style={{height: 200}}></View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
          <Loader loading={loading} />
        </SafeAreaView>
      </TouchableWithoutFeedback>
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
  headerContainer: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 6
  },
  inner: {
    width: '100%',
    paddingTop: 40,
    flex: 1
  },
  headingText: {
    ...fonts.extralarge,
    color: '#9b9b9b'
  },
  inputArea: {
    paddingHorizontal: 40,
    flex: 1
  },
  loginButton: {
    paddingVertical: 10,
    paddingHorizontal: 50
  },
  loginButtonText: {
    color: 'white'
  },
  logo: {
    width: 180,
    height: 100,
    marginVertical: 20
  },
  bottomImageContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    alignItems: 'flex-start',
    zIndex: -1000
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
  noAccout: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0
  },
  noAccoutText: {
    ...fonts.large,
  },
  linkColor: {
    color: baseColors.tint1
  },
  text: {
    ...misc.big_center_text,
  },
});
