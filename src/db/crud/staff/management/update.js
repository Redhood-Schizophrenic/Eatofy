import db from "@/db/connector";

// Details Update
export async function update_staff_details({
	staff_id,
	first_name,
	last_name,
	contact,
	address
}) {
	try {

		// Updating the record
		const result = await db.staffs.update({
			where: {
				id: staff_id
			},
			data: {
				FirstName: first_name,
				LastName: last_name,
				Contact: contact,
				Address: address
			},
		});

		// Database is disconnected
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Updated",
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

// Employee Promotion
export async function hotel_employee_promotion({
	staff_id,
	salary,
	incentives,
	department_name,
	designation,
	role

}) {
	try {

		// Updating the record
		const result = await db.staffs.update({
			where: {
				id: staff_id
			},
			data: {
				Salary: salary,
				Incentive: incentives,
				DepartmentName: department_name,
				Designation: designation,
				Role: role
			},
		});

		// Database is disconnected
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Updated",
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

// Employee Password Update
export async function employee_password_update({
	staff_id,
	hashed_password
}) {
	try {

		// Updating the record
		const result = await db.staffs.update({
			where: {
				id: staff_id
			},
			data: {
				HashedPassword: hashed_password
			},
		});

		// Database is disconnected
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Updated",
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

// Status Update
export async function update_staff_status({
	staff_id,
	status
}) {
	try {

		// Updating the record
		const result = await db.staffs.update({
			where: {
				id: staff_id
			},
			data: {
				Status: status
			},
		});

		// Database is disconnected
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Updated",
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
