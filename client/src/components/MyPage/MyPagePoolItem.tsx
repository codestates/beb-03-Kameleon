import React from 'react';
import { MyPageItem } from '../../pages/styles/MyPage.styles';
import axios from 'axios';
import { exchangeAddressTable } from '../../constants';
import { PoolListProps } from '../../pages/MyPage';

const MyPagePoolItem = ({ id, name, lpToken, balance }: PoolListProps) => {
  const [roi, setRoi] = React.useState<number>(0);
  React.useEffect(() => {
    const getPoolRoi = async () => {
      const {
        data: { success, data },
      } = await axios.get(`/api/contract/getPoolRoi`, {
        params: {
          exchangeAddress: exchangeAddressTable[name],
        },
      });
      if (success === true) {
        setRoi(data.roi);
      }
    };
    getPoolRoi();
  }, [name]);

  return (
    <MyPageItem key={id}>
      <div>
        {name} {'<-> KLAY'}
      </div>
      <div className="main__oracle">{lpToken} LPT</div>
      <div>{balance}</div>
      <div>{roi}%</div>
    </MyPageItem>
  );
};
export default MyPagePoolItem;
