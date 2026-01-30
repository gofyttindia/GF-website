#!/bin/bash

# Load Testing Script for FitneX
# Usage: ./test-load.sh [URL] [CONCURRENT] [REQUESTS]

# Configuration
URL=${1:-"http://localhost:3000"}
CONCURRENT=${2:-10}
REQUESTS=${3:-1000}
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
RESULTS_DIR="load-test-results"

# Create results directory
mkdir -p $RESULTS_DIR

echo "🚀 FitneX Load Testing"
echo "===================="
echo "URL: $URL"
echo "Concurrent Users: $CONCURRENT"
echo "Total Requests: $REQUESTS"
echo "Results Directory: $RESULTS_DIR"
echo ""

# Check if ab (Apache Bench) is available
if ! command -v ab &> /dev/null; then
    echo "❌ Apache Bench (ab) not found. Installing..."
    echo "On macOS: brew install httpd"
    echo "On Ubuntu: sudo apt-get install apache2-utils"
    exit 1
fi

# Test homepage
echo "📊 Testing Homepage..."
ab -n $REQUESTS -c $CONCURRENT -k -v 2 "$URL/" > "$RESULTS_DIR/homepage_$TIMESTAMP.txt"

# Extract key metrics
echo ""
echo "=== Homepage Results ==="
grep "Requests per second" "$RESULTS_DIR/homepage_$TIMESTAMP.txt"
grep "Time per request" "$RESULTS_DIR/homepage_$TIMESTAMP.txt"
grep "Failed requests" "$RESULTS_DIR/homepage_$TIMESTAMP.txt"
grep "Total transferred" "$RESULTS_DIR/homepage_$TIMESTAMP.txt"
echo ""

# Test other pages
PAGES=("programs" "trainers" "transformations" "reviews")

for page in "${PAGES[@]}"; do
    echo "📊 Testing /$page..."
    ab -n $((REQUESTS / 2)) -c $CONCURRENT -k "$URL/$page" > "$RESULTS_DIR/${page}_$TIMESTAMP.txt" 2>&1
    echo "✅ Completed /$page"
done

echo ""
echo "✅ Load test completed!"
echo "📁 Results saved in: $RESULTS_DIR/"
echo ""
echo "To view detailed results:"
echo "  cat $RESULTS_DIR/homepage_$TIMESTAMP.txt"



