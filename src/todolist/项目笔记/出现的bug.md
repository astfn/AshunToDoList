>在项目发布大概一个星期后，在一个阳光明媚的下午时分，我悠然的打开网页，想看看动画有没有什么改进的地方。就在这时，我他喵的居然发现了一个严重的BUG。

​	首先要知道，该项目中的所有vuex的数据都存储到了localStorage中，如果localStorage中有数据，则我获取EventStore就是localStorage中的，若localStorage中没有数据（也就是第一次访问该网站），我就将vuex的数据压入。

​	这样用户在第一次进入页面时候，就保留了数据，再次进入时，返回的是localStorage中的历史数据。

​	业务思想正确无疑，但是其中忽略了一个非常关键的点，没有考虑vuex的特性。

​	我们知道vuex中管理的数据，能够实现页面响应式，可以让vuex中的数据驱动view，但是当用户再次进入网站、界面刷新时，vux中的数据就会清空。

​	虽然我们每次获取的是上次操作后 存储在localStorage中的数据，也封装了操作数据的方法(让每次的操作都覆盖localStorage，并且赋给vuex保持数据同步)。但这只是在操作时做的同步，而在一开始getEventStore时，其实并没有完全同步。

​	因为localStorage还保留上次的数据，但是vuex中的数据已经清空了，而通过封装的getEventStore方法，在组件中访问的也是localStorage中的数据，（最关键的来了！）但是**操作localStorage中的数据不会实现响应式，vuex中的数据才会实现响应式**。

​	但我点击按钮以后，依然会更新页面，这是因为我在每次操作时，对vuex数据做了同步。这时候可能就会有疑问，既然数据同步了为什么还会出错，其实上面也讲到了，这只是操作时的同步，如果用户再次进入页面，此时vuex数据为空，localStorage有上次数据，这时vuex的数据是没有同步的。而我进行操作时，由于vuex与localStorage数据不同步，导致了视图上的错误（vuex驱动视图），所以无论哪种情况，`封装的getEventStore方法应该始终返回同步后的vuex数据`，因为只有这样才能够让视图正确的响应。

>* 第一次进入页面，访问vuex数据。怎样交互都不会有问题
>* 下次进入界面/刷新，vuex数据清空，返回localStorage中的数据并进行操作，操作完毕虽然会同步到state，但是是在localStorage操作后才进行赋值同步，也就是说，当数据改变时，页面并不会立即更新（还是localStorage中的数据），之后将state同步，页面发生更新，但是state突然获得操作后的数据，再更新页面，会导致数据重复

​	

解决:

​	要解决再次进入页面，vuex清空导致数据不同步问题。我们就要在`localStorage存在数据时` 判断当前的vuex是不是与localStorage保持一致，让localStorage数据赋给vuex，再将vuex数据返回即可。

​	这样用户操作的始终是能够实现响应式的vuex中的数据，且与locaStorage同步。



**方法一：（判断vuex数据是否为初始化状态）**

​	再次进入页面，vuex清空导致数据不同步问题。我们可以判断其是否为初始化状态。

我们可以将`state.EventStore`序列化，再与初始化状态对应的String进行对比。

>不能直接让`state.EventStore`与初始化状态对应的`对象`进行判断。
>
>因为引用类型判断地址，就算二者结构相同，也会返回`false`

​	而我们如果直接判断`JSON.stringify(state.EventStore)==="初始化状态对应的String…………"`，会发现代码变得非常多，因为vuex的初始化数据转化为String时，会很长。

​	所以我将vuex初始化时数据对应的String存储在vuex中，然后判断时 通过state访问。

>但使用该方式，如果后续新增业务，vuex添加新的初始化数据，则还要重新设置 初始化状态对应的String，较为麻烦
>
>可以使用方法二。

**方法二：（直接与localStorage对比）**

​	其实，判断的是vuex中的数据与localStorage中的数据是否同步,那么我们直接让`序列化`后的`state.EventStore`、localStorage进行对比即可,如果不同，把localStorage赋给state.EventStore即可。

​	这样既简单，也不用新增数据，而且也不用为后续更改vuex初始化数据考虑，因为直接判断的就是当前`state.Event`

> 【踩坑】： localhost是否为空的判断条件不唯一，有时打印的是undefined有时是null😂

```
function getEventStore(state) {
  let LocalEventStoreString = localStorage.getItem("EventStore");

  if (LocalEventStoreString !== "undefined" && LocalEventStoreString !== null) {
    let LocalEventStore = JSON.parse(localStorage.getItem("EventStore"));
    let StateEventStoreString = JSON.stringify(state.EventStore);
    if (StateEventStoreString !== JSON.stringify(LocalEventStore)) {
      state.EventStore = LocalEventStore;
    }
    return state.EventStore;
  } else {
    setEventStore(state, state.EventStore);
    return state.EventStore;
  }
}
```

其实这时候也可以返回localStorage中的数据，因为我们已经让localStorage与vuex同步了

```
function getEventStore(state) {
  let LocalEventStoreString = localStorage.getItem("EventStore");

  if (LocalEventStoreString !== "undefined" && LocalEventStoreString !== null) {
   ……
    return LocalEventStore;
  } else {
    ……
  }
}
```

