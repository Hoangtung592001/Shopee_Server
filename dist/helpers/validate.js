"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const ajv_1 = require("ajv");
const exception_1 = require("./exception");
const ajv_formats_1 = require("ajv-formats");
const ISOStringRegex = new RegExp('^\\d\\d\\d\\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])T(00|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9].[0-9][0-9][0-9])Z$');
const AjvInstance = new ajv_1.default();
(0, ajv_formats_1.default)(AjvInstance);
AjvInstance.addFormat('ISOString', {
    validate: (dateTimeString) => ISOStringRegex.test(dateTimeString),
});
function validate(schemaKeyRef, data) {
    const validate = AjvInstance.validate(schemaKeyRef, data);
    if (!validate)
        throw new exception_1.UnprocessableEntity(AjvInstance.errors);
}
exports.validate = validate;
//# sourceMappingURL=validate.js.map