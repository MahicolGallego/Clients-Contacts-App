import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StyleSheet, Text, View} from 'react-native';
import {FAB} from 'react-native-paper';
import {RootStackParamsList} from '../../../routes/StackNavigator';
import {Colors, GlobalStyles} from '../../theme/global.styles';
import {useContactsList} from '../../hooks/useContactsList';
import {useEffect} from 'react';
import {SectionList} from 'react-native';
import {TitleSection} from '../../components/Contacts/TitleSection';
import {CardContact} from '../../components/Contacts/CardContact';

export const ContactsScreen = () => {
  const {contacts, loadContacts, removeContact} = useContactsList();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  useEffect(() => {
    loadContacts();

    const reLoadContacts = navigation.addListener('focus', () =>
      loadContacts(),
    );

    return reLoadContacts;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  return (
    <>
      <View style={{...GlobalStyles.container, paddingBottom: 70}}>
        {contacts[0] ? (
          <SectionList
            showsVerticalScrollIndicator={false}
            stickySectionHeadersEnabled
            sections={contacts}
            keyExtractor={item => item.id as string}
            renderSectionHeader={({section}) => (
              <TitleSection title={section.title} />
            )}
            renderItem={({item}) => (
              <CardContact item={item} removeContact={removeContact} />
            )}
          />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{...GlobalStyles.subtitle, fontSize: 28}}>
              Not Contacts
            </Text>
          </View>
        )}
        <FAB
          icon="add-outline"
          color={Colors.primary}
          style={styles.fab}
          onPress={() => navigation.navigate('AddContact')}
        />
        {/* <FAB
          label="Press me to navigate to contact datails screen"
          onPress={() =>
            navigation.navigate('ContactDetails', {contact_id: '1'})
          }
        /> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.primaryBackground,
    borderColor: Colors.primary,
    borderWidth: 2,
  },
});
