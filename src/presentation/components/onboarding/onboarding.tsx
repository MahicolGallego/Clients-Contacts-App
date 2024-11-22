import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import OnboardingSwiper from 'react-native-onboarding-swiper';

export const Onboarding = () => {
  const [isVisible, setIsVisible] = useState(true);
  const handleVisibility = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <OnboardingSwiper
        containerStyles={{paddingHorizontal: 15}}
        imageContainerStyles={styles.onboardingImage}
        onSkip={handleVisibility}
        onDone={handleVisibility}
        pages={[
          {
            backgroundColor: '#fff',
            image: (
              <Image
                source={require('./../../../assets/imgs/onboarding/ContactsOne.png')}
                style={styles.image}
              />
            ),
            title: 'Welcome to Close To You!',
            subtitle:
              'Here, you can easily manage your contacts with just a few details. Add names, emails, phone numbers, and much more—it is that simple!',
          },
          {
            backgroundColor: '#fff',
            image: (
              <Image
                source={require('./../../../assets/imgs/onboarding/ContactsTwo.png')}
                style={styles.image}
              />
            ),
            title: 'Make each contact unique!',
            subtitle:
              'In addition to basic details, you can tag your contacts as clients or employees. Personalize each one with a photo and view their geographical location via Google Maps. Plus, you will be able to see the weather in their area every time you access their details!',
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute', // Hace que el contenedor ocupe toda la pantalla
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 3,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // for that the image is not resized
  },
  onboardingImage: {
    paddingBottom: 0,
    width: '90%',
    height: '50%',
  },
});
