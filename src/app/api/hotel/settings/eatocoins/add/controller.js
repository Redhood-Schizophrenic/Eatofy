import { create_eatocoins_settings } from "../../../../../../db/crud/settings/eatocoins/management/create";
import { read_eatocoins_settings } from "../../../../../../db/crud/settings/eatocoins/management/read";
import { update_eatocoins_settings } from "../../../../../../db/crud/settings/eatocoins/management/update";

export async function add_eatocoins_settings(data) {
	try {

		const hotel_id = data['hotel_id'] || null;
		const visibility = data['visibility'] || false;
		const credit_limit_amt = data['credit_limit_amt'] || null;
		const credit_limit_percent = data['credit_limit_percent'] || null;
		const rate = data['rate'] || 0;
		const redeem_limit_amt = data['redeem_limit_amt'] || null;
		const redeem_limit_percent = data['redeem_limit_percent'] || null;

		// Default Invalid Checker
		if (hotel_id === null || credit_limit_amt === null || credit_limit_percent === null || redeem_limit_percent === null || redeem_limit_amt === null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Existing Section Name
		const existingSettings = await read_eatocoins_settings({ hotel_id });
		if (existingSettings.returncode === 200 && existingSettings.output.length != 0) {
			const result = await update_eatocoins_settings({
				hotel_id, rate, visibility, credit_limit_amt, credit_limit_percent, redeem_limit_amt, redeem_limit_percent
			});

			return result;
		}

		// Inserting the Section
		const result = await create_eatocoins_settings({
			hotel_id,
			rate,
			visibility,
			credit_limit_amt,
			credit_limit_percent,
			redeem_limit_amt,
			redeem_limit_percent
		});

		return result;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
