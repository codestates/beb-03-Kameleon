import { useQuery } from 'react-query';
import { callContract } from '../../utils/KAS';
import { abiTable, contractAddressTable } from '../../constants';
import {
  getMethodReturnStructType,
  getParsedDataFromUsingMethodType,
} from '../../utils/abiTypeFilter';

type inputType = {
  key: string;
  refetchInterval?: number;
};

const GovernQueryHooks = ({ key, refetchInterval }: inputType) => {
  return useQuery<any, Error>(
    [key],
    async () => {
      try {
        // const pollLength = await callContract({
        //   contractName: 'Govern',
        //   contractAddress: '0xb2E88b76B4Cb52cA5D655341E1c0626B49FAF3C2',
        //   methodName: 'getPollsLength',
        // });
        // console.log('pollLength', typeof pollLength);
        // // 0 이상인 시작 값 부터 10개 가져온다
        // const startPollIndex = +pollLength > 10 ? +pollLength - 10 : 0;
        // const callResult = await callContract({
        //   contractName: 'Govern',
        //   contractAddress: '0xb2E88b76B4Cb52cA5D655341E1c0626B49FAF3C2',
        //   methodName: 'pollListPagenation',
        //   parameters: [startPollIndex],
        // });
        const callResult = await callContract({
          contractName: 'Govern',
          contractAddress: contractAddressTable['Govern'],
          methodName: 'pollList',
        });
        const totalSupplyResult = await callContract({
          contractName: 'Govern',
          contractAddress: contractAddressTable['Govern'],
          methodName: 'getTotalSupply',
        });
        const pollListTypeArray = getMethodReturnStructType({
          contractName: 'Govern',
          methodName: 'pollList',
        });
        const objResult = callResult.map((v: string | boolean[]) => {
          const temp = getParsedDataFromUsingMethodType({
            type: pollListTypeArray,
            value: v,
            totalSupply: totalSupplyResult,
          });
          return temp;
        });
        console.log(objResult);
        return objResult;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
    {
      refetchInterval,
    }
  );
};

type WithdrawableBalanceType = {
  key: string;
  pollId: string;
  refetchInterval?: number;
};

const WithdrawableBalanceQueryHooks = ({
  key,
  pollId,
  refetchInterval,
}: WithdrawableBalanceType) => {
  return useQuery<number, Error>(
    ['WithdrawableBalanceQueryHooks', key],
    async (): Promise<number> => {
      try {
        const callResult = await callContract({
          contractName: 'Govern',
          contractAddress: contractAddressTable['Govern'],
          methodName: 'withdrawableBalance',
          parameters: [+pollId],
          kaikas: true,
        });
        console.log('withdrawableBalance', callResult, pollId);
        return callResult / 10 ** 18;
      } catch (error) {
        console.log(error);
        return -1;
      }
    },
    {
      refetchInterval,
    }
  );
};

const TotalStakedBalanceHooks = ({
  key,
  refetchInterval = undefined,
}: {
  key: number | string;
  refetchInterval?: number | undefined;
}) => {
  return useQuery<number, Error>(
    ['totalStakedBalanceHooks', key],
    async (): Promise<number> => {
      try {
        const governAddress = contractAddressTable['Govern'];
        const result = await callContract({
          contractName: 'Kameleon',
          contractAddress: '0xd0a62633f9e77a5fe27ed733c4938fb38cfbeea1',
          methodName: 'balanceOf',
          parameters: [governAddress],
        });
        return +result / 10 ** 18;
      } catch (error) {
        console.log(error);
        return 0;
      }
    },
    {
      refetchInterval,
    }
  );
};

export {
  GovernQueryHooks,
  WithdrawableBalanceQueryHooks,
  TotalStakedBalanceHooks,
};
