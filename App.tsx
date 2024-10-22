/* eslint-disable react-native/no-inline-styles */
import {Alert, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PrimaryButton, PrimaryButtonM3} from './src/presentation/components';
import {Button, PaperProvider} from 'react-native-paper';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import {DynamicTextInput} from './src/presentation/components/shared/InputText';

export const App = () => {
  return (
    <>
      {/*Se envuelve la app en providers para proveer informacion relevante desde componentes
      personalizados como gestores de estado, elementos que comparten infromacion a lo largo
      de todo su arbol de componentes o el context de la aplicacion, etc... y permite la
      interaccion con estos*/}
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
          }}>
          <Text>Hello, World!</Text>
          <Text>This is a React Native App.</Text>
          <Text>Version 1.0.0</Text>
          {/* <PrimaryButton
            label="Check the Press Types"
            OnPress={() => Alert.alert('Hi by onPress assigned by the user')}
            OnLongPress={() =>
              Alert.alert('hi by onLongPress assigned by the user')
            }
          /> */}
          <Button
            mode="contained-tonal"
            dark={true}
            textColor="#ffffff"
            buttonColor="#dc3eff"
            onPress={() => Alert.alert('Hi by onPress assigned by the user')}
            onLongPress={() =>
              Alert.alert('hi by onLongPress assigned by the user')
            }>
            Check the Press Types
          </Button>
          <PrimaryButtonM3 />
          <>
            <DynamicTextInput
              label="Email"
              placeholder="your email address..."
              keyboardType="email-address"
            />
            <DynamicTextInput
              label="Phone"
              placeholder="your phone number..."
              keyboardType="phone-pad"
              icon="add-outline"
            />
            <DynamicTextInput
              label="Password"
              placeholder="your password..."
              secureTextEntry={true}
              icon="add-outline"
            />
            <DynamicTextInput
              label="Number"
              placeholder="your number..."
              keyboardType="numeric"
              icon="add-outline"
            />
          </>
        </SafeAreaView>
      </PaperProvider>
    </>
  );
};
