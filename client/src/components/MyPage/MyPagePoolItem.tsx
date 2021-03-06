import React from 'react';
import { MyPageItem } from '../../pages/styles/MyPage.styles';
import axios from 'axios';
import { exchangeAddressTable } from '../../constants';
import { PoolListProps } from '../../pages/MyPage';
import { useNavigate } from 'react-router-dom';
import StockLogo from '../../components/StockLogo/StockLogo';
import { useDispatch } from 'react-redux';
import { onSelectNav } from '../../store/user';

const MyPagePoolItem = ({ id, name, lpToken, balance }: PoolListProps) => {
  const [roi, setRoi] = React.useState<number>(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    dispatch(onSelectNav('pool'));
  };

  return (
    <MyPageItem onClick={onClickHandler} key={id}>
      <div>
        <StockLogo stockName={name} />
        {name} {' <-> '} <StockLogo stockName={'KLAY'} />
        {'KLAY'}
      </div>
      <div>{lpToken} LPT</div>
      <div className="pool__balance">{balance}</div>
      <div>{roi}%</div>
    </MyPageItem>
  );
};
export default MyPagePoolItem;
