import React, {Dispatch, SetStateAction} from 'react';
import {TextInput} from 'react-native-paper';
import {Colors, GlobalStyles} from '../../theme/global.styles';
import {DimensionValue} from 'react-native';

interface DynamicTextInputSaveDataOnBlurProps {
  label: string;
  valueToInput: string;
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
  onChangeText: (
    value: any,
    setDataFunction?: Dispatch<SetStateAction<any>>,
  ) => void;
  onBlurFunction: (value: string) => void;
}

export const DynamicTextInputSaveDataOnBlur = ({
  label,
  valueToInput,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  width = '100%',
  icon = undefined,
  onBlurFunction,
  onChangeText,
}: DynamicTextInputSaveDataOnBlurProps) => {
  return (
    <TextInput
      style={{...GlobalStyles.input, width}}
      textColor={Colors.textPrimary}
      placeholderTextColor={GlobalStyles.placeholderTextColor.color}
      activeOutlineColor={Colors.primary}
      label={label}
      placeholder={placeholder}
      value={valueToInput}
      // onChangeText updates the ref with the latest value without re-rendering the component
      onChangeText={value => onChangeText(value)}
      // onBlur triggers the onBlur prop function with the current value in the ref
      onBlur={() => onBlurFunction(valueToInput)}
      mode="outlined"
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      // Optional icons: left icon and right icon with action, if provided
      left={icon && <TextInput.Icon icon={icon} color={Colors.primary} />}
    />
  );
};
