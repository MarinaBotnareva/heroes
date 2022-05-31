import { httpClient } from '.';

const path = '/heroes';

export const getHeroesAsync = async (filter = { _page: 1, _limit: 10 }) => {
    const response = await httpClient.get(`${path}`, { params: filter });

    return response.data;
};

export const createHeroAsync = async (payload) => {
    const response = await httpClient.post(`${path}`, payload);
    
    return response.data;
};

export const deleteHeroAsync = async (payload) => {
    const response = await httpClient.delete(`${path}/${payload}`);

    return response.data;
};

export const patchHeroAsync = async (payload, args) => {
    const response = await httpClient.patch(`${path}/${payload}`, args);

    return response.data;
};