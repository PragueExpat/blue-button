"use strict";

var shared = require("../shared");
var component = require("../component");
var cleanup = require("../cleanup");

var augmentImmunizationStatus = function() {
    var tmpStatus = "";
    if (this.js.negation_ind === "true") {
        tmpStatus = "refused";
    } else if (this.js.mood_code === "INT") {
        tmpStatus = "pending";
    } else if (this.js.mood_code === "EVN") {
        tmpStatus = "complete";
    } else {
        tmpStatus = "unknown";
    }
    this.js = tmpStatus;
};

augmentImmunizationStatus.replaceSchema = function() {
    return "string";
};

var ImmunizationStatus = component.define("ImmunizationStatus")
    .fields([
        ["mood_code", "0..1", "./@moodCode"],
        ["negation_ind", "0..1", "./@negationInd"],
    ]).cleanupStep(augmentImmunizationStatus);

var ImmunizationAdministration = component.define("ImmunizationAdministration")
    .fields([
        ["route", "0..1", "h:routeCode", shared.ConceptDescriptor],
        ["body_site", "0..1", "h:approachSiteCode", shared.ConceptDescriptor],
        ["quantity", "0..1", "h:doseQuantity", shared.PhysicalQuantity],
        ["form", "0..1", "h:administrationUnitCode", shared.ConceptDescriptor]
    ]);

var immunizationActivityProduct = component.define('immunizationActivityProduct')
    .fields([
        ["code", "1..1", "h:manufacturedMaterial/h:code", shared.ConceptDescriptor],
        ["lot_number", "0..1", "h:manufacturedMaterial/h:lotNumberText"],
        ["manufacturer", "0..1", "h:manufacturerOrganization/h:name"],
    ]).cleanupStep(cleanup.extractAllFields(['code']));

var ImmunizationActivity = component.define("ImmunizationActivity")
    .templateRoot("2.16.840.1.113883.10.20.22.4.52")
    .fields([
        ["date", "1..1", "h:effectiveTime", shared.EffectiveTime],
        ["identifiers", "1..*", "h:id", shared.Identifier],
        ["status", "0..1", "./../h:substanceAdministration", ImmunizationStatus],
        ["sequence_number", "0..1", "h:repeatNumber/@value"],
        ["product", "0..1", "h:consumable/h:manufacturedProduct", immunizationActivityProduct],
        ["administration", "0..1", "./../h:substanceAdministration", ImmunizationAdministration],
        ["performer", "0..1", "h:performer/h:assignedEntity", shared.assignedEntity],
        ["refusal_reason", "0..1", "h:entryRelationship/h:observation/h:code/@code", shared.SimpleCode("2.16.840.1.113883.5.8")],
    ]);

var immunizationsSection = exports.immunizationsSection = component.define("immunizationsSection");
immunizationsSection.templateRoot(["2.16.840.1.113883.10.20.22.2.2", "2.16.840.1.113883.10.20.22.2.2.1"]);
immunizationsSection.fields([
    ["immunizations", "0..*", ImmunizationActivity.xpath(), ImmunizationActivity]
]);

immunizationsSection.cleanupStep(cleanup.replaceWithField('immunizations'));
