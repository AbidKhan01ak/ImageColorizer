const ResultViewer = ({ imageUrl, originalImageUrl }) => {
    if (!imageUrl || !originalImageUrl) return null;

    return (
        <div className="mt-4 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-center mb-4">Uploaded & Colorized Images:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="w-full text-center">
                    <h4 className="font-medium text-lg mb-2">Original Image</h4>
                    <img
                        src={`http://localhost:5000/${originalImageUrl}`}
                        alt="Uploaded"
                        className="max-w-full rounded-md shadow-lg"
                    />
                </div>
                <div className="w-full text-center">
                    <h4 className="font-medium text-lg mb-2">Colorized Image</h4>
                    <img
                        src={`http://localhost:5000/${imageUrl}`}
                        alt="Colorized"
                        className="max-w-full rounded-md shadow-lg"
                    />
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <a
                    href={`http://localhost:5000/${imageUrl}`}
                    download="colorized-image.jpg"
                    className="inline-block bg-blue-600 text-white mt-5 px-4 py-2 rounded-md shadow hover:bg-blue-700 transition duration-300"
                >
                    Save Image
                </a>
            </div>
        </div>
    );
};

export default ResultViewer;
