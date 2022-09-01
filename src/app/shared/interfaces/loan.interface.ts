export interface loa {
  date: string;
  amount: number;
}

export interface loans {
  loans: loa[];
}
export interface loanId extends loans {
  id: string;
}
