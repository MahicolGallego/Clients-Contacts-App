import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {GlobalStyles} from '../../theme/global.styles';
import {View} from 'react-native';

interface DynamicTextInputProps {
  label: string;
  placeholder: string;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'decimal-pad'
    | 'ascii-capable'
    | 'visible-password';
  secureTextEntry?: boolean;
  icons?: IconsWithAction[];
}

interface IconsWithAction {
  icon: string;
  action: () => void;
}

const IconContainer = ({icons}: {icons: IconsWithAction[]}) => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flexDirection: 'row', gap: 10}}>
      {icons?.map((icon, index) => {
        return (
          <TextInput.Icon
            key={index}
            icon={icon.icon && icon.icon}
            onPress={icon.action ? icon.action : undefined}
          />
        );
      })}
    </View>
  );
};

export const DynamicTextInput = ({
  label,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  icons = [],
}: DynamicTextInputProps) => {
  const [contentValue, setContentValue] = useState<string>('');
  return (
    <TextInput
      style={GlobalStyles.input}
      label={label}
      placeholder={placeholder}
      value={contentValue}
      onChangeText={setContentValue}
      mode="outlined"
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      left={icons.length > 0 ? <IconContainer icons={icons} /> : undefined}
    />
  );
};

{
  /*este componente puede generar errores, ya que la idea es renderizar inputs, y que esos inputs a un lado derecho tengan funcionalidades, pero segun lo que tu planteas, esta mal por que los indices se repetiran en cada input, o el funciona bien solo con que el input sea diferente su key? o como funciona esto en formularios */
}
