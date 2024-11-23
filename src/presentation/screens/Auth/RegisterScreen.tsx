import React, {useState} from 'react';
import {Alert, Pressable, ScrollView, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {GlobalStyles} from '../../theme/global.styles';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../../../routes/StackNavigator';
import {useAuthStore} from '../../../store/auth/authStore';

export const RegisterScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  const [isRequesting, setIsRequesting] = useState<boolean>(false);

  const {register} = useAuthStore();

  const [form, setForm] = React.useState({
    name: '',
    email: '',
    password: '',
  });

  const handleRegister = async () => {
    setIsRequesting(true);
    if (
      form.email.length === 0 ||
      form.email.length === 0 ||
      form.password.length === 0
    ) {
      setIsRequesting(false);
      return;
    }

    const registerResult = await register(form.name, form.email, form.password);
    setIsRequesting(false);

    if (registerResult) {
      return;
    }

    Alert.alert('Error', 'incorrect values for registration form');
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
        }}>
        <Text style={{fontSize: 24, color: Colors.primary, fontWeight: 'bold'}}>
          Close To You
        </Text>
        <Text
          style={{
            fontSize: 24,
            color: Colors.textSecondary,
            fontWeight: 'black',
          }}>
          Create account
        </Text>
        <TextInput
          style={{width: '80%'}}
          placeholderTextColor={GlobalStyles.placeholderTextColor.color}
          activeOutlineColor={Colors.primary}
          label={'Name'}
          placeholder={'name...'}
          value={form.name}
          onChangeText={(name: string) => setForm({...form, name})}
          mode="outlined"
          left={<TextInput.Icon icon="person-outline" color={Colors.primary} />}
        />
        <TextInput
          style={{width: '80%'}}
          placeholderTextColor={GlobalStyles.placeholderTextColor.color}
          activeOutlineColor={Colors.primary}
          label={'Email'}
          placeholder={'email...'}
          value={form.email}
          onChangeText={(email: string) => setForm({...form, email})}
          keyboardType="email-address"
          mode="outlined"
          left={<TextInput.Icon icon="mail-outline" color={Colors.primary} />}
        />
        <TextInput
          style={{width: '80%'}}
          placeholderTextColor={GlobalStyles.placeholderTextColor.color}
          activeOutlineColor={Colors.primary}
          label={'Password'}
          placeholder={'password...'}
          value={form.password}
          onChangeText={(password: string) => setForm({...form, password})}
          mode="outlined"
          secureTextEntry={true}
          left={
            <TextInput.Icon icon="lock-closed-outline" color={Colors.primary} />
          }
        />

        <Pressable
          style={({pressed}) => [
            {
              ...GlobalStyles.buttonPrimary,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
              width: '80%',
              marginTop: 10,
              padding: 0,
            },
            pressed && {opacity: 0.9},
          ]}
          disabled={isRequesting}
          onPress={handleRegister}>
          <Icon size={24} name="person" color="white" />
          <Text style={{...GlobalStyles.title, fontSize: 18}}>Sign up</Text>
        </Pressable>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text>Already have an account?</Text>
          <Button
            mode="text"
            onPress={() => {
              navigation.reset({index: 0, routes: [{name: 'Login'}]});
            }}
            textColor={Colors.primary}>
            Login
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};
