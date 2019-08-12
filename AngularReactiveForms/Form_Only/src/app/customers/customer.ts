export interface ICustomer {
  firstName: string;
  lastName: string;
  email: string;
  sendCatalog: boolean;
  addressType: string;
  street1?: string;
  street2?: string;
  city?: string;
  state: string;
  zip?: string;
}
export class Customer implements ICustomer {
  constructor(
    public firstName = '',
    public lastName = '',
    public email = '',
    public sendCatalog = false,
    public addressType = 'home',
    public street1?: string,
    public street2?: string,
    public city?: string,
    public state = '',
    public zip?: string
  ) {}
}
