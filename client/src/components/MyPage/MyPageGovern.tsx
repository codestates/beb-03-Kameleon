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

const MyPageGovern = () => {
  const [governList, setGovernList] = React.useState<IGovernType[]>([]);
  React.useEffect(() => {
    const test = async () => {
      try {
        const getPollsLength = await callContract({
          contractName: 'Govern',
          contractAddress: contractAddressTable['Govern'],
          methodName: 'getPollsLength',
        });
        console.log('getPollsLength : ', getPollsLength);
        const result: Array<IGovernType> = [];
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
          const pollStateObj: IGovernType = getParsedDataFromUsingMethodType({
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
        ({
          pollId,
          title,
          agree,
          disagree,
          endTime,
          totalSupply,
        }: IGovernType) => {
          return (
            <MyPageItem key={'myPageItem' + title}>
              <div>{title}</div>
              <MyPageBar
                className="mypage__bar"
                yes={agree as number}
                no={disagree as number}
                totalSupply={totalSupply as string}
              >
                <div></div>
                <div></div>
              </MyPageBar>
              <div>
                <Moment fromNow>
                  {+(endTime as unknown as number) * 1000}
                </Moment>
              </div>
            </MyPageItem>
          );
        }
      )}
    </>
  );
};
export default MyPageGovern;
