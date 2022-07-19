# MYSQL

## 配置文件

<a target='_blank' href='/db/mysql/my.ini'>查看文件</a>

```ini
转自：https://www.cnblogs.com/panwenbin-logs/p/8360703.html


#*** client options 相关选项 ***#
#以下选项会被MySQL客户端应用读取。注意只有MySQL附带的客户端应用程序保证可以读取这段内容。如果你想你自己的MySQL应用程序获取这些值。需要在MySQL客户端库初始化的时候指定这些选项。
[client]
port = 3309
socket =  /usr/local/mysql/tmp/mysql.sock

[mysqld] #服务器端配置
!include  /usr/local/mysql/etc/mysqld.cnf  #包含的配置文件，可以把用户名和密码文件单独存放

port = 3306　　#监听端口　　
bind-address = 0.0.0.0　　#监听的ip地址
server-id = 1　　#MySQL服务的ID

socket =  /usr/local/mysql/tmp/mysql.sock　　#socket通信设置
pid-file =  /usr/local/mysql/var/mysql.pid　 #pid文件路径
basedir =  /usr/local/mysql/　　　　　　　　　　#MySQL程序路径
datadir =  /usr/local/mysql/data　　　　　　　 #数据目录
tmpdir =  /usr/local/mysql/tmp/ 
#此目录被 MySQL用来保存临时文件.例如,它被用来处理基于磁盘的大型排序,和内部排序一样，以及简单的临时表.如果你不创建非常大的临时文件,将其放置到 swapfs/tmpfs 文件系统上也许比较好。另一种选择是你也可以将其放置在独立的磁盘上.你可以使用”;”来放置多个路径，他们会按照 roud-robin 方法被轮询使用.

slave-load-tmpdir =  /usr/local/mysql/tmp/  #当slave执行load data infile时使用


#*** skip options 相关选项 ***#
skip-name-resolve 
#禁止 MySQL 对外部连接进行 DNS 解析，使用这一选项可以消除 MySQL 进行 DNS 解析的时间。但需要注意，如果开启该选项，则所有远程主机连接授权都要使用 IP 地址方式，否则 MySQL 将无法正常处理连接请求！

skip-symbolic-links 
#不能使用连接文件，多个客户可能会访问同一个数据库，因此这防止外部客户锁定 MySQL 服务器。 该选项默认开启

skip-external-locking 
#不使用系统锁定，要使用 myisamchk,必须关闭服务器 ,避免 MySQL的外部锁定，减少出错几率增强稳定性。

skip-slave-start 
#启动 mysql,不启动复制

skip-networking 
#开启该选项可以彻底关闭 MySQL 的 TCP/IP 连接方式，如果 WEB 服务器是以远程连接的方式访问 MySQL 数据库服务器则不要开启该选项！否则将无法正常连接！ 如果所有的进程都是在同一台服务器连接到本地的 mysqld, 这样设置将是增强安全的方法

sysdate-is-now = 1 
#把SYSDATE 函数编程为 NOW的别名

#*** 系统资源相关选项 ***#
back_log = 50 
#接受队列，对于没建立 tcp 连接的请求队列放入缓存中，队列大小为 back_log，受限制与 OS 参数，试图设定 back_log 高于你的操作系统的限制将是无效的。默认值为 50。对于 Linux 系统推荐设置为小于512的整数。如果系统在一个短时间内有很多连接，则需要增大该参数的值

max_connections = 1000 
#指定MySQL允许的最大连接进程数。如果在访问数据库时经常出现"Too Many Connections"的错误提 示，则需要增大该参数值。

max_connect_errors = 10000 
#如果某个用户发起的连接 error 超过该数值，则该用户的下次连接将被阻塞，直到管理员执行 flush hosts ; 命令或者服务重启， 防止黑客 ， 非法的密码以及其他在链接时的错误会增加此值

open_files_limit = 10240 
#MySQL打开的文件描述符限制，默认最小1024;当open_files_limit没有被配置的时候，比较max_connections*5和ulimit-n的值，哪个大用哪个，当open_file_limit被配置的时候，比较open_files_limit和max_connections*5的值，哪个大用哪个。

connect-timeout = 10 
#连接超时之前的最大秒数,在 Linux 平台上，该超时也用作等待服务器首次回应的时间

wait-timeout = 28800 
#等待关闭连接的时间

interactive-timeout = 28800 
#关闭连接之前，允许 interactive_timeout（取代了wait_timeout）秒的不活动时间。客户端的会话 wait_timeout 变量被设为会话interactive_timeout 变量的值。如果前端程序采用短连接，建议缩短这2个值, 如果前端程序采用长连接，可直接注释掉这两个选项，默认配置(8小时)  

slave-net-timeout = 600 
#从服务器也能够处理网络连接中断。但是，只有从服务器超过slave_net_timeout 秒没有从主服务器收到数据才通知网络中断

net_read_timeout = 30 
#从服务器读取信息的超时

net_write_timeout = 60 
#从服务器写入信息的超时

net_retry_count = 10 
#如果某个通信端口的读操作中断了，在放弃前重试多次

net_buffer_length = 16384 
#包消息缓冲区初始化为 net_buffer_length 字节，但需要时可以增长到 max_allowed_packet 字节

max_allowed_packet = 64M
# 服务所能处理的请求包的最大大小以及服务所能处理的最大的请求大小(当与大的BLOB 字段一起工作时相当必要)， 每个连接独立的大小.大小动态增加。 设置最大包,限制server接受的数据包大小，避免超长SQL的执行有问题 默认值为16M，当MySQL客户端或mysqld
服务器收到大于 max_allowed_packet 字节的信息包时，将发出“信息包过大”错误，并关闭连接。对于某些客户端，如果通信信息包过大，在执行查询期间，可能会遇到“丢失与 MySQL 服务器的连接”错误。默认值 16M。

table_cache = 512 
# 所有线程所打开表的数量. 增加此值就增加了mysqld所需要的文件描述符的数量这样你需要确认在[mysqld_safe]中 “open-files-limit” 变量设置打开文件数量允许至少4096

thread_stack = 192K 
# 线程使用的堆大小. 此容量的内存在每次连接时被预留.MySQL 本身常不会需要超过 64K 的内存如果你使用你自己的需要大量堆的 UDF 函数或者你的操作系统对于某些操作需要更多的堆,你也许需要将其设置的更高一点.默认设置足以满足大多数应用

thread_cache_size = 20 
# 我们在 cache 中保留多少线程用于重用.当一个客户端断开连接后,如果 cache 中的线程还少于 thread_cache_size,则客户端线程被放入 cache 中.这可以在你需要大量新连接的时候极大的减少线程创建的开销(一般来说如果你有好的线程模型的话,
这不会有明显的性能提升.)服务器线程缓存这个值表示可以重新利用保存在缓存中线程的数量,当断开连接时如果缓存中还有空间,那么客户端的线程将被放到缓存中,如果线程重新被请求，那么请求将从缓存中读取,如果缓存中是空的或者是新的请求，那么这个线程将被重新创建,
如果有很多新的线程，增加这个值可以改善系统性能.通过比较 Connections 和 Threads_created 状态的变量，可以看到这个变量的作用
根据物理内存设置规则如下：
1G  —> 8
2G  —> 16
3G  —> 32
大于3G  —> 64

thread_concurrency = 8 
#此允许应用程序给予线程系统一个提示在同一时间给予渴望被运行的线程的数量.该参数取值为服务器逻辑CPU数量×2，在本例中，服务器有 2 颗物理CPU，而每颗物理CPU又支持H.T超线程，所以实际取值为 4 × 2 ＝ 8.设置 thread_concurrency的值的正确与否, 
对 mysql 的性能影响很大, 在多个 cpu(或多核)的情况下，错误设置了 thread_concurrency 的值, 会导致 mysql 不能充分利用多 cpu(或多核),出现同一时刻只能一个 cpu(或核)在工作的情况。 thread_concurrency 应设为 CPU 核数的 2 倍.比如有一个双核的 CPU, 
那么 thread_concurrency 的应该为 4; 2 个双核的 cpu,thread_concurrency 的值应为 8,属重点优化参数
 
 
#*** qcache settings 相关选项 ***#
query_cache_limit = 2M 
#不缓存查询大于该值的结果.只有小于此设定值的结果才会被缓冲,  此设置用来保护查询缓冲,防止一个极大的结果集将其他所有的查询结果都覆盖.

query_cache_min_res_unit = 2K 
#查询缓存分配的最小块大小.默认是 4KB，设置值大对大数据查询有好处，但如果你的查询都是小数据查询，就容易造成内存碎片和浪费
查询缓存碎片率 = Qcache_free_blocks / Qcache_total_blocks * 100%
如果查询缓存碎片率超过 20%，可以用 FLUSH QUERY CACHE 整理缓存碎片，或者试试减小query_cache_min_res_unit，如果你的查询都是小数据量的话。
查询缓存利用率 = (query_cache_size – Qcache_free_memory) / query_cache_size *100%
查询缓存利用率在 25%以下的话说明 query_cache_size 设置的过大，可适当减小;查询缓存利用率在 80%以上而且 Qcache_lowmem_prunes > 50 的话说明 query_cache_size 可能有点小，要不就是碎片太多。
查询缓存命中率 = (Qcache_hits – Qcache_inserts) / Qcache_hits * 100%

query_cache_size = 64M  
#指定 MySQL 查询缓冲区的大小。可以通过在 MySQL 控制台执行以下命令观察：
代码:
> SHOW VARIABLES LIKE '%query_cache%';
> SHOW STATUS LIKE 'Qcache%';如果 Qcache_lowmem_prunes 的值非常大，则表明经常出现缓冲不够的情况；
如果 Qcache_hits 的值非常大，则表明查询缓冲使用非常频繁，如果该值较小反而会影响效率，那么可以考虑不用查询缓冲； Qcache_free_blocks，如果该值非常大，则表明缓冲区中碎片很多。
memlock # 如果你的系统支持 memlock() 函数,你也许希望打开此选项用以让运行中的 mysql 在在内存高度
紧张的时候,数据在内存中保持锁定并且防止可能被 swapping out,此选项对于性能有益

#*** default settings 相关选项 ***#
default_table_type = InnoDB 
# 当创建新表时作为默认使用的表类型,如果在创建表示没有特别执行表类型,将会使用此值

default-time-zone = system 
#服务器时区

character-set-server = utf8 
#server 级别字符集

default-storage-engine = InnoDB 
#默认存储引擎

#*** tmp && heap settings 相关选项 ***#
tmp_table_size = 512M 
#临时表的最大大小，如果超过该值，则结果放到磁盘中,此限制是针对单个表的,而不是总和.

max_heap_table_size = 512M 
#独立的内存表所允许的最大容量.此选项为了防止意外创建一个超大的内存表导致永尽所有的内存资源.

#*** log settings 相关选项 ***#
log-bin = mysql-bin 
#打开二进制日志功能.在复制(replication)配置中,作为 MASTER 主服务器必须打开此项.如果你需要从你最后的备份中做基于时间点的恢复,你也同样需要二进制日志.这些路径相对于 datadir

log_slave_updates = 1 
#表示slave将复制事件写进自己的二进制日志

log-bin-index = mysql-bin.index 
#二进制的索引文件名

relay-log = relay-log 
#定义relay_log的位置和名称，如果值为空，则默认位置在数据文件的目录，文件名为host_name-relay-bin.nnnnnn（By default, relay log file names have the form host_name-relay-bin.nnnnnn in the data directory）；

relay_log_index = relay-log.index  
#relay-log的索引文件名

log-warnings = 1 
# 将警告打印输出到错误 log 文件.如果你对于MySQL有任何问题，你应该打开警告 log 并且仔细审查错误日志,查出可能的原因.

log-error =  /usr/local/mysql/log/mysql.err 
#错误日志路径

log_output = FILE 
#参数 log_output 指定了慢查询输出的格式，默认为 FILE，你可以将它设为 TABLE，然后就可以查询 mysql 架构下的 slow_log 表了

log_slow_queries 
#指定是否开启慢查询日志(该参数要被slow_query_log取代，做兼容性保留)

slow_query_log = 1 
# 指定是否开启慢查询日志. 慢查询是指消耗了比 “long_query_time” 定义的更多时间的查询.如果 log_long_format 被打开,那些没有使用索引的查询也会被记录.如果你经常增加新查询到已有的系统内的话. 一般来说这是一个好主意,

long-query-time = 1 
#设定慢查询的阀值，超出次设定值的SQL即被记录到慢查询日志，缺省值为10s.所有的使用了比这个时间(以秒为单位)更多的查询会被认为是慢速查询.不要在这里使用”1″, 否则会导致所有的查询,甚至非常快的查询页被记录下来(由于MySQL 目前时间的精确度只能达到秒的级别).

log_long_format 
# 在慢速日志中记录更多的信息.一般此项最好打开，打开此项会记录使得那些没有使用索引的查询也被作为到慢速查询附加到慢速日志里

slow_query_log_file =  /usr/local/mysql/log/slow.log 
# 指定慢日志文件存放位置，可以为空，系统会给一个缺省的文件host_name-slow.log

log-queries-not-using-indexes 
#如果运行的SQL语句没有使用索引，则mysql数据库同样会将这条SQL语句记录到慢查询日志文件中。

min_examined_row_limit=1000　　　　
#记录那些由于查找了多余1000次而引发的慢查询

long-slow-admin-statements　　　　
#记录那些慢的optimize table，analyze table和alter table语句

log-slow-slave-statements 
#记录由Slave所产生的慢查询

general_log = 1 
#将所有到达MySQL Server的SQL语句记录下来,默认关闭 

general_log_file =  /usr/local/mysql/log/mysql.log 
#general_log路径

max_binlog_size = 1G 
#如果二进制日志写入的内容超出给定值，日志就会发生滚动。你不能将该变量设置为大于1GB或小于4096字节。 默认值是1GB。如果你正使用大的事务，二进制日志还会超过max_binlog_size

max_relay_log_size = 1G 
#标记relaylog允许的最大值，如果该值为0，则默认值为max_binlog_size(1G)；如果不为0，则max_relay_log_size则为最大的relay_log文件大小；

relay-log-purge = 1 
#是否自动清空不再需要中继日志时。默认值为1(启用)

expire_logs_days = 30 
#超过 30 天的 binlog 删除

binlog_cache_size = 1M 
# 在一个事务中 binlog 为了记录 SQL 状态所持有的 cache 大小,如果你经常使用大的,多声明的事务,你可以增加此值来获取更大的性能.所有从事务来的状态都将被缓冲在 binlog 缓冲中然后在提交后一次性写入到 binlog 中,如果事务比此值大, 会使用磁盘上的临时文件来替代.此缓冲在每个连接的事务第一次更新状态时被创建.session 级别

replicate-wild-ignore-table = mysql.% 
#复制时忽略数据库及表
slave_skip_errors=all 
#定义复制过程中从服务器可以自动跳过的错误号，当复制过程中遇到定义的错误号，就可以自动跳过，直接执行后面的SQL语句。
slave_skip_errors选项有四个可用值，分别为：off，all，ErorCode，ddl_exist_errors。
  默认情况下该参数值是off，我们可以列出具体的error code，也可以选择all，mysql5.6及MySQL Cluster NDB 7.3以及后续版本增加了参数ddl_exist_errors，该参数包含一系列error code（1007,1008,1050,1051,1054,1060,1061,1068,1094,1146）
    一些error code代表的错误如下：
    1007：数据库已存在，创建数据库失败
    1008：数据库不存在，删除数据库失败
    1050：数据表已存在，创建数据表失败
    1051：数据表不存在，删除数据表失败
    1054：字段不存在，或程序文件跟数据库有冲突
    1060：字段重复，导致无法插入
    1061：重复键名
    1068：定义了多个主键
    1094：位置线程ID
    1146：数据表缺失，请恢复数据库
    1053：复制过程中主服务器宕机
    1062：主键冲突 Duplicate entry '%s' for key %d
    
    
#*** MyISAM 相关选项 ***#
key_buffer_size = 256M 
#指定用于索引的缓冲区大小，增加它可得到更好的索引处理性能。如果是以InnoDB引擎为主的DB，专用于MyISAM引擎的 key_buffer_size 可以设置较小，8MB 已足够  如果是以MyISAM引擎为主，可设置较大，但不能超过4G. 在这里，强烈建议不使用MyISAM引擎，默认都是用InnoDB引擎.注意：该参数值设置的过大反而会是服务器整体效率降低！

sort_buffer_size = 2M 
#查询排序时所能使用的缓冲区大小。排序缓冲被用来处理类似 ORDER BY 以及 GROUP BY 队列所引起的排序.一个用来替代的基于磁盘的合并分类会被使用.查看 “Sort_merge_passes” 状态变量. 在排序发生时由每个线程分配 注意：该参数对应的分配内存是每连接独占！如果有 100 个连接，那么实际分配的总共排序缓冲区大小为 100 × 6 ＝600MB,所以,对于内存在 4GB 左右的服务器推荐设置为 6-8M。 

read_buffer_size = 2M 
#读查询操作所能使用的缓冲区大小。和 sort_buffer_size 一样，该参数对应的分配内存也是每连接独享！用来做 MyISAM 表全表扫描的缓冲大小.当全表扫描需要时,在对应线程中分配.

join_buffer_size = 8M 
#联合查询操作所能使用的缓冲区大小，和 sort_buffer_size 一样，该参数对应的分配内存也是每连接独享!此缓冲被使用来优化全联合(full JOINs 不带索引的联合).类似的联合在极大多数情况下有非常糟糕的性能表现, 但是将此值设大能够减轻性能影响.通过 “Select_full_join”状态变量查看全联合的数量， 当全联合发生时,在每个线程中分配。

read_rnd_buffer_size = 8M 
#MyISAM 以索引扫描(Random Scan)方式扫描数据的 buffer大小 

bulk_insert_buffer_size = 64M 
#MyISAM 使用特殊的类似树的 cache 来使得突发插入(这些插入是,INSERT … SELECT, INSERT … VALUES (…), (…), …, 以及 LOAD DATAINFILE) 更快. 此变量限制每个进程中缓冲树的字节数.设置为 0 会关闭此优化.为了最优化不要将此值设置大于 “key_buffer_size”.当突发插入被检测到时此缓冲将被分配MyISAM 用在块插入优化中的树缓冲区的大小。注释：这是一个 per thread 的限制 （ bulk 大量）.此缓冲当 MySQL 需要在 REPAIR, OPTIMIZE, ALTER 以及 LOAD DATA INFILE到一个空表中引起重建索引时被分配.这在每个线程中被分配.所以在设置大值时需要小心.

myisam_sort_buffer_size = 64M 
#MyISAM 设置恢复表之时使用的缓冲区的尺寸,当在REPAIR TABLE 或用 CREATE INDEX 创建索引或 ALTER TABLE 过程中排序 MyISAM 索引分配的缓冲区

myisam_max_sort_file_size = 10G
#mysql重建索引时允许使用的临时文件最大大小

myisam_repair_threads = 1 
#如果该值大于 1，在 Repair by sorting 过程中并行创建MyISAM 表索引(每个索引在自己的线程内).如果一个表拥有超过一个索引, MyISAM 可以通过并行排序使用超过一个线程去修复他们.这对于拥有多个 CPU 以及大量内存情况的用户,是一个很好的选择.

myisam_recover = 64K
#允许的 GROUP_CONCAT()函数结果的最大长度
transaction_isolation = REPEATABLE-READ # 设定默认的事务隔离级别.可用的级别如下:READ-UNCOMMITTED, READ-COMMITTED, REPEATABLE-READ,SERIALIZABLE
1.READ UNCOMMITTED-读未提交 2.READ COMMITTE-读已提交 3.REPEATABLE READ -可重复读 4.SERIALIZABLE -串行


# *** INNODB 相关选项 ***#
skip-innodb 
# 如果你的 MySQL 服务包含 InnoDB 支持但是并不打算使用的话,使用此选项会节省内存以及磁盘空间,并且加速某些部分

innodb_file_per_table = 1 
# InnoDB为独立表空间模式，每个数据库的每个表都会生成一个数据空间
独立表空间优点：
1．每个表都有自已独立的表空间。
2．每个表的数据和索引都会存在自已的表空间中。
3．可以实现单表在不同的数据库中移动。
4．空间可以回收（除drop table操作处，表空不能自已回收）
缺点：
1.单表增加过大，如超过100G
结论：
共享表空间在Insert操作上少有优势。其它都没独立表空间表现好。当启用独立表空间时，请合理调整：innodb_open_files

innodb_status_file = 1 
#启用InnoDB的status file，便于管理员查看以及监控等

innodb_open_files = 2048 
# 限制Innodb能打开的表的数据，如果库里的表特别多的情况，请增加这个。这个值默认是300

innodb_additional_mem_pool_size = 100M 
#设置InnoDB存储引擎用来存放数据字典信息以及一些内部数据结构的内存空间大小，所以当我们一个MySQL Instance中的数据库对象非常多的时候，是需要适当调整该参数的大小以确保所有数据都能存放在内存中提高访问效率的。 

innodb_buffer_pool_size = 2G 
#包括数据页、索引页、插入缓存、锁信息、自适应哈希所以、数据字典信息.InnoDB 使用一个缓冲池来保存索引和原始数据, 不像 MyISAM.这里你设置越大,你在存取表里面数据时所需要的磁盘 I/O 越少.在一个独立使用的数据库服务器上,你可以设置这个变量到服务器物理内存大小的 80%,不要设置过大,否则,由于物理内存的竞争可能导致操作系统的换页颠簸.注意在 32 位系统上你每个进程可能被限制在 2-3.5G 用户层面内存限制,所以不要设置的太高.

innodb_write_io_threads = 4
innodb_read_io_threads = 4
# innodb使用后台线程处理数据页上的读写 I/O(输入输出)请求,根据你的 CPU 核数来更改,默认是4
# 注:这两个参数不支持动态改变,需要把该参数加入到my.cnf里，修改完后重启MySQL服务,允许值的范围从 1-64

innodb_data_home_dir =  /usr/local/mysql/var/ 
#设置此选项如果你希望 InnoDB 表空间文件被保存在其他分区.默认保存在 MySQL 的 datadir 中.

innodb_data_file_path = ibdata1:500M;ibdata2:2210M:autoextend
#InnoDB将数据保存在一个或者多个数据文件中成为表空间.如果你只有单个逻辑驱动保存你的数据,一个单个的自增文件就足够好了.其他情况下.每个设备一个文件一般都是个好的选择.你也可以配置 InnoDB 来使用裸盘分区 – 请参考手册来获取更多相关内容

innodb_file_io_threads = 4 
#用来同步 IO 操作的 IO 线程的数量. 此值在 Unix 下被硬编码为 4,但是在 Windows 磁盘 I/O 可能在一个大数值下表现的更好.

innodb_thread_concurrency = 16
#在 InnoDb 核心内的允许线程数量,InnoDB 试着在 InnoDB 内保持操作系统线程的数量少于或等于这个参数给出的限制,最优值依赖于应用程序,硬件以及操作系统的调度方式.过高的值可能导致线程的互斥颠簸.默认设置为 0,表示不限制并发数，这里推荐设置为0，更好去发挥CPU多核处理能力，提高并发量

innodb_flush_log_at_trx_commit = 1 
#如果设置为 1 ,InnoDB 会在每次提交后刷新(fsync)事务日志到磁盘上,这提供了完整的 ACID 行为.如果你愿意对事务安全折衷, 并且你正在运行一个小的食物, 你可以设置此值到 0 或者 2 来减少由事务日志引起的磁盘 I/O
代表日志只大约每秒写入日志文件并且日志文件刷新到磁盘.
代表日志写入日志文件在每次提交后,但是日志文件只有大约每秒才会刷新到磁盘上.

innodb_log_buffer_size = 8M 
#用来缓冲日志数据的缓冲区的大小.当此值快满时, InnoDB 将必须刷新数据到磁盘上.由于基本上每秒都会刷新一次,所以没有必要将此值设置的太大(甚至对于长事务而言)

innodb_log_file_size = 500M 
#事物日志大小.在日志组中每个日志文件的大小，你应该设置日志文件总合大小到你缓冲池大小的5%~100%，来避免在日志文件覆写上不必要的缓冲池刷新行为.不论如何, 请注意一个大的日志文件大小会增加恢复进程所需要的时间.

innodb_log_files_in_group = 2 
#在日志组中的文件总数.通常来说 2~3 是比较好的.

innodb_log_group_home_dir =  /usr/local/mysql/var/
# InnoDB 的日志文件所在位置. 默认是 MySQL 的 datadir.你可以将其指定到一个独立的硬盘上或者一个 RAID1 卷上来提高其性能innodb_max_dirty_pages_pct = 90 #innodb 主线程刷新缓存池中的数据，使脏数据比例小于 90%,这是一个软限制,不被保证绝对执行.

innodb_lock_wait_timeout = 50 
#InnoDB 事务在被回滚之前可以等待一个锁定的超时秒数。InnoDB 在它自己的 锁定表中自动检测事务死锁并且回滚事务。 InnoDB 用 LOCK TABLES 语句注意到锁定设置。默认值是 50 秒

innodb_flush_method = O_DSYNC 
# InnoDB 用来刷新日志的方法.表空间总是使用双重写入刷新方法.默认值是 “fdatasync”, 另一个是 “O_DSYNC”.

innodb_force_recovery=1
# 如果你发现 InnoDB 表空间损坏, 设置此值为一个非零值可能帮助你导出你的表.从1 开始并且增加此值知道你能够成功的导出表.

innodb_fast_shutdown 
# 加速 InnoDB 的关闭. 这会阻止 InnoDB 在关闭时做全清除以及插入缓冲合并.这可能极大增加关机时间, 但是取而代之的是 InnoDB 可能在下次启动时做这些操作.



# *** 其他 相关选项 ***#
[mysqldump]
quick 
#支持较大数据库的转储，在导出非常巨大的表时需要此项。增加该变量的值十分安全，这是因为仅当需要时才会分配额外内存。例如，仅当你发出长查询或mysqld必须返回大的结果行时mysqld才会分配更多内存。该变量之所以取较小默认值是一种预防措施，以捕获客户端和服务器之间的错误信息包，并确保不会因偶然使用大的信息包而导致内存溢出。 如果你正是用大的BLOB值，而且未为mysqld授予为处理查询而访问足够内存的权限，也会遇到与大信息包有关的奇怪问题。如果怀疑出现了该情况，请尝试在mysqld_safe脚本开始增加ulimit -d 256000，并重启mysqld。

[mysql]
auto-rehash 
#允许通过 TAB 键提示

default-character-set = utf8 
#数据库字符集

connect-timeout = 3
[mysqld_safe]

open-files-limit = 8192 
#增加每个进程的可打开文件数量.确认你已经将全系统限制设定的足够高!打开大量表需要将此值设大
```

