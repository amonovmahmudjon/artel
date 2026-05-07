
export interface UserLogin {
    userName: string,
    password: string
}

export interface NotifConfig {
  msg: string;
  variant?: "default" | "error" | "success" | "warning" | "info";
  showClose?: () => {};
  duration?: number;
}

export interface ProductTypeChildrenData {
  id: number | null; 
  name: string;       
  sapCode: string;
  description: string; 
  productTypeId: number | null; 
  counterPartyId: number | null; 
  limit: number | null; 
  price: number | null; 
  stateId: number | null; 
  createdDate: string;  
  counterParty: string | null;
  productType: string 
  state: string | null; 
  idIndex?: number | null; 
  new?: boolean; 
}
  // productTables: any[];
  // purchaseProducts: any[];
  // productRevaluationTables: any[];
 


export interface ProductTypeData {
  id: number;
  name: string;
  description: string | null;
  stateId: number;
  state: string;
  createdDate: string;
  products: ProductTypeChildrenData[];
}