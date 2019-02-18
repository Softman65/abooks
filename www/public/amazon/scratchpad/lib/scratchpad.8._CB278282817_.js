/******************************************************************************* 
 *  Copyright 2011 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  Licensed under the Apache License, Version 2.0 (the "License"); 
 *  
 *  You may not use this file except in compliance with the License. 
 *  You may obtain a copy of the License at: http://aws.amazon.com/apache2.0
 *  This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR 
 *  CONDITIONS OF ANY KIND, either express or implied. See the License for the 
 *  specific language governing permissions and limitations under the License.
 * ***************************************************************************** 
 *
 *  Marketplace Web Service Javascript Scratchpad
 */

// Initialize scratchpad APIs as a global variable
var ScratchpadApis = {};
var ScratchpadEnums = {};
var PostedAction = '';

/* Perform natural-byte comparison */
function naturalByteCompare(a, b) {
    for (var i = 0; i < a.length; i++) {
        if (a.charCodeAt(i) != b.charCodeAt(i)) {
            return a.charCodeAt(i) > b.charCodeAt(i) ? 1 : -1;
        }
    }
    if (a.length == b.length) return 0;
    return a.length > b.length ? 1 : -1;
}

/* Performs URL encoding compatible with MWS http requests */
function urlEncode(str) {
    str = encodeURIComponent(str);
    str = str.replace(/\*/g, '%2A');
    str = str.replace(/\(/g, '%28');
    str = str.replace(/\)/g, '%29');
    str = str.replace(/'/g, '%27');
    str = str.replace(/\!/g, '%21');
    return str;
}

/* Formats a string to appear as if it were in a <pre> tag */
function formatPre(str) {
    return str.replace(/\n/g, '<br/>');
}

/* Gets a parameter from the URL */
function getParameter(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null) return "";
    return results[1];
}

/* Converts an object to JSON format. */
function toJSON(obj) {
    var json = '';
    if (obj.length && typeof obj != 'string') {
        json = '[';
        for (var i = 0; i < obj.length; i++) {
            if (i != 0) json += ',';
            json += toJSON(obj[i]);
        }
        json += ']';
        return json;
    }
    else if (typeof obj == 'object') {
        json += '{';
        $.each(obj, function (k, v) {
            json += k + ':' + toJSON(obj[k]) + ',';
        });
        json = json.slice(0, -1) + '}';
        return json;
    }
    else {
        if (typeof obj == 'string') return json + "'" + obj + "'";
        return json + obj;
    }
}

/*
 * Creates a select field from either an array of values or from a javascript
 * object
 */
function createSelect(field, values) {
    var ret = '<select id="' + field.Name + '">';

    // Blank selectable value for non-required items
    if (!field.Required) ret += '<option value=""></option>';
    if (values.length) {
        // list is an array
        for (var i = 0; i < values.length; i++) {
            ret += '<option value="' + values[i] + '">' + values[i] + '</option>';
        }
    }
    else {
        // list is a keyvalue pair object
        for (var k in values) {
            ret += '<optgroup label="' + k + '">';
            for (var j in values[k]) {
                ret += '<option value="' + j + '">' + j + '</option>';
            }
            ret += '</optgroup>';
        }
    }
    ret += '</select>';
    return ret;
}

/*
   When fields have "list" set, since they're ordered sequentially and display the name
   of the parameter they're supposed to represent, renaming them is necessary when
   entries are removed from arbitrary positions within the list.
*/

