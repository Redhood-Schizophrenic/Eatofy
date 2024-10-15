import { create_gst_settings } from "../../../../../../db/crud/settings/gst/management/create";
import { read_gst_settings } from "../../../../../../db/crud/settings/gst/management/read";
import { update_gst_settings } from "../../../../../../db/crud/settings/gst/management/update";

export async function add_gst_settings(data) {
	try {

		const hotel_id = data['hotel_id'] || null;
		const visibility = data['visibility'] || false;
		const gst_percent = data['gst_percent'] || null;


		// Default Invalid Checker
		if (hotel_id == null || gst_percent == null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Existing Section Name
		const existingSettings = await read_gst_settings({ hotel_id });
		if (existingSettings.returncode === 200 && existingSettings.output.length != 0) {
			const setting_id = existingSettings.output[0].id;
			const result = await update_gst_settings({
				setting_id, visibility, gst_percent
			});
			return result;
		}

		// Inserting the Section
		const result = await create_gst_settings({
			hotel_id,
			visibility,
			gst_percent
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
