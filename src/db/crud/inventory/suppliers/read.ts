import db from "@/db/connector";

// Fetch all suppliers
interface SuppliersInterface {
	hotel_id: string
}

export async function read_suppliers({
	hotel_id
}: SuppliersInterface) {
	try {

		// Fetching the record
		const result = await db.suppliers.findMany({
			where: {
				HotelId: hotel_id,
				NOT: {
					Status: "Inactive"
				},
			},
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


// Check if supplier exists
interface SupplierCheckInterface {
	supplier_name: string,	
	contact: string,
	hotel_id: string
}

export async function check_supplier({
	supplier_name,
	contact,
	hotel_id
}: SupplierCheckInterface) {
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

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}


// Supplier Info
interface SupplierInterface {
	supplier_id: string
}

export async function read_supplier({
	supplier_id
}: SupplierInterface) {
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

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}
