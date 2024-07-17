import { ApiResponse } from "@/types/ApiResponse";
import { update_reservation_status } from "@/db/crud/reservations/update";

export async function update_reservation(data: any): Promise<ApiResponse> {
	try {

		const reservation_id: string | null = data['reservation_id'];
		const status: string | null = data['status'];

		// Default Invalid Checker
		if ( reservation_id == null || status == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Status
		const result = await update_reservation_status({
			reservation_id,
			status
		});

		return {
			returncode: 200,
			message: "Status Updated",
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
