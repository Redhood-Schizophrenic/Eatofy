import { read_notifications } from "../../../../db/crud/notifications/management/read";
import { inventory_notifications, reservations_notifications, subscriptions_notifications } from './supporting';

export async function notifications(data) {
	try {

		const hotel_id = data['hotel_id'] || null;

		// Default Invalid Checker
		if (hotel_id === null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Add Notifications
		await inventory_notifications(hotel_id);
		await reservations_notifications(hotel_id);
		await subscriptions_notifications(hotel_id);

		// Read Notifications
		const end_result = await read_notifications({ hotel_id });

		return {
			returncode: 200,
			message: "Notifications Fetched",
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
