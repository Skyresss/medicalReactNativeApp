import React, {useState} from 'react';
import {
  Modal,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import Checkbox from '@react-native-community/checkbox';
import {useDispatch} from 'react-redux';
import {addDayOfTheWeek, daysOfTheWeekType} from '../state';
import {useTypedSelector} from '../hooks/use-typed-selector';

interface DaysOfTheWeekPopupProps {
  isModalVisible: boolean;
  setIsModalVisible: (arg: boolean) => void;
}
const DaysOfTheWeekPopup: React.FC<DaysOfTheWeekPopupProps> = ({
  isModalVisible,
  setIsModalVisible,
}) => {
  const [checkboxValue, setCheckboxValue] = useState(false);
  const daysOfWeek: daysOfTheWeekType[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const dispatch = useDispatch();

  const checkedDays = useTypedSelector(
    state => state.daysOfTheWeek.selectedDays,
  );

  return (
    <View style={styles.centeredView}>
      <TouchableHighlight
        underlayColor="#DDDDDD"
        style={styles.button}
        onPress={() => setIsModalVisible(!isModalVisible)}>
        <Text style={styles.confirmText}>Choose days of the week</Text>
      </TouchableHighlight>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FlatList
              data={daysOfWeek}
              renderItem={({item}) => (
                <View style={styles.flatList}>
                  <Text style={styles.flatListText}>{item}</Text>
                  <Checkbox
                    style={styles.checkbox}
                    disabled={false}
                    value={checkedDays.includes(item)}
                    tintColors={{true: '#0E86D4'}}
                    onValueChange={() => {
                      dispatch(addDayOfTheWeek(item));
                      setCheckboxValue(!checkboxValue);
                    }}
                  />
                </View>
              )}
            />
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              style={styles.button}
              onPress={() => setIsModalVisible(!isModalVisible)}>
              <Text style={styles.textStyle}>Confirm</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  checkbox: {
    marginRight: 5,
  },
  centeredView: {
    marginTop: 22,
  },
  flatList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flatListText: {
    fontSize: 24,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    padding: 10,
    elevation: 2,
    borderRadius: 100,
    backgroundColor: '#0E86D4',
    justifyContent: 'center',
    height: 40,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  confirmText: {
    flexDirection: 'row',
    textAlign: 'center',
    color: 'white',
  },
});
export default DaysOfTheWeekPopup;
