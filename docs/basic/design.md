---
sidebar: auto
editLink: false
---

# 设计模式

[TOC]

## 前言

设计模式可以分为三大类创建型模式、结构型模式和行为型模式。

【创建型模式】

说明：创建对象的同时隐藏创建逻辑的方式，而不是使用`new`直接实例化对象。这使得程序在判定针对某个给定实例需要创建哪些对象时更加灵活。

- 工厂模式 （Factory Pattern） 
- 抽象工厂模式 （Abstract Factory Pattern） 
- 单例模式 （Singleton Pattern） 
- 建造者模式 （Builder Pattern） 
- 原型模式 （Prototype Pattern） 

【结构型模式】

说明：主要关注类和对象的组合。继承的概念被用来组合接口和定义组合对象获得新功能。

- 适配器模式（Adapter Pattern）
- 桥接模式（Bridge Pattern）
- 过滤器模式（Filter、Criteria Pattern）
- 组合模式（Composite Pattern）
- 装饰器模式（Decorator Pattern）
- 外观模式（Facade Pattern）
- 享元模式（Flyweight Pattern）
- 代理模式（Proxy Pattern）

【行为型模式】

说明：主要关注对象间的通信。

- 责任链模式（Chain of Responsibility Pattern）
- 命令模式（Command Pattern）
- 解释器模式（Interpreter Pattern）
- 迭代器模式（Iterator Pattern）
- 中介者模式（Mediator Pattern）
- 备忘录模式（Memento Pattern）
- 观察者模式（Observer Pattern）
- 状态模式（State Pattern）
- 空对象模式（Null Object Pattern）
- 策略模式（Strategy Pattern）
- 模板模式（Template Pattern）
- 访问者模式（Visitor Pattern）

## 分析

### Proxy 代理模式

前提：为其它对象提供一种代理方式对这个对象进行访问

优点：扩展性比较高，中介隔离，开闭原则

应用场景：spring aop

代理模式分为**静态代理**和**动态代理**，动态代理的实现可以分为**jdk的动态代理**和**cglib动态代理**。

#### 静态代理

1. 创建`PersonService`接口

   ```java
   package com.lz.basic.design.proxy;
   
   public interface PersonService {
   	
   	void say();
   
   }
   ```

2. 创建`PersonServiceImpl`实现接口

   ```java
   package com.lz.basic.design.proxy;
   
   public class PersonServiceImpl implements PersonService {
   
   	@Override
   	public void say() {
   		System.out.println("hello");
   	}
   
   }
   ```

3. 创建代理类`StaticProxyPersonService`实现接口

   ```java
   package com.lz.basic.design.proxy;
   
   public class StaticProxyPersonService implements PersonService {
   	
   	private PersonService personService;
   	
   	public StaticProxyPersonService(PersonService personService) {
   		this.personService = personService;
   	} 
   
   	@Override
   	public void say() {
   		System.out.println("调用方法之前");
   		personService.say();
   		System.out.println("调用方法之后");
   	}
   
   }
   ```

4. 测试

   ```java
   package com.lz.basic.design.proxy;
   
   public class StaticProxyTest {
   
   	public static void main(String[] args) {
   		PersonService personService = new PersonServiceImpl();
   		personService.say();
   		
   		StaticProxyPersonService staticProxyPersonService = new StaticProxyPersonService(personService);
   		staticProxyPersonService.say();
   	}
   
   }
   ```

运行结果

![静态代理运行结果](/basic/design/static_proxy.png)

说明：使用代理可以在调用方法前后做一些操作。

优点：可以在符合开闭原则下对现有功能进行扩展

缺点：需要为每一个类创建代理对象，工作量大且不易管理。

#### 动态代理

##### JDK动态代理

此代理方式针对接口进行代理，因为JAVA类只支持单继承，所有的类默认都继承了`Object`类。

1. 使用`PersonService`接口

2. 创建`JDKProxyPersonService`代理类

   ```java
   package com.lz.basic.design.proxy;
   
   import java.lang.reflect.InvocationHandler;
   import java.lang.reflect.Method;
   import java.lang.reflect.Proxy;
   
   public class JDKProxyPersonService implements InvocationHandler {
   
   	private Object object;
   
   	public JDKProxyPersonService(Object object) {
   		this.object = object;
   	}
   
   	/**
   	 * @param proxy    代理类
        * @param method   正在调用的方法
        * @param args     方法的参数
        * @return
   	 */
   	@Override
   	public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
   		System.out.println("方法执行之前");
   		Object result = method.invoke(object, args);
   		System.out.println("方法执行之后");
   		return result;
   	}
   
   	public Object getProxy() {
   		return Proxy.newProxyInstance(getClass().getClassLoader(), object.getClass().getInterfaces(), this);
   	}
   
   }
   ```

