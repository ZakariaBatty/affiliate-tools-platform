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
