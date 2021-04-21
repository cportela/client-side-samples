/* eslint-disable react/prop-types */
import React from 'react';
import { fonts, baseColors } from '../utils/theme-primitives';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { createAvatar } from './avatars';
import Moment from 'moment';

export default class RiderFullCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      fname,
      lname,
      dob,
      email,
      avatar = 1,
      mobile,
      style = {}
    } = this.props;

    return (
      <View style={[styles.container, style]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.avatarContainer}>
            {createAvatar(avatar, 100).img}
          </View>
          <View style={styles.nameContainer}>
            <View>
              <Text style={styles.text}>{`${fname} ${lname}`}</Text>
              {email ? <Text style={styles.text}>{email}</Text> : null}
              {mobile ? <Text style={styles.text}>{mobile}</Text> : null}
              {dob ? <Text style={styles.text}>{Moment(new Date(dob)).format('MMM D YYYY')}</Text> : null}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
    backgroundColor: baseColors.white,
    borderRadius: 6
  },
  avatarContainer: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  nameContainer: {
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignSelf: 'stretch'
  },
  text: {
    ...fonts.largie,
    color: baseColors.tint1
  }
});