## 逻辑架构

​		![逻辑架构图](/db/mysql/mysql_construct.png)

## 存储引擎

【**简介**】

- 每一个MySQL表主要由三部分组成：元数据、索引、数据。元数据即表定义等基本信息。

- 每一个**MyISAM**表，在对应的schema目录下，均对应三个同名的.frm,   .MYI,   .MYD文件。

  ![MyISAM表文件](/db/mysql/mysql_myisam_file.png)

说明：

可以通过在不同的数据库目录之间，自由移动上述三个文件，来实现MyISAM表的移动。

InnoDB表，无论表空间类型如何，均不具有自由移动性质。每一个**InnoDB**表，在对应的schema目录下，均对应一个同名.frm文件，此文件无实际意义。
全部表的元数据，都存放在系统表空间。
每个表的索引和数据，要么同时存放在共享的系统表空间，要么同时存放在各自的**FILE_PER_TABLE**表空间。

【**系统表空间**】

​		组成：ibdata文件集合，如ibdata1，ibdata2等。

​		位置：顶层数据目录。

​		类型：全局共享，所有数据库的所有表共享ibdata文件。

​		作用：存放全部表的元数据；作为undo log, change buffer, doublewrite buffer等的存储区；存放部分表的索引和数据。

【**FILE_PER_TABLE(独立表空间)**】

