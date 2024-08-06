import db from "@/db/connector";

export async function create_staff({
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
}) {
	try {


		// Inserting the record
		const result = await db.staffs.create({
			data: {
				FirstName: first_name,
				LastName: last_name,
				Address: address,
				Contact: contact,
				Email: email,
				HashedPassword: hashed_password,
				SaltPassword: "10",
				DepartmentName: department_name,
				Designation: designation,
				Role: role,
				Salary: salary,
				Incentive: incentives,
				HotelId: hotel_id,
			}
		});

		// Database is disconnected
		await db.$disconnect();

		return {
			returncode: 200,
			message: "Data Inserted",
			output: result
		};

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}
