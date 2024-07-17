import { ApiResponse } from "@/types/ApiResponse";
import { hotel_employee_promotion } from "@/db/crud/staff/management/update";

export async function update_hotel_staff(data: any): Promise<ApiResponse> {
	try {

		const staff_id: string | null = data['staff_id'];
		const department_name: string | null = data['department_name'];
		const designation: string | null = data['designation'];
		const role: string | null = data['role'];
		const salary: number | null = data['salary'];
		const incentives: number | null = data['incentives'];


		// Default Invalid Checker
		if ( staff_id == null || department_name == null || designation == null || role == null || salary == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Staff Income
		const result = await hotel_employee_promotion({
			staff_id,
			department_name,
			designation,
			role,
			salary,
			incentives
		});

		return {
			returncode: 200,
			message: `Employee Promoted`,
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
