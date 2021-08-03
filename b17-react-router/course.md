# Bài 17 react-router

## 1. React-router
- Như các bài học trước thì chỉ thấy sử lý logic trong 1 page, nhưng trong thực tế thì ít có trang web nào chỉ có 1 page, mà các page đc chia ra theo chức năng riêng theo url và react-router giúp chúng ta thực hiện điều đó

- Bằng cách phần chia các component tương ứng với từng url và cung cấp phương thức để chuyển từ page này sang page khác (component này sang component khác) cũng như tham số truyền đi hay quản lý các page 1 cách linh hoạt

## 2. Cài đặt và dùng thử
- Trên project có sẵn chỉ cần add thêm thư viện
 ``` npm install react-router-dom ```
- ví dụ 1: Trang web cần 3 trang lần lượt là Home, About và User

- /src/app.js

```
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
```

và xem kết quả:

=> Đơn giản dễ hiểu
- Tưng component ứng với 1 đường dẫn 
## 3. Cùng tìm hiểu các component chính của react-router
- Có 3 kiểu component chính:
    * E routers, like <BrowserRouter> and <HashRouter>
    * route matchers, like <Route> and <Switch>
    * and navigation, like <Link>, <NavLink>, and <Redirect>
1. Router:
- BrowserRouter: sử dụng History API có trong HTML5 để theo dõi lịch sử bộ định tuyến của bạn. 
- HashRouter: sử dụng hash của URL (window.location.hash) để ghi nhớ mọi thứ.  Phù hợp để hỗ trợ các trình duyệt cũ.
=> Khởi tạo ở route bọc component root

2. Route: định nghĩa một ánh xạ (mapping) giữa một URL và một Component. Điều đó có nghĩa là khi người dùng truy cập theo một URL trên trình duyệt, một Component tương ứng sẽ được render trên giao diện.
```
<BrowserRouter>
  <Route exact path="/" component={Home}/>
  <Route path="/about" component={About}/>
  <Route path="/topics" component={Topics}/>
</BrowserRouter>
```
- Lưu ý về  exact  thì nó chỉ hoạt động nếu path phù hơp tuyệt đối chỉ có thể  là "/"  hoặc "/#text" 

3. Navigation 

- 3.1 Link tương tự như thẻ `<a></a>` trong html giúp link sang page khác

``` <Link to="/about">About</Link> ```

- 3.2 NavLink giống với Link về cách sử dụng, có hỗ trợ thêm một số thuộc tính như là activeClassName và activeStyle 2 thuộc tính này giúp cho khi mà nó trùng khớp thì nó sẽ được active lên và chúng ta có thể style cho nó.
```
<NavLink exact activeStyle={{
    backgroundColor : 'white',
    color : 'red'
}} to="/" className="my-link">Trang Chu</NavLink>

```
- 3.3 Redirect
* khi render <Redirect/> sẽ navigate đến component:
* ví dụ:
```

<Route exact path="/">
  {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
</Route>
```

- hoặc trong khi render thì return <Redirect to="/dashboard" /> 

- Còn 1 số API Hook khá hay và sử dụng đơn giản như:

- useHistory phù hợp khi sử dụng trong function và logic
```
import { useHistory } from "react-router-dom";

function HomeButton() {
  let history = useHistory();

  function handleClick() {
    history.push("/home");
  }

  return (
    <button type="button" onClick={handleClick}>
      Go home
    </button>
  );
}
```

- uselocation để lấy url hiện taị 
- useParams để lấy parameters từ URL
  let { slug } = useParams();
  return <div>Now showing post {slug}</div>;


- Và còn 1 vài các API khác với nhiều tính năng riềng biệt, tuỳ vào yêu cầu dự án mà áp dụng cho phù hợp
- link tài liệu ở đây





















