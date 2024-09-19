import db from "@/db/connector";

// Details Update
export async function update_compliance_details({
	compliance_id,
	description,
	buffer
}) {
	try {

		// Updating the record
		const result = await db.complianceChecklist.update({
			where: {
				id: compliance_id
			},
			data: {
				Description: description,
				Document: buffer
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

// Compliance Status Update
export async function update_compliance_status({
	compliance_id,
	status
}) {
	try {

		// Updating the record
		const result = await db.complianceChecklist.update({
			where: {
				id: compliance_id
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
