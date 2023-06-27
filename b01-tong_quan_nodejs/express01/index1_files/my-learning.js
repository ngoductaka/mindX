/*
  MyLearning script
  Version: 1.0.20
*/

window.MyLearning = {
  pages_read_count: 0,
  total_pages_count: 0,
  user_progress_collected: false,
  _debug: null,
  _version: null,
};

MyLearning._isDebugMode = function () {
  if (this._debug !== null) {
    return this._debug;
  }

  this._debug = Cookies.get('my_learning.debug')

  if (typeof this._debug === 'undefined' || this._debug === null) {
    this._debug = false;
  }

  return this._debug === true || this._debug === 'true';
}

MyLearning.getCurrentUts = function () {
  return Math.round((new Date()).getTime() / 1000);
};

MyLearning.getCurrentUtus = function () {
  return (new Date()).getTime();
};

MyLearning.log = function (message, data) {
  if (this._isDebugMode()) {
    if (typeof data === 'undefined') {
      console.log(getCurrentUtus().toString() + ' MyLearning -> ' + message);
    } else {
      console.log(getCurrentUtus().toString() + ' MyLearning -> ' + message, data);
    }
  }
}

MyLearning._cacheVersion = function () {
  // return cached result
  if (this._version !== null) {
    this.log('version: ', this._version);
    return this._version;
  }

  this._version = Cookies.get('my_learning.version')

  // fallback to v2.1
  if (typeof this._version === 'undefined' || !this._version) {
    this._version = '2.1';
  }

  this.log('version: ', this._version);
  return this._version;
}

MyLearning._version_to_base_url_map = {
  '1': 'https://mypage.w3schools.com',
  '1.5': 'https://my-learning.w3schools.com',
  '1.5L': 'https://my-learning-legacy.w3schools.com',
  '2': 'https://myl-api.w3schools.com',
  '2.1': 'https://myl-api.w3schools.com'
}

MyLearning._version_and_name_to_rel_url_map = {
  '1': {
    'api.meta': '/mypage/beta.php',
    'api.meta_for_default': '/mypage/beta_for_default.php',
    'api.exercise.get': '/mypage/get_exercise_obj2.php',
    'api.exercise.set': '/mypage/set_exercise_obj.php',
    'api.quiz.set_score': '/mypage/set_quiz_score2.php'
  },
  '1.5': {
    'api.meta': '/api/meta/',
    'api.meta_for_default': '/api/meta-for-default/',
    'api.exercise.get': '/api/exercise/get/',
    'api.exercise.set': '/api/exercise/set/',
    'api.quiz.set_score': '/api/quiz/set-score/'
  },
  '1.5L': {
    'api.meta': '/api/meta/',
    'api.meta_for_default': '/api/meta-for-default/',
    'api.exercise.get': '/api/exercise/get/',
    'api.exercise.set': '/api/exercise/set/',
    'api.quiz.set_score': '/api/quiz/set-score/'
  },
  '2': {
    'api.meta': '/api/classic/get-set-topic-progress',
    // 'api.meta_for_default': '/api/meta-for-default/', // deprecated
    'api.exercise.get': '/api/classic/get-exercises-progress',
    'api.exercise.set': '/api/classic/set-exercises-progress',
    'api.quiz.set_score': '/api/classic/set-quiz-progress'
  },
  '2.1': {
    'api.meta': '/api/classic/get-set-topic-progress',
    'api.exercise.get': '/api/classic/get-exercises-progress',
    'api.exercise.set': '/api/classic/set-exercises-progress',
    'api.quiz.set_score': '/api/classic/set-quiz-progress'
  }
}

// usage:
// MyLearning.getUrl('api.quiz.set_score') -> https://mypage.w3schools.com/mypage/set_quiz_score2.php
MyLearning.getUrl = function (api_name, version) {
  this.log('getUrl: ', api_name);

  if (typeof version === 'undefined') {
    this._cacheVersion();

    version = this._version;
  }

  if (this._isDebugMode()) {
    if (typeof this._version_to_base_url_map[version] === 'undefined') {
      console.warn('MyLearning -> Version is not valid. version: ', version);

      return '/';
    }

    if (typeof this._version_and_name_to_rel_url_map[version][api_name] === 'undefined') {
      console.warn('MyLearning -> Api name is not valid. version, api_name: ', version, api_name);

      return '/';
    }
  }

  return this._version_to_base_url_map[version] + this._version_and_name_to_rel_url_map[version][api_name];
}
// << classic

