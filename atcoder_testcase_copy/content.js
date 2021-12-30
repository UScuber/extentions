const board_id = document.getElementsByClassName("btn btn-default btn-sm btn-copy");
const sub_board_id = document.getElementsByClassName("btn-copy btn-pre");

//const isChange_editor_id = document.getElementsByClassName("btn btn-default btn-sm btn-toggle-editor")[0];

let num_samples;
let copy_btn_flag = false;
(function(){
  let lang = document.getElementsByClassName("lang-ja");
  if(lang.length){
    num_samples = lang[0].getElementsByClassName("btn btn-default btn-sm btn-copy").length / 2;
  }else{
    num_samples = document.getElementsByClassName("btn btn-default btn-sm btn-copy").length / 2;
  }
  if(!num_samples){
    copy_btn_flag = true;
    num_samples = document.getElementsByClassName("btn-copy btn-pre").length / 2;
  }
}());

onkeydown = function(e){
  let key_num = Number(e.key) - 1;
  if(key_num == NaN) return;

  //if(isChange_editor_id.ariaPressed == "false") return;

  if(key_num >= 0 && key_num < num_samples){
    let num = key_num * 2 + (board_id.length & 1);
    if(!copy_btn_flag){
      board_id[num].click();
      let output_id = document.getElementById("pre-sample" + String(num + 1));
      if(board_id[num].getBoundingClientRect().y < 100 || output_id.getBoundingClientRect().bottom + 100 > window.outerHeight)
      window.scrollTo(0, board_id[num].getBoundingClientRect().y + window.pageYOffset - window.outerHeight / 2);
    }else{
      sub_board_id[num].click();
      let output_id = document.getElementsByClassName("prettyprint linenums source-code prettyprinted")[num + 1];
      if(sub_board_id[num].getBoundingClientRect().y < 100 || output_id.getBoundingClientRect().bottom + 100 > window.outerHeight)
      window.scrollTo(0, sub_board_id[num].getBoundingClientRect().y + window.pageYOffset - window.outerHeight / 2);
    }
  }
}