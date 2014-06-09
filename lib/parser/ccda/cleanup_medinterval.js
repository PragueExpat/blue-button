"use strict";

var Cleanup = module.exports = {};

var augmentMedicationInterval = Cleanup.augmentMedicationInterval = function() {

    var o = this.js;
    return {
        xsitype: o.xsitype,
        period: {
            value: o.period && o.period.js && o.period.js.value,
            unit: o.period && o.period.js && o.period.js.unit    
        },
        frequency: o.frequency,
        event: o.event && o.event.js
        /*
         phase: {
         low: o.phase && o.phase.js && o.phase.js.low,
         width: {
         value: o.phase && o.phase.js && o.phase.js.width && o.phase.js.width.js && o.phase.js.width.js.value,
         unit: o.phase && o.phase.js && o.phase.js.width && o.phase.js.width.js && o.phase.js.width.js.unit
         },
         center: o.phase && o.phase.js && o.phase.js.center,
         high: o.phase && o.phase.js && o.phase.js.high
         },
         offset: {
         value: o.offset && o.offset.js && o.offset.js.value,
         unit: o.offset && o.offset.js && o.offset.js.unit
         }
         */
    };

};

augmentMedicationInterval.replaceSchema = function(current) {
    return [{
        xsitype: 'string',
        period: {
            value: 'string',
            unit: 'string'
        },
        frequency: 'string',
        event: 'string'
    }];
};

