'use strict';
const fs = require('fs');

let fileNames = fs.readdirSync('./output/results/');
let fileNames2 = fs.readdirSync('./output/results2/');
for (let num = 1; num < 48; num++) {
    let list1 = [];
    for (let fileName of fileNames) {
        if (fileName.startsWith(num + '_')) {
            let data = require('./output/results/' + fileName);
            list1.push(data)
        }
    }

    let list2 = [];
    for (let fileName2 of fileNames2) {
        if (fileName2.startsWith(num + '_')) {
            let data = require('./output/results2/' + fileName2);
            data.sort(function (a, b) {
                if (a.item > b.item) {
                    return 1
                } else {
                    return -1
                }
            });
            list2.push(data)
        }
    }

    let list3 = [];

    for (let item1 of list1) {
        for (let item2 of list2) {
            if (JSON.stringify(item1) == JSON.stringify(item2)) {
                console.log(JSON.stringify(item1), JSON.stringify(item2));
                list3.push(item1)
            }
        }
    }
//console.log(list3)

    let list4 = list1.filter(item => {
        for (let i of list3) {
            if (JSON.stringify(item) == JSON.stringify(i)) {
                return false
            }
        }
        return true
    });

    let list5 = list2.filter(item => {
        for (let i of list3) {
            if (JSON.stringify(item) == JSON.stringify(i)) {
                return false
            }
        }
        return true
    });

    let list6 = list4.concat(list5);
// console.log(list1);
// console.log(list3.length);
// console.log(list4.length);
// console.log(list5.length);

    for (let i = 0; i < list3.length; i++) {
        let t = list3[i];
        fs.writeFileSync('./output/same/' + num + '_' + i + '.json', JSON.stringify(t, null, '    '))
    }
    ;

    for (let i = 0; i < list6.length; i++) {
        let t = list6[i];
        fs.writeFileSync('./output/duplicate/' + num + '_' + i + '.json', JSON.stringify(t, null, '    '))
    }
    ;
}
