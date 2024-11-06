import React, {useState} from 'react';
import {DimensionValue, StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../theme/global.styles';

interface DropdownComponentProps {
  data: Array<{label: string; value: string}>; // Data to dropdown
  iconName: string;
  onChange: (value: any) => void; // function to active when the dropdown changes
  label?: string;
  width?: DimensionValue;
  contentValue: string;
}

export const DropdownComponent = ({
  data,
  label,
  iconName,
  width,
  contentValue,
  onChange,
}: DropdownComponentProps) => {
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = (labelToRender: string | undefined) => {
    if (labelToRender) {
      return (
        <Text style={[styles.label, isFocus && {color: Colors.primary}]}>
          {labelToRender}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, width ? {width} : {width: '100%'}]}>
      {renderLabel(label)}
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: Colors.primary}]}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        itemContainerStyle={styles.itemContainerStyle}
        containerStyle={styles.containerStyle}
        itemTextStyle={styles.itemTextStyle}
        showsVerticalScrollIndicator={false}
        activeColor={Colors.primary}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        value={contentValue}
        onFocus={() => setIsFocus(!isFocus)}
        onBlur={() => setIsFocus(!isFocus)}
        onChange={item => {
          console.log(contentValue);
          setIsFocus(!isFocus);
          onChange(item.value);
        }}
        renderLeftIcon={() => (
          <Icon
            style={styles.icon}
            color={Colors.primary}
            name={iconName}
            size={20}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  dropdown: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginLeft: 10,
    marginRight: 20,
  },
  label: {
    position: 'absolute',
    backgroundColor: Colors.primaryBackground,
    left: 22,
    top: -10,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  itemContainerStyle: {
    backgroundColor: Colors.primaryBackground,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  itemTextStyle: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  containerStyle: {
    backgroundColor: Colors.primaryBackground,
    borderWidth: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 8,
    borderColor: Colors.border,
  },
});
