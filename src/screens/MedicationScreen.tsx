import React from 'react';
import {View, FlatList, StyleSheet, TouchableHighlight} from 'react-native';
import {useTypedSelector} from '../hooks/use-typed-selector';
import MedicationCard from '../components/MedicationCard';
import {selectListPills} from '../state';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {reset} from '../state';

interface MedicationPageProps {
  navigation: any;
}

const MedicationPage: React.FC<MedicationPageProps> = ({navigation}) => {
  const medicalMedicalInfoList = useTypedSelector(selectListPills);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <FlatList
        data={medicalMedicalInfoList}
        renderItem={({item}) => (
          <MedicationCard
            pillName={item.pillName}
            time={item.schedule.time}
            checked={item.checked}
            navigation={navigation}
          />
        )}
        keyExtractor={item => `${item.pillName}_${item.schedule.time}`}
      />
      <TouchableHighlight
        onPress={() => {
          dispatch(reset());
          navigation.navigate('CreateMedicationCardScreen');
        }}>
        <Icon style={styles.icon} size={50} name="pluscircle" color="#0E86D4" />
      </TouchableHighlight>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    right: 5,
    bottom: 5,
  },
});
export default MedicationPage;
