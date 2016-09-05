/**
 * Created by dy on 16/9/2.
 */
'use strict';
const fs = require('fs');
const co = require('co');
const xlsx = require('xlsx');

let A = function *(sheetName) {
    return xlsx.utils.sheet_to_json(xlsx.readFile('./output/湘雅医院化验单.xlsx', {type: "binary"}).Sheets[sheetName])
};

const ins_res = "lis_inspection_result";
const dia_rc = "IN_DIAGNOSE_RC";
const ins_sample = "lis_inspection_sample";
const requisition_info = "lis_requisition_info";
const basic_info = "MAIN_MR_BASEINFO";

const format_list = ["姓名", "性别", "年龄", "费用类别", "申请科室", "病区", "床号", "住院号", "医保号",
    "标本号", "报告单编号", "标本种类", "临床诊断"];

co(function *() {
    let result = {};
    let table = [];
    let formattedText = [];
    let body = [];
    let header = [
        {
            "mappingKey": "key",
            "name": "项目"
        },
        {
            "mappingKey": "value",
            "name": "结果"
        },
        {
            "mappingKey": "unit",
            "name": "单位"
        },
        {
            "mappingKey": "valueLevel",
            "name": "异常"
        },
        {
            "mappingKey": "reference",
            "name": "参考值"
        }
    ];
    let tmp = [];
    let list1 = [];
    // read from different sheetName
    let ins_result = yield A(ins_res);
    let dia_rc_record = yield A(dia_rc);
    let basic_info_record = yield A(basic_info);
    let sample_record = yield A(ins_sample);

    let benchmark = ins_result[0].SAMPLE_NUMBER;
    // console.log(outpatient_ID);
    for (let i = 0; i < ins_result.length; i++) {
        if (ins_result[i].SAMPLE_NUMBER === benchmark) {
            list1.push(ins_result[i]);
        } else {
            tmp.push(list1);
            benchmark = ins_result[i].SAMPLE_NUMBER;
            // console.log(benchmark);
            list1 = [];
            list1.push(ins_result[i]);
        }
    }
    tmp.push(list1);
    // console.log(tmp);
    // console.log(tmp.length);
    for (let ii = 0; ii < tmp.length; ii++) {
        for (let items of tmp[ii]) {
            body.push({
                "key": items.CHINESE_NAME,
                "reference": items.TEST_ITEM_REFERENCE,
                "unit": items.TEST_ITEM_UNIT,
                "value": items.QUANTITATIVE_RESULT,
                "valueLevel": items.QUALITATIVE_RESULT
            });
        }
        // table["body"] = body;
        // table["header"] = header;
        table.push({
            "body": body,
            "header": header
        });
        let index = 0;
        for (let text of format_list) {
            formattedText.push({
                "index": index,
                "key": text
            });
            index++;
        }
        console.log(tmp[ii][0].INSPECTION_ID);


        let outpatient_ID = "";
        for (let sample of sample_record) {
            if (sample.INSPECTION_ID === tmp[ii][0].INSPECTION_ID) {
                outpatient_ID = sample.OUTPATIENT_ID;
            }
        }

        for (let text of formattedText) {
            if (text.key === "姓名") {
                for (let info of basic_info_record) {
                    if (outpatient_ID === info.MR_ID) {
                        text.value = info.PATIENT_NAME;
                    }
                }
            }
            if (text.key === "性别") {
                for (let info of basic_info_record) {
                    if (outpatient_ID === info.MR_ID) {
                        text.value = info.PATIENT_SEX;
                    }
                }
            }
            if (text.key === "年龄") {
                for (let info of basic_info_record) {
                    if (outpatient_ID === info.MR_ID) {
                        text.value = calculateAge(info.PATIENT_BIRTHDAY);
                    }
                }
            }
            if (text.key === "费用类别") {
                for (let info of basic_info_record) {
                    if (outpatient_ID === info.MR_ID) {
                        text.value = info.FEE_TYPE || "";
                    }
                }
            }

            if (text.key === "申请科室") {
                for (let sample of sample_record) {
                    if (sample.INSPECTION_ID === tmp[ii][0].INSPECTION_ID) {
                        text.value = sample.PATIENT_DEPT_NAME || "";
                    }
                }
            }

            if (text.key === "病区") {
                for (let sample of sample_record) {
                    if (sample.INSPECTION_ID === tmp[ii][0].INSPECTION_ID) {
                        text.value = sample.PATIENT_WARD_NAME || "";
                    }
                }
            }

            if (text.key === "床号") {
                for (let sample of sample_record) {
                    if (sample.INSPECTION_ID === tmp[ii][0].INSPECTION_ID) {
                        text.value = sample.PATIENT_BED || "";
                    }
                }
            }

            if (text.key === "住院号") {
                for (let dia of dia_rc_record) {
                    if (outpatient_ID === dia.MR_ID) {
                        text.value = dia.IN_PATIENT_FLOW;
                    }
                }
            }

            if (text.key === "医保号") {
                for (let info of basic_info_record) {
                    if (outpatient_ID === info.MR_ID) {
                        text.value = info.MC_CODE || "";
                    }
                }
            }
            if (text.key === "标本号") {
                for (let sample of sample_record) {
                    if (sample.INSPECTION_ID === tmp[ii][0].INSPECTION_ID) {
                        text.value = sample.SAMPLE_NUMBER || "";
                    }
                }
            }
            if (text.key === "报告单编号") {
                for (let sample of sample_record) {
                    if (sample.INSPECTION_ID === tmp[ii][0].INSPECTION_ID) {
                        text.value = sample.INSPECTION_ID || "";
                    }
                }
            }
            if (text.key === "标本种类") {
                for (let sample of sample_record) {
                    if (sample.INSPECTION_ID === tmp[ii][0].INSPECTION_ID) {
                        text.value = sample.SAMPLE_CLASS_NAME || "";
                    }
                }
            }
            if (text.key === "临床诊断") {
                for (let sample of sample_record) {
                    if (sample.INSPECTION_ID === tmp[ii][0].INSPECTION_ID) {
                        text.value = sample.CLINICAL_DIAGNOSES || "";
                    }
                }
            }


        }
        result["info"] = formattedText;
        result["table"] = table;
        // console.log(JSON.stringify(table));
        fs.writeFileSync('./outputJson/tmp' + ii + '.json', JSON.stringify(result, null, 4));
        formattedText = [];
        body = [];
        table = [];
    }
}).catch(function (e) {
        console.log(e)
    }
);

function calculateAge(dob) {
    var year = Number(dob.substr(0, 4));
    var month = Number(dob.substr(4, 2)) - 1;
    var day = Number(dob.substr(6, 2));
    var today = new Date();
    var age = today.getFullYear() - year;
    if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
        age--;
    }
    return age;
}