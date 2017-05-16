"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Wallet = (function () {
    function Wallet(initialAmt) {
        this._amount = initialAmt;
    }
    Object.defineProperty(Wallet.prototype, "amount", {
        get: function () {
            return this._amount;
        },
        enumerable: true,
        configurable: true
    });
    Wallet.prototype.credit = function (amt) {
        if (amt <= 0)
            throw new Error("Can't credit zero or negative value");
        this._amount += amt;
    };
    Wallet.prototype.debit = function (amt) {
        if (amt <= 0)
            throw new Error("Can't debit zero or negative value");
        if (this._amount >= amt) {
            this._amount -= amt;
            return true;
        }
        return false;
    };
    return Wallet;
}());
exports.Wallet = Wallet;
//# sourceMappingURL=Wallet.js.map