/* eslint-disable no-trailing-spaces */

// import {useState} from 'react';
import {
  //GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';

// interface PrimaryButtonProps {
//   OnPress?: (event: GestureResponderEvent) => void;
//   OnLongPress?: (event: GestureResponderEvent) => void;
// }

// interface PrimaryButtonProps {
//   label: string;
//   OnPress?: (event: GestureResponderEvent) => void;
//   OnLongPress?: (event: GestureResponderEvent) => void;
// }

interface PrimaryButtonProps {
  label: string;
  OnPress?: () => void;
  OnLongPress?: () => void;
}

export const PrimaryButton = ({
  label,
  OnPress,
  OnLongPress,
}: PrimaryButtonProps) => {
  return (
    <Pressable
      style={({pressed}) => [styles.button, pressed && styles.buttonPressed]}
      onPress={() => OnPress && OnPress()}
      onLongPress={OnLongPress ? OnLongPress : null}>
      <Text style={styles.title}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 300,
    backgroundColor: '#ff3333',
    padding: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  buttonPressed: {
    backgroundColor: '#ff6666',
  },
});