3. 测试

   ```java
   package com.lz.basic.design.proxy;
   
   public class JDKProxyTest {
   
   	public static void main(String[] args) {
   		PersonService personService = new PersonServiceImpl();
   		personService.say();
   		
   		JDKProxyPersonService proxyPersonService = new JDKProxyPersonService(personService);
   		PersonService proxy = (PersonService) proxyPersonService.getProxy();
   		proxy.say();
   		
   	}
   
   }
   ```

运行结果

![jdk代理运行结果](/basic/design/jdk_proxy.png)

说明：jdk动态代理解决了静态代理的缺点，不需要为每一个类都创建代理类

> 深度分析：  https://www.cnblogs.com/zuoxiaolong/p/pattern3.html 

##### CGLIB动态代理

此代理方式既可以支持类，也可以支持接口的代理。

对于类的代理主要是生成一个子类，覆盖其中的方法，因为使用的时继承的方法，方法不能定义为`private`和`final`，对于`private`和`final`定义的类和方法无法继承。

1. 使用`PersonService`接口

2. 导入cglib依赖

   ```xml
   <dependency>
       <groupId>cglib</groupId>
       <artifactId>cglib</artifactId>
       <version>3.1</version>
   </dependency>
   ```

3. 创建`CGLIBProxyPersonService`代理类

   ```java
   package com.lz.basic.design.proxy;
   
   import java.lang.reflect.Method;
   
   import net.sf.cglib.proxy.Enhancer;
   import net.sf.cglib.proxy.MethodInterceptor;
   import net.sf.cglib.proxy.MethodProxy;
   
   public class CGLIBProxyPersonService implements MethodInterceptor {
   
   	private Object object;
   
   	public CGLIBProxyPersonService(Object object) {
   		this.object = object;
   	}
   
   	/**
   	 * @param obj 代理的对象, 生成的子类 
   	 * @param method 当前的方法
   	 * @param args 方法参数
   	 * @param proxy cglib提供的JDK的java.lang.reflect.Method类的代理类，可以方便的实现对源对象方法的调用。
   	 * 
   	 */
   	@Override
   	public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Throwable {
   
   		System.out.println("方法执行之前");
   //		Object result = method.invoke(object, args);
   		
   		Object result = proxy.invokeSuper(obj, args); 
   		
   //		Object result = proxy.invoke(object, args);
   		
   		System.out.println("方法执行之后");
   		return result;
   		
   	}
   	
   	 public static Object getProxy(Object target) {
           Enhancer enhancer = new Enhancer();
           // 设置需要代理的对象
           enhancer.setSuperclass(target.getClass());
           // 设置代理人
           enhancer.setCallback(new CGLIBProxyPersonService(target));
           return enhancer.create();
       }
   
   }
   ```

4. 测试

   ```java
   package com.lz.basic.design.proxy;
   
   public class CGLIBProxyTest {
   
   	public static void main(String[] args) {
   		PersonService personService = new PersonServiceImpl();
   		personService.say();
   		
   		PersonService proxy = (PersonService) CGLIBProxyPersonService.getProxy(personService);
   		proxy.say();
   		
   	}
   
   }
   ```

运行结果

![cglib代理运行结果](/basic/design/cglib_proxy.png)

说明：cglib代理完善了jdk代理的功能。

##### 对比

1. Java动态代理只能够对接口进行代理，不能对普通的类进行代理（因为所有生成的代理类的父类为Proxy，Java类继承机制不允许多重继承）；CGLIB能够代理普通类；
2. Java动态代理使用Java原生的反射API进行操作，在生成类上比较高效；CGLIB使用ASM框架直接对字节码进行操作，在类的执行过程中比较高效

### Factory 工厂模式

#### 简单工厂模式

又称静态工厂方法模式。 **由一个工厂对象决定创建出哪一种产品类的实例** 

1. 创建产品接口

   ```java
   package com.lz.basic.design.factory;
   
   public interface IProduct {
   	
   	void name();
   
   }
   ```

