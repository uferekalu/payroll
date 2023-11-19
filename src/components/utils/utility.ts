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

// useEffect(() => {
//   if (elementDet.element.categoryId && elementDet.element.categoryValueId) {
//     const handleCategory = async () => {
//       const data = await axios.get(
//         `https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/${elementDet.element.categoryId}/lookupvalues/${elementDet.element.categoryValueId}`,
//       );
//       setCagoryName(data.data.name);
//     };
//     handleCategory();
//   }
// }, [elementDet.element.categoryId, elementDet.element.categoryValueId]);

// useEffect(() => {
//   if (
//     elementDet.element.classificationId &&
//     elementDet.element.classificationValueId
//   ) {
//     const handleClassifination = async () => {
//       const data = await axios.get(
//         `https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/${elementDet.element.classificationId}/lookupvalues/${elementDet.element.classificationValueId}`,
//       );
//       setClassificationName(data.data.name);
//     };
//     handleClassifination();
//   }
// }, [
//   elementDet.element.classificationId,
//   elementDet.element.classificationValueId,
// ]);

// useEffect(() => {
//   if (elementDet.element.payRunId && elementDet.element.payRunValueId) {
//     const handlePayRun = async () => {
//       const data = await axios.get(
//         `https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/${elementDet.element.payRunId}/lookupvalues/${elementDet.element.payRunValueId}`,
//       );
//       setPayrunName(data.data.name);
//     };
//     handlePayRun();
//   }
// }, [elementDet.element.payRunId, elementDet.element.payRunValueId]);
