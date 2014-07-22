var libxmljs = require("libxmljs");
var libCCDAGen = require("../lib/templating_functions.js");

module.exports = function (data, codeSystems, isCCD, CCDxml) {
    //  // determining the number of entries
    // var entries = libCCDAGen.getNumEntries(data);

    var doc = new libxmljs.Document();
    var xmlDoc = libCCDAGen.header(!isCCD ? doc : CCDxml, "2.16.840.1.113883.10.20.22.2.1", "2.16.840.1.113883.10.20.22.2.1.1", "10160-0",
        "2.16.840.1.113883.6.1", "LOINC", "HISTORY OF MEDICATION USE", "MEDICATIONS", isCCD);

    // entries loop
    for (var i = 0; i < data.length; i++) {
        var time = libCCDAGen.getTimes(data[i]["date"]);
        xmlDoc = xmlDoc.node('entry').attr({
            typeCode: "DRIV"
        })
            .node('substanceAdministration').attr({
                classCode: "SBADM"
            }).attr({
                moodCode: "EVN"
            })
            .node('templateId').attr({
                root: "2.16.840.1.113883.10.20.22.4.16"
            }).parent(); // medication activity
        xmlDoc = libCCDAGen.id(xmlDoc, data[0]["identifiers"]);
        xmlDoc = xmlDoc.node('text', data[i]["product"]["unencoded_name"])
            .node('reference').attr({
                value: "#MedSec_1"
            }).parent()
            .parent()
            .node('statusCode').attr({
                code: 'completed'
            }).parent()
            .node('effectiveTime').attr({
                "xsi:type": "IVL_TS"
            })
            .node('low').attr(time == undefined ? {
                nullFlavor: "UNK"
            } : {
                value: time[0]
            }).parent()
            .node('high').attr(time == undefined ? {
                nullFlavor: "UNK"
            } : {
                value: time[2]
            }).parent()
            .parent()
            .node('effectiveTime').attr({
                "xsi:type": "PIVL_TS"
            })
            .attr({
                institutionSpecified: "true"
            })
            .attr({
                operator: "A"
            })
            .node('period').attr({
                value: "6"
            }).attr({
                unit: "h"
            }).parent()
            .parent()
        xmlDoc = libCCDAGen.medication_administration(xmlDoc, data[i]["administration"]);
        xmlDoc = libCCDAGen.consumable(xmlDoc, data, i, '#MedSec_1');
        xmlDoc = libCCDAGen.performerRevised(xmlDoc, undefined, {
            "id": undefined,
            "extension": undefined,
            "addr": undefined,
            "tel": undefined,
            "repOrg": "generic",
            "assignedP": undefined,
            "templateId_in": undefined
        });
        // xmlDoc = libCCDAGen.participant(xmlDoc, undefined, {"code": 1, "playingEntity": {"code": 1, "name": 1}, 
        //     "typeCode": "CSM", "classCode": "MANU", "tId": "2.16.840.1.113883.10.20.22.4.24", 
        //     "code": {"code": "412307009", "name": "drug vehicle", "codeSystem": "2.16.840.1.113883.6.96"}, 
        //     "playingEntity": {"code": {"code": "324049", "name": "Aerosol", "codeSystem": "2.16.840.1.113883.6.88", "codeSystemName": "RxNorm"}}, 
        //     "name": "Aerosol"});

        xmlDoc = xmlDoc.node('participant').attr({
            typeCode: "CSM"
        })
            .node('participantRole').attr({
                classCode: "MANU"
            }) // drug vehicle
        .node('templateId').attr({
            root: "2.16.840.1.113883.10.20.22.4.24"
        }).parent()
            .node('code').attr({
                code: "412307009"
            })
            .attr({
                displayName: "drug vehicle"
            })
            .attr({
                codeSystem: "2.16.840.1.113883.6.96"
            }).parent()
            .node('playingEntity').attr({
                classCode: "MMAT"
            })
            .node('code').attr({
                code: "324049"
            }) // TODO: PERFORM LOOKUP??
        .attr({
            displayName: "Aerosol"
        })
            .attr({
                codeSystem: "2.16.840.1.113883.6.88"
            })
            .attr({
                codeSystemName: "RxNorm"
            }).parent()
            .node('name', "Aerosol").parent()
            .parent()
            .parent()
            .parent()
            .node('entryRelationship').attr({
                typeCode: "RSON"
            })
            .node('observation').attr({
                classCode: "OBS"
            }).attr({
                moodCode: "EVN"
            }) // Indication
        .node('templateId').attr({
            root: "2.16.840.1.113883.10.20.22.4.19"
        }).parent()
            .node('id').attr({
                root: "db734647-fc99-424c-a864-7e3cda82e703"
            })
            .attr({
                extension: "45665"
            }).parent()
            .node('code').attr({
                code: "404684003"
            })
            .attr({
                displayName: "Finding"
            })
            .attr({
                codeSystem: codeSystems["SNOMED CT"][0]
            })
            .attr({
                codeSystemName: "SNOMED CT"
            }).parent()
            .node('statusCode').attr({
                code: "completed"
            }).parent()
            .node('effectiveTime')
            .node('low').attr(time == undefined ? {
                nullFlavor: "UNK"
            } : {
                value: time[0]
            }).parent()
            .parent()
            .node('value').attr({
                "xsi:type": "CD"
            })
            .attr({
                code: "233604007"
            })
            .attr({
                displayName: "Pneumonia"
            })
            .attr({
                codeSystem: "2.16.840.1.113883.6.96"
            }).parent()
            .parent()
            .parent()
            .node('entryRelationship').attr({
                typeCode: "REFR"
            })
            .node('supply').attr({
                classCode: "SPLY"
            }).attr({
                moodCode: "INT"
            })
            .node('templateId').attr({
                root: "2.16.840.1.113883.10.20.22.4.17"
            }).parent()
            .node('id').attr({
                nullFlavor: "NI"
            }).parent()
            .node('statusCode').attr({
                code: "completed"
            }).parent()
            .node('effectiveTime').attr({
                "xsi:type": "IVL_TS"
            })
            .node('low').attr(time == undefined ? {
                nullFlavor: "UNK"
            } : {
                value: time[0]
            }).parent()
            .node('high').attr(time == undefined ? {
                nullFlavor: "UNK"
            } : {
                value: time[1]
            }).parent()
            .parent()
            .node('repeatNumber').attr({
                value: "1"
            }).parent()
            .node('quantity').attr({
                value: "75"
            }).parent()
            .node('product');
        xmlDoc = libCCDAGen.manufacturedProduct(xmlDoc, data, i, '#MedSec_1');
        xmlDoc = xmlDoc.parent();
        xmlDoc = libCCDAGen.performerRevised(xmlDoc, undefined, {
            "id": "2.16.840.1.113883.19.5.9999.456",
            "extension": "2981823",
            "addr": "generic",
            "tel": undefined,
            "repOrg": undefined,
            "assignedP": undefined,
            "templateId_in": undefined
        });
        xmlDoc = xmlDoc.node('author')
            .node('time').attr({
                nullFlavor: "UNK"
            }).parent()
            .node('assignedAuthor')
            .node('id').attr(data[i]["product"]["identifiers"] == undefined ? {
                nullFlavor: "UNK"
            } : {
                root: data[i]["product"]["identifiers"]["identifier"]
            }).parent()
            .node('addr').attr({
                nullFlavor: "UNK"
            }).parent()
            .node('telecom').attr({
                nullFlavor: "UNK"
            }).parent()
            .node('assignedPerson')
            .node('name')
            .node('prefix', "Dr.").parent()
            .node('given', "Henry").parent()
            .node('family', 'Seven').parent()
            .parent()
            .parent()
            .parent()
            .parent();

        xmlDoc = libCCDAGen.entryRelationship(xmlDoc, data, 'act', i, undefined, "409073007");
        xmlDoc = xmlDoc.parent()
            .parent();

        xmlDoc = xmlDoc.node('entryRelationship').attr({
            typeCode: "REFR"
        })
            .node('supply').attr({
                classCode: "SPLY"
            }).attr({
                moodCode: "EVN"
            }) // medication dispense
        .node('templateId').attr({
            root: "2.16.840.1.113883.10.20.22.4.18"
        }).parent()
            .node('id').attr({
                root: "1.2.3.4.56789.1"
            }).attr({
                extension: "cb734647-fc99-424c-a864-7e3cda82e704"
            }).parent()
            .node('statusCode').attr({
                code: "completed"
            }).parent()
            .node('effectiveTime').attr(time == undefined ? {
                nullFlavor: "UNK"
            } : {
                value: time[0]
            }).parent()
            .node('repeatNumber').attr({
                value: "1"
            }).parent()
            .node('quantity').attr({
                value: "75"
            }).parent()
            .node('product');
        xmlDoc = libCCDAGen.manufacturedProduct(xmlDoc, data, i, '#MedSec_1');
        xmlDoc = xmlDoc.parent();
        xmlDoc = libCCDAGen.performerRevised(xmlDoc, undefined, {
            "id": "2.16.840.1.113883.19.5.9999.456",
            "extension": "2981823",
            "addr": "generic",
            "tel": undefined,
            "repOrg": "generic",
            "assignedP": "generic",
            "templateId_in": undefined
        });
        xmlDoc = xmlDoc.parent()
            .parent();
        xmlDoc = libCCDAGen.precondition(xmlDoc, data[i]["precondition"]);

        xmlDoc = xmlDoc.parent()
            .parent();
    }
    xmlDoc = xmlDoc.parent() // end section
    .parent(); // end clinicalDocument

    return isCCD ? xmlDoc : doc;
}
