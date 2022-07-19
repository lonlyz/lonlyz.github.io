---
sidebar: auto
---
# Docker 使用和各个软件的安装

> [常见的问题](https://www.cnblogs.com/276815076/p/4673607.html)
>
> [如何修改docker无法启动容器中的配置](https://blog.csdn.net/wfrules/article/details/82414191)
>
> [搭建Portainer可视化界面](https://blog.csdn.net/u011781521/article/details/80469804)
>
> [修改docker容器配置的启动参数](https://www.cnblogs.com/zhuochong/p/10070516.html)
>
> [virtual box 扩充磁盘大小](https://blog.csdn.net/tanningzhong/article/details/80482994)
>
> [virtual box 修改内存大小](https://blog.csdn.net/bcfdsagbfcisbg/article/details/81135180)
>
> [centos动态扩容逻辑分区](https://www.linuxidc.com/Linux/2014-10/108049.htm)
>
> [Centos7_linux分区满了，如何进行扩容](https://blog.csdn.net/qq_28844767/article/details/82051376)
>
> [resize2fs使用报错](https://blog.csdn.net/yaofengyaofeng/article/details/82353282)
>
> [docker复制容器](https://www.cnblogs.com/61355ing/p/10017650.html)
>
> [VirtualBox5.1.16下对CentOS6.9系统扩展磁盘空间（扩容）](https://blog.csdn.net/u010865136/article/details/78490832)
>
> [virtualbox图形化扩容](https://www.pianshen.com/article/57961497226/)

### 1.步骤---->[出现问题的解决方法](https://www.jianshu.com/p/45d158a45582)

```shell
1、检查内核版本，必须是3.10及以上
uname -r
2、安装docker
yum install docker
3、输入y确认安装
4、启动docker
[root@localhost ~]# systemctl start docker
[root@localhost ~]# docker -v
Docker version 1.12.6, build 3e8e77d/1.12.6
5、开机启动docker
[root@localhost ~]# systemctl enable docker    #enable/disable
Created symlink from /etc/systemd/system/multi-user.target.wants/docker.service to /usr/lib/systemd/system/docker.service.
6、停止docker
systemctl stop docker
```

[安装Docker-compose出现问题](<https://blog.csdn.net/womenrendeme/article/details/76904553>)

### Docker 安装出现**Error response from daemon: oci runtime error: container_linux.go:247: starting container process**

```tex
docker 启动容器报错：Error response from daemon: oci runtime error: container_linux.go:247: starting container process caused "write parent: broken pipe"
其实原因还是，linux与docker版本的兼容性问题
```

**解决方法**：

```shell
# 1. 查看内核版本
uname -a
# 2. 使用 root 权限登录 Centos。确保 yum 包更新到最新。
sudo yum update
# 3. 卸载旧版本(如果安装过旧版本的话)
sudo yum remove docker  docker-common docker-selinux docker-engine
# 4. 安装需要的软件包， yum-util 提供yum-config-manager功能，另外两个是devicemapper驱动依赖的
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
# 5. 设置yum源
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
# 6. 可以查看所有仓库中所有docker版本，并选择特定版本安装
yum list docker-ce --showduplicates | sort -r
# 7. 安装docker
sudo yum install docker-ce
# 8. 启动并加入开机启动
sudo systemctl start docker
sudo systemctl enable docker
```

## docker中无法使用vim编辑：

```shell
1. apt-get update #更新apt-get源库
2. apt-get install vim #apt-get安装vim命令
```

## docker 查看容器的配置

```shell
docker inspect [容器名称]
```

## docker 查看日志 

[日志查询方式](https://blog.csdn.net/warrior_0319/article/details/79713155)

|        **系统**        |                         **日志位置**                         |
| :--------------------: | :----------------------------------------------------------: |
|     Ubuntu(14.04)      |                 /var/log/upstart/docker.log                  |
|     Ubuntu(16.04)      |                 journalctl -u docker.service                 |
| CentOS 7/RHEL 7/Fedora |                 journalctl -u docker.service                 |
|         CoreOS         |                 journalctl -u docker.service                 |
|        OpenSuSE        |                 journalctl -u docker.service                 |
|          OSX           | ~/Library/Containers/com.docker.docker/Data/com.docker.driver.amd64-linux/log/d‌ocker.log |
|   Debian GNU/Linux 7   |                     /var/log/daemon.log                      |
|   Debian GNU/Linux 8   |                 journalctl -u docker.service                 |
|      Boot2Docker       |                     /var/log/docker.log                      |

### 2.镜像操作

| 操作 | 命令                                            | 说明                                                     |
| ---- | ----------------------------------------------- | -------------------------------------------------------- |
| 检索 | docker  search 关键字  eg：docker  search redis | 我们经常去docker  hub上检索镜像的详细信息，如镜像的TAG。 |
| 拉取 | docker pull 镜像名:tag                          | :tag是可选的，tag表示标签，多为软件的版本，默认是latest  |
| 列表 | docker images                                   | 查看所有本地镜像                                         |
| 删除 | docker rmi image-id                             | 删除指定的本地镜像                                       |

### 3.容器操作

#### 软件镜像（QQ安装程序）----运行镜像----产生一个容器（正在运行的软件，运行的QQ）；

```shell
1、搜索镜像
[root@localhost ~]# docker search tomcat
2、拉取镜像
[root@localhost ~]# docker pull tomcat
3、根据镜像启动容器
docker run --name mytomcat -d tomcat:latest
4、docker ps  
查看运行中的容器
5、 停止运行中的容器
docker stop  容器的id
6、查看所有的容器
docker ps -a
7、启动容器
docker start 容器id
8、删除一个容器
 docker rm 容器id
9、启动一个做了端口映射的tomcat
[root@localhost ~]# docker run -d -p 8888:8080 tomcat
-d：后台运行
-p: 将主机的端口映射到容器的一个端口    主机端口:容器内部的端口

10、为了演示简单关闭了linux的防火墙
service firewalld status ；查看防火墙状态
service firewalld stop：关闭防火墙
11、查看容器的日志
docker logs container-name/container-id
```

#### 示例：

```shell
更多命令参看
https://docs.docker.com/engine/reference/commandline/docker/
可以参考每一个镜像的文档

exg:
docker run -it --rm --name lllnode -v "$PWD":/usr/src/myapp -w /usr/src/myapp node:0.10.40 npm install

主命令是docker run node:0.10.40，这会创建一个容器并运行node:0.10.40这个镜像。
-it选项让Docker分配一个伪终端（可选的参数为-d，该参数要求Docker在后台运行容器）。
-rm参数表示清除，意味着只要你退出容器，Docker就会删除容器。如果不指定这个参数，容器会以停止状态一直存在磁盘上，你能从停止状态重新运行它。尽管，重启容器对于那些忘了删除容器的用户来说是一件挺繁琐切容易遗忘的事。如果你不用--rm选项，你可以通过docker ps -a这条命令在任何时候查看有多少停止状态的容器。
--name lllnode选项指明了容器的名字，命令在其他Docker命令里应用容器的时候非常有用。如果不给容器命名，Docker会给容器分配一个名字-这个名字通常没有说明意义。可以通过容器的ID（一个长的，可读性很差的十六进制数）来引用容器。
-v "$PWD":/usr/src/myapp选项创建了一个卷挂载点，将当前宿主机的工作目录($PWD)映射为容器内的/usr/src/myapp。应用的Node.js的源代码（或者其他放在当前工作目录的Node.js代码）就能在容器内被访问了。
-w /usr/src/myapp选项设定了目前正在运行的命令的工作目录。本例中，工作目录改成了挂载点。
末尾的npm install命令会在容器的工作目录运行。这样的效果就是，你不用安装Node.js或任何的前置条件，就可以在容器的工作目录运行npm install命令。
-p 将容器的端口跟主机端口进行映射
-e 设置环境属性
```

#### tomcat启动：

```shell
docker run -it --name tomcat8.5 --rm -p 8088:8080 tomcat:8.5.37-alpine
```

### 4.安装mysql

[docker mysql镜像忽略表名大小写](https://blog.csdn.net/qq_37955980/article/details/83089220)

**linux的环境注意要设置区分大小写**

[搭建mysql环境](https://www.cnblogs.com/qiyebao/p/12937327.html)

#### 步骤：

```shell
1. docker search mysql
2. docker pull mysql   #默认是latest  可以使用mysql:tag 指定版本
3. docker run --name mysql01 -e MYSQL_ROOT_PASSWORD=123456 -d mysql  #必须制定mysql的密码
4. docker ps #查询运行的容器   / docker ps -a 查询所有的容器
# 第三步执行完之后，通过客户端连接mysql可能会出现错误
# ERROR 2059 (HY000): Authentication plugin 'caching_sha2_password' cannot be loaded
# 解决办法 
# 1. docker exec -it mysql /bin/bash    #进入mysql容器的命令模式
# 2. mysql -h127.0.0.1 -uroot -p 		#登录mysql
# 3. ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root'; #设置所有root所有连接的密码   flush privileges
# 4. 问题解决。   * 退出mysql容器的命令界面，   exit
```

#### 其它几个高级操作：

```shell
docker run --name mysql03 -v /conf/mysql:/etc/mysql/conf.d -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag
把主机的/conf/mysql文件夹挂载到 mysqldocker容器的/etc/mysql/conf.d文件夹里面
改mysql的配置文件就只需要把mysql配置文件放在自定义的文件夹下（/conf/mysql）

docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
指定mysql的一些配置参数

#example
docker run --name mysql_learn -p 3306:3306 -v /docker/mysql/mysql-learn/data:/var/lib/mysql -v /docker/mysql/mysql-learn/conf.d:/etc/mysql/conf.d -e MYSQL_ROOT_PASSWORD=root -d mysql:5.6.43
```

### 5.安装redis

#### 步骤：

```shell
1. docker pull redis
2. docker run --name redis -p 6379:6379 -d redis redis-server #使用默认的配置文件
```

[可以外部制定配置文件](http://www.runoob.com/docker/docker-install-redis.html)

[搭建redis环境](https://www.cnblogs.com/zhoudi94/p/12467739.html)

### 6.安装tomcat---使用dockerfie    mvn:depoly(第一次)/mvn:redepoly

[403 Access failed](https://blog.csdn.net/w770583069/article/details/76084863)

##### 6.1 配置项目的pom.xml

```xml
<properties>
		<tomcat.version>2.2</tomcat.version>
		<webserver.port>8181</webserver.port>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
		<downloadSources>true</downloadSources>

		<tomcat.url>http://192.168.1.110:8083/manager/text</tomcat.url>
		<tomcat.username>admin</tomcat.username>
		<tomcat.password>admin</tomcat.password>
</properties>

<build>
		<finalName>${project.artifactId}</finalName> #指定打出war包的名称
        <plugin>
            <groupId>org.apache.tomcat.maven</groupId>
            <artifactId>tomcat7-maven-plugin</artifactId>
            <version>${tomcat.version}</version> 
            <configuration>
                <url>${tomcat.url}</url>
                <username>${tomcat.username}</username>
                <password>${tomcat.password}</password>
                <port>${webserver.port}</port>
                <path>/${project.artifactId}</path>
                <uriEncoding>${project.build.sourceEncoding}</uriEncoding>
                <charset>${project.build.sourceEncoding}</charset>
                <update>true</update>  #如果项目已经存在是否可以直接更新
            </configuration>
        </plugin>
</build>
```

##### 6.2 配置Dockerfile

```dockerfile
# First docker file from yiban
# VERSION 0.0.1
# Author: lz

#基础镜像
FROM tomcat:7.0.92-jre8-alpine

#作者
MAINTAINER lz <786321279@qq.com>

#定义工作目录
ENV WORK_PATH /usr/local/tomcat/conf

#定义要替换的文件名
ENV USER_CONF_FILE_NAME tomcat-users.xml

#定义要替换的server.xml文件名
ENV SERVER_CONF_FILE_NAME server.xml

#删除原文件tomcat-users.xml
RUN rm $WORK_PATH/$USER_CONF_FILE_NAME

#复制文件tomcat-users.xml
COPY  ./$USER_CONF_FILE_NAME $WORK_PATH/

#删除原文件server.xml
RUN rm $WORK_PATH/$SERVER_CONF_FILE_NAME

#复制文件server.xml
COPY  ./$SERVER_CONF_FILE_NAME $WORK_PATH/

#EXPOSE 8080

#CMD ["/usr/local/tomcat/bin/catalina.sh","run"]

# . 表示在当前目录寻找Dockerfile
# 执行docker build -t image名称:tag  .

# 执行： 1. docker build -t yiban-docker .
#       2. docker run -it -d --name docker-yiban-tomcat -p 8083:8080 yiban-docker
```

##### 6.3 配置tomcat-users.xml和server.xml

###### 6.3.1 tomcat-users.xml

```xml
<tomcat-users>
  <role rolename="manager-gui"/>
  <role rolename="manager-script"/>
  <user username="admin" password="admin" roles="manager-gui,manager-script"/>
</tomcat-users>
```

###### 6.3.2 server.xml  添加URIEncoding

```xml
<Connector port="8080" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" URIEncoding="UTF-8"/>
```

##### 6.4 先准备好配置文件：tomcat-users.xml和server.xml和Dockerfile到服务器的文件夹下

```shell
1.docker build -t yiban-docker .
# 镜像创建完成
2.docker run -it -d --name docker-yiban-tomcat -p 8083:8080 yiban-docker 
# 容器创建完成
```

##### 6.5 项目中执行maven命令

```shell
mvn depoly/redeploy
```

### 7.安装RabbitMq

##### docker images中带-management-的是包含rabbitmq的web管理。管理端的默认用户密码是guest/guest。

```shell
1.使用docker指定rabbitmq web管理的默认用户名和密码 
	-e RABBITMQ_DEFAULT_USER=user -e RABBITMQ_DEFAULT_PASS=password
2.docker pull rabbitmq:3.7-management-alpine
3.docker run -d -p 5672:5672 -p 15672:15672 --name rabbitmq rabbitmq:3.7-management-alpine
```

### 8.安装ElasticSearch

##### elasticsearch是java编写的，默认占用堆内存空间2G。测试的时候内存不满足条件会启动报错。因此需要指定使用的内存空间大小。

[docker安装地址](https://blog.csdn.net/qq_23250633/article/details/81327001)

[docker集群安装地址](https://blog.csdn.net/belonghuang157405/article/details/83301937)

[elasticsearch官网安装教程](https://www.elastic.co/guide/en/elasticsearch/reference/6.7/docker.html)

[Docker安装 elasticsearch 报错max virtual memory areas vm.max_map_count [65530] is too low](https://blog.csdn.net/xingfei_work/article/details/81463978)

```shell
1.docker pull registry.docker-cn.com/library/elasticsearch
2.docker run -e ES_JAVA_OPTIONS="-Xms256m -Xmx256m" -d -p 9200:9200 -p 9300:9300 --name es registry.docker-cn.com/library/elasticsearch
# 指定配置文件  yml
3.
docker run -e ES_JAVA_OPTS="-Xms256m -Xmx256m" -d -p 9200:9200 -p 9300:9300 -v /docker/es/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml -v /docker/es/data:/usr/share/elasticsearch/data -v /docker/es/logs:/usr/share/elasticsearch/logs --name es 5acf0e8da90b
```

解释：

​	registry.docker-cn.com/library/: docker国内镜像加速地址

​	-Xms: 初始堆内存大小

​	-Xmx: 最大堆内存大小

​	9200: web通信的端口

​	9300: 分布式节点通信的端口

### 9.安装Zookeeper

[zookeeper安装教程1](https://www.cnblogs.com/kingkoo/p/8732448.html)

[zookeeper安装教程2](https://www.cnblogs.com/yorkwu/p/9858306.html)

```shell
docker run --name zookeeper -p 2181:2181 --restart always -d -v $(pwd)/zoo.cfg:/conf/zoo.cfg zookeeper #在本地目录中运行该命令，先创建zoo.cfg 
```

### 10.安装Jenkins

[github](https://github.com/jenkinsci/docker/blob/master/README.md)

[出错解决方法](https://segmentfault.com/a/1190000008618462)

```bash
docker pull jenkins/jenkins
```

```shell
1. 创建映射目录 mkdir /docker/jenkins/jenkins_home
2.docker run -d -p 8080:8080 -p 50000:50000 -v /docker/jenkins/jenkins_home:/var/jenkins_home --name jenkins bfe3c4c98b18
3. 如果出错 sudo chown -R 1000:1000 /docker/jenkins/jenkins_home
```

### 11.安装nacos-server

```shell
docker pull nacos/nacos-server
#单机启动
docker run --env MODE=standalone --name nacos -d -p 8848:8848 nacos/nacos-server
```

### 12.安装sentinel

> [安装文档](https://github.com/alibaba/Sentinel/wiki/%E6%8E%A7%E5%88%B6%E5%8F%B0?spm=a2c4e.11153940.blogcont623424.19.13d46e4b1wRpRU)

### 13.安装consul

```shell
docker run -d --name consulserver1 --net=host -e'CONSUL_LOCAL_CONFIG={"skip_leave_on_interrupt": true}' consul agent -server -bind=10.1.54.162 -bootstrap-expect=1  -client 0.0.0.0 -ui
```

### 14.安装mongo

> [安装文档](https://www.jianshu.com/p/576a156f6877)
>
> [自定义安装](https://blog.csdn.net/xiaojin21cen/article/details/84994452)

```yml
# stack.yml
version: '3.1'

services:

  mongo:
    image: mongo:4.1.6
    ports:
      - 27017:27017
    #restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: admin

  mongo-express:
    links:
      - mongo
    image: mongo-express
    #restart: always
    ports:
      - 8087:8081
    environment:
      ME_CONFIG_OPTIONS_EDITORTHEME: 3024-night
      ME_CONFIG_BASICAUTH_USERNAME: express
      ME_CONFIG_BASICAUTH_PASSWORD: express
      ME_CONFIG_MONGODB_ADMINUSERNAME: admin
      ME_CONFIG_MONGODB_ADMINPASSWORD: admin
```

```shell
 docker-compose -f stack.yml up
```

### 15.搭建maven私服

> ###  [参考地址](https://blog.csdn.net/qq_38270106/article/details/86079105)
>
> [windows下安装](https://blog.csdn.net/cool_summer_moon/article/details/78779530)



### 16.安装solr

[参考地址](https://blog.csdn.net/wenfeifang/article/details/84991752)

[参考地址](https://blog.csdn.net/oLinBSoft/article/details/85008308)

1. 配置中文分词 需要引入jar包到WEB-INF/lib文件夹中
2. 配置solrconfig.xml manage-schema文件。

### 17.安装es&kibana

[参考地址](https://blog.csdn.net/JineD/article/details/107490619)

