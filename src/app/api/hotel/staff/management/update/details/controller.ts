import { ApiResponse } from "@/types/ApiResponse";
import { update_staff_details } from "@/db/crud/staff/management/update";

export async function update_staff(data: any): Promise<ApiResponse> {
	try {

		const staff_id: string | null = data['staff_id'];
		const first_name: string | null = data['first_name'];
		const last_name: string | null = data['last_name'];
		const address: string | null = data['address'];
		const contact: string | null = data['contact'];


		// Default Invalid Checker
		if ( staff_id == null || first_name == null || last_name == null || address == null || contact == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Staff Details
		const result = await update_staff_details({
			staff_id,
			first_name,
			last_name,
			address,
			contact
		});

		return {
			returncode: 200,
			message: "Details Updated",
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
