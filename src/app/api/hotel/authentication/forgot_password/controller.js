import { employee_password_update } from "@/db/crud/staff/management/update";
import { hashing } from "@/utils/hashing";

export async function update_staff_password(data) {
	try {

		const staff_id = data['staff_id'];
		const password = data['password'];

		// Default Invalid Checker
		if (staff_id == null || password == null ||
			staff_id == undefined || password == undefined ||
			staff_id == "" || password == ""
		) {
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

		if (result.returncode == 200) {
			return {
				returncode: 200,
				message: "Password Updated",
				output: result.output
			};
		}
		
		return result;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
