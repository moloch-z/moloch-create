#!/bin/sh
set -e

# 交互式选择发布版本
VERSION=`npx select-version-cli`

# commit
# git add -A
# git commit -am "release: $VERSION"
npm version $VERSION --message "[release] $VERSION"
echo "push... v$VERSION"
# push
git push
# push tag
git push origin v$VERSION

# publish
npm publish


echo "✅ Publish completed"
