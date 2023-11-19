import { useEffect, useState } from 'react';
import { LookupValueObject } from '../../utils/interface';
import axios from 'axios';

const Union = () => {
  const [unions, setUnions] = useState<LookupValueObject[]>([]);

  useEffect(() => {
    const handleUnions = async () => {
      const allUnions = await axios.get(
        'https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/8/lookupvalues',
      );
      setUnions(allUnions.data);
    };
    handleUnions();
  }, []);

  return { unions };
};

export { Union };
