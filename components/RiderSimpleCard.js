/* eslint-disable react/prop-types */
import React from 'react';
import { tb_icon_size, fonts, baseColors } from '../utils/theme-primitives';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { getAvatar } from './avatars';
import { Ionicons } from '@expo/vector-icons';
import FictitiousIcon from './FictitiousIcon';


const RiderSimpleCard = props => {
  const { style = {}, rider = {}, } = props;
  const { avatar, rider_name, is_qualified_ride, participated = false, is_fictitious } = rider;
  const avatar_img = getAvatar(avatar).img;
  const result_icon = participated ?
    (is_qualified_ride ?
      <Ionicons name={'ios-thumbs-up'} size={tb_icon_size} color={baseColors.tint1} /> :
      <Ionicons name={'ios-thumbs-down'} size={tb_icon_size} color={baseColors.light} />) : null;

  return (
    <View style={[styles.container, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={styles.avatarContainer}>
          {avatar_img}
        </View>
        <View style={styles.nameContainer}>
          <View>
            <Text style={styles.text}>{rider_name}</Text>
          </View>
        </View>
      </View>
      <View style={styles.scoreContainer}>
        {/* <Text style={styles.positionText}>{position}</Text> */}
        {result_icon}
      </View>
      {is_fictitious ? (
        <View style={styles.fictitious}>
          {FictitiousIcon}
        </View>
      ) : null}
    </View>
  );
};

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
  name: {
    paddingVertical: 4,
    paddingLeft: 10,
  },
  avatarContainer: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  fictitious: {
    position: 'absolute',
    bottom: 0,
    right: 10
  },
  nameContainer: {
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignSelf: 'stretch'
  },
  scoreLabel: {
    ...fonts.verysmall,
    marginHorizontal: 6,
    color: baseColors.tint1
  },
  scoreText: {
    paddingHorizontal: 6,
    ...fonts.verysmall,
    color: baseColors.tint1,
    width: 25
  },
  positionText: {
    ...fonts.extralarge,
    color: baseColors.very_light,
    paddingHorizontal: 8,
  },
  text: {
    ...fonts.medium,
    color: baseColors.tint1
  }
});

export default RiderSimpleCard;
