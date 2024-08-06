import { hotel_employee_promotion, update_staff_details } from "@/db/crud/staff/management/update";

export async function update_staff(data) {
	try {

		const staff_id = data['staff_id'] || null;
		const first_name = data['first_name'] || null;
		const last_name = data['last_name'] || null;
		const address = data['address'] || null;
		const contact = data['contact'] || null;
		const department_name = data['department_name'] || null;
		const designation = data['designation'] || null;
		const role = data['role'] || null;
		const salary = data['salary'] || null;
		const incentives = data['incentives'] || null;


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
	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
