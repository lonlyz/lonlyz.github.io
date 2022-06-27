# ArrayList

> 基于**JDK1.8**进行分析

## 简介
实现List接口的一个可变数组，元素内容可以为空。除了实现List接口外，还提供了一些方法来操纵内部用于存储列表数组的大小。与Vector大致相等，但不是同步的。

## 类图

![类图](/basic/arraylist/class.png)

从上图可以得知：
1. 继成AbstractList类，实现了List接口。是一个动态数组，提供了增、删、改和遍历的功能。
2. 实现RandomAccess接口提供了随机访问的功能。
3. 实现Cloneable接口可以进行克隆。
4. 实现Serializable接口可以进行序列化，进行序列化传输。

## 源码分析

前提：

System提供了一个静态方法arraycopy(),我们可以使用它来实现数组之间的复制。其函数原型是：

```java
/**
* @param      src      the source array. 源数组
* @param      srcPos   starting position in the source array. 源数组的起始位置
* @param      dest     the destination array. 目标数组
* @param      destPos  starting position in the destination data. 目标数组的起始位置
* @param      length   the number of array elements to be copied. 复制的长度
*/
public static native void arraycopy(Object src,  int  srcPos,
                                        Object dest, int destPos,
                                        int length);
```

- 属性

  ```java
  /**
       * Default initial capacity.
       * 默认的初始容量
       */
      private static final int DEFAULT_CAPACITY = 10;
  
      /**
       * Shared empty array instance used for empty instances.
       * 空实例的共享空数组对象实例
       */
      private static final Object[] EMPTY_ELEMENTDATA = {};
  
      /**
       * Shared empty array instance used for default sized empty instances. We
       * distinguish this from EMPTY_ELEMENTDATA to know how much to inflate when
       * first element is added.
       * 共享的数组对象被用于默认大小空对象的实例。区分于EMPTY_ELEMENTDATA，知道需要扩容多少 ，当添加元
       * 素的时候
       */
      private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {};
  
      /**
       * The array buffer into which the elements of the ArrayList are stored.
       * The capacity of the ArrayList is the length of this array buffer. Any
       * empty ArrayList with elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA
       * will be expanded to DEFAULT_CAPACITY when the first element is added.
       * 
       * 存储ArrayList元素的数组缓冲区，ArrayList的大小就是数组缓冲区的容量。
       * 当任何空的ArrayList满足elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA条件，在添加初始元素时，会
       * 设置默认的扩容属性
       * 
       */
      transient Object[] elementData; // non-private to simplify nested class access
  
      /**
       * The size of the ArrayList (the number of elements it contains).
       * ArrayList的大小
       *
       * @serial
       */
      private int size;
  ```

- 构造方法

  ```java
   /**
       * Constructs an empty list with the specified initial capacity.
       * 
       * 带有初始容量的构造函数
       *
       * @param  initialCapacity  the initial capacity of the list
       * @throws IllegalArgumentException if the specified initial capacity
       *         is negative
       */
      public ArrayList(int initialCapacity) {
          if (initialCapacity > 0) { //初始容量大于0，实例一个新对象数组
              this.elementData = new Object[initialCapacity];
          } else if (initialCapacity == 0) { //初始容量等于0，返回一个空对象数组
              this.elementData = EMPTY_ELEMENTDATA;
          } else {
              //初始容量小于0，提示异常，参数不合法
              throw new IllegalArgumentException("Illegal Capacity: "+
                                                 initialCapacity);
          }
      }
  
      /**
       * Constructs an empty list with an initial capacity of ten.
       * 使用默认构造容量，构建ArrayList对象，并且在添加第一个元素时，就会设置扩容量为默认的扩容量
       * 
       */
      public ArrayList() {
          this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
      }
  
      /**
       * Constructs a list containing the elements of the specified
       * collection, in the order they are returned by the collection's
       * iterator.
       *
       * @param c the collection whose elements are to be placed into this list
       * @throws NullPointerException if the specified collection is null
       */
      public ArrayList(Collection<? extends E> c) {
          //集合转成对象数组
          elementData = c.toArray(); 
          if ((size = elementData.length) != 0) {
              //如果集合中存在元素
              // c.toArray might (incorrectly) not return Object[] (see 6260652)
              //转换的数组对象是不是Object类型的
              if (elementData.getClass() != Object[].class)
                  elementData = Arrays.copyOf(elementData, size, Object[].class);//将集合元素转成Object类型
          } else {
               //如果集合中不存在元素
              // replace with empty array.
              this.elementData = EMPTY_ELEMENTDATA;
          }
      }
  ```

