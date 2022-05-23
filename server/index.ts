import server from "./config/express";
import connection from "./typeorm/connection";
import { startCron } from "./utilities/cron";
import { getPoolLiquidity } from "./utilities/interestCalculator";

const port = process.env.PORT || 5000;

const Server = async () => {
  try {
    await connection.createDatabase();
    console.log("database 생성");
    await connection.create();

    // cron 시작
    console.log("cron 시작");
    startCron();

    // 프론트 서버 시작
    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};
Server();
