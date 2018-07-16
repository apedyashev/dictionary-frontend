#!/bin/bash
#external vars
# - $CI_COMMIT_ID
# - $CI_BUILD_ID

# Last 3 backups won't be removed. The  rest ones will be removed
MAX_BACKUPS_COUNT=3

BASEPATH=<enter base path>
LATEST_BUILD_REL_PATH=$CI_COMMIT_ID/$CI_BUILD_ID
BACKUP_FOLDER_NAME=<enter backups dir name>
CI_COPIED_BUILD_DIR_NAME=ci-build

BUILD_PATH=${BASEPATH}/build
BACKUP_FOLDER_PATH=$BASEPATH/$BACKUP_FOLDER_NAME/
LATEST_BUILD_FULL_PATH=$BASEPATH/$CI_COPIED_BUILD_DIR_NAME/$LATEST_BUILD_REL_PATH/

##
## Backup

# create backup dir if not exists
mkdir -p $BACKUP_FOLDER_PATH

#do backup
NEW_BACKUP_FULL_PATH=${BACKUP_FOLDER_PATH}build_$(date +%Y_%m_%d_%H_%M_%S)_backup.tgz
echo Backing $BUILD_PATH up to $NEW_BACKUP_FULL_PATH
tar czf $NEW_BACKUP_FULL_PATH $BUILD_PATH
echo Done!

#remove old backups
BACKUPS_COUNTER=0
ls -lt $BACKUP_FOLDER_PATH | grep _backup.tgz | awk '{print $9}' | while read x;
	do
		if [ $BACKUPS_COUNTER -ge $MAX_BACKUPS_COUNT ]; then
			echo Removing old backup: $BACKUP_FOLDER_PATH$x;
			rm -f $BACKUP_FOLDER_PATH$x
		fi;
		let BACKUPS_COUNTER=BACKUPS_COUNTER+1
done

# remove old build
rm -rf $BUILD_PATH

mkdir -p $BUILD_PATH

echo Copying $LATEST_BUILD_FULL_PATH to $BUILD_PATH
mv $LATEST_BUILD_FULL_PATH* $BUILD_PATH
echo Done!