function renameListFields(fields, list, complexListName) {
    if (!fields) {
        var apiCallOption = $('#apicall option:selected');
        var apiGroup = apiCallOption.data('apigroup');
        var apiCall = apiCallOption.data('apicall');
        if (!apiGroup || !apiCall) return;
        fields = apiCall.Parameters;
    }
    for (var i = 0; i < fields.length; i++) {
        var p = fields[i];

        // if the field type is an enumerated field, select "select" elements,
        // otherwise select input elements
        var select = ':input';
        for (var e in ScratchpadEnums) if (e == p.Type) select = 'select';


        var index = 1;
        //Treat differently when it is a list of list
        if (p.List && complexListName) {
            renameComplexListFields(p, complexListName);
        }
        else if (p.Type == 'Complex') {
            renameListFields(p.Parameters, p.List);
        }
        else if (p.Type == 'ComplexList') {
            renameListFields(p.Parameters, p.List, p.DisplayName);
        }
        else if (p.List || list) {
            $(select).each(function () {
                if (p.Name == $(this)[0].id) {
                    var newName = p.Name.replace(/\-/, index);
                    $('.left', $(this)[0].parentNode.parentNode).text(newName);
                    index++;
                }
            });

        }
    }
    $('#FeedType').val('_POST_PRODUCT_DATA_')
    $(document.getElementById('MarketplaceIdList.Id.-')).val('A1RKKUPIHCS9HS')
    $('#request-path').val('/amazon/set')
    //$('#endpoint').val('mws.amazonservices.es')
    
}

function renameComplexListFields(parameter, complexListName) {
    var index = 1;
    var sublistName = parameter.DisplayName;
    //Find all complex list which have the same title as the parameter that we are looking for
    $('.ComplexList').each(function (i, obj) {
        var subIndex = 1;
        if ($(this).attr("title") == complexListName) {
            var childLists = $(this).children(".List");
            for (var i = 0; i < childLists.length; i++) {
                var curChild = childLists[i];
                //Find the list which have the same title as the list parameter that we are looking for
                if ($(curChild).attr("title") == sublistName) {
                    var inputs = $(curChild).find("input");
                    for (var j = 0; j < inputs.length; j++) {
                        var input = inputs[j];
                        var id = $(input).attr('id');
                        var newName = id.replace(/\-/, index);
                        newName = newName.replace(/\-/, subIndex);
                        $('.left', $(input).parent().parent()).text(newName);
                    }
                    subIndex++;
                }
            }
            index++;
        }
    });
}

//This was an attempt to add list indexes to support listDepth > 1, needs revising
//retaining this code in comments in a hope to get back to this some day -
//marri@
/*function renameListFields(fields, list, listDepth)
  {
      if(!fields) {
              var apiCallOption = $('#apicall option:selected');
              var apiGroup = apiCallOption.data('apigroup');
              var apiCall = apiCallOption.data('apicall');
              if(!apiGroup || !apiCall) return;
              fields = apiCall.Parameters;
              listDepth = 1;
      }
      for(var i=0;i<fields.length;i++) {
                var p = fields[i];
                var hyphenPattern = new RegExp("\\.\-{"+listDepth+"}\\.");;
                // if the field type is an enumerated field, select "select" elements,
                // otherwise select input elements
                var index = 1;

                var select = ':input';
                for(var e in ScratchpadEnums) if(e == p.Type) select = 'select';
                var newName = p.Name;
                $(select).each(function() {
                    if(p.List || list) {
                             if(p.Name == $(this)[0].id && hyphenPattern.test(p.Name)){
                                  newName = p.Name.replace(hyphenPattern,  "."+index+".");
                                  $('.left', $(this)[0].parentNode.parentNode).text(newName);
                                  index++;            
                             }

                    }
                    if(p.Type == 'Complex') {
                        renameListFields(p.Parameters, p.List,listDepth);
                    }
                });
                if(list && p.List){
                    matchAndReplace(p,listDepth+1,select,newName);
                }
            } 
       }

  // matches -{innerLoop} regular expression and replaces with the index 
  function matchAndReplace(paramater,innerLoop,select,name){
         var index = 1;
         var hyphenPattern = new RegExp("\.\-{"+innerLoop+"}\.");
         $(select).each(function() {
                  if(paramater.Name == $(this)[0].id && hyphenPattern.test(name)) {
                        var newName=name.replace(hyphenPattern,"."+index+".");
                        $('.left', $(this)[0].parentNode.parentNode).text(newName);
                        index++;
                  }
              });
  }

// Remove trailing . 
function cleanTrailingDots(){
          var fields;
          var trailingDot = new RegExp("\.$");
          var apiCallOption = $('#apicall option:selected');
          var apiGroup = apiCallOption.data('apigroup');
          var apiCall = apiCallOption.data('apicall');
          if(!apiGroup || !apiCall) return;
          fields = apiCall.Parameters;
          for(var i=0;i<fields.length;i++) {
                  var p = fields[i];
                  var newName=p.Name.replace(trailingDot,""); //get rid of trailing .
                  $('.left', $(this)[0].parentNode.parentNode).text(newName);
          }
}*/