​		组成：与该表同名的.ibd文件，如employee.ibd。

​		位置：对应的schema目录

​		类型：每个表有自己的表空间，每个表空间有自己的.ibd数据文件。

​		作用：存放该表的索引和数据。

​		特性：可以通过运行*RENAME TABLE db1.tbl_name TO db2.tbl_name*命令，实现**FILE_PER_TABLE**表在不同数据库之间的移动。

**关于系统表空间和独立表空间的说明**：

1. 系统表空间和FILE_PER_TABLE表空间只服务于InnoDB类型的表，即ibdata1和.ibd文件为InnoDB所有；
2. 当全局系统变量innodb_file_per_table = off时，新创建的表索引和数据，存放在系统表空间，即ibdata中；

3. 当全局系统变量innodb_file_per_table = on时，创建新表时，会同时创建同名的.idb文件，用于存放该表的索引和数据。

【**重做日志**】即innodb redo log，又名日志组。

​		文件：ib_logfile文件集合，如ib_logfile0和ib_logfile1。

​		位置：顶层数据目录。

​		作用：所有需要修改InnoDB表数据的SQL语句和底层API调用，都被编码保存到重做日志。如果由于异常，导致数据更新没有同步到数据文件，如事物执行到一半发生崩溃，MySQL在重启时，将根据重做日志，将未完成的操作进行下去，以确保数据一致性。

