// created because database structure changed the last minute
var global_drop_off = 0;

// $_SESSION['username'] = $username;
//      $_SESSION['role_id'] = $result['role_role_id'];
//      $_SESSION['amount_left'] = $result['amount_left'];
//      $_SESSION['id'] = $result['user_id'];

//var user_id = 0;
var user_name = 0;
var class_id_glob = 0;

var phonegap = "https://50.63.128.135/~csashesi/class2015/kingston-coker/mobile_web/hw_tracker_parent/";
//var phonegap = "";

//$(document).ready(function () {
// 
//});

//$(document).on('pagebeforeshow', '#hw_page', function () {
//   $("#panel_days").panel("open");
//
//});

//debugger;
function syncAjax(u) {
   var obj = $.ajax({url: u, async: false});
   return $.parseJSON(obj.responseText);
}

var school_id;
var class_id;
var subject_id;

var id = 0;

function register() {
   var pass1 = document.getElementById("password1").value;
   var pass2 = document.getElementById("password2").value;

   if (pass1 !== pass2) {
      alert("Your passwords don't match. Please try again");
      return;
   }

   var pid = document.getElementById("pid").value;

   var username = document.getElementById("reg_username").value;
//   var email = document.getElementById("email").value;
   var pass = pass1;

   if (username.length === 0) {
      alert("Please enter a username");
      return;
   }
   else if (pass.length === 0) {
      alert("Please enter a password");
      return;
   }

//   var conf_num = Math.floor(Math.random() * 9000) + 1000;

   var url = phonegap + "action_1.php?cmd=3&username=" + username + "&password=" + pass + "&parent_id=" + pid;

//   prompt("url", url);

// if youve aleady registered
   var r = syncAjax(url);
   if (r.result === 1) {
      alert(r.message + "\nPlease see the school for further assistance");
      window.open("index.html", "_self");
      return;
   }

   var url2 = phonegap + "action_1.php?cmd=1&username=" + username + "&password=" + pass + "&parent_id=" + pid;

//   prompt("url", url2);

   var r2 = syncAjax(url2);
   if (r2.result === 0) {
      alert(r.message);
      return;
   }

   alert("Successful, you may login now. Don't forget your password");
   window.open("index.html", "_self");
}


function getFormattedDate(date1) {
   var date = new Date(date1);
   var year = date.getFullYear();
   var month = (1 + date.getMonth()).toString();
   month = month.length > 1 ? month : '0' + month;
   var day = date.getDate().toString();
   day = day.length > 1 ? day : '0' + day;
   return year + '-' + month + '-' + day;
}

function logout() {
   window.open("logout.php", "_self");
}

function login() {

   //complete the url
   var user = document.getElementById("username").value;
   var pass = document.getElementById("password").value;

   var u = phonegap+"action_1.php?cmd=2&user=" + user + "&pass=" + pass;
//   prompt("URL", u);
   var r = syncAjax(u);

//                alert(r.result);
   if (r.result === 1) {
      username = r.user.username;
      t_firstname = r.user.firstname;
      t_lastname = r.user.lastname;
      id = r.user.id;

      $(".user").text(t_firstname);

      get_children();

      window.open("index.html#children_page", "_self");
   }
   else {
      alert("username or password wrong or please register");
      return;
   }
}

function reset() {
   alert("Please see the school admin to help you reset your password");
}

