import { ApiResponse } from "@/types/ApiResponse";
import { check_staff_exists } from "@/db/crud/staff/management/read";
import { create_staff } from "@/db/crud/staff/management/create";
import { hashing } from "@/utils/hashing";

export async function add_staff_details(data: any): Promise<ApiResponse> {
	try {

		const first_name: string | null = data['first_name'];
		const last_name: string | null = data['last_name'];
		const address: string | null = data['address'];
		const contact: string | null = data['contact'];
		const email: string | null = data['email'];
		const password: string | null = data['password'];
		const department_name: string | null = data['department_name'];
		const designation: string | null = data['designation'];
		const role: string | null = data['role'];
		const salary: number | null = data['salary'];
		const incentives: number | null = data['incentives'];
		const hotel_id: string | null = data['hotel_id'];

		// Default Invalid Checker
		if (hotel_id == null || first_name == null || last_name == null || address == null || contact == null || email == null || password == null || department_name == null || designation == null || role == null || salary == null) {
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


	} catch (error: any) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
