import React from 'react';
import { motion } from 'framer-motion';
import { UserConfig, YodlConfig } from '../types';
import useSound from 'use-sound';

interface Props {
  config: UserConfig;
  onUpdate: (config: UserConfig) => void;
}

const YodlConfigForm: React.FC<Props> = ({ config, onUpdate }) => {
  const [playHover] = useSound('/hover.mp3', { volume: 0.5 });
  const [playClick] = useSound('/click.mp3', { volume: 0.3 });

  const handleYodlUpdate = (updates: Partial<YodlConfig>) => {
    onUpdate({
      ...config,
      yodl: {
        ...config.yodl,
        ...updates
      }
    });
  };

  const supportedTokens = ['USDC', 'USDT', 'DAI', 'USDGLO', 'USDM', 'CRVUSD', 'XDAI', 'WXDAI'];
  const supportedChains = [
    { id: 'eth', name: 'Ethereum Mainnet' },
    { id: 'base', name: 'Base' },
    { id: 'oeth', name: 'Optimism' },
    { id: 'gno', name: 'Gnosis Chain' },
    { id: 'pol', name: 'Polygon' },
    { id: 'arb1', name: 'Arbitrum One' }
  ];
  const supportedCurrencies = ['USD', 'CHF', 'EUR', 'GBP'];

  return (
    <div className="glass-panel rounded-xl p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          Yodl Payment Configuration
        </h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-white mb-2">Accepted Tokens</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {supportedTokens.map((token) => (
              <motion.button
                key={token}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playClick();
                  const currentTokens = config.yodl?.tokens?.split(',') || [];
                  const newTokens = currentTokens.includes(token)
                    ? currentTokens.filter(t => t !== token)
                    : [...currentTokens, token];
                  handleYodlUpdate({ tokens: newTokens.join(',') });
                }}
                onMouseEnter={() => playHover()}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  config.yodl?.tokens?.includes(token)
                    ? 'bg-white bg-opacity-20 text-white shadow-glow'
                    : 'bg-white bg-opacity-5 text-white text-opacity-60 hover:bg-opacity-10'
                }`}
              >
                {token}
              </motion.button>
            ))}
          </div>
          <p className="mt-1 text-sm text-white text-opacity-60">
            Select the tokens you want to accept as payment
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Supported Chains</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {supportedChains.map((chain) => (
              <motion.button
                key={chain.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  playClick();
                  const currentChains = config.yodl?.chains?.split(',') || [];
                  const newChains = currentChains.includes(chain.id)
                    ? currentChains.filter(c => c !== chain.id)
                    : [...currentChains, chain.id];
                  handleYodlUpdate({ chains: newChains.join(',') });
                }}
                onMouseEnter={() => playHover()}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${
                  config.yodl?.chains?.includes(chain.id)
                    ? 'bg-white bg-opacity-20 text-white shadow-glow'
                    : 'bg-white bg-opacity-5 text-white text-opacity-60 hover:bg-opacity-10'
                }`}
              >
                <span>{chain.name}</span>
                {config.yodl?.chains?.includes(chain.id) && (
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Currency</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {supportedCurrencies.map((currency) => (
              <motion.button
                key={currency}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playClick();
                  handleYodlUpdate({ currency });
                }}
                onMouseEnter={() => playHover()}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  config.yodl?.currency === currency
                    ? 'bg-white bg-opacity-20 text-white shadow-glow'
                    : 'bg-white bg-opacity-5 text-white text-opacity-60 hover:bg-opacity-10'
                }`}
              >
                {currency}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Fixed Amount (Optional)</label>
          <div className="flex space-x-2">
            <input
              type="number"
              value={config.yodl?.amount || ''}
              onChange={(e) => handleYodlUpdate({ amount: e.target.value })}
              placeholder="Enter fixed amount"
              className="input-field"
              step="0.01"
            />
            <span className="inline-flex items-center px-3 text-sm text-white text-opacity-70">
              {config.yodl?.currency || 'USD'}
            </span>
          </div>
          <p className="mt-1 text-sm text-white text-opacity-60">
            Leave empty for user-defined amounts
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Transaction Memo (Optional)</label>
          <input
            type="text"
            value={config.yodl?.memo || ''}
            onChange={(e) => handleYodlUpdate({ memo: e.target.value })}
            placeholder="e.g., INVOICE-123 or order_id"
            className="input-field"
          />
          <p className="mt-1 text-sm text-white text-opacity-60">
            Used for order/invoice matching
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Webhook URLs (Optional)</label>
          <div className="space-y-2">
            {(config.yodl?.webhooks || ['']).map((webhook, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  type="url"
                  value={webhook}
                  onChange={(e) => {
                    const newWebhooks = [...(config.yodl?.webhooks || [''])];
                    newWebhooks[index] = e.target.value;
                    handleYodlUpdate({ webhooks: newWebhooks });
                  }}
                  placeholder="https://example.com/webhook"
                  className="input-field flex-1"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    playClick();
                    const newWebhooks = [...(config.yodl?.webhooks || [''])];
                    if (newWebhooks.length > 1) {
                      newWebhooks.splice(index, 1);
                    } else {
                      newWebhooks[0] = '';
                    }
                    handleYodlUpdate({ webhooks: newWebhooks });
                  }}
                  className="glass-button"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.button>
              </div>
            ))}
            {(config.yodl?.webhooks?.length || 0) < 5 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playClick();
                  const newWebhooks = [...(config.yodl?.webhooks || []), ''];
                  handleYodlUpdate({ webhooks: newWebhooks });
                }}
                className="glass-button w-full mt-2"
              >
                Add Webhook URL
              </motion.button>
            )}
          </div>
          <p className="mt-1 text-sm text-white text-opacity-60">
            Maximum 5 webhook URLs
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-white border-opacity-10">
        <div className="text-sm text-white text-opacity-70">
          Configuration will be stored in ENS Text record as 'me.yodl'
        </div>
      </div>
    </div>
  );
};

export default YodlConfigForm;