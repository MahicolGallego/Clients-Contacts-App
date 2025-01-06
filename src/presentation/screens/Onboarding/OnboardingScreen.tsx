import {useEffect, useState} from 'react';
import {DataStorage} from '../../../adapters/data-storage/AsyncStorage';
import {Onboarding} from '../../components';
import {LoadingSpinner} from '../../components/shared/LoadingSpinner';

export const OnboardingScreen = () => {
  // variable starting with false for that no show onboarding until check this in async storage
  const [firstAccess, setFirstAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      const userFirstAccess = await DataStorage.getItem('first-access');
      if (userFirstAccess === null || userFirstAccess === 'true') {
        setFirstAccess(true);
      }
      setLoading(false);
    };
    checkAccess();
    return;
  }, []);

  return loading ? <LoadingSpinner /> : firstAccess && <Onboarding />;
};
