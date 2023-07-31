import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './pages/main/main';
import MyHits from './pages/my-hits/my-hits';

const Stack = createStackNavigator();

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            title: 'Главная',
            headerStyle: { backgroundColor: 'red', height: 80 },
            headerTitleAlign: 'center',
            headerTitleStyle: { color: 'white' },
          }}
        />

        <Stack.Screen
          name="MyHits"
          component={MyHits}
          options={{
            title: 'Мои хиты',
            headerStyle: { backgroundColor: 'red', height: 80 },
            headerTitleAlign: 'center',
            headerTitleStyle: { color: 'white' },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
