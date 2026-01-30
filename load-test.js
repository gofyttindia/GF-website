import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');
const pageLoadTime = new Trend('page_load_time');

export const options = {
  stages: [
    { duration: '30s', target: 20 },   // Ramp up to 20 users over 30s
    { duration: '1m', target: 20 },    // Stay at 20 users for 1 minute
    { duration: '30s', target: 50 },   // Ramp up to 50 users over 30s
    { duration: '1m', target: 50 },    // Stay at 50 users for 1 minute
    { duration: '30s', target: 100 },  // Ramp up to 100 users over 30s
    { duration: '1m', target: 100 },   // Stay at 100 users for 1 minute
    { duration: '30s', target: 0 },    // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000', 'p(99)<5000'], // 95% < 2s, 99% < 5s
    http_req_failed: ['rate<0.01'],                  // Error rate < 1%
    errors: ['rate<0.01'],                            // Custom error rate < 1%
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

// Pages to test
const pages = [
  { path: '/', name: 'Homepage' },
  { path: '/programs', name: 'Programs' },
  { path: '/trainers', name: 'Trainers' },
  { path: '/transformations', name: 'Transformations' },
  { path: '/reviews', name: 'Reviews' },
  { path: '/about', name: 'About' },
  { path: '/contact', name: 'Contact' },
];

export default function () {
  // Simulate user browsing behavior
  for (const page of pages) {
    const startTime = Date.now();
    const response = http.get(`${BASE_URL}${page.path}`, {
      tags: { name: page.name },
    });
    
    const duration = Date.now() - startTime;
    pageLoadTime.add(duration, { page: page.name });
    
    const success = check(response, {
      [`${page.name} status is 200`]: (r) => r.status === 200,
      [`${page.name} loads in < 3s`]: (r) => r.timings.duration < 3000,
      [`${page.name} has content`]: (r) => r.body.length > 1000,
    });
    
    errorRate.add(!success);
    
    // Simulate user reading time (1-3 seconds)
    sleep(Math.random() * 2 + 1);
  }
}

export function handleSummary(data) {
  return {
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
    'summary.json': JSON.stringify(data),
  };
}

function textSummary(data, options) {
  // Simple text summary
  return `
Load Test Summary
=================
Duration: ${data.state.testRunDurationMs / 1000}s
VUs: ${data.metrics.vus.values.max}
Requests: ${data.metrics.http_reqs.values.count}
Failed: ${data.metrics.http_req_failed.values.rate * 100}%
Avg Response Time: ${data.metrics.http_req_duration.values.avg.toFixed(2)}ms
P95 Response Time: ${data.metrics.http_req_duration.values['p(95)'].toFixed(2)}ms
P99 Response Time: ${data.metrics.http_req_duration.values['p(99)'].toFixed(2)}ms
  `;
}



