export interface IBeer {
  id?: number;
  name?: string;
  brewery?: string;
}

export class Beer implements IBeer {
  constructor(
    public id?: number,
    public name?: string,
    public brewery?: string
  ) {}
}
