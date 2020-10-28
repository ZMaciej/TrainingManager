
window.onload = function ()
{
    window.onresize = OnResize;
    setup();
};

function OnResize()
{
}

var _week;

function setup()
{
    $.getJSON("data/TrainingPlan.json", function (json)
    {
        var dayIndex = (new Date().getDay() - 1) % 7;
        _week = new Week().FromJson(json);
        _week.Days[dayIndex].Exercises.forEach(ex =>
        {
            new ExerciseView(ex)
        });
        setCookie("Training", _week.Days[dayIndex].ToJson());
    });
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