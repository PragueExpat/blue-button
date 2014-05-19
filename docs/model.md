# Data Models

This area documents the JSON data models which are produced by the library; each section is detailed in its own file.  Unsupported Sections are optional elements which aren't currently implemented.  Please feel free to issue a pull request for support of these sections (so long as it has tests).

JSON doesn't currently have a standard schema language; consequently these models are written to be used in a [Mongoose.js](http://www.mongoosejs.com) compatible schema.

There are components common to multiple sections and are defined [here](sections/shared.md).

###Required Sections:

- [Allergies](sections/allergies.md) - Draft
- [Medications](sections/medications.md) - TBD
- [Problems](sections/problems.md) - Draft
- [Results](sections/results.md) - Draft
- [Demographics](sections/demographics.md) - Draft

###Optional Sections:

- [Procedures](sections/procedures.md) - Draft
- [Encounters](sections/encounters.md) - Draft
- [Immunizations](sections/immunizations.md) - Draft
- [Vitals](sections/vitals.md) - Draft
- [Social History](sections/socialHistory.md) - Draft

###Unsupported Sections/Components:

- Advance Directives
- Family History
- Functional Status
- Medical Equipment
- Payers
- Plan of Care
- Author
- Data Enterer
- Informant
- Custodian
- Information Recipient
- Legal Authenticator
- Authenticator
- Documentation Of
