/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React from 'react';
import {Alert, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  //PrimaryButton,
  PrimaryButtonM3,
} from './src/presentation/components';
import {Button, PaperProvider} from 'react-native-paper';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import {DynamicTextInput} from './src/presentation/components/shared/DinamicTextInput';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './src/routes/StackNavigator';
import {Colors} from './src/presentation/theme/global.styles';
import {PermissionsChecker} from './src/providers/PermissionsChecker';

export const App = () => {
  return (
    <>
      {/*Navigation provee de mucha info sobre la navegacion, estados, metodos */}
      <NavigationContainer>
        {/*Se envuelve la app en providers para proveer informacion relevante desde componentes
      personalizados como gestores de estado, elementos que comparten infromacion a lo largo
      de todo su arbol de componentes o el context de la aplicacion, etc... y permite la
      interaccion con estos*/}
        <PermissionsChecker>
          <PaperProvider
            settings={{
              // eslint-disable-next-line react/no-unstable-nested-components
              icon: props => <IonicIcon {...props} />,
            }}>
            {/*Provee informacion sobre el tema, textos, colores y nos permite personalizar
        todos los elementos que vengan del mismo*/}
            <SafeAreaView
              style={{
                flex: 1,
                gap: 10,
                backgroundColor: Colors.primaryBackground,
              }}>
              <StackNavigator />
            </SafeAreaView>
          </PaperProvider>
        </PermissionsChecker>
      </NavigationContainer>
    </>
  );
};
