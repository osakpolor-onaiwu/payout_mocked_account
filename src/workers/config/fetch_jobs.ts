import { schedule } from "node-cron";
import { models } from "../../entities";
import query_db from "../../utils/abstractions/db_abstraction";
import { addRepeatableItem, removeRepeatableJob } from "./handlejob";
import { logger } from "../../utils/abstractions/logger";

async function service() {
  let item_id;
  try {
    schedule(process.env.RECURRING_CRON_SETTING! || "* * * * *", async () => {
      const jobs = await query_db(models.cron_registry).find_many(
        {
          started: 0,
        },
        {},
        { take: Number(process.env.RECURRING_CRON_LIMIT) || 10 }
      );

      if (jobs.length >= 1) {
        jobs.forEach(async (item) => {
          item_id = item.id;
          if (item.started && !item.stopped) return;

          if (item.started && item.stopped) {
            removeRepeatableJob(item.cron_setting?.job_key);
          } else {
            const job = addRepeatableItem({
              queue_entry_id: item.id,
              repeat_job_config: item.cron_setting,
            });

            await query_db(models.cron_registry).update(
              {
                cron_setting: { ...item.cron_setting, job_key: item_id },
                started: 1,
              },
              { id: item.id }
            );
          }
        });
      } else {
        console.log("No job found in Recurring queue");
      }
    });
  } catch (error: any) {
    logger.error([error.message, error.stack], `fetc-job-error-${item_id}`);
  }
}

export default service;
