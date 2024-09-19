import db from "@/db/connector";

// Fetch all categories
export async function read_hotel_staffs({
	hotel_id
}) {
	try {

		// Fetching the record
		const result = await db.staffs.findMany({
			where: {
				HotelId: hotel_id,
				NOT: {
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

	} catch (error) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

// Check if staff exists
export async function check_staff_exists({
	first_name,
	last_name,
	email,
	contact,
	hotel_id
}) {
	try {

		// Fetching the record
		const result = await db.staffs.findMany({
			where: {
				FirstName: first_name,
				LastName: last_name,
				Email: email,
				Contact: contact,
				HotelId: hotel_id,
				NOT: {
					Status: "Inactive"
				}
			}
		});

		// Database is disconnected
		db.$disconnect();

		if (result.length == 0) {
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

	} catch (error) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

// Single Staff Fetch
export async function read_staff_details({
	email
}) {
	try {

		// Fetching the record
		const result = await db.staffs.findMany({
			where: {
				Email: email,
				NOT: {
					Status: "Inactive"
				}
			}
		});

		// Database is disconnected
		db.$disconnect();

		if (result.length == 0) {
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

	} catch (error) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}


// Staff Authentication
export async function staff_login({
	email
}) {
	try {

		// Fetching the record
		const result = await db.staffs.findMany({
			where: {
				Email: email,
				NOT: {
					Status: "Inactive"
				}
			}
		});

		const hotel_id = result[0].HotelId;

		const subscription_check = await db.hotel_Subscription.findMany({
			where: {
				HotelId: hotel_id,
				isValid: true
			}
		});

		// Database is disconnected
		db.$disconnect();

		if (result.length == 0) {
			return {
				returncode: 400,
				message: "Staff doesn't exist",
				output: []
			}
		}

		if (subscription_check.length != 0) {

			return {
				returncode: 200,
				message: "Data Fetched",
				output: result
			};
		}
		else {
			return {
				returncode: 403,
				message: "Subscription Expired",
				output: []
			}
		}

	} catch (error) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}
