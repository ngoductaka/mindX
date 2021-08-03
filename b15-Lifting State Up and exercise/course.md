# b15-Lifting State Up and exercise
### 1. Lifting State Up
- => Bài toán đặt ra là khi 1 vài component cùng update khi 1 dữ liệu thay đổi hay đơn giản là các component có thể giao tiếp với nhau.

- Cùng làm 1 ví dụ thực tế :
- Yêu cầu : chuyển đổi nhiệt độ từ độ C sang độ F;
 
- Cùng tham khảo việc chia nhỏ component và từng component con tác động đến state của component cha.

```
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

export const TemSplit = () => {
  const [c, setC] = useState('');
  const [f, setF] = useState('');

  const _handleChangeVal = (type, val) => {
    if (isNaN(val)) return 0;

    if (type == 'c') {
      setC(val)
      setF(toFahrenheit(val))
    } else {
      setC(toCelsius(val))
      setF(val)
    }

  }

  return (
    <div>
      <InputForm
        label="Độ C:"
        value={c}
        onChange={val => _handleChangeVal('c', val)}
      />
      <InputForm
        label="Độ F:"
        value={f}
        onChange={val => _handleChangeVal('f', val)}
      />
    </div>
  )

}

const InputForm = ({
  label = "",
  value = "",
  _onChange = () => { }
}) => {
  return (
    <fieldset>
      <legend>{label}</legend>
      <input value={value} onChange={e => _onChange(e.target.value)} />
    </fieldset>
  )
}
```

- => Phân tích:

- Ở component con  InputForm   khi người dùng nhập giá trị hàm onChange trong thẻ <input /> sẽ được thực thi và sẽ gọi đến hàm _handleChangeVal ở component cha. 
- Và từ đây phụ thuộc vào loại giá trị được nhập (ở đây dùng c và f để xác định xem giá trị đầu vào là độ c hay độ f) để chuyển đổi giá trị đầu vào sang giá trị còn lại 
- Từ những giá trị đã được tính toán lần lượt set giá trị vào state tương ứng , từ đây các giá trị này tuyền cho các component con InputForm

- => Đây là ví dụ nhỏ về viêc các component con có thể tác động đến state của componet cha và các component cùng cấp giao tiếp với nhau.

- => Trong react thì đây là cách mà data hoạt động. 

### 2. Hướng dẫn chi tiết làm game tictactoe