// < common

MyLearning.makePostRequest = function (url, data, callback, retriedAfterSessionRefresh) {
  if (typeof retriedAfterSessionRefresh === 'undefined') {
    retriedAfterSessionRefresh = false;
  }

  var xhr = new XMLHttpRequest();

  var reqRes = {
    error: {
      code: '0'
    },
    status: 0,
    dataStr: '',
  };

  var reqTimeout = setTimeout(function () {
    reqRes.error = {
      code: 'RWTE',
      description: 'Request wait time exceeded'
    };

    MyLearning.log('MyLearning.makePostRequest -> reqRes: ', reqRes);

    callback(reqRes);
  }, 15000);

  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      clearTimeout(reqTimeout);

      reqRes.status = this.status;
      reqRes.dataStr = this.responseText;

      if (
        typeof reqRes.status !== 'undefined'
        && reqRes.status
      ) {
        if (reqRes.status == 401) {
          reqRes.error = {
            code: 'UNAUTHORIZED',
            description: 'Request unauthorized'
          };
        } else if (!(reqRes.status >= 200 && reqRes.status < 300)) {
          reqRes.error = {
            code: 'RSC_' + reqRes.status,
            description: (typeof this.statusText !== 'undefined' && this.statusText) ? this.statusText : 'Request failed'
          };
        }
      } else {
        reqRes.error = {
          code: 'RTWNSC', // Request terminated with no status code
          description: 'Request failed'
        };
      }

      if (reqRes.error.code === 'UNAUTHORIZED' && !retriedAfterSessionRefresh) {
        UserSession.changeStatusCodeInUserSessionCookies(
          '-3', // UserSessionStatusCodeEnum.RefreshRequired
        );

        UserSession.processUserSession(function (userSessionVerificationRes) {
          if (typeof reqRes.error.meta === 'undefined') {
            reqRes.error.meta = {};
          }

          reqRes.error.meta.userSessionVerificationRes = userSessionVerificationRes;

          if (userSessionVerificationRes.error.code === '0') { // session seems fine, retry to send the same request            
            MyLearning.makePostRequest(url, data, callback, true);
          } else {
            callback(reqRes);
          }
        }, true);
      } else {
        callback(reqRes);
      }
    }
  };

  UserSession.processUserSession(function (userSessionVerificationRes) {
    if (userSessionVerificationRes.error.code === '0') {
      xhr.open('POST', url, true);
      xhr.withCredentials = true;
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.send(data);
    } else {
      clearTimeout(reqTimeout);

      UserSession.userSessionRedirectionLogicHandler(userSessionVerificationRes);

      callback({
        error: userSessionVerificationRes.error,
        status: 0,
        dataStr: '',
      });
    }
  }, false);
}

MyLearning.elmIsInViewport = function (x) {
  var rect = x.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
  );
}

MyLearning.elmIsAboveViewport = function (x) {
  var rect = x.getBoundingClientRect();
  if (rect.top < 0) return true;
  return false;
}

MyLearning.getCircleMeta = function (xx, yy, r, aD) {
  var aR = (aD - 90) * Math.PI / 180.0;
  return {
    x: xx + (r * Math.cos(aR)),
    y: yy + (r * Math.sin(aR))
  };
}

MyLearning.getProfileIconCirclesRendered = function (x, y, r, sa, ea) {
  var s = this.getCircleMeta(x, y, r, ea);
  var e = this.getCircleMeta(x, y, r, sa);
  var f = ea - sa <= 180 ? "0" : "1";
  return ["M", s.x, s.y, "A", r, r, 0, f, 0, e.x, e.y].join(" ");
}

MyLearning.loadUser = function (context, callback) {
  this.log('loadUser -> args: ', [context]);

  UserSession.processUserSession(function (userSessionVerificationRes) {
    if (context === 'default') {
      MyLearning._loadUser();
    } else if (context === 'footer') {
      MyLearning._footerLoadUser();
    }

    if (typeof callback !== 'undefined') {
      callback(userSessionVerificationRes);
    }
  }, true);
}

