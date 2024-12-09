import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BACKEND_URL;
// const BASE_URL = 'http://127.0.0.1:5000';
export const uploadImage = async (file, setImageUrl, setLoading, setError) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
        setLoading(true);
        const response = await axios.post(`${BASE_URL}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },

        });
        setImageUrl({
            output: response.data.output_url,
            original: `/uploads/${file.name}`,
        });
        setLoading(false);
    } catch (err) {
        setLoading(false);
        setError('Error uploading the file. Please try again.');
    }
};
