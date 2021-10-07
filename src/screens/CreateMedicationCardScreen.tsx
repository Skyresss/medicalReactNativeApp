import React, {useState} from 'react';
import {Input} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {StyleSheet, TouchableHighlight, View, Text} from 'react-native';
import DaysOfTheWeek from '../components/DaysOfTheWeekPopup';
import {addOrEditMedication} from '../state';
import {useTypedSelector} from '../hooks/use-typed-selector';
import CustomDatePicker from '../components/CustomDatePicker';

interface CreateMedicationCardScreenProps {
  navigation: any;
}
const CreateMedicationCardScreen: React.FC<CreateMedicationCardScreenProps> = ({
  navigation,
}) => {
  const [pillNameTextInput, setPillNameTextInput] = useState('');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [timePicker, setTimePicker] = useState(false);
  const [toDatePicker, setToDatePicker] = useState(false);
  const [fromDatePicker, setFromDatePicker] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const selectedDays = useTypedSelector(
    state => state.daysOfTheWeek.selectedDays,
  );

  return (
    <View style={styles.container}>
      <View>
        <Input
          selectionColor="#0E86D4"
          style={styles.textInput}
          placeholder={'Enter the name of the medicine'}
          onChangeText={pillNameTextInput =>
            setPillNameTextInput(pillNameTextInput)
          }
        />
        <CustomDatePicker
          mode="time"
          date={time}
          setDate={setTime}
          datePicker={timePicker}
          setDatePicker={setTimePicker}
          title={'Time'}
        />
        <CustomDatePicker
          mode="date"
          date={fromDate}
          setDate={setFromDate}
          datePicker={fromDatePicker}
          setDatePicker={setFromDatePicker}
          title={'From'}
        />
        <CustomDatePicker
          mode="date"
          date={toDate}
          setDate={setToDate}
          datePicker={toDatePicker}
          setDatePicker={setToDatePicker}
          title={'To'}
        />
        <DaysOfTheWeek
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      </View>
      <TouchableHighlight
        underlayColor="#DDDDDD"
        style={styles.confirmButton}
        onPress={() => {
          {
            dispatch(
              addOrEditMedication({
                pillName: pillNameTextInput,
                schedule: {
                  from: fromDate.toDateString(),
                  to: toDate.toDateString(),
                  dayOfWeek: selectedDays,
                  time: time
                    .toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                    .split('')
                    .slice(0, 5)
                    .join(''),
                },
                checked: true,
              }),
            );
            navigation.navigate('Medication');
          }
        }}>
        <Text style={styles.confirmText}>Confirm</Text>
      </TouchableHighlight>
    </View>
  );
};
const styles = StyleSheet.create({
  confirmText: {
    flexDirection: 'row',
    textAlign: 'center',
    color: 'white',
  },
  confirmButton: {
    borderRadius: 100,
    backgroundColor: '#0E86D4',
    justifyContent: 'center',
    height: 40,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 40,
    marginVertical: 20,
    justifyContent: 'space-between',
  },
  textInput: {
    height: 60,
    fontSize: 20,
  },
});
export default CreateMedicationCardScreen;
