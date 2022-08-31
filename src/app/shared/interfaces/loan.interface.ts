export interface loa {
  name: string;
  amount: string;
}

export interface loans {
  loans: loa[];
}
export interface loanId extends loans {
  id: string;
}
