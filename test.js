
// th1 thực thi function thông thường
function a1() {
    console.log('a1', this)
    function fa1() {
        console.log('fa1', this)
    }
    fa1();
}

// a1()
// th2 thực thi method trong 1 object
let a2 = {
    val2: 2,
    m2: function () {
        console.log('m2', this);
        function m21() {
            console.log('m21', this);
        }
        const that = this;
        const m22 = () => {
            console.log('m22', this);
            console.log('m22====', that === this);
        }
        m21()
        m22()
    },
    m3: () => {
        console.log(this, 'm3')
    }
}

a2.m3();
// let b2 = a2.m2;
// b2();
// th3 bind call apply
const b1 = a1.bind({ dnd: 'ducdn' });
// b1();

// th4 khi dung new 

function a4(val) {
    const b = 2;
    this.a = val;
    this.f4 = function () {
        console.log('b', b)
    }
}

const a41 = new a4(9);
// a4();
// console.log('b=======', b)
//  b1 : tao 1 object 
//  b2 : gán object vào this 
//  b3 : gan obj vao a41
// console.log(a41.a)
// console.log(a41.f4())
// a41.f4();

// mức độ yêu tiên là 4 => 3 => 2 => 1

