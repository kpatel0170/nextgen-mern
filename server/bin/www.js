#!/usr/bin/env -S node -r ./src/config/tracing.cjs
import main from '../src/server.js'

await main()