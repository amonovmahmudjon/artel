import SaleClientTable from "@/pages/sale/expenseproduct/tables/SaleClientTable";

export interface UserLogin {
  userName: string;
  password: string;
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
  productType: string;
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

export interface PaymentHistoryData {
  id: number;
  operationTypeId: number;
  organizationId: number;
  paymentSystemTypeId: number;
  paymentDate: string;
  currencyId: number;
  amount: number;
  description: string;
  transactionTypeId: number;
  paymentStatusId: number;
  stateId: number;
  bankId: number;
  cashboxId: number;
  clientId: number;
  saleId: 2468;
  counterPartyId: null;
  createdDate: string;
  exchangeRate: number;
  cashbox: string;
  currency: string;
  bank: string;
  operationType: string;
  organization: string;
  paymentSystemType: string;
  state: string;
  transactionType: string;
  docNumber: string;
  client: string;
  counterParty: string;
  paymentStatus: string;
  transactionScopeId: number;
}

export interface SaleClientTableType {
  id: number;
  docNumber: string;
  storeClient: string;
  sellingPrice: number;
  soldPrice: number;
  address: string;
  docDate: string;
  storeEmployee: string;
  state: string;
  stateId: number;
  storeClientId: number;
  storeWarehouseId: number;
  organizationId: number;
  saleTypeId: null;
  saleType: null;
  storeEmployeeId: number;
  statusId: number;
  createdUserId: number;
  modifiedUserId: null;
  description: string | null;
  status: string;
  clientNumber: string;
  tables: SaleClientChildTable[];
  payments: SaleClientPayments[];
}

export interface SaleClientPayments {
  id: number;
  saleId: number;
  operationType: string;
  operationTypeId: number;
  organizationId: number;
  paymentSystemType: string;
  paymentSystemTypeId: number;
  paymentDate: string;
  currencyId: number;
  exchangeRate: number;
  amount: number;
  description: string | null;
  transactionTypeId: number;
  stateId: number;
  bankId: null;
  cashboxId: number;
  clientId: number;
  createdDate: string;
}
export interface SaleClientChildTable {
  id: number;
  ownerId: number;
  productTableId: number;
  productId: number;
  productTypeId: number;
  soldPrice: number;
  sellingPrice: number;
  organizationId: number;
  organization: string;
  productTable: string;
  product: string;
  productType: string;
  serialNumber: string;
}
export interface ClientTableDataType {
  results: SaleTableData[];
}
export interface SaleTableData {
  id: number;
  name: string;
  price: number;
  productId: number;
  serialNumber: string;
  salePrice: number;
  product: string;
  markupPrice: number;
  percent: number;
  currencyExchangeRate: number;
  purchasePrice: number;
}

export interface ProductSaleTablesData {
  productTableId: number;
  soldPrice: number;
  productId: number;

  name: string;
  price: number;
  serialNumber: string;
  salePrice: number;
  id: number;
  product: string;
}
           