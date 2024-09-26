import { update_section_name } from "@/db/crud/sections/management/update";

export async function update_section(data) {
	try {

		const section_id = data['section_id'] || null;
		const section_name = data['section_name'] || null;

		// Default Invalid Checker
		if ( section_id == null || section_name == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Section
		const result = await update_section_name({
			section_id,
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
