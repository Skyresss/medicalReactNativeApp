import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useTypedSelector} from '../hooks/use-typed-selector';
import {selectListPills} from '../state/reducers/medicalInfoReducer';
import Icon from 'react-native-vector-icons/Ionicons';

const HomePage: React.FC = () => {
  const medicalInfo = useTypedSelector(selectListPills);

  const pillNames = medicalInfo
    .filter(
      el =>
        el.schedule.dayOfWeek.filter(
          (_, index) => index === new Date().getDay(),
        ) !== [] &&
        new Date().getTime() >= new Date(el.schedule.from).getTime() &&
        new Date().getTime() <= new Date(el.schedule.to).getTime(),
    )
    .map(el => el.pillName);
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{`Good morning,\n           Alina`}</Text>

      <View style={styles.cardContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.textContainer}>Notifications</Text>
          <Icon style={styles.bellIcon} name="notifications" size={25} />
        </View>
        <FlatList
          data={pillNames}
          renderItem={({item}) => (
            <Text style={styles.flatListText}>{item}</Text>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bellIcon: {
    paddingTop: 5,
  },
  textContainer: {
    flexDirection: 'row',
    fontSize: 25,
    paddingVertical: 5,
  },
  cardContainer: {
    flexDirection: 'column',
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    width: '100%',
    marginTop: 30,
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    height: 400,
    alignItems: 'center',
  },
  flatListText: {
    fontSize: 20,
    paddingTop: 5,
  },
  wrapper: {
    marginHorizontal: 40,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    borderColor: '#000',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default HomePage;