2. 创建产品A

   ```java
   package com.lz.basic.design.factory;
   
   public class ProductA implements IProduct {
   
   	@Override
   	public void name() {
   		System.out.println("我是产品A");
   	}
   
   }
   ```

3. 创建产品B

   ```java
   package com.lz.basic.design.factory;
   
   public class ProductB implements IProduct {
   
   	@Override
   	public void name() {
   		System.out.println("我是产品B");
   	}
   
   }
   ```

4. 创建产品工厂

   ```java
   package com.lz.basic.design.factory;
   
   public class StaticProductFactory {
   
   	public static IProduct createProduct(String name) throws Exception {
   		if (name == null)
   			return null;
   
   		if (name.equals("A")) {
   			return new ProductA();
   		} else if (name.equals("B")) {
   			return new ProductB();
   		} else {
   			return null;
   		}
   	}
   
   }
   ```

5. 测试

   ```java
   package com.lz.basic.design.factory;
   
   public class StaticProductFactoryTest {
   
   	public static void main(String[] args) throws Exception {
   
   		IProduct productA = StaticProductFactory.createProduct("A");
   		productA.display();
   		
   		IProduct productB = StaticProductFactory.createProduct("B");
   		productB.display();
   
   	}
   
   }
   ```

优点：调用者创建对象只需要知道名称就可以；如果想要扩展一个产品，只需要添加一个产品类；屏蔽了产品的具体实现，调用着只关心产品的接口

缺点：每增加一个产品，都会增加一个产品类和修改工厂的创建方法。违反了**开关原则**。

#### 工厂方法模式

定义一个创建产品对象的工厂接口，将实际的创建工作下分到子类中。核心工厂类不在负责产品的创建，仅负责具体工厂子类必须要实现的接口，这样可以保证不修改具体工厂角色的情况下进行新产品的添加。弥补了静态工厂方法的不足之处。

1. 产品接口和产品类保持不变 `IProduct`，`ProductA`，`ProductB`

2. 创建工厂接口

   ```java
   package com.lz.basic.design.factory;
   
   public interface IProductFactory {
   
   	IProduct createProduct();
   	
   }
   ```

3. 具体的产品工厂

   ```java
   package com.lz.basic.design.factory;
   
   public class ProductAFactory implements IProductFactory {
   
   	@Override
   	public IProduct createProduct() {
   		return new ProductA();
   	}
   
   }
   ```

   ```java
   package com.lz.basic.design.factory;
   
   public class ProductBFactory implements IProductFactory {
   
   	@Override
   	public IProduct createProduct() {
   		return new ProductB();
   	}
   
   }
   ```

4. 测试

   ```java
   package com.lz.basic.design.factory;
   
   public class IProductFactoryTest {
   
   	public static void main(String[] args) throws Exception {
   
   		IProductFactory productAFactory = new ProductAFactory();
   		IProduct productA = productAFactory.createProduct();
   		productA.display();
   
   		IProductFactory productBFactory = new ProductBFactory();
   		IProduct productB = productBFactory.createProduct();
   		productB.display();
   
   	}
   
   }
   ```

优点：弥补了静态工厂的不足，满足了开闭原则。需要增加产品时，只需要增加产品类和产品工厂，不需要修改现有的代码。

缺点：如果产品数量过多，需要一一实现，无疑会增加系统的复杂性。

#### 抽象工厂模式

对工厂方法模式的一种扩展。 它与工厂方法唯一的区别就是工厂的接口里是一系列创造抽象产品的方法，而不再是一个，而相应的，抽象产品也不再是一个了，而是一系列相关的产品 。

1. 产品接口和产品类保持不变 `IProduct`，`ProductA`，`ProductB`

2. 添加汽车接口和实现汽车类

   ```java
   package com.lz.basic.design.factory;
   
   public interface ICar {
   	
   	void display();
   
   }
   ```

   ```java
   package com.lz.basic.design.factory;
   
   public class CarA implements ICar {
   
   	@Override
   	public void display() {
   		System.out.println("我是汽车A");
   	}
   
   }
   ```

   ```java
   package com.lz.basic.design.factory;
   
   public class CarB implements ICar {
   
   	@Override
   	public void display() {
   		System.out.println("我是汽车B");
   	}
   
   }
   ```

