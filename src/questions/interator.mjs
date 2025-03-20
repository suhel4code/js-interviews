// Without symbol.iterator will not work for of it jsut a iterator
function iter(start = 1,end = 10,step = 2) {
    let count = 0;

    const obj = {
        next() {
            if(start <= end) {
                let val = start;
                start += step;
                count++;
                return {value:val,done:false,extraInfor:'passed'
                };
            } else {
                return {value:count,done:true}
            }
        }
    }

    return obj;
}

// Now it is a iterable
function iterUsingIterable(start = 1,end = 10,step = 2) {
    let count = 0;

    const obj = {
        [Symbol.iterator]() {
            return {
                next() {
                    if(start <= end) {
                        let val = start;
                        start += step;
                        count++;
                        return {value:val,done:false,extraInfor:'passed'
                        };
                    } else {
                        return {value:count,done:true}
                    }
                }
            }
          
        }
        
     
    }
    return obj
}

function* gen(start = 1,end = 10, step = 2) {
    while(start <= end) {
        yield start;
        start += step;
    }
}

let result1 = iterUsingIterable();
let result2 = gen();
console.log('iter is ',result1)
console.log('iter is using gen',result2)

for(const val of result1) {
    console.log('val is ',val);
}

// for(const val of result2) {
//     console.log('val is ',val);
// }

// let val = result.next()

// while(val.done != true) {
//     console.log('val ',val);
//     val = result.next();
// }