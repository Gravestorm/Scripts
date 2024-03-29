import os
import sys

if len(sys.argv) != 2:
    print("Usage: check_existing.py <output_file>")
    sys.exit(1)

output_file = sys.argv[1]

if os.path.exists(output_file):
    print(f"File {output_file} already exists. Skipping download.")
    sys.exit(0)
else:
    sys.exit(1)