MyLearning.renderAnonymousUser = function () {
  this.log('renderAnonymousUser');

  var a = document.getElementById("mypagediv");
  var b = document.getElementById("w3loginbtn");
  if (a) a.style.display = "none";
  if (b) b.style.display = "inline";
  // var signupBtnElm = document.getElementById("signupbtn_topnav");
  // if (signupBtnElm) signupBtnElm.style.display = "inline"; // handled outside
}

MyLearning.getStrWithPrefixRemoved = function (str, subStr) {
  const extractedChunk = str.slice(0, subStr.length);

  if (extractedChunk === subStr) {
    return str.slice(subStr.length);
  }

  return str;
}
// > common

// < default
MyLearning._loadUser = function () {
  if (UserSession.loggedIn) {
    MyLearning.renderActiveUserLite("B", {});
  } else {
    MyLearning.renderAnonymousUser();
  }
}

MyLearning.renderActiveUserLite = function (cc, obj) {
  this.log('renderActiveUserLite -> args: ', [cc, obj]);
  var x, degrees = 0, txt = "", txt2 = "", color1 = "rgba(4, 170, 109, 0.1)", color2 = "rgba(4, 170, 109, 1)";
  var a = document.getElementById("w3loginbtn");
  var b = document.getElementById("mypagediv");
  // var signupBtnElm = document.getElementById("signupbtn_topnav");
  // if (signupBtnElm) signupBtnElm.style.display = "none"; // handled outside
  if (a) a.style.display = "none";
  if (b) {
    //document.getElementById("loginactioncontainer").style.marginLeft =  "0";
    if (cc == "Q") {
      color1 = "rgba(44, 156, 202, 0.1)";
      color2 = "rgba(44, 156, 202, 1)";
    }
    b.style.display = "block";
    txt += "<a class='ga-top' href='https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com%2F'>";
    //txt += "<a href='https://mypage.w3schools.com/mypage/default.php'>";
    txt += "<img src='/images/mypagelogo26x26.png' alt='MyLearning' style='position:absolute;top:12px;right:31px'>";
    txt += '<svg style="position:absolute;top:0;right:0;height:70px;width:70px">';
    txt += '<path id="mypage_circle1" fill="none" stroke="' + color1 + '" stroke-width="4"/>';
    txt += '<path id="mypage_circle2" fill="none" stroke="' + color2 + '" stroke-width="4"/>';
    txt += '</svg>';
    txt += '</a>';
    b.innerHTML = "&nbsp;" + txt;
    document.getElementById("mypage_circle1").setAttribute("d", this.getProfileIconCirclesRendered(26, 35, 20, 0, 359.99));
    document.getElementById("mypage_circle2").setAttribute("d", this.getProfileIconCirclesRendered(26, 35, 20, 0, degrees));
  }
}
// > default

// < footer
MyLearning._footerLoadUser = function () { // on lessons this is the first request, on quiz the only one
  this.log('_footerLoadUser');

  if (!UserSession.loggedIn) {
    this.renderAnonymousUser();
    return;
  }

  var urlPath = window.location.pathname,
    urlPathWlo = this.getStrWithPrefixRemoved(urlPath, '/'), // wlo - without leading slash
    isQuizPage = false;

  if (urlPathWlo.indexOf('quiztest/quiztest') === 0) {
    isQuizPage = true;

    var pathMetaStr = sessionStorage.getItem(urlPath);

    if (pathMetaStr !== null) {
      var pathMeta = JSON.parse(pathMetaStr);

      if (pathMeta.isQuizPage) {
        this.renderActiveUserWithProgress(pathMeta.reqRes.type, pathMeta.reqRes.raw);
        return;
      }
    }
  }

  // show the user active session first and update the progress when we have it on hands
  this.renderActiveUserWithProgress('T', 'T{"a":0,"b":0}'); // T - unused state, stands for "Temporary/Transitory"

  var x, y, pos, foldername, filename, typ, cc, pathname = window.location.pathname;
  if (pathname.substr(0, 1) == "/") { pathname = pathname.substr(1); }
  pos = pathname.indexOf("/");
  foldername = pathname.substr(0, pos);
  if (pathname.indexOf("pandas") > -1) { foldername = "python/pandas"; }
  if (pathname.indexOf("numpy") > -1) { foldername = "python/numpy"; }
  if (pathname.indexOf("scipy") > -1) { foldername = "python/scipy"; }
  filename = pathname.substr(pos + 1);
  typ = foldername;
  if (foldername == "quiztest") {
    cc = window.location.href;
    pos = cc.indexOf("qtest=");
    typ = cc.substr(pos + 6);
  }

  var reqDataStr = "a=" + foldername + "&b=" + filename + "&c=" + typ + "&d=0&p=" + encodeURIComponent(window.location.pathname);

  MyLearning.makePostRequest(
    MyLearning.getUrl('api.meta'),
    reqDataStr,
    function (reqRes) {
      if (
        reqRes.error.code === '0'
        && reqRes.status === 200
      ) {
        var y = reqRes.dataStr;
        var x = y.substr(0, 1);

        MyLearning.log('_footerLoadUser -> req_res -> x: ', x);

        if (x == "F" || x == "G" || x == "H" || x == "I" || x == "J" || x == "K" || x == "L" || x == "M" || x == "Q") {
          MyLearning.user_progress_collected = true;
          MyLearning.renderActiveUserWithProgress(x, y); // this one sets the scroll event

          if (isQuizPage) {
            sessionStorage.setItem(urlPath, JSON.stringify({
              'isQuizPage': true,
              'reqRes': {
                'type': x,
                'raw': y
              }
            }));
          }
        }
      }
    }
  );
}

