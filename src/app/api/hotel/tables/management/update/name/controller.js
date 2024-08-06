import { update_table_name } from "@/db/crud/tables/management/update";

export async function update_table(data) {
	try {

		const table_id = data['table_id'] || null;
		const table_name = data['table_name'] || null;

		// Default Invalid Checker
		if ( table_id == null || table_name == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Table Status
		const result = await update_table_name({
			table_id,
			table_name
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
