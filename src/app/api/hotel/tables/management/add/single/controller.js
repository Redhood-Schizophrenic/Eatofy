import { create_table } from "@/db/crud/tables/management/create";
import { read_table } from "@/db/crud/tables/management/read";

export async function add_table(data) {
	try {

		const hotel_id = data['hotel_id'] || null;
		const section_id = data['section_id'] || null;
		const table_name = data['table_name'] || null;
		const persons_occupiable = data['persons_occupiable'] || null;

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

		return result;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
