import * as Yup from 'yup';

export default (channels) => Yup.object().shape({
  name: Yup.string()
    .required()
    .min(3, 'To short!')
    .max(15, 'To long!')
    .notOneOf(channels, 'This name already exists'),
});
