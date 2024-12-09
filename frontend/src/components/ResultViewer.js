const ResultViewer = ({ imageUrl }) => {
    // const BASE_URL = process.env.REACT_APP_BACKEND_URL;
    console.log("Colorized Image URL:", imageUrl); // Debug
    if (!imageUrl) return null;

    return (
        <div className="mt-4 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-center mb-4">Colorized Images:</h3>
            <div className="flex items-center justify-center gap-4">
                <div className="w-full text-center">
                    <img
                        src={imageUrl}
                        alt="Colorized"
                        className="max-w-full rounded-md shadow-lg"
                    />
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <a
                    href={imageUrl}
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
