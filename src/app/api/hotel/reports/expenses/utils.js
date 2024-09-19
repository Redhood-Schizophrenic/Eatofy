function groupBy(arr, key) {
    return arr.reduce((acc, obj) => {
        const groupKey = key.split('.').reduce((o, k) => (o || {})[k], obj);
        if (!acc[groupKey]) {
            acc[groupKey] = {
                items: [],
                TotalAmount: 0,
                count: 0
            };
        }
        acc[groupKey].items.push(obj);
        acc[groupKey].TotalAmount += obj.AmountPaid || 0;
        acc[groupKey].count += 1;
        return acc;
    }, {});
}

export function values_mapper(orders, key) {
	const groupByOrders = groupBy(orders, key);
	const totalAmt = [];
	const counts = [];
	const dates = [];

	for (const [date, data] of Object.entries(groupByOrders)) {
		totalAmt.push(data.TotalAmount);
		counts.push(data.count);
		dates.push(date);
	}

	return {
		Amount: totalAmt,
		Count: counts,
		Category: dates
	}
}
