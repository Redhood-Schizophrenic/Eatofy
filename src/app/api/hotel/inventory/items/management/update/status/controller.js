import { update_item_status } from "@/db/crud/inventory/items/update";

export async function update_status(data) {
	try {

		const item_id = data['item_id'] || null;
		const status = data['status'] || null;

		// Default Invalid Checker
		if ( item_id == null || status == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Status
		const result = await update_item_status({
			item_id,
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
