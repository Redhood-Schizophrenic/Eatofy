import { ApiResponse } from "@/types/ApiResponse";
import { hotel_employee_promotion, update_staff_details } from "@/db/crud/staff/management/update";

export async function update_staff(data: any): Promise<ApiResponse> {
	try {

		const staff_id: string | null = data['staff_id'];
		const first_name: string | null = data['first_name'];
		const last_name: string | null = data['last_name'];
		const address: string | null = data['address'];
		const contact: string | null = data['contact'];
		const department_name: string | null = data['department_name'];
		const designation: string | null = data['designation'];
		const role: string | null = data['role'];
		const salary: number | null = data['salary'];
		const incentives: number | null = data['incentives'];


		// Default Invalid Checker
		if (staff_id == null || first_name == null || last_name == null || address == null || contact == null || department_name == null || designation == null || role == null || salary == null) {
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

		// Updating the Staff Income
		const income_result = await hotel_employee_promotion({
			staff_id,
			department_name,
			designation,
			role,
			salary,
			incentives
		});

		switch (result.returncode) {
			case 200:
				switch (income_result.returncode) {
					case 200:
						return {
							returncode: 200,
							message: "Details and Income Updated",
							output: [],
						};
					default:
						return {
							returncode: 500,
							message: "Details Updated, but Income Update Failed",
							output: [],
						};
				}
			default:
				return {
					returncode: 500,
					message: "Details and Income Update Failed",
					output: [],
				};
		}
	} catch (error: any) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
