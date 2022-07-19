import{_ as l,o as e,c as i,b as s,a as p,e as n,d as c,r as o}from"./app.2d179ac6.js";const r={},d=n(`<h1 id="\u670D\u52A1\u5668\u90E8\u7F72" tabindex="-1"><a class="header-anchor" href="#\u670D\u52A1\u5668\u90E8\u7F72" aria-hidden="true">#</a> \u670D\u52A1\u5668\u90E8\u7F72</h1><h2 id="docker\u90E8\u7F72" tabindex="-1"><a class="header-anchor" href="#docker\u90E8\u7F72" aria-hidden="true">#</a> Docker\u90E8\u7F72</h2><h3 id="\u5B89\u88C5docker" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5docker" aria-hidden="true">#</a> \u5B89\u88C5Docker</h3><ol><li><p>\u786E\u8BA4\u5185\u6838\u7248\u672C\u22653.1.0</p><div class="language-bash ext-sh line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D4D4D4;">uname -r</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>\u67E5\u770B\u662F\u5426\u5B89\u88C5\u4E86Docker</p><div class="language-bash ext-sh line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D4D4D4;">yum list installed | grep docker</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>\u5B89\u88C5docker</p><div class="language-bash ext-sh line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D4D4D4;">yum -y install docker</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>\u542F\u52A8\u3001\u5173\u95ED\u548C\u67E5\u770BDocker\u72B6\u6001</p><p><strong>\u542F\u52A8</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D4D4D4;">systemctl start docker</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u5173\u95ED</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D4D4D4;">systemctl stop docker</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u67E5\u770B\u72B6\u6001</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D4D4D4;">systemctl status docker</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>\u8BBE\u7F6E\u4E3A\u5F00\u673A\u542F\u52A8</p><div class="language-bash ext-sh line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D4D4D4;">systemctl </span><span style="color:#DCDCAA;">enable</span><span style="color:#D4D4D4;"> docker.service</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ol><h3 id="\u5B89\u88C5mysql" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5mysql" aria-hidden="true">#</a> \u5B89\u88C5Mysql</h3><ol><li><p>\u4E0B\u8F7D\u955C\u50CF</p><div class="language-bash ext-sh line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D4D4D4;">docker pull mysql:5.7.32</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>\u6267\u884C\u6784\u5EFA\u547D\u4EE4</p><div class="language-bash ext-sh line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D4D4D4;">docker run -d --privileged=true --name mysql \\</span></span>
<span class="line"><span style="color:#D4D4D4;">    -p 3306:3306 \\</span></span>
<span class="line"><span style="color:#D4D4D4;">    --restart always \\</span></span>
<span class="line"><span style="color:#D4D4D4;">    --volume /home/mysql/conf:/etc/mysql/conf.d \\</span></span>
<span class="line"><span style="color:#D4D4D4;">    --volume /home/mysql/mysqldata:/var/lib/mysql \\</span></span>
<span class="line"><span style="color:#D4D4D4;">    --volume /etc/localtime:/etc/localtime \\</span></span>
<span class="line"><span style="color:#D4D4D4;">    --env MYSQL_ROOT_PASSWORD=zsdd_db@2020 \\</span></span>
<span class="line"><span style="color:#D4D4D4;">    mysql:5.7.32 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u8BBE\u7F6E<code>my.cnf</code></p><p>8.0\u7684\u914D\u7F6E</p><blockquote><p>\u5FC5\u987B\u521D\u59CB\u5316\u7684\u65F6\u5019\u6307\u5B9Alower_case_table_names</p></blockquote><div class="language-tex ext-tex line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D4D4D4;">docker run </span><span style="color:#D7BA7D;">\\</span></span>
<span class="line"><span style="color:#D4D4D4;">    -p 3306:3306 </span><span style="color:#D7BA7D;">\\</span></span>
<span class="line"><span style="color:#D4D4D4;">    -e MYSQL_ROOT_PASSWORD=root </span><span style="color:#D7BA7D;">\\</span></span>
<span class="line"><span style="color:#D4D4D4;">    -v /data/mysql/data:/var/lib/mysql:rw </span><span style="color:#D7BA7D;">\\</span></span>
<span class="line"><span style="color:#D4D4D4;">    -v /data/mysql/log:/var/log/mysql:rw </span><span style="color:#D7BA7D;">\\</span></span>
<span class="line"><span style="color:#D4D4D4;">    -v /data/mysql/conf/my.cnf:/etc/mysql/my.cnf:rw </span><span style="color:#D7BA7D;">\\</span></span>
<span class="line"><span style="color:#D4D4D4;">    -v /etc/localtime:/etc/localtime:ro </span><span style="color:#D7BA7D;">\\</span></span>
<span class="line"><span style="color:#D4D4D4;">    --name iptv </span><span style="color:#D7BA7D;">\\</span></span>
<span class="line"><span style="color:#D4D4D4;">    --restart=always </span><span style="color:#D7BA7D;">\\</span></span>
<span class="line"><span style="color:#D4D4D4;">    -d mysql --lower_case_table_names=1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;"># \u5982\u679C\u5BC6\u7801\u8BBE\u7F6E\u4E0D\u4E0A</span></span>
<span class="line"><span style="color:#D4D4D4;">ALTER USER &#39;root&#39;@&#39;</span><span style="color:#6A9955;">%&#39; IDENTIFIED WITH mysql_native_password BY &#39;root&#39;;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;"># \u914D\u7F6E\u6587\u4EF6</span></span>
<span class="line"><span style="color:#D4D4D4;"># Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.</span></span>
<span class="line"><span style="color:#D4D4D4;">#</span></span>
<span class="line"><span style="color:#D4D4D4;"># This program is free software; you can redistribute it and/or modify</span></span>
<span class="line"><span style="color:#D4D4D4;"># it under the terms of the GNU General Public License as published by</span></span>
<span class="line"><span style="color:#D4D4D4;"># the Free Software Foundation; version 2 of the License.</span></span>
<span class="line"><span style="color:#D4D4D4;">#</span></span>
<span class="line"><span style="color:#D4D4D4;"># This program is distributed in the hope that it will be useful,</span></span>
<span class="line"><span style="color:#D4D4D4;"># but WITHOUT ANY WARRANTY; without even the implied warranty of</span></span>
<span class="line"><span style="color:#D4D4D4;"># MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the</span></span>
<span class="line"><span style="color:#D4D4D4;"># GNU General Public License for more details.</span></span>
<span class="line"><span style="color:#D4D4D4;">#</span></span>
<span class="line"><span style="color:#D4D4D4;"># You should have received a copy of the GNU General Public License</span></span>
<span class="line"><span style="color:#D4D4D4;"># along with this program; if not, write to the Free Software</span></span>
<span class="line"><span style="color:#D4D4D4;"># Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301 USA</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">#</span></span>
<span class="line"><span style="color:#D4D4D4;"># The MySQL  Server configuration file.</span></span>
<span class="line"><span style="color:#D4D4D4;">#</span></span>
<span class="line"><span style="color:#D4D4D4;"># For explanations see</span></span>
<span class="line"><span style="color:#D4D4D4;"># http://dev.mysql.com/doc/mysql/en/server-system-variables.html</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">[mysqld]</span></span>
<span class="line"><span style="color:#D4D4D4;">pid-file        = /var/run/mysqld/mysqld.pid</span></span>
<span class="line"><span style="color:#D4D4D4;">socket          = /var/run/mysqld/mysqld.sock</span></span>
<span class="line"><span style="color:#D4D4D4;">datadir         = /var/lib/mysql</span></span>
<span class="line"><span style="color:#D4D4D4;">secure-file-priv= NULL</span></span>
<span class="line"><span style="color:#D4D4D4;"># Disabling symbolic-links is recommended to prevent assorted security risks</span></span>
<span class="line"><span style="color:#D4D4D4;">symbolic-links=0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;"># Custom config should go here</span></span>
<span class="line"><span style="color:#D4D4D4;">!includedir /etc/mysql/conf.d/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">default_authentication_plugin= mysql_native_password</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">[mysql]  </span></span>
<span class="line"><span style="color:#D4D4D4;">default-character-set=utf8  </span></span>
<span class="line"><span style="color:#D4D4D4;">#lower_case_table_names=1</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>5.7\u7684\u914D\u7F6E</strong></p><div class="language-ini ext-ini line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D4D4D4;">[client]</span></span>
<span class="line"><span style="color:#569CD6;">port</span><span style="color:#D4D4D4;"> = 3306</span></span>
<span class="line"><span style="color:#569CD6;">socket</span><span style="color:#D4D4D4;"> = /var/run/mysqld/mysqld.sock</span></span>
<span class="line"><span style="color:#569CD6;">default-character-set</span><span style="color:#D4D4D4;"> = utf8mb4</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">[mysql]</span></span>
<span class="line"><span style="color:#569CD6;">prompt</span><span style="color:#D4D4D4;">=</span><span style="color:#CE9178;">&quot;MySQL [\\d]&gt; &quot;</span></span>
<span class="line"><span style="color:#D4D4D4;">no-auto-rehash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">[mysqld]</span></span>
<span class="line"><span style="color:#569CD6;">port</span><span style="color:#D4D4D4;"> = 3306</span></span>
<span class="line"><span style="color:#569CD6;">socket</span><span style="color:#D4D4D4;"> = /var/run/mysqld/mysqld.sock</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">datadir</span><span style="color:#D4D4D4;"> = /var/lib/mysql</span></span>
<span class="line"><span style="color:#569CD6;">pid-file</span><span style="color:#D4D4D4;"> = /var/run/mysqld/mysqld.pid</span></span>
<span class="line"><span style="color:#569CD6;">user</span><span style="color:#D4D4D4;"> = mysql</span></span>
<span class="line"><span style="color:#569CD6;">bind-address</span><span style="color:#D4D4D4;"> = 0.0.0.0</span></span>
<span class="line"><span style="color:#569CD6;">server-id</span><span style="color:#D4D4D4;"> = 1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">sql_mode</span><span style="color:#D4D4D4;">=</span><span style="color:#CE9178;">&#39;NO_ENGINE_SUBSTITUTION&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">init-connect</span><span style="color:#D4D4D4;"> = </span><span style="color:#CE9178;">&#39;SET NAMES utf8mb4&#39;</span></span>
<span class="line"><span style="color:#569CD6;">character-set-server</span><span style="color:#D4D4D4;"> = utf8mb4</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">skip-name-resolve</span></span>
<span class="line"><span style="color:#6A9955;">#skip-networking</span></span>
<span class="line"><span style="color:#569CD6;">back_log</span><span style="color:#D4D4D4;"> = 300</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">max_connections</span><span style="color:#D4D4D4;"> = 495</span></span>
<span class="line"><span style="color:#569CD6;">max_connect_errors</span><span style="color:#D4D4D4;"> = 6000</span></span>
<span class="line"><span style="color:#569CD6;">open_files_limit</span><span style="color:#D4D4D4;"> = 65535</span></span>
<span class="line"><span style="color:#569CD6;">table_open_cache</span><span style="color:#D4D4D4;"> = 128</span></span>
<span class="line"><span style="color:#569CD6;">max_allowed_packet</span><span style="color:#D4D4D4;"> = 500M</span></span>
<span class="line"><span style="color:#569CD6;">binlog_cache_size</span><span style="color:#D4D4D4;"> = 1M</span></span>
<span class="line"><span style="color:#569CD6;">max_heap_table_size</span><span style="color:#D4D4D4;"> = 8M</span></span>
<span class="line"><span style="color:#569CD6;">tmp_table_size</span><span style="color:#D4D4D4;"> = 16M</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">read_buffer_size</span><span style="color:#D4D4D4;"> = 2M</span></span>
<span class="line"><span style="color:#569CD6;">read_rnd_buffer_size</span><span style="color:#D4D4D4;"> = 8M</span></span>
<span class="line"><span style="color:#569CD6;">sort_buffer_size</span><span style="color:#D4D4D4;"> = 8M</span></span>
<span class="line"><span style="color:#569CD6;">join_buffer_size</span><span style="color:#D4D4D4;"> = 8M</span></span>
<span class="line"><span style="color:#569CD6;">key_buffer_size</span><span style="color:#D4D4D4;"> = 8M</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">thread_cache_size</span><span style="color:#D4D4D4;"> = 8</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">query_cache_type</span><span style="color:#D4D4D4;"> = 1</span></span>
<span class="line"><span style="color:#569CD6;">query_cache_size</span><span style="color:#D4D4D4;"> = 8M</span></span>
<span class="line"><span style="color:#569CD6;">query_cache_limit</span><span style="color:#D4D4D4;"> = 2M</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">ft_min_word_len</span><span style="color:#D4D4D4;"> = 4</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">log_bin</span><span style="color:#D4D4D4;"> = mysql-bin</span></span>
<span class="line"><span style="color:#569CD6;">binlog_format</span><span style="color:#D4D4D4;"> = mixed</span></span>
<span class="line"><span style="color:#569CD6;">expire_logs_days</span><span style="color:#D4D4D4;"> = 7</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">log_error</span><span style="color:#D4D4D4;"> = /var/log/mysql/error.log</span></span>
<span class="line"><span style="color:#569CD6;">slow_query_log</span><span style="color:#D4D4D4;"> = 1</span></span>
<span class="line"><span style="color:#569CD6;">long_query_time</span><span style="color:#D4D4D4;"> = 1</span></span>
<span class="line"><span style="color:#569CD6;">slow_query_log_file</span><span style="color:#D4D4D4;"> = /var/lib/mysql/mysql_slow.log</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">performance_schema</span><span style="color:#D4D4D4;"> = 0</span></span>
<span class="line"><span style="color:#D4D4D4;">explicit_defaults_for_timestamp</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">lower_case_table_names</span><span style="color:#D4D4D4;"> = 1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">skip-external-locking</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">default_storage_engine</span><span style="color:#D4D4D4;"> = InnoDB</span></span>
<span class="line"><span style="color:#6A9955;">#default-storage-engine = MyISAM</span></span>
<span class="line"><span style="color:#569CD6;">innodb_file_per_table</span><span style="color:#D4D4D4;"> = 1</span></span>
<span class="line"><span style="color:#569CD6;">innodb_open_files</span><span style="color:#D4D4D4;"> = 500</span></span>
<span class="line"><span style="color:#569CD6;">innodb_buffer_pool_size</span><span style="color:#D4D4D4;"> = 64M</span></span>
<span class="line"><span style="color:#569CD6;">innodb_write_io_threads</span><span style="color:#D4D4D4;"> = 4</span></span>
<span class="line"><span style="color:#569CD6;">innodb_read_io_threads</span><span style="color:#D4D4D4;"> = 4</span></span>
<span class="line"><span style="color:#569CD6;">innodb_thread_concurrency</span><span style="color:#D4D4D4;"> = 0</span></span>
<span class="line"><span style="color:#569CD6;">innodb_purge_threads</span><span style="color:#D4D4D4;"> = 1</span></span>
<span class="line"><span style="color:#569CD6;">innodb_flush_log_at_trx_commit</span><span style="color:#D4D4D4;"> = 2</span></span>
<span class="line"><span style="color:#569CD6;">innodb_log_buffer_size</span><span style="color:#D4D4D4;"> = 2M</span></span>
<span class="line"><span style="color:#569CD6;">innodb_log_file_size</span><span style="color:#D4D4D4;"> = 32M</span></span>
<span class="line"><span style="color:#569CD6;">innodb_log_files_in_group</span><span style="color:#D4D4D4;"> = 3</span></span>
<span class="line"><span style="color:#569CD6;">innodb_max_dirty_pages_pct</span><span style="color:#D4D4D4;"> = 90</span></span>
<span class="line"><span style="color:#569CD6;">innodb_lock_wait_timeout</span><span style="color:#D4D4D4;"> = 120</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">bulk_insert_buffer_size</span><span style="color:#D4D4D4;"> = 8M</span></span>
<span class="line"><span style="color:#569CD6;">myisam_sort_buffer_size</span><span style="color:#D4D4D4;"> = 8M</span></span>
<span class="line"><span style="color:#569CD6;">myisam_max_sort_file_size</span><span style="color:#D4D4D4;"> = 10G</span></span>
<span class="line"><span style="color:#569CD6;">myisam_repair_threads</span><span style="color:#D4D4D4;"> = 1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">interactive_timeout</span><span style="color:#D4D4D4;"> = 28800</span></span>
<span class="line"><span style="color:#569CD6;">wait_timeout</span><span style="color:#D4D4D4;"> = 28800</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">[mysqldump]</span></span>
<span class="line"><span style="color:#D4D4D4;">quick</span></span>
<span class="line"><span style="color:#569CD6;">max_allowed_packet</span><span style="color:#D4D4D4;"> = 500M</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">[myisamchk]</span></span>
<span class="line"><span style="color:#569CD6;">key_buffer_size</span><span style="color:#D4D4D4;"> = 8M</span></span>
<span class="line"><span style="color:#569CD6;">sort_buffer_size</span><span style="color:#D4D4D4;"> = 8M</span></span>
<span class="line"><span style="color:#569CD6;">read_buffer</span><span style="color:#D4D4D4;"> = 4M</span></span>
<span class="line"><span style="color:#569CD6;">write_buffer</span><span style="color:#D4D4D4;"> = 4M</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>5.6\u7684\u914D\u7F6E\u6587\u4EF6</strong></p><div class="language-ini ext-ini line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#6A9955;"># For advice on how to change settings please see</span></span>
<span class="line"><span style="color:#6A9955;"># http://dev.mysql.com/doc/refman/5.6/en/server-configuration-defaults.html</span></span>
<span class="line"><span style="color:#6A9955;"># *** DO NOT EDIT THIS FILE. It&#39;s a template which will be copied to the</span></span>
<span class="line"><span style="color:#6A9955;"># *** default location during install, and will be replaced if you</span></span>
<span class="line"><span style="color:#6A9955;"># *** upgrade to a newer version of MySQL.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">[mysqld]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;"># Remove leading # and set to the amount of RAM for the most important data</span></span>
<span class="line"><span style="color:#6A9955;"># cache in MySQL. Start at 70% of total RAM for dedicated server, else 10%.</span></span>
<span class="line"><span style="color:#6A9955;"># innodb_buffer_pool_size = 128M</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;"># Remove leading # to turn on a very important data integrity option: logging</span></span>
<span class="line"><span style="color:#6A9955;"># changes to the binary log between backups.</span></span>
<span class="line"><span style="color:#6A9955;"># log_bin</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;"># These are commonly set, remove the # and set as required.</span></span>
<span class="line"><span style="color:#6A9955;"># basedir = .....</span></span>
<span class="line"><span style="color:#6A9955;"># datadir = .....</span></span>
<span class="line"><span style="color:#6A9955;"># port = .....</span></span>
<span class="line"><span style="color:#6A9955;"># server_id = .....</span></span>
<span class="line"><span style="color:#6A9955;"># socket = .....</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">[mysqld]</span></span>
<span class="line"><span style="color:#569CD6;">port</span><span style="color:#D4D4D4;">=3306  </span><span style="color:#6A9955;"># \u6307\u5B9AMsSQL\u4FA6\u542C\u7684\u7AEF\u53E3</span></span>
<span class="line"><span style="color:#569CD6;">socket</span><span style="color:#D4D4D4;">=/var/lib/mysql/mysql3306.sock  </span><span style="color:#6A9955;"># \u4E3AMySQL\u5BA2\u6237\u7A0B\u5E8F\u4E0E\u670D\u52A1\u5668\u4E4B\u95F4\u7684\u672C\u5730\u901A\u4FE1\u6307\u5B9A\u4E00\u4E2A\u5957\u63A5\u5B57\u6587\u4EF6(Linux\u4E0B\u9ED8\u8BA4\u662F/var/lib/mysql/mysql.sock\u6587\u4EF6)</span></span>
<span class="line"><span style="color:#569CD6;">server_id</span><span style="color:#D4D4D4;">=1</span></span>
<span class="line"><span style="color:#569CD6;">pid_file</span><span style="color:#D4D4D4;">=/var/lib/mysql/mysql3306.pid</span></span>
<span class="line"><span style="color:#569CD6;">local_infile</span><span style="color:#D4D4D4;">=1                                                     </span><span style="color:#6A9955;">#\u5F00\u542FLoad </span></span>
<span class="line"><span style="color:#569CD6;">tmpdir</span><span style="color:#D4D4D4;">=/tmp</span></span>
<span class="line"><span style="color:#569CD6;">datadir</span><span style="color:#D4D4D4;">=/var/lib/mysql</span></span>
<span class="line"><span style="color:#569CD6;">back_log</span><span style="color:#D4D4D4;">=250                                                       </span><span style="color:#6A9955;">#max_connec\u5916\u7684\u8FDE\u63A5\u6570</span></span>
<span class="line"><span style="color:#6A9955;">#skip-grant-tables</span></span>
<span class="line"><span style="color:#569CD6;">max_connections</span><span style="color:#D4D4D4;">=1024</span></span>
<span class="line"><span style="color:#6A9955;">#wait_timeout=86400</span></span>
<span class="line"><span style="color:#569CD6;">wait_timeout</span><span style="color:#D4D4D4;">=300                                                   </span><span style="color:#6A9955;">#\u975E\u4EA4\u4E92\u94FE\u63A5\u8D85\u65F6\u65F6\u95F4</span></span>
<span class="line"><span style="color:#6A9955;">#interactive_timeout= 1800</span></span>
<span class="line"><span style="color:#569CD6;">interactive_timeout</span><span style="color:#D4D4D4;">= 300                                           </span><span style="color:#6A9955;">#\u4EA4\u4E92\u94FE\u63A5\u8D85\u65F6\u65F6\u95F4</span></span>
<span class="line"><span style="color:#569CD6;">max_connect_errors</span><span style="color:#D4D4D4;">=10000</span></span>
<span class="line"><span style="color:#569CD6;">group_concat_max_len</span><span style="color:#D4D4D4;">=2048                                          </span><span style="color:#6A9955;">#\u5B57\u7B26\u4E32\u94FE\u63A5\u64CD\u4F5C\u957F\u5EA6\u9650\u5236</span></span>
<span class="line"><span style="color:#569CD6;">open_files_limit</span><span style="color:#D4D4D4;">=8192</span></span>
<span class="line"><span style="color:#D4D4D4;">skip_external_locking</span></span>
<span class="line"><span style="color:#D4D4D4;">skip_name_resolve</span></span>
<span class="line"><span style="color:#6A9955;">#skip_networking   </span></span>
<span class="line"><span style="color:#569CD6;">max_allowed_packet</span><span style="color:#D4D4D4;">=32M                                             </span><span style="color:#6A9955;">#server\u63A5\u53D7\u6570\u636E\u5305\u5927\u5C0F\u8C03\u6574</span></span>
<span class="line"><span style="color:#6A9955;">#thread_cache_size=64</span></span>
<span class="line"><span style="color:#569CD6;">thread_cache_size</span><span style="color:#D4D4D4;">=20</span></span>
<span class="line"><span style="color:#569CD6;">thread_stack</span><span style="color:#D4D4D4;">=192K</span></span>
<span class="line"><span style="color:#569CD6;">transaction-isolation</span><span style="color:#D4D4D4;"> = REPEATABLE-READ</span></span>
<span class="line"><span style="color:#6A9955;">#tmp_table_size=128M</span></span>
<span class="line"><span style="color:#569CD6;">tmp_table_size</span><span style="color:#D4D4D4;">=256M                                                  </span><span style="color:#6A9955;">#\u4E34\u65F6\u8868\u7A7A\u95F4\u5927\u5C0F</span></span>
<span class="line"><span style="color:#6A9955;">#max_tmp_tables=100</span></span>
<span class="line"><span style="color:#6A9955;">#max_prepared_stmt_count=1048576</span></span>
<span class="line"><span style="color:#569CD6;">lower_case_table_names</span><span style="color:#D4D4D4;">=1</span></span>
<span class="line"><span style="color:#569CD6;">log_bin_trust_function_creators</span><span style="color:#D4D4D4;">=1</span></span>
<span class="line"><span style="color:#6A9955;">########log  </span></span>
<span class="line"><span style="color:#569CD6;">log_error</span><span style="color:#D4D4D4;">=/var/lib/mysql/mysql3306.err</span></span>
<span class="line"><span style="color:#569CD6;">slow_query_log</span><span style="color:#D4D4D4;">=1                                                    </span><span style="color:#6A9955;">#\u5F00\u542F\u6162\u67E5\u8BE2</span></span>
<span class="line"><span style="color:#569CD6;">long_query_time</span><span style="color:#D4D4D4;">=1                                                   </span><span style="color:#6A9955;">#\u5355\u4F4D\u662F\u79D2</span></span>
<span class="line"><span style="color:#569CD6;">slow_query_log_file</span><span style="color:#D4D4D4;">=/var/lib/mysql/mysql_slow.log</span></span>
<span class="line"><span style="color:#569CD6;">log_bin</span><span style="color:#D4D4D4;">=mysqlmaster-bin.log</span></span>
<span class="line"><span style="color:#569CD6;">binlog_cache_size</span><span style="color:#D4D4D4;">=8M</span></span>
<span class="line"><span style="color:#569CD6;">binlog_format</span><span style="color:#D4D4D4;">=MIXED</span></span>
<span class="line"><span style="color:#569CD6;">max_binlog_cache_size</span><span style="color:#D4D4D4;">=1024M</span></span>
<span class="line"><span style="color:#569CD6;">max_binlog_size</span><span style="color:#D4D4D4;">=1024M</span></span>
<span class="line"><span style="color:#569CD6;">sync_binlog</span><span style="color:#D4D4D4;">=1</span></span>
<span class="line"><span style="color:#569CD6;">expire_logs_days</span><span style="color:#D4D4D4;">=15</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">##########\u5185\u5B58\uFF0C\u4F18\u5316\uFF0C\u67E5\u8BE2</span></span>
<span class="line"><span style="color:#6A9955;">#key_buffer_size=235M</span></span>
<span class="line"><span style="color:#569CD6;">key_buffer_size</span><span style="color:#D4D4D4;">=512M                                                </span><span style="color:#6A9955;">##\u7D22\u5F15\u7F13\u51B2\u533A\u5927\u5C0F</span></span>
<span class="line"><span style="color:#6A9955;">#read_buffer_size=2M</span></span>
<span class="line"><span style="color:#569CD6;">read_buffer_size</span><span style="color:#D4D4D4;">=8M                                                 </span><span style="color:#6A9955;">##\u8BFBbuffer</span></span>
<span class="line"><span style="color:#569CD6;">read_rnd_buffer_size</span><span style="color:#D4D4D4;">=16M</span></span>
<span class="line"><span style="color:#6A9955;">#join_buffer_size=2M</span></span>
<span class="line"><span style="color:#569CD6;">join_buffer_size</span><span style="color:#D4D4D4;">=16M                                                </span><span style="color:#6A9955;">##join buffer\u5927\u5C0F</span></span>
<span class="line"><span style="color:#569CD6;">sort_buffer_size</span><span style="color:#D4D4D4;">=16M                                                </span><span style="color:#6A9955;">##\u6392\u5E8F\u5185\u5B58\u5927\u5C0F\uFF0C\u57FA\u4E8E\u94FE\u63A5\uFF0C\u503C\u8FC7\u5927\u4F1A\u6D88\u8017\u5927\u91CF\u5185\u5B58\uFF0C\u6027\u80FD\u4E0B\u964D</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">max_heap_table_size</span><span style="color:#D4D4D4;">=123M</span></span>
<span class="line"><span style="color:#6A9955;">#query_cache_min_res_unit=2K</span></span>
<span class="line"><span style="color:#6A9955;">#query_cache_limit=2M</span></span>
<span class="line"><span style="color:#6A9955;">#query_cache_size=410M</span></span>
<span class="line"><span style="color:#6A9955;">#query_cache_type=1                                                 #\u67E5\u8BE2\u7F13\u5B580\u662F\u5173\uFF0C1\u662F\u5F00\uFF0C\u4F1A\u6D88\u8017\u6027\u80FD</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">##############MYISAM</span></span>
<span class="line"><span style="color:#569CD6;">bulk_insert_buffer_size</span><span style="color:#D4D4D4;">=64M</span></span>
<span class="line"><span style="color:#569CD6;">myisam_sort_buffer_size</span><span style="color:#D4D4D4;">=128M</span></span>
<span class="line"><span style="color:#569CD6;">myisam_max_sort_file_size</span><span style="color:#D4D4D4;">=10G</span></span>
<span class="line"><span style="color:#569CD6;">myisam_repair_threads</span><span style="color:#D4D4D4;">=1</span></span>
<span class="line"><span style="color:#D4D4D4;">myisam_recover</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">##########language</span></span>
<span class="line"><span style="color:#569CD6;">init_connect</span><span style="color:#D4D4D4;">=</span><span style="color:#CE9178;">&#39;SET NAMES utf8mb4&#39;</span></span>
<span class="line"><span style="color:#569CD6;">character-set-server</span><span style="color:#D4D4D4;"> = utf8mb4</span></span>
<span class="line"><span style="color:#6A9955;">#########innodb</span></span>
<span class="line"><span style="color:#569CD6;">innodb_file_per_table</span><span style="color:#D4D4D4;">=1</span></span>
<span class="line"><span style="color:#6A9955;">#innodb_open_file=1678</span></span>
<span class="line"><span style="color:#569CD6;">innodb_open_files</span><span style="color:#D4D4D4;">=65535                                              </span><span style="color:#6A9955;">#innodb\u6253\u5F00\u6587\u4EF6\u6570</span></span>
<span class="line"><span style="color:#569CD6;">innodb_purge_threads</span><span style="color:#D4D4D4;">=0</span></span>
<span class="line"><span style="color:#569CD6;">innodb_purge_batch_size</span><span style="color:#D4D4D4;">=20</span></span>
<span class="line"><span style="color:#569CD6;">innodb_io_capacity</span><span style="color:#D4D4D4;">=200</span></span>
<span class="line"><span style="color:#569CD6;">innodb_adaptive_flushing</span><span style="color:#D4D4D4;">=on</span></span>
<span class="line"><span style="color:#569CD6;">innodb_change_buffering</span><span style="color:#D4D4D4;">=all</span></span>
<span class="line"><span style="color:#569CD6;">innodb_stats_on_metadata</span><span style="color:#D4D4D4;">=off</span></span>
<span class="line"><span style="color:#569CD6;">innodb_spin_wait_delay</span><span style="color:#D4D4D4;">=6</span></span>
<span class="line"><span style="color:#569CD6;">innodb_buffer_pool_instances</span><span style="color:#D4D4D4;">=12</span></span>
<span class="line"><span style="color:#6A9955;">#innodb_open_files=1024            #\u91CD\u590D\uFF0C\u6CE8\u91CA</span></span>
<span class="line"><span style="color:#569CD6;">innodb_additional_mem_pool_size</span><span style="color:#D4D4D4;">=16M</span></span>
<span class="line"><span style="color:#569CD6;">innodb_buffer_pool_size</span><span style="color:#D4D4D4;">=24000M                                      </span><span style="color:#6A9955;">#innodb buffer</span></span>
<span class="line"><span style="color:#569CD6;">innodb_sort_buffer_size</span><span style="color:#D4D4D4;">=4M</span></span>
<span class="line"><span style="color:#569CD6;">innodb_data_file_path</span><span style="color:#D4D4D4;">=ibdata1:12M:autoextend</span></span>
<span class="line"><span style="color:#569CD6;">innodb_autoextend_increment</span><span style="color:#D4D4D4;">=8M</span></span>
<span class="line"><span style="color:#569CD6;">innodb_read_io_threads</span><span style="color:#D4D4D4;">=16</span></span>
<span class="line"><span style="color:#569CD6;">innodb_write_io_threads</span><span style="color:#D4D4D4;">=16</span></span>
<span class="line"><span style="color:#569CD6;">innodb_thread_concurrency</span><span style="color:#D4D4D4;">=0</span></span>
<span class="line"><span style="color:#569CD6;">innodb_replication_delay</span><span style="color:#D4D4D4;">=0</span></span>
<span class="line"><span style="color:#569CD6;">innodb_flush_log_at_trx_commit</span><span style="color:#D4D4D4;">=2</span></span>
<span class="line"><span style="color:#6A9955;">#innodb_log_buffer_size=256M</span></span>
<span class="line"><span style="color:#569CD6;">innodb_log_buffer_size</span><span style="color:#D4D4D4;">=32M                                           </span><span style="color:#6A9955;">#inondb\u65E5\u5FD7\u7F13\u51B2\u5927\u5C0F</span></span>
<span class="line"><span style="color:#569CD6;">innodb_log_file_size</span><span style="color:#D4D4D4;">=256M</span></span>
<span class="line"><span style="color:#6A9955;">#innodb_log_file_size=1024M                                          #innodb\u65E5\u5FD7\u5927\u5C0F   \u4FEE\u6539\u6B64\u503C\u6570\u636E\u5E93\u65E0\u6CD5\u542F\u52A8</span></span>
<span class="line"><span style="color:#569CD6;">innodb_log_files_in_group</span><span style="color:#D4D4D4;">=2</span></span>
<span class="line"><span style="color:#569CD6;">innodb_max_dirty_pages_pct</span><span style="color:#D4D4D4;">=85</span></span>
<span class="line"><span style="color:#6A9955;">#innodb_log_group_home_dir=</span></span>
<span class="line"><span style="color:#569CD6;">innodb_lock_wait_timeout</span><span style="color:#D4D4D4;">=300                                         </span><span style="color:#6A9955;">#innodb\u4E8B\u7269\u9501\u65F6\u95F4</span></span>
<span class="line"><span style="color:#569CD6;">table_open_cache</span><span style="color:#D4D4D4;">=16384</span></span>
<span class="line"><span style="color:#6A9955;">#table_definiton_cache=16384</span></span>
<span class="line"><span style="color:#D4D4D4;">[mysqldump]</span></span>
<span class="line"><span style="color:#D4D4D4;">quick</span></span>
<span class="line"><span style="color:#569CD6;">max_allowed_packet</span><span style="color:#D4D4D4;"> = 32M</span></span>
<span class="line"><span style="color:#D4D4D4;">[mysql]</span></span>
<span class="line"><span style="color:#D4D4D4;">no_auto_rehash</span></span>
<span class="line"><span style="color:#6A9955;"># Remove leading # to set options mainly useful for reporting servers.</span></span>
<span class="line"><span style="color:#6A9955;"># The server defaults are faster for transactions and fast SELECTs.</span></span>
<span class="line"><span style="color:#6A9955;"># Adjust sizes as needed, experiment to find the optimal values.</span></span>
<span class="line"><span style="color:#6A9955;"># join_buffer_size = 128M</span></span>
<span class="line"><span style="color:#6A9955;"># sort_buffer_size = 2M</span></span>
<span class="line"><span style="color:#6A9955;"># read_rnd_buffer_size = 2M </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">#sql_mode=STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION,NO_AUTO_VALUE_ON_ZERO</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h3 id="\u5B89\u88C5redis" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5redis" aria-hidden="true">#</a> \u5B89\u88C5Redis</h3><ol><li><p>\u4E0B\u8F7D\u955C\u50CF</p><div class="language-bash ext-sh line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D4D4D4;">docker pull redis</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>\u83B7\u53D6\u914D\u7F6E\u6587\u4EF6</p><div class="language-bash ext-sh line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D4D4D4;">mkdir /home/redis</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D4D4D4;">wget -P /home/redis http://download.redis.io/redis-stable/redis.conf</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>\u8BBE\u7F6E\u914D\u7F6E\u6587\u4EF6\u5C5E\u6027</p><ul><li>\u4FEE\u6539<code>/daemonize</code>\uFF08\u914D\u7F6E\u540E\u53F0\u8FD0\u884C\uFF0Cdocker \u542F\u52A8\u4E0D\u80FD\u8BBE\u7F6E\u4E3Ayes\uFF0C\u5426\u5219\u65E0\u6CD5\u542F\u52A8\uFF09</li><li>\u4FEE\u6539<code>/logfile</code>\uFF08\u914D\u7F6E\u65E5\u5FD7\u8DEF\u5F84\uFF09</li><li>\u4FEE\u6539<code>/bind</code>\uFF08\u662F\u5426\u9650\u5236\u53EA\u5F53\u524D\u4E3B\u673A\u8BBF\u95EE\uFF09</li><li>\u4FEE\u6539<code>/requirepass</code>\uFF08\u8BBE\u7F6E\u5BC6\u7801\uFF09</li><li>\u4FEE\u6539<code>/protected-mode</code>\uFF08\u4FDD\u62A4\u6A21\u5F0F\uFF0C\u5173\u95ED\u5916\u7F51\u53EF\u76F4\u63A5\u8BBF\u95EE\uFF09</li></ul></li><li><p>\u6267\u884C\u6784\u5EFA\u547D\u4EE4</p><div class="language-bash ext-sh line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D4D4D4;">docker run -d --privileged=true --name redis \\</span></span>
<span class="line"><span style="color:#D4D4D4;">	--restart always \\</span></span>
<span class="line"><span style="color:#D4D4D4;">	 -p 6379:6379 \\</span></span>
<span class="line"><span style="color:#D4D4D4;">	 -v /home/redis/data:/data \\</span></span>
<span class="line"><span style="color:#D4D4D4;">	 -v /home/redis/redis.conf:/etc/redis/redis.conf redis \\</span></span>
<span class="line"><span style="color:#D4D4D4;">     redis-server /etc/redis/redis.conf --appendonly yes </span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D4D4D4;">docker run --privileged=true -p 6379:6379 --name redis -v /data/redis/redis.conf:/etc/redis/redis.conf -v /data/redis/data:/data -v /data/redis/log:/log  -d redis redis-server /etc/redis/redis.conf --appendonly yes</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>centos7\u5B89\u88C5docker\u540E\u5E76\u88C5\u8F7Dredis,\u53D1\u73B0\u65E0\u6CD5\u6B63\u5E38\u8FD0\u884C</p><div class="language-bash ext-sh line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D4D4D4;">1\u3001/usr/sbin/sestatus -v      </span><span style="color:#6A9955;">##\u5982\u679CSELinux status\u53C2\u6570\u4E3Aenabled\u5373\u4E3A\u5F00\u542F\u72B6\u6001</span></span>
<span class="line"><span style="color:#D4D4D4;">SELinux status:                 enabled</span></span>
<span class="line"><span style="color:#D4D4D4;">2\u3001getenforce                 </span><span style="color:#6A9955;">##\u4E5F\u53EF\u4EE5\u7528\u8FD9\u4E2A\u547D\u4EE4\u68C0\u67E5</span></span>
<span class="line"><span style="color:#D4D4D4;">\u5173\u95EDSELinux\uFF1A</span></span>
<span class="line"><span style="color:#D4D4D4;">1\u3001\u4E34\u65F6\u5173\u95ED\uFF08\u4E0D\u7528\u91CD\u542F\u673A\u5668\uFF09\uFF1A</span></span>
<span class="line"><span style="color:#D4D4D4;">setenforce 0                  </span><span style="color:#6A9955;">##\u8BBE\u7F6ESELinux \u6210\u4E3Apermissive\u6A21\u5F0F</span></span>
<span class="line"><span style="color:#D4D4D4;">                              </span><span style="color:#6A9955;">##setenforce 1 \u8BBE\u7F6ESELinux \u6210\u4E3Aenforcing\u6A21\u5F0F</span></span>
<span class="line"><span style="color:#D4D4D4;">2\u3001\u4FEE\u6539\u914D\u7F6E\u6587\u4EF6\u9700\u8981\u91CD\u542F\u673A\u5668\uFF1A</span></span>
<span class="line"><span style="color:#D4D4D4;">\u4FEE\u6539/etc/selinux/config \u6587\u4EF6</span></span>
<span class="line"><span style="color:#D4D4D4;">\u5C06SELINUX=enforcing\u6539\u4E3ASELINUX=disabled</span></span>
<span class="line"><span style="color:#D4D4D4;">\u91CD\u542F\u673A\u5668\u5373\u53EF</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h3 id="\u5B89\u88C5tomcat" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5tomcat" aria-hidden="true">#</a> \u5B89\u88C5tomcat</h3><ol><li><p>\u4E0B\u8F7D\u955C\u50CF</p><div class="language-bash ext-sh line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D4D4D4;">docker pull tomcat:8.5.59-jdk8-corretto</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>\u6267\u884C\u6784\u5EFA\u547D\u4EE4</p><p>\u521B\u5EFA\u5BB9\u5668\u7684\u5BBF\u4E3B\u673A\u6587\u4EF6\u5939</p><div class="language-bash ext-sh line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D4D4D4;">mkdir -p /home/tomcat</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u590D\u5236\u5BB9\u5668\u5185\u7684\u914D\u7F6E\u5230\u5BBF\u4E3B\u673A</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D4D4D4;">docker cp a02f94e6dba6:/usr/local/tomcat/conf /home/tomcat/</span></span>
<span class="line"><span style="color:#D4D4D4;">docker cp a02f94e6dba6:/usr/local/tomcat/webapps /home/tomcat/</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u57FA\u7840\u53C2\u6570</p><div class="language-bash ext-sh line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D4D4D4;">JAVA_OPTS=</span><span style="color:#CE9178;">&quot;-server -Dfile.encoding=UTF-8 -Xms4g -Xmx4g -Xmn1g -Xss512K -verbose:gc -XX:+UseConcMarkSweepGC -XX:MaxTenuringThreshold=10 -XX:PermSize=1g -XX:MaxPermSize=1g -XX:+ExplicitGCInvokesConcurrent -XX:GCTimeRatio=19 -XX:+UseParNewGC -XX:+UseCMSCompactAtFullCollection -XX:CMSFullGCsBeforeCompaction=10 -XX:+CMSClassUnloadingEnabled -XX:+CMSParallelRemarkEnabled -XX:CMSInitiatingOccupancyFraction=50 -Xnoclassgc -XX:SoftRefLRUPolicyMSPerMB=0&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u6784\u5EFA</p><div class="language-bash ext-sh line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D4D4D4;">docker run --privileged=true --name zsdd-server \\</span></span>
<span class="line"><span style="color:#D4D4D4;">--restart always \\</span></span>
<span class="line"><span style="color:#6A9955;"># \u5141\u8BB8\u8FDE\u63A5\u5230\u7684\u5BB9\u5668</span></span>
<span class="line"><span style="color:#D4D4D4;">--link=redis:zsdd-redis \\</span></span>
<span class="line"><span style="color:#D4D4D4;">-d -p 8080:8080 \\</span></span>
<span class="line"><span style="color:#D4D4D4;">-v /home/tomcat/webapps:/usr/local/tomcat/webapps \\</span></span>
<span class="line"><span style="color:#D4D4D4;">-v /home/tomcat/conf:/usr/local/tomcat/conf \\</span></span>
<span class="line"><span style="color:#D4D4D4;">-v /home/tomcat/bin:/usr/local/tomcat/bin \\</span></span>
<span class="line"><span style="color:#D4D4D4;">tomcat:8.5.59-jdk8-corretto</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h3 id="\u5B89\u88C5nginx" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5nginx" aria-hidden="true">#</a> \u5B89\u88C5nginx</h3><h1 id="\u65F6\u95F4\u540C\u6B65" tabindex="-1"><a class="header-anchor" href="#\u65F6\u95F4\u540C\u6B65" aria-hidden="true">#</a> \u65F6\u95F4\u540C\u6B65</h1><p>-v /etc/localtime:/etc/localtime \\</p><h1 id="\u8BBE\u7F6E\u65F6\u533A" tabindex="-1"><a class="header-anchor" href="#\u8BBE\u7F6E\u65F6\u533A" aria-hidden="true">#</a> \u8BBE\u7F6E\u65F6\u533A</h1><p>-e TZ=&quot;Asia/Shanghai&quot; <br> -e LANG=&quot;C.UTF-8&quot; <br> tomcat:8.5.59-jdk8-corretto</p><div class="language-text ext-text line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D4D4D4;"></span></span>
<span class="line"><span style="color:#D4D4D4;">\`\`\`shell</span></span>
<span class="line"><span style="color:#D4D4D4;">docker run --privileged=true --name zsdd-server \\</span></span>
<span class="line"><span style="color:#D4D4D4;">--restart always \\</span></span>
<span class="line"><span style="color:#D4D4D4;"># \u5141\u8BB8\u8FDE\u63A5\u5230\u7684\u5BB9\u5668</span></span>
<span class="line"><span style="color:#D4D4D4;">--link=redis:zsdd-redis \\</span></span>
<span class="line"><span style="color:#D4D4D4;">-d -p 8080:8080 \\</span></span>
<span class="line"><span style="color:#D4D4D4;">-v /home/tomcat/webapps:/usr/local/tomcat/webapps \\</span></span>
<span class="line"><span style="color:#D4D4D4;">-v /home/tomcat/catalina.sh:/usr/local/tomcat/bin/catalina.sh \\</span></span>
<span class="line"><span style="color:#D4D4D4;"># \u65F6\u95F4\u540C\u6B65</span></span>
<span class="line"><span style="color:#D4D4D4;">-v /etc/localtime:/etc/localtime \\</span></span>
<span class="line"><span style="color:#D4D4D4;"># \u8BBE\u7F6E\u65F6\u533A</span></span>
<span class="line"><span style="color:#D4D4D4;">-e TZ=&quot;Asia/Shanghai&quot; \\</span></span>
<span class="line"><span style="color:#D4D4D4;">tomcat:8.5.59-jdk8-corretto  </span></span>
<span class="line"><span style="color:#D4D4D4;"></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u4FEE\u6539\u670D\u52A1\u5668\u65F6\u95F4" tabindex="-1"><a class="header-anchor" href="#\u4FEE\u6539\u670D\u52A1\u5668\u65F6\u95F4" aria-hidden="true">#</a> \u4FEE\u6539\u670D\u52A1\u5668\u65F6\u95F4</h3>`,17),t={href:"https://www.cnblogs.com/suiyueshentou/p/7798340.html",target:"_blank",rel:"noopener noreferrer"},D=c("click this"),v=n(`<h3 id="\u4FEE\u6539\u7CFB\u7EDF\u4E2D\u6587\u4E71\u7801" tabindex="-1"><a class="header-anchor" href="#\u4FEE\u6539\u7CFB\u7EDF\u4E2D\u6587\u4E71\u7801" aria-hidden="true">#</a> \u4FEE\u6539\u7CFB\u7EDF\u4E2D\u6587\u4E71\u7801</h3><ol><li><p>\u5B89\u88C5\u4E2D\u6587\u5305\uFF08centos7.x\uFF09</p><div class="language-bash ext-sh line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D4D4D4;"> yum  groupinstall  </span><span style="color:#CE9178;">&quot;fonts&quot;</span><span style="color:#D4D4D4;"> </span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>\u4FEE\u6539\u8BED\u8A00\u6587\u4EF6</p><div class="language-bash ext-sh line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D4D4D4;">vi /etc/locale.conf</span></span>
<span class="line"><span style="color:#6A9955;"># \u8BBE\u7F6E</span></span>
<span class="line"><span style="color:#D4D4D4;">LANG=en_US.UTF8</span></span>
<span class="line"><span style="color:#D4D4D4;">LANG=zh_CN.UTF8/LANG=zh_CN</span></span>
<span class="line"><span style="color:#DCDCAA;">source</span><span style="color:#D4D4D4;"> /etc/locale.conf</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u91CD\u542F\u7CFB\u7EDF</p><div class="language-bash ext-sh line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D4D4D4;">reboot</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ol><h3 id="\u5B89\u88C5elasticsearch-kibana" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5elasticsearch-kibana" aria-hidden="true">#</a> \u5B89\u88C5Elasticsearch/Kibana</h3><h2 id="\u5B89\u88C5oracle12c" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5oracle12c" aria-hidden="true">#</a> \u5B89\u88C5oracle12c</h2><div class="language-sql ext-sql line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D4D4D4;">docker pull registry.cn-hangzhou.aliyuncs.com/zhuyijun/oracle-12c</span></span>
<span class="line"><span style="color:#D4D4D4;">chown -R </span><span style="color:#B5CEA8;">54321</span><span style="color:#D4D4D4;">:</span><span style="color:#B5CEA8;">54321</span><span style="color:#D4D4D4;"> /</span><span style="color:#569CD6;">data</span><span style="color:#D4D4D4;">/oracle12c/oradata</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">docker run -d </span><span style="color:#6A9955;">--name oracle12c --privileged \\</span></span>
<span class="line"><span style="color:#D4D4D4;">    -p </span><span style="color:#B5CEA8;">1521</span><span style="color:#D4D4D4;">:</span><span style="color:#B5CEA8;">1521</span><span style="color:#D4D4D4;"> -p </span><span style="color:#B5CEA8;">5500</span><span style="color:#D4D4D4;">:</span><span style="color:#B5CEA8;">5500</span><span style="color:#D4D4D4;"> \\</span></span>
<span class="line"><span style="color:#D4D4D4;">    -e ORACLE_SID=orcl \\</span></span>
<span class="line"><span style="color:#D4D4D4;">    -e ORACLE_PDB=orclpdb1 \\</span></span>
<span class="line"><span style="color:#D4D4D4;">    -e ORACLE_PWD=oracle \\</span></span>
<span class="line"><span style="color:#D4D4D4;">    -e ORACLE_CHARACTERSET=zhs16gbk \\</span></span>
<span class="line"><span style="color:#D4D4D4;">    -e ORACLE_BASE=/opt/oracle \\</span></span>
<span class="line"><span style="color:#D4D4D4;">    -e ORACLE_HOME=/opt/oracle/product/</span><span style="color:#B5CEA8;">12</span><span style="color:#D4D4D4;">.</span><span style="color:#B5CEA8;">2</span><span style="color:#D4D4D4;">.</span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;">.</span><span style="color:#B5CEA8;">1</span><span style="color:#D4D4D4;">/dbhome_1 \\</span></span>
<span class="line"><span style="color:#D4D4D4;">    -e </span><span style="color:#569CD6;">PATH</span><span style="color:#D4D4D4;">=/opt/oracle/product/</span><span style="color:#B5CEA8;">12</span><span style="color:#D4D4D4;">.</span><span style="color:#B5CEA8;">2</span><span style="color:#D4D4D4;">.</span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;">.</span><span style="color:#B5CEA8;">1</span><span style="color:#D4D4D4;">/dbhome_1/bin:/opt/oracle/product/</span><span style="color:#B5CEA8;">12</span><span style="color:#D4D4D4;">.</span><span style="color:#B5CEA8;">2</span><span style="color:#D4D4D4;">.</span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;">.</span><span style="color:#B5CEA8;">1</span><span style="color:#D4D4D4;">/dbhome_1/OPatch/:/usr/sbin:/usr/</span><span style="color:#569CD6;">local</span><span style="color:#D4D4D4;">/sbin:/usr/</span><span style="color:#569CD6;">local</span><span style="color:#D4D4D4;">/bin:/usr/sbin:/usr/bin:/sbin:/bin \\</span></span>
<span class="line"><span style="color:#D4D4D4;">    -v /</span><span style="color:#569CD6;">data</span><span style="color:#D4D4D4;">/oracle12c/oradata:/opt/oracle/oradata \\</span></span>
<span class="line"><span style="color:#D4D4D4;">    registry.cn-hangzhou.aliyuncs.com/zhuyijun/oracle-12c:latest</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5);function u(y,m){const a=o("ExternalLinkIcon");return e(),i("div",null,[d,s("blockquote",null,[s("p",null,[s("a",t,[D,p(a)])])]),v])}var _=l(r,[["render",u],["__file","deploy.html.vue"]]);export{_ as default};
