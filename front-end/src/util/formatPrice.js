export function formatPrice (price) {
    return (
        price.toLocaleString("en-US", {style: "currency", currency: "USD"})
    )
}