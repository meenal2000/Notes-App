import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getGroups = async () => {
    return axios.get(`${API_URL}/groups`);
};

export const createGroup = async (group) => {
    return axios.post(`${API_URL}/groups`, group);
};

export const getNotes = async (groupId) => {
    return axios.get(`${API_URL}/notes/${groupId}`);
};

export const createNote = async (note) => {
    return axios.post(`${API_URL}/notes`, note);
};
