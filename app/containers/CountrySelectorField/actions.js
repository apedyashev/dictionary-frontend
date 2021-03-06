import {schema} from 'normalizr';
import {getEntityActions} from 'containers/App/actions';

export const countrySchema = new schema.Entity('countries');
export const countriesArraySchema = new schema.Array(countrySchema);

export const countriesEntity = {
  key: 'countries',
  url: 'location/countries',
  schema: {items: countriesArraySchema},
};
export function loadCountries(query, {resolve, reject} = {}) {
  return getEntityActions.request(query, countriesEntity, {resolve, reject});
}
