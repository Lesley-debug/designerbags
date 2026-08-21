export interface DashboardData {
    revenue: { today: number; week: number; month: number };
    orders: { today: number; week: number; month: number };
    statusBreakdown: Record<string, number>;
    lowStock: {
        id: number;
        sku: string;
        color: string | null;
        size: string | null;
        stock_quantity: number;
        product: { name: string; slug: string };
    }[];
    recentOrders: {
        id: number;
        order_number: string;
        customer_name: string;
        status: string;
        total: string;
        created_at: string;
    }[];
    topProducts: {
        product_name: string;
        sku: string;
        total_sold: number;
        total_revenue: string;
    }[];
    newCustomersThisMonth: number;
}
