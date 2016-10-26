export interface IWallet {
    readonly amount: number;

    credit(amt: number): void;

    debit(amt: number): boolean;
}