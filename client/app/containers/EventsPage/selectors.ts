/**
 * Events selectors
 */

import { createSelector } from 'reselect';

const selectEvents = (state) => state.get('events');
const selectLoading = () => createSelector(
  selectEvents,
  (eventsState) => eventsState.get('loading'),
);

const selectError = () => createSelector(
  selectEvents,
  (eventsState) => eventsState.get('error'),
);

const selectPage = () => createSelector(
  selectEvents,
  (eventsState) => eventsState.get('page'),
);

const selectTotal = () => createSelector(
  selectEvents,
  (eventsState) => eventsState.get('total'),
);

const makeQueryEvents = () => createSelector(
  selectEvents,
  (eventsState) => eventsState.get('events')
);

export {
  selectEvents,
  makeQueryEvents,
  selectLoading,
  selectError,
  selectPage,
  selectTotal
};
