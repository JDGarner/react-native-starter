export const getRandomQuote = async ({onSuccess, onError}) => {
  try {
    const response = await fetch(
      'https://api.gameofthronesquotes.xyz/v1/random',
    );
    const result = await response.json();

    console.log('>>> result: ', result);

    onSuccess(result);
  } catch (error) {
    console.log('>>> error: ', error);
    onError(error);
  }
};

export const getHouses = async ({onSuccess, onError}) => {
  try {
    const response = await fetch(
      'https://api.gameofthronesquotes.xyz/v1/houses',
    );

    const result = await response.json();

    onSuccess(result);
  } catch (error) {
    console.log('>>> error: ', error);
    onError(error);
  }
};
