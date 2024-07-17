import { create_compliance_without_image } from "@/db/crud/compliance/management/create";
import { ApiResponse } from "@/types/ApiResponse";

export async function add_compliance(data: any): Promise<ApiResponse> {
	try {

		const compliance_name: string | null = data['compliance_name'];
		const description: string | null = data['description'];
		const hotel_id: string | null = data['hotel_id'];

		// Default Invalid Checker
		if (compliance_name == null || description == null || hotel_id == null) {
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
			buffer: null
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
