import sys
import logging

logging.basicConfig(level=logging.INFO)

if len(sys.argv) == 1:
    print("Hello World By Python Script not Arguments")
    sys.stdout.flush()
    sys.exit()

arrString = sys.argv[1]

print("Hello World By Python Script "+arrString)

sys.stdout.flush()
sys.exit()