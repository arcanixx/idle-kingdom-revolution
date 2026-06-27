# Remove instrumentation.ts - too problematic
import os
path = "src/instrumentation.ts"
if os.path.exists(path):
    os.remove(path)
    print("Removed instrumentation.ts")
else:
    print("No instrumentation.ts to remove")
