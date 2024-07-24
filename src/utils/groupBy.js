// utils/groupBy.js
export function groupBy(arr, key) {
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
        acc[groupKey].TotalAmount += obj.TotalAmount || 0;
        acc[groupKey].count += 1;
        return acc;
    }, {});
}
