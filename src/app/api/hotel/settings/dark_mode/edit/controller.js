import { update_dark_light_mode_settings } from "@/db/crud/settings/dark_mode/management/update";

export async function update_dark_mode_settings(data) {
	try {

		const hotel_id = data['hotel_id'] || null;
		const visibilty = data['mode'] || null;

		// Default Invalid Checker
		if (hotel_id == null || visibilty == null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Section
		const result = await update_dark_light_mode_settings({
			hotel_id,
			visibilty
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