var classid = 0;
var child_id = 0;
function get_children() {

   var url = phonegap + "action_1.php?cmd=10&parent_id=" + id;

//   prompt("url", url);
   children = syncAjax(url);

   if (children.result === 1) {
//      console.log(assigns);
      var ins4 = "";
      $.each(children.message, function (key, elem) {

//         console.log(elem.actual_assignment);
//         var actual = elem.actual_assignment;

//         actual = actual.replace(/["']/g, "!apostrophe!");

         classid = elem.class_id;

//         onclick="get_hw_today(' + "'" + elem.class_id + "'" + ')"

         ins4 += '<li class="ui-first-child ui-last-child"><a href="#" onclick="get_hw_today(' + elem.class_id + "," + elem.id + ')" class="ui-btn ui-btn-icon-right ui-icon-carat-r ui-last-child">' + elem.firstname + " " + elem.lastname + '</a></li>';

//         ins5 += "<div data-role='collapsible' id='set" + 1 + "'><h3>Section " + elem.firstname + "     " + elem.lastname + "</h3><p onclick='get_hw_today(" + elem.class_id + ")'>" + elem.firstname + " " + elem.lastname + "</p></div>";

//         $(document).on("pageinit", function () {
//            var nextId = 1;
//            $("#add").click(function () {
//               nextId++;
//               var content = "<div data-role='collapsible' id='set" + nextId + "'><h3>Section " + nextId + "</h3><p>I am the collapsible content in a set so this feels like an accordion. I am hidden by default because I have the 'collapsed' state; you need to expand the header to see me.</p></div>";
//               $("#set").append(content).collapsibleset('refresh');
//            });
//            $("#expand").click(function () {
//               $("#set").children(":last").trigger("expand");
//            });
//            $("#collapse").click(function () {
//               $("#set").children(":last").trigger("collapse");
//            });
//         });

      });


      $('#children_list').html(ins4);
//      window.open("index.html", "_self");

//      $('#set').html(ins5);

   }

   else {
      alert("Please login");
      window.open("index.html", "_self");
   }
}

function get_hw_today(classid, childid) {
   class_id_glob = classid;
   child_id = childid;
//  debugger ;
   window.open("index.html#hw_page", "_self");

   var date = new Date();

//
   var url = phonegap + "action_1.php?cmd=11&pid=" + id + "&cid=" + classid + "&date=" + getFormattedDate(date);

//   prompt("url", url);
   var assignment = syncAjax(url);

   injector(assignment);
}


function injector(assignment) {
   if (assignment.result === 1) {
//      console.log(assigns);
//      var ins4 = "";
      var ins5 = "";
      $.each(assignment.message, function (key, elem) {


         ins5 += "<div data-role='collapsible' data-collapsed-icon='arrow-r' data-expanded-icon='arrow-d' id='set" + key + "'><h3>" + elem.subject + "</h3><p> Assignment: " + elem.title + "<br> Due: " + getFormattedDate(elem.due) + "<br> Teacher: " + elem.teacher_name + "<br><br><input onclick=sign_off(" + id + "," + child_id + ") type='checkbox' name='vehicle' value='Bike' id='sign_chk" + key + "'> <br>Sign<br>" + "</p>" + "</div>";
      });
//      $('#hw_list').html(ins4);

      $('#set').html(ins5);


//      debugger;

//$("#panel_days").panel("open");

      $('#set').collapsibleset('refresh');
   }
}

function sign_off(pid, childid) {
   alert("this assignemnt has been completed");
}

function get_hw_details(text) {
   alert(text);
}

function get_hw_week(classid) {
   class_id_glob = classid;
//  debugger ;
   window.open("index.html#hw_page", "_self");


//   $(document).on('pagebeforeshow', '#hw_page', function () {

//});
//   debugger
   var date = new Date();

//
   var url = phonegap + "action_1.php?cmd=12&pid=" + id + "&cid=" + classid + "&date=" + getFormattedDate(date);

//   prompt("url", url);
   var assignment = syncAjax(url);

   injector(assignment);
}



//$("#id").attr("onclick","new_function_name()");

function get_hw_week_trig() {
   $("#hw_time_span").text("Homework within a week");
   get_hw_week(class_id_glob);
}

function get_hw_today_trig() {
//   debugger;
   $("#hw_time_span").text("Homework due tomorrow");
   get_hw_today(class_id_glob);

}

function get_hw() {
   alert("Please click on a child to get details");
}

function popUp(text) {
   alert(text.replace("!apostrophe!", "'"));
}

function qrgenerate(rand) {
//   window.location.reload();
   if (rand === "" || rand == null) {
      alert("Times are hard huh? You haven't paid yet! Sorry");
      return;
   }
   $('#qrcode').text("");
   jQuery('#qrcode').qrcode({
      text: rand.toString()
   });
}
