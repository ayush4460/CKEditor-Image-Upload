import axios from 'axios';

export const uploadImage = async (body) => {
    return await axios.post(
        `http://localhost:8000/api/upload`,
        body
    )
}