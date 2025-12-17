import { notation } from '@/shared/lib/utils/notation';
import { useGetAvailableIncludeSoruce } from '../api/get-available';
import { useMemo } from 'react';

export const useGetAvailable = () => {
  const { data, ...other } = useGetAvailableIncludeSoruce();
  const modelsFormat = useMemo(
    () =>
      data?.map(({ name, source }) => ({
        id: notation.createStringNotation(source.name, '/', name),
        name,
      })) ?? [],
    [data]
  );

  return { modelsFormat, ...other };
};
