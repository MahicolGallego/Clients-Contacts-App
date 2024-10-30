import React from 'react';
import {Text} from 'react-native-paper';
import {GlobalStyles} from '../../theme/global.styles';

interface props {
  title: string;
  backgroundColor?: string;
}

export const TitleSection = ({title}: props) => {
  return (
    <Text
      style={{
        ...GlobalStyles.title,
        backgroundColor: 'black',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
      }}>
      {title}
    </Text>
  );
};
