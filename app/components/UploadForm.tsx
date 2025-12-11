'use client';

import { useState, useRef } from 'react';

interface UploadFormProps {
  onUploadComplete: (result: any) => void;
  isProcessing: boolean;
  setIsProcessing: (value: boolean) => void;
}

export default function UploadForm({ onUploadComplete, isProcessing, setIsProcessing }: UploadFormProps) {
  const [uploadType, setUploadType] = useState<'file' | 'url'>('file');
  const [videoUrl, setVideoUrl] = useState('');
  const [category, setCategory] = useState('tech');
  const [language, setLanguage] = useState('en');
  const [monetization, setMonetization] = useState(true);
  const [scheduleTime, setScheduleTime] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const formData = new FormData();

      if (uploadType === 'file' && videoFile) {
        formData.append('video', videoFile);
      } else if (uploadType === 'url') {
        formData.append('videoUrl', videoUrl);
      }

      formData.append('category', category);
      formData.append('language', language);
      formData.append('monetization', monetization.toString());
      if (scheduleTime) {
        formData.append('scheduleTime', scheduleTime);
      }

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        onUploadComplete(result);
      } else {
        alert(result.error || 'Upload failed');
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('An error occurred during upload');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card max-w-3xl mx-auto">
      <div className="space-y-6">
        {/* Upload Type Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Upload Method
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setUploadType('file')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                uploadType === 'file'
                  ? 'bg-youtube-red text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📁 Upload File
            </button>
            <button
              type="button"
              onClick={() => setUploadType('url')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                uploadType === 'url'
                  ? 'bg-youtube-red text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🔗 Video URL
            </button>
          </div>
        </div>

        {/* File Upload or URL Input */}
        {uploadType === 'file' ? (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Video File
            </label>
            <div className="relative">
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                className="hidden"
                required={uploadType === 'file'}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-12 border-2 border-dashed border-gray-300 rounded-lg hover:border-youtube-red transition-colors text-center"
              >
                {videoFile ? (
                  <div>
                    <p className="text-lg font-medium text-gray-900">{videoFile.name}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {(videoFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg font-medium text-gray-700">Click to select video</p>
                    <p className="text-sm text-gray-500 mt-1">or drag and drop</p>
                  </div>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Video URL
            </label>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://example.com/video.mp4"
              className="input-field"
              required={uploadType === 'url'}
            />
          </div>
        )}

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field"
          >
            <option value="tech">🖥️ Tech</option>
            <option value="vlog">📹 Vlog</option>
            <option value="shorts">🎬 Shorts</option>
            <option value="gaming">🎮 Gaming</option>
            <option value="tutorial">📚 Tutorial</option>
            <option value="entertainment">🎭 Entertainment</option>
            <option value="education">🎓 Education</option>
            <option value="music">🎵 Music</option>
          </select>
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="input-field"
          >
            <option value="en">🇺🇸 English</option>
            <option value="es">🇪🇸 Spanish</option>
            <option value="fr">🇫🇷 French</option>
            <option value="de">🇩🇪 German</option>
            <option value="ja">🇯🇵 Japanese</option>
            <option value="ko">🇰🇷 Korean</option>
            <option value="zh">🇨🇳 Chinese</option>
            <option value="pt">🇧🇷 Portuguese</option>
            <option value="ru">🇷🇺 Russian</option>
            <option value="hi">🇮🇳 Hindi</option>
          </select>
        </div>

        {/* Monetization */}
        <div>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={monetization}
              onChange={(e) => setMonetization(e.target.checked)}
              className="w-5 h-5 text-youtube-red focus:ring-youtube-red border-gray-300 rounded"
            />
            <span className="text-sm font-semibold text-gray-700">
              💰 Enable Monetization
            </span>
          </label>
        </div>

        {/* Schedule Time */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Schedule Time (Optional)
          </label>
          <input
            type="datetime-local"
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e.target.value)}
            className="input-field"
          />
          <p className="text-xs text-gray-500 mt-2">
            Leave empty to publish immediately
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isProcessing || (uploadType === 'file' && !videoFile) || (uploadType === 'url' && !videoUrl)}
          className="btn-primary w-full text-lg py-4"
        >
          {isProcessing ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing & Uploading...
            </span>
          ) : (
            '🚀 Generate & Upload to YouTube'
          )}
        </button>
      </div>
    </form>
  );
}
