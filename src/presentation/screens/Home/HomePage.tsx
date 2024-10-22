import {Text, View} from 'react-native';
import {FAB} from 'react-native-paper';

export const HomePage = () => {
  return (
    <>
      <View>
        <Text>Hi from Home Page</Text>
      </View>
      <FAB
        label="Press me to navigate to add contact page"
        onPress={() => {}}
      />
      <FAB
        label="Press me to navigate to contact datails page"
        onPress={() => {}}
      />
    </>
  );
};
