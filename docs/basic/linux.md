# Linux

1. 设置防火墙的限制的端口

   ```shell
   firewall-cmd -–zone=public –-add-port=2181/tcp –-permanent 
   firewall-cmd -–zone=public –-add-port=2888/tcp –-permanent 
   firewall-cmd -–zone=public –-add-port=3888/tcp –-permanent
   firewall-cmd –-reload #重启防火墙
   ```

   解释：

   ​	–-zone #作用域

   ​	–-add-port=2181/tcp #添加端口，格式为：端口/通讯协议

   ​	–-permanent #永久生效，没有此参数重启后失效

2. iptables

3. 设置免密登录

   说明：可以使用scp/ssh命令进行服务器的连接

   [参考地址](https://blog.csdn.net/nahancy/article/details/79059135)

