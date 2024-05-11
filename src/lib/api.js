import axios from 'axios';

const API_URL = 'https://krmedi.vn:81/';

export const checkUserRoleById = async (user_id) => {
    try {
        const response = await axios.get(API_URL + `api/users/get-role/` + user_id, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.data.error === 0) {
            const data = response.data.data;
            return data;
        }
    } catch (error) {
        console.error(error);
        return error;
    }
};

export const searchMedicine = async (searchKey) => {
    try {
        const response = await axios.get(API_URL + `api/prescription/search/medicine`, {
            headers: {
                "Content-Type": "application/json",
            },
            params: {
                search_key: searchKey
            }
        });
        if (response.data.error === 0) {
            const data = response.data.data;
            return data;
        }
    } catch (error) {
        console.error(error);
        return error;
    }
};

export const addToCart = async (requestData, accessToken) => {
    try {
        const response = await axios.post(API_URL + "api/carts/create-v2", requestData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ` + accessToken,
            },
        });

        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
};