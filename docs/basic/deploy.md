# 服务器部署

## Docker部署

### 安装Docker

1. 确认内核版本≥3.1.0 

   ```shell
   uname -r
   ```

2. 查看是否安装了Docker

   ```shell
   yum list installed | grep docker
   ```

3. 安装docker

   ```shell
   yum -y install docker
   ```

4. 启动、关闭和查看Docker状态

   **启动**

   ```shell
   systemctl start docker
   ```

   **关闭**

   ```shell
   systemctl stop docker
   ```

   **查看状态**

   ```shell
   systemctl status docker
   ```

5. 设置为开机启动

   ```shell
   systemctl enable docker.service
   ```

### 安装Mysql

1. 下载镜像

   ```shell
   docker pull mysql:5.7.32
   ```

2. 执行构建命令

   ```shell
   docker run -d --privileged=true --name mysql \
       -p 3306:3306 \
       --restart always \
       --volume /home/mysql/conf:/etc/mysql/conf.d \
       --volume /home/mysql/mysqldata:/var/lib/mysql \
       --volume /etc/localtime:/etc/localtime \
       --env MYSQL_ROOT_PASSWORD=zsdd_db@2020 \
       mysql:5.7.32 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
   ```

3. 设置`my.cnf`

   8.0的配置

   > 必须初始化的时候指定lower_case_table_names
   
   ```tex
   docker run \
       -p 3306:3306 \
       -e MYSQL_ROOT_PASSWORD=root \
       -v /data/mysql/data:/var/lib/mysql:rw \
       -v /data/mysql/log:/var/log/mysql:rw \
       -v /data/mysql/conf/my.cnf:/etc/mysql/my.cnf:rw \
       -v /etc/localtime:/etc/localtime:ro \
       --name iptv \
       --restart=always \
       -d mysql --lower_case_table_names=1
   
   # 如果密码设置不上
   ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';
   
   # 配置文件
   # Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
   #
   # This program is free software; you can redistribute it and/or modify
   # it under the terms of the GNU General Public License as published by
   # the Free Software Foundation; version 2 of the License.
   #
   # This program is distributed in the hope that it will be useful,
   # but WITHOUT ANY WARRANTY; without even the implied warranty of
   # MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   # GNU General Public License for more details.
   #
   # You should have received a copy of the GNU General Public License
   # along with this program; if not, write to the Free Software
   # Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301 USA
   
   #
   # The MySQL  Server configuration file.
   #
   # For explanations see
   # http://dev.mysql.com/doc/mysql/en/server-system-variables.html
   
   [mysqld]
   pid-file        = /var/run/mysqld/mysqld.pid
   socket          = /var/run/mysqld/mysqld.sock
   datadir         = /var/lib/mysql
   secure-file-priv= NULL
   # Disabling symbolic-links is recommended to prevent assorted security risks
   symbolic-links=0
   
   # Custom config should go here
   !includedir /etc/mysql/conf.d/
   
   default_authentication_plugin= mysql_native_password
   
   [mysql]  
   default-character-set=utf8  
   #lower_case_table_names=1
   ```
   
   **5.7的配置**
   
   ```ini
   [client]
   port = 3306
   socket = /var/run/mysqld/mysqld.sock
   default-character-set = utf8mb4
   
   [mysql]
   prompt="MySQL [\d]> "
   no-auto-rehash
   
   [mysqld]
   port = 3306
   socket = /var/run/mysqld/mysqld.sock
   
   datadir = /var/lib/mysql
   pid-file = /var/run/mysqld/mysqld.pid
   user = mysql
   bind-address = 0.0.0.0
   server-id = 1
   
   sql_mode='NO_ENGINE_SUBSTITUTION'
   
   init-connect = 'SET NAMES utf8mb4'
   character-set-server = utf8mb4
   
   skip-name-resolve
   #skip-networking
   back_log = 300
   
   max_connections = 495
   max_connect_errors = 6000
   open_files_limit = 65535
   table_open_cache = 128
   max_allowed_packet = 500M
   binlog_cache_size = 1M
   max_heap_table_size = 8M
   tmp_table_size = 16M
   
   read_buffer_size = 2M
   read_rnd_buffer_size = 8M
   sort_buffer_size = 8M
   join_buffer_size = 8M
   key_buffer_size = 8M

   thread_cache_size = 8

   query_cache_type = 1
   query_cache_size = 8M
   query_cache_limit = 2M
   
   ft_min_word_len = 4
   
   log_bin = mysql-bin
   binlog_format = mixed
   expire_logs_days = 7
   
   log_error = /var/log/mysql/error.log
   slow_query_log = 1
   long_query_time = 1
   slow_query_log_file = /var/lib/mysql/mysql_slow.log
   
   performance_schema = 0
   explicit_defaults_for_timestamp
   
   lower_case_table_names = 1
   
   skip-external-locking
   
   default_storage_engine = InnoDB
   #default-storage-engine = MyISAM
   innodb_file_per_table = 1
   innodb_open_files = 500
   innodb_buffer_pool_size = 64M
   innodb_write_io_threads = 4
   innodb_read_io_threads = 4
   innodb_thread_concurrency = 0
   innodb_purge_threads = 1
   innodb_flush_log_at_trx_commit = 2
   innodb_log_buffer_size = 2M
   innodb_log_file_size = 32M
   innodb_log_files_in_group = 3
   innodb_max_dirty_pages_pct = 90
   innodb_lock_wait_timeout = 120
   
   bulk_insert_buffer_size = 8M
   myisam_sort_buffer_size = 8M
   myisam_max_sort_file_size = 10G
   myisam_repair_threads = 1
   
   interactive_timeout = 28800
   wait_timeout = 28800
   
   [mysqldump]
   quick
   max_allowed_packet = 500M
   
   [myisamchk]
   key_buffer_size = 8M
   sort_buffer_size = 8M
   read_buffer = 4M
   write_buffer = 4M
   ```
   
   **5.6的配置文件**
   
   ```ini
   # For advice on how to change settings please see
   # http://dev.mysql.com/doc/refman/5.6/en/server-configuration-defaults.html
   # *** DO NOT EDIT THIS FILE. It's a template which will be copied to the
   # *** default location during install, and will be replaced if you
   # *** upgrade to a newer version of MySQL.
   
   [mysqld]
   
   # Remove leading # and set to the amount of RAM for the most important data
   # cache in MySQL. Start at 70% of total RAM for dedicated server, else 10%.
   # innodb_buffer_pool_size = 128M
   
   # Remove leading # to turn on a very important data integrity option: logging
   # changes to the binary log between backups.
   # log_bin
   
   # These are commonly set, remove the # and set as required.
   # basedir = .....
   # datadir = .....
   # port = .....
   # server_id = .....
   # socket = .....
   
   [mysqld]
   port=3306  # 指定MsSQL侦听的端口
   socket=/var/lib/mysql/mysql3306.sock  # 为MySQL客户程序与服务器之间的本地通信指定一个套接字文件(Linux下默认是/var/lib/mysql/mysql.sock文件)
   server_id=1
   pid_file=/var/lib/mysql/mysql3306.pid
   local_infile=1                                                     #开启Load 
   tmpdir=/tmp
   datadir=/var/lib/mysql
   back_log=250                                                       #max_connec外的连接数
   #skip-grant-tables
   max_connections=1024
   #wait_timeout=86400
   wait_timeout=300                                                   #非交互链接超时时间
   #interactive_timeout= 1800
   interactive_timeout= 300                                           #交互链接超时时间
   max_connect_errors=10000
   group_concat_max_len=2048                                          #字符串链接操作长度限制
   open_files_limit=8192
   skip_external_locking
   skip_name_resolve
   #skip_networking   
   max_allowed_packet=32M                                             #server接受数据包大小调整
   #thread_cache_size=64
   thread_cache_size=20
   thread_stack=192K
   transaction-isolation = REPEATABLE-READ
   #tmp_table_size=128M
   tmp_table_size=256M                                                  #临时表空间大小
   #max_tmp_tables=100
   #max_prepared_stmt_count=1048576
   lower_case_table_names=1
   log_bin_trust_function_creators=1
   ########log  
   log_error=/var/lib/mysql/mysql3306.err
   slow_query_log=1                                                    #开启慢查询
   long_query_time=1                                                   #单位是秒
   slow_query_log_file=/var/lib/mysql/mysql_slow.log
   log_bin=mysqlmaster-bin.log
   binlog_cache_size=8M
   binlog_format=MIXED
   max_binlog_cache_size=1024M
   max_binlog_size=1024M
   sync_binlog=1
   expire_logs_days=15
   
   ##########内存，优化，查询
   #key_buffer_size=235M
   key_buffer_size=512M                                                ##索引缓冲区大小
   #read_buffer_size=2M
   read_buffer_size=8M                                                 ##读buffer
   read_rnd_buffer_size=16M
   #join_buffer_size=2M
   join_buffer_size=16M                                                ##join buffer大小
   sort_buffer_size=16M                                                ##排序内存大小，基于链接，值过大会消耗大量内存，性能下降
   
   max_heap_table_size=123M
   #query_cache_min_res_unit=2K
   #query_cache_limit=2M
   #query_cache_size=410M
   #query_cache_type=1                                                 #查询缓存0是关，1是开，会消耗性能
   
   ##############MYISAM
   bulk_insert_buffer_size=64M
   myisam_sort_buffer_size=128M
   myisam_max_sort_file_size=10G
   myisam_repair_threads=1
   myisam_recover
   
   ##########language
   init_connect='SET NAMES utf8mb4'
   character-set-server = utf8mb4
   #########innodb
   innodb_file_per_table=1
   #innodb_open_file=1678
   innodb_open_files=65535                                              #innodb打开文件数
   innodb_purge_threads=0
   innodb_purge_batch_size=20
   innodb_io_capacity=200
   innodb_adaptive_flushing=on
   innodb_change_buffering=all
   innodb_stats_on_metadata=off
   innodb_spin_wait_delay=6
   innodb_buffer_pool_instances=12
   #innodb_open_files=1024            #重复，注释
   innodb_additional_mem_pool_size=16M
   innodb_buffer_pool_size=24000M                                      #innodb buffer
   innodb_sort_buffer_size=4M
   innodb_data_file_path=ibdata1:12M:autoextend
   innodb_autoextend_increment=8M
   innodb_read_io_threads=16
   innodb_write_io_threads=16
   innodb_thread_concurrency=0
   innodb_replication_delay=0
   innodb_flush_log_at_trx_commit=2
   #innodb_log_buffer_size=256M
   innodb_log_buffer_size=32M                                           #inondb日志缓冲大小
   innodb_log_file_size=256M
   #innodb_log_file_size=1024M                                          #innodb日志大小   修改此值数据库无法启动
   innodb_log_files_in_group=2
   innodb_max_dirty_pages_pct=85
   #innodb_log_group_home_dir=
   innodb_lock_wait_timeout=300                                         #innodb事物锁时间
   table_open_cache=16384
   #table_definiton_cache=16384
   [mysqldump]
   quick
   max_allowed_packet = 32M
   [mysql]
   no_auto_rehash
   # Remove leading # to set options mainly useful for reporting servers.
   # The server defaults are faster for transactions and fast SELECTs.
   # Adjust sizes as needed, experiment to find the optimal values.
   # join_buffer_size = 128M
   # sort_buffer_size = 2M
   # read_rnd_buffer_size = 2M 
   
   #sql_mode=STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION,NO_AUTO_VALUE_ON_ZERO
   ```

