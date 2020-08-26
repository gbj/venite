"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.Option = void 0;
var liturgical_document_1 = require("./liturgical-document");
var version_to_string_1 = require("./utils/version-to-string");
var VERSIONS = {
    ip: 'IP',
    bcp1979: '1979',
    eow: 'EOW',
    coverdale: 'Coverdale',
    rite_i: 'Rite I'
};
var Option = /** @class */ (function (_super) {
    __extends(Option, _super);
    //** Constructor takes a Javascript object containing the class's properties */
    function Option(data) {
        if (data === void 0) { data = {}; }
        return _super.call(this, data) || this;
    }
    Option.prototype.uniqueVersions = function () {
        return this.value
            .map(function (o) { return version_to_string_1.versionToString(o.version); })
            .reduce(function (uniques, item) { return (uniques.includes(item) ? uniques : __spreadArrays(uniques, [item])); }, []).length;
    };
    Option.prototype.uniqueLabels = function () {
        return this.value
            .map(function (o) { return o.label; })
            .reduce(function (uniques, item) { return (uniques.includes(item) ? uniques : __spreadArrays(uniques, [item])); }, []).length;
    };
    Option.prototype.uniqueCitations = function () {
        return this.value
            .map(function (o) { return (o.citation ? o.citation.toString() : ''); })
            .filter(function (citation) { return !!citation; })
            .reduce(function (uniques, item) { return (uniques.includes(item) ? uniques : __spreadArrays(uniques, [item])); }, []).length;
    };
    /** Gives an appropriate version label for the document given */
    Option.prototype.getVersionLabel = function (option, maxLength) {
        var _a, _b, _c;
        if (maxLength === void 0) { maxLength = 50; }
        var uniqueVersions = this.uniqueVersions(), uniqueLabels = this.uniqueLabels(), uniqueCitations = this.uniqueCitations();
        var label;
        if (option.type == 'liturgy') {
            label = option.label || option.version_label || 'Option';
        }
        // Psalm 119 parts => Psalm 119: Aleph
        else if (option.type == 'psalm' &&
            uniqueVersions == 1 &&
            option.label &&
            (((_a = option.slug) === null || _a === void 0 ? void 0 : _a.match(/psalm_119_/)) || ((_b = option.citation) === null || _b === void 0 ? void 0 : _b.toString().match(/Ps[^\d]+119/)))) {
            label = option.label;
        }
        // Other psalms: Psalm 121
        else if (option.type == 'psalm' &&
            option.style == 'psalm' &&
            (option.citation || ((_c = option.metadata) === null || _c === void 0 ? void 0 : _c.number)) &&
            uniqueVersions == 1) {
            label = option.citation ? option.citation.toString() : "Psalm " + option.metadata.number;
        }
        // Readings of many citations => include truncated text
        else if (option.type == 'bible-reading' &&
            uniqueCitations > 1 &&
            option.citation &&
            option.value &&
            option.value.length > 0) {
            var text = option.value
                .map(function (v) { return (v.hasOwnProperty('text') ? v.text : v.toString()); })
                .join(' ');
            if (uniqueVersions > 1) {
                label = option.citation.toString() + " (" + option.version + ") (\u201C" + text + "\u201D)";
            }
            else {
                label = option.citation.toString() + " (\u201C" + text + "\u201D)";
            }
        }
        // Readings with one version => John 1:1-4
        else if (option.type == 'bible-reading' && option.citation && uniqueVersions == 1) {
            label = option.citation.toString();
        }
        // Readings with multiple versions => John 1:1-4
        else if (option.type == 'bible-reading' && option.citation && uniqueVersions > 1) {
            label = option.citation.toString() + " (" + option.version + ")";
        }
        // Canticles, if only one version
        else if (uniqueVersions == 1 &&
            option.type == 'psalm' &&
            option.style == 'canticle' &&
            option.metadata &&
            option.metadata.localname) {
            label = option.metadata.localname;
        }
        // Canticles and invitatories, if multiple options => Venite (EOW)
        else if (uniqueVersions > 1 && option.metadata && option.metadata.hasOwnProperty('localname') && option.version) {
            label = option.metadata.localname + " (" + VERSIONS[version_to_string_1.versionToString(option.version)] + ")";
        }
        // Version label other than BCP 1979 => EOW
        else if (option.version_label && option.version_label !== 'bcp1979') {
            label = option.version_label;
        }
        // If multiple labels, then label => Trisagion, Gloria in Excelsis, Kyrie
        else if (option.label && uniqueLabels > 1 && uniqueVersions == 1) {
            label = option.label;
        }
        // If multiple labels and version, then label (version) => Trisagion (BCP), Gloria in Excelsis (EOW)
        else if (option.label && uniqueLabels > 1 && uniqueVersions > 1) {
            label = option.label + " (" + VERSIONS[version_to_string_1.versionToString(option.version)] + ")";
        }
        // Local name but no version (or version is BCP) => 'The Song of Mary'
        else if (option.metadata &&
            option.metadata.hasOwnProperty('localname') &&
            (!option.version_label || option.version_label == 'bcp1979')) {
            label = option.metadata.localname;
        }
        // Fall back to a version label
        else if (uniqueVersions > 1 && option.version) {
            label = VERSIONS[version_to_string_1.versionToString(option.version)];
        }
        // Fall back to a citation
        else if (option.citation) {
            label = option.citation.toString();
        }
        // Fallback: stripped version of JSON of value
        else if (option.value) {
            label = "\u201C" + JSON.stringify(option.value)
                .replace(/[\[\]\{\}\"\'\:]/g, ' ')
                .replace(/\\n/g, ' ')
                .trim() + "\u201D";
        }
        else {
            throw "Unable to generate a label from " + JSON.stringify(option);
        }
        label = label.length > maxLength ? label.substring(0, maxLength) + '...' : label;
        return label;
    };
    return Option;
}(liturgical_document_1.LiturgicalDocument));
exports.Option = Option;
