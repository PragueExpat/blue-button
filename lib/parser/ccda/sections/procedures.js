"use strict";

var shared = require("../shared");
var component = require("../component");
var cleanup = require("../cleanup");

var organization = component.define('organization');
organization.fields([
    ["name", "0:1", "h:name"],
    ["address", "0..1", "h:addr", shared.Address],
    ["identifiers", "1..*", "h:id", shared.Identifier],
    ["phone", "0..*", "h:telecom", shared.Phone],
    ["email", "0..*", "h:telecom[starts-with(@value,'mailto:')]", shared.Email]
]);

var provider = component.define('provider');
provider.fields([
    ["address", "1..1", "h:addr", shared.Address],
    ["identifiers", "1..*", "h:id", shared.Identifier],
    ["phone", "0..*", "h:telecom", shared.Phone],
    ["email", "0..*", "h:telecom[starts-with(@value,'mailto:')]", shared.Email],
    ["organization", "0..1", "h:representedOrganization", organization]
]);

var entry  = component.define('entry');
entry.templateRoot(['2.16.840.1.113883.10.20.22.4.12', '2.16.840.1.113883.10.20.22.4.13', '2.16.840.1.113883.10.20.22.4.14']);
entry.fields([
    ["procedure", "1..1", "h:code", shared.ConceptDescriptor],
    ["identifiers", "1..*", "h:id", shared.Identifier],
    ["status", "1..1", "h:statusCode", shared.SimplifiedCodeOID('2.16.840.1.113883.11.20.9.22')],
    ["date", "0..1", "h:effectiveTime", shared.EffectiveTime],
    ["body_sites", "0..*", "h:targetSiteCode", shared.ConceptDescriptor],
    ["providers", "0..*", "h:performer/h:assignedEntity", provider],
    ["locations", "0..*", "h:participant/h:participantRole", shared.serviceDeliveryLocation],
    ['procedure_type', "1..1", "h:templateId/@root"]
]);

entry.cleanupStep(function() {
    var typeMap = {
        "2.16.840.1.113883.10.20.22.4.12": "act",
        "2.16.840.1.113883.10.20.22.4.13": "observation",
        "2.16.840.1.113883.10.20.22.4.14": "procedure"
    };
    var t = this.js['procedure_type'];
    this.js['procedure_type'] = typeMap[t];
});

var proceduresSection = exports.proceduresSection = component.define('proceduresSection');
proceduresSection.templateRoot(['2.16.840.1.113883.10.20.22.2.7', '2.16.840.1.113883.10.20.22.2.7.1']);
proceduresSection.fields([
    ["entry", "0..*", entry.xpath(), entry]
]);
proceduresSection.cleanupStep(cleanup.replaceWithField('entry'));

exports.proceduresEntry = entry;