### 安装Redis

1. 下载镜像

   ```shell
   docker pull redis
   ```

2. 获取配置文件

   ```shell
   mkdir /home/redis
   ```

   ```shell
   wget -P /home/redis http://download.redis.io/redis-stable/redis.conf
   ```

3. 设置配置文件属性

   - 修改`/daemonize`（配置后台运行，docker 启动不能设置为yes，否则无法启动）
   - 修改`/logfile`（配置日志路径）
   - 修改`/bind`（是否限制只当前主机访问）
   - 修改`/requirepass`（设置密码）
   - 修改`/protected-mode`（保护模式，关闭外网可直接访问）

4. 执行构建命令

   ```shell
   docker run -d --privileged=true --name redis \
   	--restart always \
   	 -p 6379:6379 \
   	 -v /home/redis/data:/data \
   	 -v /home/redis/redis.conf:/etc/redis/redis.conf redis \
        redis-server /etc/redis/redis.conf --appendonly yes 
   ```

   ```sh
   docker run --privileged=true -p 6379:6379 --name redis -v /data/redis/redis.conf:/etc/redis/redis.conf -v /data/redis/data:/data -v /data/redis/log:/log  -d redis redis-server /etc/redis/redis.conf --appendonly yes
   ```

5. centos7安装docker后并装载redis,发现无法正常运行

   ```shell
   1、/usr/sbin/sestatus -v      ##如果SELinux status参数为enabled即为开启状态
   SELinux status:                 enabled
   2、getenforce                 ##也可以用这个命令检查
   关闭SELinux：
   1、临时关闭（不用重启机器）：
   setenforce 0                  ##设置SELinux 成为permissive模式
                                 ##setenforce 1 设置SELinux 成为enforcing模式
   2、修改配置文件需要重启机器：
   修改/etc/selinux/config 文件
   将SELINUX=enforcing改为SELINUX=disabled
   重启机器即可
   ```

