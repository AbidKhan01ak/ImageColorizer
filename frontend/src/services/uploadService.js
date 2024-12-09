import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const uploadImage = async (file, setImageUrl, setLoading, setError) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
        setLoading(true);
        const response = await axios.post(`${BASE_URL}/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data', }
        });

        setImageUrl({
            output: `${BASE_URL.replace(/\/$/, '')}${response.data.output_url}`,
            original: `${BASE_URL.replace(/\/$/, '')}${response.data.original_url}`
        });
        setLoading(false);
    } catch (err) {
        setLoading(false);
        setError('Error uploading the file. Please try again.');
        setTimeout(() => {
            setError('')
        }, 5000)
    }
};
