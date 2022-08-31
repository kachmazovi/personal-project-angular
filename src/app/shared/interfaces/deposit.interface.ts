interface dep {
  name: string;
  amount: string;
}

export interface deposits {
  deposits: dep[];
}
export interface depositId extends deposits {
  id: string;
}
