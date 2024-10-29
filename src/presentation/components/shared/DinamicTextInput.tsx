import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {Colors, GlobalStyles} from '../../theme/global.styles';
import {View} from 'react-native';

interface DynamicTextInputProps {
  label: string;
  contentValue: string;
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
  icon?: string;
  iconsWithAction?: IconsWithAction[];
  onChangeText?: (value: string) => void;
}

interface IconsWithAction {
  icon: string;
  action: () => void;
}

const IconsWithActionContainer = ({
  iconsWithActions,
}: {
  iconsWithActions: IconsWithAction[];
}) => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flexDirection: 'row', gap: 10}}>
      {iconsWithActions.map(icon => {
        return <TextInput.Icon icon={icon.icon} onPress={icon.action} />;
      })}
    </View>
  );
};

export const DynamicTextInput = ({
  label,
  contentValue,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  icon = undefined,
  iconsWithAction = [],
  onChangeText,
}: DynamicTextInputProps) => {
  return (
    <TextInput
      style={GlobalStyles.input}
      textColor={Colors.textPrimary}
      placeholderTextColor={GlobalStyles.placeholderTextColor.color}
      activeOutlineColor={Colors.primary}
      label={label}
      placeholder={placeholder}
      value={contentValue}
      onChangeText={onChangeText}
      mode="outlined"
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      left={icon && <TextInput.Icon icon={icon} color={Colors.primary} />}
      right={
        iconsWithAction.length > 0 ? (
          <IconsWithActionContainer iconsWithActions={iconsWithAction} />
        ) : undefined
      }
    />
  );
};

{
  /*este componente puede generar errores, ya que la idea es renderizar inputs, y que esos inputs a un lado derecho tengan funcionalidades, pero segun lo que tu planteas, esta mal por que los indices se repetiran en cada input, o el funciona bien solo con que el input sea diferente su key? o como funciona esto en formularios */
}
