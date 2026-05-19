var MemberList = [];
var loginMember = ""; //함수들이 공통으로 사용할 변수

function pageload(){
    var divHeader = document.getElementById("header");
    var html = "";

    if (loginMember != ""){ // 로그인 된 상태
        html = loginMember.name;
        html += "<a href='javascript:logout_member();'>[Logout]</a>";
    }else{ // 로그인 안된 상태
        html = "<a href='javascript:login_member();'>[Login]</a>";
    }

    html += "<a href='javascript:new_member();'>[New Member]</a>";

    divHeader.innerHTML = html;
}

function Member(){
    this.name = "";
    this.id = "";
    this.pass = "";
    this.login = function(id, pass){
        if (this.id == id && this.pass == pass){
            return true;
        }
        return false;
    }
}

function new_member(){
    var user = new Member();

    user.name = prompt("Member Name : ");
    user.id = prompt("Member ID : ");
    user.pass = prompt("Member Password : ");

    MemberList.push(user);
}

function login_member(){
    var id = prompt("ID : ");
    var pass = prompt("Password : ");
    var max = MemberList.length;

    for(var i = 0; i < max; i++){
        if (MemberList[i].login(id, pass)){
            //로그인 성공
            loginMember = MemberList[i];
            break;
        }
    }
    pageload();
}

function logout_member(){
    loginMember = "";
    pageload();
}


var Board = [];

function write(){
    var content = { title : "", memo : "", id : ""};

    if (loginMember == ""){ //로그인 안된 상태
        alert("로그인을 해주세요.");
    }else { // 로그인 된 상태
      content.title = prompt("Title : ");
      content.memo = prompt("Memo : ");
      content.id = loginMember.id;
      Board.push(content);
    }
}

function list(){
    var max = Board.length; // 게시글의 개수
    var html = "";

    for(var i = 0; i < max; i++){
        html += "<a href='javascript:view(" + i + ");'>";
        html += (Board[i].title + "</a> : " + Board[i].id + "<br />");
    }

    var divTable = document.getElementById("table");
    divTable.innerHTML = html;
}

function view( idx ){ // Board 배열의 인덱스 번호
    var html = "";

    html = "Detail View<br />";
    html += ("Title : " + Board[idx].title + " [" + Board[idx].id + "] ");
    html += ("Memo : " + Board[idx].memo);

    var divTable = document.getElementById("table");
    divTable.innerHTML = html;
}

pageload();
list();