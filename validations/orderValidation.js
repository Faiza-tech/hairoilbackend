const validateOrder = (data) => {

  const {
    orderItems,
    shippingAddress,
    totalPrice,
  } = data;

  // EMPTY CART
  if (!orderItems || orderItems.length === 0) {
    return "Cart is empty";
  }

  // SHIPPING
  if (!shippingAddress) {
    return "Shipping address required";
  }

  const {
    fullName,
    phone,
    addressLine1,
    city,
    state,
    postalCode,
    country,
  } = shippingAddress;

  // REQUIRED
  if (
    !fullName?.trim() ||
    !phone?.trim() ||
    !addressLine1?.trim() ||
    !city?.trim() ||
    !state?.trim() ||
    !postalCode?.trim() ||
    !country?.trim()
  ) {
    return "All fields are required";
  }

  // NAME VALIDATION
  const nameRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(fullName)) {
    return "Name should contain only letters";
  }

  if (fullName.trim().length < 3) {
    return "Name must be at least 3 characters";
  }

  // CITY VALIDATION
  const cityRegex = /^[A-Za-z\s]+$/;

  if (!cityRegex.test(city)) {
    return "City should contain only letters";
  }

  // ADDRESS VALIDATION
  if (addressLine1.trim().length < 5) {
    return "Address too short";
  }

  if (!/[A-Za-z]/.test(addressLine1)) {
    return "Address must contain letters";
  }

  //Validations for state/country
  const stateRegex = /^[A-Za-z\s]+$/;

  if (!stateRegex.test(state)) {
    return "State should contain only letters";
  }

  const countryRegex = /^[A-Za-z\s]+$/;

  if (!countryRegex.test(country)) {
    return "Country should contain only letters";
  }

  //postal code validation
  const postalCodeRegex = /^[A-Za-z0-9 -]{4,10}$/;

  if (
    !postalCodeRegex.test(postalCode.trim())
  ) {
    return "Invalid postal code";
  }
  

  // PHONE VALIDATION
  const phoneRegex = /^\d{10,15}$/;

  if (!phoneRegex.test(phone)) {
    return "Phone must contain only numbers (10-15 digits)";
  }

  // TOTAL PRICE
  if (
    typeof totalPrice !== "number" ||
    totalPrice <= 0
  ) {
    return "Invalid total price";
  }

  // ORDER ITEMS
  for (const item of orderItems) {

    if (!item.name) {
      return "Product name missing";
    }

    if (!item.product) {
      return "Product ID missing";
    }

    if (
      typeof item.qty !== "number" ||
      item.qty <= 0
    ) {
      return "Invalid quantity";
    }

    if (
      typeof item.price !== "number" ||
      item.price <= 0
    ) {
      return "Invalid product price";
    }
  }

  return null;
};

module.exports = validateOrder;