/* Creates a field.  "field" is a javascript object with the keys 'required', 'name', and 'type'. */
function createField(field, isRemovable) {
    var fieldDisplayTooltip = field.DisplayName ? field.DisplayName : field.Name;
    var fieldDisplayName = field.Name;

    var divRow = $('<div class="row" title="' + fieldDisplayTooltip + '">');
    var divLeft = $('<div class="left">');
    divRow.append(divLeft);
    divLeft.append(fieldDisplayName);
    var divRight = $('<div class="right">');
    divRow.append(divRight);

    var isEnum = false;
    for (var e in ScratchpadEnums) if (e == field.Type) isEnum = true;
    if (isEnum) {
        // Create a drop-down list based on the enumeration type
        var select = createSelect(field, ScratchpadEnums[field.Type]);
        select = $(select);
        if ($.browser.msie) {
            // In IE, a fixed width dropdown cuts off longer text so expand it and reset
            // the CSS when the input focus leaves the dropdown.
            select.click(function () {
                if (!$(this).data('oldWidth')) {
                    $(this).data('oldWidth', $(this).width() + 'px'); $(this).css("width", "auto");
                }
            });
            select.blur(function () {
                if ($(this).data('oldWidth')) {
                    $(this).css("width", $(this).data('oldWidth'));
                    $(this).data('oldWidth', null);
                }
            });
        }
        divRight.append(select);
    }
    else if (field.Type == 'Checkbox') {
        // Simple true/false checkbox        
        divRight.append($('<input type="checkbox" id="' + field['Name'] + '"></input>'));
    }
    else if (field.Type == 'Timestamp') {
        // Place a jQuery Datepicker in an input field.
        var input = $('<input type="text" id="' + field['Name'] + '"></input>');
        divRight.append(input);

        input.datepicker({ dateFormat: "yy-mm-dd" });
        var input = $('<input class="hasTimepicker" type="text" id="' + field['Name'] + '_time"></input>');
        divRight.append(input);

        input.attr('value', '00:00');
    }
    else if (field.Type == 'DateString') {
        // tt0034049277, The tyep of FreightReadyDate is DateString in coral model.
        // See: http://tiny/ggeiqf5m/codeamazpackFBAIblobmainmode
        var input = $('<input type="text" id="' + field['Name'] + '"></input>');
        divRight.append(input);

        input.datepicker({ dateFormat: "yy-mm-dd" });
    }
    else if (field.Type == 'Complex' || field.Type == 'ComplexList') {
        var ret;
        if (field.Type == 'ComplexList') {
            ret = $('<div class="ComplexList" title="' + fieldDisplayTooltip + '"></div>');
        } else if (field.List) {
            ret = $('<div class="List" title="' + fieldDisplayTooltip + '"></div>');
        }
        else {
            ret = $('<div></div>');
        }
        var h5 = $('<h5><div style="float: left">' + fieldDisplayName + '</div></h5>');
        var h5div = $('<div class="row"></div>');
        h5div.append(h5);
        ret.append(h5div);
        for (var i = 0; i < field.Parameters.length; i++) {
            if (field.Parameters[i]) {
                ret.append(createField(field.Parameters[i]));
            }
        }

        if (field.List) {
            var img;

            if (isRemovable) img = $('<img src="' + imageMinus + '" />');
            else img = $('<img src="' + imagePlus + '" />"');
            var a = $('<a href="javascript://"></a>');
            a.append(img);
            a.data('field', field);
            if (isRemovable) {
                // if the field is removable, then clicking on it should remove it
                a.click(function () {
                    $(this).parent().parent().remove();
                    renameListFields();
                });
            }
            else {
                // otherwise clicking on this field should create a removable duplicate
                a.click(function () {
                    $(this).parent().parent().parent().append(createField($(this).data('field'), true));
                    renameListFields();
                });
            }
            a.attr('style', 'float: right');
            h5div.append(a);
        }
        return ret;
    }
    else {
        // Default to a text field
        divRight.append($('<input type="text" id="' + field['Name'] + '"></input>'));
    }
    if (field.List) {
        var img;

        if (isRemovable) img = $('<img src="' + imageMinus + '" />');
        else img = $('<img src="' + imagePlus + '" />"');
        var a = $('<a href="javascript://"></a>');
        a.append(img);
        a.data('field', field);
        if (isRemovable) {
            // if the field is removable, then clicking on it should remove it
            a.click(function () {
                $(this).parent().parent().remove();
                renameListFields();
            });
        }
        else {
            // otherwise clicking on this field should create a removable duplicate
            a.click(function () {
                $(this).parent().parent().parent().append(createField($(this).data('field'), true));
                renameListFields();
            });
        }
        divRight.append(a);
    }

    return divRow;
}

