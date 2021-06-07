"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.LdfEditorComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var ldf_1 = require("@venite/ldf");
var operators_1 = require("rxjs/operators");
var editor_service_1 = require("./editor.service");
var add_block_component_1 = require("../add-block/add-block.component");
var query_selector_shadow_dom_1 = require("query-selector-shadow-dom");
var is_online_1 = require("./is-online");
var is_completely_compiled_1 = require("src/app/pray/is-completely-compiled");
var LdfEditorComponent = /** @class */ (function () {
    function LdfEditorComponent(auth, documents, editorService, modal, alert, translate, navCtrl, loading, toast, prayService) {
        this.auth = auth;
        this.documents = documents;
        this.editorService = editorService;
        this.modal = modal;
        this.alert = alert;
        this.translate = translate;
        this.navCtrl = navCtrl;
        this.loading = loading;
        this.toast = toast;
        this.prayService = prayService;
        this.preview = false;
        this.includeToolbar = false;
        this.editorStatusCode = editor_service_1.EditorStatusCode;
        // For Gloria Patri requests
        this.glorias = {};
    }
    LdfEditorComponent.prototype.permissionDenied = function () {
        return __awaiter(this, void 0, Promise, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alert.create({
                            header: this.translate.instant("editor.permission-denied-header"),
                            message: this.translate.instant("editor.permission-denied"),
                            buttons: [
                                {
                                    text: this.translate.instant("editor.go-back"),
                                    handler: function () { return _this.navCtrl.back(); }
                                },
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, null];
                }
            });
        });
    };
    LdfEditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.editorStatus = this.editorService.status;
        this.state$ = this.editorService
            .editorState(this.docId)
            .pipe(operators_1.catchError(function () { return _this.permissionDenied(); }));
        this.settingsClasses$ = this.state$.pipe(operators_1.map(function (state) { var _a, _b; return (_b = (_a = state === null || state === void 0 ? void 0 : state.localManager) === null || _a === void 0 ? void 0 : _a.document) === null || _b === void 0 ? void 0 : _b.display_settings; }), operators_1.filter(function (settings) { return Boolean(settings); }), operators_1.map(function (settings) {
            return [
                "ldf-wrapper",
                settings.dropcaps ? "dropcaps-" + settings.dropcaps : "",
                settings.response ? "response-" + settings.response : "",
                settings.repeatAntiphon
                    ? "repeat-antiphon-" + settings.repeatAntiphon
                    : "",
                settings.fontscale
                    ? "fontscale-" + settings.fontscale.toString()
                    : "",
                settings.font ? "font-" + settings.font : "",
                "psalmverses-" + settings.psalmVerses,
                "bibleverses-" + settings.bibleVerses,
                settings.bolded ? "bolded-" + settings.bolded : "",
            ].join(" ");
        }), operators_1.startWith("ldf-wrapper"));
        this.setupOnlineListener();
    };
    LdfEditorComponent.prototype.setupOnlineListener = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            var _this = this;
            return __generator(this, function (_a) {
                is_online_1.isOnline().subscribe(function (isOnline) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(isOnline && toast)) return [3 /*break*/, 2];
                                return [4 /*yield*/, toast.dismiss()];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 5];
                            case 2:
                                if (!!isOnline) return [3 /*break*/, 5];
                                return [4 /*yield*/, this.toast.create({
                                        message: this.translate.instant("editor.offline")
                                    })];
                            case 3:
                                toast = _a.sent();
                                return [4 /*yield*/, toast.present()];
                            case 4:
                                _a.sent();
                                _a.label = 5;
                            case 5: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    LdfEditorComponent.prototype.ngOnDestroy = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.gloriaSubscription) {
                            this.gloriaSubscription.unsubscribe();
                        }
                        return [4 /*yield*/, this.editorService.leave(this.docId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Called whenever the user's cursor moves within this editor
    LdfEditorComponent.prototype.updateCursor = function (docId, ev) {
        //console.log('update cursor', docId, ev.detail);
        this.editorService.updateCursor(docId, ev.detail);
    };
    // Called whenever the user changes a document within this editor
    LdfEditorComponent.prototype.processChange = function (manager, ev) {
        this.editorService.processChange(manager, ev.detail);
    };
    LdfEditorComponent.prototype.addBlockDirectly = function (manager, ev) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, base, index;
            var _this = this;
            return __generator(this, function (_b) {
                _a = ev.detail, base = _a.base, index = _a.index;
                // if in bulletin mode, and not template mode, compile the addition first
                this.addBlock(function (data) {
                    var _a;
                    var compiled$ = manager.document.day
                        ? _this.prayService.compile(ldf_1.docsToLiturgy(data), manager.document.day, {}, (_a = manager.document.metadata) === null || _a === void 0 ? void 0 : _a.liturgyversions, {})
                        : rxjs_1.of(ldf_1.docsToLiturgy(data));
                    compiled$
                        .pipe(operators_1.filter(function (doc) { return !manager.document.day || is_completely_compiled_1.isCompletelyCompiled(doc); }), operators_1.first())
                        .subscribe(function (data) {
                        if (data) {
                            _this.add(manager, base, index, [data]);
                            var path = base + "/" + index, el = query_selector_shadow_dom_1.querySelectorDeep("[path=\"" + path + "\"]");
                            // make the block editable now, or wait a tick then try
                            if (el) {
                                _this.makeBlockEditable(base, index);
                            }
                            else {
                                setTimeout(function () { return _this.makeBlockEditable(base, index); }, 10);
                            }
                        }
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    LdfEditorComponent.prototype.makeBlockEditable = function (base, index) {
        var path = base + "/" + index, el = query_selector_shadow_dom_1.querySelectorDeep("[path=\"" + path + "\"]");
        el.setAttribute("editable", "true");
        el.setAttribute("preview", "false");
    };
    LdfEditorComponent.prototype.addBlockAsOption = function (manager, ev) {
        var _this = this;
        var _a = ev.detail, base = _a.base, index = _a.index, obj = _a.obj;
        // Add an option to an existing `Option`
        if (obj.type == "option") {
            this.addBlock(function (data) { return _this.add(manager, base + "/value", index, data); });
        }
        // Otherwise, add a new doc and convert the whole thing to an `Option`
        else {
            this.addBlock(function (data) {
                return _this.replace(manager, base, index, obj, [
                    new ldf_1.Option({
                        type: "option",
                        condition: obj === null || obj === void 0 ? void 0 : obj.condition,
                        metadata: { selected: 0 },
                        // TODO -- convert to Liturgy if data really has more than one member
                        // do this by moving the docToLiturgy and docToOption stuff into LDF and calling it here and in PrayService
                        value: [obj, ldf_1.docsToLiturgy(data)]
                    }),
                ]);
            });
        }
    };
    LdfEditorComponent.prototype.addGloriaPatri = function (manager, ev) {
        var _this = this;
        var _a = ev.detail, path = _a.path, language = _a.language, version = _a.version, oldValue = _a.oldValue;
        if (this.gloriaSubscription) {
            this.gloriaSubscription.unsubscribe();
        }
        if (this.glorias[language + "-" + version]) {
            this.editorService.processChange(manager, new ldf_1.Change({
                path: path + "/metadata/gloria",
                op: [
                    {
                        type: "set",
                        oldValue: oldValue,
                        value: this.glorias[language + "-" + version]
                    },
                ]
            }));
        }
        else {
            this.gloriaSubscription = this.documents
                .findDocumentsBySlug("gloria-patri", language, [version])
                .subscribe({
                next: function (value) {
                    _this.editorService.processChange(manager, new ldf_1.Change({
                        path: path + "/metadata/gloria",
                        op: [
                            {
                                type: "set",
                                oldValue: oldValue,
                                value: ldf_1.docsToOption(value)
                            },
                        ]
                    }));
                    _this.glorias[language + "-" + version] = ldf_1.docsToOption(value);
                }
            });
        }
    };
    // Called whenever the user wants to add a new LiturgicalDocument block at JSON pointer `base`/`index`
    LdfEditorComponent.prototype.addBlock = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var modal, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modal.create({
                            component: add_block_component_1.AddBlockComponent,
                            swipeToClose: true
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.componentProps = { modal: modal };
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, modal.onDidDismiss()];
                    case 3:
                        data = (_a.sent()).data;
                        if (data) {
                            callback(data);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LdfEditorComponent.prototype.add = function (manager, base, index, template) {
        var _this = this;
        /*const change = new Change({
          path: base,
          op: template.reverse() // list inserts are *before* an index, so if we reverse the array it'll end up in the right order
            .map(value => ({
              type: 'insertAt',
              index: index,
              value
            }))
        });
        //console.log(change);
        this.editorService.processChange(manager, change);*/
        template.reverse().forEach(function (value) {
            _this.editorService.processChange(manager, new ldf_1.Change({
                path: base,
                op: [
                    {
                        type: "insertAt",
                        index: index,
                        value: value
                    },
                ]
            }));
        });
    };
    LdfEditorComponent.prototype.replace = function (manager, base, index, oldValue, template) {
        var path = base + "/" + index;
        //console.log('replacing', path, 'with', template[0]);
        // TODO: handle trying to insert an Array (like a hymn) as an Option field, which won't work unless we pack it up as a Liturgy
        var change = new ldf_1.Change({
            path: path,
            op: [
                {
                    type: "set",
                    oldValue: oldValue,
                    value: template[0]
                },
            ]
        });
        this.editorService.processChange(manager, change);
    };
    // ldf-editable-metadata-metadata-fields might emit an ldfAskForBibleIntros event
    // in response, we should call the setBibleIntros methods of that component
    LdfEditorComponent.prototype.sendBibleIntros = function (ev, intros) {
        if (intros === void 0) { intros = []; }
        var target = ev.detail ||
            document.querySelector("ldf-editable-metadata-metadata-fields");
        target.setBibleReadingIntros(intros);
        if (!((intros === null || intros === void 0 ? void 0 : intros.length) > 0) ||
            ((intros === null || intros === void 0 ? void 0 : intros.length) == 1 && intros[0].value[0] == "Loading...")) {
            // todo fix language/version here
            this.documents
                .findDocumentsByCategory(["Bible Reading Introduction"], "en")
                .subscribe(function (data) { return ev.detail.setBibleReadingIntros(data); });
        }
    };
    // ldf-psalm might emit an ldfAskForCanticleOptions event
    // in response, we should call the setVersions and setOptions methods of that component
    // setVersions(Record<string, string>) and setOptions(LiturgicalDocument[])
    LdfEditorComponent.prototype.sendCanticleOptions = function (ev, versions, options) {
        ev.detail.setVersions(versions);
        ev.detail.setOptions(options);
    };
    // ldf-prayers-and-thanksgivings might emit an ldfAskForPrayersAndThanksgivings event
    // in response, we should call the setOptions method of that component
    LdfEditorComponent.prototype.sendPrayersAndThanksgivings = function (ev, versions, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //const options = await this.documents.findDocumentsByCategory(["Prayers and Thanksgivings"], "en", ["bcp1979"]).toPromise();
                console.log("sendP&T", options);
                ev.detail.setOptions(options);
                return [2 /*return*/];
            });
        });
    };
    // one of the arrow keys in a sub-doc has been clicked, so it should move up or down in the parent doc's `value`
    LdfEditorComponent.prototype.moveSubDoc = function (manager, ev) {
        var _this = this;
        this.editorService.processChange(manager, new ldf_1.Change({
            path: ev.detail.base,
            op: [
                {
                    type: "move",
                    oldValue: ev.detail.oldIndex,
                    value: ev.detail.oldIndex + ev.detail.diff
                },
            ]
        }));
        setTimeout(function () {
            return _this.makeBlockEditable(ev.detail.base, ev.detail.oldIndex + ev.detail.diff);
        }, 10);
    };
    __decorate([
        core_1.Input()
    ], LdfEditorComponent.prototype, "docId");
    __decorate([
        core_1.Input()
    ], LdfEditorComponent.prototype, "state");
    __decorate([
        core_1.Input()
    ], LdfEditorComponent.prototype, "serverManager");
    __decorate([
        core_1.Input()
    ], LdfEditorComponent.prototype, "preview");
    __decorate([
        core_1.Input()
    ], LdfEditorComponent.prototype, "includeToolbar");
    LdfEditorComponent = __decorate([
        core_1.Component({
            selector: "venite-ldf-editor",
            templateUrl: "./ldf-editor.component.html",
            styleUrls: ["./ldf-editor.component.scss"]
        })
    ], LdfEditorComponent);
    return LdfEditorComponent;
}());
exports.LdfEditorComponent = LdfEditorComponent;
