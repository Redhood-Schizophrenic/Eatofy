import { update_compliance_details } from "@/db/crud/compliance/management/update";
import { ApiResponse } from "@/types/ApiResponse";

export async function update_compliance(data: any): Promise<ApiResponse> {
	try {
		
		const compliance_id: string | null = data.get('compliance_id');
		const description: string | null = data.get('description');
		const image: File | null = data.get('image');

		// Default Invalid Checker
		if ( compliance_id == null || description == null ) {
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

		return {
			returncode: 200,
			message: "Details Updated",
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
