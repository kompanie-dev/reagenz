export class TimeService {
    formatDate(date) {
        const padLeft = number => `${number}`.padStart(2, "0");
    
        const formattedString =
            `${padLeft(date.getHours())}:` +
            `${padLeft(date.getMinutes())}:` +
            `${padLeft(date.getSeconds())} ` +
            `${padLeft(date.getDate())}.` +
            `${padLeft(date.getMonth() + 1)}.` +
            `${padLeft(date.getFullYear())}`;
    
        return formattedString;
    }
}