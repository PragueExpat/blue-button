"use strict";

var shared = require('./shared');
var component = require('./component');

exports.participants = component.define("Participants")
    .fields([
        ["type", "0..1", "@classCode", shared.SimpleCode("2.16.840.1.113883.11.20.9.33")],
        ["code", "0..1", "h:code", shared.ConceptDescriptor],
        ["address", "0..1", "h:address", shared.Address],
        ["phone", "0..*", "h:telecom[starts-with(@value,'tel:')]", shared.Phone],
        ["email", "0..*", "h:telecom[starts-with(@value,'mailto:')]", shared.Email],
        ["person", "0..1", "h:associatedPerson/h:name", shared.IndividualName]
    ]);