​		![文件结构示例图](/db/mysql/mysql_file_construct.png)

```mysql
show engines;
```

​		![存储引擎](/db/mysql/mysql_engines.png)

**InnoDB**

**MyISAM**

**对比关系图**

​		![存储引擎对比关系图](/db/mysql/mysql_engines_compare.jpg)

**Alisql+AliRedis**

## Mysql 性能优化

### **性能下降sql执行慢等待时间长**

```tex
查询语句写的不好
索引失效
关联查询太多join(设计缺陷或者不得已的需求)
服务器调优及各个参数的设置(缓冲、线程池等)
```

### **常见的join查询** [详细信息](https://www.cnblogs.com/annsshadow/p/5037667.html)

**mysql对sql语句解析顺序**

![sql语句解析](/db/mysql/mysql_sql_explain.jpg)

**sql的执行顺序**

**join图**

**建表sql**

**7种join**

**索引: 没有特殊指定的使用Btree索引；Index帮助Mysql高效获取数据的数据结构。排好序的快速查找数据结构,除了本身的数据外，还管理另外一套方便查询的数据结构算法**

**唯一索引默认都是B+ tree索引**

存在问题：会影响查找和排序

mysql的索引分为**单列索引**(主键索引,唯一索引,普通索引)和**组合索引**.

