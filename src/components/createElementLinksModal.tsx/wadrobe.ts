import { useEffect, useState } from 'react';
import { LookupValueObject } from '../../utils/interface';
import axios from 'axios';

const Wadrobe = () => {
  const [wadrobes, setWadrobes] = useState<LookupValueObject[]>([]);

  useEffect(() => {
    const handleWadrobes = async () => {
      const allWadrobes = await axios.get(
        'https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/10/lookupvalues',
      );
      setWadrobes(allWadrobes.data);
    };
    handleWadrobes();
  }, []);

  return { wadrobes };
};

export { Wadrobe };
