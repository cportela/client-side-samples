import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert
} from 'react-native';
import { baseColors } from '../utils/theme-primitives';
import EventItemCard from './EventItemCard';
import TextLink from './TextLink';
import { withNavigation } from 'react-navigation';
import Moment from 'moment';

const EventSection = withNavigation(({ section, navigation, AppState, User }) => {
  const { name, events = [], navigateTo, navParam } = section;

  const onPress = () => {
    if ('tabIndex' in section) {
      AppState.setEventsTab(section.tabIndex);
    }
    navigation.navigate(navigateTo, { tab: navParam });
  }

  const navToDetail = (event) => {
    const { id, start_date, end_date } = event;
    AppState.retrieveEvent(id).then(() => {
      const { retrieved_event } = AppState;
      if (retrieved_event.event_status === 0 || retrieved_event.event_status === 1) {
        if (event.operator_id === User.id) {
          const today = Moment(new Date(Date.now())).format('L');
          const start = Moment(new Date(start_date)).format('L');
          const end = Moment(new Date(end_date || start_date)).format('L');
          if (today === start || today === end) {
            navigation.navigate('EventDay');
            return;
          }
        }
      }
      navigation.navigate('EventDetails', { from_search: false });
    }).catch(err => {
      Alert.alert('Network error', err.toString());
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{name}</Text>
        <TextLink text={'See all'} onPress={onPress} />
      </View>
      <View>
        {events.map((event, index) => {
          return (
            <EventItemCard
              AppState={AppState}
              key={index.toString()}
              event={event}
              onPress={() => navToDetail(event)} />
          )
        })}
      </View>
    </View>
  )
});

const styles = StyleSheet.create({
  container: {
    paddingBottom: 6,
    marginTop: 10
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    paddingLeft: 10,
    textTransform: 'uppercase',
    color: baseColors.medium
  }
});

export default EventSection;
