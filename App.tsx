import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/main/main';
import MyHits from './pages/my-hits/my-hits';
import { ToastProvider } from 'react-native-toast-notifications';

const Stack = createStackNavigator();

export default function App(): JSX.Element {
  return (
    <ToastProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              title: 'Главная',
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="MyHits"
            component={MyHits}
            options={{
              title: 'Мои хиты',
              cardShadowEnabled: true,
              animationEnabled: true,
              headerStyle: {
                backgroundColor: '#000000',
                elevation: 1,
                height: 35,
              },
              headerTitleAlign: 'center',
              headerTitleStyle: {
                color: '#ffffff',
                fontFamily: 'mr_ReaverockG',
              },
              headerTintColor: '#ffffff',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
}
