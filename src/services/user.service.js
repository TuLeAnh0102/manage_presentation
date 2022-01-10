import config from '../configs/config';
import { authHeader, history } from '../helpers';

import axios from 'axios';

export const userService = {
    login,
    logout,
    getAllUser,
    createUser,
    updateUser,
    getUserById,
    changePassword,
};

async function login (username, password){
    try {
        return await axios({
            method: 'Post',
            headers: authHeader(),
            url : `${config.apiUrl}/api/user/login`,
            data: {
                username: username, 
                password: password
            }
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return handleError(error);
    }
}

function logout() {
    localStorage.removeItem('user');
}

async function getAllUser() {
    try {
        return await axios({
            method: 'Get',
            headers: authHeader(),
            url: `${config.apiUrl}/api/user/all`
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return handleError(error);
    }
}

async function getUserById(id_user) {
    try {
        return await axios({
            method: 'Get',
            headers: authHeader(),
            url : `${config.apiUrl}/api/user/${id_user}`,
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return handleError(error);
    }
}

async function createUser(user) {

    try {
        return await axios({
            method: 'POST',
            headers: authHeader(),
            url : `${config.apiUrl}/api/user/create`,
            data: JSON.stringify(user)
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return handleError(error);
    }
}

async function updateUser(id, body) {

    try {
        return await axios({
            method: 'POST',
            headers: authHeader(),
            url : `${config.apiUrl}/api/user/${id}`,
            body: JSON.stringify(body)
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return handleError(error);
    }
}

async function changePassword(){
    try {
        return await axios({
            method: 'POST',
            headers: authHeader(),
            url: `${config.apiUrl}`
        })
    } catch (error) {
        handleError(error);
    }
}

function handleError(error) {
    if( error.isAxiosError && error.response.status === 401)
    {
        history.push('/login');
    }
    return Promise.reject(error);
}
