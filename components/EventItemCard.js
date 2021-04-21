/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { fonts, baseColors } from '../utils/theme-primitives';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Moment from 'moment';
import { getEventStatus } from '../utils/core';
import FictitiousIcon from './FictitiousIcon';

const EventItemCard = props => {
  const { event, onPress } = props;
  const {
    name,
    start_date,
    end_date,
    event_status,
    is_standard_ride,
    venue_name,
    description,
    is_fictitious,
    mine = false
  } = event;

  const color = baseColors.tint1;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <View style={styles.leftBox}>
            <MaterialIcons name={is_standard_ride ? 'event' : 'event-available'} size={40} color={color} />
            <Text style={[styles.event_status, event_status === 1 && styles.inProgress]}>
              {getEventStatus(event_status)}
            </Text>
          </View>
          <View style={styles.rightBox}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.second_row}>
              <Text>
                <Text style={styles.start_date}>{Moment(new Date(start_date)).format('ddd, MMM D YYYY')}</Text>
                <Text>
                  <Text>{' - '}</Text>
                  <Text style={styles.end_date}>{Moment(new Date(end_date || start_date)).format('ddd, MMM D')}</Text>
                </Text>
              </Text>
            </View>
            <View style={styles.penultima_fila}>
              <Text>
                {/* {event_type && (
                  <Text>
                    <Text style={styles.event_type}>{event_type}</Text>
                    <Text>{' - '}</Text>
                  </Text>
                )} */}
                <Text style={styles.description}>{description}</Text>
              </Text>
            </View>
            {venue_name ? <Text style={styles.venue}>{venue_name}</Text> : null}
          </View>
        </View>
        {is_fictitious ? (
          <View style={styles.fictitious}>
            {FictitiousIcon}
          </View>
        ) : null}
        {mine ? (
          <View style={styles.mine}>
            <Ionicons name={'md-person'} size={15} color={baseColors.light} />
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: baseColors.very_light,
    margin: 10,
    borderRadius: 10,
    shadowColor: baseColors.tint1,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 6,
      height: 6
    }
  },
  fictitious:{
    position: 'absolute',
    bottom: 6,
    right: 10
  },
  mine: {
    position: 'absolute',
    top: 6,
    right: 8
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftBox: {
    paddingTop: 8,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 65
  },
  rightBox: {
    // padding: 6,
    alignItems: 'flex-start',
    flex: 1
  },
  name: {
    paddingTop: 8,
    color: baseColors.medium,
    paddingBottom: 4
  },
  second_row: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 4
  },
  start_date: {
    color: baseColors.dark,
    ...fonts.small,
  },
  end_date: {
    color: baseColors.dark,
    ...fonts.small,
  },
  event_status: {
    color: baseColors.dark,
    ...fonts.extrasmall,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  penultima_fila: {
    alignSelf: 'stretch',
    paddingRight: 2,
    paddingBottom: 4
  },
  event_type: {
    color: baseColors.dark,
    ...fonts.verysmall,
    textTransform: 'uppercase'
  },
  description: {
    ...fonts.small,
    color: baseColors.light
  },
  venue: {
    color: baseColors.medium,
    ...fonts.small,
    paddingBottom: 8

  },
  inProgress: {
    color: baseColors.tint1,
    fontWeight: '800'
  }
})

export default EventItemCard;
