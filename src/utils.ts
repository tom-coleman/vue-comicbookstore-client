// From https://flaviocopes.com/how-to-format-number-as-currency-javascript/
import type {BookItem} from "@/types";

const PriceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
});

export const asDollarsAndCents = function (cents: number) {
    return PriceFormatter.format(cents / 100.0);
};

const bookImageFileName = function (book: BookItem): string {
    let name = book.title.toLowerCase()
    name = name.replace(/ /g, '-')
    name = name.replace(/'/g, '')
    name = name.replace(/:/g, '')
    return `${name}.jpeg`
}
const bookImagePrefix = `${import.meta.env.BASE_URL}/book-images`
export const bookImageFile = function(book: BookItem): string {
    return `${bookImagePrefix}/${bookImageFileName(book)}`
}