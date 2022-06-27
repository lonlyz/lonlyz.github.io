# LinkedList

> 基于**JDK1.8**进行分析

## 简介
集成AbstractSequentialList的一个双向链表，实现了Deque接口，也可以作为双向队列，但不是同步的。

## 类图

![类图](/basic/linkedlist/class.png)

从上图可以得知：
1. 继成AbstractSequentialList类，实现了List接口。是一个双向链表，提供了增、删、改和遍历的功能。
2. 实现Deque接口提供了作为双向队列的功能。
3. 实现Cloneable接口可以进行克隆。
4. 实现Serializable接口可以进行序列化，进行序列化传输。

## 源码分析

- 属性

  ```java
      // 元素数量，也就是当前存储的位置
  	transient int size = 0;
  
      /**
       * Pointer to first node.
       * 首节点指针
       * Invariant: (first == null && last == null) ||
       *            (first.prev == null && first.item != null)
       */
      transient Node<E> first;
  
      /**
       * Pointer to last node.
       * 尾节点指针
       * Invariant: (first == null && last == null) ||
       *            (last.next == null && last.item != null)
       */
      transient Node<E> last;
  ```
  
- 构造方法

  ```java
   /**
       * Constructs an empty list.
       */
      public LinkedList() {
      }
  
      /**
       * Constructs a list containing the elements of the specified
       * collection, in the order they are returned by the collection's
       * iterator.
       *
       * @param  c the collection whose elements are to be placed into this list
       * @throws NullPointerException if the specified collection is null
       */
      public LinkedList(Collection<? extends E> c) {
          // 先构建空对象
          this();
          // 在将初始化的数据添加到对象中
          addAll(c);
      }
  ```
  
