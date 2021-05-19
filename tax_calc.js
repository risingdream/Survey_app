// 테마 설정
Survey
    .StylesManager
    //.applyTheme("bootstrap");
    //.applyTheme("modern");
    .applyTheme("winter");

// 모달 설정
Survey
    .Serializer
    .addProperty("question", "popupdescription:text");
Survey
    .Serializer
    .addProperty("page", "popupdescription:text");

function showDescription(element) {
    document
        .getElementById("questionDescriptionText")
        .innerHTML = element.popupdescription;
    $("#questionDescriptionPopup").modal();
}

// 사용자 언어 설정
var mycustomSurveyStrings = {
    pagePrevText: "다음",
    pageNextText: "이전",
    completeText: "완료"
};

Survey
    .surveyLocalization
    .locales["my"] = mycustomSurveyStrings;


// 페이지 본문 설정

var json = {
    title: "양도세 계산기",
    //showProgressBar: "bottom",
    progressBarType: "buttons",
    //goNextPageAutomatic: true,
    showNavigationButtons: true,
    showCompletedPage: false,
    requiredText: "(필수)",
    pages: [
        {
            navigationTitle: "거래대상",
            navigationDescription: "Your feedback",
            questions: [
                {
                    type: "radiogroup",
                    name: "거래대상",
                    title: "거래하신 자산을 선택해주세요.",
                    colCount: 2,
                    popupdescription: "근로장려금은 가구 별로 지급하므로 1가구에 1명만 신청할 수 있으며, 배우자･부양가족 유무에 따라 단독･외벌이･맞벌이 가구로 구분합니다.",
                    choices: ["주택", "분양권", "토지", "기타"],
                    isRequired: true,
                },
                {
                    type: "radiogroup",
                    name: "주택수",
                    title: "보유하신 주택 수를 선택해주세요.",
                    colCount: 2,
                    defaultValue: "1주택",
                    choices: ["1주택", "2주택", "3주택 이상", "기타"],
                    visibleIf: "{거래대상}='주택'",
                    isRequired: true,
                },
                {
                    type: "checkbox",
                    name: "조정지역_취득",
                    title: "조정대상지역",
                    visibleIf: "{거래대상}='주택' and {주택수}='1주택'",
                    choices: ["취득당시 조정대상지역"],
                    //isRequired: true,
                },
                {
                    type: "checkbox",
                    name: "조정지역_양도",
                    title: "조정대상지역",
                    visibleIf: "{거래대상}='주택' and ({주택수}='2주택' or {주택수}='3주택 이상')",
                    choices: ["양도당시 조정대상지역"],
                    //isRequired: true,
                },
                {
                    type: "checkbox",
                    name: "주택기타사항",
                    title: "기타사항",
                    colCount: 2,
                    visibleIf: "{거래대상}='주택'",
                    choices: ["다주택 전환", "임대주택"],
                }, 
                {
                    type: "radiogroup",
                    name: "토지사용목적",
                    title: "토지의 사용목적",
                    colCount: 2,
                    choices: ["사업용", "비사업용"],
                    visibleIf: "{거래대상}='토지'",
                    isRequired: true,
                },
                {
                    type: "checkbox",
                    name: "기타사항",
                    title: "기타사항",
                    colCount: 2,
                    defaultValue: ["기본공제"],
                    visibleIf: "{거래대상} notempty",
                    choices: ["기본공제", "공동명의"],
                },
                {
                    type: "text",
                    inputType: "number",
                    name: "지분율",
                    title: "양도할 지분율(%)",
                    visibleIf: "{기타사항} contains '공동명의'",
                    isRequired: true,
                    //description: "2020년 부부합산 소득금액(만원)을 입력하시기 바랍니다.",
                },

            ]
        }, {
            navigationTitle: "양도차익",
            questions: [
                {
                    type: "text",
                    inputType: "number",
                    name: "양도가액",
                    title: "양도가액(원)",
                    isRequired: true,
                    //description: "2020년 부부합산 소득금액(만원)을 입력하시기 바랍니다.",
                }, {
                    type: "text",
                    inputType: "number",
                    name: "취득가액",
                    title: "취득가액(원)",
                    isRequired: true,
                    //description: "2020년 부부합산 소득금액(만원)을 입력하시기 바랍니다.",
                }, {
                    type: "text",
                    inputType: "number",
                    name: "필요경비",
                    title: "필요경비(원)",
                    isRequired: true,
                    //description: "2020년 부부합산 소득금액(만원)을 입력하시기 바랍니다.",
                }, 

            ]
        }, 
        {
            
            navigationTitle: "보유기간",
            questions: [
                {
                    type: "bootstrapdatepicker",
                    inputType: 'date',
                    name: "취득일자",
                    title: "취득일자",
                    //description: "모든 가구원의 2020.6.1. 현재 부동산·전세금·자동차·예금 등 재산합계액을 입력해주세요.",
                    dateFormat: "yyyy-mm-dd",
                    //isRequired: true,
                }, {
                    type: "bootstrapdatepicker",
                    inputType: 'date',
                    name: "양도일자",
                    title: "양도일자",
                    //description: "모든 가구원의 2020.6.1. 현재 부동산·전세금·자동차·예금 등 재산합계액을 입력해주세요.",
                    dateFormat: "yyyy-mm-dd",
                    //isRequired: true,
                }, {
                    type: "radiogroup",
                    name: "거주기간",
                    title: "거주기간",
                    colCount: 2,
                    choices: ["보유기간 동일", "거주기간 없음"],
                    visibleIf: "{거래대상}='주택'",
                    //isRequired: true,
                },
            ]

        }
        
    ],
    
};


