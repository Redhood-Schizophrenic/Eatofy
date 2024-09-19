import { update_table_status } from "@/db/crud/tables/management/update";

export async function update_table(data) {
	try {

		const table_id = data['table_id'] || null;
		const status = data['status'] || null;

		// Default Invalid Checker
		if ( table_id == null || status == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Table Status
		const result = await update_table_status({
			table_id,
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
