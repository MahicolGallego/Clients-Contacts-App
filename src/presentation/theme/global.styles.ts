import {StyleSheet} from 'react-native';

export const Colors = {
  primaryBackground: '#121212',
  secondaryBackground: '#1E1E1E',
  primary: '#1E90FF',
  secondary: '#00ADEF',
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0A0',
  placeholder: '#6E6E6E',
  border: '#303030',
};

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
    paddingHorizontal: 20,
    paddingVertical: 30,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 15,
  },

  headerText: {
    color: Colors.textPrimary,
    fontSize: 24,
    fontWeight: 'bold',
  },

  subheaderText: {
    color: Colors.textSecondary,
    fontSize: 18,
    fontWeight: '600',
  },

  input: {
    width: '100%',
    backgroundColor: Colors.secondaryBackground,
    borderColor: Colors.border,
    borderRadius: 8,
    fontSize: 16,
  },

  placeholderTextColor: {color: Colors.placeholder},

  buttonPrimary: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonPrimaryText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },

  buttonSecondary: {
    backgroundColor: Colors.secondaryBackground,
    borderColor: Colors.secondary,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonSecondaryText: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: 'bold',
  },

  iconPrimary: {
    color: Colors.primary,
    fontSize: 24,
  },

  iconSecondary: {
    color: Colors.secondary,
    fontSize: 24,
  },

  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 10,
  },
});