// 서베이 생성
window.survey = new Survey.Model(json);

// 사용자 언어 설정
survey.locale = 'ko';    


// 완료시 이벤트
survey
    .onComplete
    .add(function (result) {

        test_result = false;
        console.log(result.data);
        var 양도차익 = result.data['양도가액'] - result.data['취득가액'] - result.data['필요경비'];

        var 공제율 = 0;
        var 양도일자 = moment(result.data['양도일자']);
        var 취득일자 = moment(result.data['취득일자']);
        var 보유기간 = 양도일자.diff(취득일자, "years");
        var 장기보유특별공제 = 0;

        // 장기보유 특별공제 기본세율
        if (보유기간 == 2) {
            공제율 = 0.0
        } else if (보유기간 == 3) {
            공제율 = 0.06
        } else if (보유기간 == 4) {
            공제율 = 0.08
        } else if (보유기간 == 5) {
            공제율 = 0.1
        } else if (보유기간 == 6) {
            공제율 = 0.12 
        } else if (보유기간 == 7) {
            공제율 = 0.14 
        } else if (보유기간 == 8) {
            공제율 = 0.16
        } else if (보유기간 == 9) {
            공제율 = 0.18
        } else if (보유기간 == 10) {
            공제율 = 0.20
        } else if (보유기간 == 11) {
            공제율 = 0.22
        } else if (보유기간 == 12) {
            공제율 = 0.24
        } else if (보유기간 == 14) {
            공제율 = 0.26
        } else if (보유기간 == 16) {
            공제율 = 0.28
        } else if (보유기간 >= 17) {
            공제율 = 0.3
        }

        var 과세대상양도차익 = 0;

        if (result.data['거래대상'] == "주택") {
        
            // 1세대 1주택 고가주택
            if (result.data['주택수'] == "1주택") {
            
                if (result.data['양도가액'] > 900000000) {
                    
                    // 9억초과분 양도차익 안분계산
                    과세대상양도차익 = 양도차익 * (result.data['양도가액'] - 900000000) / result.data['양도가액'];

                    // 1세대 1주택인 경우 장기보유 특별공제 세율
                    if (보유기간 == 2) {
                        공제율 = 0.08
                    } else if (보유기간 == 3) {
                        공제율 = 0.12
                    } else if (보유기간 == 4) {
                        공제율 = 0.16
                    } else if (보유기간 == 5) {
                        공제율 = 0.2
                    } else if (보유기간 == 6) {
                        공제율 = 0.24 
                    } else if (보유기간 == 7) {
                        공제율 = 0.28 
                    } else if (보유기간 == 8) {
                        공제율 = 0.32
                    } else if (보유기간 == 9) {
                        공제율 = 0.36
                    } else if (보유기간 >= 10) {
                        공제율 = 0.4
                    }

                    var 거주기간 = 보유기간;

                    // 거주기간 합산
                    if (거주기간 == 2) {
                        공제율 += 0.08
                    } else if (거주기간 == 3) {
                        공제율 += 0.12
                    } else if (거주기간 == 4) {
                        공제율 += 0.16
                    } else if (거주기간 == 5) {
                        공제율 += 0.2
                    } else if (거주기간 == 6) {
                        공제율 += 0.24 
                    } else if (거주기간 == 7) {
                        공제율 += 0.28 
                    } else if (거주기간 == 8) {
                        공제율 += 0.32
                    } else if (거주기간 == 9) {
                        공제율 += 0.36
                    } else if (거주기간 >= 10) {
                        공제율 += 0.4
                    }

                }
                else {
                    과세대상양도차익 = 0;
                }

            } else {
                과세대상양도차익 = 양도차익;
            }       

        } 

        장기보유특별공제 = 과세대상양도차익 * 공제율;

        var 양도소득금액 = Math.max(0, 과세대상양도차익 - 장기보유특별공제);

        var 과세표준 = 양도소득금액;
        var 기본공제 = 0;
        
        if ("기타사항" in result.data) {
            // 기본공제 차감
            
            if (result.data["기타사항"].includes("공동명의")) {
                과세표준 = 과세표준 * result.data['지분율'] / 100;
            }

            if (result.data["기타사항"].includes("기본공제")) {
                기본공제 = Math.min(과세표준,2500000);
                과세표준 = 과세표준 - 기본공제;
            }
        }


        // 산출세액 계산

        var 산출세액 = 0;

        if (result.data['거래대상'] == '토지' & result.data['토지사용목적'] == "비사업용") {

            if (과세표준 <= 12000000) {
                산출세액 = 과세표준 * 0.06;
            } else if (과세표준 <= 46000000) {
                산출세액 = 과세표준 * 0.15 - 1080000;
            } else if (과세표준 <= 88000000) {
                산출세액 = 과세표준 * 0.24 - 5220000;
            } else if (과세표준 <= 150000000) {
                산출세액 = 과세표준 * 0.35 - 14900000;
            } else if (과세표준 <= 300000000) {
                산출세액 = 과세표준 * 0.38 - 19400000;
            } else if (과세표준 <= 500000000) {
                산출세액 = 과세표준 * 0.4 - 25400000;
            } else if (과세표준 > 500000000) {
                산출세액 = 과세표준 * 0.42 - 35400000;
            }

        } else {

            if (과세표준 <= 12000000) {
                산출세액 = 과세표준 * 0.06;
            } else if (과세표준 <= 46000000) {
                산출세액 = 과세표준 * 0.15 - 1080000;
            } else if (과세표준 <= 88000000) {
                산출세액 = 과세표준 * 0.24 - 5220000;
            } else if (과세표준 <= 150000000) {
                산출세액 = 과세표준 * 0.35 - 14900000;
            } else if (과세표준 <= 300000000) {
                산출세액 = 과세표준 * 0.38 - 19400000;
            } else if (과세표준 <= 500000000) {
                산출세액 = 과세표준 * 0.4 - 25400000;
            } else if (과세표준 > 500000000) {
                산출세액 = 과세표준 * 0.42 - 35400000;
            }
        }
        

        var 지방소득세 = 산출세액 * 0.1;
        var 결정세액 = 산출세액 + 지방소득세;

        console.log("양도차익", 양도차익);
        console.log("장기보유특별공제", 장기보유특별공제);
        console.log("과세대상양도차익", 과세대상양도차익);
        //console.log("양도소득금액", 양도소득금액);
        console.log("과세표준", 과세표준);
        console.log("산출세액", 산출세액);
        console.log("결정세액", 결정세액);

        var result_html = "<table class='table'><thead><tr><th>내용</th><th>금액</th></tr></thead>";
        result_html += "<tbody>";
        result_html += "<tr><td>양도가액</td><td class='text-right'>"+numeral(result.data['양도가액']).format("0,0")+"원</td></tr>";
        result_html += "<tr><td>취득가액</td><td class='text-right'>"+numeral(result.data['취득가액']).format("0,0")+"원</td></tr>";
        result_html += "<tr><td>필요경비</td><td class='text-right'>"+numeral(result.data['필요경비']).format("0,0")+"원</td></tr>";
        result_html += "<tr><td>양도차익</td><td class='text-right'>"+numeral(양도차익).format("0,0")+"원</td></tr>";
        result_html += "<tr><td>과세대상 양도차익</td><td class='text-right'>"+numeral(과세대상양도차익).format("0,0")+"원</td></tr>";
        result_html += "<tr><td>장기보유특별공제</td><td class='text-right'>"+numeral(장기보유특별공제).format("0,0")+"원</td></tr>";
        result_html += "<tr><td>양도소득금액</td><td class='text-right'>"+numeral(양도소득금액).format("0,0")+"원</td></tr>";
        if (result.data["기타사항"].includes("공동명의")) {
            result_html += "<tr><td>지분율</td><td class='text-right'>"+numeral(result.data['지분율']).format("0,0")+"%</td></tr>"
            result_html += "<tr><td>과세대상 소득금액</td><td class='text-right'>"+numeral(양도소득금액*result.data['지분율']).format("0,0")+"원</td></tr>"
        };
        result_html += "<tr><td>기본공제</td><td class='text-right'>"+numeral(기본공제).format("0,0")+"원</td></tr>";
        result_html += "<tr><td>과세표준</td><td class='text-right'>"+numeral(과세표준).format("0,0")+"원</td></tr>";
        result_html += "<tr><td>양도소득세</td><td class='text-right'>"+numeral(산출세액).format("0,0")+"원</td></tr>";
        result_html += "<tr><td>지방소득세</td><td class='text-right'>"+numeral(지방소득세).format("0,0")+"원</td></tr>";
        result_html += "<tr><td>총납부액</td><td class='text-right'>"+numeral(결정세액).format("0,0")+"원</td></tr>";
        result_html += "</tbody>";
        result_html += "</table>";

        document
            .querySelector('#surveyResult')
            .innerHTML = "<h2>산출결과</h2>"+result_html;

    });

