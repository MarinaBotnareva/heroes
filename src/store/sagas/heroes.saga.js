import { call, put, takeLatest } from 'redux-saga/effects';
import { getHeroesError, getHeroesSuccess, createHeroError, createHeroSuccess, deleteHeroError, deleteHeroSuccess, patchHeroError, patchHeroSuccess } from "../actions/actionCreators";
import * as HeroApi from '../../api/hero.api';
import actions from '../actions/actionTypes';

export function* heroesSaga() {
    yield takeLatest(actions.GET_HEROES_REQUEST, getHeroesSaga);
    yield takeLatest(actions.CREATE_HERO_REQUEST, createHeroSaga);
    yield takeLatest(actions.DELETE_HERO_REQUEST, deleteHeroSaga);
    yield takeLatest(actions.PATCH_HERO_REQUEST, patchHeroSaga);

}

export function* getHeroesSaga(action) {
    console.log(action)
    try {
        const response = yield call(HeroApi.getHeroesAsync, action.payload);
        yield put(getHeroesSuccess(response));
    } catch (error) {
        yield put(getHeroesError(error));
    }
}

export function* createHeroSaga(action) {
    try {
        const response = yield call(HeroApi.createHeroAsync, action.payload);
        yield put(createHeroSuccess(response));
    } catch (error) {
        yield put(createHeroError(error));
    }
}

export function* deleteHeroSaga(action) {
    try {
        const response = yield call(HeroApi.deleteHeroAsync, action.payload);
        yield put(deleteHeroSuccess(response));
    } catch (error) {
        yield put(deleteHeroError(error));
    }
}

export function* patchHeroSaga(action) {
    try {
        const response = yield call(HeroApi.patchHeroAsync, action[0].payload);
        yield put(patchHeroSuccess(response));
    } catch (error) {
        yield put(patchHeroError(error));
    }
}