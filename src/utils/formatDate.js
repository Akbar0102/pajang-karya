export const formatDate = (date) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"
    ];

    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = monthNames[newDate.getMonth()];
    const year = newDate.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
}