import * as React from 'react';
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'


//Screans
import DetialsScrean from './screans/DetailsScreen';
import HomeScrean from './screans/HomeScreen';
import SettingScrean from './screans/SettingSecreen';
import Station from '../src/component/Station'
import Map from '../src/component/Map'
import Vehicle from '../src/component/Vehicle'

//Screan names
const homeName = 'Vehicle';
const StationName = 'Station';
const MapName = 'Map';

const Tab = createBottomTabNavigator();


export default function MainContianer() {

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === homeName) {
                            iconName = focused ? 'medkit' : 'medkit-outline';
                        } else if (rn === StationName) {
                            iconName = focused ? 'options' : 'options-outline';
                        } else if (rn === MapName) {
                            iconName = focused ? 'map' : 'map-outline';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'red', // set the active tab icon color to red
                    inactiveTintColor: 'gray', // set the inactive tab icon color to gray
                    labelStyle:{fontSize:15 },
                    style: { padding: 10, height: 90, backgroundColor: 'red' }
                }}
                
                >
                <Tab.Screen name={homeName} component={Vehicle} options={{ headerShown: false }} />
                <Tab.Screen name={StationName} component={Station} options={{ headerShown: false }} />
                <Tab.Screen name={MapName} component={Map} options={{ headerShown: false }}/>

            </Tab.Navigator>

        </NavigationContainer>
    );
}