- 方法

  **add(e)**：

  ```java
  public boolean add(E e) {
          // 确认容量
          ensureCapacityInternal(size + 1);  // Increments modCount!!
          // 直接将元素添加在数组中
          elementData[size++] = e;
          return true;
  }
  
   private void ensureCapacityInternal(int minCapacity) {
      // 进一步确认ArrayList的容量，看是否需要进行扩容
      ensureExplicitCapacity(calculateCapacity(elementData, minCapacity));
  }
  
  private static int calculateCapacity(Object[] elementData, int minCapacity) {
     // 如果elementData为空，则返回默认容量和minCapacity中的最大值
     if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
          return Math.max(DEFAULT_CAPACITY, minCapacity);
      }
      // 否则直接返回minCapacity
      return minCapacity;
  }
  
   private void ensureExplicitCapacity(int minCapacity) {
          // 修改次数自增
          modCount++;
  
          // overflow-conscious code
          // 判断是否需要扩容,双重校验，防止数组下表越界
          if (minCapacity - elementData.length > 0)
              grow(minCapacity);
   }
  
  private void grow(int minCapacity) {
      // overflow-conscious code
      // 原容量
      int oldCapacity = elementData.length;
      // 扩容，相当于扩大为原来的1.5倍
      int newCapacity = oldCapacity + (oldCapacity >> 1);
      // 确认最终容量
      if (newCapacity - minCapacity < 0)
          newCapacity = minCapacity;
      if (newCapacity - MAX_ARRAY_SIZE > 0)
          newCapacity = hugeCapacity(minCapacity);
      // minCapacity is usually close to size, so this is a win:
      // 将旧数据拷贝到新数组中
      elementData = Arrays.copyOf(elementData, newCapacity);
  }
  ```

  分析：触发扩容的条件，如果添加的元素比当前的数组多，就会触发扩容。因此在循环中使用时，避免重复扩容造成OOM异常。

  建议：初始化的时候就设置好扩容量，可以避免OOM异常。

  **add(int index, E element)**：

  ```java
  public void add(int index, E element) {
          // 越界检查
          rangeCheckForAdd(index);
  
          // 确认容量
          ensureCapacityInternal(size + 1);  // Increments modCount!!
          // 将index及其之后的元素往后移动一位，将index位置空出来
          System.arraycopy(elementData, index, elementData, index + 1,
                           size - index);
          // 在index插入元素
          elementData[index] = element;
          // 元素个数自增
          size++;
      }
  ```

  **get(index)**:

  ```java
  public E get(int index) {
      // 越界检查
      rangeCheck(index);
      // 获取对应位置上的数据
      return elementData(index);
  }
  
  private void rangeCheck(int index) {
      if (index >= size)
          throw new IndexOutOfBoundsException(outOfBoundsMsg(index));
  }
  
  E elementData(int index) {
      return (E) elementData[index];
  }
  ```

  **remove(index)**:

  ```java
  public E remove(int index) {
      // 越界检查
      rangeCheck(index);
  
      // 修改次数自增
      modCount++;
      // 获取对应index上的元素
      E oldValue = elementData(index);
  
      // 判断index是否在最后一个位置
      int numMoved = size - index - 1;
      // 如果不是，则需要将index之后的元素往前移动一位
      if (numMoved > 0)
          System.arraycopy(elementData, index+1, elementData, index,
                           numMoved);
      // 将最后一个元素删除，帮助GC
      elementData[--size] = null; // clear to let GC do its work
  
      return oldValue;
  }
  ```

  **remove(o)**:

  ```java
  public boolean remove(Object o) {
      // 如果被移除元素为null
      if (o == null) {
          // 循环遍历
          for (int index = 0; index < size; index++)
              // 注意这里判断null是用的“==”
              if (elementData[index] == null) {
                  // 快速remove元素
                  fastRemove(index);
                  return true;
              }
      } else {
          for (int index = 0; index < size; index++)
              // 这里判断相等是用的equals方法，注意和上面对比
              if (o.equals(elementData[index])) {
                  fastRemove(index);
                  return true;
              }
      }
      return false;
  }
  
  private void fastRemove(int index) {
      // 注意这里并未做越界检查，毕竟叫fastRemove
      // 修改次数自增
      modCount++;
      // 判断是否是最后一个元素，这里的操作和remove(index)是一样的
      int numMoved = size - index - 1;
      if (numMoved > 0)
          System.arraycopy(elementData, index+1, elementData, index,
                           numMoved);
      elementData[--size] = null; // clear to let GC do its work
  }
  ```

  **addAll(c)**:

  ```java
  public boolean addAll(Collection<? extends E> c) {
          Object[] a = c.toArray();
          int numNew = a.length;
          //确认扩容的大小，并进行数组的扩容
          ensureCapacityInternal(size + numNew);  // Increments modCount
          //将元素追加到最后
          System.arraycopy(a, 0, elementData, size, numNew);
          //赋值最新的元素长度
          size += numNew;
          return numNew != 0;
      }
  ```

  分析：addAll 求并集，和add(e) 方法类似。

  **retainAll(c)**:

  ```java
  public boolean retainAll(Collection<?> c) {
      // 判空
      Objects.requireNonNull(c);
      // 批量remove complement为true表示保存包含在c集合的元素，这样就求出交集了
      return batchRemove(c, true);
  }
  
  private boolean batchRemove(Collection<?> c, boolean complement) {
          final Object[] elementData = this.elementData;
          // 读写指针 读指针遍历，写指针只有在条件符合时才自增，这样不需要额外的空间
          int r = 0, w = 0;
          boolean modified = false;
          try {
              // 遍历
              for (; r < size; r++)
                  // 如果c集合中包含遍历元素，则把元素放入写指针位置(以complement为准)
                  if (c.contains(elementData[r]) == complement)
                      elementData[w++] = elementData[r];
          } finally {
              // Preserve behavioral compatibility with AbstractCollection,
              // even if c.contains() throws.
              // 正常情况下，r与size是相等的，这里是对异常的判断
              if (r != size) {
                  // 将未读的元素拷贝到写指针后面
                  System.arraycopy(elementData, r,
                                   elementData, w,
                                   size - r);
                  w += size - r;
              }
              // 将写指针后的元素全部置空
              if (w != size) {
                  // clear to let GC do its work
                  for (int i = w; i < size; i++)
                      elementData[i] = null;
                  modCount += size - w;
                  size = w;
                  modified = true;
              }
          }
          return modified;
      }
  ```

  分析：retainAll 求交集，使用读写指针进行操作，不占用额外空间；并且使用finally 处理异常和置空情况。

  **removeAll(c)**:

  ```java
  public boolean removeAll(Collection<?> c) {
          Objects.requireNonNull(c);
          return batchRemove(c, false); //complement=false,  保留不在c容器种的元素
      }
  ```

  分析：removeAll求差集，是单向差集，返回集合 **c** 中没有的元素。

## 总结

1. ArrayList内部使用数组存储元素(连续的内存空间)，默认容量是10，并且支持存储null值；
2. ArrayList添加的元素长度大于当前长度时，会进行1.5倍的扩容(不会缩容)；
3. ArrayList支持随机访问，通过索引访问元素极快，时间复杂度为O(1);
4. ArrayList在尾部添加/删除元素极快，时间复杂度为O(1);
5. ArrayList在中间添加/删除元素比较慢，因为要进行元素的移动，时间复杂度为O(n);
6. ArrayList支持并集，交集和单向差集。