**单列索引**:一个索引只包含一个列,一个表可以有多个单列索引.

**组合索引**:一个组合索引包含两个或两个以上的列,

单列索引：只使用一张表的某一个字段创建索引(idx_tableName_tableField)；

```mysql
create [UNIQUE 区别是不是唯一索引] index idx_tableName_tableField on tableName(tableField(length));
alter tabkeName add [UNIQUE 区别是不是唯一索引] index idx_tableName_tableField on (tableField(length))
```

组合索引：只使用一张表的某一个字段创建索引(idx_tableName_tableField)；

```mysql
create index idx_tableName_tableField on tableName(tableField1,tableFiel2...);
```

**查看索引：**

```mysql
show index from tableName;
```

**删除索引**：

```mysql
Drop index indexName on tableName;
```

**mysql索引结构：**

1. **BTree索引**
2. Hash索引
3. full-text全文索引
4. R-Tree索引

**使用索引的优点：**

1. 可以通过建立唯一索引或者主键索引,保证数据库表中每一行数据的唯一性.
2. 建立索引可以大大提高检索的数据,以及减少表的检索行数
3. 在表连接的连接条件 可以加速表与表直接的相连 
4. 在分组和排序字句进行数据检索,可以减少查询时间中 分组 和 排序时所消耗的时间(数据库的记录会重新排序)
5. 建立索引,在查询中使用索引 可以提高性能

**使用索引的缺点**：

1. 在创建索引和维护索引 会耗费时间,随着数据量的增加而增加
2. 索引文件会占用物理空间,除了数据表需要占用物理空间之外,每一个索引还会占用一定的物理空间
3. 当对表的数据进行 INSERT,UPDATE,DELETE 的时候,索引也要动态的维护,这样就会降低数据的维护速度,(建立索引会占用磁盘空间的索引文件。一般情况这个问题不太严重，但如果你在一个大表上创建了多种组合索引，索引文件的会膨胀很快)。

**使用索引需要注意的地方：**

- 在经常需要搜索的列上,可以加快索引的速度
- 主键列上可以确保列的唯一性
- 在表与表的而连接条件上加上索引,可以加快连接查询的速度
- 在经常需要排序(order by),分组(group by)和的distinct 列上加索引 可以加快排序查询的时间,  (单独order by 用不了索引，索引考虑加where 或加limit)
- 在一些where 之后的 < <= > >= BETWEEN IN 以及某个情况下的like 建立字段的索引(B-TREE)
- like语句 如果你对nickname字段建立了一个索引.当查询的时候的语句是 nickname like '%ABC%' 那么这个索引讲不会起到作用.而nickname like 'ABC%' 那么将可以用到索引
- 索引不会包含NULL列,如果列中包含NULL值都将不会被包含在索引中,复合索引中如果有一列含有NULL值那么这个组合索引都将失效,一般需要给默认值0或者 ' '字符串
- 使用短索引,如果你的一个字段是Char(32)或者int(32),在创建索引的时候指定前缀长度 比如前10个字符 (前提是多数值是唯一的..)那么短索引可以提高查询速度,并且可以减少磁盘的空间,也可以减少I/0操作.
- 不要在列上进行运算,这样会使得mysql索引失效,也会进行全表扫描
- 选择越小的数据类型越好,因为通常越小的数据类型通常在磁盘,内存,cpu,缓存中 占用的空间很少,处理起来更快

**什么情况下不创建索引：**

- 查询中很少使用到的列 不应该创建索引,如果建立了索引然而还会降低mysql的性能和增大了空间需求.
- 很少数据的列也不应该建立索引,比如 一个性别字段 0或者1,在查询中,结果集的数据占了表中数据行的比例比较大,mysql需要扫描的行数很多,增加索引,并不能提高效率
- 定义为text和image和bit数据类型的列不应该增加索引,
- 当表的修改(UPDATE,INSERT,DELETE)操作远远大于检索(SELECT)操作时不应该创建索引,这两个操作是互斥的关系
- 重复且数量少的字段	

### 性能分析

1. mysql query optimizer (查询优化器)
2. 常见瓶颈
   - cpu：cpu饱和一般发生在数据写入内存或从磁盘上读取数据的时候
   - io：装入的数据大于内存数据的时候
   - 服务器硬件性能瓶颈：top,free,iostat和vmstat来查看系统性能状态
3. explain执行计划

​	explain：显示了mysql如何使用索引来处理select语句以及连接表。可以帮助选择更好的索引和写出更优化的查询语句。

​	作用：

```tex
			1. 可以看到表的读取顺序
			2. 数据读取操作的操作类型
			3. 哪些索引可以被使用
			4. 哪些索引被实际使用
			5. 表之间的引用
			6. 每张表有多少行被优化器查询
```

