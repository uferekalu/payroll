import { useEffect, useState } from 'react';
import { LookupValueObject } from '../../utils/interface';
import axios from 'axios';

const Housing = () => {
  const [housings, setHousings] = useState<LookupValueObject[]>([]);

  useEffect(() => {
    const handleHousings = async () => {
      const allHousings = await axios.get(
        'https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/9/lookupvalues',
      );
      setHousings(allHousings.data);
    };
    handleHousings();
  }, []);

  return { housings };
};

export { Housing };
