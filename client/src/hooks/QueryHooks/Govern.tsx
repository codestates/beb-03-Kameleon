import { useQuery } from 'react-query';
import { callContract } from '../../utils/KAS';
import { abiTable } from '../../constants';

type inputType = {
  key: string;
  refetchInterval?: number;
};

const GovernQueryHooks = ({ key, refetchInterval }: inputType) => {
  return useQuery<any, Error>(
    [key],
    async () => {
      try {
        const callResult = await callContract({
          contractName: 'Govern',
          contractAddress: '0xc4D89b7a642Fd54900106e6c9B00B59F0E24Dd6c',
          methodName: 'pollList',
        });
        const pollListTypeArray = abiTable['Govern'].filter(
          (v) => v['name'] === 'pollList'
        )[0]['outputs'][0]['components'];

        const objResult = callResult.map((v: string | boolean[]) => {
          const temp: { [x: string]: string | boolean } = {};
          pollListTypeArray.forEach(
            (value: { [x: string]: string }, idx: number) => {
              temp[value['name']] = v[idx];
            }
          );
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
export default GovernQueryHooks;
