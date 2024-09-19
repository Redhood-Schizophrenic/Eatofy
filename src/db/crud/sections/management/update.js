import db from "@/db/connector";

export async function update_section_name({
	section_id,
	section_name
}) {
	try {

		// Updating the record
		const result = await db.sections.update({
			where: {
				id: section_id
			},
			data: {
				SectionName: section_name
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

// Section Status Update
export async function update_section_status({
	section_id,
	status
}) {
	try {

		// Updating the record
		const result = await db.sections.update({
			where: {
				id: section_id
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

	} catch (error) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}
