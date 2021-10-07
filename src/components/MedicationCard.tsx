import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {changeCheckbox} from '../state';
import {useDispatch} from 'react-redux';

interface MedicationCardProps {
  pillName: string;
  time: string;
  checked: boolean;
  navigation: any;
}

const MedicationCard: React.FC<MedicationCardProps> = ({
  pillName,
  time,
  checked,
  navigation,
}) => {
  const dispatch = useDispatch();
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={() => {
        navigation.navigate('FullInfoMedicalCard', {
          pillName,
          time,
        });
      }}>
      <View style={styles.cardContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text} numberOfLines={1}>
            {pillName}
          </Text>
          <Text style={styles.text}>{time}</Text>
        </View>
        <CheckBox
          style={styles.checkbox}
          disabled={false}
          value={checked}
          tintColors={{true: '#0E86D4'}}
          onValueChange={e => {
            dispatch(changeCheckbox(`${pillName}_${time}`));
          }}
        />
      </View>
    </TouchableHighlight>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    height: 100,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flexDirection: 'row',
    marginHorizontal: 18,
    marginVertical: 10,
    width: 250,
  },
  text: {
    marginRight: 10,
    fontSize: 30,
  },
  checkbox: {
    marginRight: 5,
  },
});
export default MedicationCard;
