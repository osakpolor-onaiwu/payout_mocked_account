import { Object_type } from "../../utils/types_and_interfaces/types";
import { models } from "../../entities/index";
import query_db from "../../utils/abstractions/db_abstraction";
import { Bad_request_error, Custom_error } from "../../utils/errors";
import { hash } from "bcrypt";
import { Account } from "../../entities/accounts";
import { merchant_bank_details } from "../../entities/merchant_bank_details";
import { generate_account_number } from "../../utils/generate_merchant_bank_details";

const register = async (data: Object_type): Promise<object> => {
  try {
    const { f4b_account_id, business_name, parent_account_id } = data;
    const fetch_account_id = await query_db(models.Account).find_one(
      {
        f4b_account_id,
      },
      {
        f4b_account_id: true,
      }
    );

    if (fetch_account_id)
      throw new Bad_request_error("Account already exists.");

    //add generation of account numbers
    const get_bank_info = await generate_account_number("044");
    if (!get_bank_info) throw new Error("Bank information not available");
    const hash_password = await hash(
      get_bank_info.nuban,
      process.env.SALT_ROUND || 10
    );
    const generated_nuban = new merchant_bank_details();
    generated_nuban.f4b_account_id = f4b_account_id;
    generated_nuban.bank_code = get_bank_info.bank_code;
    generated_nuban.nuban = get_bank_info.nuban;
    generated_nuban.bank_name = get_bank_info.bank_name;

    await query_db(models.merchant_bank_details).save(generated_nuban);

    const save_user = new Account();
    save_user.business_name = business_name;
    save_user.bank_detail = generated_nuban;
    save_user.f4b_account_id = f4b_account_id;
    save_user.password = hash_password;
    save_user.parent_account_id = parent_account_id;

    await query_db(models.Account).save(save_user);

    //generate_seckey
    return save_user;
  } catch (error: any) {
    throw new Custom_error(error?.message, 400);
  }
};

export default register;
