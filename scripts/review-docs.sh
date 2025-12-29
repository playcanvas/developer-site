#!/bin/bash
#
# Parallel documentation review and fix using Claude
#
# Usage:
#   ./scripts/review-docs.sh [options]
#
# Options:
#   -p, --parallel N    Number of parallel Claude sessions (default: 5)
#   -b, --batch N       Files per batch (default: 10)
#   --dry-run           Show what would be done without running
#   --force             Re-review all files, ignore status file
#   --only-new          Only review files not in status file
#   --test [FILE]       Test mode: review one file interactively (default: first file found)
#   -h, --help          Show this help message

set -e

# Default configuration
PARALLEL=5
BATCH_SIZE=10
DRY_RUN=false
FORCE=false
ONLY_NEW=false
TEST_MODE=false
TEST_FILE=""
STATUS_FILE="review-status.json"
DOCS_DIR="docs"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -p|--parallel)
            PARALLEL="$2"
            shift 2
            ;;
        -b|--batch)
            BATCH_SIZE="$2"
            shift 2
            ;;
        --dry-run)
            DRY_RUN=true
            shift
            ;;
        --force)
            FORCE=true
            shift
            ;;
        --only-new)
            ONLY_NEW=true
            shift
            ;;
        --test)
            TEST_MODE=true
            # Check if next arg is a file path (not another flag)
            if [[ -n "${2:-}" && ! "$2" =~ ^- ]]; then
                TEST_FILE="$2"
                shift
            fi
            shift
            ;;
        -h|--help)
            head -20 "$0" | tail -17
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Change to project root
cd "$PROJECT_ROOT"

echo -e "${BLUE}Documentation Review Script${NC}"
echo "================================"
echo "Parallel sessions: $PARALLEL"
echo "Batch size: $BATCH_SIZE"
echo "Docs directory: $DOCS_DIR"
echo ""

# Initialize status file if it doesn't exist
if [[ ! -f "$STATUS_FILE" ]]; then
    echo '{"lastRun": null, "reviewed": {}}' > "$STATUS_FILE"
fi

# Function to compute MD5 hash of a file
get_hash() {
    md5 -q "$1" 2>/dev/null || md5sum "$1" 2>/dev/null | cut -d' ' -f1
}

# Function to get stored hash from status file
get_stored_hash() {
    local file="$1"
    python3 -c "
import json
with open('$STATUS_FILE') as f:
    data = json.load(f)
print(data.get('reviewed', {}).get('$file', {}).get('hash', ''))
" 2>/dev/null || echo ""
}

# Function to check if file needs review
needs_review() {
    local file="$1"

    if [[ "$FORCE" == "true" ]]; then
        return 0  # Always review
    fi

    local current_hash=$(get_hash "$file")
    local stored_hash=$(get_stored_hash "$file")

    if [[ "$ONLY_NEW" == "true" ]]; then
        [[ -z "$stored_hash" ]]  # Only if not in status file
    else
        [[ "$current_hash" != "$stored_hash" ]]  # If hash changed
    fi
}

# Find all markdown files that need review
echo -e "${YELLOW}Finding files to review...${NC}"
FILES_TO_REVIEW=()

while IFS= read -r file; do
    if needs_review "$file"; then
        FILES_TO_REVIEW+=("$file")
    fi
done < <(find "$DOCS_DIR" -name "*.md" -type f | sort)

