import React from 'react';
import {Text, View} from 'react-native';
import HouseMembers from './HouseMembers';
import { marginBMedium, houseText } from './styles/styles';

const Houses = ({houses = []}) => {
  if (!houses?.length) {
    return null;
  }

  return (
    <View>
      {houses.map(({name, members}) => {
        return (
          <View style={marginBMedium}>
            <Text style={houseText}>{name}</Text>

            <HouseMembers members={members} />
          </View>
        );
      })}
    </View>
  );
};

export default Houses;
