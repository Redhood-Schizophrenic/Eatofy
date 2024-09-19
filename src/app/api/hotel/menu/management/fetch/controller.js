import { read_menus } from "@/db/crud/menus/management/read";

export async function fetch_menus(data) {
	try {

		const section_id = data['section_id'] || null;

		// Default Invalid Checker
		if ( section_id == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Getting the Sections
		const result = await read_menus({
			section_id
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
