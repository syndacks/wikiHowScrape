var request = require('request');
var cheerio = require('cheerio');
var urlParser = require('url');
var urls = [];
var urlToCrawl = process.argv[2];

request(urlToCrawl, function (err, resp, body){
	if(!err && resp.statusCode == 200){
		var $ = cheerio.load(body);
		$('a', '#bodycontents').each(function(){
			var url = $(this).attr('href');
			if (url == undefined)
				return;
			//add 'http:' to each item in array
			//for(var i = 0; i<urls.length; i++){
			var fixedUrl = urlParser.resolve(urlToCrawl, url);
			console.log(fixedUrl);
			urls.push(fixedUrl);
		});

		//console.log(urls);
	}
});