- 方法

  **add(e)**：

  ```java
  public boolean add(E e) {
          //将元素追加到最后
          linkLast(e);
          return true;
  }
  
  /**
    * Links e as last element.
    */
  void linkLast(E e) {
      // 先获取当前对象最后的节点
      final Node<E> l = last;
      // 构造出一个新节点，将当前对象最后的节点当作新节点的上一个节点
      final Node<E> newNode = new Node<>(l, e, null);
      // 将新节点设置为对象的最后节点
      last = newNode;
      if (l == null) //如果不存在最后节点，那么就将新节点设置为开始节点
          first = newNode;
      else
          l.next = newNode; //设置最后节点的下一个节点为新节点
      //增加节点长度
      size++;
      //改变修改次数
      modCount++;
  }
  
  private static class Node<E> {
      E item;
      Node<E> next; //下一个元素
      Node<E> prev; //上一个元素
  
      Node(Node<E> prev, E element, Node<E> next) {
          this.item = element;
          this.next = next;
          this.prev = prev;
      }
  }
  ```
  
  **add(int index, E element)**：
  
  ```java
   public void add(int index, E element) {
          //检查插入的位置是否在当前对象中
          checkPositionIndex(index);
  		//如果是插入到最后的节点
          if (index == size)
              //在最后节点追加节点
            linkLast(element);
          else //不是就在index之前的位置添加元素
            linkBefore(element, node(index));
   }

  private void checkPositionIndex(int index) {
        if (!isPositionIndex(index))
              throw new IndexOutOfBoundsException(outOfBoundsMsg(index));
  }
  
  private boolean isPositionIndex(int index) {
          return index >= 0 && index <= size;
  }
  
  Node<E> node(int index) {
          // assert isElementIndex(index);
  		// 移位运算符，右移一位 相当于/2 
          // 进行二分法判断，判断当前要插入的位置在前半段还是后半段
          if (index < (size >> 1)) { //前半段
              Node<E> x = first;
              //遍历，以当前index值进行遍历，遍历到最后一个就是要添加元素的位置，取next
              for (int i = 0; i < index; i++)
                  x = x.next;
            return x;
          } else { //后半段
            Node<E> x = last;
              //反向遍历，取prev
              for (int i = size - 1; i > index; i--)
                  x = x.prev;
              return x;
          }
  }
  
  void linkBefore(E e, Node<E> succ) {
          // assert succ != null;
          final Node<E> pred = succ.prev;
          // 构造要插入数据的新节点，以pred为上一个节点，succ为下一个节点
          final Node<E> newNode = new Node<>(pred, e, succ);
          succ.prev = newNode;
          // 如果succ前一个节点为空，将当前要添加的节点设置为首节点
          if (pred == null)
              first = newNode;
          else
            pred.next = newNode; //将pred指向新节点，构建双向列表
          size++;
        modCount++;
  }
  ```
  
  分析：由于在指定位置添加节点，为维持双向链表，逻辑较为晦涩，因此画图解释。
  
  ![新增节点](/basic/linkedlist/linkedlist_add.png)
  
  **get(index)**:
  
  ```java
  public E get(int index) {
          //校验获取的index,是否在当前对象内
          checkElementIndex(index);
          return node(index).item;
      }
  
  private void checkElementIndex(int index) {
          if (!isElementIndex(index))
              throw new IndexOutOfBoundsException(outOfBoundsMsg(index));
      }
  
   private boolean isElementIndex(int index) {
        return index >= 0 && index < size;
      }
```
  
  **remove(index)**:
  
  ```java
  public E remove(int index) {
          //校验获取的index,是否在当前对象内
          checkElementIndex(index);
          //删除该节点
          return unlink(node(index));
      }
  
  E unlink(Node<E> x) {
          // assert x != null;
          final E element = x.item;
          final Node<E> next = x.next;
          final Node<E> prev = x.prev;
  		//如果prev为null,证明当前要删除的节点就是首节点，因此将next指向给首节点，跳过当前节点
          if (prev == null) {
              first = next;
          } else {
              //如果prev不是null,将prev的next直接指向当前节点的next,跳过当前节点
              prev.next = next;
              //双向链表,将当前节点的prev设置为null
              x.prev = null;
          }
  		//如果当前节点的next为null,证明当前节点是尾节点，将当前节点的prev指向尾节点，跳过当前节点
          if (next == null) {
              last = prev;
          } else {
              //反之，将next的prev指向当前节点的prev
              next.prev = prev;
              //当前节点的next设置为null, 至此，当前节点已经从链表中被移除了
              x.next = null;
          }
  		//方便gc,将对象置为null
        x.item = null;
          size--;
        modCount++;
          return element;
      }
  ```
  
  **remove(o)**:
  
  ```java
  public boolean remove(Object o) {
          if (o == null) {// 如果被移除元素为null
              for (Node<E> x = first; x != null; x = x.next) {
                  if (x.item == null) { 
                      unlink(x);
                      return true;
                }
              }
        } else {
              for (Node<E> x = first; x != null; x = x.next) {
                if (o.equals(x.item)) {
                      unlink(x);
                      return true;
                  }
              }
          }
          return false;
      }
  ```
  
  **addAll(c)**:
  
  ```java
  public boolean addAll(Collection<? extends E> c) {
          //后面追加元素
          return addAll(size, c);
      }
  
  public boolean addAll(int index, Collection<? extends E> c) {
          //检查是否越界
          checkPositionIndex(index);
  
          Object[] a = c.toArray();
          int numNew = a.length;
          // 要添加的集合元素为空，直接返回
          if (numNew == 0)
              return false;
  
          Node<E> pred, succ; // succ节点和succ的prev节点
          if (index == size) { //判断当前要插入的位置是否是尾节点
              succ = null; 
              pred = last; //将pred指向尾节点
          } else {
              succ = node(index); //根据当前index获取节点，在index之前添加节点
              pred = succ.prev;
          }
  
          for (Object o : a) { //遍历要添加的集合对象
              @SuppressWarnings("unchecked") E e = (E) o;
              Node<E> newNode = new Node<>(pred, e, null);
              if (pred == null) //如果pred为null，将新加的节点指向首节点
                  first = newNode;
              else
                  pred.next = newNode;//将pred的next指向新节点
            pred = newNode;//将新节点赋值到pred节点当作为添加的尾节点，将前驱节点移动到新节点
          }

          if (succ == null) {
            last = pred; //如果succ为null,将pred指向尾节点
          } else {
              // 将添加完元素的节点和succ链接
              pred.next = succ; 
              succ.prev = pred;
          }
  
        size += numNew;
          modCount++;
          return true;
      }
  ```
  
  **linkFirst(e)**:
  
  ```java
  //元素链接到头节点
  private void linkFirst(E e) {
          final Node<E> f = first;
          // 创建新节点 前驱节点为null，后续节点为first节点
          final Node<E> newNode = new Node<>(null, e, f);
          // 更新first节点
          first = newNode;
       	// 如果f为空，表示原来为空，更新last节点为新节点
          if (f == null)
              last = newNode;
          else
              // 构建双向链表
              f.prev = newNode;
          size++;
          modCount++;
  }
  ```
  
  **unlinkFirst(f)**:
  
  ```java
  //释放头节点，f 就是头节点
  private E unlinkFirst(Node<E> f) {
          // assert f == first && f != null;
          final E element = f.item;
          final Node<E> next = f.next;
          f.item = null;
          f.next = null; // help GC
           // 更新头节点
          first = next;
          if (next == null)
              last = null;
          else
              //将头节点的prev置为null
              next.prev = null;
          size--;
          modCount++;
          return element;
      }
  ```
  
  **unlinkLast(f)**:
  
  ```java
  //释放尾节点
  private E unlinkLast(Node<E> l) {
          // assert l == last && l != null;
          final E element = l.item;
          // 和释放头节点相反，这里取出前驱节点，其他逻辑一样
          final Node<E> prev = l.prev;
          l.item = null;
          l.prev = null; // help GC
          last = prev;
          if (prev == null)
              first = null;
          else
              prev.next = null;
          size--;
          modCount++;
          return element;
      }
  ```

## 总结

1. LinkedList底层数据结构是双向链表，并且支持存储null值，非同步；
2. LinkedList由于是双向链表，顺序访问效率高，随机访问效率低，元素操作会比较频繁；
3. LinkedList不支持随机访问，访问元素极快，时间复杂度为O(n);
4. LinkedList在尾部添加，时间复杂度为O(1);
5. LinkedList删除元素，只需要移动指针，时间复杂度为O(1);
6. LinkedList在中间添加元素比较慢，因为要进行元素的移动(遍历获取元素的所在的位置)，时间复杂度为O(n)。

