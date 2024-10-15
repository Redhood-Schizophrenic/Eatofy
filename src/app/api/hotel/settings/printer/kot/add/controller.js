import { create_kot_printer_settings } from "@/db/crud/settings/printer/kot/management/create";
import { read_kot_printer_settings } from "@/db/crud/settings/printer/kot/management/read";
import { update_kot_printer_settings } from "@/db/crud/settings/printer/kot/management/update";

export async function add_kot_printer_settings(data) {
	try {

		const hotel_id = data['hotel_id'] || null;
		const visibility = data['visibility'] || false;
		const network_ip = data['network_ip'] || null;
		const encoding = data['encoding'] || null;
		const bluetooth_mac = data['bluetooth_mac'] || null;



		// Default Invalid Checker
		if (hotel_id === null || network_ip === null || encoding === null || bluetooth_mac === null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Existing Section Name
		const existingSettings = await read_kot_printer_settings({ hotel_id });
		if (existingSettings.returncode === 200 && existingSettings.output.length != 0) {
			const setting_id = existingSettings.output[0].id;
			const result = await update_kot_printer_settings({
				setting_id, visibility, network_ip, encoding, bluetooth_mac
			});
			return result;
		}

		// Inserting the Section
		const result = await create_kot_printer_settings({
			hotel_id,
			visibility,
			network_ip,
			encoding,
			bluetooth_mac
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
