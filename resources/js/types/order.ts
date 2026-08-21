export interface OrderItem {
    id: number;
    product_name: string;
    variant_label: string | null;
    sku: string;
    unit_price: string;
    quantity: number;
    line_total: string;
}

export interface Order {
    id: number;
    order_number: string;
    status: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string | null;
    shipping_address: string;
    city: string;
    region: string | null;
    notes: string | null;
    subtotal: string;
    shipping_cost: string;
    total: string;
    items: OrderItem[];
    created_at: string;
}