function initFields(fields) {
    // Hide SubmitFeed specific fields.
    $('#tabs').tabs('option', 'disabled', [0]);
    $('#tabs').tabs('select', 1);
    $('#tab-feed-li').hide();
    $('#form-feed').hide();
    $('#contentmd5').hide();
    $('#contentmd5header').hide();
    $('#contentmd5b64header').hide();
    $('#contentmd5b64').hide();

    // Erase all optional field elements    
    $('#required-parameters-content div').remove();
    $('#optional-parameters-content div').remove();
    $('#optional-parameters-content h5').remove();
    $('#required-parameters-content h5').remove();
    $('#optional-parameters-content a').remove();
    $('#required-parameters-content a').remove();

    var apiCallOption = $('#apicall option:selected');
    var apiGroup = apiCallOption.data('apigroup');
    var apiCall = apiCallOption.data('apicall');

    if (!apiGroup || !apiCall) return;
    $('#request-path').attr('value', apiGroup.Path);

    for (var i = 0; i < apiCall['Parameters'].length; i++) {
        var field = createField(apiCall['Parameters'][i]);
        if (apiCall['Parameters'][i].Required) $('#required-parameters-content').append(field);
        else $('#optional-parameters-content').append(field);
    }
    renameListFields();

    if ($('#required-parameters-content').get(0).children.length == 0) {
        $('#required-parameters-content').append("<h5>" + stringNoRequiredParams + "</h5>");
    }
    if ($('#optional-parameters-content').get(0).children.length == 0) {
        $('#optional-parameters-content').append("<h5>" + stringNoOptionalParams + "</h5>");
    }
    // Show SubmitFeed input forms
    if (apiCall.ShowFeed) {
        $('#tab-feed-li').show();
        $('#tabs').tabs('option', 'disabled', []);
        $('#tabs').tabs('select', 0);
        $('#form-feed').show();
        $('#feed').show('slow');
    }




}

/* Initializes the api calls drop down based on the selected api section */
function initApiCalls() {
    $('#apicall').find('option').remove();
    $('#apicall').find('optgroup').remove();

    $('#apicall').append($("<option>" + stringPickApiOperation + "</option>"));
    var api = $('#apisection').val();
    for (var groupName in ScratchpadApis[api]['Groups']) {
        var group = ScratchpadApis[api]['Groups'][groupName];
        $('#apicall').append('<optgroup label="' + groupName + '">');
        for (var apicallname in group['ApiCalls']) {
            var apicall = group['ApiCalls'][apicallname];
            $('#apicall').append($('<option></option>').attr("value", apicallname).html('&nbsp;&nbsp;' + apicallname).data('apicall', apicall).data('apigroup', group));
        }
        $('#apicall').append('</optgroup>');
    }

    $('#apiVersion').attr('value', ScratchpadApis[api]['Version']);
}

