Survey
    .StylesManager
    //.applyTheme("bootstrap");
    .applyTheme("modern");
    


var json = {
    title: "근로장려금 신청 대상 확인",
    showProgressBar: "bottom",
    goNextPageAutomatic: true,
    showNavigationButtons: false,
    showCompletedPage: false,
    pages: [
        {
            questions: [
                {
                    type: "radiogroup",
                    name: "가구형태",
                    title: "가구형태를 선택해주시기 바랍니다.",
                    description: "근로장려금은 가구 별로 지급하므로 1가구에 1명만 신청할 수 있으며, 배우자･부양가족 유무에 따라 단독･외벌이･맞벌이 가구로 구분합니다.",
                    choices: ["단독가구", "외벌이가구", "맞벌이가구"]
                }
            ]
        }, {
            questions: [
                {
                    type: "text",
                    inputType: "number",
                    name: "소득요건",
                    title: "소득금액을 입력해주시기 바랍니다.",
                    description: "2020년 부부합산 소득금액(만원)을 입력하시기 바랍니다.",
                }
            ]
        }, {
            questions: [
                {
                    type: "radiogroup",
                    name: "재산요건",
                    title: "보유한 재산규모를 입력하세요.",
                    description: "모든 가구원의 2020.6.1. 현재 부동산·전세금·자동차·예금 등 재산합계액을 입력해주세요.",
                    choices: ["2억원 미만", "2억원 이상"]
                }
            ]
        }
    ],
    
};

window.survey = new Survey.Model(json);


survey
    .onComplete
    .add(function (result) {

        test_result = false;
        console.log(result.data);
        if (result.data['재산요건'] == "2억원 이상") {
            
           test_result = false;
           
        } else {
            if (result.data['가구형태'] == "단독가구") {
                if(result.data['소득요건'] > 4 & result.data['소득요건'] < 2000) {
                    test_result = true
                }
                else {
                    test_result = false
                }
            }
            else if (result.data['가구형태'] == "외벌이가구") {
                if(result.data['소득요건'] > 4 & result.data['소득요건'] < 3000) {
                    test_result = true
                }
                else {
                    test_result = false
                }
            }
            else if (result.data['가구형태'] == "맞벌이가구") {
                if(result.data['소득요건'] > 4 & result.data['소득요건'] < 3600) {
                    test_result = true
                }
                else {
                    test_result = false
                }
            }
        }

        if (test_result == true) {
            document
            .querySelector('#surveyResult')
            .innerHTML = "<h2>축하드립니다.</h2><h3>신청대상입니다</h3>";
        } else {
            document
            .querySelector('#surveyResult')
            .innerHTML = "<h2>아쉽네요.</h2><h3>신청대상이 아닙니다.</h3>";
        }
            
            
        console.log(test_result);
    });

$("#surveyElement").Survey({model: survey});