import {createSelector} from 'reselect';
import {makeSelectEntities} from 'containers/App/selectors';

export const makeSelectTimezonesByCountryId = () =>
  createSelector(
    [makeSelectEntities(), (state, ownProps) => ownProps.countryId],
    (entities, countryId) => {
      return countryId
        ? entities
            .getIn(['countries', 'items', countryId, 'timezones'])
            .map((timezone) => {
              return {
                key: timezone.get('id'),
                text: timezone.get('name'),
                value: timezone.get('name'),
              };
            })
            .toJS()
        : [];
    }
  );
