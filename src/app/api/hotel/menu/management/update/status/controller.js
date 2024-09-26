import { update_menu_status } from "@/db/crud/menus/management/update";

export async function update_menu(data) {
	try {

		const menu_id = data['menu_id'] || null;
		const status = data['status'] || null;

		// Default Invalid Checker
		if ( menu_id == null || status == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Status
		const result = await update_menu_status({
			menu_id,
			status
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
