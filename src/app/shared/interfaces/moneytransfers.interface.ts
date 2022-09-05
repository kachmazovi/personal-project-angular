export interface addMoneytransfers {
  code: string;
  amount: number;
}

export interface getMoneytransfers extends addMoneytransfers {
  transfers: addMoneytransfers[];
  id: string;
}