// 질문 생성시 이벤트
survey
    .onAfterRenderQuestion
    .add(function (survey, options) {
        //Do nothing if a question contains no description to show in a modal popup
        if (!options.question.popupdescription) 
            return;
        
        //Create a 'More Info' button to invoke a modal popup
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn btn-info btn-xs";

        btn.style.position = "absolute";
        btn.style.marginLeft = "20px"

        btn.innerHTML = "설명";
        var question = options.question;
        btn.onclick = function () {
            showDescription(question);
        }
        //Insert the created 'More Info' button into the rendered question's header
        var header = options
            .htmlElement
            .querySelector("h5");
        if (!header) 
            header = options.htmlElement;
        var span = document.createElement("span");
        span.innerHTML = "  ";
        header.appendChild(span);
        header.appendChild(btn);
    });

// 페이지 생성시 이벤트
survey
    .onAfterRenderPage
    .add(function (survey, options) {
        //Do nothing if a page contains no description to show in a modal popup
        if (!options.page.popupdescription) 
            return;
        
        //Create a 'More Info' button to invoke a modal popup
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn btn-info btn-xs";

        btn.style.position = "absolute";
        btn.style.marginLeft = "20px"

        btn.innerHTML = "설명";
        btn.onclick = function () {
            showDescription(survey.currentPage);
        }
        //Insert the created 'More Info' button into the rendered page's header
        var header = options
            .htmlElement
            .querySelector("h4");
        var span = document.createElement("span");
        span.innerHTML = "  ";
        header.appendChild(span);
        header.appendChild(btn);
    });

$("#surveyElement").Survey({model: survey});

