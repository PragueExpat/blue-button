var libxmljs = require("libxmljs");
var libCCDAGen = require("../lib/templating_functions.js");

module.exports = function (data, codeSystems, isCCD, CCDxml) {
    // determining the number of entries
    // var entries = libCCDAGen.getNumEntries(data);

    var doc = new libxmljs.Document();
    var xmlDoc = libCCDAGen.header(!isCCD ? doc : CCDxml, "2.16.840.1.113883.10.20.22.2.7", "2.16.840.1.113883.10.20.22.2.7.1", "47519-4",
        "2.16.840.1.113883.6.1", "LOINC", "HISTORY OF PROCEDURES", "PROCEDURES", isCCD);

    var templateIds = {
        "act": "2.16.840.1.113883.10.20.22.4.12",
        "observation": "2.16.840.1.113883.10.20.22.4.13",
        "procedure": "2.16.840.1.113883.10.20.22.4.14"
    }

    // entries loop
    for (var i = 0; i < data.length; i++) {
        var timeArr = libCCDAGen.getTimes(data[i]["date"]);
        xmlDoc = xmlDoc.node('entry').attr({
            typeCode: "DRIV"
        })
            .node(data[i]["procedure_type"])
            .attr({
                classCode: data[i]["procedure_type"] == "procedure" ?
                    data[i]["procedure_type"].slice(0, 4).toUpperCase() : data[i]["procedure_type"].slice(0, 3).toUpperCase()
            })
            .attr({
                moodCode: "EVN"
            })
            .node('templateId').attr({
                root: templateIds[data[i]["procedure_type"]]
            }).parent(); // smoking status observation
        xmlDoc = libCCDAGen.id(xmlDoc, data[i]["identifiers"]);
        xmlDoc = libCCDAGen.code(xmlDoc, data[i]["procedure"]);
        xmlDoc = xmlDoc.node('originalText')
            .node('reference').attr({
                value: "#Proc1"
            }).parent()
            .parent()
            .parent()
            .node('statusCode').attr({
                code: 'completed'
            }).parent()
            .node('effectiveTime').attr({
                value: timeArr == undefined ? "UNK" : timeArr[0]
            }).parent()
            .node('methodCode').attr({
                nullFlavor: "UNK"
            }).parent();
        if (data[i]["body_sites"]) {
            xmlDoc = xmlDoc.node('targetSiteCode').attr({
                code: data[i]["body_sites"][0]["code"]
            })
                .attr({
                    displayName: data[i]["body_sites"][0]["name"]
                })
                .attr({
                    codeSystem: "2.16.840.1.113883.3.88.12.3221.8.9"
                })
                .attr({
                    codeSystemName: "Body Site Value Set"
                }).parent()
        }
        if (data[i]["procedure_type"] == "procedure") {
            xmlDoc = xmlDoc.node('specimen').attr({
                typeCode: "SPC"
            })
                .node('specimenRole').attr({
                    classCode: "SPEC"
                })
                .node('id').attr({
                    root: "c2ee9ee9-ae31-4628-a919-fec1cbb58683"
                }).parent()
                .node('specimenPlayingEntity')
                .node('code').attr({
                    code: "309226005"
                })
                .attr({
                    codeSystem: "2.16.840.1.113883.6.96"
                })
                .attr({
                    displayName: data[i]["procedure"] ? data[i]["procedure"]["name"] : "UNK"
                }).parent()
                .parent()
                .parent()
                .parent();
        }
        xmlDoc = libCCDAGen.performerRevised(xmlDoc, undefined, {
            "id": data[i]["providers"] ? data[i]["providers"][0]["organization"] ? data[i]["providers"][0]["organization"]["identifiers"] ?
                data[i]["providers"][0]["organization"]["identifiers"][0]["identifier"] : "UNK" : "UNK" : "UNK",
            "extension": data[i]["identifiers"] ? data[i]["identifiers"][0]["identifier_type"] : undefined,
            "addr": data[i]["providers"] ? data[i]["providers"][0]["address"] : undefined,
            "tel": data[i]["providers"] ? data[i]["providers"][0]["phone"] ? data[i]["providers"][0]["phone"][0]["number"] : "UNK" : "UNK",
            "repOrg": "generic",
            "assignedP": undefined,
            "templateId_in": undefined
        });
        if (data[i]["procedure_type"] == "procedure") {
            xmlDoc = xmlDoc.node('participant').attr({
                typeCode: "DEV"
            })
                .node('participantRole').attr({
                    classCode: "MANU"
                })
                .node('templateId').attr({
                    root: "2.16.840.1.113883.10.20.22.4.37"
                }).parent()
                .node('id').attr({
                    root: "742aee30-21c5-11e1-bfc2-0800200c9a66"
                }).parent()
                .node('playingDevice')
                .node('code').attr({
                    code: "90412006"
                })
                .attr({
                    codeSystem: "2.16.840.1.113883.6.96"
                })
                .attr({
                    displayName: "Colonoscope"
                }).parent()
                .parent()
                .node('scopingEntity')
                .node('id').attr({
                    root: "eb936010-7b17-11db-9fe1-0800200c9b65"
                }).parent()
                .parent()
                .parent()
                .parent()
        } else { // procedure is either of type observation or act
            xmlDoc = libCCDAGen.participant(xmlDoc, data[i]["locations"], {
                "playingEntity": 1
            }, {});
        }
        xmlDoc = xmlDoc.parent()
            .parent()
    }
    xmlDoc = xmlDoc.parent() // end section
    .parent(); // end component
    return isCCD ? xmlDoc : doc;
}
