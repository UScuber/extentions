let text_id = document.getElementsByClassName("form-control plain-textarea")[0];
const submit_id = document.getElementById("submit");


//問題の提出欄は必ず存在するとする
const isChange_editor_id = document.getElementsByClassName("btn btn-default btn-sm btn-toggle-editor")[0];

const cpp_number = 3;
const python_number = 6;
const checkLanguage = (str) => {
  const select_id = document.getElementsByClassName("form-control current select2-hidden-accessible")[0];
  const select_lang_txt = document.getElementsByClassName("select2-selection__rendered")[0];
  //#includeの有無で言語を確認(今は２種類しか使わない)
  let res = str.indexOf("#include");
  if(res == -1){
    //テストケースをペーストしてしまう場合も考える
    let res2 = str.indexOf("print(");
    if(res2 == -1) return false;
    select_id.selectedIndex = python_number;
    select_lang_txt.textContent = "Python (3.8.2)";
  }else{
    select_id.selectedIndex = cpp_number;
    select_lang_txt.textContent = "C++ (GCC 9.2.1)";
  }
  return true;
};


//paste
document.addEventListener("paste", (e) => {
  //エディタ切り替えのボタンが押されていない場合はペーストを許可しない
  if(isChange_editor_id.ariaPressed == "false"){
    console.log("push change the editor button");
    return;
  }

  const str = e.clipboardData.getData("text");
  //言語を確認する
  const flag = checkLanguage(str);
  if(flag == false){
    console.log("warning");
    return;
  }
  //一番下までスクロールする
  const elem = document.scrollingElement;
  window.scrollTo(0, elem.scrollHeight - elem.clientHeight);
  text_id.value = str;
  console.log("pasted");
});



let ispushShift = false;
onkeydown = (e) => {
  if(e.key == "Control") ispushShift = true;
  if(e.key == "Enter"){
    if(ispushShift && isChange_editor_id.ariaPressed == "true"){
      submit_id.click();
      console.log("submit");
    }
  }
};
onkeyup = (e) => {
  if(e.key == "Control") ispushShift = false;
};