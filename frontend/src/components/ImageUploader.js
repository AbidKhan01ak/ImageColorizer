import { useState } from 'react';
import { uploadImage } from '../services/uploadService';
import LoaderSpinner from '../utils/LoaderSpinner';


const ImageUploader = ({ setImageUrl }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setError('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        uploadImage(file, setImageUrl, setLoading, setError);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl">
            <h2 className="text-2xl font-semibold text-center mb-4">Image Colorizer</h2>
            <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full mb-4 p-2 border border-gray-300 rounded-md text-sm md:text-base"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 px-6 text-white font-semibold rounded-md 
                    ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'} 
                    transition-colors duration-300`}
                >
                    {loading ? <LoaderSpinner /> : 'Upload Image'}
                </button>
            </form>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
    );
};

export default ImageUploader;
