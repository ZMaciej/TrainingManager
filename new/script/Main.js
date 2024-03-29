var CookieName = "TrainingDay";
var Days = new Array("Sunday", "Monday", "Tuesday", "");
window.onload = function ()
{
    $('.carousel').carousel({
        interval: false,
    });
    window.onresize = OnResize;
    setup();
};

function OnResize()
{
}

var _week;

function setup()
{
    var dayIndex = (new Date().getDay() + 6) % 7;
    var reset = false;
    var loaded = false;
    var cookieDay = getCookie(CookieName);
    if (cookieDay != "" && !reset)
    {
        var cookieDay = JSON.parse(cookieDay);
        if (cookieDay.Index == dayIndex)
        {
            var day = new Day().FromJson(cookieDay);
            new DayView(day);
            loaded = true;
        } else if (cookieDay.Index == (dayIndex + 6) % 7) //cookieDay is previous day. Importat when you want to complete training from that day
        {
            var day = new Day().FromJson(cookieDay);
            if (!day.IsCompleted())
            {
                new DayView(day);
                loaded = true;
            }
        }
    }

    if (!loaded)
    {
        $.getJSON("data/TrainingPlan.json", function (json)
        {
            _week = new Week().FromJson(json);
            new DayView(_week.Days[dayIndex]);
            setCookie(CookieName, _week.Days[dayIndex].ToJson());
        });
    }
}

/**
 * 
 * @param {String} cookieName 
 */
function getCookie(cookieName)
{
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++)
    {
        var c = ca[i];
        while (c.charAt(0) == ' ')
        {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0)
        {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/**
 * 
 * @param {String} cookieName 
 */
function resetCookie(cookieName)
{
    document.cookie = cookieName + "= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
}

/**
 * 
 * @param {String} cookieName 
 * @param {String} cookieValue 
 * @param {String} domainName 
 * @param {number} expirationDate 
 */
function setCookie(cookieName, cookieValue, domainName, expirationDate)
{
    if (domainName == null)
    {
        var domainName = window.location.hostname;
    }
    var date = new Date();
    if (expirationDate == null)
    {
        expirationDate = Infinity;
    }
    date.setTime(expirationDate);
    document.cookie = cookieName + "=" + cookieValue + ";expires=" + date.toUTCString() + ";domain=" + domainName + ";path=/";
}

/**
 * 
 * @param {object} caller
 * @param {String} url 
 * @param {function(document,callerObject)} callback 
 */
function getHTML(caller, url, callback)
{
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'document';

    // xhr.onerror = function ()
    // {
    // };
    xhr.onload = function ()
    {
        var status = xhr.status;
        if (status === 200 && xhr.response != null)
        {
            callback(xhr.response, caller);
        } else
        {
            console.log("cannot load html " + xhr.responseURL);
        }
    };
    xhr.send();
}