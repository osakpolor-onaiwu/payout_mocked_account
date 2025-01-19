import { Object_type } from "../../utils/types_and_interfaces/types";
import { models } from "../../entities/index";
import query_db from "../../utils/abstractions/db_abstraction";
import { Bad_request_error, Custom_error } from "../../utils/errors";
import { encode_cursor, decode_cursor } from "../../utils/format_cursor";
import { Between, LessThan, MoreThan } from "typeorm";

interface DateFilter {
  created_at?: object;
}
const fetch_balance = async (data: Object_type): Promise<object> => {
  try {
    let {
      f4b_account_id,
      from,
      to,
      next_cursor: serialized_next_cursor,
      prev_cursor: serialized_previous_cursor,
      id,
      limit,
    } = data;
    const next_cursor = decode_cursor(serialized_next_cursor);
    const previous_cursor = decode_cursor(serialized_previous_cursor);
    limit = Number(limit);

    const date_filter: DateFilter = {};
    if (from) {
      date_filter.created_at = Between(from, to);
    }

    const where_query = {
      f4b_account_id,
      ...date_filter,
      id,
    };

    let options = {
      take: limit + 1,
      order: {},
    };

    if (next_cursor) {
      where_query.id = LessThan(next_cursor);
      options.order = {
        id: "DESC",
      };
    } else if (previous_cursor) {
      where_query.id = MoreThan(previous_cursor);
      options.order = {
        id: "ASC",
      };
    } else {
      options.order = {
        id: "DESC",
      };
    }

    let fetched_balances = await query_db(models.merchant_balance).find_many(
      where_query,
      {
        id: 1,
        created_at: 1,
        balance_before: 1,
        balance_after: 1,
        f4b_account_id: 1,
        amount: 1,
      },
      options
    );

    if (fetched_balances.length && previous_cursor) {
      fetched_balances = fetched_balances.sort((x, y) => {
        if (x.id > y.id) return -1;
        if (x.id < y.id) return 1;
        return 0;
      });
    }

    let has_next = fetched_balances?.length > limit;
    let has_prev =
      !!previous_cursor || (!!next_cursor && fetched_balances?.length > 0);

    if (has_prev && previous_cursor) {
      if (!has_next) {
        has_prev = false;
        has_next = true;
      } else {
        fetched_balances.shift();
      }
    } else if (has_next) {
      fetched_balances.pop();
    }

    const first_item = fetched_balances[0]?.id;
    const last_item = fetched_balances[fetched_balances.length - 1]?.id;

    const next_page_cursor = has_next ? encode_cursor(last_item) : null;
    const prev_page_cursor = has_prev ? encode_cursor(first_item) : null;

    const navigation_cursor = {
      next: next_page_cursor,
      previous: prev_page_cursor,
      limit,
      has_more_items: !!has_next || !!has_prev || false,
    };

    return {
      cursor: navigation_cursor,
      fetched_balances,
    };
  } catch (error: any) {
    throw new Custom_error(error.message, 400);
  }
};

export default fetch_balance;
