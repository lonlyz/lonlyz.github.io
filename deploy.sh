#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

#rm -rf docs/.vuepress/dist

# 生成静态文件
#npm run docs:build

# 进入生成的文件夹
#cd docs/.vuepress/dist

git init
git add -A
git commit -m '更新文档'

git push -f git@github.com:lonlyz/lonlyz.github.io.git master

# 部署到个人服务器
#cd ..
#zip -r dist.zip dist
#scp dist.zip root@aliyun:/home/defalut/
#ssh aliyun
