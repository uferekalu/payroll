import { useEffect, useState } from 'react';
import { LookupValueObject } from '../../utils/interface';
import axios from 'axios';

const Locations = () => {
  const [locations, setLocations] = useState<LookupValueObject[]>([]);

  useEffect(() => {
    const handleLocation = async () => {
      const allLocations = await axios.get(
        'https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/7/lookupvalues',
      );
      setLocations(allLocations.data);
    };
    handleLocation();
  }, []);

  return { locations };
};

export { Locations };
