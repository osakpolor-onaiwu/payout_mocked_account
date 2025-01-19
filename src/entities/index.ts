import { Account } from "./accounts";
import { Config } from "./config";
import { secret_key } from "./secret_keys";
import { merchant_balance } from "./merchant_balance";
import { merchant_bank_details } from "./merchant_bank_details";
import { cron_registry } from "./cron_registry";

export const models = {
  Account,
  Config,
  secret_key,
  merchant_bank_details,
  merchant_balance,
  cron_registry,
};
