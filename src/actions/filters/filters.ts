import {
    FILTERS_SET_NAME,
    FILTERS_SET_CATEGORY,
    FILTERS_CLEAR,
} from '../../constants/actionTypes';

export const setFilterName = (name: string) => ({
    type: FILTERS_SET_NAME,
    payload: {
        name,
    }
});

export const setFilterCategory = (category: string) => ({
    type: FILTERS_SET_CATEGORY,
    payload: {
        category,
    }
});

export const clearFilters = () => ({
    type: FILTERS_CLEAR,
});
