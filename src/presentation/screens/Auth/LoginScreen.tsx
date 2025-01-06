import React, {useState} from 'react';
import {Alert, Pressable, ScrollView, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {Colors, GlobalStyles} from '../../theme/global.styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../../../routes/StackNavigator';
import {useAuthStore} from '../../../store/auth/authStore';

export const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  const [isRequesting, setIsRequesting] = useState<boolean>(false);

  const {login} = useAuthStore();

  const [form, setForm] = React.useState({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    setIsRequesting(true);
    if (form.email.length === 0 || form.password.length === 0) {
      setIsRequesting(false);
      return;
    }

    const loginResult = await login(form.email, form.password);
    setIsRequesting(false);

    if (loginResult) {
      return;
    }

    Alert.alert('Error', 'Email or password incorrect');
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
          Login to continue
        </Text>
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
          onPress={handleLogin}>
          <Icon size={28} name="log-in-outline" color="white" />
          <Text style={{...GlobalStyles.title, fontSize: 18}}>Login</Text>
        </Pressable>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text>Do not have an account?</Text>
          <Button
            mode="text"
            onPress={() => {
              navigation.reset({index: 0, routes: [{name: 'Register'}]});
            }}
            textColor={Colors.primary}>
            Sing up
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};
