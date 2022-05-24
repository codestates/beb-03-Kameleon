import React from 'react';
import { MyPageItem } from '../../pages/styles/MyPage.styles';
import axios from 'axios';
import { exchangeAddressTable } from '../../constants';
import { PoolListProps } from '../../pages/MyPage';

const MyPagePoolItem = ({ id, name, balance }: PoolListProps) => {
  const [roi, setRoi] = React.useState<number>(0);
  React.useEffect(() => {
    const getPoolRoi = async () => {
      const {
        data: { success, data },
      } = await axios.get(`http://localhost:4001/api/contract/getPoolRoi`, {
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
      <div>{name}</div>
      <div className="main__oracle">{balance}</div>
      <div>no</div>
      <div>{roi}%</div>
    </MyPageItem>
  );
};
export default MyPagePoolItem;