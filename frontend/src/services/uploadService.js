import axios from 'axios';
// const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'localhost:5000';
// const BASE_URL = 'http://127.0.0.1:5000';
export const uploadImage = async (file, setImageUrl, setLoading, setError) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
        setLoading(true);
        const response = await axios.post('http://localhost:5000/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },

        });
        setImageUrl(response.data.output_url, `/uploads/${file.name}`);
        setLoading(false);
    } catch (err) {
        setLoading(false);
        setError('Error uploading the file. Please try again.');
    }
};
