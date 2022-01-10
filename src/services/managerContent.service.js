import config from '../configs/config';
import { authHeader, history } from '../helpers';

import axios from 'axios';

export const managerContentService = {
    getAllContent,
    getContentById,
    getPublishedContent,
    createContent,
    updateTutorialById,
    deleteTutorialById,
    getAllByUserId
};

async function getAllContent() {
    try {
        return await axios({
            method: 'Get',
            headers: authHeader(),
            url: `${config.apiUrl}/api/tutorials/findAll`
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return handleError(error);
    }
}

async function getContentById(id) {
    try {
        return await axios({
            method: 'Get',
            headers: authHeader(),
            url: `${config.apiUrl}/api/tutorials/${id}`,
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return handleError(error);
    }
}

async function getPublishedContent(){
    try {
        return await axios({
            method: 'Get',
            headers: authHeader(),
            url: `${config.apiUrl}/api/tutorials/published`,
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return handleError(error);
    }
}

async function createContent(content){
    try {
        return await axios({
            method: 'POST',
            headers: authHeader(),
            url: `${config.apiUrl}/api/tutorials/create`,
            data: content
        }).then((res) => {
            console.log(res.status); 
            return res.data;
        })
    } catch (error) {
        handleError(error);
    }
}

async function updateTutorialById(id, body){
    try {
        return await axios({
            method: 'PUT',
            headers: authHeader(),
            url: `${config.apiUrl}/api/tutorials/${id}`,
            data: body
        }).then(response => {
            return response.data
        })
    } catch (error) {
        return handleError(error);
    }
}

async function deleteTutorialById(id) {
    try {
        return await axios({
            method: 'delete',
            headers: authHeader(),
            url: `${config.apiUrl}/api/tutorials/${id}`
        }).then(response => {
            return response.data
        })
    } catch (error) {
        return handleError(error);
    }
}

async function getAllByUserId(id) {
    try {
        return await axios({
            method: 'GET',
            headers: authHeader(),
            url: `${config.apiUrl}/api/tutorials/findByUser/${id}`
        })
    } catch (error) {
        
    }
}

function handleError(error) {
    console.log(error);
    // if (error.isAxiosError && error.response.status === 401) {
    //     history.push('/login');
    // }
    return Promise.reject(error);
}
