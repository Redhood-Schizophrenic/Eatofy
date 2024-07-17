import db from "@/db/connector";

// Fetch all categories
interface StaffsInterface {
	hotel_id: string
}

export async function read_hotel_staffs ({
	hotel_id
}: StaffsInterface) {
	try {

		// Fetching the record
		const result = await db.staffs.findMany({
			where: {
				HotelId: hotel_id,
				NOT:{
					Status: "Inactive"
				}
			}
		});

		// Database is disconnected
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Fetched",
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

// Check if staff exists
interface StaffCheckerInterface {
	first_name: string,
	last_name: string,
	email: string,
	contact: string,
	hotel_id: string
}

export async function check_staff_exists ({
	first_name,
	last_name,
	email,
	contact,
	hotel_id
}: StaffCheckerInterface) {
	try {

		// Fetching the record
		const result = await db.staffs.findMany({
			where: {
				FirstName: first_name,
				LastName: last_name,
				Email: email,
				Contact: contact,
				HotelId: hotel_id,
				NOT:{
					Status: "Inactive"
				}
			}		
		});

		// Database is disconnected
		db.$disconnect();

		if(result.length==0){
			return {
				returncode: 400,
				message: "Staff doesn't exist",
				output: []
			}
		}

		return {
			returncode: 200,
			message: "Data Fetched",
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

// Single Staff Fetch
interface EmailInterface {
	email: string
}

export async function read_staff_details ({
	email
}: EmailInterface) {
	try {

		// Fetching the record
		const result = await db.staffs.findMany({
			where: {
				Email: email,
				NOT:{
					Status: "Inactive"
				}
			}		
		});

		// Database is disconnected
		db.$disconnect();

		if(result.length==0){
			return {
				returncode: 400,
				message: "Category doesn't exist",
				output: []
			}
		}

		return {
			returncode: 200,
			message: "Data Fetched",
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


// Staff Authentication
interface LoginInterface {
	email: string,
}

export async function staff_login ({
	email
}: LoginInterface) {
	try {

		// Fetching the record
		const result = await db.staffs.findMany({
			where: {
				Email: email,
				NOT:{
					Status: "Inactive"
				}
			}		
		});

		// Database is disconnected
		db.$disconnect();

		if(result.length==0){
			return {
				returncode: 400,
				message: "Category doesn't exist",
				output: []
			}
		}

		return {
			returncode: 200,
			message: "Data Fetched",
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
