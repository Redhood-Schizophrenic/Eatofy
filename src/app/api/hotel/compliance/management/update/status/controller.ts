import { update_compliance_status } from "@/db/crud/compliance/management/update";
import { ApiResponse } from "@/types/ApiResponse";

export async function update_compliance(data: any): Promise<ApiResponse> {
	try {

		const compliance_id: string | null = data['compliance_id'];
		const status: string | null = data['status'];

		// Default Invalid Checker
		if ( compliance_id == null || status == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Compliance Status
		const result = await update_compliance_status({
			compliance_id,
			status
		});

		return {
			returncode: 200,
			message: "Status Updated",
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
