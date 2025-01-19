import { Object_type } from "../../utils/types_and_interfaces/types";
import { models } from "../../entities/index";
import query_db from "../../utils/abstractions/db_abstraction";
import { Bad_request_error, Custom_error } from "../../utils/errors";

const update_balance = async (data: Object_type): Promise<object> => {
  try {
    const { f4b_account_id, amount } = data;
    const [user_detail, merchant_balance] = await Promise.all([
      query_db(models.Account).find_one(
        {
          f4b_account_id,
        },
        {},
        { relation: { bank_detail: true } }
      ),
      query_db(models.merchant_balance).find_one(
        { f4b_account_id },
        {},
        { order: { id: "DESC" } }
      ),
    ]);

    if (!user_detail)
      throw new Bad_request_error("User account details not found");
    if (!user_detail.bank_detail)
      throw new Bad_request_error(
        "Bank account details not found for this account"
      );

    const update_balance = await query_db(models.merchant_balance).create({
      balance_before: merchant_balance?.balance_after || 0,
      balance_after: (merchant_balance?.balance_after || 0) + amount,
      f4b_account_id,
      amount,
      meta: { ...user_detail.bank_detail },
    });

    return update_balance;
  } catch (error: any) {
    throw new Custom_error(error.message, 400);
  }
};

export default update_balance;
