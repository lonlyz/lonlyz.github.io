# Mybatis源码分析

> [mybatis源码分析](https://www.cnblogs.com/angelica-duhurica/category/1489346.html)

## 1.mybatis架构分析

### 1.1mybatis框架架构图

> [框架架构](https://www.cnblogs.com/angelica-duhurica/p/11111821.html)

![框架架构图](/construct/mybatis/archtecture_diagram.jpg)

Mybatis的功能架构分为三层：

- API接口层：提供给外部使用的API接口，开发人员通过这些本地的API操纵数据库。接口层一旦收到调用请求就会调用数据处理层进行具体的数据处理。
- 数据处理层：负责具体的SQL查找、SQL解析、SQL执行和执行结果映射等。主要目的是根据调用的请求完成一次数据库操作。
- 基础支撑层：负责最基础的功能支撑，包括连接管理、事务管理、配置加载和缓存管理，这些都是公用的东西，为上层提供基础支持。

### 1.2整体执行流程图

> [执行流程](https://www.cnblogs.com/angelica-duhurica/p/11111695.html)

![执行流程图](/construct/mybatis/excution_diagram.png)

执行流程：

- 入口为SqlMapConfig.xml全局配置文件，配置mybatis的运行环境。此外sql语句的映射文件Mapper.xml，文件中配置了具体执行的sql语句。该文件需要在SqlMapConfig.xml文件中加载。
- 通过全局配置文件构造SqlSessionFactory会话工厂。
- 通过会话工厂创建SqlSession，对数据库的操作提供基础。
- mybatis底层自定义Executor执行器接口进行数据库的操作，Executor有两个实现，一个是基本执行器，一个是缓存执行器。
- MapppedStatement是mybatis底层的一个对象，包含了mybatis的配置信息和sql映射信息。Mapper.xml文件一个sql标签对应一个MappedStatement对象，sql标签的id是MappedStatement对象的id。
- MapppedStatement对sql执行的输入参数进行定义。
- MapppedStatement对sql执行的结果进行定于。

### 1.3sqlsession执行流程图

![sqlsession执行流程图](/construct/mybatis/sqlsession_excutrion_diagram.png)

小结：

​		在SqlSession接口调用的insert/update/delete方法中，所有的操作都交给了Executor来操作。SqlSession接口是Mybatis框架暴露的外部接口，而Executor是内部的实现接口。在Executor的实现中，又是调用StatementHandler来处理的。当然，在调用StatementHandler设置参数时候，需要ParameterHandler来设置相应的参数。

## 2.mybatis源码分析

### 2.1config文件加载流程

- 加载mybatis全局配置文件，使用**SqlSessionFactoryBuilder**创建**SqlSessionFactory**

  ```java
  String resource = "debug/config/mybatis-config.xml";
  Reader reader;
  // 使用java.io.Reader构建
  reader = Resources.getResourceAsReader(resource);
  SqlSessionFactory sqlMapper = new SqlSessionFactoryBuilder().build(reader);
  ```

- 实例化**XMLConfigBuilder**对象传入mybatis的全局配置文件，进行mybatis配置文件的解析

  org.apache.ibatis.session.SqlSessionFactoryBuilder#build(java.io.Reader, java.lang.String, java.util.Properties)

  ```java
  public SqlSessionFactory build(Reader reader, String environment, Properties properties) {
      try {
        /**
         * 解析mybatis-config.xml   config节点
         */
        XMLConfigBuilder parser = new XMLConfigBuilder(reader, environment, properties);
        /**
         * 解析mybatis-config.xml   mapper节点 解析*mapper.xml
         */
        return build(parser.parse());
      } catch (Exception e) {
        throw ExceptionFactory.wrapException("Error building SqlSession.", e);
      } finally {
        ErrorContext.instance().reset();
        try {
          reader.close();
        } catch (IOException e) {
          // Intentionally ignore. Prefer previous error.
        }
      }
    }
  ```

- 实例化**XMLConfigBuilder**对象的过程中，创建文档解析器

  org.apache.ibatis.builder.xml.XMLConfigBuilder#XMLConfigBuilder(java.io.Reader, java.lang.String, java.util.Properties)

  ```java
  /**
     *
     * @param reader 配置文件的字符流
     * @param environment 环境参数
     * @param props 参数
     */
    public XMLConfigBuilder(Reader reader, String environment, Properties props) {
      this(new XPathParser(reader, true, props, new XMLMapperEntityResolver()), environment, props);
    }
  ```

  org.apache.ibatis.builder.xml.XMLConfigBuilder#XMLConfigBuilder(org.apache.ibatis.parsing.XPathParser, java.lang.String, java.util.Properties)

  ```java
  /**
     * 主要是根据mybatis自身需要创建一个文档解析器，然后调用parse将输入input source解析为DOM XML文档并返回。
     * 得到XPathParser实例之后，就调用另一个使用XPathParser作为配置来源的重载构造函数了
     * @param parser
     * @param environment
     * @param props
     */
    private XMLConfigBuilder(XPathParser parser, String environment, Properties props) {
      //主要是设置类型别名注册器，以及类型处理器注册器
      super(new Configuration());
      ErrorContext.instance().resource("SQL Mapper Configuration");
      this.configuration.setVariables(props);
      this.parsed = false;
      this.environment = environment;
      this.parser = parser;
    }
  ```

- XPathParser**使用的createDocument方法来将DOM加载到XPathParser中

  org.apache.ibatis.parsing.XPathParser#XPathParser(java.io.Reader, boolean, java.util.Properties, org.xml.sax.EntityResolver)

  ```java
   public XPathParser(Reader reader, boolean validation, Properties variables, EntityResolver entityResolver) {
       // entityResolver  上一步实例的XMLMapperEntityResolver
      commonConstructor(validation, variables, entityResolver);
       //加载dom元素到XPathParser
      this.document = createDocument(new InputSource(reader));
    }
  ```

  org.apache.ibatis.parsing.XPathParser#createDocument

  ```java
  private Document createDocument(InputSource inputSource) {
      // important: this must only be called AFTER common constructor
      try {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        factory.setValidating(validation);
        //设置由本工厂创建的解析器是否支持XML命名空间 true 支持 false 不支持
        factory.setNamespaceAware(false);
        factory.setIgnoringComments(true);
        // 是否在解析的时候消除空格
        factory.setIgnoringElementContentWhitespace(false);
        //设置是否将CDATA节点转换为Text节点
        factory.setCoalescing(false);
        //设置是否展开实体引用节点，这里应该是sql片段引用的关键
        factory.setExpandEntityReferences(true);
  
        DocumentBuilder builder = factory.newDocumentBuilder();
        //设置解析mybatis xml文档节点的解析器,也就是上面的XMLMapperEntityResolver
        builder.setEntityResolver(entityResolver);
        builder.setErrorHandler(new ErrorHandler() {
          @Override
          public void error(SAXParseException exception) throws SAXException {
            throw exception;
          }
  
          @Override
          public void fatalError(SAXParseException exception) throws SAXException {
            throw exception;
          }
  
          @Override
          public void warning(SAXParseException exception) throws SAXException {
          }
        });
        //加载完成dom元素
        return builder.parse(inputSource);
      } catch (Exception e) {
        throw new BuilderException("Error creating document instance.  Cause: " + e, e);
      }
    }
  ```

- **SqlSessionFactoryBuilder**中builder()方法的parser.parse()方法,进行实际的解析全局配置文件

  ```java
  public SqlSessionFactory build(Reader reader, String environment, Properties properties) {
      try {
        /**
         * 解析mybatis-config.xml   config节点
         */
        XMLConfigBuilder parser = new XMLConfigBuilder(reader, environment, properties);
        /**
         * 解析mybatis-config.xml   mapper节点 解析*mapper.xml
         */
        return build(parser.parse());
      } catch (Exception e) {
        throw ExceptionFactory.wrapException("Error building SqlSession.", e);
      } finally {
        ErrorContext.instance().reset();
        try {
          reader.close();
        } catch (IOException e) {
          // Intentionally ignore. Prefer previous error.
        }
      }
    }
  ```

  org.apache.ibatis.builder.xml.XMLConfigBuilder#parse

  ```java
  //真正Configuration构建逻辑
    public Configuration parse() {
      if (parsed) {
        throw new BuilderException("Each XMLConfigBuilder can only be used once.");
      }
      parsed = true;
      //mybatis配置文件解析的主流程
      parseConfiguration(parser.evalNode("/configuration"));
      return configuration;
    }
  ```

  org.apache.ibatis.builder.xml.XMLConfigBuilder#parseConfiguration

  ```java
  /**
     * 解析mybatis-config.xml文件
     * @param root
     */
    private void parseConfiguration(XNode root) {
      try {
        //issue #117 read properties first
        propertiesElement(root.evalNode("properties"));
        Properties settings = settingsAsProperties(root.evalNode("settings"));
        // 加载自定义的vfs jbossvfs defaultvfs
        loadCustomVfs(settings);
        loadCustomLogImpl(settings);
        //解析类型别名
        typeAliasesElement(root.evalNode("typeAliases"));
        //加载插件
        pluginElement(root.evalNode("plugins"));
        /**
         * 每次创建结果对象的新实例时，它都会使用一个对象工厂（ObjectFactory）实例来完成
         *  默认的对象工厂需要做的仅仅是实例化目标类，要么通过默认构造方法，要么在参数映射存在的时候通过参数构造方法来实例化。
         *  如果想覆盖对象工厂的默认行为，则可以通过创建自己的对象工厂来实现
         *  setProperties 方法可以被用来配置 ObjectFactory，在初始化你的 ObjectFactory 实例后，objectFactory元素体中定义的属性会被传递给setProperties方法
         *
         * @see <a href='http://www.mybatis.org/mybatis-3/zh/configuration.html#objectFactory'>对象工厂（ObjectFactory）</a>
         */
        objectFactoryElement(root.evalNode("objectFactory"));
        /**
         * 对象包装器工厂主要用来包装返回result对象，比如说可以用来设置某些敏感字段脱敏或者加密等。
         * 默认对象包装器工厂是DefaultObjectWrapperFactory，也就是不使用包装器工厂
         */
        objectWrapperFactoryElement(root.evalNode("objectWrapperFactory"));
        /**
         * 因为加载配置文件中的各种插件类等等，为了提供更好的灵活性，mybatis支持用户自定义反射工厂，不过总体来说，用的不多，要实现反射工厂，只要实现ReflectorFactory接口即可。
         * 默认的反射工厂是DefaultReflectorFactory。一般来说，使用默认的反射工厂就可以了
         */
        reflectorFactoryElement(root.evalNode("reflectorFactory"));
        settingsElement(settings);
        // read it after objectFactory and objectWrapperFactory issue #631
        /**
         * 环境可以说是mybatis-config配置文件中最重要的部分，它类似于spring和maven里面的profile，允许给开发、生产环境同时配置不同的environment，根据不同的环境加载不同的配置，这也是常见的做法，
         * 如果在SqlSessionFactoryBuilder调用期间没有传递使用哪个环境的话，默认会使用一个名为default”的环境。
         * 找到对应的environment之后，就可以加载事务管理器和数据源了。
         * 事务管理器和数据源类型这里都用到了类型别名，JDBC/POOLED都是在mybatis内置提供的，在Configuration构造器执行期间注册到TypeAliasRegister。
         * mybatis内置提供JDBC和MANAGED两种事务管理方式，前者主要用于简单JDBC模式，后者主要用于容器管理事务，一般使用JDBC事务管理方式。
         * mybatis内置提供JNDI、POOLED、UNPOOLED三种数据源工厂，一般情况下使用POOLED数据源。
         */
        environmentsElement(root.evalNode("environments"));
        /**
         * MyBatis 会加载不带 databaseId 属性和带有匹配当前数据库 databaseId 属性的所有语句。
         * 如果同时找到带有 databaseId 和不带 databaseId 的相同语句，则后者会被舍弃。
         */
        databaseIdProviderElement(root.evalNode("databaseIdProvider"));
        /**
         *无论是 MyBatis 在预处理语句（PreparedStatement）中设置一个参数时，还是从结果集中取出一个值时， 都会用类型处理器将获取的值以合适的方式转换成 Java 类型。
         * mybatis提供了两种方式注册类型处理器，package自动检索方式和显示定义方式。使用自动检索（autodiscovery）功能的时候，只能通过注解方式来指定 JDBC 的类型。
         * 为了简化使用，mybatis在初始化TypeHandlerRegistry期间，自动注册了大部分的常用的类型处理器比如字符串、数字、日期等。对于非标准的类型，用户可以自定义类型处理器来处理。要实现一个自定义类型处理器，只要实现 org.apache.ibatis.type.TypeHandler 接口， 或继承一个实用类 org.apache.ibatis.type.BaseTypeHandler， 并将它映射到一个 JDBC 类型即可。
         * <a href='https://www.cnblogs.com/zhjh256/p/8512392.html#2.1.11-%E5%8A%A0%E8%BD%BD%E7%B1%BB%E5%9E%8B%E5%A4%84%E7%90%86%E5%99%A8typehandlerelement'>类型处理器</a>
         */
        typeHandlerElement(root.evalNode("typeHandlers"));
        /**
         * <a href='https://www.cnblogs.com/zhjh256/p/8512392.html#2.1.12-%E5%8A%A0%E8%BD%BDmapper%E6%96%87%E4%BB%B6mapperelement'>加载mapper文件</a>
         */
        mapperElement(root.evalNode("mappers"));
      } catch (Exception e) {
        throw new BuilderException("Error parsing SQL Mapper Configuration. Cause: " + e, e);
      }
    }
  
  ```

总结：

![加载流程图](/construct/mybatis/config_load_diagram.png)

### 2.2mapper文件加载流程

- 解析全局配置文件

  org.apache.ibatis.builder.xml.XMLConfigBuilder#parseConfiguration

  ```java
  private void parseConfiguration(XNode root) {
      try {
       ...
        //加载mybatis.config的<mappers>标签
        mapperElement(root.evalNode("mappers"));
      } catch (Exception e) {
        throw new BuilderException("Error parsing SQL Mapper Configuration. Cause: " + e, e);
      }
    }
  
  ```

  org.apache.ibatis.builder.xml.XMLConfigBuilder#mapperElement

  ```java
  private void mapperElement(XNode parent) throws Exception {
      if (parent != null) {
        for (XNode child : parent.getChildren()) {
          /**
           * 如果要同时使用package自动扫描和通过mapper明确指定要加载的mapper，一定要确保package自动扫描的范围不包含明确指定的mapper，
           * 否则在通过package扫描的interface的时候，尝试加载对应xml文件的loadXmlResource()的逻辑中出现判重出错，报org.apache.ibatis.binding.BindingException异常，
           * 即使xml文件中包含的内容和mapper接口中包含的语句不重复也会出错，包括加载mapper接口时自动加载的xml mapper也一样会出错。
           */
          if ("package".equals(child.getName())) {
            String mapperPackage = child.getStringAttribute("name");
            configuration.addMappers(mapperPackage);
          } else {
            String resource = child.getStringAttribute("resource");
            String url = child.getStringAttribute("url");
            String mapperClass = child.getStringAttribute("class");     
            if (resource != null && url == null && mapperClass == null) {
                  //mapper标签设置的resource
              ErrorContext.instance().resource(resource);
              InputStream inputStream = Resources.getResourceAsStream(resource);
              XMLMapperBuilder mapperParser = new XMLMapperBuilder(inputStream, configuration, resource, configuration.getSqlFragments());
              mapperParser.parse();
            } else if (resource == null && url != null && mapperClass == null) {
                //mapper标签设置的url
              ErrorContext.instance().resource(url);
              InputStream inputStream = Resources.getUrlAsStream(url);
              XMLMapperBuilder mapperParser = new XMLMapperBuilder(inputStream, configuration, url, configuration.getSqlFragments());
              mapperParser.parse();
            } else if (resource == null && url == null && mapperClass != null) {
                  //mapper标签设置的class，先进行注解方式的加载，然后在加载xml
              Class<?> mapperInterface = Resources.classForName(mapperClass);
              configuration.addMapper(mapperInterface);
            } else {
              throw new BuilderException("A mapper element may only specify a url, resource or class, but not more than one.");
            }
          }
        }
      }
    }
  
  ```

- **XMLMapperBuilder**的parse()方法解析mapper.xml

  org.apache.ibatis.builder.xml.XMLMapperBuilder#parse

  ```java
  public void parse() {
      //判断configuration对象是否加载xml文件，避免重复加载的问题
      if (!configuration.isResourceLoaded(resource)) {
        //解析mapper标签
        configurationElement(parser.evalNode("/mapper"));
        configuration.addLoadedResource(resource);
        //将mapperClass添加到configuration中
        bindMapperForNamespace();
      }
      //解析在configurationElement处理resultMap时，其extends属性指向的父对象还没被处理的resultMap节点
      parsePendingResultMaps();
      //解析在configurationElement处理<cache-ref>时其指向的对象不存在的<cache>节点---如果<cache-ref>优先于<cache>加载
      parsePendingCacheRefs();
      //同上，如果<cache>没加载就处理statement时会报异常
      parsePendingStatements();
    }
  
  ```

  org.apache.ibatis.builder.xml.XMLMapperBuilder#configurationElement

  ```java
  private void configurationElement(XNode context) {
      try {
        String namespace = context.getStringAttribute("namespace");
        if (namespace == null || namespace.equals("")) {
          throw new BuilderException("Mapper's namespace cannot be empty");
        }
        builderAssistant.setCurrentNamespace(namespace);
        cacheRefElement(context.evalNode("cache-ref"));
        cacheElement(context.evalNode("cache"));
        parameterMapElement(context.evalNodes("/mapper/parameterMap"));
        resultMapElements(context.evalNodes("/mapper/resultMap"));
        sqlElement(context.evalNodes("/mapper/sql"));
          //进行sql语句的处理并封装成MappedStatement
        buildStatementFromContext(context.evalNodes("select|insert|update|delete"));
      } catch (Exception e) {
        throw new BuilderException("Error parsing Mapper XML. The XML location is '" + resource + "'. Cause: " + e, e);
      }
    }
  
  ```

总结：

![mapper文件加载过程](/construct/mybatis/mapper_load_diagram.png)

### 2.3sqlsource创建流程

- 在解析具体sql的XmlStatementBuilder类中org.apache.ibatis.builder.xml.XMLStatementBuilder#parseStatementNode

  ```java
  /**
     * 对mapper.xml文件的sql语句进行解析
     */
    public void parseStatementNode() {
      String id = context.getStringAttribute("id");
      String databaseId = context.getStringAttribute("databaseId");
  
      if (!databaseIdMatchesCurrent(id, databaseId, this.requiredDatabaseId)) {
        return;
      }
  
      String nodeName = context.getNode().getNodeName();
      SqlCommandType sqlCommandType = SqlCommandType.valueOf(nodeName.toUpperCase(Locale.ENGLISH));
      boolean isSelect = sqlCommandType == SqlCommandType.SELECT;
      boolean flushCache = context.getBooleanAttribute("flushCache", !isSelect);
      boolean useCache = context.getBooleanAttribute("useCache", isSelect);
      boolean resultOrdered = context.getBooleanAttribute("resultOrdered", false);
  
      // Include Fragments before parsing
      XMLIncludeTransformer includeParser = new XMLIncludeTransformer(configuration, builderAssistant);
      includeParser.applyIncludes(context.getNode());
  
      String parameterType = context.getStringAttribute("parameterType");
      Class<?> parameterTypeClass = resolveClass(parameterType);
      /**
       * @see XMLLanguageDriver
       * <a href="http://www.mybatis.org/mybatis-3/zh/dynamic-sql.html">lang属性说明</a>
       * 获取可插拔的脚本语言 需要实现 LanguageDriver mybatis默认实现时XmlLanguageDriver
       */
      String lang = context.getStringAttribute("lang");
      LanguageDriver langDriver = getLanguageDriver(lang);
  
      // Parse selectKey after includes and remove them.
      processSelectKeyNodes(id, parameterTypeClass, langDriver);
  
      // Parse the SQL (pre: <selectKey> and <include> were parsed and removed)
      KeyGenerator keyGenerator;
      String keyStatementId = id + SelectKeyGenerator.SELECT_KEY_SUFFIX;
      keyStatementId = builderAssistant.applyCurrentNamespace(keyStatementId, true);
      if (configuration.hasKeyGenerator(keyStatementId)) {
        keyGenerator = configuration.getKeyGenerator(keyStatementId);
      } else {
        keyGenerator = context.getBooleanAttribute("useGeneratedKeys",
            configuration.isUseGeneratedKeys() && SqlCommandType.INSERT.equals(sqlCommandType))
            ? Jdbc3KeyGenerator.INSTANCE : NoKeyGenerator.INSTANCE;
      }
  	//构造SqlSource对象
      SqlSource sqlSource = langDriver.createSqlSource(configuration, context, parameterTypeClass);
      StatementType statementType = StatementType.valueOf(context.getStringAttribute("statementType", StatementType.PREPARED.toString()));
      Integer fetchSize = context.getIntAttribute("fetchSize");
      Integer timeout = context.getIntAttribute("timeout");
      String parameterMap = context.getStringAttribute("parameterMap");
      String resultType = context.getStringAttribute("resultType");
      Class<?> resultTypeClass = resolveClass(resultType);
      String resultMap = context.getStringAttribute("resultMap");
      String resultSetType = context.getStringAttribute("resultSetType");
      ResultSetType resultSetTypeEnum = resolveResultSetType(resultSetType);
      String keyProperty = context.getStringAttribute("keyProperty");
      String keyColumn = context.getStringAttribute("keyColumn");
      String resultSets = context.getStringAttribute("resultSets");
  
      builderAssistant.addMappedStatement(id, sqlSource, statementType, sqlCommandType,
          fetchSize, timeout, parameterMap, parameterTypeClass, resultMap, resultTypeClass,
          resultSetTypeEnum, flushCache, useCache, resultOrdered,
          keyGenerator, keyProperty, keyColumn, databaseId, langDriver, resultSets);
    }
  
  ```

- 通过LanguageDriver创建sqlsource 

  org.apache.ibatis.scripting.xmltags.XMLLanguageDriver#createSqlSource(org.apache.ibatis.session.Configuration, org.apache.ibatis.parsing.XNode, java.lang.Class<?>)

  ```java
  @Override
    public SqlSource createSqlSource(Configuration configuration, XNode script, Class<?> parameterType) {
      /**
       * 进行动态sql语句的解析
       * 解析xml中各个节点sql部分的Builder
       */
      XMLScriptBuilder builder = new XMLScriptBuilder(configuration, script, parameterType);
      return builder.parseScriptNode();
    }
  
  ```

  总结：

  ![sqlsource创建流程](/construct/mybatis/sqlsource_create_diagram.png)

### 2.4sqlsession执行流程

![sqlsession执行流程](/construct/mybatis/sqlsession_excutrion_diagram.png)

![sqlsession执行流程2](/construct/mybatis/sqlsession_excution_diagram_2.png)

### 2.5获取boundsql流程

![获取boundsql流程](/construct/mybatis/get_boundsql_diagram.png)

### 2.6参数映射流程

![参数映射流程](/construct/mybatis/param_mapping_diagram.png)

### 2.7结果集映射流程

![结果映射流程](/construct/mybatis/result_mapping_diagram.png)

## 3.设计模式

> https://blog.csdn.net/zhangerqing/article/details/8194653

- Builder模式，例如SqlSessionFactoryBuilder、XMLConfigBuilder、XMLMapperBuilder、XMLStatementBuilder、CacheBuilder；
- 工厂模式，例如SqlSessionFactory1、ObjectFactory、MapperProxyFactory；
- 单例模式，例如ErrorContext和LogFactory；
- 代理模式，Mybatis实现的核心，比如MapperProxy、ConnectionLogger，用的jdk的动态代理；还有executor.loader包使用了cglib或者javassist达到延迟加载的效果；
- 组合模式，例如SqlNode和各个子类ChooseSqlNode等；
- 模板方法模式，例如BaseExecutor和SimpleExecutor，还有BaseTypeHandler和所有的子类例如IntegerTypeHandler；
- 适配器模式，例如Log的Mybatis接口和它对jdbc、log4j等各种日志框架的适配实现；
- 装饰者模式，例如Cache包中的cache.decorators子包中等各个装饰者的实现；
- 迭代器模式，例如迭代器模式PropertyTokenizer；

## 4.手写mybaits

# TODO...