### 安装tomcat

1. 下载镜像

   ```shell
   docker pull tomcat:8.5.59-jdk8-corretto
   ```

2. 执行构建命令

   创建容器的宿主机文件夹

   ```shell
   mkdir -p /home/tomcat
   ```

   复制容器内的配置到宿主机

   ```powershell
   docker cp a02f94e6dba6:/usr/local/tomcat/conf /home/tomcat/
   docker cp a02f94e6dba6:/usr/local/tomcat/webapps /home/tomcat/
   ```

   基础参数

   ```shell
   JAVA_OPTS="-server -Dfile.encoding=UTF-8 -Xms4g -Xmx4g -Xmn1g -Xss512K -verbose:gc -XX:+UseConcMarkSweepGC -XX:MaxTenuringThreshold=10 -XX:PermSize=1g -XX:MaxPermSize=1g -XX:+ExplicitGCInvokesConcurrent -XX:GCTimeRatio=19 -XX:+UseParNewGC -XX:+UseCMSCompactAtFullCollection -XX:CMSFullGCsBeforeCompaction=10 -XX:+CMSClassUnloadingEnabled -XX:+CMSParallelRemarkEnabled -XX:CMSInitiatingOccupancyFraction=50 -Xnoclassgc -XX:SoftRefLRUPolicyMSPerMB=0"
   ```

   构建

   ```shell
   docker run --privileged=true --name zsdd-server \
   --restart always \
   # 允许连接到的容器
   --link=redis:zsdd-redis \
   -d -p 8080:8080 \
   -v /home/tomcat/webapps:/usr/local/tomcat/webapps \
   -v /home/tomcat/conf:/usr/local/tomcat/conf \
   -v /home/tomcat/bin:/usr/local/tomcat/bin \
   tomcat:8.5.59-jdk8-corretto
   ```
