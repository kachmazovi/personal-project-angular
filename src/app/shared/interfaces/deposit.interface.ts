export interface dep {
  date: string;
  amount: number;
}

export interface deposits {
  deposits: dep[];
}
export interface depositId extends deposits {
  id: string;
}
