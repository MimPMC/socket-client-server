export interface ServerToClientEvents {
  // Event for sending confirmation message to client
  orderCreated: (orderId: string) => void;
  customerCreated: (customerId: string) => void;
  error: (errorMessage: string) => void;
}

export interface ClientToServerEvents {
  // Event for sending WooCommerce order data to the server
  createOrder: (orderData: any) => void;
  
  // Event for sending WooCommerce customer data to the server
  createCustomer: (customerData: any) => void;
}

export interface InterServerEvents {
  // Add any additional inter-server events here if needed
}

export interface SocketData {
  // You may not need this interface for your specific use case
  // If you do, adapt it according to your needs
}
