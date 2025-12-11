'use client';

interface UploadSummaryProps {
  result: any;
  onNewUpload: () => void;
}

export default function UploadSummary({ result, onNewUpload }: UploadSummaryProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="card max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Upload Successful!</h2>
        <p className="text-gray-600">Your video has been processed and uploaded to YouTube</p>
      </div>

      <div className="space-y-6">
        {/* Video Title */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Video Title
            </h3>
            <button
              onClick={() => copyToClipboard(result.title)}
              className="text-youtube-red hover:text-red-700 text-sm font-medium"
            >
              📋 Copy
            </button>
          </div>
          <p className="text-lg font-medium text-gray-900">{result.title}</p>
          <p className="text-xs text-gray-500 mt-2">{result.title.length} characters</p>
        </div>

        {/* Video Description */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Description
            </h3>
            <button
              onClick={() => copyToClipboard(result.description)}
              className="text-youtube-red hover:text-red-700 text-sm font-medium"
            >
              📋 Copy
            </button>
          </div>
          <p className="text-gray-900 whitespace-pre-wrap">{result.description}</p>
        </div>

        {/* Hashtags */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Hashtags
            </h3>
            <button
              onClick={() => copyToClipboard(result.hashtags.join(' '))}
              className="text-youtube-red hover:text-red-700 text-sm font-medium"
            >
              📋 Copy
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.hashtags.map((tag: string, index: number) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Video Tags
            </h3>
            <button
              onClick={() => copyToClipboard(result.tags.join(', '))}
              className="text-youtube-red hover:text-red-700 text-sm font-medium"
            >
              📋 Copy
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Thumbnail Prompt */}
        {result.thumbnailPrompt && (
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Thumbnail Prompt
              </h3>
              <button
                onClick={() => copyToClipboard(result.thumbnailPrompt)}
                className="text-youtube-red hover:text-red-700 text-sm font-medium"
              >
                📋 Copy
              </button>
            </div>
            <p className="text-gray-900">{result.thumbnailPrompt}</p>
            <p className="text-xs text-gray-500 mt-2">
              Use this prompt with DALL-E, Midjourney, or other AI image generators
            </p>
          </div>
        )}

        {/* Schedule Info */}
        {result.scheduledTime && (
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-blue-900 uppercase tracking-wide mb-2">
              Scheduled Publish
            </h3>
            <p className="text-blue-900 font-medium">
              📅 {new Date(result.scheduledTime).toLocaleString()}
            </p>
          </div>
        )}

        {/* Video Link */}
        {result.videoId && (
          <div className="bg-youtube-red bg-opacity-10 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
              YouTube Video
            </h3>
            <a
              href={`https://www.youtube.com/watch?v=${result.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-youtube-red hover:text-red-700 font-medium text-lg"
            >
              🎥 View on YouTube
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        )}

        {/* Upload Another Button */}
        <button
          onClick={onNewUpload}
          className="btn-secondary w-full text-lg py-4"
        >
          ⬆️ Upload Another Video
        </button>
      </div>
    </div>
  );
}
