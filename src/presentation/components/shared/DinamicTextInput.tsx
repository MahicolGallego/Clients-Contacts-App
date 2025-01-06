import React from 'react';
import {TextInput} from 'react-native-paper';
import {Colors, GlobalStyles} from '../../theme/global.styles';
import {DimensionValue} from 'react-native';
import {IconWithAction} from '../../../interfaces/for-components/icon-with-action.interface';

interface DynamicTextInputProps {
  label: string;
  contentValue: string | null;
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
  editable?: boolean;
  icon?: string;
  iconWithAction?: IconWithAction;
  onChangeText?: (value: string) => void;
}

export const DynamicTextInput = ({
  label,
  contentValue,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  width = '100%',
  icon = undefined,
  iconWithAction,
  editable = true,
  onChangeText,
}: DynamicTextInputProps) => {
  return (
    <TextInput
      style={{...GlobalStyles.input, width}}
      textColor={Colors.textPrimary}
      placeholderTextColor={GlobalStyles.placeholderTextColor.color}
      activeOutlineColor={Colors.primary}
      editable={editable}
      label={label}
      placeholder={placeholder}
      value={contentValue ? contentValue : undefined}
      onChangeText={onChangeText}
      mode="outlined"
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      left={icon && <TextInput.Icon icon={icon} color={Colors.primary} />}
      right={
        iconWithAction && (
          <TextInput.Icon
            icon={iconWithAction.icon}
            color={Colors.primary}
            onPress={iconWithAction.action}
          />
        )
      }
    />
  );
};
