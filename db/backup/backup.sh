#!/bin/bash

# Set MySQL credentials
DB_NAME="restaurant-pos"
DB_USER="root"
DB_PASSWORD="Saloni@2001"
BACKUP_DIR="./db/backup"

# Create a timestamped backup
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
docker exec mysql_db mysqldump -u $DB_USER -p$DB_PASSWORD $DB_NAME > "$BACKUP_DIR/full_backup_$TIMESTAMP.sql"

echo "✅ Backup created at $BACKUP_DIR/full_backup_$TIMESTAMP.sql"
