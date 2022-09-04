export interface transfers {
  date: string;
  receiver: string;
  transferror: string;
  amount: number;
}

export interface transactions {
  transactions: transfers[];
}
export interface transactionsId extends transactions {
  id: string;
}
