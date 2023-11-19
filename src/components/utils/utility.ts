import axios from 'axios';

export const fetchLookupValue = async (
  id: number | null,
  lookupId: number | null,
) => {
  const result = await axios.get(
    `https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/${id}/lookupvalues/${lookupId}`,
  );

  const lookup = result.data.data

  return lookup
};
