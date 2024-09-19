import { create_dark_light_mode_settings } from "@/db/crud/settings/dark_mode/management/create";
import { read_dark_light_mode_settings } from "@/db/crud/settings/dark_mode/management/read";
import { update_dark_light_mode_settings } from "@/db/crud/settings/dark_mode/management/update";

export async function add_dark_mode_settings(data) {
	try {

		const hotel_id = data['hotel_id'] || null;
		const visibility = data['mode'] || null;

		// Default Invalid Checker
		if (hotel_id == null || visibility == null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Existing Section Name
		const existingSettings = await read_dark_light_mode_settings({ hotel_id });
		if (existingSettings.returncode === 200 && existingSettings.output.length != 0) {
			const result = await update_dark_light_mode_settings({
				hotel_id, visibility
			});

			return result;
		}

		// Inserting the Section
		const result = await create_dark_light_mode_settings({
			hotel_id,
			visibility
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
