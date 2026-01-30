#!/bin/bash

# Kill any existing Next.js processes
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
pkill -f "next dev" 2>/dev/null || true

# Clean dev cache
rm -rf .next/dev 2>/dev/null

# Start dev server
echo "Starting Next.js dev server..."
pnpm run dev

