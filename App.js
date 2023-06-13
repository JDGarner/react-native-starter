import React, {useEffect, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {getHouses, getRandomQuote} from './src/api';
import Houses from './src/Houses';
import {removeDuplicates} from './src/utils/array';
import {marginBMedium} from './src/styles/styles';

// Build a page containing:
// 1 - a button that fetches a random quote when clicked.
// 2 - a section for each of the Game of Thrones houses, containing:
//     - a list of all characters in that particular house.
//     - a list of all unique quotes that have been fetched and attributed to that particular character.

// https://api.gameofthronesquotes.xyz/v1/random

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const [houses, setHouses] = useState([]);
  const [housesError, setHousesError] = useState(null);

  const requestHouses = () => {
    getHouses({
      onSuccess: setHouses,
      onError: () => setHousesError('Error fetching houses'),
    });
  };

  useEffect(() => {
    requestHouses();
  }, []);

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
  };

  const onPressGetRandomQuote = () => {
    getRandomQuote({
      onSuccess: data => {
        const {
          sentence,
          character: {
            slug: characterSlug,
            house: {slug: houseSlug},
          },
        } = data;

        const house = houses.find(h => h.slug === houseSlug);

        if (house) {
          const member = house.members.find(m => m.slug === characterSlug);

          if (member) {
            const updatedMember = {
              ...member,
              quotes: removeDuplicates([...(member?.quotes || []), sentence]),
            };

            const updatedHouse = {
              ...house,
              members: house.members.map(m => {
                if (m.slug === updatedMember.slug) {
                  return updatedMember;
                }

                return m;
              }),
            };

            const updatedHouses = houses.map(h => {
              if (h.slug === house.slug) {
                return updatedHouse;
              }

              return h;
            });

            setHouses(updatedHouses);
          }
        }
      },
      // onError: TODO:
    });
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        <Pressable style={marginBMedium} onPress={onPressGetRandomQuote}>
          <Text>Get Random Quote</Text>
        </Pressable>

        {housesError ? (
          <View>
            <Text>{housesError}</Text>
            <Pressable onPress={requestHouses}>
              <Text>Retry</Text>
            </Pressable>
          </View>
        ) : (
          <Houses houses={houses} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