### 安装nginx



# 时间同步

   -v /etc/localtime:/etc/localtime \
   # 设置时区
   -e TZ="Asia/Shanghai" \
   -e LANG="C.UTF-8" \
   tomcat:8.5.59-jdk8-corretto  

   ```
   
   ```shell
   docker run --privileged=true --name zsdd-server \
   --restart always \
   # 允许连接到的容器
   --link=redis:zsdd-redis \
   -d -p 8080:8080 \
   -v /home/tomcat/webapps:/usr/local/tomcat/webapps \
   -v /home/tomcat/catalina.sh:/usr/local/tomcat/bin/catalina.sh \
   # 时间同步
   -v /etc/localtime:/etc/localtime \
   # 设置时区
   -e TZ="Asia/Shanghai" \
   tomcat:8.5.59-jdk8-corretto  
   ```

### 修改服务器时间

> [click this](https://www.cnblogs.com/suiyueshentou/p/7798340.html)

### 修改系统中文乱码

1. 安装中文包（centos7.x）

   ```shell
    yum  groupinstall  "fonts" 
   ```

2. 修改语言文件

   ```shell
   vi /etc/locale.conf
   # 设置
   LANG=en_US.UTF8
   LANG=zh_CN.UTF8/LANG=zh_CN
   source /etc/locale.conf
   ```

3. 重启系统

   ```shell
   reboot
   ```

### 安装Elasticsearch/Kibana



## 安装oracle12c

```sql
docker pull registry.cn-hangzhou.aliyuncs.com/zhuyijun/oracle-12c
chown -R 54321:54321 /data/oracle12c/oradata

docker run -d --name oracle12c --privileged \
    -p 1521:1521 -p 5500:5500 \
    -e ORACLE_SID=orcl \
    -e ORACLE_PDB=orclpdb1 \
    -e ORACLE_PWD=oracle \
    -e ORACLE_CHARACTERSET=zhs16gbk \
    -e ORACLE_BASE=/opt/oracle \
    -e ORACLE_HOME=/opt/oracle/product/12.2.0.1/dbhome_1 \
    -e PATH=/opt/oracle/product/12.2.0.1/dbhome_1/bin:/opt/oracle/product/12.2.0.1/dbhome_1/OPatch/:/usr/sbin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin \
    -v /data/oracle12c/oradata:/opt/oracle/oradata \
    registry.cn-hangzhou.aliyuncs.com/zhuyijun/oracle-12c:latest
```

