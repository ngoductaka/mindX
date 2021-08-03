# Bài 7 - Reactjs những kỹ năng cần thiết

## I. Mục tiêu
 *  Props và state
 *  Phân chia component trong react
------
## II. Nội dung bài học 
### 1. Component
- Có thể chia component thành : function và class component hoặc state full or state less
	* React 16 đưa ra cái API mới về HOOK 
- Về mặt khái niệm và ý tưởng thì Component như 1 function.
	* Nhận params đầu vào và trả về React element.
	* các params đầu vào được gọi là props.
- Trước React 16.8 thì  chỉ có class component mới có state và quản lý state. Khi react 16 ra đời thì có thêm API Hook, khi này function component có thể quản lý state
- cách sử dụng 
 ```

 function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}


function Header(props) {
  return (
      <div>
          <p>Header:</p>
          <props.Com name={props.name} />
          {props.children}
      </div>
  );
}

function App() {
  return (
      <div>
          <Header Com={Welcome} name="dnd" >
              <Welcome name="ngoc duc" />
          </Header>
      </div>
  );
}

```

- => Props có thể là các giá trị nguyên thuỷ hoặc object, array, function hoặc là component khác


- => không thay đổi đc (mang ý nghĩa gán lại ) nhưng nếu là object hoặc array thì có thể thay đổi thuộc tính

- => khái niệm về pure Component (ý tưởng từ pure function) (Tài liệu hay về Functional Programming)

```
React is pretty flexible but it has a single strict rule:

All React components must act like pure functions with respect to their props.
```
### 2.State
- Props là tham số đầu vào, còn state sẽ là trạng thái bên trong component

- Class component
```
class ClassCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date(), clickCount: 0 };
    }
    _handleClick = () => {
        this.setState({
            clickCount: this.state.clickCount + 1
        }, () => {
            console.log('this.state.clickCount_2', this.state.clickCount)
        })
        console.log('this.state.clickCount_1', this.state.clickCount)
    }
    render() {
        return (
            <div>
                <h1>Click Count <button onClick={this._handleClick}>Click here</button></h1>
                <h2>{this.state.clickCount}</h2>
            </div>
        );
    }
}
```
- Hook
```
import React, { useState, useEffect } from 'react';

export const HookCom = () => {
    const [clickCount, setClickCount] = useState(0);
    // 
    const _handleClick = () => {
        setClickCount(clickCount + 1);
        console.log("clickCount_1", clickCount);
    }

    return (
        <div>
            <h1>Click Count <button onClick={_handleClick}>Click here</button></h1>
            <h2>{clickCount}</h2>
        </div>
    )
}
```

- => State là trạng thái trong component, có phạm vi sử dụng trong component
- => Trong Class component thì state chỉ tồn tại bên trong 1 component. Dù component lớn và phức tạp thì cũng chỉ 1 object state
- => Hook ở react 16 cho phép chia nhỏ để quản lý và tái sử dụng logic của react (sẽ tìm hiểu cụ thể ở bài sau)

### 3.Lifecycle
* Là vòng đời của 1 component
    - Có dự hình thành , phát triển và kết thúc Tương ứng Mounting , Update, Unmounting

* Các phiên bản react sẽ có 1 số sự thay đổi nhỏ về các phương thức (Tuỳ phiên bản mà tra tài liệu từ official React documentation) 


Bạn có thể tham khảo tài liệu tại đây để hiểu thêm về các phương thức và cách sử dụng chi tiết

Ba giai đoạn của 1 vòng đời: 

- Mounting là khi React đẩy các element vào trong DOM (Khởi tạo component), khi này thì các phương thức được gọi theo thứ tự: 
1. constructor()
2. getDerivedStateFromProps()
3. render()
4. componentDidMount()
- Tiếp theo trong vòng đời là khi component được update. Component update khi props hoặc state thay đổi. Khi update thì các phương thức được gọi theo thứ tự
1. getDerivedStateFromProps()
2. shouldComponentUpdate()
3. render()
4. getSnapshotBeforeUpdate()
5. componentDidUpdate()
- Cuối cùng là khi component xoá khỏi DOM. Khi này nó gọi 1 phương thức duy nhất là 
1. componentWillUnmount

- Để hiểu rõ hơn về vòng đời thì phải code thử và log khi các method được gọi
(Xem code và log trong b11) hoặc vào [đây](https://dnd6795.blogspot.com/2021/07/b02-component.html) để xem code và kết quả

- Lưu ý về phương thức getDerivedStateFromProps  là static. Như trên hình, nó được gọi ngay trước render. Lưu ý về react trước 16.3 và sau 16. có sự khác biệt 

- 16.3 về trước nó chỉ được gọi ở mounting và khi props thay đổi, nên thường dùng để update lại state khi khởi tạo hoặc khi props thay đổi

- từ 16.4 về sau thì nó đc gọi khi khởi tạo và cả khi props hoặc state thay đổi

* getSnapshotBeforeUpdate là phương thức đươc gọi ngay trước khi update DOM thật và sau khi render 
phương thức này cần đi kèm với componentDidUpdate


- => Đây là nội dung về các method trong Class Component. Trước khi Hook ra đời thì đây là lưạ chon duy nhất để quản lý component 

- => Nảy sỉnh khá nhiều vấn để từ sự phức tạp trong các method của vòng đời, các method nhiều và cần hiểu từng trường hợp để sử dụng hợp lý. Cần hiểu khái niệm class trong JS (super, contructor, static method, this ...). và bất cập khi component có quá nhiều state và state chỉ sử dụng trong component là logic bên trong 1 component và không có khả năng tái sử dụng.

- => React 16.8 hook ra đời giúp đơn giản trong việc quản lý state và vòng đời component. cũng như khả năng tái dử dụng logic state

## III bài tập 
- làm game tictactoe

