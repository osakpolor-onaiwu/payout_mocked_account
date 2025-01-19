import merchant_id from "../../../merchant_ids.json";
import register from "../../services/auth/register";
import { models } from "../../entities";
import query_db from "../../utils/abstractions/db_abstraction";
import { logger } from "../../utils/abstractions/logger";

interface Data {
  worker: string;
  worker_data: { [key: string]: string | number };
  cron_setting: { limit?: number; interval: number };
  started: boolean;
  stopped: boolean;
}
const service = async (data: Data) => {
  try {
    const db_worker_data = await query_db(models.cron_registry).find_one(
      {
        id: data.worker_data.id,
        stopped: false,
      },
      { worker_data: 1 }
    );

    let limit: number =
      typeof data.worker_data?.limit === "number"
        ? data.worker_data?.limit
        : Number(data.worker_data?.limit) || 10;
    if (!db_worker_data) throw new Error("worker not found or already stopped");

    if (limit > merchant_id.length) limit = merchant_id.length;

    let latest_index = db_worker_data?.worker_data?.current_index;

    while (latest_index < merchant_id.length) {
      let items_to_create = merchant_id.slice(
        latest_index,
        latest_index + limit
      );

      await Promise.all(
        items_to_create.map(async (item) => {
          const registered = await register({
            f4b_account_id: item.id,
            business_name: item.business_name,
          });
        })
      );

      latest_index += limit;

      if (latest_index >= merchant_id.length) break;

      await query_db(models.cron_registry).update(
        {
          worker_data: {
            limit,
            current_index: latest_index,
          },
        },
        { id: data.worker_data.id }
      );
    }

    console.log(`Created ${latest_index} merchant accounts`);
    await query_db(models.cron_registry).update(
      { stopped: 1 },
      { id: data.worker_data.id }
    );
    console.log("All merchant accounts created successfully");
  } catch (error: any) {
    logger.error([error.message, error.stack], "createaccount-error");
  }
};

export default service;
