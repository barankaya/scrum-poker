locateJSON = function (obj, path) {
  path = path.split('.');
  var arrayPattern = /(.+)\[(\d+)\]/;
  for (var i = 0; i < path.length; i++) {
    var match = arrayPattern.exec(path[i]);
    if (match) {
      obj = obj ? obj[match[1]][parseInt(match[2])] : undefined;
    } else {
      obj = obj ? obj[path[i]] : undefined;
    }
  }
  return obj;
}

lang = function (key, subStringArray) {
  var str;
  if (languageObject[key]) {
    str = languageObject[key];
  }
  else {
    var located = locateJSON(languageObject, key);
    if (located) {
      str = located;
    }
    else {
      str = key;
    }
  }

  if (subStringArray && subStringArray.length > 0) {
    for (var i = 0; i < subStringArray.length; i++) {
      str = str.replace("%s", subStringArray[i]);
    }
  }
  return str;
}
