import queue_instance from "./index";
import Joi from "joi";
import { validate_sync } from "../../utils/validations/validator";
import { logger } from "../../utils/abstractions/logger";
const spec = Joi.object({
  queue_entry_id: Joi.string(),
  delay: Joi.number(),
  repeat_job_config: Joi.object({
    every: Joi.number().required(), //interval
    limit: Joi.number().optional(),
    endDate: Joi.date().optional(),
    key: Joi.string().optional(),
  }),
}).required();

export async function addRepeatableItem(data: object) {
  try {
    const { queue_entry_id, repeat_job_config, delay } = validate_sync(
      spec,
      data
    );

    if (!repeat_job_config.key) repeat_job_config.key = queue_entry_id;
    let job;
    if (queue_instance!) {
      job = await queue_instance.add(
        queue_entry_id,
        {},
        {
          repeat: {
            ...repeat_job_config,
          },
        }
      );
    }

    return { job, key: repeat_job_config.key };
  } catch (error: any) {
    logger.error(error, "Add-repeatable-job-error");
  }
}

export async function removeRepeatableJob(key: string) {
  try {
    let job;
    if (queue_instance!) {
      job = await queue_instance.removeRepeatableByKey(key);
    }
    return job;
  } catch (error: any) {
    logger.error(error, "Remove-repeatable-job-error");
  }
}