3. 创建抽象工厂

   ```java
   package com.lz.basic.design.factory;
   
   public abstract class AbstractFactory {
   
   	abstract IProduct createProduct();
   	
   	abstract ICar createCar();
   }
   ```

   ```java
   package com.lz.basic.design.factory;
   
   public class AbstractAFactory extends AbstractFactory {
   
   	@Override
   	IProduct createProduct() {
   		return new ProductA();
   	}
   
   	@Override
   	ICar createCar() {
   		return new CarA();
   	}
   
   }
   ```

   ```java
   package com.lz.basic.design.factory;
   
   public class AbstractBFactory extends AbstractFactory {
   
   	@Override
   	IProduct createProduct() {
   		return new ProductB();
   	}
   
   	@Override
   	ICar createCar() {
   		return new CarB();
   	}
   
   }
   ```

4. 测试

   ```java
   package com.lz.basic.design.factory;
   
   public class AbstractFactoryTest {
   
   	public static void main(String[] args) throws Exception {
   
   		AbstractFactory factoryA = new AbstractAFactory();
   		factoryA.createProduct().display();
   		factoryA.createCar().display();
   
   		AbstractFactory factoryB = new AbstractBFactory();
   		factoryB.createProduct().display();
   		factoryB.createCar().display();
   
   	}
   
   }
   ```

优点：多个产品被用来一起工作，可以保证客户端始终只是用一种工厂的对象

缺点：扩展很困难，如果需要在工厂中添加一系列产品，违反了开闭原则

### Singleton 单例模式

前提：整个应用中，同一时刻，有且只有一种状态

优点：节省内存空间，减少无谓的GC消耗

应用场景：配置信息

#### 方式一

也称**懒汉模式**。

```java
package com.lz.basic.design.singleton;

public class SingleTon_one {
	
	private static SingleTon_one singleton; // 1
	
	private SingleTon_one() {} // 2
	
	public static SingleTon_one getInstance() { // 3
		if(singleton == null) { // 4
			singleton = new SingleTon_one();
		}
		return singleton;
	}
	
}
```

不考虑**并发**情况下的单例模式。

说明： 

1. 静态实例，带有`static`关键字的属性在每一个类中都是唯一的
2. 限制客户端随意创造实例，即私有化构造方法
3. 开放一个公共获取实例的静态方法，必须是静态的方法，如果是非静态方法必须实例才可调用
4. 只有当静态属性为`null`时，才调用构造方法创建实例，否则直接返回实例 

对方式一进行并发测试：

```java
package com.lz.basic.design.singleton;

import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class SingleTon_one_test {

	private static ExecutorService executor = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors());

	private static int threadNum = 1000;

	private static CountDownLatch countDownLatch = new CountDownLatch(threadNum);

	private static CopyOnWriteArrayList<SingleTon_one> list = new CopyOnWriteArrayList<SingleTon_one>();

	public static void main(String[] args) throws InterruptedException {

		for (int i = 0; i < threadNum; i++) {
			executor.execute(new Runnable() {
				public void run() {
					SingleTon_one instance = SingleTon_one.getInstance();
					list.add(instance);
				}
			});
			countDownLatch.countDown();
		}

		countDownLatch.await();

		list.forEach(t -> {
			System.out.println(t);
		});
		
		executor.shutdown();

	}

}
```

说明：根据电脑的配置，开启了1000个线程去访问`getInstance()`方法，结果如下

![运行结果](/basic/design/1574156092.jpg)

造成上图结果的原因是，当并发情况下，前一个线程对象还没有实例化完成，另一个线程就去进行判断，实例不存在，也会去进行实例化操作。

#### 方式二

为了解决并发访问的问题，最简单的就是给方法上添加`synchronized`关键字。

```java
package com.lz.basic.design.singleton;

public class SingleTon_two {

	private static SingleTon_two singleton;
	
	private SingleTon_two() {}
	
	public synchronized static SingleTon_two getInstance() {
		if(singleton == null) {
			singleton = new SingleTon_two();
		}
		return singleton;
	}
	
}
```

说明：这样解决了并发下的问题，但是造成了不必要的等待

#### 方式三

对方式二进行优化，使用**双重加锁**

