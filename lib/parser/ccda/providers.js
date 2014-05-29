"use strict";

var shared = require('./shared');
var component = require('./component');

var Provider = component.define("Provider")
    .fields([
        ["function", "0..1", "h:functionCode", shared.ConceptDescriptor],
        ["provider", "1..1", "h:assignedEntity", shared.assignedEntity]
    ]);

exports.providers = component.define("Providers")
    .fields([
        ["date", "1..1", "h:effectiveTime", shared.EffectiveTime],
        ["providers", "0..*", "h:performer", Provider],
    ]);
