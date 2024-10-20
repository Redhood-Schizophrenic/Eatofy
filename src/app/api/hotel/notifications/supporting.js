import db from "@/db/connector";
import { differenceInDays, parseISO } from 'date-fns';
import { read_reservations_desc } from "@/db/crud/reservations/read";
import { read_notifications } from "../../../../db/crud/notifications/management/read";
import { read_available_stock } from "../../../../db/crud/inventory/available_stock/read";
import { create_notification } from "../../../../db/crud/notifications/management/create";

// Already added notifications
let available_notifications;

export const getTodaysDate = () => {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0'); // Add 1 because getMonth() returns 0-based month
	const day = String(today.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
};

export const get_hotel = async (hotel_id) => {

	const result = await db.hotel_Subscription.findMany({
		where: {
			HotelId: hotel_id,
		}
	});


	return result;
}

// Inventory Notifications
export const inventory_notifications = async (hotel_id) => {

	// Initialise
	let notifications = [];
	available_notifications = await read_notifications({ hotel_id });


	const inventory_data = await read_available_stock({ hotel_id });
	if (inventory_data.returncode === 200) {

		const available_stock = inventory_data.output;

		available_stock.forEach((stock) => {
			if (stock.Status === "Low Stock") {

				const title = "Low Stock Alert";
				const description = `${stock.Items.ItemName} is at low stock with quantity ${stock.Quantity} ${stock.Unit}.`;
				const type = "Inventory";
				const notification = { title, description, type, hotel_id };
				notifications.push(notification);
			}

			if (stock.Status === "Unavailable") {

				const title = "Empty Stock Alert";
				const description = `${stock.Items.ItemName} is empty.`;
				const type = "Inventory";
				const notification = { title, description, type };
				notifications.push(notification);
			}
		});
	}

	// Notification Added
	if (notifications.length > 0) {

		notifications.forEach(async (notification) => {
			await create_notification(notification);
		});
	}
}

// Reservations notifications
export const reservations_notifications = async (hotel_id) => {

	let notifications = [];

	const reservations_data = await read_reservations_desc({ hotel_id });
	const today_date = getTodaysDate();
	if (reservations_data.returncode === 200) {

		const reservations = reservations_data.output;

		reservations.forEach((reservation) => {
			if (reservation.Date === today_date) {

				const title = "Reservations for today";
				const description = `${reservation.Customer.CustomerName} has booked a reservation for ${reservation.Time} for ${reservation.NoOfPersons} people.`;
				const type = "Reservation";
				const notification = { title, description, type, hotel_id };
				notifications.push(notification);
			}
		});
	}

	// Notification Added
	if (notifications.length > 0) {

		notifications.forEach(async (notification) => {
			await create_notification(notification);
		});
	}
}

// Subscription End notification
export const subscriptions_notifications = async (hotel_id) => {
	let notifications = [];

	const hotel_data = await get_hotel(hotel_id);
	if (hotel_data.length > 0) {
		const hotel_info = hotel_data[0];

		const currentDate = new Date();
		const endDate = parseISO(hotel_info.EndDate);
		const daysLeft = differenceInDays(endDate, currentDate);
		if (daysLeft < 7 && daysLeft > 0) {

			const title = "Subscription is gonna end soon...";
			const description = `Your Subscription is gonna end in ${daysLeft} days.`;
			const type = "Subscription";
			const notification = { title, description, type, hotel_id };
			notifications.push(notification);
		}
	}

	// Notification Added
	if (notifications.length > 0) {

		notifications.forEach(async (notification) => {
			await create_notification(notification);
		});
	}

}
