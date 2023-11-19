import { useEffect, useState } from 'react';
import { LookupValueObject } from '../../utils/interface';
import axios from 'axios';

const EmployeeTypes = () => {
  const [employeeTypes, setEmployeeTypes] = useState<LookupValueObject[]>([]);

  useEffect(() => {
    const handleEmployeeTypes = async () => {
      const allEmployeeTypes = await axios.get(
        'https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/4/lookupvalues',
      );
      setEmployeeTypes(allEmployeeTypes.data);
    };
    handleEmployeeTypes();
  }, []);

  return { employeeTypes };
};

export { EmployeeTypes };
