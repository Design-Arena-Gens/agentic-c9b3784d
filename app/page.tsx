'use client';

import { useState } from 'react';
import UploadForm from './components/UploadForm';
import UploadSummary from './components/UploadSummary';

export default function Home() {
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <svg className="w-16 h-16 text-youtube-red" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            YouTube Upload Agent
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Automated video upload with AI-powered SEO optimization.
            Generate titles, descriptions, tags, and thumbnails instantly.
          </p>
        </div>

        {!uploadResult ? (
          <UploadForm
            onUploadComplete={setUploadResult}
            isProcessing={isProcessing}
            setIsProcessing={setIsProcessing}
          />
        ) : (
          <UploadSummary
            result={uploadResult}
            onNewUpload={() => setUploadResult(null)}
          />
        )}
      </div>
    </main>
  );
}
