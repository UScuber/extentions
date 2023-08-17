const cpp_names = ["C++ (GCC 9.2.1)", "C++ 20 (gcc 12.2)"];
const python_names = ["Python (3.8.2)", "Python (PyPy 3.10-v7.3.12)"];

const text_id = document.getElementsByClassName("form-control plain-textarea")[0];
const submit_id = document.getElementById("submit");


//問題の提出欄は必ず存在するとする
const isChange_editor_id = document.getElementsByClassName("btn btn-default btn-sm btn-toggle-editor")[0];

const cpp_number = 3;
const python_number = 6;
const checkLanguage = (str) => {
  const options = document.querySelectorAll("#select-lang > select > option");
  const select_id = document.getElementsByClassName("form-control current select2-hidden-accessible")[0];
  const select_lang_txt = document.getElementsByClassName("select2-selection__rendered")[0];
  //#includeの有無で言語を確認(今は２種類しか使わない)
  const res = str.indexOf("#include");
  const determine_lang_index = (lang_names) => {
    options.forEach((el) => {
      lang_names.forEach((name) => {
        if(el.textContent === name){
          select_id.selectedIndex = el.index;
          select_lang_txt.textContent = name;
        }
        return;
      });
    });
  };
  if(res === -1){
    //テストケースをペーストしてしまう場合も考える
    const res2 = str.indexOf("print(");
    if(res2 === -1) return false;;
    determine_lang_index(python_names);
  }else{
    determine_lang_index(cpp_names);
  }
  return true;
};


//paste
document.addEventListener("paste", (e) => {
  //エディタ切り替えのボタンが押されていない場合はペーストを許可しない
  if(isChange_editor_id.ariaPressed === "false"){
    console.log("push change the editor button");
    return;
  }

  const str = e.clipboardData.getData("text");
  //言語を確認する
  const flag = checkLanguage(str);
  if(flag === false){
    console.log("warning");
    return;
  }
  //一番下までスクロールする
  //const elem = document.scrollingElement;
  const elem = document.querySelector("#main-container > div.row > div:nth-child(2) > form");
  const rect = elem.getBoundingClientRect();
  document.documentElement.scrollTop = rect.top-100 + window.scrollY;
  text_id.value = str;
  console.log("pasted");
});



let ispushShift = false;
onkeydown = (e) => {
  if(e.key === "Control") ispushShift = true;
  if(e.key === "Enter"){
    if(ispushShift && isChange_editor_id.ariaPressed === "true"){
      submit_id.click();
      console.log("submit");
    }
  }
};
onkeyup = (e) => {
  if(e.key == "Control") ispushShift = false;
};