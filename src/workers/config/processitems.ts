import { removeRepeatableJob } from "./handlejob";
import { logger } from "../../utils/abstractions/logger";
import { models } from "../../entities";
import query_db from "../../utils/abstractions/db_abstraction";
import queueworkers from "../queueworkers/index";
import { redis_connection } from ".";
import { Worker, QueueEvents } from "bullmq";

interface Data {
  worker: string;
  worker_data: { [key: string]: string };
  cron_setting: { limit?: number; interval: number };
  started: boolean;
  stopped: boolean;
}

function process_items() {
  if (process.env.PROCCESS_RECURRING_WORKER) {
    let queue_instance = new Worker(
      "recurring_bull_queue",
      async (item_to_process: any) => {
        let queue_entry_id;
        try {
          queue_entry_id = item_to_process.name;
          const queue_entry = await query_db(models.cron_registry).find_one({
            id: queue_entry_id,
          });

          if (!queue_entry) return;
          if (queue_entry.started && queue_entry.stopped) {
            let parsed_settings = queue_entry.cron_setting;
            removeRepeatableJob(parsed_settings?.job_key);
            return;
          }

          logger.info([{ message: "RECURRING BULL JOB+++" }], queue_entry.id);
          await queueworkers(queue_entry);
        } catch (error: any) {
          logger.error(
            [error.stack, error.message],
            `process_items-error-${queue_entry_id}`
          );
        }
      },
      {
        connection: redis_connection,
      }
    );

    const queueEvents = new QueueEvents("recurring_bull_queue");
    queueEvents.on("error", (error: any) => {
      logger.error([error.stack, error.message], "BULL-QUEUE-ERROR");
    });

    queueEvents.on("failed", (job: any, err: any) => {
      logger.error([job.data, err], "BULL-QUEUE-FAILED");
    });

    queueEvents.on("completed", (job: any, result: any) => {
      logger.info([job.data, result], "BULL-QUEUE-COMPLETED");
    });

    return queue_instance;
  }
}

export default process_items;