​	怎样使用：

```mysql
			explain sql语句....;
			explain sql语句\G    #key-value键值对展示
```

​	使用之后包含的计划信息：

​	![explain 使用后的计划信息](/db/mysql/mysql_explain_info.png)

1. **id***

   ```tex
   select 查询的序列号，包含一组数字，表示查询中执行select子句或操作表的顺序。
   1. id相同，执行顺序从上到下
   2. id不同，如果是子查询，id的序号会递增，id越大优先级越高
   3. id相同不同，同时存在
   ```

2. **select_type**

   ```tex
   1. SIMPLE->简单的select查询，查询中不包含子查询或者union ;
   2. PRIMARY->查询中包含任何复杂的子部分，最外层查询则被标记为primary=》复杂查询中最外层的 select **;**
   3. SUBQUERY->在select 或 where列表中包含了子查询=》含在 select 中的子查询（不在 from 子句中）;子查询中的第一个SELECT.
   4. DEPENDENT SUBQUERY->子查询中的第一个SELECT，取决于外面的查询   explain select **id** from t3 where **id** in (select **id** from t3 whereid=3952602 )  ;
   5. DERIVED--衍生 在from列表中包含的子查询被标记为derived（衍生），mysql或递归执行这些子查询，把结果放在临时表里 explain select * from (select * from t3 where id=3952602) a ;
   6. UNION-->若第二个select出现在union之后，则被标记为union;若union包含在from子句的子查询中，外层select将被标记为derived. explain select * from t3 where id=3952602 union all select * from t3;
   7. UNION RESULT-->从 union 临时表检索结果t explain select * from t3 where id=3952602 union all select * from t3;
   ```

3. **table**-->一列表示 explain 的一行正在访问哪个表。

4. **type***-->这列表示关联类型或访问类型，即MySQL决定如何查找表中的行。

   ```tex
   最好到最差**system**>**const**>**eq_ref**>**ref**>**range**>**index**>**all**; **好的sql查询至少达到range级别，最好能达到ref**
   ```

   ```tex
   1. **system**：表只有一行记录（等于系统表），这是const类型的特例，平时不会出现，可以忽略不计；
   2. **const**：表示通过索引一次就找到了，const用于比较primary key 或者 unique索引。因为只需匹配一行数据，所有很快。如果将主键置于where列表中，mysql就能将该查询转换为一个const
   3. **eq_ref**：唯一性索引扫描，对于每个索引键，表中只有一条记录与之匹配。常见于主键或 唯一索引扫描。
   4. **ref**：相比 `eq_ref`，不使用唯一索引，而是使用普通索引或者唯一性索引的部分前缀，索引要和某个值相比较，可能会找到多个符合条件的行
   5. **range**：范围扫描通常出现在 in(), between ,> ,<, >= 等操作中。使用一个索引来检索给定范围的行。(范围之后的索引可能会失效)
   6. **index**：Full Index Scan，index与ALL区别为index类型只遍历索引树。这通常为ALL块，应为索引文件通常比数据文件小。（Index与ALL虽然都是读全表，但index是从索引中读取，而ALL是从硬盘读取） 
   7. **ALL**：Full Table Scan，遍历全表以找到匹配的行 
   ```

5. **possoble_keys**

   ```tex
   显示可能应用在这张表的索引一个或者多个；查询字段上存在索引，则该索引会被列出，但不一定被查询实际使用。
   ```

6. **key***

   ```tex
   实际使用的索引。
   如果为NULL，则没有使用索引，查询中若使用了覆盖索引，则该索引仅出现在key列表中;在possible_keys中可能没有索引，但是在key中有使用索引，说明可能使用了覆盖索引，覆盖索引是指查询结果列中刚好匹配对应顺序所建立的索引.
   ```

7. **key_len**

   ```tex
   表示索引中使用的字节数，可通过该列计算查询中使用的索引的长度。在不损失精确性的情况下，长度越短越好，key_len显示的值为索引字段的最大可能长度，并非实际使用长度，即key_len是根据表定义计算而得，不是通过表内检索出的
   ```

8. **ref**

   ```tex
   显示索引的那一列被使用了,如果可能的话，是一个常数。哪些列或常量被用于查找索引列上的值
   ```

9. **rows***

   ```tex
   根据表统计信息及索引选用情况，大致估算出找到所需的记录所需要读取的行数, rows越小越好
   ```

10. **extra***

    ```tex
    包含不适合在其它列中显示但是十分重要的信息
    ```

    - **using filesort**

      ```tex
      说明mysql会对数据使用一个外部的索引排序,而不是按照表内的索引顺序进行读取。MySQL中无法利用索引完成的排序操作称为“文件内排序”。(如果排序的时候，必须完全应用组合索引的字段,会产生文件内排序,不能直接使用忽略掉第一个开始的索引字段查询或者排序)
      ```

    - **using temporary**

      ```tex
      使用了临时表保存中间结果,MySQL在对查询结果排序时使用临时表。常见于排序order by和分组查询group by。(使用group by或者order by的时候，必须完全应用组合索引的字段,会产生文件内排序或者创建临时表)
      ```

    - **using index**

      ```tex
      表示相应的select操作中使用了覆盖索引,避免访问了表的数据行，如果同时出现using where,表明索引被用来进行索引键值的查找；如果没有同时出现using where，表明索引被用来读取数据而不是查找数据(覆盖索引)。
      ```

      **索引覆盖：**

      ​			select的数据列只用从索引中获得，不必读取数据行，mysql利用索引返回select列表中的字段，不必根据索引再次读取数据文件；(**查询列被所创建的索引覆盖**)

    - **using where**

      ```tex
      使用了where过滤
      ```

    - **using join buffer**

      ```tex
      使用了连接缓存(inner join)
      ```

    - **impossible where**

      ```tex
      where子句的值总是false,不能用来获取任何元素(条件错乱)
      ```

    - **select tables optimized away**

      ```tex
      在没有group by语句下,子句的情况下，基于索引优化MAX、MIN操作或者对于MyISAM引擎优化count(*)操作,不必等到执行阶段再进行计算,查询执行计划生成的阶段完成优化。
      ```

    - **distinct**

      ```tex
      对distinct操作的优化,找到第一个元素后就停止继续查找
      ```

### 索引分析

   1. 单表

      ```tex
      如果存在范围类型的字段,可以跳过范围建立索引
      ```

   2. 两张表

      ```tex
      左连接：索引要加到查询字段(右边表上),解释：左连接左边的数据全有,右边根据字段值匹配左边。
      右连接：索引建到左表上。
      ```

   3. 三张表

      ```tex
      类似于两张表；
      ```

      **join 语句优化**

      1. 尽可能减少join的nestedLoop循环总次数，使用**小结果集驱动大结果集**；
      2. 优先优化NestedLoop的内层循环；
      3. 保证join语句中被驱动表上join条件字段已经被索引；
      4. 当无法保证被驱动表的join条件字段被索引且内存充足的情况下，设置JoinBuffer(**my.cnf**).

### 索引失效

- 全值匹配我最爱

  ```tex
  创建的复合索引,使用的时候最好全部使用,索引才不会失效,如果跳过最左边的索引,索引就会失效。
  ```

