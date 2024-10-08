import { check_staff_exists } from "@/db/crud/staff/management/read";
import { create_staff } from "@/db/crud/staff/management/create";
import { hashing } from "@/utils/hashing";

export async function add_staff_details(data) {
	try {

		const first_name = data['first_name'] || null;
		const last_name = data['last_name'] || null;
		const address = data['address'] || null;
		const contact = data['contact'] || null;
		const email = data['email'] || null;
		const password = data['password'] || null;
		const department_name = data['department_name'] || null;
		const designation = data['designation'] || null;
		const role = data['role'] || null;
		const salary = data['salary'] || 0;
		const incentives = data['incentives'] || 0;
		const hotel_id = data['hotel_id'] || null;

		// Default Invalid Checker
		if (hotel_id == null || first_name == null || last_name == null || address == null || contact == null || email == null || password == null || department_name == null || designation == null || role == null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Existing Staff
		const existingStaff = await check_staff_exists({ first_name, last_name, contact, email, hotel_id });
		if (existingStaff.returncode == 200) {
			return {
				returncode: 400,
				message: "Staff Exists.",
				output: existingStaff.output
			};
		}

		// Password Hashing
		const hashed_password = await hashing(password);

		// Adding the Customer
		const result = await create_staff({
			first_name,
			last_name,
			address,
			contact,
			email,
			hashed_password,
			department_name,
			designation,
			role,
			salary,
			incentives,
			hotel_id

		});

		if (result.returncode) {
			return {
				returncode: 200,
				message: "Staff Added",
				output: result.output
			};
		}
		else {
			return {
				returncode: result.returncode,
				message: result.message,
				output: result.output
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
