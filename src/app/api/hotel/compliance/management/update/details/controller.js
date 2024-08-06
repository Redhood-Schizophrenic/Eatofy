import { update_compliance_details } from "@/db/crud/compliance/management/update";

export async function update_compliance(data) {
	try {

		const compliance_id = data.get('compliance_id');
		const description = data.get('description');
		const image = data.get('image');

		// Default Invalid Checker
		if (compliance_id == null || description == null ||
			compliance_id == undefined || description == undefined ||
			compliance_id == "" || description == "" 
		) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		let buffer
		if (image != null) {
			// Image Buffer Converter
			const array_buffer = await image.arrayBuffer();
			const uint8array = new Uint8Array(array_buffer);
			buffer = Buffer.from(uint8array);
		}
		else {
			buffer = null
		}

		// Updating the Details
		const result = await update_compliance_details({
			compliance_id,
			description,
			buffer // Ensure 'buffer' matches your structure for handling the logo
		});

		return result;

	} catch(error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
