# HashMap

> 基于**JDK1.8**进行分析

## 简介
基于哈希表的Map实现，以key-value存储形式存在，允许存储null，不保证同步。底层是数组+链表+红黑树构成。

## 类图

![类图](/basic/hashmap/class.png)

从上图可以得知：
1. 实现Map接口(哈希表，也称散列表)，将数据以key-value的形式进行存储，方便数据的查找和获取。
3. 实现Cloneable接口可以进行克隆。
4. 实现Serializable接口可以进行序列化，进行序列化传输。

## 源码分析

- 属性

  ```java
   /**
       * The default initial capacity - MUST be a power of two.
       * 默认的初始容量
       */
      static final int DEFAULT_INITIAL_CAPACITY = 1 << 4; // aka 16
  
      /**
       * The maximum capacity, used if a higher value is implicitly specified
       * by either of the constructors with arguments.
       * MUST be a power of two <= 1<<30.
       * 最大的容量值，当通过构造方法传递的初始容量值比该值大，使用该值
       */
      static final int MAXIMUM_CAPACITY = 1 << 30;
  
      /**
       * The load factor used when none specified in constructor.
       * 构造方法未指定时使用的加载因子
       */
      static final float DEFAULT_LOAD_FACTOR = 0.75f;
  
      /**
       * The bin count threshold for using a tree rather than list for a
       * bin.  Bins are converted to trees when adding an element to a
       * bin with at least this many nodes. The value must be greater
       * than 2 and should be at least 8 to mesh with assumptions in
       * tree removal about conversion back to plain bins upon
       * shrinkage.
       * 链表转红黑树的阀值
       */
      static final int TREEIFY_THRESHOLD = 8;
  
      /**
       * The bin count threshold for untreeifying a (split) bin during a
       * resize operation. Should be less than TREEIFY_THRESHOLD, and at
       * most 6 to mesh with shrinkage detection under removal.
       * 红黑树转链表的阀值
       */
      static final int UNTREEIFY_THRESHOLD = 6;
  
      /**
       * The smallest table capacity for which bins may be treeified.
       * (Otherwise the table is resized if too many nodes in a bin.)
       * Should be at least 4 * TREEIFY_THRESHOLD to avoid conflicts
       * between resizing and treeification thresholds.
       * 最小化树形容量阈值，当哈希表中的值大于该值时，才允许链表转红黑树，否则若元素太多直接扩容
       * 为避免扩容和树形化的冲突，这个值不能小于4 * TREEIFY_THRESHOLD
       */
      static final int MIN_TREEIFY_CAPACITY = 64;
  
      /**
       * Basic hash bin node, used for most entries.  (See below for
       * TreeNode subclass, and in LinkedHashMap for its Entry subclass.)
       */
      // 重写hashcode,equals 
      static class Node<K,V> implements Map.Entry<K,V> {
          final int hash;
          final K key;
          V value;
          Node<K,V> next;
  
          Node(int hash, K key, V value, Node<K,V> next) {
              this.hash = hash;
              this.key = key;
              this.value = value;
              this.next = next;
          }
  
          public final K getKey()        { return key; }
          public final V getValue()      { return value; }
          public final String toString() { return key + "=" + value; }
  
          public final int hashCode() {
              //对key 和 value 的hashcode进行按位异或
              return Objects.hashCode(key) ^ Objects.hashCode(value);
          }
  
          public final V setValue(V newValue) {
              V oldValue = value;
              value = newValue;
              return oldValue;
          }
  
          public final boolean equals(Object o) {
              if (o == this)
                  return true;
              if (o instanceof Map.Entry) {
                  Map.Entry<?,?> e = (Map.Entry<?,?>)o;
                  if (Objects.equals(key, e.getKey()) &&
                      Objects.equals(value, e.getValue()))
                      return true;
              }
              return false;
          }
      }
  
      /* ---------------- Static utilities -------------- */
  
      /**
       * Computes key.hashCode() and spreads (XORs) higher bits of hash
       * to lower.  Because the table uses power-of-two masking, sets of
       * hashes that vary only in bits above the current mask will
       * always collide. (Among known examples are sets of Float keys
       * holding consecutive whole numbers in small tables.)  So we
       * apply a transform that spreads the impact of higher bits
       * downward. There is a tradeoff between speed, utility, and
       * quality of bit-spreading. Because many common sets of hashes
       * are already reasonably distributed (so don't benefit from
       * spreading), and because we use trees to handle large sets of
       * collisions in bins, we just XOR some shifted bits in the
       * cheapest possible way to reduce systematic lossage, as well as
       * to incorporate impact of the highest bits that would otherwise
       * never be used in index calculations because of table bounds.
       */
      static final int hash(Object key) {
          int h;
          return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
      }
  
      /**
       * Returns x's Class if it is of the form "class C implements
       * Comparable<C>", else null.
       */
      static Class<?> comparableClassFor(Object x) {
          if (x instanceof Comparable) {
              Class<?> c; Type[] ts, as; Type t; ParameterizedType p;
              if ((c = x.getClass()) == String.class) // bypass checks
                  return c;
              if ((ts = c.getGenericInterfaces()) != null) {
                  for (int i = 0; i < ts.length; ++i) {
                      if (((t = ts[i]) instanceof ParameterizedType) &&
                          ((p = (ParameterizedType)t).getRawType() ==
                           Comparable.class) &&
                          (as = p.getActualTypeArguments()) != null &&
                          as.length == 1 && as[0] == c) // type arg is c
                          return c;
                  }
              }
          }
          return null;
      }
  
      /**
       * Returns k.compareTo(x) if x matches kc (k's screened comparable
       * class), else 0.
       */
      @SuppressWarnings({"rawtypes","unchecked"}) // for cast to Comparable
      static int compareComparables(Class<?> kc, Object k, Object x) {
          return (x == null || x.getClass() != kc ? 0 :
                  ((Comparable)k).compareTo(x));
      }
  
      /**
       * Returns a power of two size for the given target capacity.
       */
      static final int tableSizeFor(int cap) {
          int n = cap - 1;
          n |= n >>> 1;
          n |= n >>> 2;
          n |= n >>> 4;
          n |= n >>> 8;
          n |= n >>> 16;
          return (n < 0) ? 1 : (n >= MAXIMUM_CAPACITY) ? MAXIMUM_CAPACITY : n + 1;
      }
  
      /* ---------------- Fields -------------- */
  
      /**
       * The table, initialized on first use, and resized as
       * necessary. When allocated, length is always a power of two.
       * (We also tolerate length zero in some operations to allow
       * bootstrapping mechanics that are currently not needed.)
       */
      transient Node<K,V>[] table;
  
      /**
       * Holds cached entrySet(). Note that AbstractMap fields are used
       * for keySet() and values().
       */
      transient Set<Map.Entry<K,V>> entrySet;
  
      /**
       * The number of key-value mappings contained in this map.
       */
      transient int size;
  
      /**
       * The number of times this HashMap has been structurally modified
       * Structural modifications are those that change the number of mappings in
       * the HashMap or otherwise modify its internal structure (e.g.,
       * rehash).  This field is used to make iterators on Collection-views of
       * the HashMap fail-fast.  (See ConcurrentModificationException).
       */
      transient int modCount;
  
      /**
       * The next size value at which to resize (capacity * load factor).
       *
       * @serial
       */
      // (The javadoc description is true upon serialization.
      // Additionally, if the table array has not been allocated, this
      // field holds the initial array capacity, or zero signifying
      // DEFAULT_INITIAL_CAPACITY.)
      int threshold;
  
      /**
       * The load factor for the hash table.
       *
       * @serial
       */
      final float loadFactor;
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