function initPageFields() {
    $('#tabs').tabs();

    $('#endpoint').attr('value', window.location.host);
    $('#appName').attr('value', 'AmazonJavascriptScratchpad');
    $('#appVersion').attr('value', '1.0');
    $('#appLanguage').attr('value', 'Javascript');
    $('#calcTimestamp').attr('checked', 'checked');
    $('#signatureVersion').attr('value', '2');
    $('#signatureMethod').attr('value', 'HmacSHA256');

    $('#inputForm').show();

    $('#contentmd5').hide();
    $('#contentmd5header').hide();
    $('#contentmd5b64header').hide();
    $('#contentmd5b64').hide();

    var action = getParameter('apicall');
    if (action) $('#apicall').val(action);

    $('#feedId').attr('value', getParameter('feedid'));
    $('#reportId').attr('value', getParameter('reportid'));

    // Show field to type in custom feed type
    $('#FeedType').change(function () {
        if ($('#FeedType option:selected').text() == 'Other') {
            $('#divOtherFeedType').show();
            $('#otherFeedType').focus();
        }
        else {
            $('#divOtherFeedType').hide();
        }
    });
    $('#ReportType').change(function () {
        if ($('#ReportType option:selected').text() == 'Other') {
            $('#divOtherReportType').show();
            $('#otherReportType').focus();
        }
        else {
            $('#divOtherReportType').hide();
        }
    });

    // Add known API sections to dropdown
    $('#apisection').find('option').remove();
    for (var a in ScratchpadApis) {
        $('#apisection').append($('<option value="' + a + '">' + ScratchpadApis[a]['Name'] + '</option>'));
    }

    // Initialize the apisection for a change event
    $('#apisection').change(function () {
        $('#response').addClass('shaded');
        $('#apicall option:eq(0)').attr('selected', 'selected');
        initApiCalls();
        initFields();
    });

    // Initialize the apicall function and watch for a change event.
    initApiCalls();
    initFields();
    $('#apicall').change(function () {
        $('#response').addClass('shaded');
        initFields();
    });

    //$('#endpoint').val( $('#endpoint').val() )
    $('#merchantID').val('A1CO8LVX9DCHB6')
    $('#authToken').val('amzn.mws.9ab28784-5d49-28b4-0ecd-6299ab453f1f')
    $('#awsAccountID').val('AKIAJLW2QPKBWGO23JPA')
    $('#secretKey').val('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')
    
    //debugger
}

function toggleTimestamp() {
    if ($('#calcTimestamp').attr('checked')) {
        $('#mytimestamp').attr('disabled', 'disabled');
    }
    else {
        $('#mytimestamp').attr('disabled', null);
        $('#mytimestamp').attr('value', dateFormat(new Date(), 'isoUtcDateTime'));
    }
}

function createStringToSign(nameValues) {
    var keys = [];
    for (var k in nameValues) keys.push(k);
    var str = '';

    keys = keys.sort();

    for (var i = 0; i < keys.length; i++) {
        if (i != 0) str += '&';
        str += keys[i] + '=' + nameValues[keys[i]];
    }

    return str;
}

/**
 * Escape special characters from an ID value to avoid misinterpretation as a
 * CSS selector.
 */
function escapeId(idValue) {
    return idValue.replace(/([:.])/g, "\\$1");
}

