# Bài 16 redux
1. Redux
- Như đã tìm hiểu từ trước thì dữ liệu của component react đc thể hiện qua state và props. Dữ liệu được truyền từ component cha sang component con qua props và không có chiều ngược lại.  Và khi component con truyền "thông tin" nào đó đến component cha thì đó là truyền "sự kiện" và khi sự kiện này đc thực thi làm trạng thái của component cha thay đổi kéo theo props thay đổi.

- =>  Cách quản lý tập trung kiến luồng dữ liệu trong app clear dễ theo dõi dễ sử lý 

- => Nếu muốn gọi sự kiện lên nhiều tầng component thì lại khá bất tiện. => từ đây redux có thể giúp react xử lý sự bất tiện này. Không cần truyền hàm để thay đổi xuống nhiều cấp, redux quản lý tập trung  dữ liệu của app thành 1 Object dùng chung và các sự kiện (action) được gửi (dispatch) đến 1 nơi sử lý tập trung (reducer) các logic để thay đổi dữ liệu trong Object  => bất cứ nơi nào dùng đến Object chung này đều đc update.

2. Thực hành cài đặt và dùng thử
- Bắt tay vào cài đặt và code thử để hiểu được cách redux hoạt động:
- khởi tạo dự án mới:

 ``` npx create-react-app first-app-redux ```

- add redux, react-redux @reduxjs/toolkit

``` yarn add react-redux redux @reduxjs/toolkit ```
- /src/index.js
```
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './redux/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
- /src/features/counter/counterSlice.js

import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0
    },
    reducers: {
        increment: state => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            console.log('action', action)
            state.value += action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
```

- /src/redux/store.js
```
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

export default configureStore({
  reducer: {
    counter: counterReducer
  }
})
- /src/features/counter/index.js

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counterSlice'

function Counter() {
    const count = useSelector(state => state.counter.value)
    const dispatch = useDispatch()

    return (
        <div>
            <div>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                > Increment</button>

                <span>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >Decrement</button>
            </div>
        </div>
    )
}

export default Counter;
```
- Chạy chương trình và xem kết quả:

- Click tăng giảm và xem kết quả thay đổi tương ứng.

- => Các action  decrement, increment được import từ    './counterSlice'  có thể dùng ở các component khác nhau ko phân biệt thứ bậc. 
- => Để lấy state của redux thì react-redux cung cấp: useSelector  
- => để dispatch action thì react-redux cũng cung cấp : useDispatch 

* Và mọi chuyện trở nên đơn giản hơn rất nhiều ko cần tạo 1 state ở component cha và truyền function để các component con cháu chắt gọi. Các component không phân biết cấp bậc đều có thể gửi các sự kiện và thay đổi state chung của app.

=> Hoàn thiện cài đặt, cùng tìm hiểu cách hoạt động của redux:
### 3. Cách redux hoạt động:

- Nội dung bài giảng lấy tài liệu từ egghead (Từ Dan Abramov đồng tác giả của redux, react.... )

- Mẫu hình đơn giản của Redux:

```

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
} 

const { createStore } = Redux;
const store = createStore(counter);

const render = () => {
  document.body.innerText = store.getState();
};

store.subscribe(render);
render();

document.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' });
});
```
- xem kết quả chạy ở đây.

- Hàm createStore  của redux nhận đầu vào là hàm counter (là reducer) tr cung cấp các phương thức:
1.  subscribe đăng ký các sự kiện nhận sự thay đổi của state ở đây là lấy state ra và gán vào trong text của body
2.  getState  lấy giá trị state
3. dispatch  gửi đi 1 object (1 sự kiện) vào trong store để  xử lý

- Thử viết lại làm createStore của react (một cách đơn giản):
```
const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default: 
      return state;
  }
}

const createStore = (reducer) => {
  let state;
  let listeners = [];
  
  const getState = () => state;
  
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };
  
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };
  
  dispatch({});
  
  return { getState, dispatch, subscribe };
};

const store = createStore(counter);

const render = () => {
  document.body.innerText = store.getState();
};

store.subscribe(render);
render();

document.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' });
});
```
- Và xem kết quả tại đây

- => Xem nội tại của hàm createStore  để hiểu rõ hơn cách mà redux hoạt động. Đơn giản là 1 function cho phép đăng ký các hoạt động (ở đây là render) và khi dispatch 1 action (hay 1 event được kích hoạt) thì gọi đến reducer với đầu vào là state trước đó và action (sự kiên) để nhận về và lưu state mới. Từ thực thi các hoạt động (render) đã đăng ký và ở đây gọi đến store.getState() và nhận về state mới đã lưu.

- => Đó là cách redux hoạt động, nhưng để kết hợp với react thì cần thêm 1 thư viện nữa đó là react-redux .  Như đã thấy ở phần cái đặt bên trên react-redux cũng cấp Provider để nhúng store vào app bọc lấy cả <App/>, component gốc chứa tất cả các component của ứng dụng
- => Và từ đây state chung của cả app được truyền tới tất cả các component con.
 

4. Thực hành làm app todo list đơn giản




