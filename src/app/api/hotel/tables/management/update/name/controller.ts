import { ApiResponse } from "@/types/ApiResponse";
import { update_table_name } from "@/db/crud/tables/management/update";

export async function update_table(data: any): Promise<ApiResponse> {
	try {

		const table_id: string | null = data['table_id'];
		const table_name: string | null = data['table_name'];

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

		return {
			returncode: 200,
			message: "Table Updated",
			output: result.output
		};

	} catch (error: any) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
