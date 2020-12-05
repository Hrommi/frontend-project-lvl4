import * as yup from 'yup';
import i18n from './i18n';

const getSchema = (channelNames) => yup.object({
  name: yup.string()
    .trim()
    .min(3, i18n.t('validation:range', { min: 3, max: 20 }))
    .max(20, i18n.t('validation:range', { min: 3, max: 20 }))
    .notOneOf(channelNames, i18n.t('validation:unique'))
    .required(i18n.t('validation:required')),
});

export default getSchema;
