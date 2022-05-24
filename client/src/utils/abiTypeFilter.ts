import { abiTable } from '../constants';

export const getMethodReturnStructType = ({
  contractName,
  methodName,
}: {
  contractName: string;
  methodName: string;
}) => {
  const result = abiTable[contractName].filter(
    (v) => v['name'] === methodName
  )[0]['outputs'][0]['components'];
  return result;
};

export const getParsedDataFromUsingMethodType = ({
  type,
  value: v,
  totalSupply = undefined,
}: {
  type: Array<{ name: string; method: string }>;
  value: string | boolean[];
  totalSupply?: undefined | string;
}) => {
  const temp: { [x: string]: string | number | boolean } = {};
  type.forEach((value: { [x: string]: string }, idx: number) => {
    temp[value['name']] = v[idx];
  });
  if (totalSupply !== undefined) {
    temp['totalSupply'] = totalSupply;
  }
  return temp;
};
