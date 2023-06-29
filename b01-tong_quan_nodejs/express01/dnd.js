
const foo = () => {
    // return 1;
    return (b) => {
        return b;
    }
}

// cách 1;
const re = foo();
// cách 2;
const _re = (b) => {
    return b;
};



const re1 = re(4);

console.log('re1:', re1);