MyLearning.checkIfGotToTheBottomOfThePage = function () {
  var a = document.getElementById("mypagediv2");
  var elm_in_or_above_viewport = MyLearning.elmIsInViewport(a) || MyLearning.elmIsAboveViewport(a);
  // this.log('checkIfGotToTheBottomOfThePage: ', elm_in_or_above_viewport);

  if (elm_in_or_above_viewport) {
    MyLearning.log('checkIfGotToTheBottomOfThePage: ', true);

    window.removeEventListener("scroll", MyLearning.checkIfGotToTheBottomOfThePage);
    MyLearning.finishedPage();
  }
}

MyLearning.renderActiveUserWithProgress = function (cc, obj) {
  this.log('renderActiveUserWithProgress -> args: ', [cc, obj]);

  var x, degrees = 0, txt = "", txt2 = "", color1 = "rgba(4, 170, 109, 0.1)", color2 = "rgba(4, 170, 109, 1)", jsonobj;
  var a = document.getElementById("w3loginbtn");
  var b = document.getElementById("mypagediv");
  var c = document.getElementById("mypagediv2");
  // var signupBtnElm = document.getElementById("signupbtn_topnav");
  // if (signupBtnElm) signupBtnElm.style.display = "none"; // handled outside
  if (a) a.style.display = "none";
  if (b) {
    if (cc == "I" || cc == "J" || cc == "H" || cc == "G" || cc == "O" || cc == "Q") {
      jsonobj = JSON.parse(obj.substr(1));
      this.pages_read_count = jsonobj.b;
      this.total_pages_count = jsonobj.a;
      x = Math.round((this.pages_read_count / this.total_pages_count) * 100);
      degrees = x * 3.6;
      if (degrees > 359) degrees = 359.99;
    }
    if (cc == "Q") {
      color1 = "rgba(44, 156, 202, 0.1)";
      color2 = "rgba(44, 156, 202, 1)";
    }
    b.style.display = "block";
    txt += "<a href='https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com%2F'>";
    //  txt += "<a href='https://mypage.w3schools.com/mypage/default.php'>";
    txt2 = txt;
    txt += "<img src='/images/mypagelogo26x26.png' alt='MYPAGE' style='position:absolute;top:12px;right:31px'>";
    txt2 += "<img src='/images/mypagelogo32x32.png' alt='MYPAGE' style='position:absolute;top:18px;margin-left:10px;'>";
    if (cc != "F") {
      txt += '<svg style="position:absolute;top:0;right:0;height:70px;width:70px">';
      txt += '<path id="mypage_circle1" fill="none" stroke="' + color1 + '" stroke-width="4"/>';
      txt += '<path id="mypage_circle2" fill="none" stroke="' + color2 + '" stroke-width="4"/>';
      txt += '</svg>';
      txt2 += '<svg style="position:absolute;xtop:0;xright:0;height:70px;width:70px">';
      txt2 += '<path id="mypage2_circle1" fill="none" stroke="' + color1 + '" stroke-width="4"/>';
      txt2 += '<path id="mypage2_circle2" fill="none" stroke="' + color2 + '" stroke-width="4"/>';
      txt2 += '</svg>';
    }
    if (cc == "J" || cc == "H" || cc == "G") {
      window.addEventListener("scroll", this.checkIfGotToTheBottomOfThePage);
      this.checkIfGotToTheBottomOfThePage();
    }
    if (cc == "Q") {
      if (degrees == 359.99) {
        txt += "<span id='usergetsstar'>&#x2605;</span>";
      }
    }
    txt += '</a>';
    txt2 += '</a>';
    b.innerHTML = "&nbsp;" + txt;
    c.innerHTML = "&nbsp;" + txt2;
    if (cc != "L" && cc != "F") {
      document.getElementById("mypage_circle1").setAttribute("d", this.getProfileIconCirclesRendered(26, 35, 20, 0, 359.99));
      document.getElementById("mypage_circle2").setAttribute("d", this.getProfileIconCirclesRendered(26, 35, 20, 0, degrees));
      document.getElementById("mypage2_circle1").setAttribute("d", this.getProfileIconCirclesRendered(26, 35, 24, 0, 359.99));
      document.getElementById("mypage2_circle2").setAttribute("d", this.getProfileIconCirclesRendered(26, 35, 24, 0, degrees));
    }
    c.classList.add("active");
  }

  // ga('send', 'event', 'user', 'login');
}