function getParameterValues(key, list, complexListName) {
    // JQuery has some issues in IE8 with IDs containing characters like dots, so
    // the convenient way of querying doesn't work so well.
    var ret = new Array();
    if (key.Type == 'Complex' || key.Type == 'ComplexList') {
        for (var i = 0; i < key['Parameters'].length; i++) {
            // Complex type, recursively remember the 'list' key so that child params don't have to
            // explicitly define it.
            if (key['Parameters'][i]) {
                var pp;
                if (key.Type == 'Complex' && complexListName && key.List) {
                    pp = getParameterValuesForComplexField(key.Parameters, complexListName, key.DisplayName);
                } else if (key.Type == 'Complex') {
                    pp = getParameterValues(key['Parameters'][i], key.List);
                } else {
                    pp = getParameterValues(key['Parameters'][i], key.List, key.DisplayName);
                }
                for (p in pp) ret[p] = pp[p];
            }
        }
        return ret;
    }
    var index = 1;
    var keyname = key.Name;

    var isEnum = false;
    for (var e in ScratchpadEnums) if (e == key.Type) isEnum = true;

    if (isEnum) {
        $("select").each(function () {
            if (keyname == $(this)[0].id) {
                var value = $(this).val();
                value = urlEncode(value);
                if (key.Required || value) {
                    if (key.List || list) ret[key.Name.replace(/\-/, index)] = value;
                    else ret[key.Name] = value;
                }
                index++;
            }
        });
    }
    else if (key.Type == 'Checkbox') {
        $(':input').each(function () {
            if (keyname == $(this)[0].id) {
                if (key.List || list) ret[key.Name.replace(/\-/, index)] = $(this).attr('checked') ? 'true' : 'false';
                else ret[key.Name] = $(this).attr('checked') ? 'true' : 'false';
                index++;
            }
        });
    }
    else if (key.Type == 'Timestamp') {
        $(':input').each(function () {
            if (keyname == $(this)[0].id) {
                var value = $(this).attr('value');

                var timeValue = $('#' + escapeId($(this)[0].id + '_time')).attr('value');

                if (key.Required || value) {
                    try {
                        if (timeValue && timeValue.length > 0) {
                            value = urlEncode(dateFormat(new Date(value.substr(0, 4), parseInt(value.substr(5, 2), 10) - 1, value.substr(8, 2),
                                timeValue.substr(0, 2), timeValue.substr(3, 2), timeValue.substr(6, 2)), 'isoUtcDateTime'));
                        } else {
                            value = urlEncode(dateFormat(new Date(value.substr(0, 4), parseInt(value.substr(5, 2), 10) - 1, value.substr(8, 2)), 'isoUtcDateTime'));
                        }
                        if (key.List || list) ret[key.Name.replace(/\-/, index)] = value;
                        else ret[key.Name] = value;
                    }
                    catch (err) {
                        alert('The date/time format for ' + $(this)[0].id + ' is invalid.');
                        throw (err);
                    }
                }
                index++;
            }
        });
    }
    else {
        $(':input').each(function () {
            if (keyname == $(this)[0].id) {
                var value = $(this).attr('value');
                if (key.Required || value) {
                    value = urlEncode(value);
                    if (key.List || list) ret[key.Name.replace(/\-/, index)] = value;
                    else ret[key.Name] = value;
                }
                index++;
            }
        });
    }
    return ret;
}

//This function currently only supports text fields. We need to remove this and write a complete recursive support for Lists
function getParameterValuesForComplexField(fields, complexListName, name) {
    var index = 1;
    var ret = new Array();
    $('.ComplexList').each(function (i, obj) {
        var subIndex = 1;
        if ($(this).attr("title") == complexListName) {
            var childLists = $(this).children(".List");
            for (var i = 0; i < childLists.length; i++) {
                var curChild = childLists[i];
                if ($(curChild).attr("title") == name) {
                    for (var j = 0; j < fields.length; j++) {
                        var field = fields[j];
                        var input = $(curChild).find("[id='" + field.Name + "']");
                        var newName = field.Name.replace(/\-/, index);
                        newName = newName.replace(/\-/, subIndex);
                        //Only for text fields now. Not extending this because we need to make this a generic recusive list
                        if (typeof field.Type === 'undefined') {
                            ret[newName] = getValueFromTextField(input);
                        }
                    }
                    subIndex++;
                }
            }
            index++;
        }
    });
    return ret;
}

function getValueFromTextField(input) {
    var value = $(input).attr('value');
    value = urlEncode(value);
    return value;
}

/**
 * Function that preprocesses, signs, and then posts request. 
 * Each parameter except for the secret key, appName, appVersion,
 * signatureVersion, signatureMethod, appLanguage, endpoint and 
 * apiPath is url encoded, specifically everything that is rendered
 *  back or posted is url encoded.
 */
