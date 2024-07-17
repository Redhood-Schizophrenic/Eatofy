import { ApiResponse } from "@/types/ApiResponse";
import { create_table } from "@/db/crud/tables/management/create";
import { read_table } from "@/db/crud/tables/management/read";

export async function add_table(data: any): Promise<ApiResponse> {
	try {

		const hotel_id: string | null = data['hotel_id'];
		const section_id: string | null = data['section_id'];
		const table_name: string | null = data['table_name'];
		const persons_occupiable: string | null = data['persons_occupiable'];

		// Default Invalid Checker
		if ( hotel_id == null || section_id == null || table_name == null || persons_occupiable == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Existing Table Name
		const existingTableName = await read_table({ table_name, section_id });
		if ( existingTableName.returncode == 200 ) {
			return {
				returncode: 400,
				message: "Table Exists.",
				output: existingTableName.output
			};
		}

		// Inserting the Table
		const result = await create_table({
			hotel_id,
			section_id,
			table_name,
			persons_occupiable
		});

		console.log(result);

		return {
			returncode: 200,
			message: "Table Added",
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
