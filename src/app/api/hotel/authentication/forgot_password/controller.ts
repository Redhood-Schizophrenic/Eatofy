import { ApiResponse } from "@/types/ApiResponse";
import { employee_password_update } from "@/db/crud/staff/management/update";
import { hashing } from "@/utils/hashing";

export async function update_staff_password(data: any): Promise<ApiResponse> {
	try {

		const staff_id: string | null = data['staff_id'];
		const password: string | null = data['password'];

		// Default Invalid Checker
		if ( staff_id == null || password == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		const hashed_password = await hashing(password);

		// Updating the Status
		const result = await employee_password_update({
			staff_id,
			hashed_password
		});

		return {
			returncode: 200,
			message: "Password Updated",
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
