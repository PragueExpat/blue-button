var expect = require('chai').expect;
var assert = require('chai').assert;

var fs = require('fs');
var path = require('path');

var bb = require('../index');
var jsutil = require('../lib/jsutil');

describe('socialHistory parser', function() {
    var socialHistory = null;
    
    before(function(done) {
        var filepath  = path.join(__dirname, 'fixtures/file-snippets/CCD_1_SocialHistory.xml');
        var xml = fs.readFileSync(filepath, 'utf-8');
        bb.parse(xml, {component: 'ccda_social_history'}, function(err, result) {
            socialHistory = result.toJSON();
            //console.log(JSON.stringify(socialHistory, null, 10));
            done();
        });
    });
    
    it('full deep check', function(done) {
        expect(socialHistory).to.exist;
        var filepath  = path.join(__dirname, 'fixtures/file-snippets/json/CCD_1_SocialHistory.json');
        var json2Read = fs.readFileSync(filepath, 'utf-8');
        var expectedSocialHistory = jsutil.jsonParseWithDate(json2Read);
        expect(socialHistory).to.deep.equal(expectedSocialHistory);
        done();
    });
});