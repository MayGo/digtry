import { LoginRoute } from '../../RoutePaths';
import { AuthError, default as CfApi } from '../../services/cfApi';
/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { LOAD_EVENTS } from './constants';
import { eventsLoaded, eventsLoadingError } from './actions';

import { makeQueryEvents } from './selectors';
import { logout } from "app/containers/Login/actions";

/**
 * CF events request/response handler
 */
export function* getEvents(): IterableIterator<any> {
  // Select username from store
  const username = yield select(makeQueryEvents());
  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(CfApi.request, 'events');
    console.log(repos)
    yield put(eventsLoaded(repos.resources));
  } catch (err) {
    if (err instanceof AuthError) {
      console.error("Auth error, logging out and redirecting to login")
      yield put(logout())
    } else {
      console.error("Error loading events:", err);
      yield put(eventsLoadingError(err));
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* eventsData(): IterableIterator<any> {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_EVENTS, getEvents);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  eventsData,
];
