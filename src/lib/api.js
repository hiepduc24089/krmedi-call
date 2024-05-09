import axios from 'axios';

const API_URL = 'https://krmedi.vn:81/';

const headers = {
    "Content-Type": "application/json"
};

export const checkUserRoleById = async (user_id) => {
    try {
        const response = await axios.get(API_URL + `api/users/get-role/` + user_id, { headers });
        if (response.data.error === 0) {
            const data = response.data.data;
            return data;
        }
    } catch (error) {
        console.error(error);
        return error;
    }
};