- 最佳左前缀法则

  ```tex
  第一个字段不能丢失，并且不跳过索引的中间列。
  ```

- 不在索引列上做任何操作(计算、函数、(自动or手动)类型转换),会导致索引失效转为全表扫描

- 存储引擎不能使用索引中范围条件右边的列

  ```tex
  类似索引分析的单表。 in or between...and  like
  ```

- 尽量使用覆盖索引,只访问索引的查询(索引列和查询列一致),减少select *

- 使用不等于(!=或者<>) 的时候无法使用索引会导致全表扫描

- is null , is not null 无法使用索引

- like 以通配符('%abc')开头,会导致索引失效,进行全表扫描

  ```tex
  只在右边写%不影响索引失效
  ```

  ##### **解决like 单左边% 或者 两边都有%导致索引失效的解决方法：**

  ```tex
  使用覆盖索引。
  	1. 包含like 的字段。但是不能使用select * ,(主键除外)
  	2. 覆盖索引没有包含的字段，如果查询会导致索引失效
  		exp: indexs_name_age 
  			select id,name,age from temp  索引可用
  			select id,name,age,email from temp 索引失效
  ```

- 字符串不加单引号会导致索引失效

- 少使用or,会导致索引失效

**group by 必排序，可能会有临时表产生**

### 一般性建议

1. 对于单值索引，尽量选择针对当前query过滤性更好的索引
2. 在选择组合索引的时候，当前query中过滤性最好的字段在索引字段顺序中，位置越靠前越好
3. 在选择组合索引的时候，尽量选择可以能够包含当前query中的where字句中更多字段的索引->全值匹配
4. 尽可能通过分析统计信息和调整query的写法来达到选择合适索引的目的

### *优化总结口诀

```tex
1. 全职匹配我最爱，最左前缀要遵守；
2. 带头大哥不能死，中间兄弟不能断；
3. 索引列上少计算，范围之后全失效；
4. like百分写右边，覆盖索引不写星*；
5. 不等空值还有or，索引失效要少用；
6. var引号不能丢，sql高级也不难。
```

## 查询截取分析

**具体步骤：**

```tex
1. 慢查询的开启和捕获；
2. explain + 慢sql分析；
3. show profile查询sql在MySQL服务器里执行的细节和生命周期情况；
4. MySQL服务器的参数调优。
```

### 查询优化

1. #### 永远小表驱动大表；

  ```tex
  exp:
  select * from A where id in (select id from B);
  结论： 当B表的数据小于A表的数据，使用in优于exists.
  select * from A where exists (select 1 from B where B.id = A.id)
  结论： 当A表的数据小于B表的数据，使用exists优于in.
  ```

2. #### order by 关键字的排序优化

   ```tex
   1. 双路排序  扫描两次磁盘
   2. 单路排序  在buffer中对数据进行排序，避免第二次扫描磁盘
   	如果排序的字段太多，单路排序就变成多路排序，优化方式如下：
   	2.1. my.cnf sort_buffer_size 缓冲区大小
   			max_length_for_sort_data
   	2.2. 使用order by 避免使用select *
   ```

   总结：

   ```tex
   1. Mysql两种排序方式： FileSort(文件内排序) 和 扫描有序索引排序
   2. Mysql可以为排序与查询使用相同索引
   3. order by 使用索引的条件以及不会产生文件内排序
   	前提条件：索引 key_a_b_c(a,b,c)
   	3.1 order by 能使用索引最左前缀
   		order by a
   		order by a,b
   		order by a,b,c
   		order by a desc,b desc,c desc （排序的顺序必须保持一致）
   	3.2 如果where使用索引的最左前缀定义为常量，则order by 可以使用索引
   		where a = const order by b,c
   		where a = const and b = const order by c
   		where a = const and b > const order by b,c
   	3.3 不能使用索引进行排序
   		order by a asc,b desc,c desc  #排序不一致
   		where g = const order by b,c  #丢失最左索引
   		where a = const order by c 	  #中间断开,丢失中间索引
   		where a = const order by a,d  #d不是索引的字段
   		where a in (...) order by b,c #对于排序来说，多个相等条件也是范围查询 in 会导致索引失效
   ```

   

3. #### group by 关键字的优化

   ```tex
   1. group by 实际上是先进行排序，遵照索引的最左前缀原则
   2. 其它优化与order by 的单路排序优化类似，需要调整 sort_buffer_size 和 max_length_for_sort_data
   3. where 高于 having，如果可以在where中限定，就不需要使用having
   ```

4. #### 慢查询日志

   ##### 4.1 慢查询日志的含义

   ```tex
   1. MySQL提供的一种日志记录，用来记录响应时间超过阀值的sql语句，具体值运行时间超过long_query_time值的sql，会被记录到慢查询日志中。
   2. long_query_time默认值是10秒。
   3. 响应超时的语句，再结合explain 进行分析。
   ```

   ##### 4.2 慢查询日志的说明

   ```tex
   1. MySQL数据库默认没有开启慢查询日志，需要手动去设置这个参数。
   2. 不是进行调优，不建议开启慢查询日志。会对性能造成一定的影响。
   ```

   ##### 4.3 操作慢查询日志

   4.3.1 命令行的操作

   ```mysql
   #查看慢查询日志的状态以及文件名称
   show variables like '%slow_query_log%'; 
   #开启慢查询日志，临时生效，重启之后就失效
   # 也可以在my.cnf中进行设置，mysql会默认给一个慢查询日志文件名称 [host_name]-slow.log
   set global slow_query_log = 1;	 
   #查看默认阀值，可以同上一样进行修改设置，mysql内部对此的判断是*大于*,而不是*大于等于*
   show variables like '%long_query_time%';					
   #设置阀值的秒数
   # 如果设置后进行查询数值没有更改：1. 可以重新开启一个mysql连接在进行查询
   #							 2. show global variables like '%long_query_time%'; 
   # 查看慢查询日志 可以使用select sleep([number]); 当作测试超过阀值的sql
   set global long_query_time = [number];
   # 查看慢查询日志中总共有多少条sql
   show variables like '%slow_querys%';
   ```

   4.3.2 配置文件

   ```ini
   #配置文件下的修改
   slow_query_log=1
   slow_query_log_file=/var/lib/mysql/slow_query_sql-slow.log
   long_query_time=3
   log_output=FILE
   ```

   ##### 4.4 MySQL日志分析工具*mysqldumpslow*

   ![工具的常用参数](/db/mysql/mysql_mysql_dump_slow_params.png)

   ![常用的语句](/db/mysql/mysql_mysql_dump_slow.png)

### 批量插入数据脚本

*： 在命令行界面创建MySQL函数，语句中会包含许多分号(结束标记)，因此需要定义另外一种结束标记符号。

```mysql
# 定义 $$为结束标记
DELIMITER $$
...
set autocommit = 0; #设置不自动提交
repeat
... #执行插入语句
until i>max
end repeat;
COMMIT;
END $$
```

exp:

![批量插入数据脚本示例](/db/mysql/mysql_batch_insert.png)

### show profile 分析

1. #### show profile是什么

   ```tex
   MySQL提供用来分析当前会话中语句执行的资源消耗情况，用于sql的调优测量。相当于sql的完成生命周期
   默认处于关闭状态，并保存最近15次的运行结果
   ```

