/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import LabeledValue from '../components/LabeledValue';
import { fonts, baseColors } from '../utils/theme-primitives';
import { MaterialIcons } from '@expo/vector-icons';
import Moment from 'moment';
import DetailsSection from '../components/DetailsSection';
import RiderSimpleCard from '../components/RiderSimpleCard';
import AddressBlock from '../components/AddressBlock';
import { formatter } from '../utils/formatter';
import { getEventStatus } from '../utils/core';
import VerticalSpacer from '../components/VerticalSpacer';

const LeftVertValue = ({ label, value }) => {

  return <LabeledValue mode={'vert_flushed'} label_width={-1} label={label} value={value} />;
}

const CenteredValue = ({ label, value }) => {
  return <LabeledValue mode={'vert_centered'} label_width={-1} label={label} value={value} />;
}

export default class EventDetailsCard extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { event, event_day_usage = false } = this.props;
    const {
      name,
      start_date = null,
      end_date = null,
      event_status,
      is_standard_ride,
      event_url = null,
      description,
      operator_name,
      facebook = '',
      twitter = '',
      instagram = '',
      entry_fee = null,
      sanctioning_body_name = null,
      venue = {},
      entries = []
    } = event;
    const to_run = entries.filter(e => !e.participated);
    const done = entries.filter(e => e.participated);

    const operator = null; // in User
    const social_media = !!(twitter || facebook || instagram);
    const has_venue = !!(venue.name && (venue.state, venue.zip || venue.phone || venue.email));
    const status = getEventStatus(event_status);

    return (
      <View>
        {event_day_usage ? (
          <View style={styles.eventDay_header}>
            <Text style={styles.eventDay_name}>{name}</Text>
            <VerticalSpacer height={4}/>
            <Text style={styles.small_status}>{status}</Text>
          </View>
        ) : (
            <View style={styles.header}>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{name}</Text>
                <VerticalSpacer height={6}/>
                <Text style={styles.status}>{status}</Text>
              </View>
              <MaterialIcons name={is_standard_ride ? 'event' : 'event-available'} size={90} color={baseColors.tint1} />
            </View>
          )}
        <View style={styles.info}>
          <DetailsSection title={'BASIC INFO'}>
            {start_date ? <LabeledValue label_width={100} label={'START DATE'} value={Moment(new Date(start_date)).format('ddd, MMM D YYYY')} /> : null}
            {end_date ? <LabeledValue label_width={100} label={'END DATE'} value={Moment(new Date(end_date || start_date)).format('ddd, MMM D YYYY')} /> : null}
            {start_date ? <LabeledValue label_width={100} label={'Event time'} value={Moment(new Date(start_date)).format('hh:mm A')} /> : null}
            {operator_name ? <LabeledValue label_width={100} label={'Event Operator'} value={operator_name} /> : null}
            {event_url ? <LabeledValue label_width={100} label={'Event url'} value={event_url} /> : null}
            {sanctioning_body_name ? <LabeledValue label_width={100} label={'SANCTIONING'} value={sanctioning_body_name} /> : null}
            {entry_fee ? <LabeledValue label_width={100} label={'ENTRY FEE'} value={formatter.format(entry_fee / 100)} /> : null}
          </DetailsSection>
          {description ? (
            <DetailsSection title={'DESCRIPTION'}>
              <Text style={styles.description}>
                {description}
              </Text>
            </DetailsSection>
          ) : null}
          {has_venue ? (
            <DetailsSection title={'EVENT VENUE'}>
              <AddressBlock
                title={venue.name}
                address={venue}
                phone={venue.phone}
                email={venue.email}
                web={venue.web}
              />
            </DetailsSection>
          ) : null}
          {social_media ? (
            <DetailsSection title={'SOCIAL MEDIA'}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {facebook ? <LeftVertValue label={'Facebook'} value={facebook} /> : null}
                {twitter ? <CenteredValue label={'Twitter'} value={twitter} /> : null}
                {instagram ? <CenteredValue label={'Instagram'} value={instagram} />: null}
              </View>
            </DetailsSection>
          ) : null}
          {(!event_day_usage && done.length > 0) ? (
            <DetailsSection title={'EVENT RESULTS'}>
              {done.map((rider, index) => {
                return <RiderSimpleCard
                  key={index.toString()}
                  rider={rider}
                  position={index + 1} />
              })}
            </DetailsSection>
          ) : null}
          {(!event_day_usage && to_run.length > 0) ? (
            <DetailsSection title={'NOT PARTICIPATED'}>
              {to_run.map((rider, index) => {
                return <RiderSimpleCard
                  key={index.toString()}
                  rider={rider}
                  position={index + 1} />
              })}
            </DetailsSection>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  name: {
    paddingHorizontal: 8,
    ...fonts.extralarge,
    flex: 1,
    color: baseColors.medium
  },
  status: {
    paddingHorizontal: 8,
    ...fonts.medium,
    flex: 1,
    color: baseColors.medium
  },
  small_status: {
    paddingHorizontal: 8,
    ...fonts.small,
    flex: 1,
    color: baseColors.medium
  },
  eventDay_header: {
    alignItems: 'center'
  },
  eventDay_name: {
    paddingHorizontal: 8,
    ...fonts.largie,
    flex: 1,
    color: baseColors.medium
  },
  info: {
    padding: 10,
    paddingTop: 20
  },
  entries: {
    padding: 10,
    paddingTop: 20
  },
  headerText: {
    paddingVertical: 10,
    textTransform: 'uppercase',
    color: baseColors.medium
  },
  description: {
    textAlign: 'left', ...fonts.medium,
    color: baseColors.medium
  }
});
