"use strict";

var shared = require("../shared");
var component = require("../component");
var cleanup = require("../cleanup");
var Processor = require('../processor');
var bbm = require("blue-button-meta");

var exportMedicationEpicSection = function (version) {

    var MedicationEpicInfo = component.define("MedicationEpicInfo")
        .fields([
            ["medicationId", "0..*", "h:tr/h:td[1]/@ID"],
            ["medicationStatus", "0..*", "h:tr/h:td[7]"]
        ]);

    var medicationEpicSection = component.define("medicationEpicSection");
    medicationEpicSection.templateRoot(["2.16.840.1.113883.10.20.22.2.1", "2.16.840.1.113883.10.20.22.2.1.1"]);
    medicationEpicSection.fields([
        ["medicationEpic", "0..*", ".//h:text[1]/h:table[1]/h:tbody[1]", MedicationEpicInfo]
    ]);
    medicationEpicSection.cleanupStep(function(){
        var result = {};
        var wrapper = (this.js.medicationEpic && this.js.medicationEpic.length && this.js.medicationEpic[0]) || {};
        var ids = wrapper.js.medicationId || [];
        var statuses = wrapper.js.medicationStatus || [];
        ids.forEach(function(v, i){
            result[v] = statuses[i];
        });
        this.js.medicationEpic = result;
    });
    medicationEpicSection.cleanupStep(cleanup.replaceWithField('medicationEpic'));
    return [medicationEpicSection];

};

exports.medicationEpicSection = exportMedicationEpicSection;
