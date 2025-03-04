


export type OrderModel = {
    email:string,
    name?:string,
    phone_number?:string,
    address?:string,
    totalPrice:number,
    status?: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled";
    transaction?: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
}


export type Id = {
  sp_order_id:string,
  customer_email:string
}