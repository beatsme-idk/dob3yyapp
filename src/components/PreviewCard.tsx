import React from 'react';
import { UserConfig } from '../types';
import { TwitterShareButton, LinkedinShareButton } from 'react-share';

interface Props {
  config: UserConfig;
}

const PreviewCard: React.FC<Props> = ({ config }) => {
  const previewUrl = `https://dob3y-yapp.netlify.app/${config.slug}`;

  return (
    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-glow border border-white border-opacity-20">
      {/* Preview Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-4 flex justify-between items-center">
        <h3 className="text-white text-lg font-semibold flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
          Payment Page Preview
        </h3>
        <span className="animate-pulse inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
      </div>
      
      {/* Preview Content */}
      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-white">{config.title || 'Your Payment Page'}</h2>
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs px-2 py-1 rounded-full font-medium">Live</span>
          </div>
          <p className="text-white text-opacity-80">{config.description || 'Support my work by sending ETH'}</p>
        </div>
        
        {/* Payment Button Preview */}
        <div className="bg-black bg-opacity-20 rounded-lg p-6 mb-6 flex flex-col items-center justify-center border border-white border-opacity-10">
          <button
            style={{
              backgroundColor: config.buttonStyle.backgroundColor,
              color: config.buttonStyle.textColor,
              borderRadius: config.buttonStyle.borderRadius,
              fontSize: config.buttonStyle.fontSize,
              padding: config.buttonStyle.padding,
            }}
            className="shadow-lg transition-all transform hover:scale-105 hover:shadow-xl focus:outline-none"
          >
            {config.buttonStyle.buttonText}
          </button>
          <p className="mt-4 text-sm text-white text-opacity-70 text-center">
            Payments will be sent to: <span className="font-mono bg-white bg-opacity-10 px-2 py-1 rounded text-xs">{config.ensNameOrAddress || 'your-address.eth'}</span>
          </p>
        </div>
        
        {/* URL and Share Options */}
        <div className="border-t border-white border-opacity-10 pt-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-1">Your payment URL</label>
            <div className="flex">
              <input
                type="text"
                value={previewUrl}
                readOnly
                className="flex-1 block w-full rounded-l-md border border-white border-opacity-20 bg-white bg-opacity-5 px-3 py-2 text-sm text-white"
              />
              <button 
                onClick={() => navigator.clipboard.writeText(previewUrl)}
                className="bg-white bg-opacity-10 border border-l-0 border-white border-opacity-20 rounded-r-md px-3 py-2 text-white hover:bg-white hover:bg-opacity-20 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white mb-2">Share your payment page</label>
            <div className="flex space-x-3">
              <TwitterShareButton url={previewUrl} title={`Support me by sending ETH: ${previewUrl}`}>
                <div className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white rounded-full p-2.5 transition-all transform hover:scale-110 shadow-md">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </div>
              </TwitterShareButton>
              
              <LinkedinShareButton url={previewUrl} title={`Support me by sending ETH`}>
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full p-2.5 transition-all transform hover:scale-110 shadow-md">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
              </LinkedinShareButton>
              
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full p-2.5 transition-all transform hover:scale-110 shadow-md">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Preview Footer */}
      <div className="bg-black bg-opacity-30 px-6 py-3 border-t border-white border-opacity-10">
        <div className="flex justify-between items-center">
          <div className="text-xs text-white text-opacity-70">
            Created with Payment Configuration Tool
          </div>
          <div className="flex space-x-2">
            <button className="text-white text-opacity-70 hover:text-opacity-100 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="text-white text-opacity-70 hover:text-opacity-100 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;