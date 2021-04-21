import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { misc, fonts, baseColors } from '../../utils/theme-primitives';
import MinimalInput from '../../components/MinimalInput';
import { Alert } from '../../components/Prompt';
import { inject, observer } from 'mobx-react';
import GenericButton from '../../components/GenericButton';
import { validateEmail } from '../../utils/validators';
import LocalStorage from '../../stores/LocalStorage';
import { publish } from '../../utils/pub-sub';

const LOCAL_STORAGE_KEY = 'rodeo.cred';

@inject('User')
@observer
export default class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pwd: '',
      // showPrompt: false,
      can_reset_pwd: false
    }
  }

  validatePassword = (value) => {
    return true;
  }

  handleLogin = async () => {
    const { user, pwd } = this.state;
    const { User, navigation } = this.props;
    Keyboard.dismiss();

    try {
      const can_reset_pwd = await LocalStorage.getItem(`pin_${user.toLowerCase()}`, null) !== null;
      this.setState({ can_reset_pwd });
      const result = await User.login(user, pwd);
      LocalStorage.setItem(LOCAL_STORAGE_KEY, { user, pwd });
      publish('user_name_change', user);
      if (result.user.can_be_operator) {
        Keyboard.dismiss();
        Alert.alert('Application Operation Mode',
          'You have a choice to use the application as a mechanical bull rider or as an event operator.\n\nPlease make your selection below.',
          [
            { text: 'Rider', onPress: () => this.onPress('rider') },
            { text: 'Operator', onPress: () => this.onPress('operator') }
          ], { cancelable: true });
      } else {
        const pin = await LocalStorage.getItem(`pin_${user.toLowerCase()}`, null);
        if (!pin) {
          navigation.navigate('Pin', { next_route: 'RiderDrawer' });
        } else {
          navigation.navigate('RiderDrawer');
        }
      }
    } catch (error) {
      const network_error = error.toLowerCase().indexOf('unexpected network error') >= 0;
      const title = network_error ? 'NETWORK ERROR' : 'Invalid credentials';
      const msg = network_error ?
        error : 'Please provide a correct email and password combination, then try again';

        Alert.alert(title, msg, [{
        text: 'OK', onPress: () => {
          this.setState({ pwd: '' });
        }
      }],
        { cancelable: false }
      );
    }
  }

  onPress = async cta => {
    const { navigation, User } = this.props;
    // this.setState({ showPrompt: false });
    Keyboard.dismiss();
    const pin = await LocalStorage.getItem(`pin_${User.email.toLowerCase()}`, null);
    if (cta === 'operator') {
      User.setMode('operator');
      if (!pin) {
        navigation.navigate('Pin', { next_route: 'OperatorDrawer' });
      } else {
        navigation.navigate('OperatorDrawer');
      }
    } else if (cta === 'rider') {
      User.setMode('rider');
      if (!pin) {
        navigation.navigate('Pin', { next_route: 'RiderDrawer' });
      } else {
        navigation.navigate('RiderDrawer');
      }
    }
  }

  componentDidMount = async () => {
    const { User, navigation } = this.props;
    try {
      const keys = await LocalStorage.getKeys();
      const can_reset_pwd = keys.filter(k => k.startsWith('pin_')).length > 0;
      this.setState({ can_reset_pwd });
      const result = await LocalStorage.getItem(LOCAL_STORAGE_KEY);
      if (typeof result.user === 'string' && typeof result.pwd === 'string') {
        this.setState({ user: result.user, pwd: result.pwd }, () => {
          setTimeout(() => {
            this.handleLogin();
          }, 300);
        });
      } else {
        LocalStorage.removeItem(`pin_${User.email.toLowerCase()}`);
        this.setState({ can_reset_pwd: false });
      }
    } catch (error) {
    }
  }

  render() {
    const { navigation } = this.props;
    const { can_reset_pwd = false, user = '', pwd = '' } = this.state;
    const enabled = user.length > 3 && pwd.length > 3 && validateEmail(user);

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.inner} behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.inner}>
            <View>
              <View style={styles.headerContainer}>
                <Image resizeMode={'contain'} style={styles.logo} source={require('../../images/nhsra-logo.png')} />
                <Text style={styles.headingText}>LOGIN</Text>
              </View>
              <View style={styles.inputArea}>
                <MinimalInput
                  fixed_label={true}
                  required={true}
                  label={'Email'}
                  error={''}
                  placeholder={'User email'}
                  value={user}
                  keyboardType={'email-address'}
                  autoCapitalize={'none'}
                  onChangeText={user => this.setState({ user })} />
                <MinimalInput
                  fixed_label={true}
                  secureTextEntry={true}
                  required={true}
                  label={'Password'}
                  error={''}
                  placeholder={'User password'}
                  value={pwd}
                  autoCapitalize={'none'}
                  onChangeText={pwd => this.setState({ pwd })}
                  validate={value => this.validatePassword(value)} />
                <View style={styles.loginButton}>
                  <GenericButton enabled={enabled} vpad={10} title={'LOGIN'} onPress={this.handleLogin} />
                </View>
                {can_reset_pwd ? (
                  <View style={styles.forgotContainer}>
                    <Text style={styles.forgot}>{'To reset your password'}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                      <Text style={[styles.forgot, styles.linkColor]}>{'go here'}</Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
              <View style={[styles.forgotContainer, styles.noAccout]}>
                <Text style={[styles.forgot, styles.noAccoutText]}>{'No Account yet?'}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={[styles.forgot, styles.noAccoutText, styles.linkColor]}>{'Sign up here'}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ height: 250 }}></View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        {/* {showPrompt &&
          <Prompt
            title={'Application Operation Mode'}
            message={'You have a choice to use the application as a mechanical bull rider or as an event operator.\n\nPlease make your selection below.'}
            cta={[{ text: 'Rider', value: 'rider' }, { text: 'Operator', value: 'operator' }]}
            onPress={this.onPress} />
        } */}
      </SafeAreaView >
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
    marginTop: 10,
    marginBottom: 6
  },
  inner: {
    width: '100%',
    flex: 1
  },
  headingText: {
    ...fonts.extralarge,
    color: '#9b9b9b'
  },
  inputArea: {
    width: '100%',
    paddingHorizontal: 40,
    flex: 1
  },
  loginButton: {
    paddingVertical: 20,
    paddingHorizontal: 50
  },
  loginButtonText: {
    color: 'white'
  },
  logo: {
    width: 180,
    height: 100,
    marginVertical: 10
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
    paddingTop: 10
  },
  noAccoutText: {
    ...fonts.largie
  },
  linkColor: {
    color: baseColors.tint1
  },
  text: {
    ...misc.big_center_text,
  },
});
