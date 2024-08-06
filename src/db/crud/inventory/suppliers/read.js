import db from "@/db/connector";

// Fetch all suppliers

export async function read_suppliers({
	hotel_id
}) {
	try {

		// Fetching the record
		const result = await db.suppliers.findMany({
			where: {
				HotelId: hotel_id,
				NOT: {
					Status: "Inactive"
				},
			},
			orderBy: {
				SupplierName: "asc"
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


// Check if supplier exists
export async function check_supplier({
	supplier_name,
	contact,
	hotel_id
}) {
	try {

		// Fetching the record
		const result = await db.suppliers.findMany({
			where: {
				SupplierName: supplier_name,
				Contact: contact,
				HotelId: hotel_id,
				NOT:{
					Status: "Inactive"
				}
			}
		});

		// Database is disconnected
		db.$disconnect();

		if (result.length == 0) {
			return {
				returncode: 400,
				message: "Supplier doesn't exist",
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


// Supplier Info
export async function read_supplier({
	supplier_id
}) {
	try {

		// Fetching the record
		const result = await db.suppliers.findMany({
			where: {
				id: supplier_id,
				NOT:{
					Status: "Inactive"
				}
			}
		});

		// Database is disconnected
		db.$disconnect();

		if (result.length == 0) {
			return {
				returncode: 400,
				message: "Supplier doesn't exist",
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
