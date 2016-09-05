/**
 * Created by dy on 16/9/2.
 */
'use strict';
const fs = require('fs');
const co = require('co');
const xlsx = require('node-xlsx');

const outputName = "湘雅医院化验单";
const inspection_result = `"INSPECTION_ID","TEST_ITEM_ID","GROUP_ID","INSPECTION_DATE","INSPECTION_TIME","SAMPLE_NUMBER","TEST_ITEM_SORT","ENGLISH_NAME","CHINESE_NAME","ORIGINAL_RESULT","QUANTITATIVE_RESULT","QUALITATIVE_RESULT","TEST_ITEM_REFERENCE","TEST_ITEM_UNIT","TEST_ITEM_CHARGE","WORKLOAD","TEST_COUNT","TEST_ORDER","INSPECTION_INSTRUMENT","INSPECTION_PERSON","INSPECTION_POSITION","REPORT_ID","COL_POSITION","PRINT_ID","REMARK","CHECK_PERSON","CHECK_TIME","INSPECTION_REAGENT","TEST_METHOD","HIS_ID","RESULT_TYPE","DATA_FROM","ALARM_FLAG","ALARM_REFERENCE"`;
const in_diagnose = '"DIAGNOSEFLOW","IN_PATIENT_FLOW","MR_ID","RECORDOWN_ID","RECORDOWN_NAME","RECORDMODIFY_ID","RECORDMODIFY_NAME","RECORDMODIFY_TIME","DIAGNOSERANGE","DIAGNOSETYPE","ICD","ICD2","DIAGNOSECONTENT","AFFIRMID","AFFIRMNAME","AFFIRMDATE","CURERESULT","SUPERDIAGNOSE_FLOW","SORT_NUM","DEPT_ID","DEPT_NAME","AREA_ID","AREA_NAME","SUBMIT_FLAG","SUBMIT_TIME","SUBMIT_ID","SUBMIT_NAMES","MD5_CONTENT","LOCK_FLAG","ELECSIGNATORY_FLAG","ELECSIGNATORY_TIME","ELECSIGNATORY_ID","ELECSIGNATORY_NAME","ELECSIGNATORY_CONTENT","DEATH_TYPE","DIAG_DESCRIBE","SPECIAL_FLAG","CONDITION_WHEN_IN","REMARK","BEFORE_REMARK","AFTER_REMARK","AFFIRMLEVEL","HEAD_DOCTIME","AFFIRMTIME","SCHIZOPHRENIA"';
const inspection_sample = '"INSPECTION_ID","GROUP_ID","INSPECTION_DATE","INSPECTION_TIME","SAMPLE_NUMBER","REQUISITION_ID","PATIENT_TYPE","OUTPATIENT_ID","INPATIENT_ID","INVOICE_ID","CHARGE_TYPE","PATIENT_NAME","PATIENT_SEX","AGE_TYPE","AGE_INPUT","AGE_SAVE","PATIENT_NATION","PATIENT_NATION_NAME","BLOODTYPE_ABO","BLOODTYPE_RH","PATIENT_DEPT","PATIENT_DEPT_NAME","PATIENT_WARD","PATIENT_WARD_NAME","PATIENT_BED","ESPECIAL_CONDITION","CLINICAL_DIAGNOSES","CLINICAL_DIAGNOSES_NAME","SAMPLE_CLASS","SAMPLE_CLASS_NAME","INFECT_STATUS","SAMPLE_STATUS","SAMPLE_STATUS_NAME","SAMPLING_POSITION","SAMPLING_POSITION_NAME","TEST_ORDER","TEST_ORDER_NAME","SAMPLE_CHARGE","ITEM_COUNT","WORKLOAD","SAMPLING_TIME","SAMPLING_PERSON","REQUISITION_TIME","REQUISITION_PERSON","DELIVER_HOSPITAL","INCEPT_TIME","INCEPT_PERSON","INPUT_PERSON","INPUT_TIME","INSPECTION_PERSON","CHECK_PERSON","CHECK_TIME","PRINT_PERSON","PRINT_TIME","PRINT_COUNT","EXPERT_RULE","CHARGE_STATE","INSPECTION_STATE","RERUN_STATE","READ_STATE","REMARK","REMARK_NAME","ID_CARD","CONFIRM_PERSON","CONFIRM_TIME","INSTRUMENT","PATIENT_TYPE_OLD","MOBILENO","SEND_DATE","SEND_STATE","PATIENT_BIRTHDAY","EXCHANGE_STATE","EXCHANGE_TIME","EXCHANGE_HOSPITAL","PRINT_PAGE","PRINT_NO","PDF_FLAG","SAMPLE_ID","INTERNET_SENDSTATE","MACHINE_TIME","POSITIVE_TIME","D_FLAG","RH_PHENOTYPE","C_PERSON","C_TIME","POSITIVE_TIME2","CANCEL_PERSON","READ_FLAG","COLLECT_STATE","COLLECT_PERSON","PATIENT_ID","ADDCHECK_PERSON","ADDCHECK_TIME","RUN_STATE","READ_PERSON","READ_TIME","LATE_REASON","FORECAST_TIME","CRITICAL_FLAG","AREA_ID","RD_STATE","AUTO_CHECK","TAT_STATE","ASSEMBLY_LINE","ALARM_ITEM","SPECIAL_ITEM","RESULTFINISH_TIME","SEND_PERSON","SEND_TIME","SAMPLE_CONTAMINATION"';
const requisition_info = '"REQUISITION_ID","PATIENT_TYPE","OUTPATIENT_ID","INPATIENT_ID","CHARGE_TYPE","PATIENT_NAME","PATIENT_SEX","PATIENT_AGE","PATIENT_NATION","BLOODTYPE_ABO","BLOODTYPE_RH","PATIENT_DEPT","PATIENT_WARD","PATIENT_BED","ESPECIAL_CONDITION","INSPECTED_INFO","INFECTION","CLINICAL_DIAGNOSES","MEDICAL_RECORD","REQUISITION_FROM","REQUISITION_DEPT","REQUISITION_TIME","REQUISITION_PERSON","EXECUTE_DEPT","EXECUTE_TIME","EXECUTE_PERSON","PRINT_DEPT","PRINT_TIME","PRINT_PERSON","SAMPLE_CLASS","SAMPLING_POSITION","SAMPLING_DEPT","SAMPLING_TIME","SAMPLING_PERSON","RECEIVE_DEPT","RECEIVE_TIME","RECEIVE_PERSON","LIST_DEPT","LIST_PERSON","LIST_TIME","POSITION1","POSITION2","REQUISITION_STATE","REMARK","HIS_ID","SEND_PERSON","QUEUE_NUMBER","QUEUE_STATE","ID_CARD","RETURN_PERSON","RETURN_TIME","RETURN_CAUSE","RETURN_METHOD","RETURN_ACCEPT_PERSON","RETURN_ACCEPT_REMARK","SEND_TIME","SEND_DEPT","PATIENT_TYPE_OLD","PATIENT_WARD_NAME","PATIENT_DEPT_NAME","REQUISITION_PERSON_NAME","MOBILE_NO","INSPECTION_TIME","INSPECTION_PERSON","REPORT_TIME","REPORT_PERSON","CHARGE","TEST_ORDER_NAME","INSPECTION_DATE","SAMPLING_TIME2","TUBE_FLAG","PATIENT_BIRTHDAY","SAMPLING_GROUP","SAMPLING_FLAG","SENDOUT_TIME","SENDOUT_PERSON","GET_REPORT_TIME","ADDRESS","PATIENT_ID","INSPECT_DEPT","SENDIN_TIME","SENDIN_PERSON","SENDIN_GROUP","TAKE_MEDICINE","DIET","CANCEL_PERSON","CANCEL_TIME","REQUISITION_STATE_BAK","UNITE_FLAG","SENDIN_PLACE","LAB_ID","AREA_ID","INHOSPITAL_TIME"';
const main_mr_baseinfo = '"MR_ID","PATIENT_NAME","PATIENT_NAME_SPELL","PATIENT_SEX","PATIENT_BIRTHDAY","PATIENT_BLOOD_TYPE","PATIENT_HEIGHT","PATIENT_WEIGHT","PATIENT_COUNTRY","PATIENT_NATIVEPLACE","PATIENT_BORNPLACE","PATIENT_NATION","PATIENT_CULTURELEVEL","PATIENT_MARRIED","PATIENT_PAPERTYPE","PATIENT_PAPERNUM","FEE_TYPE","MC_CODE","WITHINFO_CODE","IS_ARMYMAN","CORPS_ARMS","PATIENT_JOB","PATIENT_WORKFOR","WORK_ADDRESS","WORK_PHONE","WORK_ZIP","HOME_ADDRESS","HOME_ZIP","HOME_PHONE","HOME_CALL","HOME_EMAIL","RELATION_NAME","RELATION_SHIP","RELATION_ADDR","RELATION_ZIP","RELATION_PHONE","RELATION_CALL","RELATION_EMAIL","PATIENT_RELIGION","PATIENT_BIRTHTIME","CITY_CODE","CTTY_NAME","ROAD_CODE","ROAD_NAME","PATIENT_BORNPLACE_CODE","RELATION_CITY_CODE","RELATION_CITY_NAME","RELATION_ROAD_CODE","RELATION_ROAD_NAME","IS_PATH_WAY","PW_DISEASE","RELATION_WORK_ADD","RELATION_JOB_ADD","IS_LOCAL","DOOR_ADDRESS","TM_NAME","XML_TL_ID","TM_PRINT_ID","BASEINFO_CONTENT","BABY_WEIGHT_IN","BORN_PROVINCE","BORN_CITY","JG_PROVINCE","JG_CITY","ADDRESS_PROVINCE","ADDRESS_CITY","ADDRESS_COUNTY","HK_PROVINCE","HK_CITY","HK_COUNTY","HK_ZIP","HK_STREET","JHR_NAME","JHR_IDENTITY","JHR_RELATIONSHIP","BORN_COUNTY","BABY_WEIGHT_BORN","BORN_PROVINCE_CODE","BORN_CITY_CODE","BORN_COUNTY_CODE","JG_PROVINCE_CODE","JG_CITY_CODE","ADDRESS_PROVINCE_CODE","ADDRESS_CITY_CODE","ADDRESS_COUNTY_CODE","HK_PROVINCE_CODE","HK_CITY_CODE","HK_COUNTY_CODE","HK_STREET_CODE","ACCUSAL","TERM_IMPRISONMENT","LEAVE_IMPRISONMENT","CRIME","SIN_MANAGE","IS_DANGER","CONVICT_NUM","HOS_POLICEMAN","WARD_POLICEMAN","INSPECT_PLACE","PART_INSPECT_PLACE","OUTLAW_NURSE_NAME","OUTLAW_NURSE_AGE","OUTLAW_NURSE_NATIVE_PLACE","OUTLAW_NURSE_ACCUSAL","OUTLAW_NURSE_CULTURELEVEL","OUTLAW_NURSE_IMPRISONMENT","OUTLAW_LEAVE_IMPRISONMENT","OUTLAW_NURSE_CONVICT_NUM","DOOR_CODE","CLINIC_BAR_CODE","SPECIAL_PATIENT","EMPI_NUM","RELATION_NAMES","RELATION_SHIPS","RELATION_WORK_ADDS","RELATION_ADDRS","RELATION_CALLS","RELATION_QQS","RELATION_EMAILS","RELATION_WECHATS","THIRD_NAMES","THIRD_SHIPS","THIRD_WORK_ADDS","THIRD_ADDRS","THIRD_CALLS","THIRD_QQS","THIRD_EMAILS","THIRD_WECHATS"';