```java
package com.lz.basic.design.singleton;

public class SingleTon_three {

	private static SingleTon_three singleton;

	private SingleTon_three() {
	}

	public static SingleTon_three getInstance() {
		if (singleton == null) {
			synchronized (SingleTon_three.class) { // 类锁
				if (singleton == null) {
					singleton = new SingleTon_three();
				}
			}
		}
		return singleton;
	}
	
	//扩展
	synchronized public void testObject() {} //对象锁  不同实例存在不同的锁   
	
	public void testObject_one() {
		synchronized (this) { // 对象锁
			
		}
	}
	
	synchronized public static void testClass() {} //类锁，static 方法加上锁变成类锁  有且只有一把锁   

	public void testClass_one() {
		synchronized (SingleTon_three.class) { // 类锁
			
		}
	}
}
```

说明：只是在实例还未创建的时候进行同步。

ps：为什么要在同步代码块再次进行判断？

有可能多个线程同时进入第一个判断，在同步代码块外等待先进入的线程结束，如果不在同步代码块中再次进行判断，会创建新的实例对象。

探索：深入到jvm中去分析方式三的代码，也可能存在问题。jvm在执行创建实例的时候是分好几个步骤执行的，并非是原子性的操作。

jvm创建对象：1. 分配内存 2. 初始化构造器 3.将对象指向分配的内存地址

按照创建对象的顺序，方式三是没有问题的。但是如果2，3顺序调换（jvm对字节码调优，也就是指令重排序），就会出现问题。在进行对象构造之前先将内存地址分配给`singleton`，这时后面的线程会认为当前对象已经存在，直接返回引用就会造成错误。

#### *方式四

针对于方式三，将任务交给jvm执行，以解决问题。最推荐的一种方式

```java
package com.lz.basic.design.singleton;

public class SingleTon_four {

	private SingleTon_four() {}
	
	public static SingleTon_four getInstance() {
		return SingletonInstance.singleton;
	}
	
	public static class SingletonInstance{
		
		private static SingleTon_four singleton = new SingleTon_four();
		
	}
	
}
```

说明：一个类的静态属性只会在第一次加载类时初始化，这是jvm保证的。

- 最多只有一个实例，不考虑反射的情况
- 并发下，不会产生多个实例
- 并发下，不会因为尚未初始化完成造成使用了未初始化完成的实例

#### ~~方式五~~

俗称的**饿汉式加载**。

```java
package com.lz.basic.design.singleton;

public class SingleTon_five {

	private static SingleTon_five singleton = new SingleTon_five();

	private SingleTon_five() {
	}

	public static SingleTon_five getInstance() {
		return singleton;
	}

}
```

说明：对比方式四，没有使用内部类，这样会造成，访问该类的其它静态域时，就会进行实例初始化操作，造成内存的浪费。

#### ~~方式六~~

优化方式三。就是对静态属性添加`volatile`关键字，保证指令不会重排序，所有线程都是可见的。

```java
package com.lz.basic.design.singleton;

public class SingleTon_six {

	private volatile static SingleTon_six singleton;

	private SingleTon_six() {
	}

	public static SingleTon_six getInstance() {
		if (singleton == null) {
			synchronized (SingleTon_six.class) { // 类锁
				if (singleton == null) {
					singleton = new SingleTon_six();
				}
			}
		}
		return singleton;
	}
}

```

### Delegate 委派模式

简介：委派模式不属于23种设计模式，主要的角色分为抽象、委派者和具体的执行

优点：对外隐藏了具体的实现，仅将**委派者**暴露给外部

实例：spring 的 DispatcherServlet 

1. 定义抽象角色

   ```java
   package com.lz.basic.design.delegate;
   
   public interface ITask {
   
   	void doTask(String command);
   	
   }
   ```

2. 定义委派者角色

   ```java
   package com.lz.basic.design.delegate;
   
   import java.util.HashMap;
   import java.util.Map;
   
   public class DelegateTask implements ITask {
   	// 通过map进行任务调度
   	private static Map<String, ITask> taskMap = new HashMap<>();
   
   	public DelegateTask() {
   		taskMap.put("A", new TaskA());
   		taskMap.put("B", new TaskB());
   	}
   
   	@Override
   	public void doTask(String command) {
   		taskMap.get(command).doTask(command);
   	}
   
   }
   ```

3. 具体的执行角色

   ```java
   package com.lz.basic.design.delegate;
   
   public class TaskA implements ITask {
   
   	@Override
   	public void doTask(String command) {
   		System.out.println("A执行任务：" + command);
   	}
   
   }
   ```

   ```java
   package com.lz.basic.design.delegate;
   
   public class TaskB implements ITask {
   
   	@Override
   	public void doTask(String command) {
   		System.out.println("B执行任务：" + command);
   	}
   
   }
   ```