function postRequest() {
    $('#tabs').tabs('select', 1);

    var apiSection = $('#apisection').val();
    var action = $.trim($('#apicall').val());

    var apiCallOption = $('#apicall option:selected');
    var apiGroup = apiCallOption.data('apigroup');
    var apiCall = apiCallOption.data('apicall');

    PostedAction = action;

    if (!apiGroup) {
        alert(stringNoAction);
        return;
    }
    var apiPath = apiGroup['Path'];

    var endpoint = $('#endpoint').attr('value')  ;
    var merchantID = urlEncode(jQuery.trim($('#merchantID').attr('value')));
    var marketplaceID = jQuery.trim($('#marketplaceID').attr('value'));
    var awsAccountID = urlEncode(jQuery.trim($('#awsAccountID').attr('value')));
    var authToken = urlEncode(jQuery.trim($('#authToken').attr('value')));
    var secretKey = jQuery.trim($('#secretKey').attr('value'));
    var appName = $('#appName').attr('value');
    var appVersion = $('#appVersion').attr('value');
    var signatureVersion = $('#signatureVersion').attr('value');
    var signatureMethod = $('#signatureMethod').attr('value');
    var apiVersion = $('#apiVersion').attr('value');
    var feed = $('#feed').attr('value');
    var feedType = $('#feedType option:selected').text();
    var appLanguage = $('#appLanguage').attr('value');
    apiPath = $('#request-path').attr('value');

    var userAgent = appName + '/' + appVersion + ' (Language=' + appLanguage + ')';
    var timestamp = dateFormat(new Date(), 'isoUtcDateTime');
    if (!$('#calcTimestamp').attr('checked')) timestamp = $('#mytimestamp').attr('value');

    var contentMD5 = hex_md5(feed);
    var b64contentMD5 = hexstr2b64(contentMD5);
    var encodedContentMD5 = urlEncode(b64contentMD5);

    // some validation
    timestamp = urlEncode(timestamp);

    var nv = new Array();
    nv['AWSAccessKeyId'] = awsAccountID;
    nv['Action'] = action;

    // Only legacy APIs say "Merchant"
    if (apiSection != 'Feeds' && apiSection != 'Reports') {
        nv['SellerId'] = merchantID;
    }
    else {
        nv['Merchant'] = merchantID;
    }
    if (authToken != '') {
        nv['MWSAuthToken'] = authToken;
    }
    nv['SignatureMethod'] = 'HmacSHA256';
    nv['SignatureVersion'] = '2';
    nv['Timestamp'] = timestamp;
    nv['Version'] = apiVersion;
    if (action == 'SubmitFeed') nv['ContentMD5Value'] = encodedContentMD5;

    var tip = new RegExp("\\s*\[(]+[\\w\\s]*\[)]+");
    for (var i = 0; i < apiCall.Parameters.length; i++) {
        var p = apiCall.Parameters[i];
        var pp = getParameterValues(p);
        for (var par in pp) {
            if (apiSection == 'Recommendations' && par.search("FilterOptions") > 0) {
                var n = pp[par].split("%2C");
                for (var j = 0; j < n.length; j++) {
                    par = par.replace(tip, ".FilterOption.");
                    nv[par + (j + 1)] = n[j];
                }
            }
            else
                nv[par] = pp[par];
        }
    }

    var stringToSign = "POST\n" + endpoint + "\n";
    stringToSign += apiPath + "\n";
    stringToSign += createStringToSign(nv);

    var hmac = Crypto.HMAC(Crypto.SHA256, stringToSign, secretKey, { asString: false });

    $('#stringToSign').html('<pre>' + formatPre(stringToSign.replace(/&/g, '&amp;')) + '</pre>');
    $('#hmac').html(hmac);

    var b64hmac = hexstr2b64(hmac);
    var j = b64hmac.length % 4;
    for (var i = 0; i < j; i++) b64hmac += '=';
    $('#base64hmac').html(b64hmac);

    $('#response').html('<img class="loading" />');

    if (action == 'SubmitFeed') {
        $('#contentmd5').show();
        $('#contentmd5header').show();
        $('#contentmd5b64header').show();
        $('#contentmd5b64').show();
    }

    var queryString = "AWSAccessKeyId=" + awsAccountID + "&Action=" + action;

    // only legacy APIs say Merchant, newer ones user SellerId
    if (apiSection != 'Feeds' && apiSection != 'Reports') queryString += "&SellerId=" + merchantID;
    else queryString += "&Merchant=" + merchantID;
    if (authToken != '') queryString += "&MWSAuthToken=" + authToken;
    queryString += "&SignatureVersion=2";
    queryString += "&Timestamp=" + timestamp;
    queryString += "&Version=" + apiVersion;
    if (action == 'SubmitFeed') queryString += "&ContentMD5Value=" + encodedContentMD5;
    queryString += "&Signature=" + urlEncode(b64hmac);
    queryString += "&SignatureMethod=HmacSHA256";
    for (var i = 0; i < apiCall.Parameters.length; i++) {
        var p = apiCall.Parameters[i];
        var pp = getParameterValues(p);
        for (var par in pp) {
            if (apiSection == 'Recommendations' && par.search("FilterOptions") > 0) {
                var n = pp[par].split("%2C");
                for (var j = 0; j < n.length; j++) {
                    par = par.replace(tip, ".FilterOption.");
                    queryString += "&" + par + (j + 1) + "=" + n[j];
                }
            }
            else
                queryString += "&" + par + "=" + pp[par]
        }
    }

    var myPost = 'POST ' + apiPath + '?' + queryString + ' HTTP/1.1\r\n';
    myPost += 'Host: ' + endpoint;
    myPost += '\r\nx-amazon-user-agent: ' + userAgent;
    myPost += '\r\nContent-Type: text/xml';

    var formatPost = myPost.replace(/&/g, '\r\n  &');
    $('#post').text(formatPost);

    $('#response').removeClass('shaded');

    $('#contentmd5').html(contentMD5);
    $('#contentmd5b64').html(b64contentMD5);

    if (action == 'SubmitFeed') {
        $.ajax({
            url: 'https://' + endpoint + apiPath + '?' + queryString,
            success: postSuccess,
            error: postError,
            data: feed,
            dataType: 'text',
            type: 'POST',
            contentType: 'text/xml',
            beforeSend: function (req) {
                req.setRequestHeader("User-Agent", userAgent);
                req.setRequestHeader("x-amazon-user-agent", userAgent);
            }
        });
    } else {
        $.ajax({
            url: 'https://' + endpoint + apiPath,
            success: postSuccess,
            error: postError,
            data: queryString,
            dataType: 'text',
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            beforeSend: function (req) {
                req.setRequestHeader("User-Agent", userAgent);
                req.setRequestHeader("x-amazon-user-agent", userAgent);
            }
        });
    }

}

