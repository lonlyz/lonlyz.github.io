# SecurityManager

## 应用场景

当运行未知java程序时，该程序可能存在恶意的代码（删除系统文件），为了防止对系统产生影响，因此需要对运行的代码权限进行控制，就需要开启安全管理器。

## 配置文件

### 默认配置文件

路径： $JAVA_HOME/jre/lib/security/java.policy

未指定配置文件时，会使用默认的配置文件

### 配置文件详解

##### 配置的基本规则

在启用安全管理器的时候，需要遵循一下规则：

- 没有配置的权限表示没有
- 只能配置有什么权限，不能配置禁止做什么
- 同一种权限可以多次配置，取并集
- 统一资源的多种权限可用逗号分隔

#### 默认配置文件解释

```md

java.policy

// Standard extensions get all permissions by default

grant codeBase "file:${{java.ext.dirs}}/*" {
        permission java.security.AllPermission;
};

// default permissions granted to all domains

grant {
        // Allows any thread to stop itself using the java.lang.Thread.stop()
        // method that takes no argument.
        // Note that this permission is granted by default only to remain
        // backwards compatible.
        // It is strongly recommended that you either remove this permission
        // from this policy file or further restrict it to code sources
        // that you specify, because Thread.stop() is potentially unsafe.
        // See the API specification of java.lang.Thread.stop() for more
        // information.
        permission java.lang.RuntimePermission "stopThread";

        // allows anyone to listen on dynamic ports
        permission java.net.SocketPermission "localhost:0", "listen";

        // "standard" properies that can be read by anyone

        permission java.util.PropertyPermission "java.version", "read";
        permission java.util.PropertyPermission "java.vendor", "read";
        permission java.util.PropertyPermission "java.vendor.url", "read";
        permission java.util.PropertyPermission "java.class.version", "read";
        permission java.util.PropertyPermission "os.name", "read";
        permission java.util.PropertyPermission "os.version", "read";
        permission java.util.PropertyPermission "os.arch", "read";
        permission java.util.PropertyPermission "file.separator", "read";
        permission java.util.PropertyPermission "path.separator", "read";
        permission java.util.PropertyPermission "line.separator", "read";

        permission java.util.PropertyPermission "java.specification.version", "read";
        permission java.util.PropertyPermission "java.specification.vendor", "read";
        permission java.util.PropertyPermission "java.specification.name", "read";

        permission java.util.PropertyPermission "java.vm.specification.version", "read";
        permission java.util.PropertyPermission "java.vm.specification.vendor", "read";
        permission java.util.PropertyPermission "java.vm.specification.name", "read";
        permission java.util.PropertyPermission "java.vm.version", "read";
        permission java.util.PropertyPermission "java.vm.vendor", "read";
        permission java.util.PropertyPermission "java.vm.name", "read";
};
```

说明：

- 第一部分授权

   ```
    授权基于路径在"file:${{java.ext.dirs}}/*"的class和jar包，所有权限。
  ``` 

- 第二部分授权

  细粒度的授权，对某些资源的操作进行授权。

  >  [https://www.cnblogs.com/yaowen/p/10117893.html](https://www.cnblogs.com/yaowen/p/10117893.html) 

可选配置项：

1.  directory/ 表示directory目录下的所有.class文件，不包括.jar文件 
2.  directory/* 表示directory目录下的所有的.class及.jar文件 
3.  directory/- 表示directory目录下的所有的.class及.jar文件，包括子目录 
4. 也可以使用`${}`引用系统属性 exp: `file:${...}/*`

## 启动安全管理器

### 命令方式

启动程序时通过附加参数

```shell
-Djava.security.manager
```

指定自定义的配置文件

```shell
-Djava.security.manager -Djava.security.policy="${path}"
```

### 编码方式

```java
System.setSecurityManager(new SecurityManager());
```

推荐使用命令方式启动，实现更加灵活。
