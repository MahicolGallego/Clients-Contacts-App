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

  title: {
    color: Colors.textPrimary,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 15,
  },

  subtitle: {
    color: Colors.textSecondary,
    fontSize: 16,
    fontWeight: '600',
  },

  input: {
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

  pressableCircle: {
    borderRadius: 100,
    width: 200,
    height: 200,
  },

  modalContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },

  modalButton: {
    width: '40%',
    alignSelf: 'flex-end',
  },

  fabDelete: {
    position: 'absolute',
    margin: 8,
    right: 0,
    bottom: 0,
    width: 40,
    height: 40,
    backgroundColor: Colors.secondaryBackground,
    borderColor: Colors.border,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  locationContainer: {
    width: '100%',
    marginTop: 20,
    borderRadius: 10,
    height: 300,
  },

  deleteLocationButton: {
    width: '100%',
    marginTop: 15,
    backgroundColor: '#f50606',
  },

  weatherContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: Colors.secondaryBackground,
    borderRadius: 10,
    width: '100%',
    borderColor: Colors.border,
    borderWidth: 1,
  },

  weatherType: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.textSecondary,
    marginBottom: 5,
  },

  weatherDescription: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 5,
  },

  weatherTemperature: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 10,
  },

  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 10,
  },
});
