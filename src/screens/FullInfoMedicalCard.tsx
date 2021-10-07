import React, {useState} from 'react';
import {View, StyleSheet, TouchableHighlight, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import DetailedMedicationCard from '../components/DetailedMedicationCard';
import {deleteMedication} from '../state';
import {addOrEditMedication} from '../state';
import {useTypedSelector} from '../hooks/use-typed-selector';
import {selectListPills} from '../state/reducers/medicalInfoReducer';
interface FullInfoMedicalCardProps {
  navigation: any;
  route: any;
}
const FullInfoMedicalCard: React.FC<FullInfoMedicalCardProps> = ({
  navigation,
  route,
}) => {
  const {pillName, time} = route.params;
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const medicalInfo = useTypedSelector(selectListPills);

  const detailedMedicalInfo = medicalInfo.find(
    card => card.pillName === pillName,
  );
  const selectedDays = useTypedSelector(
    state => state.daysOfTheWeek.selectedDays,
  );
  const [fromDate, setFromDate] = useState(
    new Date(detailedMedicalInfo!.schedule!.from),
  );
  const [toDate, setToDate] = useState(
    new Date(detailedMedicalInfo!.schedule!.to),
  );

  const [datePickerTime, setDatePickerTime] = useState(
    new Date(
      new Date().setHours(
        Number(
          detailedMedicalInfo!.schedule!.time.split('').slice(0, 2).join(''),
        ),
        Number(
          detailedMedicalInfo!.schedule!.time.split('').slice(3, 5).join(''),
        ),
        0,
      ),
    ),
  );

  return (
    <View style={styles.container}>
      <View>
        <DetailedMedicationCard
          editing={editing}
          setEditing={setEditing}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          datePickerTime={datePickerTime}
          setDatePickerTime={setDatePickerTime}
          schedule={detailedMedicalInfo!.schedule}
        />
        {!editing && (
          <TouchableHighlight
            underlayColor="#DDDDDD"
            style={styles.editButton}
            onPress={() => {
              setEditing(!editing);
            }}>
            <Text style={styles.buttonsText}>Edit </Text>
          </TouchableHighlight>
        )}
        {editing && (
          <View>
            <TouchableHighlight
              underlayColor="#DDDDDD"
              style={styles.saveButton}
              onPress={() => {
                {
                  setEditing(!editing);
                  dispatch(
                    addOrEditMedication({
                      pillName: detailedMedicalInfo!.pillName,
                      schedule: {
                        from: fromDate.toISOString().split('T')[0],
                        to: toDate.toISOString().split('T')[0],
                        dayOfWeek: selectedDays,
                        time: datePickerTime
                          .toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                          .split('')
                          .slice(0, 5)
                          .join(''),
                      },
                      prevTime: detailedMedicalInfo!.schedule.time,
                      checked: true,
                    }),
                  );
                  navigation.navigate('Medication');
                }
              }}>
              <Text style={styles.buttonsText}>Save </Text>
            </TouchableHighlight>
          </View>
        )}
      </View>
      <TouchableHighlight
        underlayColor="#DDDDDD"
        style={styles.deleteButton}
        onPress={() => {
          navigation.navigate('Medication');
          dispatch(deleteMedication(`${pillName}_${time}`));
        }}>
        <Text style={styles.buttonsText}>Delete </Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  saveButton: {
    borderRadius: 100,
    backgroundColor: '#0E86D4',
    justifyContent: 'center',
    height: 40,
    marginTop: 20,
  },
  deleteButton: {
    borderRadius: 100,
    backgroundColor: '#f44336',
    justifyContent: 'center',
    height: 40,
  },
  editButton: {
    borderRadius: 100,
    backgroundColor: '#0E86D4',
    justifyContent: 'center',
    height: 40,
  },
  buttonsText: {
    flexDirection: 'row',
    textAlign: 'center',
    color: 'white',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 40,
    marginVertical: 20,
    justifyContent: 'space-between',
  },
});
export default FullInfoMedicalCard;
