import db from "@/db/connector";

interface SupplierInterface {
	supplier_name: string,
	contact: string,
	email: string,
	gstin: string,
	address: string | null,
	hotel_id: string
}

export async function create_supplier ({
	supplier_name,
	contact,
	email,
	gstin,
	address,
	hotel_id
}: SupplierInterface){
	try {

		// Inserting the record
		const result = await db.suppliers.create({
			data: {
				SupplierName: supplier_name,
				Contact: contact,
				Email: email,
				GSTIN: gstin,
				Address: address,
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

	} catch (error: any) {
		
		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}
