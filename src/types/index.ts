export interface ButtonStyle {
  backgroundColor: string;
  textColor: string;
  borderRadius: string;
  fontSize: string;
  padding: string;
  buttonText: string;
}

export interface ThankYouPageStyle {
  backgroundColor: string;
  textColor: string;
  message: string;
  showConfetti: boolean;
}

export interface MetaConfig {
  title: string;
  description: string;
  image: string;
}

export interface YodlConfig {
  tokens?: string;
  chains?: string;
  currency?: string;
  amount?: string;
  memo?: string;
  webhooks?: string[];
}

export interface UserConfig {
  ensNameOrAddress: string;
  buttonStyle: ButtonStyle;
  thankYouPage: ThankYouPageStyle;
  slug: string;
  title?: string;
  description?: string;
  meta?: MetaConfig;
  yodl?: YodlConfig;
}