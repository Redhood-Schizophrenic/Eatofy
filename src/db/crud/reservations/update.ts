import db from "@/db/connector";

// Update Status
interface StatusInterface {
	reservation_id: string,
	status: string
}

export async function update_reservation_status({
	reservation_id,
	status
}: StatusInterface) {
	try {

		// Updating the record
		const result = await db.tableReservation.update({
			where: {
				id: reservation_id
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
