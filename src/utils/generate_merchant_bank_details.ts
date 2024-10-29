import banks from './banks.json';
import { get_config } from './get_config';

export type Generate_account_number = {
    bank_code: string;
    nuban: string;
    bank_name: string;
}

export const generate_account_number = async (bank_code: string): Promise<Generate_account_number> => {
    try {
        const get_bank = banks.find(item => {
            return item.code === bank_code;
        });
        if (!get_bank) throw new Error('banks not available');

        const fetch_account_numbers = await get_config('nubans');
        const fetched_nubans = fetch_account_numbers as unknown as string[];

        const nuban = fetched_nubans[(Math.floor(Math.random() * fetched_nubans.length))]
        return {
            bank_code: get_bank.code,
            bank_name: get_bank.name,
            nuban
        }
    } catch (error) {
        throw error;
    }

}


