"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.docsToLiturgy = void 0;
var liturgy_1 = require("../liturgy/liturgy");
/* Converts a list of documents into a single document including all the documents in serial */
function docsToLiturgy(docs) {
    var uniqueLabels = docs.map(function (o) { return o.label; })
        .reduce(function (uniques, item) { return (uniques.includes(item) ? uniques : __spreadArrays(uniques, [item])); }, []).length;
    return (docs === null || docs === void 0 ? void 0 : docs.length) > 1
        ? // if multiple LiturgicalDocuments given, return a Liturgy made up of them
            new liturgy_1.Liturgy({
                type: 'liturgy',
                value: docs,
                label: docs[0] ? docs[0].label : undefined
            })
        : // if only one LiturgicalDocument given, return that document
            docs[0];
}
exports.docsToLiturgy = docsToLiturgy;
