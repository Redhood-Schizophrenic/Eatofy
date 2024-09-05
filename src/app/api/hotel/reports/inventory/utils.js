import { datetime_formatter } from './controller'
function groupBy(arr, key) {
	return arr.reduce((acc, obj) => {
		const groupKey = key.split('.').reduce((o, k) => (o || {})[k], obj);
		if (!acc[groupKey]) {
			acc[groupKey] = {
				items: [],
				Quantity: 0,
				count: 0
			};
		}
		acc[groupKey].items.push(obj);
		acc[groupKey].Quantity += parseFloat(obj.Quantity) || 0;
		acc[groupKey].count += 1;
		return acc;
	}, {});
}

export function values_mapper(orders, key) {
	const groupByOrders = groupBy(orders, key);
	const totalAmt = [];
	const counts = [];
	const category = [];

	for (const [date, data] of Object.entries(groupByOrders)) {
		totalAmt.push(data.Quantity);
		counts.push(data.count);
		category.push(date);
	}

	return {
		Quantity: totalAmt,
		Count: counts,
		Category: category
	}
}

export function stock_values_mapper(data) {
	const summary = {
		'Low Stock': 0,
		'Available': 0,
		'Unavailable': 0,
		'Total': 0,
		'Low':0,
	};

	const today = new Date();
	const today_date = datetime_formatter(today);

	// Iterate through each entry in the attendance data
	data.forEach(entry => {
		const type = entry.Status;

		// Check if the type is valid and increment the corresponding count
		if (summary.hasOwnProperty(type) && entry.Date === today_date) {
			summary[type]++;
		}
	});

	summary['Total'] = summary['Available'] + summary['Low Stock'] + summary['Unavailable'];
	summary['Low'] = summary['Low Stock'];

	return summary;
}
