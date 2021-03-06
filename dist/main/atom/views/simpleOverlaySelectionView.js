/**
 * A functional form of the SelectListView
 * Only one of these bad boys is allowed on the screen at one time
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var singleton;
function default_1(options, editor) {
    if (!singleton)
        singleton = new SimpleOverlaySelectListView(options, editor);
    else {
        singleton.options = options;
    }
    singleton.setItems();
    singleton.show();
    return singleton;
}
exports.default = default_1;
var sp = require('atom-space-pen-views');
var SimpleOverlaySelectListView = (function (_super) {
    __extends(SimpleOverlaySelectListView, _super);
    function SimpleOverlaySelectListView(options, editor) {
        _super.call(this);
        this.options = options;
        this.editor = editor;
        this.$.addClass('atomts-overlay');
        this.filterEditorView.model.placeholderText = 'Filter list';
    }
    Object.defineProperty(SimpleOverlaySelectListView.prototype, "$", {
        get: function () {
            return this;
        },
        enumerable: true,
        configurable: true
    });
    SimpleOverlaySelectListView.prototype.setItems = function () {
        _super.prototype.setItems.call(this, this.options.items);
    };
    SimpleOverlaySelectListView.prototype.viewForItem = function (item) {
        return "<li>\n            " + this.options.viewForItem(item) + "\n        </li>";
    };
    SimpleOverlaySelectListView.prototype.confirmed = function (item) {
        this.options.confirmed(item);
        this.hide();
    };
    SimpleOverlaySelectListView.prototype.getFilterKey = function () {
        return this.options.filterKey;
    };
    SimpleOverlaySelectListView.prototype.show = function () {
        var _this = this;
        this.storeFocusedElement();
        this._overlayDecoration = this.editor.decorateMarker(this.editor.getLastCursor().getMarker(), { type: "overlay", position: "tail", item: this });
        setTimeout(function () { return _this.focusFilterEditor(); }, 100);
    };
    SimpleOverlaySelectListView.prototype.hide = function () {
        this.restoreFocus();
        if (this._overlayDecoration)
            this._overlayDecoration.destroy();
    };
    SimpleOverlaySelectListView.prototype.cancelled = function () {
        this.hide();
    };
    return SimpleOverlaySelectListView;
})(sp.SelectListView);
exports.SimpleOverlaySelectListView = SimpleOverlaySelectListView;
