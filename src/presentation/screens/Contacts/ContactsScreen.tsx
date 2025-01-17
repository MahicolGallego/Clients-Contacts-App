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
import {DynamicTextInput} from '../../components/shared/DinamicTextInput';
import {DropdownComponent} from '../../components/shared/Dropdown';
import {DropdownContactTypesForFilter} from '../../../constants/dropdown-data';
import {ContactType} from '../../../interfaces/entities/contact/contact.interfaces';
import {useAuthStore} from '../../../store/auth/authStore';

export const ContactsScreen = () => {
  const {
    contacts,
    filterByText,
    filterByContactType,
    loadContacts,
    removeContact,
    filterContacts,
    setFilterByText,
    setFilterByContactType,
  } = useContactsList();

  const {logout} = useAuthStore();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  useEffect(() => {
    loadContacts();

    const reLoadContacts = navigation.addListener('focus', () => {
      setFilterByText('');
      setFilterByContactType('All');
      loadContacts();
    });

    return reLoadContacts;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  return (
    <>
      <View style={{...GlobalStyles.container, paddingBottom: 70}}>
        {/*search input fields*/}
        <DynamicTextInput
          label="Search Contacts"
          contentValue={filterByText}
          icon="search-outline" // Icono de búsqueda
          placeholder="search..."
          width="100%"
          onChangeText={(value: string) => {
            setFilterByText(value);
            filterContacts(value, filterByContactType);
          }}
        />

        {/*filter dropdown*/}
        <DropdownComponent
          width={'50%'}
          label="Contact type"
          contentValue={filterByContactType}
          iconName="funnel-outline"
          data={DropdownContactTypesForFilter}
          onChange={(value: ContactType | 'All') => {
            setFilterByContactType(value);
            filterContacts(filterByText, value);
          }}
        />
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
              <CardContact
                item={item}
                contactList={[...contacts]}
                removeContact={removeContact}
              />
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
          style={styles.fabAdd}
          onPress={() => navigation.navigate('AddContact')}
        />

        <FAB
          icon="log-out-outline"
          color="white"
          style={styles.fabLogout}
          onPress={() => {
            logout();
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  fabAdd: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 70,
    backgroundColor: Colors.primaryBackground,
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  fabLogout: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: 'red',
  },
});
