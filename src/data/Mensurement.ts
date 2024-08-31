interface Measurement {
    image: string;
    customer_code: string;
    measure_datetime: Date; // Assumindo que 'measure_datetime' é uma data
    measure_type: 'WATER' | 'GAS';
}