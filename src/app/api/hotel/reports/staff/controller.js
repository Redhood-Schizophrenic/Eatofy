import { sales_values_mapper, attendance_values_mapper } from "./utils";
import { read_bill_info_by_staff } from '../../../../../db/crud/bills/management/read'
import { read_staff_attendance } from "../../../../../db/crud/staff/attendance/read";

const datetime_formatter = (date) => {
	// Get the day, month, and year
	const day = date.getDate();
	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const month = monthNames[date.getMonth()];
	const year = date.getFullYear();

	// Combine the day, month, and year with the ordinal suffix
	const formattedDate = `${day} ${month} ${year}`;
	return formattedDate;
}

export async function fetch_staff_reports(data) {
	try {

		const staff_id = data['staff_id'] || null;
		const from = data['from'] || null;
		const to = data['to'] || null;

		// Default Invalid Checker
		if (staff_id == null || from == null || to == null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}
		}
		const from_date = new Date(from);
		const to_date = new Date(to);

		// Fetch 
		const data_fetcher = await Performance_Calculator(staff_id, from_date, to_date);

		return {
			returncode: 200,
			message: "Staff Report",
			output: [ data_fetcher ]
		};

	} catch (error) {
		console.error(error)
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}

const Sales_Data = async (staff_id, from_date, to_date) => {

	const data = await read_bill_info_by_staff({ staff_id });
	const sales_data = data.output.filter((staff) => {
		staff.Datetime = new Date(staff.createdAt);
		staff.Date = datetime_formatter(staff.Datetime);
		return from_date <= staff.Datetime && to_date >= staff.Datetime;
	});

	const sales_metrics = sales_values_mapper(sales_data, "Status");
	const total_amount = sales_metrics?.Amount[0];
	const orders = sales_metrics?.Count[0];
	const sales_chart = sales_values_mapper(sales_data, "Date");

	return {
		Data: sales_data,
		Total: total_amount,
		Orders: orders,
		Chart: sales_chart
	}
}

const Attendance_Data = async (staff_id, from_date, to_date) => {
	const data = await read_staff_attendance({ staff_id });
	const attendance_data = data.output.filter((staff) => {
		staff.Datetime = new Date(staff.createdAt);
		return from_date <= staff.Datetime && to_date >= staff.Datetime;
	});

	const attendance_metrics = attendance_values_mapper(attendance_data);
	const present = attendance_metrics.Present;
	const absent = attendance_metrics.Absent;
	const half_days = attendance_metrics["Half-Day"];
	const total = attendance_data.length;

	return {
		'Present': {
			Count: present,
			Ratio: ((present / total) * 100 | 0) || 0
		},
		'Absent': {
			Count: absent,
			Ratio: ((absent / total) * 100 | 0) || 0
		},
		'Half-Days': {
			Count: half_days,
			Ratio: ((half_days / total) * 100 | 0) || 0
		},
		'Total': total,

	}
}

const Performance_Calculator = async (staff_id, from_date, to_date) => {

	const sales_data = await Sales_Data(staff_id, from_date, to_date);
	const attendance_data = await Attendance_Data(staff_id, from_date, to_date);
	const total_revenue = sales_data.Total || 0;
	const total_orders = sales_data.Orders || 0;
	const days_present = attendance_data.Present.Count || 0;
	const total_days = attendance_data.Total || 0;
	const attendance_weight = 0.5;
	const order_weight = 0.5;

	// Performance_Calculator
	const performance = (((total_revenue / days_present) * order_weight ) + ( (total_orders / days_present) * attendance_weight)) || 0;
	const total_performance = (((total_revenue / total_days) * order_weight) + ((total_orders / total_days) * attendance_weight)) || 0;

	const performance_percent = (( performance / total_performance ) * 100) || 0;
	let performance_grade;
	if (performance_percent > 90) {
		performance_grade = "Excellent Performance";
	}
	else if ( performance_percent > 75 && performance_percent < 90 ) {
		performance_grade = "Good Performance";
	}
	else if ( performance_percent > 50 && performance_percent < 75 ){
		performance_grade = "Needs Improvement";
	}
	else if ( performance_grade < 50 ){
		performance_grade = "Poor Performance";
	}
	else {
		performance_grade = "New Joinee"
	}

	return {
		Performance: {
			Grade: performance_grade,
			Percent: performance_percent || 0
		},
		Sales: {
			Amount: total_revenue,
			Orders: total_orders,
			Data: sales_data.Data
		},
		Attendance: attendance_data
	}
}
