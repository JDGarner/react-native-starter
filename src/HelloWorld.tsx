import React from 'react';
import {Text, View} from 'react-native';

type Props = {
  label: string;
};

const HelloWorld = ({label}: Props) => {
  return (
    <View>
      <Text>{label}</Text>
    </View>
  );
};

export default HelloWorld;
