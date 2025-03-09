import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ConfigurationForm from './components/ConfigurationForm';
import PreviewCard from './components/PreviewCard';
import PaymentButton from './components/PaymentButton';
import { UserConfig } from './types';

export default function App() {
  const [config, setConfig] = useState<UserConfig | null>(() => {
    // Try to load config from localStorage
    const savedConfig = localStorage.getItem('yodl_config');
    return savedConfig ? JSON.parse(savedConfig) : null;
  });

  const handleConfigSave = (newConfig: UserConfig) => {
    setConfig(newConfig);
    // Save to localStorage
    localStorage.setItem('yodl_config', JSON.stringify(newConfig));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950">
        <Toaster 
          position="top-right" 
          toastOptions={{
            style: {
              background: '#1e293b',
              color: '#e2e8f0',
              borderRadius: '0.75rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            },
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: '#FFFFFF',
              },
            },
          }}
        />
        
        <Routes>
          <Route path="/" element={
            <>
              <header className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700/50 py-4 sticky top-0 z-10">
                <div className="container mx-auto px-4">
                  <h1 className="text-2xl font-bold text-slate-100 flex items-center">
                    <span className="mr-2">✨</span> 
                    Payment Configuration
                    <span className="ml-2 text-xs bg-slate-700/50 px-3 py-1 rounded-full font-medium">Beta</span>
                  </h1>
                </div>
              </header>
              
              <main className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                  <div className="bg-slate-800/30 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-slate-700/50">
                    <div className="md:flex">
                      <div className="md:w-1/2 p-6 md:p-8 border-r border-slate-700/50">
                        <h2 className="text-xl font-semibold mb-6 text-slate-100 flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                          </svg>
                          Configure Your Payment Page
                        </h2>
                        <ConfigurationForm onSave={handleConfigSave} />
                      </div>
                      <div className="md:w-1/2 p-6 md:p-8 bg-slate-900/50">
                        <h2 className="text-xl font-semibold mb-6 text-slate-100 flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                          Preview
                        </h2>
                        {config ? (
                          <div className="animate-fade-in">
                            <PreviewCard config={config} />
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-64 border-2 border-dashed border-slate-700/50 rounded-lg text-slate-400">
                            <div className="text-center">
                              <svg className="w-12 h-12 mx-auto mb-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <p>Configure your payment page to see a preview</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </main>
              
              <footer className="bg-slate-900/50 backdrop-blur-xl border-t border-slate-800/50 py-4 mt-auto">
                <div className="container mx-auto px-4 text-center text-slate-400 text-sm">
                  <div className="flex justify-center space-x-4 mb-2">
                    <a href="#" className="hover:text-slate-100 transition-colors">About</a>
                    <a href="#" className="hover:text-slate-100 transition-colors">Documentation</a>
                    <a href="#" className="hover:text-slate-100 transition-colors">Support</a>
                  </div>
                  © {new Date().getFullYear()} Payment Configuration Tool. All rights reserved.
                </div>
              </footer>
            </>
          } />

          <Route path="/:slug" element={
            <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 flex items-center justify-center p-4">
              <div className="w-full max-w-4xl mx-auto">
                <PaymentButton config={config || {
                  ensNameOrAddress: '',
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
                  },
                  slug: ''
                }} />
              </div>
            </div>
          } />

          <Route path="*" element={
            <div className="text-center py-12 bg-slate-800/30 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-700/50 max-w-md mx-auto">
              <svg className="w-16 h-16 mx-auto mb-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-2xl font-bold text-slate-100 mb-2">Page Not Found</h2>
              <p className="text-slate-400 mb-6">The page you are looking for doesn't exist or has been moved.</p>
              <a href="/" className="inline-flex items-center px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-all transform hover:scale-105">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Return Home
              </a>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}