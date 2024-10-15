import { create_vat_settings } from "../../../../../../db/crud/settings/vat/management/create";
import { read_vat_settings } from "../../../../../../db/crud/settings/vat/management/read";
import { update_vat_settings } from "../../../../../../db/crud/settings/vat/management/update";

export async function add_vat_settings(data) {
	try {

		const hotel_id = data['hotel_id'] || null;
		const visibility = data['visibility'] || false;
		const vat_percent = data['vat_percent'] || null;


		// Default Invalid Checker
		if (hotel_id == null || vat_percent == null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Existing Section Name
		const existingSettings = await read_vat_settings({ hotel_id });
		if (existingSettings.returncode === 200 && existingSettings.output.length != 0) {
			const setting_id = existingSettings?.output[0]?.id;
			const result = await update_vat_settings({
				setting_id, visibility, vat_percent
			});
			return result;
		}

		// Inserting the Section
		const result = await create_vat_settings({
			hotel_id,
			visibility,
			vat_percent
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
