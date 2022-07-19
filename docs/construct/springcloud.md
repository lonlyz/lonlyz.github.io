---
sidebar: auto
---

# Spring Cloud 入门

> [小不点啊](https://www.cnblogs.com/leeSmall/p/8763181.html)
>
> [程序员DD](http://blog.didispace.com/spring-cloud-learning/)

## 1、Spring Cloud 简介

> 一套分布式服务治理的框架；
>
> 不提供具体功能性操作，只关注与服务之间的通讯、熔断和监控；
>
> [微服务](https://mp.weixin.qq.com/s/fzk-kENu0I22P3F2Vu7KBA)

## 2、Spring Cloud 架构

![架构图](/construct/springcloud/1227483-20180409214248115-425352486.png)

- 通过API网关（Zuul）访问内部服务
- 网关获得请求后，从注册中心（Eureka）上获取可用的服务
- 通过负载均衡（Ribbon）在及进行分发
- 各服务之间通过（Feign）进行通讯
- 处理服务超时熔断（Hystrix）
- 监控（Turbine）服务间调用和熔断的指标

> https://www.cnblogs.com/leeSmall/p/8799099.html

## 3、Spring Cloud 组件（Dastlon版）

### 3.1 服务治理（Eureka）

由于spring cloud对服务治理做了一层抽象的接口，所以可以支持不同的服务治理框架。Netflix Eureka、Consul、Zookeeper。在spring cloud 服务治理的抽象层作用下，可以无缝的切换服务治理的实现，并且不影响其它服务的注册、服务发现、服务调用等逻辑。

#### Spring Cloud Eureka

spring cloud eureka 是 spring cloud netflix 项目下的服务治理模块。而spring cloud netflix 也是spring cloud的子项目。主要是对Netflix 一系列开源产品进行包装。

**创建“服务注册中心”**

创建springboot项目，命名为eureka-server，并引入依赖：

```pom
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>1.5.4.RELEASE</version>
    <relativePath/>
</parent>

<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-eureka-server</artifactId>
    </dependency>
</dependencies>

<dependencyManagement>
    <dependencies>
        <dependency>
           <groupId>org.springframework.cloud</groupId>
           <artifactId>spring-cloud-dependencies</artifactId>
           <version>Dalston.SR1</version>
           <type>pom</type>
           <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

1. 添加`@EnableEurekaServer`来启动一个注册中心

2. 防止将自己作为客户端注册

   ```yml
   spring.application.name=eureka-server
   server.port=1001
   
   eureka.instance.hostname=localhost
   eureka.client.register-with-eureka=false
   eureka.client.fetch-registry=false
   ```

### 3.2 服务消费（Ribbon）

前提： `LoadBalancerClient`

可以使用`LoadBalancerClient`实现服务负载均衡，先通过`loadBalancerClient`的`choose`函数来负载均衡的选出一个服务实例，这个服务实例的基本信息存储在`ServiceInstance`中，然后在通过`ServiceInstance`进行请求地址的拼接进行。

Spring Cloud Ribbon是基于Netflix Ribbon实现的一套客户端负载均衡的工具。它是一个基于HTTP和TCP的客户端负载均衡器。它可以通过在客户端中配置ribbonServerList来设置服务端列表去轮询访问以达到均衡负载的作用。

当Ribbon与Eureka联合使用时，ribbonServerList会被DiscoveryEnabledNIWSServerList重写，扩展成从Eureka注册中心中获取服务实例列表。同时它也会用NIWSDiscoveryPing来取代IPing，它将职责委托给Eureka来确定服务端是否已经启动。

而当Ribbon与Consul联合使用时，ribbonServerList会被ConsulServerList来扩展成从Consul获取服务实例列表。同时由ConsulPing来作为IPing接口的实现。

简化了`LoadBalancerClient`实现，只需要添加注解`@LoadBalanced`

### 3.3 服务消费（Feign）

Spring Cloud Feign是一套基于Netflix Feign实现的声明式服务调用客户端。它使得编写Web服务客户端变得更加简单。我们只需要通过创建接口并用注解来配置它既可完成对Web服务接口的绑定。它具备可插拔的注解支持，包括Feign注解、JAX-RS注解。它也支持可插拔的编码器和解码器。Spring Cloud Feign还扩展了对Spring MVC注解的支持，同时还整合了Ribbon和Eureka来提供均衡负载的HTTP客户端实现。