import * as yup from 'yup';

const getSchema = (channelNames) => yup.object({
  name: yup.string()
    .trim()
    .min(3, 'Must be 3 to 20 characters')
    .max(20, 'Must be 3 to 20 characters')
    .notOneOf(channelNames, 'Must be unique'),
});

export default getSchema;
