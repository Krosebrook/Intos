/**
 * Backend Connection Test Suite
 * 
 * Run this to verify your Supabase backend is properly configured.
 * 
 * Usage:
 * ```tsx
 * import { runBackendTests } from './lib/test-backend';
 * 
 * // In a component or on app load:
 * runBackendTests().then(results => {
 *   console.log('Test Results:', results);
 * });
 * ```
 */

import { apiClient } from './api-client';
import { createClient, getCurrentUser } from '../utils/supabase/client';

export interface TestResult {
  name: string;
  passed: boolean;
  message: string;
  duration: number;
}

export interface TestSuite {
  passed: number;
  failed: number;
  total: number;
  results: TestResult[];
}

async function runTest(
  name: string,
  testFn: () => Promise<void>
): Promise<TestResult> {
  const start = Date.now();
  
  try {
    await testFn();
    return {
      name,
      passed: true,
      message: 'Test passed',
      duration: Date.now() - start
    };
  } catch (error: any) {
    return {
      name,
      passed: false,
      message: error.message || 'Test failed',
      duration: Date.now() - start
    };
  }
}

/**
 * Test 1: Health Check
 */
async function testHealthCheck(): Promise<void> {
  const response = await apiClient.get('/health');
  
  if (response.status !== 'ok') {
    throw new Error('Health check failed: status is not "ok"');
  }
  
  if (!response.version) {
    throw new Error('Health check failed: version missing');
  }
}

/**
 * Test 2: KV Store - Set Value
 */
async function testKVSet(): Promise<void> {
  const testKey = `test:${Date.now()}`;
  const testValue = { test: true, timestamp: Date.now() };
  
  await apiClient.post(`/kv/${testKey}`, { value: testValue });
}

/**
 * Test 3: KV Store - Get Value
 */
async function testKVGet(): Promise<void> {
  const testKey = `test:${Date.now()}`;
  const testValue = { test: true, data: 'Hello World' };
  
  // Set value
  await apiClient.post(`/kv/${testKey}`, { value: testValue });
  
  // Get value
  const response = await apiClient.get(`/kv/${testKey}`);
  
  if (!response.value) {
    throw new Error('Get failed: value is null');
  }
  
  if (response.value.data !== testValue.data) {
    throw new Error('Get failed: value mismatch');
  }
  
  // Cleanup
  await apiClient.delete(`/kv/${testKey}`);
}

/**
 * Test 4: KV Store - Delete Value
 */
async function testKVDelete(): Promise<void> {
  const testKey = `test:${Date.now()}`;
  
  // Set value
  await apiClient.post(`/kv/${testKey}`, { value: 'test' });
  
  // Delete value
  await apiClient.delete(`/kv/${testKey}`);
  
  // Verify deleted
  try {
    await apiClient.get(`/kv/${testKey}`);
    throw new Error('Delete failed: value still exists');
  } catch (error: any) {
    if (!error.message.includes('404')) {
      throw error;
    }
  }
}

/**
 * Test 5: KV Store - Get by Prefix
 */
async function testKVPrefix(): Promise<void> {
  const prefix = `test_prefix_${Date.now()}`;
  
  // Set multiple values
  await apiClient.post(`/kv/${prefix}:1`, { value: 'one' });
  await apiClient.post(`/kv/${prefix}:2`, { value: 'two' });
  await apiClient.post(`/kv/${prefix}:3`, { value: 'three' });
  
  // Get by prefix
  const response = await apiClient.get(`/kv/prefix/${prefix}`);
  
  if (!response.values || response.values.length !== 3) {
    throw new Error(`Prefix query failed: expected 3 values, got ${response.values?.length || 0}`);
  }
  
  // Cleanup
  await apiClient.delete(`/kv/${prefix}:1`);
  await apiClient.delete(`/kv/${prefix}:2`);
  await apiClient.delete(`/kv/${prefix}:3`);
}

/**
 * Test 6: Supabase Client Initialization
 */
