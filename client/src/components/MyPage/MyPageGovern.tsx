import React from 'react';
import Moment from 'react-moment';
import { contractAddressTable } from '../../constants';
import { MyPageItem, MyPageBar } from '../../pages/styles/MyPage.styles';
import { IGovernType } from '../../types/components/Govern.types';
import {
  getMethodReturnStructType,
  getParsedDataFromUsingMethodType,
} from '../../utils/abiTypeFilter';
import { callContract } from '../../utils/KAS';

interface newGovernType extends IGovernType {
  withdrawableBalance: string;
}

const MyPageGovern = () => {
  const [governList, setGovernList] = React.useState<newGovernType[]>([]);
  React.useEffect(() => {
    const test = async () => {
      try {
        const getPollsLength = await callContract({
          contractName: 'Govern',
          contractAddress: contractAddressTable['Govern'],
          methodName: 'getPollsLength',
        });
        console.log('getPollsLength : ', getPollsLength);
        const result: Array<newGovernType> = [];
        const type = getMethodReturnStructType({
          contractName: 'Govern',
          methodName: 'getPollState',
        });
        for (let i = getPollsLength - 1; i >= 0; i--) {
          const [pollState, withdrawableBalance, totalSupply] =
            await Promise.all([
              await callContract({
                contractName: 'Govern',
                contractAddress: contractAddressTable['Govern'],
                methodName: 'getPollState',
                parameters: [i],
              }),
              await callContract({
                contractName: 'Govern',
                contractAddress: contractAddressTable['Govern'],
                methodName: 'withdrawableBalance',
                parameters: [i],
                kaikas: true,
              }),
              await callContract({
                contractName: 'Govern',
                contractAddress: contractAddressTable['Govern'],
                methodName: 'getTotalSupply',
              }),
            ]);
          const pollStateObj: any = getParsedDataFromUsingMethodType({
            type,
            value: pollState,
            totalSupply,
          });
          pollStateObj['withdrawableBalance'] = withdrawableBalance;
          console.log('test : type', pollStateObj);
          if (withdrawableBalance > 0) {
            result.push(pollStateObj);
          }
        }
        setGovernList(result);
      } catch (error) {
        console.log(error);
      }
    };
    test();
  }, []);
  return (
    <>
      {governList.map(
        ({ title, agree, disagree, endTime, totalSupply }: newGovernType) => {
          return (
            <MyPageItem>
              <div>{title}</div>
              <MyPageBar yes={+agree} no={+disagree} totalSupply={totalSupply}>
                <div></div>
                <div></div>
              </MyPageBar>
              <div>
                <Moment fromNow>{+endTime * 1000}</Moment>
              </div>
            </MyPageItem>
          );
        }
      )}
    </>
  );
};
export default MyPageGovern;
