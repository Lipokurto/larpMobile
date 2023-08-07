import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ToastProvider } from 'react-native-toast-notifications';

import Main from './pages/main/main';
import MyHits from './pages/my-hits/my-hits';
import MyBuild from './pages/my-build/my-build';
import MySchemes from './pages/my-build/my-schemes/my-schemes';

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

          <Stack.Screen
            name="MyBuild"
            component={MyBuild}
            options={{
              title: 'Мой строяк',
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

          <Stack.Screen
            name="MySchemes"
            component={MySchemes}
            options={{
              title: 'Мои чертежи',
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
