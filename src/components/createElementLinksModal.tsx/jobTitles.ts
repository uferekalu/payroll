import  { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store';
import { getLookupValues } from '../../slices/getLookupValuesSlice';

const JobTitle = () => {
  const dispatch = useAppDispatch();
  const jobTitles = useAppSelector((state: RootState) => state.getLookupValues);

  useEffect(() => {
    dispatch(getLookupValues(6));
  }, [dispatch]);

  return {
    jobTitles
  };
};

export { JobTitle };
