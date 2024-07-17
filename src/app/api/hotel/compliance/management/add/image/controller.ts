import { create_compliance_with_image } from "@/db/crud/compliance/management/create";
import { ApiResponse } from "@/types/ApiResponse";

export async function add_compliance(data: any): Promise<ApiResponse> {
	try {

		const compliance_name: string | null = data.get('compliance_name');
		const description: string | null = data.get('description');
		const hotel_id: string | null = data.get('hotel_id');
		const image: File | null = data.get('image');

		// Default Invalid Checker
		if (compliance_name == null || description == null || hotel_id == null || image == null) {
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
			output: Array.isArray(result.output) ? result.output : [result.output as any]
		};

	} catch (error: any) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