function formatXml(xml) {
    var formatted = '';
    var reg = /(>)(<)(\/*)/g;
    xml = xml.replace(reg, '$1\r\n$2$3');
    var pad = 0;
    jQuery.each(xml.split('\r\n'), function (index, node) {
        var indent = 0;
        if (node.match(/.+<\/\w[^>]*>$/)) {
            indent = 0;
        } else if (node.match(/^<\/\w/)) {
            if (pad != 0) {
                pad -= 1;
            }
        } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
            indent = 1;
        } else {
            indent = 0;
        }

        var padding = '';
        for (var i = 0; i < pad; i++) {
            padding += '  ';
        }

        node = node.replace(/\>/g, '#lt;/span>#lt;span class="tagEnd">&gt;#lt;/span>');
        node = node.replace(/\</g, '<span class="tagStart">&lt;</span><span class="tag">');
        node = node.replace(/#lt;/g, '<');
        formatted += padding + node + '\r\n';
        pad += indent;
    });

    return formatted;
}

/* Called on an unsuccessful postback */
function postError(req, data, err) {
    $('#statusCode').html(stringResponse + ' (' + req.status + ')');
    var response = req.responseText;
    response = formatXml(response);
    response = '<pre>' + response + '</pre>';
    $('#response').html(response);
}

/* Called on a successful postback. */
function postSuccess(data, req, textStatus) {
    $('#statusCode').html(stringResponse + " (200)");
    var response = req.responseText;
    response = data;
    response = formatXml(response);
    if (PostedAction == 'SubmitFeed') {
        //response = response.replace(/([0-9]{5,15})/, '<a href="javascript://" onclick="init_getFeedSubmissionResult($1);">$1</a>');
    }
    else if (PostedAction == 'GetReportList') {
        //response = response.replace(/([0-9]{4,15})/, '<a href="scratchpad.html?apicall=GetReport&reportid=$1">$1</a>');
    }

    response = '<pre>' + response + '</pre>';
    $('#response').html(response);
}
