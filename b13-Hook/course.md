# Bài 13 - Reactjs - Hook

## I. Mục tiêu
 *  Giới thiệu về hook
 *  Thực hành các api hook cung cấp
------
## II. Nội dung bài học 
### 1. Introducing Hooks
* Hooks giúp sử dụng state và các tính năng khác của React mà ko cần sử dụng class
```
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

* so sánh với class component

```
class Example extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 0
      };
    }
  
    render() {
      return (
        <div>
          <p>You clicked {this.state.count} times</p>
          <button onClick={() => this.setState({ count: this.state.count + 1 })}>
            Click me
          </button>
        </div>
      );
    }
  }

```
* => Hook là tính năng mới thêm vào thử react 16.8.0 và không có thay đổi gì lớn. Mọi logic về class vẫn vậy chỉ thêm một lựa chọn cho người dùng. Và hoàn toàn có thể sử dụng song song cả class và hook cho 1 dự án.


Nghe thử về ý tưởng của Hook từ người tạo ra nó ở [đây](https://www.youtube.com/watch?v=dpw9EHDh2bM&t=1s)

* => Giải quyết được nhiều vấn đề 

- Như việc tái sử dụng state trong Class component khá khó khăn. Bằng cách khá vòng vo là dùng HOC (hight order component) khiến cấu trúc chương trình trở nên phức tạp khó bảo trì => cần 1 cách thức đơn giản hơn để sử tái sử dụng logic trong React

- Những component phức tạp ngày càng phức tạp theo thời gian. State trong Class là 1 object chứa tất cả trạng thái của app, các trạng thái có thể liên quan hoặc không. Logic trong lifecycle có thể nở ra và không có cách nào khác ngoài việc gom chung lại và đặt trong các method của lifecycle dù có liên quan hay không. Và nhiều trường hợp không thể tách nhỏ component khiến lượng logic ngày càng lớn và quản lý chung trong state

- Các khái niệm về Class chỉ thêm vào trong ES6 và có đủ thứ cần tìm hiểu về class, và đặc biệt là This trong js ko hề dễ dàng chi người mới bắt đầu.



* => hook ra đời thân thiện với function và dễ dàng tiếp cận cũng như sử dụng 

### 2. Làm quen với hooks
Không cần quan tâm đến class, Hook được nhúng vào function và đúng như ý tưởng ban đầu về component là 1 function nhận props và trả về react element:

2.1 useState
useState có thể gọi nhiều lần và quản lý các trạng thái khác nhau của component, khác với class ?

```
function ExampleWithManyStates() {
  // Declare multiple state variables!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  // ...
}

```
 array destructuring  là khái niệm trong es6.

- khai báo 2 giá trị bằng  array destructuring  từ kết quả trả về của useState. gía trị đầu tiên là state và giá trị thứ 2 là hàm để set State. Tương tự như state và setState trong class component
- quy tắc đặt tên nên dùng [stateName, set + stateName]

=> Dễ sử dụng  có 2 thứ 1 là state và hàm để thay đổi state. Giá trị bên trong useState là giá trị default của state.

2.2 useEffect
- Các tác vụ như call api, subscriptions, hoặc thay đổi Dom dựa trên trang thái trước. Công cụ này là useEffect (“side effects”) dùng để bắt các thay đổi hay sự sai khác trong component.

Cách sử dụng: 
```
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    console.log('useEffect call')
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });
  console.log('Render call')

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

- => Mặc đinh React sẽ gọi effects sau mỗi lần Render (Update DOM)
- => chạy và xem log


* Xem cách làm tương đương khi dùng Class:

```

class Example extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 0
      };
    }
  
    componentDidMount() {
      document.title = `You clicked ${this.state.count} times`;
    }
    componentDidUpdate() {
      document.title = `You clicked ${this.state.count} times`;
    }
  
    render() {
      return (
        <div>
          <p>You clicked {this.state.count} times</p>
          <button onClick={() => this.setState({ count: this.state.count + 1 })}>
            Click me
          </button>
        </div>
      );
    }
  }


```


- useEffect cũng cho phép don dẹp sau mỗi sự kiện (render) bằng cách trả về 1 function: 

```

    useEffect(() => {
        console.log('useEffect call', clickCount)
        // Update the document title using the browser API
        document.title = `You clicked ${clickCount} times`;
        return () => {
            console.log('useEffect Clean', clickCount)
        }
    });
```
=> Chạy và ghi nhận log: 

Và làm điểu tương tự trong Class:
```
componentDidMount() {
}
componentWillUnmount() {
}
```
- => function return sẽ chạy khi kết thúc vòng đời của lần render trước đó
- => useEfect cũng cho phép sử dụng nhiều lần cho phép bắt các sự kiện khác nhau

- => Vậy điểm đặc biệt khi dùng useEffect là gì nếu class cũng làm được ?

```


    useEffect(() => {
        console.log('useEffect call', clickCount)
        // Update the document title using the browser API
        document.title = `You clicked ${clickCount} times`;
        return () => {
            console.log('useEffect Clean', clickCount)
        }
    }, [clickCount]);
```
- => Đó là khả năng lắng nghe có chọn lọc hay kích hoạt có chọn lọc các sự kiện render 

- => khi thêm param thứ 2 là 1 mảng thì  useEffect sẽ chỉ kích hoạt khi các phần tử bên trong mảng thay đổi

* khi là mảng rỗng thì đó sẽ tương đương với componentDidMount 
   và function trả về tương đương với componentWillUnmount
    trong Class 

### 3. Rules of Hooks
- Hooks are JavaScript functions, but they impose two additional rules:

- Only call Hooks at the top level. Don’t call Hooks inside loops, conditions, or nested functions.
- Only call Hooks from React function components. Don’t call Hooks from regular JavaScript functions. (There is just one other valid place to call Hooks — your own custom Hooks. We’ll learn about them in a moment.)

### 4. Building Your Own Hooks
=> Khả năng tái sử dụng state 
=> Từ những ví dụ và xem cách dử dụng 

logic thông thường

```
const LayoutComponent = () => {
    const [onSmallScreen, setOnSmallScreen] = useState(false);
  
    useEffect(() => {
      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);
    }, []);
  
    let checkScreenSize = () => {
      setOnSmallScreen(window.innerWidth < 768);
    };
  
    return (
      <div className={`${onSmallScreen ? "small" : "large"}`}>
        <h1>Hello World!</h1>
      </div>
    );
  };
```


* Và lặp lại ở nhiều màn hình chung logic 
* => cách tái sử dụng:

```

const useWindowsWidth = () => {
    const [isScreenSmall, setIsScreenSmall] = useState(false);
  
    let checkScreenSize = () => {
      setIsScreenSmall(window.innerWidth < 600);
    };
    useEffect(() => {
      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);
  
      return () => window.removeEventListener("resize", checkScreenSize);
    }, []);
  
    return [isScreenSmall];
  };

const LayoutComponent = () => {
    const [isScreenSmall] = useWindowsWidth();
  
    return (
      <div className={`${isScreenSmall ? "small" : "large"}`}>
        <h1>Hello World!</h1>
      </div>
    );
  };

```


* Hoặc tái sử dụng call api

```
const useCommentsRetriever = (url, context = []) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        fetch(url)
            .then(({ data }) => setData(data))
            .catch(({ errors }) => setError(errors))
            .finally(() => setLoading(false))
    }, context);

    return [data, error, loading];
};


// 

// sử dụng ở component 

const [data, error, loading] = useCommentsRetriever('https://api/call', [])



```