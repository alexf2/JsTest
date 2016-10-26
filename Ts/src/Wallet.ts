import * as intf from "./IWallet";

class Wallet implements intf.IWallet {
    private _amount: number;

    constructor(initialAmt: number) {
        this._amount = initialAmt;
    }

    get amount(): number {
        return this._amount;
    }
     

    credit(amt: number): void {
        if (amt <= 0)
            throw new Error("Can't credit zero or negative value");

        this._amount += amt; 
    }

    debit(amt: number): boolean {
        if (amt <= 0)
            throw new Error("Can't debit zero or negative value");

        if (this._amount >= amt)
        {
            this._amount -= amt;
            return true;
        }
        return false;
    }    
} 

export {Wallet};