async function testSupabaseClient(): Promise<void> {
  const supabase = createClient();
  
  if (!supabase) {
    throw new Error('Supabase client initialization failed');
  }
  
  // Test a simple operation
  const { error } = await supabase.auth.getSession();
  
  if (error && error.message !== 'Auth session missing!') {
    throw new Error(`Supabase client error: ${error.message}`);
  }
}

/**
 * Test 7: Error Handling
 */
async function testErrorHandling(): Promise<void> {
  try {
    // Try to get a non-existent key
    await apiClient.get('/kv/this_key_definitely_does_not_exist_12345');
    throw new Error('Error handling failed: should have thrown 404');
  } catch (error: any) {
    if (!error.message.includes('404')) {
      throw new Error(`Error handling failed: wrong error - ${error.message}`);
    }
  }
}

/**
 * Test 8: Large Data Storage
 */
async function testLargeData(): Promise<void> {
  const testKey = `test:large:${Date.now()}`;
  const largeData = {
    array: Array(100).fill({ id: 1, name: 'test', nested: { deep: true } }),
    metadata: {
      created: new Date().toISOString(),
      version: '1.0.0'
    }
  };
  
  // Set large data
  await apiClient.post(`/kv/${testKey}`, { value: largeData });
  
  // Get and verify
  const response = await apiClient.get(`/kv/${testKey}`);
  
  if (response.value.array.length !== 100) {
    throw new Error('Large data test failed: array length mismatch');
  }
  
  // Cleanup
  await apiClient.delete(`/kv/${testKey}`);
}

/**
 * Run all backend tests
 */
export async function runBackendTests(): Promise<TestSuite> {
  console.log('🧪 Running INT OS Backend Tests...\n');
  
  const tests = [
    { name: '1. Health Check', fn: testHealthCheck },
    { name: '2. KV Store - Set Value', fn: testKVSet },
    { name: '3. KV Store - Get Value', fn: testKVGet },
    { name: '4. KV Store - Delete Value', fn: testKVDelete },
    { name: '5. KV Store - Get by Prefix', fn: testKVPrefix },
    { name: '6. Supabase Client Init', fn: testSupabaseClient },
    { name: '7. Error Handling', fn: testErrorHandling },
    { name: '8. Large Data Storage', fn: testLargeData },
  ];
  
  const results: TestResult[] = [];
  
  for (const test of tests) {
    process.stdout.write(`Running ${test.name}... `);
    const result = await runTest(test.name, test.fn);
    results.push(result);
    
    if (result.passed) {
      console.log(`✅ PASS (${result.duration}ms)`);
    } else {
      console.log(`❌ FAIL (${result.duration}ms)`);
      console.log(`   Error: ${result.message}`);
    }
  }
  
  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  
  console.log('\n' + '='.repeat(50));
  console.log(`📊 Test Results: ${passed}/${tests.length} passed`);
  
  if (failed > 0) {
    console.log(`⚠️  ${failed} test(s) failed`);
  } else {
    console.log('✨ All tests passed!');
  }
  
  console.log('='.repeat(50) + '\n');
  
  return {
    passed,
    failed,
    total: tests.length,
    results
  };
}

/**
 * Quick connection test (just health check)
 */
export async function testConnection(): Promise<boolean> {
  try {
    const response = await apiClient.get('/health');
    return response.status === 'ok';
  } catch (error) {
    console.error('Connection test failed:', error);
    return false;
  }
}

/**
 * Display test results in a formatted way
 */
export function displayTestResults(suite: TestSuite): void {
  console.table(
    suite.results.map(r => ({
      Test: r.name,
      Status: r.passed ? '✅ PASS' : '❌ FAIL',
      Duration: `${r.duration}ms`,
      Message: r.passed ? 'OK' : r.message
    }))
  );
  
  console.log('\n📈 Summary:');
  console.log(`  Total: ${suite.total}`);
  console.log(`  Passed: ${suite.passed}`);
  console.log(`  Failed: ${suite.failed}`);
  console.log(`  Success Rate: ${((suite.passed / suite.total) * 100).toFixed(1)}%`);
}
