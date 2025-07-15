const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface Shipment {
  id: string;
  trackingNumber: string;
  origin: string;
  destination: string;
  status: string;
  shippedDate: string;
  estimatedDelivery: string;
  actualDelivery: string | null;
  weight: number;
  dimensions: string;
  carrier: string;
  priority: string;
  customer: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    unitPrice: number;
  }>;
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  minStock: number;
  maxStock: number;
  unitPrice: number;
  supplier: string;
  lastRestocked: string;
  status: string;
}

export interface Analytics {
  shipments: {
    total: number;
    inTransit: number;
    delivered: number;
    delayed: number;
    returned: number;
  };
  revenue: {
    total: number;
    thisMonth: number;
    lastMonth: number;
    growth: number;
    monthlyData?: Array<{
      month: string;
      revenue: number;
      expenses: number;
      profit: number;
    }>;
  };
  performance: {
    onTimeDelivery: number;
    averageTransitTime: number;
    customerSatisfaction: number;
    weeklyData?: Array<{
      week: string;
      onTime: number;
      delayed: number;
      avgTime: number;
    }>;
  };
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Shipments
  async getShipments(): Promise<Shipment[]> {
    return this.request<Shipment[]>('/shipments');
  }

  async getShipment(id: string): Promise<Shipment> {
    return this.request<Shipment>(`/shipments/${id}`);
  }

  async createShipment(shipment: Omit<Shipment, 'id'>): Promise<Shipment> {
    return this.request<Shipment>('/shipments', {
      method: 'POST',
      body: JSON.stringify(shipment),
    });
  }

  async updateShipment(id: string, shipment: Partial<Shipment>): Promise<Shipment> {
    return this.request<Shipment>(`/shipments/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(shipment),
    });
  }

  async deleteShipment(id: string): Promise<void> {
    await this.request(`/shipments/${id}`, {
      method: 'DELETE',
    });
  }

  // Inventory
  async getInventory(): Promise<InventoryItem[]> {
    return this.request<InventoryItem[]>('/inventory');
  }

  async getInventoryItem(id: string): Promise<InventoryItem> {
    return this.request<InventoryItem>(`/inventory/${id}`);
  }

  async updateInventoryItem(id: string, item: Partial<InventoryItem>): Promise<InventoryItem> {
    return this.request<InventoryItem>(`/inventory/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(item),
    });
  }

  // Analytics
  async getAnalytics(): Promise<Analytics> {
    return this.request<Analytics>('/analytics');
  }

  // Search shipments
  async searchShipments(query: string): Promise<Shipment[]> {
    return this.request<Shipment[]>(`/shipments?q=${encodeURIComponent(query)}`);
  }

  // Get shipments by status
  async getShipmentsByStatus(status: string): Promise<Shipment[]> {
    return this.request<Shipment[]>(`/shipments?status=${encodeURIComponent(status)}`);
  }
}

export const apiService = new ApiService(); 