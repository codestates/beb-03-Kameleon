import React from 'react';
import { StockLogoStyle } from './StockLogo.style';
import { logoTable } from '../../constants';

const StockLogo = ({ stockName }: { stockName: any }) => {
  return (
    <StockLogoStyle
      src={process.env.PUBLIC_URL + `/stockLogo/${logoTable[stockName]}`}
    />
  );
};

export default StockLogo;
