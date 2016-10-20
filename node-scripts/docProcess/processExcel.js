'use strict';
const xlsx = require('xlsx');
const co = require('co');
const json2xls = require('json2xls');
const fs = require('fs');
const _ = require('lodash');
let A = function *(sheetName) {
    return xlsx.utils.sheet_to_json(xlsx.readFile('./resources/dalian.xlsx', {type: "binary"}).Sheets[sheetName])
};

co(function *() { 
    for (let num = 1; num < 49; num++) {
        let result = yield A(num);
        //console.log(result);
        let list = [];
        let table = [];
        let head = {};
        // if (num == 6) {
        //     console.log(result);
        //     console.log('asdsadf');
        // }
        for (let item of result) {
            let isHead = false;
            for (let key in item) {
                if (key == 'undefined') {
                    console.log('------',num)
                }
                if (item[key] == key) {
                    isHead = true;
                    head[key] = 1
                }
            }
            if (!isHead) {
                table.push(item)
            } else {
                for (let row of table) {
                    for (let key in head) {
                        row[key] = row[key] || ''
                    }
                }
                list.push(table);
                table = []
            }
        }
        if (table.length > 0) {
            for (let row of table) {
                for (let key in head) {
                    row[key] = row[key] || ''
                }
            }
            list.push(table)
        }
        // continue
        // console.log(list);
        for (let i = 0; i < list.length; i++) {
            let t = list[i];
            let newTable = [];
            for (let row of t) {
                let newRow = {};
                for (let key in row) {
                    let newKey = key.trim();
                    let value = row[key].trim();
                    newRow[newKey] = value
                }
                newTable.push(newRow)
            }
            // console.log(newTable);
            fs.writeFileSync('./output/templates/' + num + '_' + i + '.json', JSON.stringify(newTable, null, '    '))
        }
    }
}).catch(function (e) {
        console.log(e)
    }
);
