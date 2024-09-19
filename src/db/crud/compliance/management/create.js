import db from "@/db/connector";

// With Image
export async function create_compliance_with_image({
	compliance_name,
	description,
	hotel_id,
	buffer
}) {
	try {
		// Inserting the Data
		const result = await db.complianceChecklist.create({
			data: {
				HotelId: hotel_id,
				ComplianceName: compliance_name,
				Description: description,
				Document: buffer
			},
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

// Without Image
export async function create_compliance_without_image({
	compliance_name,
	description,
	hotel_id,
}) {
	try {

		// Inserting the Data
		const result = await db.complianceChecklist.create({
			data: {
				HotelId: hotel_id,
				ComplianceName: compliance_name,
				Description: description,
			},
		});

		// Disconnect the Database
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Inserted",
			output: result
		};

	} catch (error) {

		// Error thrown
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
