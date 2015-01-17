var TextDAO = require("../Collections/texts").TextDAO;

function ContentHandler(app, db){

var texts = new TextDAO(db);

this.diary = function(req, res, next){
	return res.renderPjax('index', {});
};

this.save = function(req, res, next){
	date = req.body.date;
	text = req.body.text;
	title = req.body.title;
	texts.insertTexts(text, date, title, function(err, result){
	if(err) throw next(err);
	return res.renderPjax('index',{message:'saved'});
	})
}
};

module.exports = ContentHandler;