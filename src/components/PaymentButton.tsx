import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { UserConfig } from '../types';

interface Props {
  config: UserConfig;
}

const PaymentButton: React.FC<Props> = ({ config }) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { slug } = useParams();
  const isPreview = location.pathname === '/';

  const handlePayment = () => {
    if (isPreview) {
      return; // Don't redirect if in preview mode
    }
    
    setIsLoading(true);
    
    try {
      // Construct base Yodl URL with the configured address
      const yodlUrl = new URL(`https://yodl.me/${config.ensNameOrAddress}`);
      
      // Add query parameters if they exist
      if (config.yodl?.tokens) {
        yodlUrl.searchParams.set('tokens', config.yodl.tokens);
      }
      
      if (config.yodl?.chains) {
        yodlUrl.searchParams.set('chains', config.yodl.chains);
      }

      // Add redirect URL for the user's custom thank you page
      // Use the actual slug from the URL or config
      const currentSlug = slug || config.slug;
      const redirectUrl = new URL(`${currentSlug}/thank-you`, window.location.origin);
      yodlUrl.searchParams.set('redirectURL', redirectUrl.toString());

      // Redirect to Yodl with the complete URL
      window.location.href = yodlUrl.toString();
    } catch (error) {
      console.error('Error constructing Yodl URL:', error);
      setIsLoading(false);
    }
  };

  const containerClasses = `
    max-w-md w-full mx-auto 
    bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg 
    rounded-2xl shadow-xl overflow-hidden 
    border border-white border-opacity-20
  `;

  const headerClasses = `
    relative
    bg-gradient-to-r from-purple-600 to-pink-500 
    px-6 py-4
  `;

  const contentClasses = `p-6`;

  return (
    <div className={containerClasses}>
      <div className={headerClasses}>
        <h2 className="text-xl font-bold text-white flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {config.title || 'Make a Payment'}
        </h2>
      </div>
      
      <div className={contentClasses}>
        <div className="text-center mb-6">
          <p className="text-white text-opacity-80 mb-4">
            {config.description || 'Support by sending crypto'}
          </p>
          
          <div className="bg-black bg-opacity-20 p-6 rounded-lg mb-6 border border-white border-opacity-10">
            <div className="flex justify-between mb-3 items-center">
              <span className="text-white text-opacity-70">Recipient:</span>
              <span className="font-medium text-white truncate ml-2">{config.ensNameOrAddress}</span>
            </div>
            {config.yodl?.tokens && (
              <div className="flex justify-between mb-3 items-center">
                <span className="text-white text-opacity-70">Accepted Tokens:</span>
                <span className="font-medium text-white truncate ml-2">{config.yodl.tokens.split(',').join(', ')}</span>
              </div>
            )}
            {config.yodl?.chains && (
              <div className="flex justify-between mb-3 items-center">
                <span className="text-white text-opacity-70">Networks:</span>
                <span className="font-medium text-white truncate ml-2">{config.yodl.chains.split(',').join(', ')}</span>
              </div>
            )}
          </div>
          
          <button
            onClick={handlePayment}
            disabled={isLoading || isPreview}
            style={{
              backgroundColor: config.buttonStyle.backgroundColor,
              color: config.buttonStyle.textColor,
              borderRadius: config.buttonStyle.borderRadius,
              fontSize: config.buttonStyle.fontSize,
              padding: config.buttonStyle.padding,
              cursor: isPreview ? 'default' : 'pointer',
              opacity: isPreview ? '0.7' : '1'
            }}
            className="w-full flex items-center justify-center focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Redirecting to Yodl...
              </>
            ) : (
              <>
                {isPreview ? 'Preview Mode' : (
                  <div className="flex items-center">
                    <span className="mr-2">
                      {config.buttonStyle.buttonText}
                    </span>
                    <svg 
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                )}
              </>
            )}
          </button>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-white text-opacity-50">
            Powered by Yodl - Secure crypto payments
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentButton;