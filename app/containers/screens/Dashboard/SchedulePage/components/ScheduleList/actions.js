import {schema} from 'normalizr';
import {getEntityActions} from 'containers/App/actions';

export const scheduleItemsSchema = new schema.Entity('schedule');
export const scheduleItemsArraySchema = new schema.Array(scheduleItemsSchema);

export const loadScheduleEntity = {
  key: 'schedule',
  url: 'schedule',
  schema: {items: scheduleItemsArraySchema},
};
export function loadSchedule(query, {resolve, reject} = {}) {
  return getEntityActions.request(query, loadScheduleEntity, {
    resolve,
    reject,
  });
}
