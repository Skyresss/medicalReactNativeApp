import React from 'react';
import HomeScreen from './HomeScreen';
import MedicationScreen from './MedicationScreen';
import CalendarScreen from './CalendarScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CreateMedicationCardScreen from './CreateMedicationCardScreen';
import FullInfoMedicalCard from './FullInfoMedicalCard';
import Icon from 'react-native-vector-icons/Ionicons';
import PillIcon from 'react-native-vector-icons/MaterialCommunityIcons';

interface RootStackParamList {
  MedicationStack: undefined;
  CreateMedicationCardScreen: undefined;
  FullInfoMedicalCard: {pillName: string};
  Home: any;
  Medication: any;
  Calendar: any;
}

interface NavigateProps {
  navigation: any;
}
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const StackNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Medication') {
            iconName = 'pill';
          } else {
            iconName = focused ? 'calendar' : 'calendar-outline';
          }
          if (iconName == 'pill') {
            return <PillIcon name={iconName} size={size} color={color} />;
          } else {
            return <Icon name={iconName} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#0E86D4',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Medication" component={MedicationScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
    </Tab.Navigator>
  );
};

const Navigate: React.FC<NavigateProps> = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MedicationStack"
          component={StackNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateMedicationCardScreen"
          component={CreateMedicationCardScreen}
          options={{title: 'Add Medications'}}
        />
        <Stack.Screen
          name="FullInfoMedicalCard"
          component={FullInfoMedicalCard}
          options={({route: {params}}) => ({title: params!.pillName})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigate;
