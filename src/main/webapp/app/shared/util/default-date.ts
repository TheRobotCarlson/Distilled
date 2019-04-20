export const nowDateString = (): string => {
    const date = new Date(Date.now());
    return (
        date.getFullYear().toString() +
        '-' +
        ('0' + (date.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + date.getDate()).slice(-2) +
        'T' +
        date.toTimeString().slice(0, 5)
    );
};
