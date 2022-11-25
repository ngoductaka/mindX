// 
const loginService = ({name, pass}) => {

}
// DB

// user
// {
//  name: '', //string
//  age: // number
//  id: string id
//  pass:
// }



const addNew = (student) => {
    // các bước cần làm 
    // b1: đọc và convert nội dung file json sang mảng
    // b2: thêm object vào mảng 
    // b3: ghi đè nội dung file

    // b1 lấy nội dung file
    fs.readFile('student.json', 'utf8', (err, data) => {
        if (err) { // có lỗi => file không tồn tại hoặc có lỗi khi đọc 
            console.log('lỗi khi đọc file')
            throw err;
        }
        // khi lấy được dữ liệu thì cần JSON.parse để lấy ra mảng vì dữ liệu lấy ra là string 
        // ******** 1 số trương hợp xảy ra lỗi nếu data lấy ra không phải là json ******
        const convertData = JSON.parse(data);

        //b2 thêm mới student
        const newList = [
            ...convertData,
            student
        ];
        //b3 ghi đè dữ liệu cũ
        fs.writeFile('student.json', JSON.stringify(newList), function (err) {
            if (err) { // có lỗi 
                console.log(err);
                throw err;
            }
            console.log('THêm mới học sinh thành công');
        });
    })
}


module.exports = {
    loginService,
}