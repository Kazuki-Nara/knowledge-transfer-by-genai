#!/bin/bash
# Test script to verify the build process

echo "Building video-call service..."
npm run build

if [ $? -eq 0 ]; then
  echo "Build successful!"
  exit 0
else
  echo "Build failed!"
  exit 1
fi