4. 测试

   ```java
   package com.lz.basic.design.delegate;
   
   public class DelegateTaskTest {
   
   	/**
   	 ** 客户请求（Boss）、委派者(Leader)、被委派者（ITarget）
        ** 委派者要持有被委派者的引用
        ** 代理模式：注重的是过程   委派模式注重的是结果
        ** 策略模式注重的是扩展(外部扩展)，委派模式注重的是内部的灵活和复用。
        */
   	public static void main(String[] args) {
   
   		new DelegateTask().doTask("A");
   		new DelegateTask().doTask("B");
   	}
   }
   ```

总结：委派模式对内隐藏实现, 易于扩展; 简化调用; 委派类是委派模式的核心。

### Strategy 策略模式

简介：定义了一组算法，将每个算法都封装起来，彼此之间可以相互替换

优点：简化重复的判断，便于扩展，算法可以自由切换

缺点：策略类可能很多，都需要对外暴露接口（如果系统中策略类多余4个，可以考虑**混合模式**）

1. 创建策略接口

   ```JAVA
   package com.lz.basic.design.strategy;
   
   public interface Strategy {
   
   	void excute();
   	
   }
   ```

2. 策略A。策略B实现

   ```java
   package com.lz.basic.design.strategy;
   
   public class StrategyA implements Strategy {
   
   	@Override
   	public void excute() {
   		System.out.println("A策略执行");
   	}
   
   }
   ```

   ```java
   package com.lz.basic.design.strategy;
   
   public class StrategyB implements Strategy {
   
   	@Override
   	public void excute() {
   		System.out.println("B策略执行");
   	}
   
   }
   ```

3. 构造上下文对象，进行接口暴露

   ```java
   package com.lz.basic.design.strategy;
   
   public class Context {
   
   	private final Strategy strategy;
   
   	public Context(Strategy strategy) {
   		this.strategy = strategy;
   	}
   	
   	public void doExcute() {
   		strategy.excute();
   	}
   	
   }
   ```

4. 测试

   ```java
   package com.lz.basic.design.strategy;
   
   public class StrategyTest {
   
   	public static void main(String[] args) {
   		Context contextA = new Context(new StrategyA());
   		contextA.doExcute();
   		
   		Context contextB = new Context(new StrategyB());
   		contextB.doExcute();
   	}
   }
   ```

> 深入： https://www.cnblogs.com/zuoxiaolong/p/pattern8.html 

### Prototype 原型模式

简介：创建重复的对象，保证性能

优点：避免构造函数，提高性能

缺点：对于已存在的类，如果包含循环结构或者没有实现串行化的引用；必须实现`cloneable`

### Template 模板模式

简介：父类定义一个框架，具体实现由子类实现

优点：封装不变部分，扩展可变部分；行为由父类控制，子类实现

缺点：每一个不同的实现都需要一个子类实现

1. 先定义抽象模板类，控制行为

   ```java
   package com.lz.basic.design.template;
   
   public abstract class ProductTemplate {
   	
   	abstract void stepOne();
   	
   	abstract void stepTwo();
   	
   	public void doStep() {
   		stepOne();
   		stepTwo();
   	}
   
   }
   ```

2. 实现模板类定义的行为

   ```java
   package com.lz.basic.design.template;
   
   public class ProductA extends ProductTemplate {
   
   	@Override
   	void stepOne() {
   		System.out.println("product A step one");
   	}
   
   	@Override
   	void stepTwo() {
   		System.out.println("product A step two");		
   	}
   
   
   }
   ```

   ```java
   package com.lz.basic.design.template;
   
   public class ProductB extends ProductTemplate {
   
   	@Override
   	void stepOne() {
   		System.out.println("product B step one");
   	}
   
   	@Override
   	void stepTwo() {
   		System.out.println("product B step two");		
   	}
   }
   ```

3. 测试

   ```java
   package com.lz.basic.design.template;
   
   public class TemplateTest {
   
   	public static void main(String[] args) {
   		
   		ProductTemplate productA = new ProductA();
   		productA.doStep();
   		
   		
   		ProductTemplate productB = new ProductB();
   		productB.doStep();
   		
   		
   	}
   }
   ```

   