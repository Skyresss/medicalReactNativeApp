import React, {useMemo} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Card} from 'react-native-paper';
import {useTypedSelector} from '../hooks/use-typed-selector';
import {selectListPills} from '../state';

const dateFromTo = (fromDate: string, toData: string, weekDays: string[]) => {
  let listDate = [];
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  for (
    let q = new Date(fromDate);
    q <= new Date(toData);
    q.setDate(q.getDate() + 1)
  ) {
    let weekDayOfDate = days[q.getDay()];
    if (weekDays.indexOf(weekDayOfDate) !== -1) {
      listDate.push(new Date(q).toISOString().split('T')[0]);
    }
  }
  return listDate;
};
interface CalendarScreenProps {
  navigation: any;
}
const CalendarScreen: React.FC<CalendarScreenProps> = ({navigation}) => {
  const medicationInfo = useTypedSelector(selectListPills);
  const itemsInfo = useMemo(() => {
    let itemsObj: {[key: string]: any} = {};
    medicationInfo.map(pillInfo => {
      if (pillInfo.checked) {
        dateFromTo(
          pillInfo.schedule.from,
          pillInfo.schedule.to,
          pillInfo.schedule.dayOfWeek,
        ).map(day => {
          if (!itemsObj[`${day}`]) {
            itemsObj[`${day}`] = [];
            itemsObj[`${day}`].push({
              name: pillInfo.pillName,
              time: pillInfo.schedule.time,
            });
          } else {
            itemsObj[`${day}`].push({
              name: pillInfo.pillName,
              time: pillInfo.schedule.time,
            });
          }
        });
      }
    });
    return itemsObj;
  }, [medicationInfo]);

  const renderItem = (item: {name: string; time: string}) => {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => {
          navigation.navigate('FullInfoMedicalCard', {
            pillName: item.name,
          });
        }}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.cardText}>{item.name}</Text>
              <Text style={styles.cardText}>{item.time}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={itemsInfo}
        loadItemsForMonth={renderItem}
        selected={'2021-09-03'}
        renderItem={renderItem}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardText: {
    fontSize: 20,
  },
  cardContainer: {
    marginRight: 10,
    marginTop: 30,
  },
});
export default CalendarScreen;
