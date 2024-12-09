import { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import ResultViewer from './components/ResultViewer';
import Header from './components/Header';
import './App.css';
import Footer from './components/Footer';
import { headerData } from './data/headerData.js'

function App() {
  const [imageUrl, setImageUrl] = useState('');

  const handleImageUpload = (colorizedImageUrl) => {
    setImageUrl(colorizedImageUrl);
  };

  return (
    <div className="min-h-screen bg-zinc-700 flex flex-col">
      <Header />
      <p className="text-xl flex items-center justify-center text-zinc-100 sm:text-2xl md:text-3xl mt-4">{headerData.subtitle}</p>
      <h6 className='flex items-center justify-center text-cyan-400 pt-2' >
        Note: only
        <span className='font-semibold ml-1 mr-1'>
          JPG, PNG and JPEG
        </span>
        files are allowed.
        <span className='text-red-500 ml-1'>
          Corrupted files will not be colorized
        </span>
      </h6>
      <main className="flex-grow">
        <div className="flex flex-col items-center justify-center">
          <ImageUploader setImageUrl={handleImageUpload} />
          <ResultViewer imageUrl={imageUrl?.output} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
