import Cookies from 'js-cookie'

const TokenKey = 'Command-Token';

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function loginUe() {
  var ajax = new XMLHttpRequest();
  ajax.open('get','/cas/login?locale=zh_CN');
  ajax.send();
  ajax.onreadystatechange = function () {
    if (ajax.readyState===4 &&ajax.status===200) {
      var html = ajax.responseText;
      var form1 = html.substring(html.indexOf("<form"), html.indexOf("</form") + 7 ).replace("\n",'');
      console.log(form1);
      if (form1.indexOf("<!DO")<0){
        var div = document.createElement("div");
        div.innerHTML = form1;
        var lt = div.children[0].lt.value;
        var execution = div.children[0].execution.value;
        var ajax1 = new XMLHttpRequest();
        ajax1.open('post','/cas/login?locale=zh_CN');
        ajax1.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        ajax1.send("password=319a5d2ce2e52aaec8c09008ee85517f&lt=" + lt + "&execution=" + execution + "&username=admin&captcha=1&_eventId=submit");
        ajax1.onreadystatechange = function () {
          if (ajax1.readyState===4 &&ajax1.status===200) {
            // var iframe = document.createElement("iframe");
            // iframe.src = "/analystui/?lan=en#/project";
            // iframe.style.display = "none";
            // document.body.appendChild(iframe);
            getUeToken();

          }
        }
      } else {
        getUeToken();
      }

    }
  }
}

export function getUeToken() {
  const ajax = new XMLHttpRequest();
  ajax.open('get', '/analystui/?lan=en#/project');
  ajax.send();
  ajax.onreadystatechange = function () {
    if (ajax.readyState === 4 && ajax.status === 200) {
      let html = ajax.responseText;
      console.log("获取页面成功");
      console.log(html);
      //        <input type="hidden" id="_csrf_token" name="varzhybb69fdc0a3f4499ca914292e848b83aa" value="xlCTTggigDHx76vOY0WwJSmxI6fBNY0MOR24hrvcA" />
      //html = html.substring(html.indexOf("<body"), html.indexOf("</body") + 7 );

      // let el = document.createElement( 'html' );
      // el.innerHTML = html;
      //
      // console.log(el);

      let parser=new DOMParser();
      let htmlDoc=parser.parseFromString(html, "text/html");

      let tokenInput = htmlDoc.getElementById('_csrf_token');


      console.log(tokenInput.name);
      console.log(tokenInput.value);

    } else {
      console.log("获取页面失败")
    }
  }
}
