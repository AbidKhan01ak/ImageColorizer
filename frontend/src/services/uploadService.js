import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BACKEND_URL;
export const uploadImage = async (file, setImageUrl, setLoading, setError) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
        setLoading(true);
        const response = await axios.post(`${BASE_URL}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                withCredentials: false
            },

        });
        setImageUrl(response.data.output_url, `/uploads/${file.name}`);
        setLoading(false);
    } catch (err) {
        setLoading(false);
        setError('Error uploading the file. Please try again.');
    }
};
