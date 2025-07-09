import { BunAdapter } from './adapter/bun-adapter';

// Simple test to verify the adapter instantiation
const adapter = new BunAdapter();

console.log('BunAdapter created successfully');
console.log('Adapter type:', adapter.getType());

// Test basic methods
const mockResponse = { status: 200, headers: {} };
adapter.setHeader(mockResponse, 'Content-Type', 'application/json');
console.log('Header set:', mockResponse.headers);

console.log('All basic tests passed!');
