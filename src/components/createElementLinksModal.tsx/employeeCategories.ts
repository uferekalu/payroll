import { useEffect, useState } from 'react';
import { LookupValueObject } from '../../utils/interface';
import axios from 'axios';

const EmployeeCategories = () => {
  const [employeeCategories, setEmployeeCategories] = useState<LookupValueObject[]>([]);

  useEffect(() => {
    const handleEmployeeCategories = async () => {
      const allEmployeeCategorie = await axios.get(
        'https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/3/lookupvalues',
      );
      setEmployeeCategories(allEmployeeCategorie.data);
    };
    handleEmployeeCategories();
  }, []);

  return { employeeCategories };
};

export { EmployeeCategories };
