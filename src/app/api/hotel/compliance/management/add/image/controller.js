import { create_compliance_with_image } from "@/db/crud/compliance/management/create";

export async function add_compliance(data) {
	try {

		const compliance_name = data.get('compliance_name');
		const description = data.get('description');
		const hotel_id = data.get('hotel_id');
		const image = data.get('image');

		// Default Invalid Checker
		if (
			compliance_name == null || description == null || hotel_id == null || image == null
			|| compliance_name == undefined || description == undefined || hotel_id == undefined || image == undefined
			|| compliance_name == "" || description == "" || hotel_id == "" || image == ""
		) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Image Buffer Converter
		const array_buffer = await image.arrayBuffer();
		const uint8array = new Uint8Array(array_buffer);
		const buffer = Buffer.from(uint8array);

		// Inserting the Compliance
		const result = await create_compliance_with_image({
			compliance_name,
			description,
			hotel_id,
			buffer // Ensure 'buffer' matches your structure for handling the logo
		});

		return {
			returncode: 200,
			message: "Compliance Added",
			output: result.output
		};

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
