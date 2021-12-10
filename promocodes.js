module.exports = {
  validPromoCodes: [
    "BLKFRD08",
    "WELCOME05",
    "CHRISTMAS10",
    "AIRTIME10",
    "ANDROID10",
    "APPLE03",
  ],
  blacklists: {},
  isValidForUser: async function (promoCode, customerId) {
    promoCode = promoCode.toUpperCase();
    let promoCodeBlacklist = this.blacklists[promoCode] || [];
    if (promoCodeBlacklist.includes(customerId)) {
      return false;
    }
    return true;
  },
  markAsInvalidForUser: async function (promoCode, userId) {
    let blacklistFunction = this.blacklist.bind(this, promoCode, userId);
    return await new Promise(function (resolve) {
      setTimeout(() => {
        resolve(blacklistFunction());
      }, 10);
    });
  },
  getValue: async function (promoCode) {
    promoCode = promoCode.toUpperCase();
    if (!this.validPromoCodes.includes(promoCode)) return 0;
    return Number.parseInt(promoCode.slice(-2));
  },
  blacklist: function (promoCode, customerId) {
    promoCode = promoCode.toUpperCase();
    let promoCodeBlacklist = this.blacklists[promoCode] || [];
    if (!promoCodeBlacklist.includes(customerId)) {
      promoCodeBlacklist.push(customerId);
    }
    this.blacklists[promoCode] = promoCodeBlacklist;
    return true;
  },
};
