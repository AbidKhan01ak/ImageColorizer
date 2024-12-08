import { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import ResultViewer from './components/ResultViewer';
import Header from './components/Header';
import './App.css';
import Footer from './components/Footer';
import { headerData } from './data/headerData.js'

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [originalImageUrl, setOriginalImageUrl] = useState(null);

  const handleImageUpload = (colorizedImageUrl, originalUrl) => {
    setImageUrl(colorizedImageUrl);
    setOriginalImageUrl(originalUrl);
  };

  return (
    <div className="min-h-screen bg-zinc-700 flex flex-col">
      <Header />
      <p className="text-xl flex items-center justify-center text-zinc-100 sm:text-2xl md:text-3xl mt-4">{headerData.subtitle}</p>
      <main className="flex-grow">
        <div className="flex flex-col items-center justify-center">
          <ImageUploader setImageUrl={handleImageUpload} />
          <ResultViewer imageUrl={imageUrl} originalImageUrl={originalImageUrl} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
