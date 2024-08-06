import { create_compliance_without_image } from "@/db/crud/compliance/management/create";

export async function add_compliance(data) {
	try {

		const compliance_name = data['compliance_name'];
		const description = data['description'];
		const hotel_id = data['hotel_id'];

		// Default Invalid Checker
		if (
			compliance_name == null || description == null || hotel_id == null ||
			compliance_name == undefined || description == undefined || hotel_id == undefined ||
			compliance_name == "" || description == "" || hotel_id == ""
		) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Inserting a Compliance
		const result = await create_compliance_without_image({
			compliance_name,
			description,
			hotel_id,
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
