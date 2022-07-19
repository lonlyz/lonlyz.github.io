# Zookeeper

## 概述

zookeeper是一种分布式协调服务，用于管理分布式环境中协调和管理服务。

zookeeper是cp系统，不适合做服务发现。

【扩展 (CAP) 】:

- C -  Consistency , 一致性，数据一致更新，所有数据变动都是同步的。 
  -  强一致性  -  strong consistency , 任何时刻，任何用户都能读取到最近一次成功更新的数据。 
  -  单调一致性 -  monotonic consistency , 任何时刻，任何用户一旦读到某个数据在某次更新后的值，那么就不会再读到比这个值更旧的值。`获取的数据顺序必是单调递增的`
  -  会话一致性 -  session consistency , 任何用户在某次会话中，一旦读到某个数据在某次更新后的值，那么在本次会话中就不会再读到比这值更旧的值。`单个用户单个会话`
  -  最终一致性 -  eventual consistency ,  用户只能读到某次更新后的值，但系统保证数据将最终达到完全一致的状态，只是所需时间不能保障。 
  -  弱一致性 -  weak consistency ,  用户无法在确定时间内读到最新更新的值。 
- A -  Availability，可用性，系统具有好的响应性能。 
- P -  Partition tolerance，分区容错性。 

### 分布式应用

【优点】：

- 可靠性 - 宕机几台不会使整个系统出现瘫痪
- 可扩展性 - 可以在性能瓶颈时，添加机器
- 透明性 - 隐藏系统的复杂性，将其显示为单个实体/应用程序

【面临的问题】：

- 竞争条件 - 多个机器进行共享资源的操作
- 死锁 - 多个操作彼此等待
- 不一致 - 数据的部分失败

### 什么是zookeeper

zookeeper是由集群（节点组）使用的一中服务，用于自身协调，并保持数据的共享。

【作用】：

- 命名服务 - 按照名称标识集群中的节点
- 配置管理 - 加入节点的最近和最新的系统配置信息
- 集群管理 -  实时的在集群和节点状态中加入/离开节点。
- 选举算法 -  选举一个节点作为协调目的的leader 
- 锁定和同步服务 -  在修改数据的同时锁定数据。此机制可帮助你在连接其他分布式应用程序（如Apache HBase）时进行自动故障恢复 
- 高度可靠的数据注册表 -  即使在一个或几个节点关闭时也可以获得数据 

## 基础

### 架构

![架构图](/construct/zookeeper/zookeeper_architecture.png)

说明：

| 部分             | 描述                                                         |
| ---------------- | ------------------------------------------------------------ |
| Client（客户端） | 客户端，分布式应用集群中的一个节点，从服务器访问信息。对于特定的时间间隔，每个客户端向服务器发送消息以使服务器知道客户端是活跃的。类似地，当客户端连接时，服务器发送确认码。如果连接的服务器没有响应，客户端会自动将消息重定向到另一个服务器。 |
| Server（服务器） | 服务器，我们的ZooKeeper总体中的一个节点，为客户端提供所有的服务。向客户端发送确认码以告知服务器是活跃的。 |
| Ensemble         | ZooKeeper服务器组。形成ensemble所需的最小节点数为3。         |
| Leader           | 服务器节点，如果任何连接的节点失败，则执行自动恢复。Leader在服务启动时被选举。 |
| Follower         | 跟随leader指令的服务器节点。                                 |

### 层次命名空间

![层次命名空间](/construct/zookeeper/zookeeper_namespace_level.png)

说明：

上图表示了一个`znode`的组成部分，由【路径`/`序列】分隔。`config`:集中式配置；`workers`:用于命名。`config`下的节点最多存储`1MB`的数据。便于zookeeper进行数据的同步和节点的元数据。此结构是`zookeeper`的数据模型。

【数据模型】

`config`命名空间下的数据模型每一个节点都维护一个`stat`结构，一个`stat`仅提供一个元数据。组成如下：

- 版本号 - 每一个zonde都有一个版本号，版本号随数据的变化递增。
- 操作控制列表 （ACL）- ACL 基本上是访问zookeeper的认证机制，管理节点的读取和写入。 
- 时间戳 - 表示创建和修改节点所经历的时间 ms
- 数据长度 - 固定长度，最多`1MB`

【节点类型】路径+10位序列号

- 持久节点 - 默认
- 临时节点 - 客户端断开连接时，临时节点会被删除，下一个节点会替换该位置。因此临时节点不允许有子节点
- 顺序节点 - 可以是临时或持久

【session会话】

遵循FIFO顺序执行，建立会话后向客户端分配会话ID，客户端需保持特定时间发送心跳进行会话保持

