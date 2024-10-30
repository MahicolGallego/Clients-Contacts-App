import React from 'react';
import {TextInput} from 'react-native-paper';
import {Colors, GlobalStyles} from '../../theme/global.styles';
import {DimensionValue} from 'react-native';

interface DynamicTextInputProps {
  label: string;
  contentValue: string;
  editable?: boolean;
  placeholder?: string;
  width?: DimensionValue;
  activeOutlineColor?: string;
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
  iconWithAction?: IconsWithAction;
  onChangeText?: (value: string) => void;
}

interface IconsWithAction {
  icon: string;
  action: () => void;
}

export const DynamicTextInput = ({
  label,
  contentValue,
  placeholder,
  editable = true,
  keyboardType = 'default',
  secureTextEntry = false,
  width = '100%',
  icon = undefined,
  iconWithAction,
  onChangeText,
}: DynamicTextInputProps) => {
  return (
    <TextInput
      style={{...GlobalStyles.input, width}}
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
      editable={editable}
      left={icon && <TextInput.Icon icon={icon} color={Colors.primary} />}
      right={
        iconWithAction && (
          <TextInput.Icon
            icon={iconWithAction.icon}
            color={Colors.primary}
            onPress={iconWithAction.action}
          />
        )

        // iconsWithAction.length > 0 ? (
        //   <IconsWithActionContainer iconsWithActions={iconsWithAction} />
        // ) : undefined
      }
    />
  );
};

{
  /*este componente puede generar errores, ya que la idea es renderizar inputs, y que esos inputs a un lado derecho tengan funcionalidades, pero segun lo que tu planteas, esta mal por que los indices se repetiran en cada input, o el funciona bien solo con que el input sea diferente su key? o como funciona esto en formularios */
}
