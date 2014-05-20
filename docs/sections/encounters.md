#Encounters

###Object Schema:
```
var Encounters = {
        "date": [{cda_date}],
        "identifiers": [{cda_id}],
        "name": {type: string, required: true},
        "code": {type: string, required: true},
        "code_system_name": {type:string, required: true},
        "locations": [[cda_location}],
        "findings": [{cda_concept}]
     }
```

[JSON/XML sample](samples/encounters.md)


####Notes
- Root name, code and code_system_name can be translated using translation objects.
- Finding might have a date range, a timestamp, or an additional coded value.  These are currently are not supported.
- Encounter diagnosis is not yet supported.

####Encounter.date
- 0..2
- //ClinicalDocument/component/structuredBody/component/section/entry/encounter/effectiveTime

####Encounter.identifiers
- 1..*
- //ClinicalDocument/component/structuredBody/component/section/entry/encounter/id

####Encounter.name
- 1..1
- //ClinicalDocument/component/structuredBody/component/section/entry/encounter/code@displayName
- Must be selected from EncounterTypeCode.
- A translation object is possible.
- Not supported: nullFlavor.
- TODO:  Support lookup of values from coding system.

####Encounter.code
- 1..1
- //ClinicalDocument/component/structuredBody/component/section/entry/encounter/code@code
- Must be selected from EncounterTypeCode.
- A translation object is possible.
- Not supported: nullFlavor.
- TODO:  Support lookup of values from coding system.

####Encounter.code_system_name
- 1..1
- //ClinicalDocument/component/structuredBody/component/section/entry/encounter/code@codeSystemName
- Can be be RXNORM, UNII, or NDF-RT.
- A translation object is possible.
- Not supported: nullFlavor.
- TODO:  Support lookup of values from coding system.

####Encounter.locations
- 0..*
- //ClinicalDocument/component/structuredBody/component/section/entry/encounter/participant/participantRole

###Encounter.findings
- 0..*
- //ClinicalDocument/component/structuredBody/component/section/entry/encounter/entryRelationShip/observation
- Should always be codified to SNOMED-CT.
- A translation object is possible instead of SNOMED.
- Not supported: nullFlavor.
- TODO:  Support lookup of values from coding system

