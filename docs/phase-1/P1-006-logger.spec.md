# P1-006 Logger — Spec

## Implementation
- File: `src/lib/logger.ts`
- Endpoint: `POST /api/logs` (for ERROR level email placeholder)

## API
```
logger.debug(message, file, functionName, metadata?)
logger.info(message, file, functionName, metadata?)
logger.warn(message, file, functionName, metadata?)
logger.error(message, file, functionName, error, metadata?)
```

## Rules
- Every file MUST import logger, NEVER use console.log/warn/error
- Every try/catch MUST call logger.error with file + functionName
- Config: NEXT_PUBLIC_LOG_LEVEL env var (DEBUG/INFO/WARN/ERROR)
- DEBUG level disables email transport in dev