MyLearning.finishedPage = function () {
  this.log('finishedPage');

  if (!UserSession.loggedIn || !this.user_progress_collected) {
    this.log('finishedPage -> jumping out');
    return;
  }

  var x, y, pos, foldername, filename, typ, pathname = window.location.pathname;
  if (pathname.substr(0, 1) == "/") { pathname = pathname.substr(1); }
  pos = pathname.indexOf("/");
  foldername = pathname.substr(0, pos);
  if (pathname.indexOf("pandas") > -1) { foldername = "python/pandas"; }
  if (pathname.indexOf("numpy") > -1) { foldername = "python/numpy"; }
  if (pathname.indexOf("scipy") > -1) { foldername = "python/scipy"; }
  filename = pathname.substr(pos + 1);
  typ = foldername;

  var reqDataStr = "a=" + foldername + "&b=" + filename + "&c=" + typ + "&d=1&p=" + encodeURIComponent(window.location.pathname);

  MyLearning.makePostRequest(
    MyLearning.getUrl('api.meta'),
    reqDataStr,
    function (reqRes) {
      if (
        reqRes.error.code === '0'
        && reqRes.status === 200
      ) {
        var y = reqRes.dataStr;
        var x = y.substr(0, 1);

        if (x == "O") {
          MyLearning.registerPointForFinishedPage(x);
        }
      }
    }
  );
}

MyLearning.registerPointForFinishedPage = function (cc) {
  MyLearning.log('registerPointForFinishedPage -> args: ', [cc]);

  var x, degrees = 0, txt = "", txt2 = "", completed = 0, color1 = "rgba(4, 170, 109, 0.1)", color2 = "rgba(4, 170, 109, 1)";
  var a = document.getElementById("w3loginbtn");
  var b = document.getElementById("mypagediv");
  var c = document.getElementById("mypagediv2");
  if (c) {
    this.pages_read_count++;
    x = Math.round((this.pages_read_count / this.total_pages_count) * 100);
    degrees = x * 3.6;
    if (degrees > 359) degrees = 359.99;
    txt += "<span class='usergetspoint' id='usergetstutpoint'>+1</span>";
    if (degrees == 359.99) { completed = 1; }
    if (completed == 1) {
      txt += "<span id='usergetsstar'>&#x2605;</span>";
    }
    c.innerHTML += txt;
    document.getElementById("mypage_circle1").setAttribute("d", this.getProfileIconCirclesRendered(26, 35, 20, 0, 359.99));
    document.getElementById("mypage_circle2").setAttribute("d", this.getProfileIconCirclesRendered(26, 35, 20, 0, degrees));
    document.getElementById("mypage2_circle1").setAttribute("d", this.getProfileIconCirclesRendered(26, 35, 24, 0, 359.99));
    document.getElementById("mypage2_circle2").setAttribute("d", this.getProfileIconCirclesRendered(26, 35, 24, 0, degrees));
  }
}
// > footer
// >> classic