import db from "@/db/connector";

export async function create_supplier ({
	supplier_name,
	contact,
	email,
	gstin,
	address,
	hotel_id,
	supplier_type
}) {
	try {

		// Inserting the record
		const result = await db.suppliers.create({
			data: {
				SupplierName: supplier_name,
				Contact: contact,
				Email: email,
				GSTIN: gstin,
				Address: address,
				SupplierType: supplier_type,
				HotelId: hotel_id
			}
		});

		// Database is disconnected
		db.$disconnect();

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
