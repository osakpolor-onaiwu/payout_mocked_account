import { Queue } from "bullmq";

let queue;
export const redis_connection = {
  host: process.env.BULL_URL,
  port: 6379,
};

if (process.env.BULL_URL) {
  queue = new Queue("recurring_bull_queue", {
    connection: redis_connection,
  });
}

export default queue;
