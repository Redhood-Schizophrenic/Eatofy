import db from "@/db/connector";

export async function create_staff_attendance ({
	date,
	arrival_time,
	departure_time,
	type,
	note,
	staff_id
}) {
	try {

		// Inserting the record
		const result = await db.staffAttendance.create({
			data: {
				Date: date,
				Arrival: arrival_time,
				Departure: departure_time,
				Type: type,
				Note: note,
				StaffId: staff_id
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
