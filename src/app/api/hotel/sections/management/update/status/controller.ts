import { ApiResponse } from "@/types/ApiResponse";
import { update_section_status } from "@/db/crud/sections/management/update";

export async function update_section(data: any): Promise<ApiResponse> {
	try {

		const section_id: string | null = data['section_id'];
		const status: string | null = data['status'];

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

		return {
			returncode: 200,
			message: "Section Updated",
			output: result.output
		};

	} catch (error: any) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
