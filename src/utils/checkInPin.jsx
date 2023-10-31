export function checkInPin(products, item) {
    return products.find((c) => c._id === item._id);
  }