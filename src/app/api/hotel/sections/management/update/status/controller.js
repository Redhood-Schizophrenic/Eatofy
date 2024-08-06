import { update_section_status } from "@/db/crud/sections/management/update";

export async function update_section(data) {
	try {

		const section_id = data['section_id'] || null;
		const status = data['status'] || null;

		// Default Invalid Checker
		if ( section_id == null || status == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Section
		const result = await update_section_status({
			section_id,
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
