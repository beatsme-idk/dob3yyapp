import React, { useState, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { UserConfig } from '../types';
import toast from 'react-hot-toast';
import YodlConfigForm from './YodlConfigForm';
import SocialPreviewCustomizer from './SocialPreviewCustomizer';
import { Tooltip } from 'react-tooltip';
import { motion, AnimatePresence } from 'framer-motion';
import QRCode from 'react-qr-code';
import useSound from 'use-sound';
import {
  CogIcon,
  PaintBrushIcon,
  HeartIcon,
  CurrencyDollarIcon,
  ShareIcon,
  QuestionMarkCircleIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';

interface Props {
  onSave: (config: UserConfig) => void;
}

const ConfigurationForm: React.FC<Props> = ({ onSave }) => {
  const [config, setConfig] = useState<UserConfig>({
    ensNameOrAddress: '',
    slug: '',
    buttonStyle: {
      backgroundColor: '#4F46E5',
      textColor: '#FFFFFF',
      borderRadius: '12px',
      fontSize: '16px',
      padding: '12px 24px',
      buttonText: 'Buy me a coffee ☕'
    },
    thankYouPage: {
      backgroundColor: '#4F46E5',
      textColor: '#FFFFFF',
      message: 'Thank you for your support! 🎉',
      showConfetti: true
    }
  });

  // Auto-generate slug from ENS name or address
  useEffect(() => {
    if (config.ensNameOrAddress && !config.slug) {
      const autoSlug = config.ensNameOrAddress
        .toLowerCase()
        .replace('.eth', '')
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      setConfig(prev => ({ ...prev, slug: autoSlug }));
    }
  }, [config.ensNameOrAddress]);

  const [activeTab, setActiveTab] = useState('basic');
  const [animateButton, setAnimateButton] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [playHover] = useSound('/hover.mp3', { volume: 0.5 });
  const [playClick] = useSound('/click.mp3', { volume: 0.3 });

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: CogIcon, tooltip: 'Configure basic payment settings' },
    { id: 'button', label: 'Button Style', icon: PaintBrushIcon, tooltip: 'Customize your payment button' },
    { id: 'thankYou', label: 'Thank You', icon: HeartIcon, tooltip: 'Design your thank you page' },
    { id: 'yodl', label: 'Yodl Config', icon: CurrencyDollarIcon, tooltip: 'Set up Yodl payment options' },
    { id: 'social', label: 'Social', icon: ShareIcon, tooltip: 'Customize social media previews' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!config.ensNameOrAddress) {
      toast.error('Please enter an ENS name or address');
      return;
    }

    if (!config.slug) {
      toast.error('Please enter a URL slug');
      return;
    }

    setAnimateButton(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600));
      onSave(config);
      toast.success('Configuration saved successfully! 🎉');
      
      // Show QR code after successful save
      setShowQR(true);
    } catch (error) {
      toast.error('Failed to save configuration');
    } finally {
      setAnimateButton(false);
    }
  };

  const previewUrl = `https://dob3y-yapp.netlify.app/${config.slug}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent pb-2">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setActiveTab(tab.id);
              playClick();
            }}
            onMouseEnter={() => playHover()}
            className={`flex items-center px-4 py-2 rounded-lg mr-2 transition-all ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
            }`}
            data-tooltip-id={`tab-tooltip-${tab.id}`}
          >
            <tab.icon className="w-5 h-5 mr-2" />
            {tab.label}
            <Tooltip id={`tab-tooltip-${tab.id}`} content={tab.tooltip} />
          </motion.button>
        ))}
      </div>

      {/* Tab Content with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-center mb-4">
                  <LightBulbIcon className="w-6 h-6 text-yellow-500 mr-2" />
                  <h3 className="text-lg font-semibold text-white">Quick Tips</h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-center">
                    <QuestionMarkCircleIcon className="w-4 h-4 mr-2 text-indigo-400" />
                    Use a memorable slug for easy sharing
                  </li>
                  <li className="flex items-center">
                    <QuestionMarkCircleIcon className="w-4 h-4 mr-2 text-indigo-400" />
                    Your ENS name makes your page more recognizable
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-1">ENS Name or Address</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={config.ensNameOrAddress}
                      onChange={(e) => setConfig({
                        ...config,
                        ensNameOrAddress: e.target.value
                      })}
                      className="w-full bg-slate-800/30 border border-slate-700/50 rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="vitalik.eth or 0x..."
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <QuestionMarkCircleIcon 
                        className="w-5 h-5 text-slate-400 cursor-help"
                        data-tooltip-id="ens-tooltip"
                      />
                    </div>
                  </div>
                  <Tooltip id="ens-tooltip" content="Enter your ENS name or Ethereum address to receive payments" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-1">URL Slug</label>
                  <div className="flex rounded-lg shadow-sm">
                    <span className="inline-flex items-center px-4 bg-slate-800/50 border border-r-0 border-slate-700/50 rounded-l-lg text-slate-400">
                      dob3y-yapp.netlify.app/
                    </span>
                    <input
                      type="text"
                      value={config.slug}
                      onChange={(e) => setConfig({
                        ...config,
                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')
                      })}
                      className="flex-1 bg-slate-800/30 border border-slate-700/50 rounded-none rounded-r-lg px-4 py-2.5 text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="your-unique-slug"
                    />
                  </div>
                  <p className="mt-1 text-sm text-slate-400">
                    Automatically generated from your ENS/address. You can customize it if you prefer.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'button' && (
            <div className="space-y-6">
              <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">Button Preview</h3>
                <div className="flex items-center justify-center p-8 bg-slate-900/50 rounded-lg">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    style={{
                      backgroundColor: config.buttonStyle.backgroundColor,
                      color: config.buttonStyle.textColor,
                      borderRadius: config.buttonStyle.borderRadius,
                      fontSize: config.buttonStyle.fontSize,
                      padding: config.buttonStyle.padding,
                    }}
                    className="shadow-lg transition-all"
                  >
                    {config.buttonStyle.buttonText}
                  </motion.button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Background Color</label>
                  <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                    <HexColorPicker
                      color={config.buttonStyle.backgroundColor}
                      onChange={(color) => setConfig({
                        ...config,
                        buttonStyle: {
                          ...config.buttonStyle,
                          backgroundColor: color
                        }
                      })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Text Color</label>
                  <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                    <HexColorPicker
                      color={config.buttonStyle.textColor}
                      onChange={(color) => setConfig({
                        ...config,
                        buttonStyle: {
                          ...config.buttonStyle,
                          textColor: color
                        }
                      })}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Button Text</label>
                <input
                  type="text"
                  value={config.buttonStyle.buttonText}
                  onChange={(e) => setConfig({
                    ...config,
                    buttonStyle: {
                      ...config.buttonStyle,
                      buttonText: e.target.value
                    }
                  })}
                  className="w-full bg-slate-800/30 border border-slate-700/50 rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Border Radius</label>
                  <input
                    type="range"
                    min="0"
                    max="24"
                    value={parseInt(config.buttonStyle.borderRadius)}
                    onChange={(e) => setConfig({
                      ...config,
                      buttonStyle: {
                        ...config.buttonStyle,
                        borderRadius: `${e.target.value}px`
                      }
                    })}
                    className="w-full"
                  />
                  <div className="text-sm text-slate-400 mt-1">
                    {config.buttonStyle.borderRadius}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Font Size</label>
                  <input
                    type="range"
                    min="12"
                    max="24"
                    value={parseInt(config.buttonStyle.fontSize)}
                    onChange={(e) => setConfig({
                      ...config,
                      buttonStyle: {
                        ...config.buttonStyle,
                        fontSize: `${e.target.value}px`
                      }
                    })}
                    className="w-full"
                  />
                  <div className="text-sm text-slate-400 mt-1">
                    {config.buttonStyle.fontSize}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'thankYou' && (
            <div className="space-y-6">
              <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">Thank You Page Preview</h3>
                <div 
                  className="p-8 rounded-lg text-center"
                  style={{
                    backgroundColor: config.thankYouPage.backgroundColor,
                    color: config.thankYouPage.textColor
                  }}
                >
                  <h4 className="text-2xl font-bold mb-4">{config.thankYouPage.message}</h4>
                  <p className="opacity-80">Transaction completed successfully!</p>
                  {config.thankYouPage.showConfetti && (
                    <div className="mt-4 text-sm">✨ Confetti will appear here ✨</div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Thank You Message</label>
                <textarea
                  value={config.thankYouPage.message}
                  onChange={(e) => setConfig({
                    ...config,
                    thankYouPage: {
                      ...config.thankYouPage,
                      message: e.target.value
                    }
                  })}
                  className="w-full bg-slate-800/30 border border-slate-700/50 rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Background Color</label>
                  <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                    <HexColorPicker
                      color={config.thankYouPage.backgroundColor}
                      onChange={(color) => setConfig({
                        ...config,
                        thankYouPage: {
                          ...config.thankYouPage,
                          backgroundColor: color
                        }
                      })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Text Color</label>
                  <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                    <HexColorPicker
                      color={config.thankYouPage.textColor}
                      onChange={(color) => setConfig({
                        ...config,
                        thankYouPage: {
                          ...config.thankYouPage,
                          textColor: color
                        }
                      })}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={config.thankYouPage.showConfetti}
                      onChange={(e) => setConfig({
                        ...config,
                        thankYouPage: {
                          ...config.thankYouPage,
                          showConfetti: e.target.checked
                        }
                      })}
                      className="sr-only"
                    />
                    <div className={`w-14 h-7 rounded-full transition-colors duration-300 ${
                      config.thankYouPage.showConfetti ? 'bg-indigo-600' : 'bg-slate-700'
                    }`}>
                      <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform duration-300 ${
                        config.thankYouPage.showConfetti ? 'transform translate-x-7' : ''
                      }`} />
                    </div>
                  </div>
                  <span className="ml-3 text-white">Show confetti animation</span>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'yodl' && (
            <YodlConfigForm config={config} onUpdate={setConfig} />
          )}

          {activeTab === 'social' && (
            <SocialPreviewCustomizer config={config} onUpdate={setConfig} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Save Button */}
      <div className="sticky bottom-0 bg-slate-900/80 backdrop-blur-xl p-4 -mx-8 mt-8">
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg transition-all ${
            animateButton ? 'animate-pulse' : ''
          }`}
        >
          <span className="flex items-center justify-center">
            {animateButton ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Saving Configuration...
              </>
            ) : (
              'Save Configuration'
            )}
          </span>
        </motion.button>
      </div>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowQR(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 p-6 rounded-xl shadow-xl max-w-sm w-full mx-4"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-4">Share Your Payment Page</h3>
              <div className="bg-white p-4 rounded-lg mb-4">
                <QRCode value={previewUrl} className="w-full h-auto" />
              </div>
              <p className="text-sm text-slate-300 mb-4">
                Scan this QR code or share the link below:
              </p>
              <div className="flex">
                <input
                  type="text"
                  value={previewUrl}
                  readOnly
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-l-lg px-3 py-2 text-white text-sm"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(previewUrl);
                    toast.success('Link copied to clipboard!');
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 rounded-r-lg"
                >
                  Copy
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

export default ConfigurationForm;