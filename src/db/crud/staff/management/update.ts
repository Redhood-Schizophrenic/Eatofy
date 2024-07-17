import db from "@/db/connector";

// Details Update
interface DetailsInterface {
	staff_id: string,
	first_name: string,
	last_name: string,
	contact: string,
	address: string
}

export async function update_staff_details({
	staff_id,
	first_name,
	last_name,
	contact,
	address
}: DetailsInterface) {
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

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

// Employee Promotion
interface EmployeePromotionInterface { 
	staff_id: string,
	salary: number,
	incentives: number | null,
	department_name: string,
	designation: string,
	role: string,
}

export async function hotel_employee_promotion({
	staff_id,
	salary,
	incentives,
	department_name,
	designation,
	role

}: EmployeePromotionInterface) {
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

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

// Employee Password Update
interface PasswordInterface { 
	staff_id: string,
	hashed_password: string
}

export async function employee_password_update({
	staff_id,
	hashed_password
}: PasswordInterface) {
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

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

// Status Update
interface StatusInterface { 
	staff_id: string,
	status: string
}

export async function update_staff_status({
	staff_id,
	status
}: StatusInterface) {
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

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}
