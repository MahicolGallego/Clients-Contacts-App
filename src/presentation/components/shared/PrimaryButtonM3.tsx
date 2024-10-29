import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GlobalStyles} from '../../theme/global.styles';
import {FAB} from 'react-native-paper';
// import Icon from 'react-native-vector-icons/Ionicons';

export const PrimaryButtonM3 = () => {
  const [count, setCount] = useState(0);
  return (
    <View style={GlobalStyles.centerContainer}>
      <Text style={GlobalStyles.title}>{count}</Text>
      {/* <Icon name="add-circle" size={32} color="red" /> */}
      <FAB
        icon="add-circle"
        label="Press me to increase: "
        style={styles.fab}
        onPress={() => setCount(count + 1)}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
