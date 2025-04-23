
// format date - dd-mm-yy
export const getFormattedDate = () => {
    const date = new Date(Date.now());
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year

    return `${day}-${month}-${year}`;
};

// add days using it
export const addDaysToDate = (formattedDate, daysToAdd) => {
    const [day, month, year] = formattedDate.split('-').map(Number);

    // Create a Date object from the given date
    const date = new Date(`20${year}-${month}-${day}`); // Assuming '20' + YY for the year

    // Add the specified days
    date.setDate(date.getDate() + daysToAdd);

    // Get the new date components
    const newDay = String(date.getDate()).padStart(2, '0');
    const newMonth = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const newYear = String(date.getFullYear()).slice(-2); // Get last two digits of the year

    return `${newDay}-${newMonth}-${newYear}`;
};