import React, {useMemo, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import ClockIcon from 'react-native-vector-icons/AntDesign';
import CalendarIcon from 'react-native-vector-icons/FontAwesome';
import CustomDatePicker from './CustomDatePicker';
import DaysOfTheWeekPopup from './DaysOfTheWeekPopup';
interface DetailedMedicationCardProps {
  editing: boolean;
  setEditing: (arg: boolean) => void;
  fromDate: Date;
  setFromDate: (arg: Date) => void;
  toDate: Date;
  setToDate: (arg: Date) => void;
  datePickerTime: Date;
  setDatePickerTime: (arg: Date) => void;
  schedule: {
    from: string;
    to: string;
    time: string;
    dayOfWeek: string[] | [];
  };
}

const DetailedMedicationCard: React.FC<DetailedMedicationCardProps> = ({
  editing,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  datePickerTime,
  setDatePickerTime,
  schedule,
}) => {
  const [timePicker, setTimePicker] = useState(false);
  const [toDatePicker, setToDatePicker] = useState(false);
  const [fromDatePicker, setFromDatePicker] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dayOfWeek = useMemo(
    () => (schedule.dayOfWeek.length > 0 ? schedule.dayOfWeek : null),
    [schedule],
  );
  return (
    <View>
      {editing && (
        <View>
          <View style={styles.container}>
            <ClockIcon name="clockcircleo" style={styles.clockIcon} />
            <CustomDatePicker
              mode="time"
              date={datePickerTime}
              setDate={setDatePickerTime}
              datePicker={timePicker}
              setDatePicker={setTimePicker}
              title={'Time'}
            />
          </View>
          <View style={styles.container}>
            <CalendarIcon name="calendar-o" style={styles.clockIcon} />
            <CustomDatePicker
              mode="date"
              date={fromDate}
              setDate={setFromDate}
              datePicker={fromDatePicker}
              setDatePicker={setFromDatePicker}
              title={'From'}
            />
          </View>
          <View style={styles.container}>
            <CalendarIcon name="calendar-o" style={styles.clockIcon} />
            <CustomDatePicker
              mode="date"
              date={toDate}
              setDate={setToDate}
              datePicker={toDatePicker}
              setDatePicker={setToDatePicker}
              title={'To'}
            />
          </View>
          <DaysOfTheWeekPopup
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
          />
        </View>
      )}

      {!editing && (
        <View>
          <View style={styles.container}>
            <ClockIcon name="clockcircleo" style={styles.clockIcon} />
            <Text style={styles.text}>Time: {schedule!.time} </Text>
          </View>
          <View style={styles.container}>
            <CalendarIcon name="calendar-o" style={styles.clockIcon} />
            <Text style={styles.text}>From: {schedule!.from}</Text>
          </View>
          <View style={styles.container}>
            <CalendarIcon name="calendar-o" style={styles.clockIcon} />
            <Text style={styles.text}>To: {schedule!.to}</Text>
          </View>
          <View style={styles.dayOfTheWeekContainer}>
            <Text
              style={
                dayOfWeek && dayOfWeek.includes('Monday')
                  ? [styles.selected, styles.dayOfTheWeekText]
                  : [styles.notSelected, styles.dayOfTheWeekText]
              }>
              Mon
            </Text>
            <Text
              style={
                dayOfWeek && dayOfWeek.includes('Tuesday')
                  ? [styles.selected, styles.dayOfTheWeekText]
                  : [styles.notSelected, styles.dayOfTheWeekText]
              }>
              Tue
            </Text>
            <Text
              style={
                dayOfWeek && dayOfWeek.includes('Wednesday')
                  ? [styles.selected, styles.dayOfTheWeekText]
                  : [styles.notSelected, styles.dayOfTheWeekText]
              }>
              Wed
            </Text>
            <Text
              style={
                dayOfWeek && dayOfWeek.includes('Thursday')
                  ? [styles.selected, styles.dayOfTheWeekText]
                  : [styles.notSelected, styles.dayOfTheWeekText]
              }>
              Thu
            </Text>
            <Text
              style={
                dayOfWeek && dayOfWeek.includes('Friday')
                  ? [styles.selected, styles.dayOfTheWeekText]
                  : [styles.notSelected, styles.dayOfTheWeekText]
              }>
              Fri
            </Text>
            <Text
              style={
                dayOfWeek && dayOfWeek.includes('Saturday')
                  ? [styles.selected, styles.dayOfTheWeekText]
                  : [styles.notSelected, styles.dayOfTheWeekText]
              }>
              Sat
            </Text>
            <Text
              style={
                dayOfWeek && dayOfWeek.includes('Sunday')
                  ? [styles.selected, styles.dayOfTheWeekText]
                  : [styles.notSelected, styles.dayOfTheWeekText]
              }>
              Sun
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  selected: {
    backgroundColor: 'rgba(197,197,197,0.4)',
    fontWeight: 'bold',
  },
  notSelected: {
    backgroundColor: 'white',
  },
  dayOfTheWeekText: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    fontSize: 20,
    color: '#0E86D4',
  },
  dayOfTheWeekContainer: {
    width: '98%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 1,
  },
  container: {
    width: 310,
    height: 100,
    flexDirection: 'row',

    alignItems: 'center',
  },
  clockIcon: {
    marginRight: 10,
    paddingTop: 10,
    fontSize: 24,
  },
  text: {
    color: '#979797',
    fontSize: 24,
    width: '100%',
    marginTop: 10,
  },
});
export default DetailedMedicationCard;
