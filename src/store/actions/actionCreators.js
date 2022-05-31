import actions from "./actionTypes";

export const getHeroesRequest = (payload) => ({
    type: actions.GET_HEROES_REQUEST,
    payload,
});

export const getHeroesSuccess = (payload) => ({
    type: actions.GET_HEROES_SUCCESS,
    payload,
});

export const getHeroesError = (payload) => ({
    type: actions.GET_HEROES_ERROR,
    payload,
});

export const createHeroRequest = (payload) => ({
    type: actions.CREATE_HERO_REQUEST,
    payload,
});

export const createHeroSuccess = (payload) => ({
    type: actions.CREATE_HERO_SUCCESS,
    payload,
});

export const createHeroError = (payload) => ({
    type: actions.CREATE_HERO_ERROR,
    payload,
});

export const deleteHeroRequest = (payload) => ({
    type: actions.DELETE_HERO_REQUEST,
    payload,
});

export const deleteHeroSuccess = (payload) => ({
    type: actions.DELETE_HERO_SUCCESS,
    payload,
});

export const deleteHeroError = (payload) => ({
    type: actions.DELETE_HERO_ERROR,
    payload,
});

export const patchHeroRequest = (...payload) => ({
    type: actions.PATCH_HERO_REQUEST,
    ...payload,
});

export const patchHeroSuccess = (...payload) => ({
    type: actions.PATCH_HERO_SUCCESS,
    ...payload,
});

export const patchHeroError = (...payload) => ({
    type: actions.PATCH_HERO_ERROR,
    ...payload,
});

export const incrementAction = (payload) => {
    return { type: actions.INCREMENT, payload };
  };
  
  export const decreaseAction = (payload) => ({
    type: actions.DECREMENT,
    payload,
  });