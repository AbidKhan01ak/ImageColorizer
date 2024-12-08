import axios from 'axios';

export const uploadImage = async (file, setImageUrl, setLoading, setError) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        setLoading(true);
        const response = await axios.post('http://localhost:5000/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        setImageUrl(response.data.output_url, `/uploads/${file.name}`);
        console.log('response.data', response.data);
        setLoading(false);
    } catch (err) {
        setLoading(false);
        setError('Error uploading the file. Please try again.');
    }
};
