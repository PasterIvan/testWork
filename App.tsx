/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {UsersScreen} from './src/Screens/UsersScreen';
import {NavigationContainer} from '@react-navigation/native';
import {RootParamList} from './src/types/navigationType';
import {UserScreen} from './src/Screens/UserScreen';

const Stack = createStackNavigator<RootParamList>();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Users"
          component={UsersScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="User"
          component={UserScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({container: {flex: 1}});
export default App;
