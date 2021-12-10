const promocodes = require("./promocodes");

async function getPromoCodeValue(promoCode, customerId) {
  var isPromoCodeValidForThisUser = await promocodes.isValidForUser(
    promoCode,
    customerId
  );
  if (isPromoCodeValidForThisUser) {
    await promocodes.markAsInvalidForUser(promoCode, customerId);
  }
  return await promocodes.getValue(promoCode);
}

async function main() {
  let percentageDiscount = await getPromoCodeValue("CHRISTMAS10", "CUSTOMER-1");
  let percentageDiscount2 = await getPromoCodeValue(
    "CHRISTMAS10",
    "CUSTOMER-1"
  );
  let simultenous = await Promise.all([
    getPromoCodeValue("CHRISTMAS10", "CUSTOMER-2"),
    getPromoCodeValue("CHRISTMAS10", "CUSTOMER-2"),
  ]);
  console.log(percentageDiscount, percentageDiscount2);
  console.log(simultenous);
}

main();
