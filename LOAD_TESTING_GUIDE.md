# Load Testing Guide for FitneX Website

This guide covers various methods to perform load testing on your Next.js website to ensure it can handle traffic spikes and concurrent users.

## 🎯 What is Load Testing?

Load testing simulates real-world user traffic to your website to:
- Identify performance bottlenecks
- Determine maximum capacity
- Ensure stability under load
- Measure response times
- Find memory leaks or resource issues

## 🛠️ Tools & Methods

### 1. **k6** (Recommended - Free & Powerful)

k6 is a modern load testing tool written in Go with a JavaScript API.

#### Installation

```bash
# macOS
brew install k6

# Or download from: https://k6.io/docs/getting-started/installation/
```

#### Basic Load Test Script

Create `load-test.js`:

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },   // Ramp up to 20 users
    { duration: '1m', target: 20 },    // Stay at 20 users
    { duration: '30s', target: 50 },    // Ramp up to 50 users
    { duration: '1m', target: 50 },     // Stay at 50 users
    { duration: '30s', target: 0 },     // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% of requests should be below 2s
    http_req_failed: ['rate<0.01'],     // Error rate should be less than 1%
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export default function () {
  // Test homepage
  let response = http.get(`${BASE_URL}/`);
  check(response, {
    'homepage status is 200': (r) => r.status === 200,
    'homepage loads in < 2s': (r) => r.timings.duration < 2000,
  });

  sleep(1);

  // Test programs page
  response = http.get(`${BASE_URL}/programs`);
  check(response, {
    'programs page status is 200': (r) => r.status === 200,
  });

  sleep(1);

  // Test trainers page
  response = http.get(`${BASE_URL}/trainers`);
  check(response, {
    'trainers page status is 200': (r) => r.status === 200,
  });

  sleep(1);

  // Test transformations page
  response = http.get(`${BASE_URL}/transformations`);
  check(response, {
    'transformations page status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
```

#### Run the Test

```bash
# Test local development server
k6 run load-test.js

# Test production URL
BASE_URL=https://yourdomain.com k6 run load-test.js

# With more verbose output
k6 run --out json=results.json load-test.js
```

### 2. **Apache Bench (AB)** - Simple & Quick

Apache Bench is built into macOS and many Linux systems.

#### Basic Test

```bash
# Test homepage with 1000 requests, 10 concurrent
ab -n 1000 -c 10 http://localhost:3000/

# Test with keep-alive
ab -n 1000 -c 10 -k http://localhost:3000/

# More detailed output
ab -n 1000 -c 10 -v 2 http://localhost:3000/
```

#### Test Multiple Pages

Create `test-urls.txt`:
```
http://localhost:3000/
http://localhost:3000/programs
http://localhost:3000/trainers
http://localhost:3000/transformations
http://localhost:3000/reviews
```

Then test each:
```bash
while read url; do
  echo "Testing: $url"
  ab -n 500 -c 10 $url
done < test-urls.txt
```

### 3. **Artillery** - Node.js Based

#### Installation

```bash
npm install -g artillery
```

#### Create `artillery-config.yml`:

```yaml
config:
  target: 'http://localhost:3000'
  phases:
    - duration: 60
      arrivalRate: 5
      name: "Warm up"
    - duration: 120
      arrivalRate: 20
      name: "Ramp up load"
    - duration: 300
      arrivalRate: 20
      name: "Sustained load"
  defaults:
    headers:
      User-Agent: "Artillery Load Test"

scenarios:
  - name: "Browse website"
    flow:
      - get:
          url: "/"
      - think: 2
      - get:
          url: "/programs"
      - think: 2
      - get:
          url: "/trainers"
      - think: 2
      - get:
          url: "/transformations"
```

#### Run Test

```bash
artillery run artillery-config.yml
artillery run --output report.json artillery-config.yml
artillery report report.json
```

### 4. **Locust** - Python Based

#### Installation

```bash
pip install locust
```

#### Create `locustfile.py`:

```python
from locust import HttpUser, task, between

class WebsiteUser(HttpUser):
    wait_time = between(1, 3)
    
    @task(3)
    def view_homepage(self):
        self.client.get("/")
    
    @task(2)
    def view_programs(self):
        self.client.get("/programs")
    
    @task(2)
    def view_trainers(self):
        self.client.get("/trainers")
    
    @task(1)
    def view_transformations(self):
        self.client.get("/transformations")
    
    @task(1)
    def view_reviews(self):
        self.client.get("/reviews")
```

#### Run Test

```bash
# Start web UI
locust -f locustfile.py --host=http://localhost:3000

# Headless mode
locust -f locustfile.py --host=http://localhost:3000 --users 50 --spawn-rate 10 --run-time 5m
```

### 5. **Web-based Tools** (No Installation)

#### **Loader.io** (Free tier available)
- Sign up at https://loader.io
- Add your domain
- Create test scenarios
- View real-time metrics

#### **Google Lighthouse CI** (Performance Testing)

```bash
npm install -g @lhci/cli
```

Create `lighthouserc.js`:

```javascript
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/'],
      numberOfRuns: 5,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', {minScore: 0.8}],
        'categories:accessibility': ['error', {minScore: 0.9}],
      },
    },
  },
};
```

Run:
```bash
lhci autorun
```

## 📊 What to Monitor

### Key Metrics

1. **Response Time**
   - Average response time
   - P95, P99 percentiles
   - Maximum response time

2. **Throughput**
   - Requests per second (RPS)
   - Successful vs failed requests

3. **Error Rate**
   - HTTP error codes (4xx, 5xx)
   - Timeout errors

4. **Resource Usage**
   - CPU usage
   - Memory consumption
   - Network bandwidth

5. **Concurrent Users**
   - Maximum concurrent users supported
   - User experience degradation point

## 🚀 Quick Start Script

Create a simple test script `test-load.sh`:

```bash
#!/bin/bash

