name: Security Scan

on:
push:
branches: [ main ]
pull_request:
branches: [ main ]
schedule: - cron: '0 0 \* \* 1' # كل نهار اثنين

jobs:
audit:
runs-on: ubuntu-latest
steps: - uses: actions/checkout@v3

      - name: Install dependencies
        run: npm install

      - name: Run npm audit
        run: npm audit --audit-level=moderate

jobs:
security-scan:
name: Security Scan
runs-on: ubuntu-latest
steps: - uses: actions/checkout@v3

         - name: Set up Node.js
           uses: actions/setup-node@v3
           with:
              node-version: '22'
              cache: 'npm'

         - name: Install dependencies
           run: npm ci --legacy-peer-deps

         - name: Run npm audit
           run: npm audit --audit-level=high

         - name: Initialize CodeQL
           uses: github/codeql-action/init@v3
           with:
              languages: javascript
           env:
              GITHUB_TOKEN: ${{ secrets.PERSONAL_GITHUB_TOKEN }}

         - name: Run CodeQL Analysis
           uses: github/codeql-action/analyze@v3
           env:
              GITHUB_TOKEN: ${{ secrets.PERSONAL_GITHUB_TOKEN }}
