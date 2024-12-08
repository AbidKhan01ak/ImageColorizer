import axios from 'axios';
// const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
export const uploadImage = async (file, setImageUrl, setLoading, setError) => {
    const formData = new FormData();
    formData.append('file', file);
    console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL);
    try {
        setLoading(true);
        const response = await axios.post('https://imagecolorizer-qxwg.onrender.com/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },

        });
        console.log("Sending request to:", response);
        setImageUrl(response.data.output_url, `/uploads/${file.name}`);
        console.log('response.data', response.data);
        setLoading(false);
    } catch (err) {
        setLoading(false);
        setError('Error uploading the file. Please try again.');
        console.error('Error:', err);
    }
};
