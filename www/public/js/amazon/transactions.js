/**
 * Function that preprocesses, signs, and then posts request. 
 * Each parameter except for the secret key, appName, appVersion,
 * signatureVersion, signatureMethod, appLanguage, endpoint and 
 * apiPath is url encoded, specifically everything that is rendered
 *  back or posted is url encoded.
 */
function amazon_postRequest(apiSection, action, FeedType, AmazonData, MarketplaceIdList, feed) {
    

    var apiSection = apiSection;
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

    var endpoint = $('#endpoint').attr('value');
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