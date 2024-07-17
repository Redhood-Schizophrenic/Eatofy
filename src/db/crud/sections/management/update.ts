import db from "@/db/connector";

// Section Name Update
interface SectionsNameInterface {
	section_id: string,
	section_name: string 
}

export async function update_section_name({
	section_id,
	section_name
}: SectionsNameInterface) {
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

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

// Section Status Update
interface SectionsUpdateInterface {
	section_id: string,
	status: string 
}

export async function update_section_status({
	section_id,
	status
}: SectionsUpdateInterface) {
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

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}