# Configuration
URL=${1:-"http://localhost:3000"}
CONCURRENT=${2:-10}
REQUESTS=${3:-1000}

echo "🚀 Load Testing: $URL"
echo "📊 Concurrent Users: $CONCURRENT"
echo "📈 Total Requests: $REQUESTS"
echo ""

# Test homepage
echo "Testing homepage..."
ab -n $REQUESTS -c $CONCURRENT -k $URL/ > results-homepage.txt

# Extract key metrics
echo ""
echo "=== Results ==="
echo "Requests per second:"
grep "Requests per second" results-homepage.txt
echo ""
echo "Time per request:"
grep "Time per request" results-homepage.txt
echo ""
echo "Failed requests:"
grep "Failed requests" results-homepage.txt
```

Make it executable:
```bash
chmod +x test-load.sh
./test-load.sh http://localhost:3000 10 1000
```

## 🎯 Recommended Testing Scenarios

### 1. **Baseline Test**
- 10 concurrent users
- 5 minutes duration
- Measure baseline performance

### 2. **Normal Load**
- 50-100 concurrent users
- 10 minutes duration
- Simulate normal traffic

### 3. **Peak Load**
- 200-500 concurrent users
- 15 minutes duration
- Simulate traffic spikes

### 4. **Stress Test**
- Gradually increase to 1000+ users
- Find breaking point
- Identify bottlenecks

### 5. **Spike Test**
- Sudden spike to 500 users
- Measure recovery time
- Test auto-scaling

## 📝 Testing Checklist

Before running load tests:

- [ ] Build production version: `npm run build`
- [ ] Start production server: `npm start`
- [ ] Test on production-like environment
- [ ] Monitor server resources (CPU, memory)
- [ ] Check database connections (if applicable)
- [ ] Verify CDN/caching is working
- [ ] Test during off-peak hours initially

## 🔍 Analyzing Results

### Good Performance Indicators:
- ✅ Response time < 2 seconds (P95)
- ✅ Error rate < 1%
- ✅ CPU usage < 80%
- ✅ Memory stable (no leaks)
- ✅ No timeout errors

### Red Flags:
- ❌ Response time > 5 seconds
- ❌ Error rate > 5%
- ❌ CPU at 100%
- ❌ Memory continuously increasing
- ❌ Many timeout errors

## 🛠️ Performance Optimization Tips

Based on load test results:

1. **If response time is high:**
   - Enable Next.js image optimization
   - Implement caching (Redis, Vercel Edge)
   - Use CDN for static assets
   - Optimize images (compress, WebP)

2. **If error rate is high:**
   - Check server logs
   - Increase server resources
   - Implement rate limiting
   - Add error handling

3. **If memory is increasing:**
   - Check for memory leaks
   - Implement connection pooling
   - Clear caches periodically
   - Monitor third-party scripts

## 🌐 Vercel-Specific Testing

If deployed on Vercel:

1. **Use Vercel Analytics**
   - Already integrated ✅
   - Monitor real user metrics

2. **Vercel Speed Insights**
   ```bash
   npm install @vercel/speed-insights
   ```
   Add to `app/layout.tsx`:
   ```tsx
   import { SpeedInsights } from '@vercel/speed-insights/next'
   // ... in your component
   <SpeedInsights />
   ```

3. **Test Edge Functions**
   - Test API routes separately
   - Monitor edge function execution time

## 📚 Additional Resources

- [k6 Documentation](https://k6.io/docs/)
- [Artillery Documentation](https://www.artillery.io/docs)
- [Locust Documentation](https://docs.locust.io/)
- [Web.dev Performance](https://web.dev/performance/)
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)

## ⚠️ Important Notes

1. **Don't test production directly** - Use staging environment
2. **Start small** - Gradually increase load
3. **Monitor resources** - Watch CPU, memory, network
4. **Test realistic scenarios** - Simulate actual user behavior
5. **Document results** - Keep records for comparison
6. **Test regularly** - Performance can degrade over time

---

## Quick Commands Reference

```bash
# k6 - Full featured load testing
k6 run load-test.js

# Apache Bench - Quick tests
ab -n 1000 -c 10 http://localhost:3000/

# Artillery - Node.js based
artillery run config.yml

# Locust - Python based (web UI)
locust -f locustfile.py --host=http://localhost:3000

# Lighthouse CI - Performance audits
lhci autorun
```

Start with k6 or Apache Bench for quick tests, then use more advanced tools for comprehensive analysis!



