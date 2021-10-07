import React from 'react';
import ArrowIcon from 'react-native-vector-icons/MaterialIcons';
import {Input} from 'react-native-elements';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
interface CustomDatePickerProps {
  date: Date;
  setDate: (arg: Date) => void;
  datePicker: boolean;
  setDatePicker: (arg: boolean) => void;
  title: string;
  mode: 'date' | 'time';
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  date,
  setDate,
  datePicker,
  setDatePicker,
  mode,
  title,
}) => {
  return (
    <View>
      <TouchableOpacity onPress={() => setDatePicker(true)}>
        <View style={styles.textInputContainer}>
          <Input
            style={styles.textInput}
            editable={false}
            value={
              mode === 'date' && title === 'From'
                ? 'From: ' + date.toDateString()
                : mode === 'date' && title === 'To'
                ? 'To: ' + date.toDateString()
                : 'Time: ' +
                  date
                    .toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                    .split('')
                    .slice(0, 5)
                    .join('')
            }
            rightIcon={<ArrowIcon name="keyboard-arrow-down" size={25} />}
          />
        </View>
      </TouchableOpacity>
      <DatePicker
        mode={mode}
        modal
        onDateChange={() => {}}
        open={datePicker}
        date={date}
        onConfirm={date => {
          setDatePicker(false);
          setDate(date);
        }}
        onCancel={() => {
          setDatePicker(false);
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  textInputContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: 20,
  },
  textInput: {
    color: '#979797',
    fontSize: 24,
    width: '100%',
    marginTop: 10,
  },
});
export default CustomDatePicker;
