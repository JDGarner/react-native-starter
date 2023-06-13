import React from 'react';
import {Text, View} from 'react-native';
import {sanitizeArray} from './utils/array';
import { marginBMedium } from './styles/styles';

const HouseMembers = ({members = []}) => {
  if (!members?.length) {
    return null;
  }

  return (
    <View>
      {members.map(({name, quotes}) => {
        return (
          <View style={marginBMedium}>
            <Text>{name}</Text>

            {sanitizeArray(quotes).map(quote => {
              return <Text>{quote}</Text>;
            })}
          </View>
        );
      })}
    </View>
  );
};

export default HouseMembers;