TOTAL_FILES=${#FILES_TO_REVIEW[@]}
echo -e "Found ${GREEN}$TOTAL_FILES${NC} files to review"

if [[ $TOTAL_FILES -eq 0 ]]; then
    echo -e "${GREEN}All files are up to date!${NC}"
    exit 0
fi

# Calculate number of batches
NUM_BATCHES=$(( (TOTAL_FILES + BATCH_SIZE - 1) / BATCH_SIZE ))
echo "Will process in $NUM_BATCHES batches"
echo ""

if [[ "$DRY_RUN" == "true" ]]; then
    echo -e "${YELLOW}DRY RUN - No changes will be made${NC}"
    echo ""

    batch_num=0
    for ((i=0; i<TOTAL_FILES; i+=BATCH_SIZE)); do
        batch_num=$((batch_num + 1))
        batch_end=$((i + BATCH_SIZE))
        if [[ $batch_end -gt $TOTAL_FILES ]]; then
            batch_end=$TOTAL_FILES
        fi

        echo -e "${BLUE}Batch $batch_num:${NC}"
        for ((j=i; j<batch_end; j++)); do
            echo "  ${FILES_TO_REVIEW[$j]}"
        done
        echo ""
    done

    echo "Would run $NUM_BATCHES batches with up to $PARALLEL parallel sessions"
    exit 0
fi

# Test mode: review one file interactively
if [[ "$TEST_MODE" == "true" ]]; then
    # Use provided file or first file from list
    if [[ -n "$TEST_FILE" ]]; then
        test_file="$TEST_FILE"
    else
        test_file="${FILES_TO_REVIEW[0]}"
    fi

    if [[ ! -f "$test_file" ]]; then
        echo -e "${RED}File not found: $test_file${NC}"
        exit 1
    fi

    echo -e "${YELLOW}TEST MODE - Reviewing single file interactively${NC}"
    echo -e "File: ${GREEN}$test_file${NC}"
    echo ""

    prompt="Review and fix spelling/grammar errors in this markdown file:
$test_file

1. Read the file
2. Find and fix any spelling or grammar errors using the Edit tool
3. After fixing, commit with message: docs: fix spelling/grammar in [filename]
4. If no issues found, say so and do not commit

Follow the instructions in CLAUDE.md. Be conservative - only fix clear errors."

    # Run Claude interactively (no output suppression)
    echo -e "${YELLOW}Note: You may need to approve file edits manually in test mode${NC}"
    echo -e "${YELLOW}For automated runs, the script uses --dangerously-skip-permissions${NC}"
    echo ""
    claude -p "$prompt"
    exit 0
fi

# Function to run a single batch
run_batch() {
    local batch_num=$1
    shift
    local files=("$@")

    local files_list=$(printf '%s\n' "${files[@]}")

    # Create prompt for this batch
    local prompt="Review and fix spelling/grammar errors in these markdown files.
For each file:
1. Read the file
2. Find and fix any spelling or grammar errors using the Edit tool
3. After fixing a file, commit it with message: docs: fix spelling/grammar in [filename]
4. If no issues found, skip that file

Files to review:
$files_list

Follow the instructions in CLAUDE.md. Be conservative - only fix clear errors."

    # Run Claude with auto-approve permissions for batch mode
    echo -e "${BLUE}Starting batch $batch_num (${#files[@]} files)${NC}"

    if claude -p "$prompt" --dangerously-skip-permissions > /dev/null 2>&1; then
        echo -e "${GREEN}Batch $batch_num completed${NC}"
    else
        echo -e "${RED}Batch $batch_num failed${NC}"
    fi
}

# Function to update status file for a batch of files
update_status() {
    local files=("$@")
    local timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

    for file in "${files[@]}"; do
        local hash=$(get_hash "$file")
        python3 -c "
import json
with open('$STATUS_FILE', 'r') as f:
    data = json.load(f)
data['lastRun'] = '$timestamp'
if 'reviewed' not in data:
    data['reviewed'] = {}
data['reviewed']['$file'] = {
    'timestamp': '$timestamp',
    'hash': '$hash'
}
with open('$STATUS_FILE', 'w') as f:
    json.dump(data, f, indent=2)
"
    done
}

# Run batches in parallel
echo -e "${YELLOW}Starting review...${NC}"
echo ""

batch_num=0

for ((i=0; i<TOTAL_FILES; i+=BATCH_SIZE)); do
    batch_num=$((batch_num + 1))

    # Collect files for this batch
    batch_files=()
    for ((j=i; j<i+BATCH_SIZE && j<TOTAL_FILES; j++)); do
        batch_files+=("${FILES_TO_REVIEW[$j]}")
    done

    # Wait if we've hit the parallel limit
    while [[ $(jobs -r | wc -l) -ge $PARALLEL ]]; do
        sleep 2
    done

    # Run batch in background
    run_batch "$batch_num" "${batch_files[@]}" &

    # Update status for this batch's files
    update_status "${batch_files[@]}"
done

# Wait for all batches to complete
echo ""
echo -e "${YELLOW}Waiting for all batches to complete...${NC}"
wait

# Summary
echo ""
echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}Review Complete${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo "Status file updated: $STATUS_FILE"
echo ""
echo -e "${YELLOW}Review the git log to see commits made:${NC}"
echo "  git log --oneline -20"
