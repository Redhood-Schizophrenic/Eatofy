import db from "@/db/connector";

// Details Update
interface ComplianceInterface {
	compliance_id: string,
	description: string | null,
	buffer: Buffer | null,
}

export async function update_compliance_details({
	compliance_id,
	description,
	buffer
}: ComplianceInterface) {
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

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

// Compliance Status Update
interface StatusInterface {
	compliance_id: string,
	status: string 
}

export async function update_compliance_status({
	compliance_id,
	status
}: StatusInterface) {
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

		// Dataaazbase is disconnected
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
