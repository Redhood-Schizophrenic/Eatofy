import { delete_notifications } from "@/db/crud/notifications/management/update";

export async function notifications_delete() {
	try {

		// Delete Notifications
		const end_result = await delete_notifications();

		return {
			returncode: 200,
			message: "Notifications Deleted!!!!",
			output: end_result.output
		};

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
