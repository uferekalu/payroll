import { useEffect, useState } from 'react';
import { LookupValueObject } from '../../utils/interface';
import axios from 'axios';

const Security = () => {
  const [securities, setSecurities] = useState<LookupValueObject[]>([]);

  useEffect(() => {
    const handleWadrobes = async () => {
      const allSecurities = await axios.get(
        'https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/11/lookupvalues',
      );
      setSecurities(allSecurities.data);
    };
    handleWadrobes();
  }, []);

  return { securities };
};

export { Security };
