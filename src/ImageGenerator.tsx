import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';

type Props = {
  size?: number;
};

const ImageGenerator = ({size = 300}: Props) => {
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    const fetchImage = async () => {
      const resp = await fetch(`https://picsum.photos/${size}`);

      console.log('>>> resp: ', JSON.stringify(resp));

      setUrl(resp.url);
    };

    fetchImage();
  }, [size]);

  if (!url) {
    return null;
  }

  return <Image style={{height: size, width: size}} source={{uri: url}} />;
};

export default ImageGenerator;
