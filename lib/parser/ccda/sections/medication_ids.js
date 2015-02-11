"use strict";

var shared = require("../shared");
var component = require("../component");
var cleanup = require("../cleanup");
var Processor = require('../processor');
var bbm = require("blue-button-meta");

var exportMedicationsSection = function (version) {

    // below entries differ between ccda-r1.1 and ccda-r1.0
    // ***************************************************************************
    // *                      ccda-r1.1 (LATEST VERSION)                         *
    // ***************************************************************************
    if (version == "") {
        var medicationsSection = component.define("medicationsSection");
        medicationsSection.templateRoot(["2.16.840.1.113883.10.20.22.2.1", "2.16.840.1.113883.10.20.22.2.1.1"]);
        medicationsSection.fields([
            ["medicationIds", "0..*", ".//h:text[1]/h:table[1]/h:tbody[1]/h:tr/h:td[1]/@ID"]
        ]);
        medicationsSection.cleanupStep(cleanup.replaceWithField('medicationIds'));
        return [medicationsSection];

        // ***************************************************************************
        // *                      ccda-r1.0 (OLD VERSION)                            *
        // ***************************************************************************
    } else {
        var medicationsSection = component.define("medicationsSection");
        medicationsSection.templateRoot("2.16.840.1.113883.10.20.1.8");
        medicationsSection.fields([
            ["medicationIds", "0..*", "./h:text/h:table[1]/h:tbody/h:tr/h:td[1]/@ID"]
        ]);
        medicationsSection.cleanupStep(cleanup.replaceWithField('medicationIds'));
        return [medicationsSection];
    }
};

exports.medicationIdsSection = exportMedicationsSection;
exports.medicationIdsEntry = exportMedicationsSection;