#!/bin/bash

echo "######## AUTH ########"
./auth.sh

echo "######## GIT ########"
cd ..
git pull.rebase false
#rebase false is default - it'll merge if possible
git add .
git add -A
git commit -a -m "[auto commit by joon]"
git push

# echo "######## SSH RSYNC ########"
# cd automation
# ./deploy_sync.sh

