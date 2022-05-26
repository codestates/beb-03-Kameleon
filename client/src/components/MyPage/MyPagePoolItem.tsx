import React from 'react';
import { MyPageItem } from '../../pages/styles/MyPage.styles';
import axios from 'axios';
import { exchangeAddressTable } from '../../constants';
import { PoolListProps } from '../../pages/MyPage';
import { useNavigate } from 'react-router-dom';

const MyPagePoolItem = ({ id, name, lpToken, balance }: PoolListProps) => {
  const [roi, setRoi] = React.useState<number>(0);
  const navigate = useNavigate();

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
  const onClickHandler = () => {
    navigate(`/liquidity/${name}`);
  };

  return (
    <MyPageItem onClick={onClickHandler} key={id}>
      <div>{name}</div>
      <div className="main__oracle">{lpToken} LPT</div>
      <div>{balance}</div>
      <div>{roi}%</div>
    </MyPageItem>
  );
};
export default MyPagePoolItem;
