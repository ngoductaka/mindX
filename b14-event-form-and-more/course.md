# Bài 14 - event, condisional rendering, Lists and form

------
## II. Nội dung bài học 
###  1. Handling Events
Html:
```
<button onclick="activateLasers()">
  Activate Lasers
</button>
```


React:

```
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

* => đơn giản

* Lưu ý về form
```
<form onsubmit="console.log('You clicked submit.'); return false">
  <button type="submit">Submit</button>
</form>
```
* Trong React:
```
function Form() {
    function handleSubmit(e) {
      e.preventDefault();
      console.log('You clicked submit.');
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>
    );
  }

```
- => Return false để chạy theo chế độ mặc đinh của form trong html thì trong react sử dụng hàm preventDefault. 

- => e là synthetic event. Đơn giản thì nó là event trong html
- => ở chế độ mặc định  onClick={activateLasers} 
- là viết tắt của onclick={e => activateLasers(e)}
- => muốn truyền tham số thì đơn giản là thay thế e bằng giá trị khác

- => sử dụng Class component thì cần chú ý.

- ở mặc định:


```

<button onClick={this._handleClick}>Click here</button>
//
_handleClick() {
        this.setState({
            clickCount: this.state.clickCount + 1
        })
    }

```

- nếu ko binding funtion _handleClick thì sẽ báo lỗi. (this là undefined)

- => Cần bind this hoặc truyền arrow function nếu muốn this bên trong function sử lý dễ xác định.

- => Hook ra đời và mọi thứ đơn giản hơn khi không còn this :)

### 2.Conditional Rendering
- Render UI theo điều kiện đơn giản hơn với react:


```
function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
      return <UserGreeting />;
    }
    return <GuestGreeting />;
  }

```
- Hoặc dùng "&&" Operator


```
<div>
    <h1>Hello!</h1>
    {unreadMessages.length > 0 &&
    <h2>
        You have {unreadMessages.length} unread messages.
    </h2>
    }
</div>

```
Hoặc toán tử 3 ngôi (conditional operator condition ? true : false)

```
<div>
    The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
</div>

```
=> TÙy từng trường hợp để sử dụng phù hợp và linh hoạt

3. Lists and Keys
Cách render 1 Lists các element


```
function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
      <li key={number.toString()}>
        {number}
      </li>
    );
    return (
      <ul>{listItems}</ul>
    );
  }
  
  const numbers = [1, 2, 3, 4, 5];
  ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
  );

```
Hoặc nhúng trực tiếp trong JSX


```
function NumberList(props) {
    const numbers = props.numbers;
    return (
      <ul>
        {numbers.map((number) =>
          <ListItem key={number.toString()}
                    value={number} />
        )}
      </ul>
    );
  }

```


Sử dụng  map() để trả về list element và cho vào trong component

*  key giúp react xác định item nào thay đổi, được thêm mới hay loại bỏ. (xem lại thuật toán so sánh của react) hoặc xem qua giải thích của team react



### 4.Forms
Forms trong react hoạt động hơi khác với html

```

<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>

```

- html sử dụng name để định danh và lấy giá  trị của từng element. Và từng element tự quản lý giá trị cho đến khi form gọi  submit thì lấy ra dùng

- React cho phép quản lý giá trị từng element:

```

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}


```
- hoặc với hook

```

const NameForm = () => {
    const [text, setText] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
    }

    const handleSubmit = (event) => {
        alert('A name was submitted: ' + text);
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label> Name:
                    <input type="text" value={text} onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}

```


- => có thể quản lý  từng ký tự mà người dùng nhập, thuận tiện cho validate form
- => quản lý tập trung và có thể lấy giá trị ra dùng đơn giản 

- => về các thuộc tính thì không khấc nhiều với html
- => lưu ý về hàm onChange ở trên nhận vào là  synthetic event Và lấy giá trị từ người dùng nhập bằng : event.target.value

## Bài tập 
- làm form login
- có thể tái sử dụng form
- làm Survey Form: https://codepen.io/freeCodeCamp/full/VPaoNP

















