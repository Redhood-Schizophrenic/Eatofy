import { create_section } from "@/db/crud/sections/management/create";
import { read_section } from "@/db/crud/sections/management/read";

export async function add_section(data) {
	try {

		const hotel_id = data['hotel_id'] || null;
		const section_name = data['section_name'] || null;

		// Default Invalid Checker
		if ( hotel_id == null || section_name == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Existing Section Name
		const existingSectionName = await read_section({ section_name });
		if ( existingSectionName.returncode != 200 ) {
			return existingSectionName;
		}

		// Inserting the Section
		const result = await create_section({
			hotel_id,
			section_name
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
