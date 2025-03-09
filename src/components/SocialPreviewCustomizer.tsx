import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import useSound from 'use-sound';
import { UserConfig } from '../types';

interface Props {
  config: UserConfig;
  onUpdate: (config: UserConfig) => void;
}

const SocialPreviewCustomizer: React.FC<Props> = ({ config, onUpdate }) => {
  const [activePreview, setActivePreview] = useState<'twitter' | 'facebook' | 'linkedin'>('twitter');
  const [playHover] = useSound('/hover.mp3', { volume: 0.5 });
  const [playClick] = useSound('/click.mp3', { volume: 0.3 });

  const previewUrl = `https://yourdomain.com/${config.slug}`;

  const springProps = useSpring({
    scale: 1,
    from: { scale: 0.9 },
    config: { tension: 300, friction: 10 }
  });

  const platforms = [
    { id: 'twitter', name: 'Twitter', icon: 'twitter.svg' },
    { id: 'facebook', name: 'Facebook', icon: 'facebook.svg' },
    { id: 'linkedin', name: 'LinkedIn', icon: 'linkedin.svg' }
  ];

  return (
    <div className="glass-panel rounded-xl p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
          Social Media Preview
        </h2>
        <div className="flex space-x-2">
          {platforms.map((platform) => (
            <motion.button
              key={platform.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActivePreview(platform.id as any);
                playClick();
              }}
              onMouseEnter={() => playHover()}
              className={`px-4 py-2 rounded-lg transition-all ${
                activePreview === platform.id
                  ? 'bg-white bg-opacity-20 text-white shadow-glow'
                  : 'text-white text-opacity-60 hover:text-opacity-100'
              }`}
            >
              {platform.name}
            </motion.button>
          ))}
        </div>
      </div>

      <animated.div style={springProps as any} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Meta Title</label>
            <input
              type="text"
              value={config.meta?.title || ''}
              onChange={(e) => onUpdate({
                ...config,
                meta: {
                  title: e.target.value,
                  description: config.meta?.description || '',
                  image: config.meta?.image || ''
                }
              })}
              className="input-field"
              placeholder="Enter page title"
            />
            <p className="mt-1 text-sm text-white text-opacity-60">
              Recommended length: 50-60 characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Meta Description</label>
            <textarea
              value={config.meta?.description || ''}
              onChange={(e) => onUpdate({
                ...config,
                meta: {
                  title: config.meta?.title || '',
                  description: e.target.value,
                  image: config.meta?.image || ''
                }
              })}
              className="input-field h-24 resize-none"
              placeholder="Enter page description"
            />
            <p className="mt-1 text-sm text-white text-opacity-60">
              Recommended length: 150-160 characters
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Preview Image URL</label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={config.meta?.image || ''}
              onChange={(e) => onUpdate({
                ...config,
                meta: {
                  title: config.meta?.title || '',
                  description: config.meta?.description || '',
                  image: e.target.value
                }
              })}
              className="input-field flex-1"
              placeholder="https://example.com/image.jpg"
            />
            <button
              onClick={() => {/* Image upload handler */}}
              className="glass-button flex items-center"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg"></div>
          <div className="glass-panel rounded-lg p-6 relative">
            <h3 className="text-lg font-semibold text-white mb-4">Live Preview</h3>
            
            {activePreview === 'twitter' && (
              <div className="bg-[#15202B] rounded-lg p-4 shadow-lg">
                <div className="aspect-video bg-gray-800 rounded-lg mb-3 overflow-hidden">
                  {config.meta?.image ? (
                    <img 
                      src={config.meta.image} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      No image set
                    </div>
                  )}
                </div>
                <h4 className="text-white font-bold">{config.meta?.title || 'Your Page Title'}</h4>
                <p className="text-gray-400 text-sm mt-1">{config.meta?.description || 'Your page description will appear here'}</p>
                <div className="text-gray-500 text-sm mt-2">{previewUrl}</div>
              </div>
            )}

            {activePreview === 'facebook' && (
              <div className="bg-[#242526] rounded-lg p-4 shadow-lg">
                <div className="aspect-[1.91/1] bg-gray-800 rounded-lg mb-3 overflow-hidden">
                  {config.meta?.image ? (
                    <img 
                      src={config.meta.image} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      No image set
                    </div>
                  )}
                </div>
                <h4 className="text-white font-bold">{config.meta?.title || 'Your Page Title'}</h4>
                <p className="text-gray-400 text-sm mt-1">{config.meta?.description || 'Your page description will appear here'}</p>
                <div className="text-gray-500 text-sm mt-2">{previewUrl}</div>
              </div>
            )}

            {activePreview === 'linkedin' && (
              <div className="bg-white rounded-lg p-4 shadow-lg">
                <div className="aspect-[1.91/1] bg-gray-100 rounded-lg mb-3 overflow-hidden">
                  {config.meta?.image ? (
                    <img 
                      src={config.meta.image} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      No image set
                    </div>
                  )}
                </div>
                <h4 className="text-gray-900 font-bold">{config.meta?.title || 'Your Page Title'}</h4>
                <p className="text-gray-600 text-sm mt-1">{config.meta?.description || 'Your page description will appear here'}</p>
                <div className="text-gray-500 text-sm mt-2">{previewUrl}</div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-white border-opacity-10">
          <div className="text-sm text-white text-opacity-70">
            Preview updates in real-time
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass-button flex items-center"
            onClick={() => {
              playClick();
              // Copy meta tags to clipboard
              const metaTags = `
<meta property="og:title" content="${config.meta?.title || ''}" />
<meta property="og:description" content="${config.meta?.description || ''}" />
<meta property="og:image" content="${config.meta?.image || ''}" />
<meta property="og:url" content="${previewUrl}" />
<meta name="twitter:card" content="summary_large_image" />
              `.trim();
              navigator.clipboard.writeText(metaTags);
            }}
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
            Copy Meta Tags
          </motion.button>
        </div>
      </animated.div>
    </div>
  );
};

export default SocialPreviewCustomizer;