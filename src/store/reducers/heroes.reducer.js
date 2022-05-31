import actions from '../actions/actionTypes';

export const heroesState = {
    list: [],
    isLoading: false,
    error: null,
};

export const heroesReducer = (state = heroesState, action) => {
    switch (action.type) {
        case actions.GET_HEROES_REQUEST:
        case actions.DELETE_HERO_REQUEST:
        case actions.PATCH_HERO_REQUEST:
        case actions.CREATE_HERO_REQUEST: {
            return { ...state, isLoading: true, error: null };
        }
        case actions.CREATE_HERO_ERROR:
        case actions.DELETE_HERO_ERROR:
        case actions.PATCH_HERO_ERROR:
        case actions.GET_HEROES_ERROR: {
            return { ...state, isLoading: false, error: action.payload };
        }
        case actions.GET_HEROES_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                list: [...action.payload],
            };
        }
        case actions.CREATE_HERO_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                list: [action.payload, ...state.list],
            };
        }
        case actions.DELETE_HERO_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                list: state.list.filter((index) => index !== action.payload),
            };
        }
        case actions.PATCH_HERO_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                list: state.list.map((hero, i) => 
                i === action.payload ? {...hero, [action.key] : action.args} : hero),
            };
        }


        default: {
            return state;
        }
    }
};