【watch 监视】

 客户端可以在读取特定znode时设置Watches。Watches会向注册的客户端发送任何znode（客户端注册表）更改的通知。 只触发一次`watch`,可以通过另一个读取操作进行多次触发。当会话过期，`watch`会被删除。

## leader选举

>  https://www.cnblogs.com/veblen/p/10992103.html 

### 相关概念

`serverId` - 服务器ID

- 比如有三台服务器，zoo1,zoo2和zoo3
- 编号越大在选择算法中占的权重越大

`zxid` - 最新的事物ID

- 服务器中存放的最大数据ID
- 值越大说明数据越新， 在选举算法中权重越大 

`epoch` - 逻辑时钟

- 每个服务器首先都会给自己进行投票，在同一轮的投票过程中逻辑时钟的值是相同的
- 每投完一次票这个数据就会进行增加，然后与接收到的其它服务器返回投票信息中的数值进行对比
- 如果低于当前轮次的数值，该投票无效，需更新逻辑时钟的值和投票结果

> serverId：服务器ID,编号越大在选择算法中占的权重越大
>
> zxid：最新的事物ID,值越大说明数据越新
>
> epoch：逻辑时钟,随投票次数进行递增,如果当前数值小于当前轮次,需更新到当前轮次和当前的投票结果
>
> 选举状态：LOOKING(竞选状态),FOLLOWING(随从状态,同步leader状态参与投票),OBSERVING(观察状态，不参与投票结果),LEADING(领导者状态)



假设现在有三个节点，分别是zoo1,zoo2和zoo3



## 安装

### 单机

- 下载镜像

  ```shell
  docker pull zookeeper
  ```

- 启动容器并添加映射

  ```shell
  docker run --privileged=true -d --name zookeeper --publish 2181:2181  -d zookeeper:latest
  ```

### 集群

- 安装docker-compose

- 使用docker-compose

  - 下载镜像

    ```shell
    docker pull zookeeper
    ```

  - 编辑`docker-compose.yml`文件

    前提条件：zookeeper的版本必须是[>=3.5]
  
    > [关于`ZOO_SERVERS`节点的设置说明](https://zookeeper.apache.org/doc/r3.5.5/zookeeperReconfig.html)
  
    ```yaml
    version: '3'
    services:
        zoo1:
            image: zookeeper   
            container_name: zoo1
            restart: always
            hostname: zoo1            
            ports:
                - 2181:2181 
            environment:       
                ZOO_MY_ID: 1   
                ZOO_SERVERS: server.1=0.0.0.0:2888:3888;2181 server.2=zoo2:2888:3888;2181 server.3=zoo3:2888:3888;2181  
            
        zoo2:
            image: zookeeper
            container_name: zoo2
            restart: always
            hostname: zoo2        
            ports:
                - 2182:2181
            environment:
                ZOO_MY_ID: 2
                ZOO_SERVERS: server.1=zoo1:2888:3888;2181 server.2=0.0.0.0:2888:3888;2181 server.3=zoo3:2888:3888;2181
           
     
        zoo3:
            image: zookeeper
            container_name: zoo3
            restart: always
            hostname: zoo3     
            ports:
                - 2183:2181
            environment:
              ZOO_MY_ID: 3
                ZOO_SERVERS: server.1=zoo1:2888:3888;2181 server.2=zoo2:2888:3888;2181 server.3=0.0.0.0:2888:3888;2181
         
    ```
  
  - 启动容器
  
    ```shell
    docker-compose up
    ```

## 应用

>  [ 冷面寒枪biu ](https://me.csdn.net/u013679744 )
>
>  [李占卫的网上家园](https://www.cnblogs.com/tommyli/p/3766189.html)

【算法介绍】

> 一致性算法介绍的原文地址： https://blog.csdn.net/changshaoshao/article/details/83343782 

### Paxos分布式一致性算法

paxos算法是基于消息传递且具有高度容错性的一致性算法。保证分布式系统的值在出现异常的分布式系统中一致。也可称之为分布式系统的选举算法。

节点之间的通讯模型是共享内存和消息传递。paxos是基于消息传递的通讯模型。

### ZAB协议

> [原文地址](https://blog.csdn.net/u013679744/article/details/79240249)

zookeeper原子消息广播协议 。 ZooKeeper 实现了一种主备模式的系统架构来保持集群中各个副本之间的数据一致性，同时其崩溃恢复过程也确保看zk集群的高可用性（HA）。

 ZAB协议的两种基本模式：崩溃恢复模式和消息广播模式。 

【应用】

- 数据发布与订阅（配置中心）
- 负载均衡
- 命名服务
- 分布式协调/通知
- 集群管理
- Master选举
- 分布式锁
- 分布式队列