2. ####  查看是否show profile状态

   ```mysql
   show variables like 'profiling';
   # 开启profile
   set profiling = on; 
   ```

3. ### show profile 使用方法

   ```mysql
   #1. 开启profile 
   set profiling = on; 
   #2. 运行sql语句
   #3. 执行show profiles;查看结果
   show profiles;
   	#结果> Query_ID Duration Query
   #4. 查看诊断结果 
   show profile cpu,block io for query [上一步的Query_ID];
   	#结果> Status Duration Cpu_user Cpu_system Block_ops_in Block_ops_out
   ```

   结论：（第4步执行的结果中，Status字段）

   ```tex
   1. converting HEAP to MyISam 查询结果太大，内存不够使用 转移到磁盘上存储
   2. Creating tmp table 拷贝数据到临时表，用完之后在进行删除
   3. Copying to tmp table on disk ****把内存中数据复制到磁盘****
   4. locked 
   ```

   ![show_profile的可查询参数](/db/mysql/mysql_show_profile_param.png)


### 全局查询日志

1. 不建议在测试晚景中使用此功能

2. 配置启用

   ```ini
   #开启
   general_log = 1
   #记录日志文件的位置
   general_log_file = /path/logfile
   #输出格式
   log_output = FILE
   ```

3. 命令启用

   ```mysql
   #开启
   set global general_log = 1;
   set global log_output = 'TABLE';
   #查询日志,经过上面两条命令，你所编写的sql会记录到mysql库下的general_log表中
   select * from mysql.general_log;
   ```


## 数据库锁理论

```tex
读锁共享 写锁排它
```

表锁的命令：

```mysql
# 查看有没有锁 查看 in_use 是否为1-加锁
1. show open tables;
# 添加锁的命令
2. lock table [table1] read,[table2] write;
# 释放锁
3. unlock tables;
# 分析表锁定 
#	Table_locks_immediate:产生表锁的次数，表示可以立即获取锁的查询次数，每次获取立即加1
#	Table_locks_waited:出现表级锁争用而发生的等待次数。没等待一次立即加1，表示严重的锁争用情况
4. show status like 'table%';
```

1. 表锁（偏读）

   ```tex
   1. 偏向MyISAM存储引擎，开销小，加锁快；无死锁，锁粒度大，发生锁冲突概率最高，并发度最低。
   2. MyISAM读写调度是写优先，因此不适合做写为主的表引擎。
   ```

   ```mysql
   #1. sessionA 对一张A表加*读*锁，只可以对A表进行查询。不能更新A表和查询其它表。
   #	sessionB 对A表可以查询，对其他表也可以进行查询更新，但是更新A表时，会阻塞到更新的地方，等待A表释放锁才可以更新数据。
   #2. sessionA 对一张A表加*写*锁，可以对表进行读和更新，不能查询和更新其它表。
   #	sessionB 对A表进行查询，会进行阻塞等待sessionA释放锁。
   ```

   ![MyISAM的锁的使用结论](/db/mysql/mysql_MyISAM_lock.png)

   读锁会阻塞写，但是不会阻塞读；写锁会把读和写全部阻塞

2. 行锁（偏写）

   ```tex
   1. 偏向InnoDB存储引擎，开销大，加锁慢；会出现死锁；锁粒度最小，发生锁冲突的概率最低，并发度也最高。
   2. 与MyISAM引擎的不同： 支持事物；行级锁。
   ```

   ![事务](/db/mysql/mysql_transaction_basic.png)

   ```mysql
   #查看默认事务隔离级别
   show variables like '%tx_isolation%';
   # 分析表行锁定 
   #	Table_locks_immediate:产生表锁的次数，表示可以立即获取锁的查询次数，每次获取立即加1
   #	Table_locks_waited:出现表级锁争用而发生的等待次数。没等待一次立即加1，表示严重的锁争用情况
   ******show status like 'innodb_row_table%';******
   ```

   ![mysql行锁定的分析](/db/mysql/mysql_innodb_row_lock.png)

   ```tex
   如果设置sessionA 和 sessionB都设置set autocommit = 0;
   sessionA更新表的记录 执行commit; sessionB 查询不到，必须先进行commit,在查询数据。
   相当于开启了不同的事物
   ```

   **索引失效会导致行锁变表锁**

   **间隙锁：**

   ```tex
   当使用范围检索数据而不是相等条件检索数据，并请求共享或排它锁时，InnoDB会给复合条件的已有数据的索引项添加锁。对于键值在条件范围内，但是不存在于表记录中的叫*间隙*(GAP)。也会对间隙加锁。
   ```

   **手动给某行数据添加锁：**

   ```mysql
   # 锁定where条件的行
   select * from ${tableName} where ... for update;
   # commit之后取消锁定
   commit;
   ```

3. 页锁

   ```tex
   基本上处于表锁和行锁之间，不支持并发，会出现死锁。
   ```


## 主从复制

### 复制基本原理

```tex
slave会从master读取binlog来进行数据同步
```

mysql复制过程：

```tex
1. master 将改变记录到二进制日志(binary log),过程被称为二进制日志事件，binary log events
2. slave 将master的binary log events拷贝到它的中继日志(relay log)
3. slave 重做中继日志的事件，将改变应用到自己的数据库中。mysql复制时异步串行的
```

### 主从复制配置

> https://www.cnblogs.com/alvin_xp/p/4162249.html

```tex
1. mysql版本必须保持一致
2. 主从配置在[mysqld]节点下，都是小写
3. 主机修改my.ini配置文件
	3.1 *主服务器唯一id server-id=1
	3.2 *启用二进制日志 log-bin=本地路径/mysqlbin
	3.3 启用错误日志 log-err=本地路径/mysqlerr
	3.4 根目录	basedir=本地安装的目录
	3.5 临时目录 tmpdir=自定义的目录
	3.6 数据目录 datadir=自定义的目录
	3.7 主机读写都可以	read-only=0
	3.8 设置不需要复制的数据库	binlog-ignore-db=mysql （mysql是mysql安装完成后就默认存在的数据库）
	3.9 设置需要复制的数据库 binlog-do-db=[数据库名称]
4. 从机修改my.ini配置文件
	4.1 *从服务器唯一id
	4.2 启用二进制日志
5. 修改完配置后，重新启动mysql服务
6. 主机和从机都需要关闭防火墙  linux: service iptables stop
7. 在主机上建立账户并授权slave
	grant replication slave on *.* to 'username'@'从机的ip地址' identified by 'password';
	flush privileges;   刷新环境
	show master status; 查看master状态,文件名称 和位置
8. 在从机上配置需要复制的主机,**在配置之前必须先查询show master status;
	grant master to master_host='[主机ip]', master_user='[主机分配的用户]',master_password='[主机分配的密码]',master_log_file='[shwo master status；的file]',master_log_pos=[shwo master status;的postion];
	start slave; 启动从服务器复制功能
	show slave status\G;(\G:key-value显示) slave_io_running:yes slave_sql_running:yes 代表配置成功  
 9. 可以在主机上进行建库建表进行测试
 10.停止从服务的复制功能
 	在从机中执行： stop slave;
```