let fileNames = fs.readdirSync('./resources/');

// ref: http://stackoverflow.com/a/1293163/2343
// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
function CSVToArray(strData, strDelimiter) {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp((
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
    );
    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];
    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;
    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {
        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[1];
        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
        ) {
            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push([]);
        }
        var strMatchedValue;
        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[2]) {
            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[2].replace(
                new RegExp("\"\"", "g"),
                "\""
            );
        } else {
            // We found a non-quoted value.
            strMatchedValue = arrMatches[3];
        }
        // Now that we have our value string, let's add
        // it to the data array.
        arrData[arrData.length - 1].push(strMatchedValue);
    }

    // Return the parsed data.
    return ( arrData );
}

co(function *() {
    // xlsx.writeFile(wb, '湘雅医院化验单.xlsx');
    let sheets = [];
    for (let fileName of fileNames) {
        if (fileName.endsWith('.csv')) {
            let content = fs.readFileSync('./resources/' + fileName).toString();
            let lines = content.split('\n');
            let firstLine = lines[0].trim();
            let sheetName = "";
            if (firstLine === inspection_result) {
                sheetName = "lis_inspection_result";
            }
            if (firstLine === in_diagnose) {
                sheetName = "IN_DIAGNOSE_RC";

            }
            if (firstLine === inspection_sample) {
                sheetName = "lis_inspection_sample";

            }
            if (firstLine === requisition_info) {
                sheetName = "lis_requisition_info";

            }
            if (firstLine === main_mr_baseinfo) {
                sheetName = "MAIN_MR_BASEINFO";
            }
            if (sheetName == '') {
                continue
            }
            let table = [];
            for (let line of lines) {
                if (line.trim() == '') {
                    continue
                }
                let row = CSVToArray(line.trim());
                //console.log(row)
                table.push(row[0])
            }
            sheets.push({
                name: sheetName,
                data: table
            })
        }
    }

    //console.dir(sheets[0], {depth: null})
    let buffer = xlsx.build(sheets);
    fs.writeFileSync('./output/' + outputName + '.xlsx', buffer)

}).catch(function (e) {
        console.log(e)
    }
);


