'use strict';
const xlsx = require('xlsx');
const co = require('co');
const json2xls = require('json2xls');
const fs = require('fs');
const _ = require('lodash');

let fileNames = fs.readdirSync('./output/results/');
let fileNames2 = fs.readdirSync('./output/results2/');

co(function *() {
    for (let num = 1; num < 50; num++) {
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
                // console.log(data);
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
        list3 = list1.concat(list2);
        console.log(list3.length);
        // list3.sort();
        for (let re of list3){
            re.sort(function (a, b) {
                if (a.item > b.item) {
                    return 1
                } else {
                    return -1
                }
            });
        }
        console.log(list3);

        //var xls = json2xls(list3);
        // console.log(json2xls(JSON.stringify(list3, null, '    ')));
        let i = 0;
        let list4 = [];
        for (let item of list3) {
            list4 = list4.concat(item);
            list4.push({item: '', unit: ''});
            list4.push({item: 'item', unit: 'unit'});
            //fs.writeFileSync(__dirname + '/output/excel/' + num + '_result' + i + '.xlsx', xls, 'binary');
            i++;
        }
        fs.writeFileSync(__dirname + '/output/excel3/' + num + '_result.xlsx', json2xls(list4), 'binary');
    }
    //console.log(xlsx.utils.sheet_to_json(xlsx.readFile('./医院tag表8.9by刘雪完美补刀版byDq.xlsx').Sheets['所有医院tab表']))
}).catch(function (e) {
        console.log(e)
    }
);