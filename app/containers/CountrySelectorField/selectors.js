import {createSelector} from 'reselect';
import {fromJS} from 'immutable';
import {makeSelectEntities} from 'containers/App/selectors';

export const makeSelectCountries = () =>
  createSelector([makeSelectEntities()], (entities) => {
    return entities.getIn(['countries', 'displayOrder']).map((id) => {
      const country = entities.getIn(['countries', 'items', id]);
      const text = `${country.get('nativeName')} (${country.get('name')})`;
      return fromJS({id, key: id, text, value: id, timezones: country.get('timezones')});
    });
  });
export const makeSelectCountriesLoading = () =>
  createSelector(makeSelectEntities(), (entities) => {
    return entities.getIn(['countries', 'loading']);
  });
