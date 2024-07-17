import db from "@/db/connector";

// Details Update
interface DetailsInterface {
	supplier_id: string,
	supplier_name: string,
	contact: string,
	email: string,
	gstin: string,
	address: string | null
}

export async function update_supplier_details({
	supplier_id,
	supplier_name,
	contact,
	email,
	gstin,
	address
}: DetailsInterface) {
	try {

		// Updating the record
		const result = await db.suppliers.update({
			where: {
				id: supplier_id
			},
			data: {
				SupplierName: supplier_name,
				Contact: contact,
				Email: email,
				GSTIN: gstin,
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


// Status Update
interface StatusInterface { 
	supplier_id: string,
	status: string
}

export async function update_supplier_status({
	supplier_id,
	status
}: StatusInterface) {
	try {

		// Updating the record
		const result = await db.suppliers.update({
			where: {
				id: supplier_id
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
