import { update_vat_settings } from "../../../../../../db/crud/settings/vat/management/update";

export async function edit_vat_settings(data) {
	try {

		const hotel_id = data['hotel_id'] || null;
		const visibilty = data['visibility'] || true;
		const vat_percent = data['vat_percent'] || null;

		// Default Invalid Checker
		if (hotel_id == null || vat_percent == null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Section
		const result = await update_vat_settings({
			hotel_id,
			visibilty,
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
