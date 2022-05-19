/// <reference types="react-scripts" />

interface Window {
  klaytn: any;
}
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
    REACT_APP_MINIMUM_VOTING_PERCENTAGE: string;
    REACT_APP_GOVERN: string;
  }
}
