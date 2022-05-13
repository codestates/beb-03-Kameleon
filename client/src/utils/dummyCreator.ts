const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const createTokenList = (len: number) => {
  const tokenList = new Array(len);

  for (let i = 0; i < len; i++) {
    const token = {
      id: i,
      name: '(주)' + getRandomInt(1, 2000),
      oraclePrice: getRandomInt(0, 100000),
      usdPrice: getRandomInt(0, 100000),
      krwPrice: getRandomInt(0, 100000),
      change: getRandomInt(-100, 100),
    };

    tokenList[i] = token;
  }

  return tokenList;
};

export const createPoolList = (len: number) => {
  const poolList = new Array(len);

  for (let i = 0; i < len; i++) {
    const pool = {
      id: i,
      name: '풀 ' + getRandomInt(1, 2000),
      liquid: getRandomInt(0, 10000000),
      change: getRandomInt(0, 100),
    };

    poolList[i] = pool;
  }

  return poolList;
};

export const createGovernList = (len: number) => {
  const poolList = new Array(len);

  for (let i = 0; i < len; i++) {
    const agree = getRandomInt(0, 30);
    const pool = {
      id: i,
      name: 'Govern ' + getRandomInt(1, 2000),
      yes: agree,
      no: getRandomInt(0, 30 - agree),
    };

    poolList[i] = pool;
  }

  return poolList;
};

export const createMyList = (len: number) => {
  const poolList = new Array(len);

  for (let i = 0; i < len; i++) {
    const pool = {
      id: i,
      name: 'Ticker ' + getRandomInt(1, 2000),
      balance: getRandomInt(0, 10000),
      value: getRandomInt(0, 10000),
    };

    poolList[i] = pool;
  }

  return poolList;
};

export const createMyPollList = (len: number) => {
  const poolList = new Array(len);

  for (let i = 0; i < len; i++) {
    const pool = {
      id: i,
      name: 'Pool ' + getRandomInt(1, 2000),
      balance: getRandomInt(0, 10000),
      value: getRandomInt(0, 10000),
    };

    poolList[i] = pool;
  }

  return poolList;
};

export const createMyGovernList = (len: number) => {
  const poolList = new Array(len);

  for (let i = 0; i < len; i++) {
    const agree = getRandomInt(0, 100);
    const pool = {
      id: i,
      name: 'Govern ' + getRandomInt(1, 2000),
      yes: agree,
      no: getRandomInt(0, 100 - agree),
    };

    poolList[i] = pool;
  }

  return poolList;
};
