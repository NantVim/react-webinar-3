export default function parseDate(date1) {
    const date = new Date(date1);

    return `${date.getDate()} ${date.toLocaleDateString('ru-RU', {month: 'long'})} ${date.getFullYear()} в ${date.getHours()<10? '0':''}${date.getHours()}:${date.getMinutes()<10?'0':''}${date.getMinutes()}`;
}