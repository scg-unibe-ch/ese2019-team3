export class Booking {
    providerId: number;
    clientId: number;
    serviceId: number;
    date: string;
    rating: number;
    bookingStatus: string;
    id: number;
    serviceInfo: {
    serviceTitle: string;
    serviceType: string;
    provider: string;
    price: number;
    description: string;
    city: string;
};
}
