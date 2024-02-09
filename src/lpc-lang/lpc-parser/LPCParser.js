"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _antlr = _interopRequireDefault(require("antlr4"));

var _LPCListener = _interopRequireDefault(require("./LPCListener.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var serializedATN = ["\x03\u608B\uA72A\u8133\uB9ED\u417C\u3BE7\u7786", "\u5964\x03e\u0304\x04\x02\t\x02\x04\x03\t\x03\x04\x04", "\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07\t\x07", "\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\x0B\t\x0B\x04\f\t\f", "\x04\r\t\r\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10", "\x04\x11\t\x11\x04\x12\t\x12\x04\x13\t\x13\x04\x14", "\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17", "\x04\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B", "\t\x1B\x04\x1C\t\x1C\x04\x1D\t\x1D\x04\x1E\t\x1E", "\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04#\t#\x04", "$\t$\x04%\t%\x04&\t&\x04'\t'\x04(\t(\x04)\t)\x04*\t*\x04", "+\t+\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x041\t1\x04", "2\t2\x043\t3\x044\t4\x045\t5\x046\t6\x047\t7\x048\t8\x04", "9\t9\x04:\t:\x04;\t;\x04<\t<\x04=\t=\x04>\t>\x04?\t?\x04", "@\t@\x04A\tA\x04B\tB\x04C\tC\x04D\tD\x04E\tE\x04F\tF\x04", "G\tG\x04H\tH\x04I\tI\x04J\tJ\x04K\tK\x04L\tL\x04M\tM\x04", "N\tN\x04O\tO\x04P\tP\x04Q\tQ\x04R\tR\x04S\tS\x04T\tT\x04", "U\tU\x04V\tV\x03\x02\x05\x02\xAE\n\x02\x03\x02\x03", "\x02\x03\x03\x06\x03\xB3\n\x03\r\x03\x0E\x03\xB4", "\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04", "\x03\x04\x03\x04\x05\x04\xBF\n\x04\x03\x05\x03", "\x05\x03\x05\x03\x05\x03\x06\x05\x06\xC6\n\x06", "\x03\x06\x03\x06\x03\x07\x05\x07\xCB\n\x07\x03", "\x07\x03\x07\x03\x07\x03\x07\x03\x07\x05\x07\xD2", "\n\x07\x03\x07\x03\x07\x03\b\x03\b\x03\b\x07\b\xD9", "\n\b\f\b\x0E\b\xDC\x0B\b\x03\b\x05\b\xDF\n\b\x03\t\x03", "\t\x05\t\xE3\n\t\x03\t\x03\t\x03\n\x03\n\x03\n\x07\n", "\xEA\n\n\f\n\x0E\n\xED\x0B\n\x03\x0B\x03\x0B\x03\x0B", "\x03\f\x03\f\x03\r\x03\r\x03\x0E\x05\x0E\xF7\n\x0E", "\x03\x0E\x06\x0E\xFA\n\x0E\r\x0E\x0E\x0E\xFB\x03", "\x0E\x07\x0E\xFF\n\x0E\f\x0E\x0E\x0E\u0102\x0B\x0E", "\x03\x0E\x05\x0E\u0105\n\x0E\x03\x0F\x03\x0F\x03", "\x0F\x05\x0F\u010A\n\x0F\x03\x0F\x03\x0F\x03\x10", "\x03\x10\x03\x10\x03\x11\x06\x11\u0112\n\x11\r\x11", "\x0E\x11\u0113\x03\x12\x03\x12\x03\x12\x03\x12\x03", "\x13\x05\x13\u011B\n\x13\x03\x13\x03\x13\x05\x13", "\u011F\n\x13\x03\x13\x05\x13\u0122\n\x13\x03\x14\x03", "\x14\x03\x14\x07\x14\u0127\n\x14\f\x14\x0E\x14\u012A", "\x0B\x14\x03\x15\x05\x15\u012D\n\x15\x03\x15\x03", "\x15\x05\x15\u0131\n\x15\x03\x15\x03\x15\x03\x15", "\x03\x15\x05\x15\u0137\n\x15\x03\x16\x03\x16\x03", "\x17\x03\x17\x03\x18\x03\x18\x03\x19\x03\x19\x03", "\x1A\x03\x1A\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03", "\x1C\x03\x1C\x03\x1C\x05\x1C\u014A\n\x1C\x03\x1C", "\x03\x1C\x03\x1C\x03\x1D\x03\x1D\x03\x1D\x03\x1E", "\x03\x1E\x03\x1E\x03\x1F\x03\x1F\x03\x1F\x03\x1F", "\x03\x1F\x03\x1F\x03\x1F\x05\x1F\u015C\n\x1F\x03", " \x03 \x03 \x05 \u0161\n \x03 \x03 \x03 \x03!\x03!\x03", "!\x03!\x03!\x03!\x03!\x03!\x03!\x03!\x03!\x03!\x03", "!\x03!\x03!\x03!\x03!\x03!\x03!\x03!\x03!\x03!\x06", "!\u017C\n!\r!\x0E!\u017D\x05!\u0180\n!\x03!\x03!\x03!\x03", "!\x03!\x03!\x03!\x03!\x03!\x03!\x03!\x03!\x03!\x03", "!\x03!\x03!\x03!\x03!\x03!\x03!\x03!\x03!\x07!\u0198", "\n!\f!\x0E!\u019B\x0B!\x03\"\x03\"\x03\"\x03\"\x03\"\x03", "#\x03#\x03#\x03#\x03#\x05#\u01A7\n#\x03#\x03#\x03$\x03", "$\x05$\u01AD\n$\x03%\x03%\x03%\x03%\x03%\x05%\u01B4\n", "%\x03&\x03&\x03&\x03&\x03&\x05&\u01BB\n&\x03'\x03'", "\x03'\x03(\x03(\x03(\x03(\x05(\u01C4\n(\x03)\x03)\x03", "*\x03*\x05*\u01CA\n*\x03*\x05*\u01CD\n*\x03*\x03*\x03", "+\x03+\x03+\x03,\x03,\x03,\x03-\x03-\x03-\x07-\u01DA", "\n-\f-\x0E-\u01DD\x0B-\x03.\x03.\x03.\x03.\x03/\x03", "/\x030\x030\x031\x031\x051\u01E9\n1\x031\x051\u01EC\n", "1\x031\x031\x032\x032\x032\x033\x033\x033\x034\x03", "4\x034\x034\x035\x035\x035\x055\u01FD\n5\x036\x036\x03", "6\x036\x036\x036\x056\u0205\n6\x056\u0207\n6\x037\x03", "7\x077\u020B\n7\f7\x0E7\u020E\x0B7\x037\x037\x038\x03", "8\x038\x038\x038\x038\x038\x038\x038\x038\x038\x05", "8\u021D\n8\x039\x039\x039\x03:\x03:\x03:\x03;\x03;\x05", ";\u0227\n;\x03<\x03<\x03<\x03<\x05<\u022D\n<\x03=\x03", "=\x03=\x03=\x03=\x03>\x03>\x03>\x03>\x03?\x03?\x03", "?\x03@\x03@\x03@\x05@\u023E\n@\x03@\x03@\x05@\u0242\n", "@\x03@\x03@\x05@\u0246\n@\x03@\x03@\x03A\x03A\x03A\x03", "B\x03B\x03B\x03B\x03B\x05B\u0252\nB\x03C\x05C\u0255\n", "C\x03C\x03C\x03D\x03D\x03E\x03E\x03F\x03F\x03F\x03", "G\x03G\x03G\x03G\x03G\x03G\x03G\x03H\x03H\x03H\x07", "H\u026A\nH\fH\x0EH\u026D\x0BH\x03I\x03I\x03I\x03I\x03", "I\x03I\x05I\u0275\nI\x03J\x03J\x03J\x05J\u027A\nJ\x03", "J\x03J\x03J\x03J\x03J\x03J\x03J\x03J\x03J\x03J\x03", "J\x03J\x03J\x03J\x05J\u028A\nJ\x03K\x03K\x03K\x07K\u028F", "\nK\fK\x0EK\u0292\x0BK\x03L\x03L\x03L\x03L\x03L\x03", "L\x05L\u029A\nL\x03M\x05M\u029D\nM\x03M\x03M\x03M\x03", "M\x03M\x05M\u02A4\nM\x03M\x03M\x03M\x03M\x05M\u02AA\n", "M\x03N\x03N\x05N\u02AE\nN\x03N\x03N\x03N\x05N\u02B3\n", "N\x03N\x03N\x03N\x05N\u02B8\nN\x03O\x03O\x03O\x03O\x03", "O\x03O\x03O\x03O\x03O\x03O\x05O\u02C4\nO\x03P\x03P\x05", "P\u02C8\nP\x03P\x05P\u02CB\nP\x03Q\x03Q\x03R\x03R\x03", "R\x03R\x03R\x03R\x03R\x05R\u02D6\nR\x03S\x03S\x03S\x03", "S\x03S\x03S\x07S\u02DE\nS\fS\x0ES\u02E1\x0BS\x03S\x05", "S\u02E4\nS\x03S\x03S\x03T\x03T\x03T\x05T\u02EB\nT\x03", "U\x03U\x03U\x03U\x07U\u02F1\nU\fU\x0EU\u02F4\x0BU\x03", "U\x05U\u02F7\nU\x03V\x03V\x03V\x07V\u02FC\nV\fV\x0EV\u02FF", "\x0BV\x03V\x05V\u0302\nV\x03V\x02\x03@W\x02\x04\x06", "\b\n\f\x0E\x10\x12\x14\x16\x18\x1A\x1C\x1E \"$&(*", ",.02468:<>@BDFHJLNPRTVXZ\\^`bdfhjlnprtvxz|~\x80\x82\x84\x86", "\x88\x8A\x8C\x8E\x90\x92\x94\x96\x98\x9A\x9C\x9E", "\xA0\xA2\xA4\xA6\xA8\xAA\x02\x0F\x03\x02\x04\x06", "\x04\x02\x03\x03\x07\b\x04\x02$$TT\x05\x024479FG\x03", "\x0223\x04\x02**CD\x05\x0256?BTT\x03\x0201\x03\x02", "&'\x04\x02,-==\x03\x02./\x04\x02()++\x03\x02`c\x02", "\u032E\x02\xAD\x03\x02\x02\x02\x04\xB2\x03\x02\x02", "\x02\x06\xBE\x03\x02\x02\x02\b\xC0\x03\x02\x02", "\x02\n\xC5\x03\x02\x02\x02\f\xCA\x03\x02\x02\x02", "\x0E\xD5\x03\x02\x02\x02\x10\xE0\x03\x02\x02\x02", "\x12\xE6\x03\x02\x02\x02\x14\xEE\x03\x02\x02\x02", "\x16\xF1\x03\x02\x02\x02\x18\xF3\x03\x02\x02\x02", "\x1A\u0104\x03\x02\x02\x02\x1C\u0106\x03\x02\x02\x02", "\x1E\u010D\x03\x02\x02\x02 \u0111\x03\x02\x02\x02", "\"\u0115\x03\x02\x02\x02$\u0121\x03\x02\x02\x02&\u0123", "\x03\x02\x02\x02(\u0136\x03\x02\x02\x02*\u0138\x03", "\x02\x02\x02,\u013A\x03\x02\x02\x02.\u013C\x03\x02", "\x02\x020\u013E\x03\x02\x02\x022\u0140\x03\x02\x02", "\x024\u0142\x03\x02\x02\x026\u0146\x03\x02\x02\x02", "8\u014E\x03\x02\x02\x02:\u0151\x03\x02\x02\x02<\u015B", "\x03\x02\x02\x02>\u015D\x03\x02\x02\x02@\u017F\x03", "\x02\x02\x02B\u019C\x03\x02\x02\x02D\u01A1\x03\x02", "\x02\x02F\u01AC\x03\x02\x02\x02H\u01B3\x03\x02\x02", "\x02J\u01BA\x03\x02\x02\x02L\u01BC\x03\x02\x02\x02", "N\u01C3\x03\x02\x02\x02P\u01C5\x03\x02\x02\x02R\u01C7", "\x03\x02\x02\x02T\u01D0\x03\x02\x02\x02V\u01D3\x03", "\x02\x02\x02X\u01D6\x03\x02\x02\x02Z\u01DE\x03\x02", "\x02\x02\\\u01E2\x03\x02\x02\x02^\u01E4\x03\x02\x02", "\x02`\u01E6\x03\x02\x02\x02b\u01EF\x03\x02\x02\x02", "d\u01F2\x03\x02\x02\x02f\u01F5\x03\x02\x02\x02h\u01FC", "\x03\x02\x02\x02j\u0206\x03\x02\x02\x02l\u0208\x03", "\x02\x02\x02n\u021C\x03\x02\x02\x02p\u021E\x03\x02", "\x02\x02r\u0221\x03\x02\x02\x02t\u0226\x03\x02\x02", "\x02v\u022C\x03\x02\x02\x02x\u022E\x03\x02\x02\x02", "z\u0233\x03\x02\x02\x02|\u0237\x03\x02\x02\x02~\u023A", "\x03\x02\x02\x02\x80\u0249\x03\x02\x02\x02\x82\u0251", "\x03\x02\x02\x02\x84\u0254\x03\x02\x02\x02\x86\u0258", "\x03\x02\x02\x02\x88\u025A\x03\x02\x02\x02\x8A\u025C", "\x03\x02\x02\x02\x8C\u025F\x03\x02\x02\x02\x8E\u0266", "\x03\x02\x02\x02\x90\u0274\x03\x02\x02\x02\x92\u0289", "\x03\x02\x02\x02\x94\u028B\x03\x02\x02\x02\x96\u0299", "\x03\x02\x02\x02\x98\u02A9\x03\x02\x02\x02\x9A\u02B7", "\x03\x02\x02\x02\x9C\u02C3\x03\x02\x02\x02\x9E\u02CA", "\x03\x02\x02\x02\xA0\u02CC\x03\x02\x02\x02\xA2\u02CE", "\x03\x02\x02\x02\xA4\u02D7\x03\x02\x02\x02\xA6\u02EA", "\x03\x02\x02\x02\xA8\u02EC\x03\x02\x02\x02\xAA\u02F8", "\x03\x02\x02\x02\xAC\xAE\x05\x04\x03\x02\xAD\xAC", "\x03\x02\x02\x02\xAD\xAE\x03\x02\x02\x02\xAE\xAF", "\x03\x02\x02\x02\xAF\xB0\x07\x02\x02\x03\xB0\x03", "\x03\x02\x02\x02\xB1\xB3\x05\x06\x04\x02\xB2\xB1", "\x03\x02\x02\x02\xB3\xB4\x03\x02\x02\x02\xB4\xB2", "\x03\x02\x02\x02\xB4\xB5\x03\x02\x02\x02\xB5\x05", "\x03\x02\x02\x02\xB6\xBF\x05\n\x06\x02\xB7\xBF", "\x05\x98M\x02\xB8\xB9\x05\f\x07\x02\xB9\xBA\x07", "I\x02\x02\xBA\xBF\x03\x02\x02\x02\xBB\xBF\x05", "\x14\x0B\x02\xBC\xBF\x05\x1C\x0F\x02\xBD\xBF\x07", "I\x02\x02\xBE\xB6\x03\x02\x02\x02\xBE\xB7\x03", "\x02\x02\x02\xBE\xB8\x03\x02\x02\x02\xBE\xBB\x03", "\x02\x02\x02\xBE\xBC\x03\x02\x02\x02\xBE\xBD\x03", "\x02\x02\x02\xBF\x07\x03\x02\x02\x02\xC0\xC1\x05", "\x9CO\x02\xC1\xC2\x05&\x14\x02\xC2\xC3\x07I\x02", "\x02\xC3\t\x03\x02\x02\x02\xC4\xC6\x05$\x13\x02", "\xC5\xC4\x03\x02\x02\x02\xC5\xC6\x03\x02\x02\x02", "\xC6\xC7\x03\x02\x02\x02\xC7\xC8\x05\b\x05\x02", "\xC8\x0B\x03\x02\x02\x02\xC9\xCB\x05\x1A\x0E\x02", "\xCA\xC9\x03\x02\x02\x02\xCA\xCB\x03\x02\x02\x02", "\xCB\xCC\x03\x02\x02\x02\xCC\xCD\x05\x9EP\x02", "\xCD\xCE\x05\xA0Q\x02\xCE\xD1\x07R\x02\x02\xCF", "\xD2\x05\x0E\b\x02\xD0\xD2\x05\x12\n\x02\xD1\xCF", "\x03\x02\x02\x02\xD1\xD0\x03\x02\x02\x02\xD1\xD2", "\x03\x02\x02\x02\xD2\xD3\x03\x02\x02\x02\xD3\xD4", "\x07S\x02\x02\xD4\r\x03\x02\x02\x02\xD5\xDA\x05", "\x10\t\x02\xD6\xD7\x07J\x02\x02\xD7\xD9\x05\x10", "\t\x02\xD8\xD6\x03\x02\x02\x02\xD9\xDC\x03\x02", "\x02\x02\xDA\xD8\x03\x02\x02\x02\xDA\xDB\x03\x02", "\x02\x02\xDB\xDE\x03\x02\x02\x02\xDC\xDA\x03\x02", "\x02\x02\xDD\xDF\x07%\x02\x02\xDE\xDD\x03\x02", "\x02\x02\xDE\xDF\x03\x02\x02\x02\xDF\x0F\x03\x02", "\x02\x02\xE0\xE2\x05\x9CO\x02\xE1\xE3\x05*\x16", "\x02\xE2\xE1\x03\x02\x02\x02\xE2\xE3\x03\x02\x02", "\x02\xE3\xE4\x03\x02\x02\x02\xE4\xE5\x05\xA0Q", "\x02\xE5\x11\x03\x02\x02\x02\xE6\xEB\x05\x9CO", "\x02\xE7\xE8\x07J\x02\x02\xE8\xEA\x05\x12\n\x02", "\xE9\xE7\x03\x02\x02\x02\xEA\xED\x03\x02\x02\x02", "\xEB\xE9\x03\x02\x02\x02\xEB\xEC\x03\x02\x02\x02", "\xEC\x13\x03\x02\x02\x02\xED\xEB\x03\x02\x02\x02", "\xEE\xEF\x05\f\x07\x02\xEF\xF0\x05l7\x02\xF0\x15", "\x03\x02\x02\x02\xF1\xF2\t\x02\x02\x02\xF2\x17", "\x03\x02\x02\x02\xF3\xF4\t\x03\x02\x02\xF4\x19", "\x03\x02\x02\x02\xF5\xF7\x05\x16\f\x02\xF6\xF5", "\x03\x02\x02\x02\xF6\xF7\x03\x02\x02\x02\xF7\xF9", "\x03\x02\x02\x02\xF8\xFA\x05\x18\r\x02\xF9\xF8", "\x03\x02\x02\x02\xFA\xFB\x03\x02\x02\x02\xFB\xF9", "\x03\x02\x02\x02\xFB\xFC\x03\x02\x02\x02\xFC\u0105", "\x03\x02\x02\x02\xFD\xFF\x05\x18\r\x02\xFE\xFD", "\x03\x02\x02\x02\xFF\u0102\x03\x02\x02\x02\u0100\xFE", "\x03\x02\x02\x02\u0100\u0101\x03\x02\x02\x02\u0101\u0103", "\x03\x02\x02\x02\u0102\u0100\x03\x02\x02\x02\u0103\u0105", "\x05\x16\f\x02\u0104\xF6\x03\x02\x02\x02\u0104\u0100", "\x03\x02\x02\x02\u0105\x1B\x03\x02\x02\x02\u0106\u0107", "\x05\x1E\x10\x02\u0107\u0109\x07N\x02\x02\u0108\u010A", "\x05 \x11\x02\u0109\u0108\x03\x02\x02\x02\u0109\u010A", "\x03\x02\x02\x02\u010A\u010B\x03\x02\x02\x02\u010B\u010C", "\x07O\x02\x02\u010C\x1D\x03\x02\x02\x02\u010D\u010E", "\x07\x14\x02\x02\u010E\u010F\x05\xA0Q\x02\u010F\x1F", "\x03\x02\x02\x02\u0110\u0112\x05\b\x05\x02\u0111\u0110", "\x03\x02\x02\x02\u0112\u0113\x03\x02\x02\x02\u0113\u0111", "\x03\x02\x02\x02\u0113\u0114\x03\x02\x02\x02\u0114!", "\x03\x02\x02\x02\u0115\u0116\x07V\x02\x02\u0116\u0117", "\x07H\x02\x02\u0117\u0118\x05@!\x02\u0118#\x03\x02\x02", "\x02\u0119\u011B\x07\x07\x02\x02\u011A\u0119\x03\x02\x02", "\x02\u011A\u011B\x03\x02\x02\x02\u011B\u011C\x03\x02\x02", "\x02\u011C\u0122\x05\x16\f\x02\u011D\u011F\x05\x16\f\x02", "\u011E\u011D\x03\x02\x02\x02\u011E\u011F\x03\x02\x02\x02", "\u011F\u0120\x03\x02\x02\x02\u0120\u0122\x07\x07\x02\x02", "\u0121\u011A\x03\x02\x02\x02\u0121\u011E\x03\x02\x02\x02", "\u0122%\x03\x02\x02\x02\u0123\u0128\x05(\x15\x02\u0124", "\u0125\x07J\x02\x02\u0125\u0127\x05(\x15\x02\u0126\u0124", "\x03\x02\x02\x02\u0127\u012A\x03\x02\x02\x02\u0128\u0126", "\x03\x02\x02\x02\u0128\u0129\x03\x02\x02\x02\u0129'", "\x03\x02\x02\x02\u012A\u0128\x03\x02\x02\x02\u012B\u012D", "\x05*\x16\x02\u012C\u012B\x03\x02\x02\x02\u012C\u012D", "\x03\x02\x02\x02\u012D\u012E\x03\x02\x02\x02\u012E\u0137", "\x05\xA0Q\x02\u012F\u0131\x05*\x16\x02\u0130\u012F\x03", "\x02\x02\x02\u0130\u0131\x03\x02\x02\x02\u0131\u0132\x03", "\x02\x02\x02\u0132\u0133\x05\xA0Q\x02\u0133\u0134\x07", ">\x02\x02\u0134\u0135\x05@!\x02\u0135\u0137\x03\x02\x02", "\x02\u0136\u012C\x03\x02\x02\x02\u0136\u0130\x03\x02\x02", "\x02\u0137)\x03\x02\x02\x02\u0138\u0139\t\x04\x02\x02", "\u0139+\x03\x02\x02\x02\u013A\u013B\t\x05\x02\x02\u013B", "-\x03\x02\x02\x02\u013C\u013D\t\x06\x02\x02\u013D/\x03", "\x02\x02\x02\u013E\u013F\t\x07\x02\x02\u013F1\x03\x02", "\x02\x02\u0140\u0141\t\b\x02\x02\u01413\x03\x02\x02\x02", "\u0142\u0143\x058\x1D\x02\u0143\u0144\x05\x94K\x02\u0144", "\u0145\x05:\x1E\x02\u01455\x03\x02\x02\x02\u0146\u0147", "\x07\x0B\x02\x02\u0147\u0149\x07R\x02\x02\u0148\u014A", "\x05\x0E\b\x02\u0149\u0148\x03\x02\x02\x02\u0149\u014A", "\x03\x02\x02\x02\u014A\u014B\x03\x02\x02\x02\u014B\u014C", "\x07S\x02\x02\u014C\u014D\x05l7\x02\u014D7\x03\x02\x02", "\x02\u014E\u014F\x07R\x02\x02\u014F\u0150\x07H\x02\x02", "\u01509\x03\x02\x02\x02\u0151\u0152\x07H\x02\x02\u0152", "\u0153\x07S\x02\x02\u0153;\x03\x02\x02\x02\u0154\u0155", "\x07U\x02\x02\u0155\u015C\x07`\x02\x02\u0156\u0157\x07", "U\x02\x02\u0157\u0158\x07R\x02\x02\u0158\u0159\x05@!\x02", "\u0159\u015A\x07S\x02\x02\u015A\u015C\x03\x02\x02\x02", "\u015B\u0154\x03\x02\x02\x02\u015B\u0156\x03\x02\x02\x02", "\u015C=\x03\x02\x02\x02\u015D\u015E\x07R\x02\x02\u015E", "\u0160\x05\x9CO\x02\u015F\u0161\x05*\x16\x02\u0160\u015F", "\x03\x02\x02\x02\u0160\u0161\x03\x02\x02\x02\u0161\u0162", "\x03\x02\x02\x02\u0162\u0163\x07S\x02\x02\u0163\u0164", "\x05@!\x02\u0164?\x03\x02\x02\x02\u0165\u0166\b!\x01\x02", "\u0166\u0167\x07R\x02\x02\u0167\u0168\x05@!\x02\u0168\u0169", "\x07S\x02\x02\u0169\u0180\x03\x02\x02\x02\u016A\u0180", "\x05P)\x02\u016B\u0180\x05\xA0Q\x02\u016C\u0180\x05\x92", "J\x02\u016D\u0180\x054\x1B\x02\u016E\u0180\x056\x1C\x02", "\u016F\u0180\x05R*\x02\u0170\u0180\x05`1\x02\u0171\u0180\x05", "B\"\x02\u0172\u0180\x05D#\x02\u0173\u0174\t\t\x02\x02\u0174", "\u0180\x05@!\x0B\u0175\u0180\x05N(\x02\u0176\u0180\x05L'", "\x02\u0177\u0180\x05> \x02\u0178\u0180\x05<\x1F\x02\u0179", "\u017B\x07b\x02\x02\u017A\u017C\x07b\x02\x02\u017B\u017A", "\x03\x02\x02\x02\u017C\u017D\x03\x02\x02\x02\u017D\u017B", "\x03\x02\x02\x02\u017D\u017E\x03\x02\x02\x02\u017E\u0180", "\x03\x02\x02\x02\u017F\u0165\x03\x02\x02\x02\u017F\u016A", "\x03\x02\x02\x02\u017F\u016B\x03\x02\x02\x02\u017F\u016C", "\x03\x02\x02\x02\u017F\u016D\x03\x02\x02\x02\u017F\u016E", "\x03\x02\x02\x02\u017F\u016F\x03\x02\x02\x02\u017F\u0170", "\x03\x02\x02\x02\u017F\u0171\x03\x02\x02\x02\u017F\u0172", "\x03\x02\x02\x02\u017F\u0173\x03\x02\x02\x02\u017F\u0175", "\x03\x02\x02\x02\u017F\u0176\x03\x02\x02\x02\u017F\u0177", "\x03\x02\x02\x02\u017F\u0178\x03\x02\x02\x02\u017F\u0179", "\x03\x02\x02\x02\u0180\u0199\x03\x02\x02\x02\u0181\u0182", "\f\x07\x02\x02\u0182\u0183\x05H%\x02\u0183\u0184\x05@!\b", "\u0184\u0198\x03\x02\x02\x02\u0185\u0186\f\x06\x02\x02", "\u0186\u0187\x07K\x02\x02\u0187\u0188\x05@!\x02\u0188\u0189", "\x07H\x02\x02\u0189\u018A\x05@!\x07\u018A\u0198\x03\x02", "\x02\x02\u018B\u018C\f\x0F\x02\x02\u018C\u0198\t\t\x02\x02", "\u018D\u018E\f\x0E\x02\x02\u018E\u0198\x05f4\x02\u018F\u0190", "\f\r\x02\x02\u0190\u0191\x07:\x02\x02\u0191\u0198\x05\x92", "J\x02\u0192\u0193\f\f\x02\x02\u0193\u0194\x07:\x02\x02\u0194", "\u0198\x05\xA0Q\x02\u0195\u0196\f\x04\x02\x02\u0196\u0198", "\x07%\x02\x02\u0197\u0181\x03\x02\x02\x02\u0197\u0185", "\x03\x02\x02\x02\u0197\u018B\x03\x02\x02\x02\u0197\u018D", "\x03\x02\x02\x02\u0197\u018F\x03\x02\x02\x02\u0197\u0192", "\x03\x02\x02\x02\u0197\u0195\x03\x02\x02\x02\u0198\u019B", "\x03\x02\x02\x02\u0199\u0197\x03\x02\x02\x02\u0199\u019A", "\x03\x02\x02\x02\u019AA\x03\x02\x02\x02\u019B\u0199", "\x03\x02\x02\x02\u019C\u019D\x07\x13\x02\x02\u019D\u019E", "\x07R\x02\x02\u019E\u019F\x05@!\x02\u019F\u01A0\x07S\x02", "\x02\u01A0C\x03\x02\x02\x02\u01A1\u01A2\x07#\x02\x02", "\u01A2\u01A3\x07R\x02\x02\u01A3\u01A6\x05F$\x02\u01A4\u01A5", "\x07J\x02\x02\u01A5\u01A7\x05\x94K\x02\u01A6\u01A4\x03", "\x02\x02\x02\u01A6\u01A7\x03\x02\x02\x02\u01A7\u01A8\x03", "\x02\x02\x02\u01A8\u01A9\x07S\x02\x02\u01A9E\x03\x02", "\x02\x02\u01AA\u01AD\x05@!\x02\u01AB\u01AD\x05\x1E\x10", "\x02\u01AC\u01AA\x03\x02\x02\x02\u01AC\u01AB\x03\x02\x02", "\x02\u01ADG\x03\x02\x02\x02\u01AE\u01B4\x052\x1A\x02", "\u01AF\u01B4\x05,\x17\x02\u01B0\u01B4\x050\x19\x02\u01B1", "\u01B4\x05.\x18\x02\u01B2\u01B4\x05J&\x02\u01B3\u01AE\x03", "\x02\x02\x02\u01B3\u01AF\x03\x02\x02\x02\u01B3\u01B0\x03", "\x02\x02\x02\u01B3\u01B1\x03\x02\x02\x02\u01B3\u01B2\x03", "\x02\x02\x02\u01B4I\x03\x02\x02\x02\u01B5\u01BB\x07", ">\x02\x02\u01B6\u01BB\t\n\x02\x02\u01B7\u01BB\t\x0B\x02", "\x02\u01B8\u01BB\t\f\x02\x02\u01B9\u01BB\t\r\x02\x02\u01BA", "\u01B5\x03\x02\x02\x02\u01BA\u01B6\x03\x02\x02\x02\u01BA", "\u01B7\x03\x02\x02\x02\u01BA\u01B8\x03\x02\x02\x02\u01BA", "\u01B9\x03\x02\x02\x02\u01BBK\x03\x02\x02\x02\u01BC", "\u01BD\x07E\x02\x02\u01BD\u01BE\x05@!\x02\u01BEM\x03\x02", "\x02\x02\u01BF\u01C0\x07?\x02\x02\u01C0\u01C4\x05@!\x02", "\u01C1\u01C2\x07@\x02\x02\u01C2\u01C4\x05@!\x02\u01C3\u01BF", "\x03\x02\x02\x02\u01C3\u01C1\x03\x02\x02\x02\u01C4O", "\x03\x02\x02\x02\u01C5\u01C6\t\x0E\x02\x02\u01C6Q\x03", "\x02\x02\x02\u01C7\u01C9\x05T+\x02\u01C8\u01CA\x05X-\x02", "\u01C9\u01C8\x03\x02\x02\x02\u01C9\u01CA\x03\x02\x02\x02", "\u01CA\u01CC\x03\x02\x02\x02\u01CB\u01CD\x07J\x02\x02", "\u01CC\u01CB\x03\x02\x02\x02\u01CC\u01CD\x03\x02\x02\x02", "\u01CD\u01CE\x03\x02\x02\x02\u01CE\u01CF\x05V,\x02\u01CF", "S\x03\x02\x02\x02\u01D0\u01D1\x07R\x02\x02\u01D1\u01D2", "\x07P\x02\x02\u01D2U\x03\x02\x02\x02\u01D3\u01D4\x07", "Q\x02\x02\u01D4\u01D5\x07S\x02\x02\u01D5W\x03\x02\x02", "\x02\u01D6\u01DB\x05Z.\x02\u01D7\u01D8\x07J\x02\x02\u01D8", "\u01DA\x05Z.\x02\u01D9\u01D7\x03\x02\x02\x02\u01DA\u01DD", "\x03\x02\x02\x02\u01DB\u01D9\x03\x02\x02\x02\u01DB\u01DC", "\x03\x02\x02\x02\u01DCY\x03\x02\x02\x02\u01DD\u01DB", "\x03\x02\x02\x02\u01DE\u01DF\x05\\/\x02\u01DF\u01E0\x07", "H\x02\x02\u01E0\u01E1\x05^0\x02\u01E1[\x03\x02\x02\x02", "\u01E2\u01E3\x05@!\x02\u01E3]\x03\x02\x02\x02\u01E4\u01E5", "\x05@!\x02\u01E5_\x03\x02\x02\x02\u01E6\u01E8\x05b2\x02", "\u01E7\u01E9\x05\x94K\x02\u01E8\u01E7\x03\x02\x02\x02", "\u01E8\u01E9\x03\x02\x02\x02\u01E9\u01EB\x03\x02\x02\x02", "\u01EA\u01EC\x07J\x02\x02\u01EB\u01EA\x03\x02\x02\x02", "\u01EB\u01EC\x03\x02\x02\x02\u01EC\u01ED\x03\x02\x02\x02", "\u01ED\u01EE\x05d3\x02\u01EEa\x03\x02\x02\x02\u01EF\u01F0", "\x07R\x02\x02\u01F0\u01F1\x07N\x02\x02\u01F1c\x03\x02", "\x02\x02\u01F2\u01F3\x07O\x02\x02\u01F3\u01F4\x07S\x02", "\x02\u01F4e\x03\x02\x02\x02\u01F5\u01F6\x07P\x02\x02", "\u01F6\u01F7\x05j6\x02\u01F7\u01F8\x07Q\x02\x02\u01F8g\x03", "\x02\x02\x02\u01F9\u01FD\x05@!\x02\u01FA\u01FB\x07F\x02", "\x02\u01FB\u01FD\x05h5\x02\u01FC\u01F9\x03\x02\x02\x02", "\u01FC\u01FA\x03\x02\x02\x02\u01FDi\x03\x02\x02\x02", "\u01FE\u0207\x05h5\x02\u01FF\u0200\x07<\x02\x02\u0200\u0207", "\x05h5\x02\u0201\u0202\x05h5\x02\u0202\u0204\x07<\x02\x02", "\u0203\u0205\x05h5\x02\u0204\u0203\x03\x02\x02\x02\u0204", "\u0205\x03\x02\x02\x02\u0205\u0207\x03\x02\x02\x02\u0206", "\u01FE\x03\x02\x02\x02\u0206\u01FF\x03\x02\x02\x02\u0206", "\u0201\x03\x02\x02\x02\u0207k\x03\x02\x02\x02\u0208", "\u020C\x07N\x02\x02\u0209\u020B\x05n8\x02\u020A\u0209\x03", "\x02\x02\x02\u020B\u020E\x03\x02\x02\x02\u020C\u020A\x03", "\x02\x02\x02\u020C\u020D\x03\x02\x02\x02\u020D\u020F\x03", "\x02\x02\x02\u020E\u020C\x03\x02\x02\x02\u020F\u0210\x07", "O\x02\x02\u0210m\x03\x02\x02\x02\u0211\u021D\x05\b\x05", "\x02\u0212\u0213\x05@!\x02\u0213\u0214\x07I\x02\x02\u0214", "\u021D\x03\x02\x02\x02\u0215\u021D\x05\xA2R\x02\u0216", "\u021D\x05\xA4S\x02\u0217\u021D\x05v<\x02\u0218\u021D\x05", "p9\x02\u0219\u021D\x05r:\x02\u021A\u021D\x05\x90I\x02\u021B", "\u021D\x07I\x02\x02\u021C\u0211\x03\x02\x02\x02\u021C", "\u0212\x03\x02\x02\x02\u021C\u0215\x03\x02\x02\x02\u021C", "\u0216\x03\x02\x02\x02\u021C\u0217\x03\x02\x02\x02\u021C", "\u0218\x03\x02\x02\x02\u021C\u0219\x03\x02\x02\x02\u021C", "\u021A\x03\x02\x02\x02\u021C\u021B\x03\x02\x02\x02\u021D", "o\x03\x02\x02\x02\u021E\u021F\x07\x12\x02\x02\u021F", "\u0220\x07I\x02\x02\u0220q\x03\x02\x02\x02\u0221\u0222", "\x07\x15\x02\x02\u0222\u0223\x07I\x02\x02\u0223s\x03", "\x02\x02\x02\u0224\u0227\x05n8\x02\u0225\u0227\x05l7\x02", "\u0226\u0224\x03\x02\x02\x02\u0226\u0225\x03\x02\x02\x02", "\u0227u\x03\x02\x02\x02\u0228\u022D\x05z>\x02\u0229\u022D", "\x05|?\x02\u022A\u022D\x05\x80A\x02\u022B\u022D\x05\x8A", "F\x02\u022C\u0228\x03\x02\x02\x02\u022C\u0229\x03\x02", "\x02\x02\u022C\u022A\x03\x02\x02\x02\u022C\u022B\x03\x02", "\x02\x02\u022Dw\x03\x02\x02\x02\u022E\u022F\x07 \x02", "\x02\u022F\u0230\x07R\x02\x02\u0230\u0231\x05@!\x02\u0231", "\u0232\x07S\x02\x02\u0232y\x03\x02\x02\x02\u0233\u0234", "\x07!\x02\x02\u0234\u0235\x05t;\x02\u0235\u0236\x05x=\x02", "\u0236{\x03\x02\x02\x02\u0237\u0238\x05x=\x02\u0238\u0239", "\x05t;\x02\u0239}\x03\x02\x02\x02\u023A\u023B\x07\x1B", "\x02\x02\u023B\u023D\x07R\x02\x02\u023C\u023E\x05\x82", "B\x02\u023D\u023C\x03\x02\x02\x02\u023D\u023E\x03\x02", "\x02\x02\u023E\u023F\x03\x02\x02\x02\u023F\u0241\x07I", "\x02\x02\u0240\u0242\x05\x86D\x02\u0241\u0240\x03\x02", "\x02\x02\u0241\u0242\x03\x02\x02\x02\u0242\u0243\x03\x02", "\x02\x02\u0243\u0245\x07I\x02\x02\u0244\u0246\x05\x88", "E\x02\u0245\u0244\x03\x02\x02\x02\u0245\u0246\x03\x02", "\x02\x02\u0246\u0247\x03\x02\x02\x02\u0247\u0248\x07S", "\x02\x02\u0248\x7F\x03\x02\x02\x02\u0249\u024A\x05~", "@\x02\u024A\u024B\x05t;\x02\u024B\x81\x03\x02\x02\x02", "\u024C\u0252\x05\x84C\x02\u024D\u024E\x05\x84C\x02\u024E", "\u024F\x07J\x02\x02\u024F\u0250\x05\x82B\x02\u0250\u0252", "\x03\x02\x02\x02\u0251\u024C\x03\x02\x02\x02\u0251\u024D", "\x03\x02\x02\x02\u0252\x83\x03\x02\x02\x02\u0253\u0255", "\x05\x9CO\x02\u0254\u0253\x03\x02\x02\x02\u0254\u0255", "\x03\x02\x02\x02\u0255\u0256\x03\x02\x02\x02\u0256\u0257", "\x05(\x15\x02\u0257\x85\x03\x02\x02\x02\u0258\u0259", "\x05\x94K\x02\u0259\x87\x03\x02\x02\x02\u025A\u025B", "\x05\x94K\x02\u025B\x89\x03\x02\x02\x02\u025C\u025D", "\x05\x8CG\x02\u025D\u025E\x05t;\x02\u025E\x8B\x03\x02", "\x02\x02\u025F\u0260\x07\x1C\x02\x02\u0260\u0261\x07R", "\x02\x02\u0261\u0262\x05\x8EH\x02\u0262\u0263\x07\x1D", "\x02\x02\u0263\u0264\x05@!\x02\u0264\u0265\x07S\x02\x02", "\u0265\x8D\x03\x02\x02\x02\u0266\u026B\x05\x84C\x02", "\u0267\u0268\x07J\x02\x02\u0268\u026A\x05\x84C\x02\u0269", "\u0267\x03\x02\x02\x02\u026A\u026D\x03\x02\x02\x02\u026B", "\u0269\x03\x02\x02\x02\u026B\u026C\x03\x02\x02\x02\u026C", "\x8F\x03\x02\x02\x02\u026D\u026B\x03\x02\x02\x02\u026E", "\u026F\x07\x1A\x02\x02\u026F\u0275\x07I\x02\x02\u0270", "\u0271\x07\x1A\x02\x02\u0271\u0272\x05\x94K\x02\u0272", "\u0273\x07I\x02\x02\u0273\u0275\x03\x02\x02\x02\u0274", "\u026E\x03\x02\x02\x02\u0274\u0270\x03\x02\x02\x02\u0275", "\x91\x03\x02\x02\x02\u0276\u0277\x05\x96L\x02\u0277", "\u0279\x07R\x02\x02\u0278\u027A\x05\x94K\x02\u0279\u0278", "\x03\x02\x02\x02\u0279\u027A\x03\x02\x02\x02\u027A\u027B", "\x03\x02\x02\x02\u027B\u027C\x07S\x02\x02\u027C\u028A", "\x03\x02\x02\x02\u027D\u027E\x07;\x02\x02\u027E\u028A", "\x05\x92J\x02\u027F\u0280\x05\xA0Q\x02\u0280\u0281\x07", ";\x02\x02\u0281\u0282\x05\x92J\x02\u0282\u028A\x03\x02", "\x02\x02\u0283\u0284\x07\x16\x02\x02\u0284\u0285\x07;", "\x02\x02\u0285\u028A\x05\x92J\x02\u0286\u0287\x07\x0F", "\x02\x02\u0287\u0288\x07;\x02\x02\u0288\u028A\x05\x92", "J\x02\u0289\u0276\x03\x02\x02\x02\u0289\u027D\x03\x02", "\x02\x02\u0289\u027F\x03\x02\x02\x02\u0289\u0283\x03\x02", "\x02\x02\u0289\u0286\x03\x02\x02\x02\u028A\x93\x03\x02", "\x02\x02\u028B\u0290\x05@!\x02\u028C\u028D\x07J\x02\x02", "\u028D\u028F\x05@!\x02\u028E\u028C\x03\x02\x02\x02\u028F", "\u0292\x03\x02\x02\x02\u0290\u028E\x03\x02\x02\x02\u0290", "\u0291\x03\x02\x02\x02\u0291\x95\x03\x02\x02\x02\u0292", "\u0290\x03\x02\x02\x02\u0293\u029A\x05\xA0Q\x02\u0294", "\u0295\x07R\x02\x02\u0295\u0296\x07T\x02\x02\u0296\u0297", "\x05@!\x02\u0297\u0298\x07S\x02\x02\u0298\u029A\x03\x02", "\x02\x02\u0299\u0293\x03\x02\x02\x02\u0299\u0294\x03\x02", "\x02\x02\u029A\x97\x03\x02\x02\x02\u029B\u029D\x05\x16", "\f\x02\u029C\u029B\x03\x02\x02\x02\u029C\u029D\x03\x02", "\x02\x02\u029D\u029E\x03\x02\x02\x02\u029E\u029F\x07\x19", "\x02\x02\u029F\u02A0\x05\x9AN\x02\u02A0\u02A1\x07I\x02", "\x02\u02A1\u02AA\x03\x02\x02\x02\u02A2\u02A4\x05\x16\f", "\x02\u02A3\u02A2\x03\x02\x02\x02\u02A3\u02A4\x03\x02\x02", "\x02\u02A4\u02A5\x03\x02\x02\x02\u02A5\u02A6\x07\x19\x02", "\x02\u02A6\u02A7\x05\xA0Q\x02\u02A7\u02A8\x07I\x02\x02", "\u02A8\u02AA\x03\x02\x02\x02\u02A9\u029C\x03\x02\x02\x02", "\u02A9\u02A3\x03\x02\x02\x02\u02AA\x99\x03\x02\x02\x02", "\u02AB\u02AD\x07b\x02\x02\u02AC\u02AE\x07?\x02\x02\u02AD", "\u02AC\x03\x02\x02\x02\u02AD\u02AE\x03\x02\x02\x02\u02AE", "\u02AF\x03\x02\x02\x02\u02AF\u02B8\x05@!\x02\u02B0\u02B2", "\x05@!\x02\u02B1\u02B3\x07?\x02\x02\u02B2\u02B1\x03\x02", "\x02\x02\u02B2\u02B3\x03\x02\x02\x02\u02B3\u02B4\x03\x02", "\x02\x02\u02B4\u02B5\x07b\x02\x02\u02B5\u02B8\x03\x02", "\x02\x02\u02B6\u02B8\x07b\x02\x02\u02B7\u02AB\x03\x02", "\x02\x02\u02B7\u02B0\x03\x02\x02\x02\u02B7\u02B6\x03\x02", "\x02\x02\u02B8\x9B\x03\x02\x02\x02\u02B9\u02C4\x07\n", "\x02\x02\u02BA\u02C4\x07\x0B\x02\x02\u02BB\u02C4\x07\f", "\x02\x02\u02BC\u02C4\x07\r\x02\x02\u02BD\u02C4\x07\x0E", "\x02\x02\u02BE\u02C4\x07\x0F\x02\x02\u02BF\u02C4\x07\x10", "\x02\x02\u02C0\u02C4\x07\t\x02\x02\u02C1\u02C4\x05\x1E", "\x10\x02\u02C2\u02C4\x05*\x16\x02\u02C3\u02B9\x03\x02", "\x02\x02\u02C3\u02BA\x03\x02\x02\x02\u02C3\u02BB\x03\x02", "\x02\x02\u02C3\u02BC\x03\x02\x02\x02\u02C3\u02BD\x03\x02", "\x02\x02\u02C3\u02BE\x03\x02\x02\x02\u02C3\u02BF\x03\x02", "\x02\x02\u02C3\u02C0\x03\x02\x02\x02\u02C3\u02C1\x03\x02", "\x02\x02\u02C3\u02C2\x03\x02\x02\x02\u02C4\x9D\x03\x02", "\x02\x02\u02C5\u02C7\x05\x9CO\x02\u02C6\u02C8\x05*\x16", "\x02\u02C7\u02C6\x03\x02\x02\x02\u02C7\u02C8\x03\x02\x02", "\x02\u02C8\u02CB\x03\x02\x02\x02\u02C9\u02CB\x07\x11\x02", "\x02\u02CA\u02C5\x03\x02\x02\x02\u02CA\u02C9\x03\x02\x02", "\x02\u02CB\x9F\x03\x02\x02\x02\u02CC\u02CD\x07V\x02", "\x02\u02CD\xA1\x03\x02\x02\x02\u02CE\u02CF\x07\x18\x02", "\x02\u02CF\u02D0\x07R\x02\x02\u02D0\u02D1\x05@!\x02\u02D1", "\u02D2\x07S\x02\x02\u02D2\u02D5\x05t;\x02\u02D3\u02D4\x07", "\x17\x02\x02\u02D4\u02D6\x05t;\x02\u02D5\u02D3\x03\x02", "\x02\x02\u02D5\u02D6\x03\x02\x02\x02\u02D6\xA3\x03\x02", "\x02\x02\u02D7\u02D8\x07\x1E\x02\x02\u02D8\u02D9\x07R", "\x02\x02\u02D9\u02DA\x05@!\x02\u02DA\u02DB\x07S\x02\x02", "\u02DB\u02DF\x07N\x02\x02\u02DC\u02DE\x05\xA8U\x02\u02DD", "\u02DC\x03\x02\x02\x02\u02DE\u02E1\x03\x02\x02\x02\u02DF", "\u02DD\x03\x02\x02\x02\u02DF\u02E0\x03\x02\x02\x02\u02E0", "\u02E3\x03\x02\x02\x02\u02E1\u02DF\x03\x02\x02\x02\u02E2", "\u02E4\x05\xAAV\x02\u02E3\u02E2\x03\x02\x02\x02\u02E3", "\u02E4\x03\x02\x02\x02\u02E4\u02E5\x03\x02\x02\x02\u02E5", "\u02E6\x07O\x02\x02\u02E6\xA5\x03\x02\x02\x02\u02E7", "\u02EB\x05P)\x02\u02E8\u02EB\x05\xA0Q\x02\u02E9\u02EB\x05", "\x9AN\x02\u02EA\u02E7\x03\x02\x02\x02\u02EA\u02E8\x03", "\x02\x02\x02\u02EA\u02E9\x03\x02\x02\x02\u02EB\xA7\x03", "\x02\x02\x02\u02EC\u02ED\x07\x1F\x02\x02\u02ED\u02EE\x05", "\xA6T\x02\u02EE\u02F2\x07H\x02\x02\u02EF\u02F1\x05n8\x02", "\u02F0\u02EF\x03\x02\x02\x02\u02F1\u02F4\x03\x02\x02\x02", "\u02F2\u02F0\x03\x02\x02\x02\u02F2\u02F3\x03\x02\x02\x02", "\u02F3\u02F6\x03\x02\x02\x02\u02F4\u02F2\x03\x02\x02\x02", "\u02F5\u02F7\x05p9\x02\u02F6\u02F5\x03\x02\x02\x02\u02F6", "\u02F7\x03\x02\x02\x02\u02F7\xA9\x03\x02\x02\x02\u02F8", "\u02F9\x07\"\x02\x02\u02F9\u02FD\x07H\x02\x02\u02FA\u02FC", "\x05n8\x02\u02FB\u02FA\x03\x02\x02\x02\u02FC\u02FF\x03", "\x02\x02\x02\u02FD\u02FB\x03\x02\x02\x02\u02FD\u02FE\x03", "\x02\x02\x02\u02FE\u0301\x03\x02\x02\x02\u02FF\u02FD\x03", "\x02\x02\x02\u0300\u0302\x05p9\x02\u0301\u0300\x03\x02", "\x02\x02\u0301\u0302\x03\x02\x02\x02\u0302\xAB\x03\x02", "\x02\x02M\xAD\xB4\xBE\xC5\xCA\xD1\xDA\xDE\xE2", "\xEB\xF6\xFB\u0100\u0104\u0109\u0113\u011A\u011E\u0121\u0128\u012C", "\u0130\u0136\u0149\u015B\u0160\u017D\u017F\u0197\u0199\u01A6\u01AC\u01B3", "\u01BA\u01C3\u01C9\u01CC\u01DB\u01E8\u01EB\u01FC\u0204\u0206\u020C\u021C", "\u0226\u022C\u023D\u0241\u0245\u0251\u0254\u026B\u0274\u0279\u0289\u0290", "\u0299\u029C\u02A3\u02A9\u02AD\u02B2\u02B7\u02C3\u02C7\u02CA\u02D5\u02DF", "\u02E3\u02EA\u02F2\u02F6\u02FD\u0301"].join("");
var atn = new _antlr["default"].atn.ATNDeserializer().deserialize(serializedATN);
var decisionsToDFA = atn.decisionToState.map(function (ds, index) {
  return new _antlr["default"].dfa.DFA(ds, index);
});
var sharedContextCache = new _antlr["default"].PredictionContextCache();

var LPCParser = /*#__PURE__*/function (_antlr4$Parser) {
  _inherits(LPCParser, _antlr4$Parser);

  var _super = _createSuper(LPCParser);

  function LPCParser(input) {
    var _this;

    _classCallCheck(this, LPCParser);

    _this = _super.call(this, input);
    _this._interp = new _antlr["default"].atn.ParserATNSimulator(_assertThisInitialized(_this), atn, decisionsToDFA, sharedContextCache);
    _this.ruleNames = LPCParser.ruleNames;
    _this.literalNames = LPCParser.literalNames;
    _this.symbolicNames = LPCParser.symbolicNames;
    return _this;
  }

  _createClass(LPCParser, [{
    key: "atn",
    get: function get() {
      return atn;
    }
  }, {
    key: "sempred",
    value: function sempred(localctx, ruleIndex, predIndex) {
      switch (ruleIndex) {
        case 31:
          return this.expression_sempred(localctx, predIndex);

        default:
          throw "No predicate with index:" + ruleIndex;
      }
    }
  }, {
    key: "expression_sempred",
    value: function expression_sempred(localctx, predIndex) {
      switch (predIndex) {
        case 0:
          return this.precpred(this._ctx, 5);

        case 1:
          return this.precpred(this._ctx, 4);

        case 2:
          return this.precpred(this._ctx, 13);

        case 3:
          return this.precpred(this._ctx, 12);

        case 4:
          return this.precpred(this._ctx, 11);

        case 5:
          return this.precpred(this._ctx, 10);

        case 6:
          return this.precpred(this._ctx, 2);

        default:
          throw "No predicate with index:" + predIndex;
      }
    }
  }, {
    key: "lpcProgram",
    value: function lpcProgram() {
      var localctx = new LpcProgramContext(this, this._ctx, this.state);
      this.enterRule(localctx, 0, LPCParser.RULE_lpcProgram);
      var _la = 0; // Token type

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 171;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        if ((_la & ~0x1f) == 0 && (1 << _la & (1 << LPCParser.NoMask | 1 << LPCParser.Private | 1 << LPCParser.Protected | 1 << LPCParser.Public | 1 << LPCParser.Static | 1 << LPCParser.VarArgs | 1 << LPCParser.Buffer | 1 << LPCParser.Float | 1 << LPCParser.Function | 1 << LPCParser.Int | 1 << LPCParser.Mapping | 1 << LPCParser.Mixed | 1 << LPCParser.Object | 1 << LPCParser.String | 1 << LPCParser.Void | 1 << LPCParser.Class | 1 << LPCParser.Inherit)) !== 0 || _la === LPCParser.Array || _la === LPCParser.SemiColon || _la === LPCParser.Multiply) {
          this.state = 170;
          this.programDeclarations();
        }

        this.state = 173;
        this.match(LPCParser.EOF);
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "programDeclarations",
    value: function programDeclarations() {
      var localctx = new ProgramDeclarationsContext(this, this._ctx, this.state);
      this.enterRule(localctx, 2, LPCParser.RULE_programDeclarations);
      var _la = 0; // Token type

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 176;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        do {
          this.state = 175;
          this.programDeclaration();
          this.state = 178;

          this._errHandler.sync(this);

          _la = this._input.LA(1);
        } while ((_la & ~0x1f) == 0 && (1 << _la & (1 << LPCParser.NoMask | 1 << LPCParser.Private | 1 << LPCParser.Protected | 1 << LPCParser.Public | 1 << LPCParser.Static | 1 << LPCParser.VarArgs | 1 << LPCParser.Buffer | 1 << LPCParser.Float | 1 << LPCParser.Function | 1 << LPCParser.Int | 1 << LPCParser.Mapping | 1 << LPCParser.Mixed | 1 << LPCParser.Object | 1 << LPCParser.String | 1 << LPCParser.Void | 1 << LPCParser.Class | 1 << LPCParser.Inherit)) !== 0 || _la === LPCParser.Array || _la === LPCParser.SemiColon || _la === LPCParser.Multiply);
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "programDeclaration",
    value: function programDeclaration() {
      var localctx = new ProgramDeclarationContext(this, this._ctx, this.state);
      this.enterRule(localctx, 4, LPCParser.RULE_programDeclaration);

      try {
        this.state = 188;

        this._errHandler.sync(this);

        var la_ = this._interp.adaptivePredict(this._input, 2, this._ctx);

        switch (la_) {
          case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 180;
            this.programVariableDeclaration();
            break;

          case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 181;
            this.inheritanceDeclaration();
            break;

          case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 182;
            this.functionDeclaration();
            this.state = 183;
            this.match(LPCParser.SemiColon);
            break;

          case 4:
            this.enterOuterAlt(localctx, 4);
            this.state = 185;
            this.functionDefinition();
            break;

          case 5:
            this.enterOuterAlt(localctx, 5);
            this.state = 186;
            this.classDefinition();
            break;

          case 6:
            this.enterOuterAlt(localctx, 6);
            this.state = 187;
            this.match(LPCParser.SemiColon);
            break;
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "variableDeclaration",
    value: function variableDeclaration() {
      var localctx = new VariableDeclarationContext(this, this._ctx, this.state);
      this.enterRule(localctx, 6, LPCParser.RULE_variableDeclaration);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 190;
        this.dataType();
        this.state = 191;
        this.variableList();
        this.state = 192;
        this.match(LPCParser.SemiColon);
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "programVariableDeclaration",
    value: function programVariableDeclaration() {
      var localctx = new ProgramVariableDeclarationContext(this, this._ctx, this.state);
      this.enterRule(localctx, 8, LPCParser.RULE_programVariableDeclaration);
      var _la = 0; // Token type

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 195;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        if ((_la & ~0x1f) == 0 && (1 << _la & (1 << LPCParser.Private | 1 << LPCParser.Protected | 1 << LPCParser.Public | 1 << LPCParser.Static)) !== 0) {
          this.state = 194;
          this.variableModifier();
        }

        this.state = 197;
        this.variableDeclaration();
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "functionDeclaration",
    value: function functionDeclaration() {
      var localctx = new FunctionDeclarationContext(this, this._ctx, this.state);
      this.enterRule(localctx, 10, LPCParser.RULE_functionDeclaration);
      var _la = 0; // Token type

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 200;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        if ((_la & ~0x1f) == 0 && (1 << _la & (1 << LPCParser.NoMask | 1 << LPCParser.Private | 1 << LPCParser.Protected | 1 << LPCParser.Public | 1 << LPCParser.Static | 1 << LPCParser.VarArgs)) !== 0) {
          this.state = 199;
          this.functionModifier();
        }

        this.state = 202;
        this.functionReturnType();
        this.state = 203;
        this.identifier();
        this.state = 204;
        this.match(LPCParser.LeftParen);
        this.state = 207;

        this._errHandler.sync(this);

        var la_ = this._interp.adaptivePredict(this._input, 5, this._ctx);

        if (la_ === 1) {
          this.state = 205;
          this.argumentList();
        } else if (la_ === 2) {
          this.state = 206;
          this.dataTypeList();
        }

        this.state = 209;
        this.match(LPCParser.RightParen);
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "argumentList",
    value: function argumentList() {
      var localctx = new ArgumentListContext(this, this._ctx, this.state);
      this.enterRule(localctx, 12, LPCParser.RULE_argumentList);
      var _la = 0; // Token type

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 211;
        this.argument();
        this.state = 216;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        while (_la === LPCParser.Comma) {
          this.state = 212;
          this.match(LPCParser.Comma);
          this.state = 213;
          this.argument();
          this.state = 218;

          this._errHandler.sync(this);

          _la = this._input.LA(1);
        }

        this.state = 220;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        if (_la === LPCParser.Ellipsis) {
          this.state = 219;
          this.match(LPCParser.Ellipsis);
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "argument",
    value: function argument() {
      var localctx = new ArgumentContext(this, this._ctx, this.state);
      this.enterRule(localctx, 14, LPCParser.RULE_argument);
      var _la = 0; // Token type

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 222;
        this.dataType();
        this.state = 224;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        if (_la === LPCParser.Array || _la === LPCParser.Multiply) {
          this.state = 223;
          this.array();
        }

        this.state = 226;
        this.identifier();
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "dataTypeList",
    value: function dataTypeList() {
      var localctx = new DataTypeListContext(this, this._ctx, this.state);
      this.enterRule(localctx, 16, LPCParser.RULE_dataTypeList);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 228;
        this.dataType();
        this.state = 233;

        this._errHandler.sync(this);

        var _alt = this._interp.adaptivePredict(this._input, 9, this._ctx);

        while (_alt != 2 && _alt != _antlr["default"].atn.ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            this.state = 229;
            this.match(LPCParser.Comma);
            this.state = 230;
            this.dataTypeList();
          }

          this.state = 235;

          this._errHandler.sync(this);

          _alt = this._interp.adaptivePredict(this._input, 9, this._ctx);
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "functionDefinition",
    value: function functionDefinition() {
      var localctx = new FunctionDefinitionContext(this, this._ctx, this.state);
      this.enterRule(localctx, 18, LPCParser.RULE_functionDefinition);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 236;
        this.functionDeclaration();
        this.state = 237;
        this.block();
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "accessLevelModifier",
    value: function accessLevelModifier() {
      var localctx = new AccessLevelModifierContext(this, this._ctx, this.state);
      this.enterRule(localctx, 20, LPCParser.RULE_accessLevelModifier);
      var _la = 0; // Token type

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 239;
        _la = this._input.LA(1);

        if (!((_la & ~0x1f) == 0 && (1 << _la & (1 << LPCParser.Private | 1 << LPCParser.Protected | 1 << LPCParser.Public)) !== 0)) {
          this._errHandler.recoverInline(this);
        } else {
          this._errHandler.reportMatch(this);

          this.consume();
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "functionTypeModifier",
    value: function functionTypeModifier() {
      var localctx = new FunctionTypeModifierContext(this, this._ctx, this.state);
      this.enterRule(localctx, 22, LPCParser.RULE_functionTypeModifier);
      var _la = 0; // Token type

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 241;
        _la = this._input.LA(1);

        if (!((_la & ~0x1f) == 0 && (1 << _la & (1 << LPCParser.NoMask | 1 << LPCParser.Static | 1 << LPCParser.VarArgs)) !== 0)) {
          this._errHandler.recoverInline(this);
        } else {
          this._errHandler.reportMatch(this);

          this.consume();
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "functionModifier",
    value: function functionModifier() {
      var localctx = new FunctionModifierContext(this, this._ctx, this.state);
      this.enterRule(localctx, 24, LPCParser.RULE_functionModifier);
      var _la = 0; // Token type

      try {
        this.state = 258;

        this._errHandler.sync(this);

        var la_ = this._interp.adaptivePredict(this._input, 13, this._ctx);

        switch (la_) {
          case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 244;

            this._errHandler.sync(this);

            _la = this._input.LA(1);

            if ((_la & ~0x1f) == 0 && (1 << _la & (1 << LPCParser.Private | 1 << LPCParser.Protected | 1 << LPCParser.Public)) !== 0) {
              this.state = 243;
              this.accessLevelModifier();
            }

            this.state = 247;

            this._errHandler.sync(this);

            _la = this._input.LA(1);

            do {
              this.state = 246;
              this.functionTypeModifier();
              this.state = 249;

              this._errHandler.sync(this);

              _la = this._input.LA(1);
            } while ((_la & ~0x1f) == 0 && (1 << _la & (1 << LPCParser.NoMask | 1 << LPCParser.Static | 1 << LPCParser.VarArgs)) !== 0);

            break;

          case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 254;

            this._errHandler.sync(this);

            _la = this._input.LA(1);

            while ((_la & ~0x1f) == 0 && (1 << _la & (1 << LPCParser.NoMask | 1 << LPCParser.Static | 1 << LPCParser.VarArgs)) !== 0) {
              this.state = 251;
              this.functionTypeModifier();
              this.state = 256;

              this._errHandler.sync(this);

              _la = this._input.LA(1);
            }

            this.state = 257;
            this.accessLevelModifier();
            break;
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "classDefinition",
    value: function classDefinition() {
      var localctx = new ClassDefinitionContext(this, this._ctx, this.state);
      this.enterRule(localctx, 26, LPCParser.RULE_classDefinition);
      var _la = 0; // Token type

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 260;
        this.classIdentifier();
        this.state = 261;
        this.match(LPCParser.LeftBrace);
        this.state = 263;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        if ((_la - 7 & ~0x1f) == 0 && (1 << _la - 7 & (1 << LPCParser.Buffer - 7 | 1 << LPCParser.Float - 7 | 1 << LPCParser.Function - 7 | 1 << LPCParser.Int - 7 | 1 << LPCParser.Mapping - 7 | 1 << LPCParser.Mixed - 7 | 1 << LPCParser.Object - 7 | 1 << LPCParser.String - 7 | 1 << LPCParser.Class - 7 | 1 << LPCParser.Array - 7)) !== 0 || _la === LPCParser.Multiply) {
          this.state = 262;
          this.classMembers();
        }

        this.state = 265;
        this.match(LPCParser.RightBrace);
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "classIdentifier",
    value: function classIdentifier() {
      var localctx = new ClassIdentifierContext(this, this._ctx, this.state);
      this.enterRule(localctx, 28, LPCParser.RULE_classIdentifier);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 267;
        this.match(LPCParser.Class);
        this.state = 268;
        this.identifier();
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "classMembers",
    value: function classMembers() {
      var localctx = new ClassMembersContext(this, this._ctx, this.state);
      this.enterRule(localctx, 30, LPCParser.RULE_classMembers);
      var _la = 0; // Token type

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 271;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        do {
          this.state = 270;
          this.variableDeclaration();
          this.state = 273;

          this._errHandler.sync(this);

          _la = this._input.LA(1);
        } while ((_la - 7 & ~0x1f) == 0 && (1 << _la - 7 & (1 << LPCParser.Buffer - 7 | 1 << LPCParser.Float - 7 | 1 << LPCParser.Function - 7 | 1 << LPCParser.Int - 7 | 1 << LPCParser.Mapping - 7 | 1 << LPCParser.Mixed - 7 | 1 << LPCParser.Object - 7 | 1 << LPCParser.String - 7 | 1 << LPCParser.Class - 7 | 1 << LPCParser.Array - 7)) !== 0 || _la === LPCParser.Multiply);
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "classMemberInitializer",
    value: function classMemberInitializer() {
      var localctx = new ClassMemberInitializerContext(this, this._ctx, this.state);
      this.enterRule(localctx, 32, LPCParser.RULE_classMemberInitializer);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 275;
        this.match(LPCParser.Identifier);
        this.state = 276;
        this.match(LPCParser.Colon);
        this.state = 277;
        this.expression(0);
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "variableModifier",
    value: function variableModifier() {
      var localctx = new VariableModifierContext(this, this._ctx, this.state);
      this.enterRule(localctx, 34, LPCParser.RULE_variableModifier);
      var _la = 0; // Token type

      try {
        this.state = 287;

        this._errHandler.sync(this);

        var la_ = this._interp.adaptivePredict(this._input, 18, this._ctx);

        switch (la_) {
          case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 280;

            this._errHandler.sync(this);

            _la = this._input.LA(1);

            if (_la === LPCParser.Static) {
              this.state = 279;
              this.match(LPCParser.Static);
            }

            this.state = 282;
            this.accessLevelModifier();
            break;

          case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 284;

            this._errHandler.sync(this);

            _la = this._input.LA(1);

            if ((_la & ~0x1f) == 0 && (1 << _la & (1 << LPCParser.Private | 1 << LPCParser.Protected | 1 << LPCParser.Public)) !== 0) {
              this.state = 283;
              this.accessLevelModifier();
            }

            this.state = 286;
            this.match(LPCParser.Static);
            break;
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "variableList",
    value: function variableList() {
      var localctx = new VariableListContext(this, this._ctx, this.state);
      this.enterRule(localctx, 36, LPCParser.RULE_variableList);
      var _la = 0; // Token type

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 289;
        this.variable();
        this.state = 294;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        while (_la === LPCParser.Comma) {
          this.state = 290;
          this.match(LPCParser.Comma);
          this.state = 291;
          this.variable();
          this.state = 296;

          this._errHandler.sync(this);

          _la = this._input.LA(1);
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "variable",
    value: function variable() {
      var localctx = new VariableContext(this, this._ctx, this.state);
      this.enterRule(localctx, 38, LPCParser.RULE_variable);
      var _la = 0; // Token type

      try {
        this.state = 308;

        this._errHandler.sync(this);

        var la_ = this._interp.adaptivePredict(this._input, 22, this._ctx);

        switch (la_) {
          case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 298;

            this._errHandler.sync(this);

            _la = this._input.LA(1);

            if (_la === LPCParser.Array || _la === LPCParser.Multiply) {
              this.state = 297;
              this.array();
            }

            this.state = 300;
            this.identifier();
            break;

          case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 302;

            this._errHandler.sync(this);

            _la = this._input.LA(1);

            if (_la === LPCParser.Array || _la === LPCParser.Multiply) {
              this.state = 301;
              this.array();
            }

            this.state = 304;
            this.identifier();
            this.state = 305;
            this.match(LPCParser.Assign);
            this.state = 306;
            this.expression(0);
            break;
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "array",
    value: function array() {
      var localctx = new ArrayContext(this, this._ctx, this.state);
      this.enterRule(localctx, 40, LPCParser.RULE_array);
      var _la = 0; // Token type

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 310;
        _la = this._input.LA(1);

        if (!(_la === LPCParser.Array || _la === LPCParser.Multiply)) {
          this._errHandler.recoverInline(this);
        } else {
          this._errHandler.reportMatch(this);

          this.consume();
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "comparisonOperator",
    value: function comparisonOperator() {
      var localctx = new ComparisonOperatorContext(this, this._ctx, this.state);
      this.enterRule(localctx, 42, LPCParser.RULE_comparisonOperator);
      var _la = 0; // Token type

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 312;
        _la = this._input.LA(1);

        if (!((_la - 50 & ~0x1f) == 0 && (1 << _la - 50 & (1 << LPCParser.Equals - 50 | 1 << LPCParser.NotEquals - 50 | 1 << LPCParser.LessThanEqualTo - 50 | 1 << LPCParser.GreaterThanEqualTo - 50 | 1 << LPCParser.LessThan - 50 | 1 << LPCParser.GreaterThan - 50)) !== 0)) {
          this._errHandler.recoverInline(this);
        } else {
          this._errHandler.reportMatch(this);

          this.consume();
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "logicalOperator",
    value: function logicalOperator() {
      var localctx = new LogicalOperatorContext(this, this._ctx, this.state);
      this.enterRule(localctx, 44, LPCParser.RULE_logicalOperator);
      var _la = 0; // Token type

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 314;
        _la = this._input.LA(1);

        if (!(_la === LPCParser.And || _la === LPCParser.Or)) {
          this._errHandler.recoverInline(this);
        } else {
          this._errHandler.reportMatch(this);

          this.consume();
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "bitOperator",
    value: function bitOperator() {
      var localctx = new BitOperatorContext(this, this._ctx, this.state);
      this.enterRule(localctx, 46, LPCParser.RULE_bitOperator);
      var _la = 0; // Token type

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 316;
        _la = this._input.LA(1);

        if (!((_la - 40 & ~0x1f) == 0 && (1 << _la - 40 & (1 << LPCParser.BitXor - 40 | 1 << LPCParser.BitAnd - 40 | 1 << LPCParser.BitOr - 40)) !== 0)) {
          this._errHandler.recoverInline(this);
        } else {
          this._errHandler.reportMatch(this);

          this.consume();
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "arithmeticOperator",
    value: function arithmeticOperator() {
      var localctx = new ArithmeticOperatorContext(this, this._ctx, this.state);
      this.enterRule(localctx, 48, LPCParser.RULE_arithmeticOperator);
      var _la = 0; // Token type

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 318;
        _la = this._input.LA(1);

        if (!((_la - 51 & ~0x1f) == 0 && (1 << _la - 51 & (1 << LPCParser.LeftShift - 51 | 1 << LPCParser.RightShift - 51 | 1 << LPCParser.Add - 51 | 1 << LPCParser.Subtract - 51 | 1 << LPCParser.Modulus - 51 | 1 << LPCParser.Divide - 51 | 1 << LPCParser.Multiply - 51)) !== 0)) {
          this._errHandler.recoverInline(this);
        } else {
          this._errHandler.reportMatch(this);

          this.consume();
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "functionalDeclaration",
    value: function functionalDeclaration() {
      var localctx = new FunctionalDeclarationContext(this, this._ctx, this.state);
      this.enterRule(localctx, 50, LPCParser.RULE_functionalDeclaration);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 320;
        this.functionalStart();
        this.state = 321;
        this.expressionList();
        this.state = 322;
        this.functionalEnd();
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "anonymousFunctionalDeclaration",
    value: function anonymousFunctionalDeclaration() {
      var localctx = new AnonymousFunctionalDeclarationContext(this, this._ctx, this.state);
      this.enterRule(localctx, 52, LPCParser.RULE_anonymousFunctionalDeclaration);
      var _la = 0; // Token type

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 324;
        this.match(LPCParser.Function);
        this.state = 325;
        this.match(LPCParser.LeftParen);
        this.state = 327;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        if ((_la - 7 & ~0x1f) == 0 && (1 << _la - 7 & (1 << LPCParser.Buffer - 7 | 1 << LPCParser.Float - 7 | 1 << LPCParser.Function - 7 | 1 << LPCParser.Int - 7 | 1 << LPCParser.Mapping - 7 | 1 << LPCParser.Mixed - 7 | 1 << LPCParser.Object - 7 | 1 << LPCParser.String - 7 | 1 << LPCParser.Class - 7 | 1 << LPCParser.Array - 7)) !== 0 || _la === LPCParser.Multiply) {
          this.state = 326;
          this.argumentList();
        }

        this.state = 329;
        this.match(LPCParser.RightParen);
        this.state = 330;
        this.block();
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "functionalStart",
    value: function functionalStart() {
      var localctx = new FunctionalStartContext(this, this._ctx, this.state);
      this.enterRule(localctx, 54, LPCParser.RULE_functionalStart);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 332;
        this.match(LPCParser.LeftParen);
        this.state = 333;
        this.match(LPCParser.Colon);
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "functionalEnd",
    value: function functionalEnd() {
      var localctx = new FunctionalEndContext(this, this._ctx, this.state);
      this.enterRule(localctx, 56, LPCParser.RULE_functionalEnd);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 335;
        this.match(LPCParser.Colon);
        this.state = 336;
        this.match(LPCParser.RightParen);
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "functionalParameter",
    value: function functionalParameter() {
      var localctx = new FunctionalParameterContext(this, this._ctx, this.state);
      this.enterRule(localctx, 58, LPCParser.RULE_functionalParameter);

      try {
        this.state = 345;

        this._errHandler.sync(this);

        var la_ = this._interp.adaptivePredict(this._input, 24, this._ctx);

        switch (la_) {
          case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 338;
            this.match(LPCParser.FunctionalScope);
            this.state = 339;
            this.match(LPCParser.IntegerLiteral);
            break;

          case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 340;
            this.match(LPCParser.FunctionalScope);
            this.state = 341;
            this.match(LPCParser.LeftParen);
            this.state = 342;
            this.expression(0);
            this.state = 343;
            this.match(LPCParser.RightParen);
            break;
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "castOperation",
    value: function castOperation() {
      var localctx = new CastOperationContext(this, this._ctx, this.state);
      this.enterRule(localctx, 60, LPCParser.RULE_castOperation);
      var _la = 0; // Token type

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 347;
        this.match(LPCParser.LeftParen);
        this.state = 348;
        this.dataType();
        this.state = 350;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        if (_la === LPCParser.Array || _la === LPCParser.Multiply) {
          this.state = 349;
          this.array();
        }

        this.state = 352;
        this.match(LPCParser.RightParen);
        this.state = 353;
        this.expression(0);
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "expression",
    value: function expression(_p) {
      if (_p === undefined) {
        _p = 0;
      }

      var _parentctx = this._ctx;
      var _parentState = this.state;
      var localctx = new ExpressionContext(this, this._ctx, _parentState);
      var _prevctx = localctx;
      var _startState = 62;
      this.enterRecursionRule(localctx, 62, LPCParser.RULE_expression, _p);
      var _la = 0; // Token type

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 381;

        this._errHandler.sync(this);

        var la_ = this._interp.adaptivePredict(this._input, 27, this._ctx);

        switch (la_) {
          case 1:
            this.state = 356;
            this.match(LPCParser.LeftParen);
            this.state = 357;
            this.expression(0);
            this.state = 358;
            this.match(LPCParser.RightParen);
            break;

          case 2:
            this.state = 360;
            this.literal();
            break;

          case 3:
            this.state = 361;
            this.identifier();
            break;

          case 4:
            this.state = 362;
            this.functionCall();
            break;

          case 5:
            this.state = 363;
            this.functionalDeclaration();
            break;

          case 6:
            this.state = 364;
            this.anonymousFunctionalDeclaration();
            break;

          case 7:
            this.state = 365;
            this.mappingDeclaration();
            break;

          case 8:
            this.state = 366;
            this.arrayDeclaration();
            break;

          case 9:
            this.state = 367;
            this.catchExpression();
            break;

          case 10:
            this.state = 368;
            this.newExpression();
            break;

          case 11:
            this.state = 369;
            _la = this._input.LA(1);

            if (!(_la === LPCParser.PlusPlus || _la === LPCParser.MinusMinus)) {
              this._errHandler.recoverInline(this);
            } else {
              this._errHandler.reportMatch(this);

              this.consume();
            }

            this.state = 370;
            this.expression(9);
            break;

          case 12:
            this.state = 371;
            this.unaryOperator();
            break;

          case 13:
            this.state = 372;
            this.notExpression();
            break;

          case 14:
            this.state = 373;
            this.castOperation();
            break;

          case 15:
            this.state = 374;
            this.functionalParameter();
            break;

          case 16:
            this.state = 375;
            this.match(LPCParser.StringLiteral);
            this.state = 377;

            this._errHandler.sync(this);

            var _alt = 1;

            do {
              switch (_alt) {
                case 1:
                  this.state = 376;
                  this.match(LPCParser.StringLiteral);
                  break;

                default:
                  throw new _antlr["default"].error.NoViableAltException(this);
              }

              this.state = 379;

              this._errHandler.sync(this);

              _alt = this._interp.adaptivePredict(this._input, 26, this._ctx);
            } while (_alt != 2 && _alt != _antlr["default"].atn.ATN.INVALID_ALT_NUMBER);

            break;
        }

        this._ctx.stop = this._input.LT(-1);
        this.state = 407;

        this._errHandler.sync(this);

        var _alt = this._interp.adaptivePredict(this._input, 29, this._ctx);

        while (_alt != 2 && _alt != _antlr["default"].atn.ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            if (this._parseListeners !== null) {
              this.triggerExitRuleEvent();
            }

            _prevctx = localctx;
            this.state = 405;

            this._errHandler.sync(this);

            var la_ = this._interp.adaptivePredict(this._input, 28, this._ctx);

            switch (la_) {
              case 1:
                localctx = new ExpressionContext(this, _parentctx, _parentState);
                this.pushNewRecursionContext(localctx, _startState, LPCParser.RULE_expression);
                this.state = 383;

                if (!this.precpred(this._ctx, 5)) {
                  throw new _antlr["default"].error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
                }

                this.state = 384;
                this.operator();
                this.state = 385;
                this.expression(6);
                break;

              case 2:
                localctx = new ExpressionContext(this, _parentctx, _parentState);
                this.pushNewRecursionContext(localctx, _startState, LPCParser.RULE_expression);
                this.state = 387;

                if (!this.precpred(this._ctx, 4)) {
                  throw new _antlr["default"].error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
                }

                this.state = 388;
                this.match(LPCParser.Question);
                this.state = 389;
                this.expression(0);
                this.state = 390;
                this.match(LPCParser.Colon);
                this.state = 391;
                this.expression(5);
                break;

              case 3:
                localctx = new ExpressionContext(this, _parentctx, _parentState);
                this.pushNewRecursionContext(localctx, _startState, LPCParser.RULE_expression);
                this.state = 393;

                if (!this.precpred(this._ctx, 13)) {
                  throw new _antlr["default"].error.FailedPredicateException(this, "this.precpred(this._ctx, 13)");
                }

                this.state = 394;
                _la = this._input.LA(1);

                if (!(_la === LPCParser.PlusPlus || _la === LPCParser.MinusMinus)) {
                  this._errHandler.recoverInline(this);
                } else {
                  this._errHandler.reportMatch(this);

                  this.consume();
                }

                break;

              case 4:
                localctx = new ExpressionContext(this, _parentctx, _parentState);
                this.pushNewRecursionContext(localctx, _startState, LPCParser.RULE_expression);
                this.state = 395;

                if (!this.precpred(this._ctx, 12)) {
                  throw new _antlr["default"].error.FailedPredicateException(this, "this.precpred(this._ctx, 12)");
                }

                this.state = 396;
                this.indexOperator();
                break;

              case 5:
                localctx = new ExpressionContext(this, _parentctx, _parentState);
                this.pushNewRecursionContext(localctx, _startState, LPCParser.RULE_expression);
                this.state = 397;

                if (!this.precpred(this._ctx, 11)) {
                  throw new _antlr["default"].error.FailedPredicateException(this, "this.precpred(this._ctx, 11)");
                }

                this.state = 398;
                this.match(LPCParser.MemberOperator);
                this.state = 399;
                this.functionCall();
                break;

              case 6:
                localctx = new ExpressionContext(this, _parentctx, _parentState);
                this.pushNewRecursionContext(localctx, _startState, LPCParser.RULE_expression);
                this.state = 400;

                if (!this.precpred(this._ctx, 10)) {
                  throw new _antlr["default"].error.FailedPredicateException(this, "this.precpred(this._ctx, 10)");
                }

                this.state = 401;
                this.match(LPCParser.MemberOperator);
                this.state = 402;
                this.identifier();
                break;

              case 7:
                localctx = new ExpressionContext(this, _parentctx, _parentState);
                this.pushNewRecursionContext(localctx, _startState, LPCParser.RULE_expression);
                this.state = 403;

                if (!this.precpred(this._ctx, 2)) {
                  throw new _antlr["default"].error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
                }

                this.state = 404;
                this.match(LPCParser.Ellipsis);
                break;
            }
          }

          this.state = 409;

          this._errHandler.sync(this);

          _alt = this._interp.adaptivePredict(this._input, 29, this._ctx);
        }
      } catch (error) {
        if (error instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = error;

          this._errHandler.reportError(this, error);

          this._errHandler.recover(this, error);
        } else {
          throw error;
        }
      } finally {
        this.unrollRecursionContexts(_parentctx);
      }

      return localctx;
    }
  }, {
    key: "catchExpression",
    value: function catchExpression() {
      var localctx = new CatchExpressionContext(this, this._ctx, this.state);
      this.enterRule(localctx, 64, LPCParser.RULE_catchExpression);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 410;
        this.match(LPCParser.Catch);
        this.state = 411;
        this.match(LPCParser.LeftParen);
        this.state = 412;
        this.expression(0);
        this.state = 413;
        this.match(LPCParser.RightParen);
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "newExpression",
    value: function newExpression() {
      var localctx = new NewExpressionContext(this, this._ctx, this.state);
      this.enterRule(localctx, 66, LPCParser.RULE_newExpression);
      var _la = 0; // Token type

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 415;
        this.match(LPCParser.New);
        this.state = 416;
        this.match(LPCParser.LeftParen);
        this.state = 417;
        this.newExpressionIdentifier();
        this.state = 420;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        if (_la === LPCParser.Comma) {
          this.state = 418;
          this.match(LPCParser.Comma);
          this.state = 419;
          this.expressionList();
        }

        this.state = 422;
        this.match(LPCParser.RightParen);
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "newExpressionIdentifier",
    value: function newExpressionIdentifier() {
      var localctx = new NewExpressionIdentifierContext(this, this._ctx, this.state);
      this.enterRule(localctx, 68, LPCParser.RULE_newExpressionIdentifier);

      try {
        this.state = 426;

        this._errHandler.sync(this);

        switch (this._input.LA(1)) {
          case LPCParser.Function:
          case LPCParser.Object:
          case LPCParser.Catch:
          case LPCParser.Efun:
          case LPCParser.New:
          case LPCParser.PlusPlus:
          case LPCParser.MinusMinus:
          case LPCParser.ScopeOperator:
          case LPCParser.Add:
          case LPCParser.Subtract:
          case LPCParser.Not:
          case LPCParser.LeftParen:
          case LPCParser.FunctionalScope:
          case LPCParser.Identifier:
          case LPCParser.IntegerLiteral:
          case LPCParser.FloatLiteral:
          case LPCParser.StringLiteral:
          case LPCParser.CharacterLiteral:
            this.enterOuterAlt(localctx, 1);
            this.state = 424;
            this.expression(0);
            break;

          case LPCParser.Class:
            this.enterOuterAlt(localctx, 2);
            this.state = 425;
            this.classIdentifier();
            break;

          default:
            throw new _antlr["default"].error.NoViableAltException(this);
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "operator",
    value: function operator() {
      var localctx = new OperatorContext(this, this._ctx, this.state);
      this.enterRule(localctx, 70, LPCParser.RULE_operator);

      try {
        this.state = 433;

        this._errHandler.sync(this);

        switch (this._input.LA(1)) {
          case LPCParser.LeftShift:
          case LPCParser.RightShift:
          case LPCParser.Add:
          case LPCParser.Subtract:
          case LPCParser.Modulus:
          case LPCParser.Divide:
          case LPCParser.Multiply:
            this.enterOuterAlt(localctx, 1);
            this.state = 428;
            this.arithmeticOperator();
            break;

          case LPCParser.Equals:
          case LPCParser.NotEquals:
          case LPCParser.LessThanEqualTo:
          case LPCParser.GreaterThanEqualTo:
          case LPCParser.LessThan:
          case LPCParser.GreaterThan:
            this.enterOuterAlt(localctx, 2);
            this.state = 429;
            this.comparisonOperator();
            break;

          case LPCParser.BitXor:
          case LPCParser.BitAnd:
          case LPCParser.BitOr:
            this.enterOuterAlt(localctx, 3);
            this.state = 430;
            this.bitOperator();
            break;

          case LPCParser.And:
          case LPCParser.Or:
            this.enterOuterAlt(localctx, 4);
            this.state = 431;
            this.logicalOperator();
            break;

          case LPCParser.AddAssign:
          case LPCParser.SubtractAssign:
          case LPCParser.BitAndAssign:
          case LPCParser.BitOrAssign:
          case LPCParser.BitXorAssign:
          case LPCParser.ModulusAssign:
          case LPCParser.DivideAssign:
          case LPCParser.LeftShiftAssign:
          case LPCParser.RightShiftAssign:
          case LPCParser.MultiplyAssign:
          case LPCParser.Assign:
            this.enterOuterAlt(localctx, 5);
            this.state = 432;
            this.assignmentOperator();
            break;

          default:
            throw new _antlr["default"].error.NoViableAltException(this);
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "assignmentOperator",
    value: function assignmentOperator() {
      var localctx = new AssignmentOperatorContext(this, this._ctx, this.state);
      this.enterRule(localctx, 72, LPCParser.RULE_assignmentOperator);
      var _la = 0; // Token type

      try {
        this.state = 440;

        this._errHandler.sync(this);

        switch (this._input.LA(1)) {
          case LPCParser.Assign:
            this.enterOuterAlt(localctx, 1);
            this.state = 435;
            this.match(LPCParser.Assign);
            break;

          case LPCParser.AddAssign:
          case LPCParser.SubtractAssign:
            this.enterOuterAlt(localctx, 2);
            this.state = 436;
            _la = this._input.LA(1);

            if (!(_la === LPCParser.AddAssign || _la === LPCParser.SubtractAssign)) {
              this._errHandler.recoverInline(this);
            } else {
              this._errHandler.reportMatch(this);

              this.consume();
            }

            break;

          case LPCParser.ModulusAssign:
          case LPCParser.DivideAssign:
          case LPCParser.MultiplyAssign:
            this.enterOuterAlt(localctx, 3);
            this.state = 437;
            _la = this._input.LA(1);

            if (!((_la - 42 & ~0x1f) == 0 && (1 << _la - 42 & (1 << LPCParser.ModulusAssign - 42 | 1 << LPCParser.DivideAssign - 42 | 1 << LPCParser.MultiplyAssign - 42)) !== 0)) {
              this._errHandler.recoverInline(this);
            } else {
              this._errHandler.reportMatch(this);

              this.consume();
            }

            break;

          case LPCParser.LeftShiftAssign:
          case LPCParser.RightShiftAssign:
            this.enterOuterAlt(localctx, 4);
            this.state = 438;
            _la = this._input.LA(1);

            if (!(_la === LPCParser.LeftShiftAssign || _la === LPCParser.RightShiftAssign)) {
              this._errHandler.recoverInline(this);
            } else {
              this._errHandler.reportMatch(this);

              this.consume();
            }

            break;

          case LPCParser.BitAndAssign:
          case LPCParser.BitOrAssign:
          case LPCParser.BitXorAssign:
            this.enterOuterAlt(localctx, 5);
            this.state = 439;
            _la = this._input.LA(1);

            if (!((_la - 38 & ~0x1f) == 0 && (1 << _la - 38 & (1 << LPCParser.BitAndAssign - 38 | 1 << LPCParser.BitOrAssign - 38 | 1 << LPCParser.BitXorAssign - 38)) !== 0)) {
              this._errHandler.recoverInline(this);
            } else {
              this._errHandler.reportMatch(this);

              this.consume();
            }

            break;

          default:
            throw new _antlr["default"].error.NoViableAltException(this);
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "notExpression",
    value: function notExpression() {
      var localctx = new NotExpressionContext(this, this._ctx, this.state);
      this.enterRule(localctx, 74, LPCParser.RULE_notExpression);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 442;
        this.match(LPCParser.Not);
        this.state = 443;
        this.expression(0);
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "unaryOperator",
    value: function unaryOperator() {
      var localctx = new UnaryOperatorContext(this, this._ctx, this.state);
      this.enterRule(localctx, 76, LPCParser.RULE_unaryOperator);

      try {
        this.state = 449;

        this._errHandler.sync(this);

        switch (this._input.LA(1)) {
          case LPCParser.Add:
            this.enterOuterAlt(localctx, 1);
            this.state = 445;
            this.match(LPCParser.Add);
            this.state = 446;
            this.expression(0);
            break;

          case LPCParser.Subtract:
            this.enterOuterAlt(localctx, 2);
            this.state = 447;
            this.match(LPCParser.Subtract);
            this.state = 448;
            this.expression(0);
            break;

          default:
            throw new _antlr["default"].error.NoViableAltException(this);
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "literal",
    value: function literal() {
      var localctx = new LiteralContext(this, this._ctx, this.state);
      this.enterRule(localctx, 78, LPCParser.RULE_literal);
      var _la = 0; // Token type

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 451;
        _la = this._input.LA(1);

        if (!((_la - 94 & ~0x1f) == 0 && (1 << _la - 94 & (1 << LPCParser.IntegerLiteral - 94 | 1 << LPCParser.FloatLiteral - 94 | 1 << LPCParser.StringLiteral - 94 | 1 << LPCParser.CharacterLiteral - 94)) !== 0)) {
          this._errHandler.recoverInline(this);
        } else {
          this._errHandler.reportMatch(this);

          this.consume();
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "mappingDeclaration",
    value: function mappingDeclaration() {
      var localctx = new MappingDeclarationContext(this, this._ctx, this.state);
      this.enterRule(localctx, 80, LPCParser.RULE_mappingDeclaration);
      var _la = 0; // Token type

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 453;
        this.mappingStart();
        this.state = 455;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        if ((_la & ~0x1f) == 0 && (1 << _la & (1 << LPCParser.Function | 1 << LPCParser.Object | 1 << LPCParser.Catch | 1 << LPCParser.Efun)) !== 0 || (_la - 33 & ~0x1f) == 0 && (1 << _la - 33 & (1 << LPCParser.New - 33 | 1 << LPCParser.PlusPlus - 33 | 1 << LPCParser.MinusMinus - 33 | 1 << LPCParser.ScopeOperator - 33 | 1 << LPCParser.Add - 33 | 1 << LPCParser.Subtract - 33)) !== 0 || (_la - 67 & ~0x1f) == 0 && (1 << _la - 67 & (1 << LPCParser.Not - 67 | 1 << LPCParser.LeftParen - 67 | 1 << LPCParser.FunctionalScope - 67 | 1 << LPCParser.Identifier - 67 | 1 << LPCParser.IntegerLiteral - 67 | 1 << LPCParser.FloatLiteral - 67 | 1 << LPCParser.StringLiteral - 67 | 1 << LPCParser.CharacterLiteral - 67)) !== 0) {
          this.state = 454;
          this.mappingElementList();
        }

        this.state = 458;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        if (_la === LPCParser.Comma) {
          this.state = 457;
          this.match(LPCParser.Comma);
        }

        this.state = 460;
        this.mappingEnd();
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "mappingStart",
    value: function mappingStart() {
      var localctx = new MappingStartContext(this, this._ctx, this.state);
      this.enterRule(localctx, 82, LPCParser.RULE_mappingStart);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 462;
        this.match(LPCParser.LeftParen);
        this.state = 463;
        this.match(LPCParser.LeftBracket);
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "mappingEnd",
    value: function mappingEnd() {
      var localctx = new MappingEndContext(this, this._ctx, this.state);
      this.enterRule(localctx, 84, LPCParser.RULE_mappingEnd);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 465;
        this.match(LPCParser.RightBracket);
        this.state = 466;
        this.match(LPCParser.RightParen);
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "mappingElementList",
    value: function mappingElementList() {
      var localctx = new MappingElementListContext(this, this._ctx, this.state);
      this.enterRule(localctx, 86, LPCParser.RULE_mappingElementList);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 468;
        this.mappingElement();
        this.state = 473;

        this._errHandler.sync(this);

        var _alt = this._interp.adaptivePredict(this._input, 37, this._ctx);

        while (_alt != 2 && _alt != _antlr["default"].atn.ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            this.state = 469;
            this.match(LPCParser.Comma);
            this.state = 470;
            this.mappingElement();
          }

          this.state = 475;

          this._errHandler.sync(this);

          _alt = this._interp.adaptivePredict(this._input, 37, this._ctx);
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "mappingElement",
    value: function mappingElement() {
      var localctx = new MappingElementContext(this, this._ctx, this.state);
      this.enterRule(localctx, 88, LPCParser.RULE_mappingElement);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 476;
        this.mappingKey();
        this.state = 477;
        this.match(LPCParser.Colon);
        this.state = 478;
        this.mappingValue();
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "mappingKey",
    value: function mappingKey() {
      var localctx = new MappingKeyContext(this, this._ctx, this.state);
      this.enterRule(localctx, 90, LPCParser.RULE_mappingKey);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 480;
        this.expression(0);
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "mappingValue",
    value: function mappingValue() {
      var localctx = new MappingValueContext(this, this._ctx, this.state);
      this.enterRule(localctx, 92, LPCParser.RULE_mappingValue);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 482;
        this.expression(0);
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "arrayDeclaration",
    value: function arrayDeclaration() {
      var localctx = new ArrayDeclarationContext(this, this._ctx, this.state);
      this.enterRule(localctx, 94, LPCParser.RULE_arrayDeclaration);
      var _la = 0; // Token type

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 484;
        this.arrayStart();
        this.state = 486;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        if ((_la & ~0x1f) == 0 && (1 << _la & (1 << LPCParser.Function | 1 << LPCParser.Object | 1 << LPCParser.Catch | 1 << LPCParser.Efun)) !== 0 || (_la - 33 & ~0x1f) == 0 && (1 << _la - 33 & (1 << LPCParser.New - 33 | 1 << LPCParser.PlusPlus - 33 | 1 << LPCParser.MinusMinus - 33 | 1 << LPCParser.ScopeOperator - 33 | 1 << LPCParser.Add - 33 | 1 << LPCParser.Subtract - 33)) !== 0 || (_la - 67 & ~0x1f) == 0 && (1 << _la - 67 & (1 << LPCParser.Not - 67 | 1 << LPCParser.LeftParen - 67 | 1 << LPCParser.FunctionalScope - 67 | 1 << LPCParser.Identifier - 67 | 1 << LPCParser.IntegerLiteral - 67 | 1 << LPCParser.FloatLiteral - 67 | 1 << LPCParser.StringLiteral - 67 | 1 << LPCParser.CharacterLiteral - 67)) !== 0) {
          this.state = 485;
          this.expressionList();
        }

        this.state = 489;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        if (_la === LPCParser.Comma) {
          this.state = 488;
          this.match(LPCParser.Comma);
        }

        this.state = 491;
        this.arrayEnd();
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "arrayStart",
    value: function arrayStart() {
      var localctx = new ArrayStartContext(this, this._ctx, this.state);
      this.enterRule(localctx, 96, LPCParser.RULE_arrayStart);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 493;
        this.match(LPCParser.LeftParen);
        this.state = 494;
        this.match(LPCParser.LeftBrace);
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "arrayEnd",
    value: function arrayEnd() {
      var localctx = new ArrayEndContext(this, this._ctx, this.state);
      this.enterRule(localctx, 98, LPCParser.RULE_arrayEnd);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 496;
        this.match(LPCParser.RightBrace);
        this.state = 497;
        this.match(LPCParser.RightParen);
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "indexOperator",
    value: function indexOperator() {
      var localctx = new IndexOperatorContext(this, this._ctx, this.state);
      this.enterRule(localctx, 100, LPCParser.RULE_indexOperator);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 499;
        this.match(LPCParser.LeftBracket);
        this.state = 500;
        this.range();
        this.state = 501;
        this.match(LPCParser.RightBracket);
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "index",
    value: function index() {
      var localctx = new IndexContext(this, this._ctx, this.state);
      this.enterRule(localctx, 102, LPCParser.RULE_index);

      try {
        this.state = 506;

        this._errHandler.sync(this);

        switch (this._input.LA(1)) {
          case LPCParser.Function:
          case LPCParser.Object:
          case LPCParser.Catch:
          case LPCParser.Efun:
          case LPCParser.New:
          case LPCParser.PlusPlus:
          case LPCParser.MinusMinus:
          case LPCParser.ScopeOperator:
          case LPCParser.Add:
          case LPCParser.Subtract:
          case LPCParser.Not:
          case LPCParser.LeftParen:
          case LPCParser.FunctionalScope:
          case LPCParser.Identifier:
          case LPCParser.IntegerLiteral:
          case LPCParser.FloatLiteral:
          case LPCParser.StringLiteral:
          case LPCParser.CharacterLiteral:
            this.enterOuterAlt(localctx, 1);
            this.state = 503;
            this.expression(0);
            break;

          case LPCParser.LessThan:
            this.enterOuterAlt(localctx, 2);
            this.state = 504;
            this.match(LPCParser.LessThan);
            this.state = 505;
            this.index();
            break;

          default:
            throw new _antlr["default"].error.NoViableAltException(this);
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "range",
    value: function range() {
      var localctx = new RangeContext(this, this._ctx, this.state);
      this.enterRule(localctx, 104, LPCParser.RULE_range);
      var _la = 0; // Token type

      try {
        this.state = 516;

        this._errHandler.sync(this);

        var la_ = this._interp.adaptivePredict(this._input, 42, this._ctx);

        switch (la_) {
          case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 508;
            this.index();
            break;

          case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 509;
            this.match(LPCParser.Range);
            this.state = 510;
            this.index();
            break;

          case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 511;
            this.index();
            this.state = 512;
            this.match(LPCParser.Range);
            this.state = 514;

            this._errHandler.sync(this);

            _la = this._input.LA(1);

            if ((_la & ~0x1f) == 0 && (1 << _la & (1 << LPCParser.Function | 1 << LPCParser.Object | 1 << LPCParser.Catch | 1 << LPCParser.Efun)) !== 0 || (_la - 33 & ~0x1f) == 0 && (1 << _la - 33 & (1 << LPCParser.New - 33 | 1 << LPCParser.PlusPlus - 33 | 1 << LPCParser.MinusMinus - 33 | 1 << LPCParser.ScopeOperator - 33 | 1 << LPCParser.Add - 33 | 1 << LPCParser.Subtract - 33)) !== 0 || (_la - 67 & ~0x1f) == 0 && (1 << _la - 67 & (1 << LPCParser.Not - 67 | 1 << LPCParser.LessThan - 67 | 1 << LPCParser.LeftParen - 67 | 1 << LPCParser.FunctionalScope - 67 | 1 << LPCParser.Identifier - 67 | 1 << LPCParser.IntegerLiteral - 67 | 1 << LPCParser.FloatLiteral - 67 | 1 << LPCParser.StringLiteral - 67 | 1 << LPCParser.CharacterLiteral - 67)) !== 0) {
              this.state = 513;
              this.index();
            }

            break;
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "block",
    value: function block() {
      var localctx = new BlockContext(this, this._ctx, this.state);
      this.enterRule(localctx, 106, LPCParser.RULE_block);
      var _la = 0; // Token type

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 518;
        this.match(LPCParser.LeftBrace);
        this.state = 522;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        while ((_la & ~0x1f) == 0 && (1 << _la & (1 << LPCParser.Buffer | 1 << LPCParser.Float | 1 << LPCParser.Function | 1 << LPCParser.Int | 1 << LPCParser.Mapping | 1 << LPCParser.Mixed | 1 << LPCParser.Object | 1 << LPCParser.String | 1 << LPCParser.Break | 1 << LPCParser.Catch | 1 << LPCParser.Class | 1 << LPCParser.Continue | 1 << LPCParser.Efun | 1 << LPCParser.If | 1 << LPCParser.Return | 1 << LPCParser.For | 1 << LPCParser.Foreach | 1 << LPCParser.Switch | 1 << LPCParser.While | 1 << LPCParser.Do)) !== 0 || (_la - 33 & ~0x1f) == 0 && (1 << _la - 33 & (1 << LPCParser.New - 33 | 1 << LPCParser.Array - 33 | 1 << LPCParser.PlusPlus - 33 | 1 << LPCParser.MinusMinus - 33 | 1 << LPCParser.ScopeOperator - 33 | 1 << LPCParser.Add - 33 | 1 << LPCParser.Subtract - 33)) !== 0 || (_la - 67 & ~0x1f) == 0 && (1 << _la - 67 & (1 << LPCParser.Not - 67 | 1 << LPCParser.SemiColon - 67 | 1 << LPCParser.LeftParen - 67 | 1 << LPCParser.Multiply - 67 | 1 << LPCParser.FunctionalScope - 67 | 1 << LPCParser.Identifier - 67 | 1 << LPCParser.IntegerLiteral - 67 | 1 << LPCParser.FloatLiteral - 67 | 1 << LPCParser.StringLiteral - 67 | 1 << LPCParser.CharacterLiteral - 67)) !== 0) {
          this.state = 519;
          this.statement();
          this.state = 524;

          this._errHandler.sync(this);

          _la = this._input.LA(1);
        }

        this.state = 525;
        this.match(LPCParser.RightBrace);
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "statement",
    value: function statement() {
      var localctx = new StatementContext(this, this._ctx, this.state);
      this.enterRule(localctx, 108, LPCParser.RULE_statement);

      try {
        this.state = 538;

        this._errHandler.sync(this);

        var la_ = this._interp.adaptivePredict(this._input, 44, this._ctx);

        switch (la_) {
          case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 527;
            this.variableDeclaration();
            break;

          case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 528;
            this.expression(0);
            this.state = 529;
            this.match(LPCParser.SemiColon);
            break;

          case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 531;
            this.conditionalStatement();
            break;

          case 4:
            this.enterOuterAlt(localctx, 4);
            this.state = 532;
            this.switchStatement();
            break;

          case 5:
            this.enterOuterAlt(localctx, 5);
            this.state = 533;
            this.loopStatement();
            break;

          case 6:
            this.enterOuterAlt(localctx, 6);
            this.state = 534;
            this.breakStatement();
            break;

          case 7:
            this.enterOuterAlt(localctx, 7);
            this.state = 535;
            this.continueStatement();
            break;

          case 8:
            this.enterOuterAlt(localctx, 8);
            this.state = 536;
            this.returnStatement();
            break;

          case 9:
            this.enterOuterAlt(localctx, 9);
            this.state = 537;
            this.match(LPCParser.SemiColon);
            break;
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "breakStatement",
    value: function breakStatement() {
      var localctx = new BreakStatementContext(this, this._ctx, this.state);
      this.enterRule(localctx, 110, LPCParser.RULE_breakStatement);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 540;
        this.match(LPCParser.Break);
        this.state = 541;
        this.match(LPCParser.SemiColon);
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "continueStatement",
    value: function continueStatement() {
      var localctx = new ContinueStatementContext(this, this._ctx, this.state);
      this.enterRule(localctx, 112, LPCParser.RULE_continueStatement);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 543;
        this.match(LPCParser.Continue);
        this.state = 544;
        this.match(LPCParser.SemiColon);
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "statementOrBlock",
    value: function statementOrBlock() {
      var localctx = new StatementOrBlockContext(this, this._ctx, this.state);
      this.enterRule(localctx, 114, LPCParser.RULE_statementOrBlock);

      try {
        this.state = 548;

        this._errHandler.sync(this);

        switch (this._input.LA(1)) {
          case LPCParser.Buffer:
          case LPCParser.Float:
          case LPCParser.Function:
          case LPCParser.Int:
          case LPCParser.Mapping:
          case LPCParser.Mixed:
          case LPCParser.Object:
          case LPCParser.String:
          case LPCParser.Break:
          case LPCParser.Catch:
          case LPCParser.Class:
          case LPCParser.Continue:
          case LPCParser.Efun:
          case LPCParser.If:
          case LPCParser.Return:
          case LPCParser.For:
          case LPCParser.Foreach:
          case LPCParser.Switch:
          case LPCParser.While:
          case LPCParser.Do:
          case LPCParser.New:
          case LPCParser.Array:
          case LPCParser.PlusPlus:
          case LPCParser.MinusMinus:
          case LPCParser.ScopeOperator:
          case LPCParser.Add:
          case LPCParser.Subtract:
          case LPCParser.Not:
          case LPCParser.SemiColon:
          case LPCParser.LeftParen:
          case LPCParser.Multiply:
          case LPCParser.FunctionalScope:
          case LPCParser.Identifier:
          case LPCParser.IntegerLiteral:
          case LPCParser.FloatLiteral:
          case LPCParser.StringLiteral:
          case LPCParser.CharacterLiteral:
            this.enterOuterAlt(localctx, 1);
            this.state = 546;
            this.statement();
            break;

          case LPCParser.LeftBrace:
            this.enterOuterAlt(localctx, 2);
            this.state = 547;
            this.block();
            break;

          default:
            throw new _antlr["default"].error.NoViableAltException(this);
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "loopStatement",
    value: function loopStatement() {
      var localctx = new LoopStatementContext(this, this._ctx, this.state);
      this.enterRule(localctx, 116, LPCParser.RULE_loopStatement);

      try {
        this.state = 554;

        this._errHandler.sync(this);

        switch (this._input.LA(1)) {
          case LPCParser.Do:
            this.enterOuterAlt(localctx, 1);
            this.state = 550;
            this.doLoopStatement();
            break;

          case LPCParser.While:
            this.enterOuterAlt(localctx, 2);
            this.state = 551;
            this.whileLoopStatement();
            break;

          case LPCParser.For:
            this.enterOuterAlt(localctx, 3);
            this.state = 552;
            this.forLoopStatement();
            break;

          case LPCParser.Foreach:
            this.enterOuterAlt(localctx, 4);
            this.state = 553;
            this.foreachLoopStatement();
            break;

          default:
            throw new _antlr["default"].error.NoViableAltException(this);
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "whileControlStatement",
    value: function whileControlStatement() {
      var localctx = new WhileControlStatementContext(this, this._ctx, this.state);
      this.enterRule(localctx, 118, LPCParser.RULE_whileControlStatement);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 556;
        this.match(LPCParser.While);
        this.state = 557;
        this.match(LPCParser.LeftParen);
        this.state = 558;
        this.expression(0);
        this.state = 559;
        this.match(LPCParser.RightParen);
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "doLoopStatement",
    value: function doLoopStatement() {
      var localctx = new DoLoopStatementContext(this, this._ctx, this.state);
      this.enterRule(localctx, 120, LPCParser.RULE_doLoopStatement);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 561;
        this.match(LPCParser.Do);
        this.state = 562;
        this.statementOrBlock();
        this.state = 563;
        this.whileControlStatement();
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "whileLoopStatement",
    value: function whileLoopStatement() {
      var localctx = new WhileLoopStatementContext(this, this._ctx, this.state);
      this.enterRule(localctx, 122, LPCParser.RULE_whileLoopStatement);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 565;
        this.whileControlStatement();
        this.state = 566;
        this.statementOrBlock();
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "forControlStatement",
    value: function forControlStatement() {
      var localctx = new ForControlStatementContext(this, this._ctx, this.state);
      this.enterRule(localctx, 124, LPCParser.RULE_forControlStatement);
      var _la = 0; // Token type

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 568;
        this.match(LPCParser.For);
        this.state = 569;
        this.match(LPCParser.LeftParen);
        this.state = 571;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        if ((_la - 7 & ~0x1f) == 0 && (1 << _la - 7 & (1 << LPCParser.Buffer - 7 | 1 << LPCParser.Float - 7 | 1 << LPCParser.Function - 7 | 1 << LPCParser.Int - 7 | 1 << LPCParser.Mapping - 7 | 1 << LPCParser.Mixed - 7 | 1 << LPCParser.Object - 7 | 1 << LPCParser.String - 7 | 1 << LPCParser.Class - 7 | 1 << LPCParser.Array - 7)) !== 0 || _la === LPCParser.Multiply || _la === LPCParser.Identifier) {
          this.state = 570;
          this.forInitialState();
        }

        this.state = 573;
        this.match(LPCParser.SemiColon);
        this.state = 575;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        if ((_la & ~0x1f) == 0 && (1 << _la & (1 << LPCParser.Function | 1 << LPCParser.Object | 1 << LPCParser.Catch | 1 << LPCParser.Efun)) !== 0 || (_la - 33 & ~0x1f) == 0 && (1 << _la - 33 & (1 << LPCParser.New - 33 | 1 << LPCParser.PlusPlus - 33 | 1 << LPCParser.MinusMinus - 33 | 1 << LPCParser.ScopeOperator - 33 | 1 << LPCParser.Add - 33 | 1 << LPCParser.Subtract - 33)) !== 0 || (_la - 67 & ~0x1f) == 0 && (1 << _la - 67 & (1 << LPCParser.Not - 67 | 1 << LPCParser.LeftParen - 67 | 1 << LPCParser.FunctionalScope - 67 | 1 << LPCParser.Identifier - 67 | 1 << LPCParser.IntegerLiteral - 67 | 1 << LPCParser.FloatLiteral - 67 | 1 << LPCParser.StringLiteral - 67 | 1 << LPCParser.CharacterLiteral - 67)) !== 0) {
          this.state = 574;
          this.forCondition();
        }

        this.state = 577;
        this.match(LPCParser.SemiColon);
        this.state = 579;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        if ((_la & ~0x1f) == 0 && (1 << _la & (1 << LPCParser.Function | 1 << LPCParser.Object | 1 << LPCParser.Catch | 1 << LPCParser.Efun)) !== 0 || (_la - 33 & ~0x1f) == 0 && (1 << _la - 33 & (1 << LPCParser.New - 33 | 1 << LPCParser.PlusPlus - 33 | 1 << LPCParser.MinusMinus - 33 | 1 << LPCParser.ScopeOperator - 33 | 1 << LPCParser.Add - 33 | 1 << LPCParser.Subtract - 33)) !== 0 || (_la - 67 & ~0x1f) == 0 && (1 << _la - 67 & (1 << LPCParser.Not - 67 | 1 << LPCParser.LeftParen - 67 | 1 << LPCParser.FunctionalScope - 67 | 1 << LPCParser.Identifier - 67 | 1 << LPCParser.IntegerLiteral - 67 | 1 << LPCParser.FloatLiteral - 67 | 1 << LPCParser.StringLiteral - 67 | 1 << LPCParser.CharacterLiteral - 67)) !== 0) {
          this.state = 578;
          this.forIncrementStep();
        }

        this.state = 581;
        this.match(LPCParser.RightParen);
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "forLoopStatement",
    value: function forLoopStatement() {
      var localctx = new ForLoopStatementContext(this, this._ctx, this.state);
      this.enterRule(localctx, 126, LPCParser.RULE_forLoopStatement);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 583;
        this.forControlStatement();
        this.state = 584;
        this.statementOrBlock();
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "forInitialState",
    value: function forInitialState() {
      var localctx = new ForInitialStateContext(this, this._ctx, this.state);
      this.enterRule(localctx, 128, LPCParser.RULE_forInitialState);

      try {
        this.state = 591;

        this._errHandler.sync(this);

        var la_ = this._interp.adaptivePredict(this._input, 50, this._ctx);

        switch (la_) {
          case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 586;
            this.forLoopVariable();
            break;

          case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 587;
            this.forLoopVariable();
            this.state = 588;
            this.match(LPCParser.Comma);
            this.state = 589;
            this.forInitialState();
            break;
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "forLoopVariable",
    value: function forLoopVariable() {
      var localctx = new ForLoopVariableContext(this, this._ctx, this.state);
      this.enterRule(localctx, 130, LPCParser.RULE_forLoopVariable);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 594;

        this._errHandler.sync(this);

        var la_ = this._interp.adaptivePredict(this._input, 51, this._ctx);

        if (la_ === 1) {
          this.state = 593;
          this.dataType();
        }

        this.state = 596;
        this.variable();
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "forCondition",
    value: function forCondition() {
      var localctx = new ForConditionContext(this, this._ctx, this.state);
      this.enterRule(localctx, 132, LPCParser.RULE_forCondition);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 598;
        this.expressionList();
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "forIncrementStep",
    value: function forIncrementStep() {
      var localctx = new ForIncrementStepContext(this, this._ctx, this.state);
      this.enterRule(localctx, 134, LPCParser.RULE_forIncrementStep);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 600;
        this.expressionList();
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "foreachLoopStatement",
    value: function foreachLoopStatement() {
      var localctx = new ForeachLoopStatementContext(this, this._ctx, this.state);
      this.enterRule(localctx, 136, LPCParser.RULE_foreachLoopStatement);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 602;
        this.foreachControlStatement();
        this.state = 603;
        this.statementOrBlock();
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "foreachControlStatement",
    value: function foreachControlStatement() {
      var localctx = new ForeachControlStatementContext(this, this._ctx, this.state);
      this.enterRule(localctx, 138, LPCParser.RULE_foreachControlStatement);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 605;
        this.match(LPCParser.Foreach);
        this.state = 606;
        this.match(LPCParser.LeftParen);
        this.state = 607;
        this.foreachVariableList();
        this.state = 608;
        this.match(LPCParser.In);
        this.state = 609;
        this.expression(0);
        this.state = 610;
        this.match(LPCParser.RightParen);
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "foreachVariableList",
    value: function foreachVariableList() {
      var localctx = new ForeachVariableListContext(this, this._ctx, this.state);
      this.enterRule(localctx, 140, LPCParser.RULE_foreachVariableList);
      var _la = 0; // Token type

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 612;
        this.forLoopVariable();
        this.state = 617;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        while (_la === LPCParser.Comma) {
          this.state = 613;
          this.match(LPCParser.Comma);
          this.state = 614;
          this.forLoopVariable();
          this.state = 619;

          this._errHandler.sync(this);

          _la = this._input.LA(1);
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "returnStatement",
    value: function returnStatement() {
      var localctx = new ReturnStatementContext(this, this._ctx, this.state);
      this.enterRule(localctx, 142, LPCParser.RULE_returnStatement);

      try {
        this.state = 626;

        this._errHandler.sync(this);

        var la_ = this._interp.adaptivePredict(this._input, 53, this._ctx);

        switch (la_) {
          case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 620;
            this.match(LPCParser.Return);
            this.state = 621;
            this.match(LPCParser.SemiColon);
            break;

          case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 622;
            this.match(LPCParser.Return);
            this.state = 623;
            this.expressionList();
            this.state = 624;
            this.match(LPCParser.SemiColon);
            break;
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "functionCall",
    value: function functionCall() {
      var localctx = new FunctionCallContext(this, this._ctx, this.state);
      this.enterRule(localctx, 144, LPCParser.RULE_functionCall);
      var _la = 0; // Token type

      try {
        this.state = 647;

        this._errHandler.sync(this);

        var la_ = this._interp.adaptivePredict(this._input, 55, this._ctx);

        switch (la_) {
          case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 628;
            this.functionName();
            this.state = 629;
            this.match(LPCParser.LeftParen);
            this.state = 631;

            this._errHandler.sync(this);

            _la = this._input.LA(1);

            if ((_la & ~0x1f) == 0 && (1 << _la & (1 << LPCParser.Function | 1 << LPCParser.Object | 1 << LPCParser.Catch | 1 << LPCParser.Efun)) !== 0 || (_la - 33 & ~0x1f) == 0 && (1 << _la - 33 & (1 << LPCParser.New - 33 | 1 << LPCParser.PlusPlus - 33 | 1 << LPCParser.MinusMinus - 33 | 1 << LPCParser.ScopeOperator - 33 | 1 << LPCParser.Add - 33 | 1 << LPCParser.Subtract - 33)) !== 0 || (_la - 67 & ~0x1f) == 0 && (1 << _la - 67 & (1 << LPCParser.Not - 67 | 1 << LPCParser.LeftParen - 67 | 1 << LPCParser.FunctionalScope - 67 | 1 << LPCParser.Identifier - 67 | 1 << LPCParser.IntegerLiteral - 67 | 1 << LPCParser.FloatLiteral - 67 | 1 << LPCParser.StringLiteral - 67 | 1 << LPCParser.CharacterLiteral - 67)) !== 0) {
              this.state = 630;
              this.expressionList();
            }

            this.state = 633;
            this.match(LPCParser.RightParen);
            break;

          case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 635;
            this.match(LPCParser.ScopeOperator);
            this.state = 636;
            this.functionCall();
            break;

          case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 637;
            this.identifier();
            this.state = 638;
            this.match(LPCParser.ScopeOperator);
            this.state = 639;
            this.functionCall();
            break;

          case 4:
            this.enterOuterAlt(localctx, 4);
            this.state = 641;
            this.match(LPCParser.Efun);
            this.state = 642;
            this.match(LPCParser.ScopeOperator);
            this.state = 643;
            this.functionCall();
            break;

          case 5:
            this.enterOuterAlt(localctx, 5);
            this.state = 644;
            this.match(LPCParser.Object);
            this.state = 645;
            this.match(LPCParser.ScopeOperator);
            this.state = 646;
            this.functionCall();
            break;
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "expressionList",
    value: function expressionList() {
      var localctx = new ExpressionListContext(this, this._ctx, this.state);
      this.enterRule(localctx, 146, LPCParser.RULE_expressionList);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 649;
        this.expression(0);
        this.state = 654;

        this._errHandler.sync(this);

        var _alt = this._interp.adaptivePredict(this._input, 56, this._ctx);

        while (_alt != 2 && _alt != _antlr["default"].atn.ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            this.state = 650;
            this.match(LPCParser.Comma);
            this.state = 651;
            this.expression(0);
          }

          this.state = 656;

          this._errHandler.sync(this);

          _alt = this._interp.adaptivePredict(this._input, 56, this._ctx);
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "functionName",
    value: function functionName() {
      var localctx = new FunctionNameContext(this, this._ctx, this.state);
      this.enterRule(localctx, 148, LPCParser.RULE_functionName);

      try {
        this.state = 663;

        this._errHandler.sync(this);

        switch (this._input.LA(1)) {
          case LPCParser.Identifier:
            this.enterOuterAlt(localctx, 1);
            this.state = 657;
            this.identifier();
            break;

          case LPCParser.LeftParen:
            this.enterOuterAlt(localctx, 2);
            this.state = 658;
            this.match(LPCParser.LeftParen);
            this.state = 659;
            this.match(LPCParser.Multiply);
            this.state = 660;
            this.expression(0);
            this.state = 661;
            this.match(LPCParser.RightParen);
            break;

          default:
            throw new _antlr["default"].error.NoViableAltException(this);
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "inheritanceDeclaration",
    value: function inheritanceDeclaration() {
      var localctx = new InheritanceDeclarationContext(this, this._ctx, this.state);
      this.enterRule(localctx, 150, LPCParser.RULE_inheritanceDeclaration);
      var _la = 0; // Token type

      try {
        this.state = 679;

        this._errHandler.sync(this);

        var la_ = this._interp.adaptivePredict(this._input, 60, this._ctx);

        switch (la_) {
          case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 666;

            this._errHandler.sync(this);

            _la = this._input.LA(1);

            if ((_la & ~0x1f) == 0 && (1 << _la & (1 << LPCParser.Private | 1 << LPCParser.Protected | 1 << LPCParser.Public)) !== 0) {
              this.state = 665;
              this.accessLevelModifier();
            }

            this.state = 668;
            this.match(LPCParser.Inherit);
            this.state = 669;
            this.stringExpression();
            this.state = 670;
            this.match(LPCParser.SemiColon);
            break;

          case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 673;

            this._errHandler.sync(this);

            _la = this._input.LA(1);

            if ((_la & ~0x1f) == 0 && (1 << _la & (1 << LPCParser.Private | 1 << LPCParser.Protected | 1 << LPCParser.Public)) !== 0) {
              this.state = 672;
              this.accessLevelModifier();
            }

            this.state = 675;
            this.match(LPCParser.Inherit);
            this.state = 676;
            this.identifier();
            this.state = 677;
            this.match(LPCParser.SemiColon);
            break;
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "stringExpression",
    value: function stringExpression() {
      var localctx = new StringExpressionContext(this, this._ctx, this.state);
      this.enterRule(localctx, 152, LPCParser.RULE_stringExpression);
      var _la = 0; // Token type

      try {
        this.state = 693;

        this._errHandler.sync(this);

        var la_ = this._interp.adaptivePredict(this._input, 63, this._ctx);

        switch (la_) {
          case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 681;
            this.match(LPCParser.StringLiteral);
            this.state = 683;

            this._errHandler.sync(this);

            var la_ = this._interp.adaptivePredict(this._input, 61, this._ctx);

            if (la_ === 1) {
              this.state = 682;
              this.match(LPCParser.Add);
            }

            this.state = 685;
            this.expression(0);
            break;

          case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 686;
            this.expression(0);
            this.state = 688;

            this._errHandler.sync(this);

            _la = this._input.LA(1);

            if (_la === LPCParser.Add) {
              this.state = 687;
              this.match(LPCParser.Add);
            }

            this.state = 690;
            this.match(LPCParser.StringLiteral);
            break;

          case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 692;
            this.match(LPCParser.StringLiteral);
            break;
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "dataType",
    value: function dataType() {
      var localctx = new DataTypeContext(this, this._ctx, this.state);
      this.enterRule(localctx, 154, LPCParser.RULE_dataType);

      try {
        this.state = 705;

        this._errHandler.sync(this);

        switch (this._input.LA(1)) {
          case LPCParser.Float:
            this.enterOuterAlt(localctx, 1);
            this.state = 695;
            this.match(LPCParser.Float);
            break;

          case LPCParser.Function:
            this.enterOuterAlt(localctx, 2);
            this.state = 696;
            this.match(LPCParser.Function);
            break;

          case LPCParser.Int:
            this.enterOuterAlt(localctx, 3);
            this.state = 697;
            this.match(LPCParser.Int);
            break;

          case LPCParser.Mapping:
            this.enterOuterAlt(localctx, 4);
            this.state = 698;
            this.match(LPCParser.Mapping);
            break;

          case LPCParser.Mixed:
            this.enterOuterAlt(localctx, 5);
            this.state = 699;
            this.match(LPCParser.Mixed);
            break;

          case LPCParser.Object:
            this.enterOuterAlt(localctx, 6);
            this.state = 700;
            this.match(LPCParser.Object);
            break;

          case LPCParser.String:
            this.enterOuterAlt(localctx, 7);
            this.state = 701;
            this.match(LPCParser.String);
            break;

          case LPCParser.Buffer:
            this.enterOuterAlt(localctx, 8);
            this.state = 702;
            this.match(LPCParser.Buffer);
            break;

          case LPCParser.Class:
            this.enterOuterAlt(localctx, 9);
            this.state = 703;
            this.classIdentifier();
            break;

          case LPCParser.Array:
          case LPCParser.Multiply:
            this.enterOuterAlt(localctx, 10);
            this.state = 704;
            this.array();
            break;

          default:
            throw new _antlr["default"].error.NoViableAltException(this);
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "functionReturnType",
    value: function functionReturnType() {
      var localctx = new FunctionReturnTypeContext(this, this._ctx, this.state);
      this.enterRule(localctx, 156, LPCParser.RULE_functionReturnType);
      var _la = 0; // Token type

      try {
        this.state = 712;

        this._errHandler.sync(this);

        switch (this._input.LA(1)) {
          case LPCParser.Buffer:
          case LPCParser.Float:
          case LPCParser.Function:
          case LPCParser.Int:
          case LPCParser.Mapping:
          case LPCParser.Mixed:
          case LPCParser.Object:
          case LPCParser.String:
          case LPCParser.Class:
          case LPCParser.Array:
          case LPCParser.Multiply:
            this.enterOuterAlt(localctx, 1);
            this.state = 707;
            this.dataType();
            this.state = 709;

            this._errHandler.sync(this);

            _la = this._input.LA(1);

            if (_la === LPCParser.Array || _la === LPCParser.Multiply) {
              this.state = 708;
              this.array();
            }

            break;

          case LPCParser.Void:
            this.enterOuterAlt(localctx, 2);
            this.state = 711;
            this.match(LPCParser.Void);
            break;

          default:
            throw new _antlr["default"].error.NoViableAltException(this);
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "identifier",
    value: function identifier() {
      var localctx = new IdentifierContext(this, this._ctx, this.state);
      this.enterRule(localctx, 158, LPCParser.RULE_identifier);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 714;
        this.match(LPCParser.Identifier);
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "conditionalStatement",
    value: function conditionalStatement() {
      var localctx = new ConditionalStatementContext(this, this._ctx, this.state);
      this.enterRule(localctx, 160, LPCParser.RULE_conditionalStatement);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 716;
        this.match(LPCParser.If);
        this.state = 717;
        this.match(LPCParser.LeftParen);
        this.state = 718;
        this.expression(0);
        this.state = 719;
        this.match(LPCParser.RightParen);
        this.state = 720;
        this.statementOrBlock();
        this.state = 723;

        this._errHandler.sync(this);

        var la_ = this._interp.adaptivePredict(this._input, 67, this._ctx);

        if (la_ === 1) {
          this.state = 721;
          this.match(LPCParser.Else);
          this.state = 722;
          this.statementOrBlock();
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "switchStatement",
    value: function switchStatement() {
      var localctx = new SwitchStatementContext(this, this._ctx, this.state);
      this.enterRule(localctx, 162, LPCParser.RULE_switchStatement);
      var _la = 0; // Token type

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 725;
        this.match(LPCParser.Switch);
        this.state = 726;
        this.match(LPCParser.LeftParen);
        this.state = 727;
        this.expression(0);
        this.state = 728;
        this.match(LPCParser.RightParen);
        this.state = 729;
        this.match(LPCParser.LeftBrace);
        this.state = 733;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        while (_la === LPCParser.Case) {
          this.state = 730;
          this.caseStatement();
          this.state = 735;

          this._errHandler.sync(this);

          _la = this._input.LA(1);
        }

        this.state = 737;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        if (_la === LPCParser.Default) {
          this.state = 736;
          this.defaultSwitchStatement();
        }

        this.state = 739;
        this.match(LPCParser.RightBrace);
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "caseLabel",
    value: function caseLabel() {
      var localctx = new CaseLabelContext(this, this._ctx, this.state);
      this.enterRule(localctx, 164, LPCParser.RULE_caseLabel);

      try {
        this.state = 744;

        this._errHandler.sync(this);

        var la_ = this._interp.adaptivePredict(this._input, 70, this._ctx);

        switch (la_) {
          case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 741;
            this.literal();
            break;

          case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 742;
            this.identifier();
            break;

          case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 743;
            this.stringExpression();
            break;
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "caseStatement",
    value: function caseStatement() {
      var localctx = new CaseStatementContext(this, this._ctx, this.state);
      this.enterRule(localctx, 166, LPCParser.RULE_caseStatement);
      var _la = 0; // Token type

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 746;
        this.match(LPCParser.Case);
        this.state = 747;
        this.caseLabel();
        this.state = 748;
        this.match(LPCParser.Colon);
        this.state = 752;

        this._errHandler.sync(this);

        var _alt = this._interp.adaptivePredict(this._input, 71, this._ctx);

        while (_alt != 2 && _alt != _antlr["default"].atn.ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            this.state = 749;
            this.statement();
          }

          this.state = 754;

          this._errHandler.sync(this);

          _alt = this._interp.adaptivePredict(this._input, 71, this._ctx);
        }

        this.state = 756;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        if (_la === LPCParser.Break) {
          this.state = 755;
          this.breakStatement();
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "defaultSwitchStatement",
    value: function defaultSwitchStatement() {
      var localctx = new DefaultSwitchStatementContext(this, this._ctx, this.state);
      this.enterRule(localctx, 168, LPCParser.RULE_defaultSwitchStatement);
      var _la = 0; // Token type

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 758;
        this.match(LPCParser.Default);
        this.state = 759;
        this.match(LPCParser.Colon);
        this.state = 763;

        this._errHandler.sync(this);

        var _alt = this._interp.adaptivePredict(this._input, 73, this._ctx);

        while (_alt != 2 && _alt != _antlr["default"].atn.ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            this.state = 760;
            this.statement();
          }

          this.state = 765;

          this._errHandler.sync(this);

          _alt = this._interp.adaptivePredict(this._input, 73, this._ctx);
        }

        this.state = 767;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        if (_la === LPCParser.Break) {
          this.state = 766;
          this.breakStatement();
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }]);

  return LPCParser;
}(_antlr["default"].Parser);

exports["default"] = LPCParser;

_defineProperty(LPCParser, "grammarFileName", "LPC.g4");

_defineProperty(LPCParser, "literalNames", [null, "'nomask'", "'private'", "'protected'", "'public'", "'static'", "'varargs'", "'buffer'", "'float'", "'function'", "'int'", "'mapping'", "'mixed'", "'object'", "'string'", "'void'", "'break'", "'catch'", "'class'", "'continue'", "'efun'", "'else'", "'if'", "'inherit'", "'return'", "'for'", "'foreach'", "'in'", "'switch'", "'case'", "'while'", "'do'", "'default'", "'new'", "'array'", "'...'", "'+='", "'-='", "'&='", "'|='", "'^'", "'^='", "'%='", "'/='", "'<<='", "'>>='", "'++'", "'--'", "'&&'", "'||'", "'=='", "'<<'", "'>>'", "'!='", "'<='", "'>='", "'->'", "'::'", "'..'", "'*='", "'='", "'+'", "'-'", "'%'", "'/'", "'&'", "'|'", "'!'", "'<'", "'>'", "':'", "';'", "','", "'?'", "'''", "'\"'", "'{'", "'}'", "'['", "']'", "'('", "')'", "'*'", "'$'", null, null, null, null, null, null, null, null, "'#elseif'", "'#endif'"]);

_defineProperty(LPCParser, "symbolicNames", [null, "NoMask", "Private", "Protected", "Public", "Static", "VarArgs", "Buffer", "Float", "Function", "Int", "Mapping", "Mixed", "Object", "String", "Void", "Break", "Catch", "Class", "Continue", "Efun", "Else", "If", "Inherit", "Return", "For", "Foreach", "In", "Switch", "Case", "While", "Do", "Default", "New", "Array", "Ellipsis", "AddAssign", "SubtractAssign", "BitAndAssign", "BitOrAssign", "BitXor", "BitXorAssign", "ModulusAssign", "DivideAssign", "LeftShiftAssign", "RightShiftAssign", "PlusPlus", "MinusMinus", "And", "Or", "Equals", "LeftShift", "RightShift", "NotEquals", "LessThanEqualTo", "GreaterThanEqualTo", "MemberOperator", "ScopeOperator", "Range", "MultiplyAssign", "Assign", "Add", "Subtract", "Modulus", "Divide", "BitAnd", "BitOr", "Not", "LessThan", "GreaterThan", "Colon", "SemiColon", "Comma", "Question", "SingleQuote", "DoubleQuote", "LeftBrace", "RightBrace", "LeftBracket", "RightBracket", "LeftParen", "RightParen", "Multiply", "FunctionalScope", "Identifier", "BlockComment", "LineComment", "DefinePreprocessor", "IncludePreprocessor", "IfndefPreprocessor", "IfdefPreprocessor", "IfPreprocessor", "ElseIfPreprocessor", "EndIfPreprocessor", "IntegerLiteral", "FloatLiteral", "StringLiteral", "CharacterLiteral", "Newline", "Whitespace"]);

_defineProperty(LPCParser, "ruleNames", ["lpcProgram", "programDeclarations", "programDeclaration", "variableDeclaration", "programVariableDeclaration", "functionDeclaration", "argumentList", "argument", "dataTypeList", "functionDefinition", "accessLevelModifier", "functionTypeModifier", "functionModifier", "classDefinition", "classIdentifier", "classMembers", "classMemberInitializer", "variableModifier", "variableList", "variable", "array", "comparisonOperator", "logicalOperator", "bitOperator", "arithmeticOperator", "functionalDeclaration", "anonymousFunctionalDeclaration", "functionalStart", "functionalEnd", "functionalParameter", "castOperation", "expression", "catchExpression", "newExpression", "newExpressionIdentifier", "operator", "assignmentOperator", "notExpression", "unaryOperator", "literal", "mappingDeclaration", "mappingStart", "mappingEnd", "mappingElementList", "mappingElement", "mappingKey", "mappingValue", "arrayDeclaration", "arrayStart", "arrayEnd", "indexOperator", "index", "range", "block", "statement", "breakStatement", "continueStatement", "statementOrBlock", "loopStatement", "whileControlStatement", "doLoopStatement", "whileLoopStatement", "forControlStatement", "forLoopStatement", "forInitialState", "forLoopVariable", "forCondition", "forIncrementStep", "foreachLoopStatement", "foreachControlStatement", "foreachVariableList", "returnStatement", "functionCall", "expressionList", "functionName", "inheritanceDeclaration", "stringExpression", "dataType", "functionReturnType", "identifier", "conditionalStatement", "switchStatement", "caseLabel", "caseStatement", "defaultSwitchStatement"]);

LPCParser.EOF = _antlr["default"].Token.EOF;
LPCParser.NoMask = 1;
LPCParser.Private = 2;
LPCParser.Protected = 3;
LPCParser.Public = 4;
LPCParser.Static = 5;
LPCParser.VarArgs = 6;
LPCParser.Buffer = 7;
LPCParser.Float = 8;
LPCParser.Function = 9;
LPCParser.Int = 10;
LPCParser.Mapping = 11;
LPCParser.Mixed = 12;
LPCParser.Object = 13;
LPCParser.String = 14;
LPCParser.Void = 15;
LPCParser.Break = 16;
LPCParser.Catch = 17;
LPCParser.Class = 18;
LPCParser.Continue = 19;
LPCParser.Efun = 20;
LPCParser.Else = 21;
LPCParser.If = 22;
LPCParser.Inherit = 23;
LPCParser.Return = 24;
LPCParser.For = 25;
LPCParser.Foreach = 26;
LPCParser.In = 27;
LPCParser.Switch = 28;
LPCParser.Case = 29;
LPCParser.While = 30;
LPCParser.Do = 31;
LPCParser.Default = 32;
LPCParser.New = 33;
LPCParser.Array = 34;
LPCParser.Ellipsis = 35;
LPCParser.AddAssign = 36;
LPCParser.SubtractAssign = 37;
LPCParser.BitAndAssign = 38;
LPCParser.BitOrAssign = 39;
LPCParser.BitXor = 40;
LPCParser.BitXorAssign = 41;
LPCParser.ModulusAssign = 42;
LPCParser.DivideAssign = 43;
LPCParser.LeftShiftAssign = 44;
LPCParser.RightShiftAssign = 45;
LPCParser.PlusPlus = 46;
LPCParser.MinusMinus = 47;
LPCParser.And = 48;
LPCParser.Or = 49;
LPCParser.Equals = 50;
LPCParser.LeftShift = 51;
LPCParser.RightShift = 52;
LPCParser.NotEquals = 53;
LPCParser.LessThanEqualTo = 54;
LPCParser.GreaterThanEqualTo = 55;
LPCParser.MemberOperator = 56;
LPCParser.ScopeOperator = 57;
LPCParser.Range = 58;
LPCParser.MultiplyAssign = 59;
LPCParser.Assign = 60;
LPCParser.Add = 61;
LPCParser.Subtract = 62;
LPCParser.Modulus = 63;
LPCParser.Divide = 64;
LPCParser.BitAnd = 65;
LPCParser.BitOr = 66;
LPCParser.Not = 67;
LPCParser.LessThan = 68;
LPCParser.GreaterThan = 69;
LPCParser.Colon = 70;
LPCParser.SemiColon = 71;
LPCParser.Comma = 72;
LPCParser.Question = 73;
LPCParser.SingleQuote = 74;
LPCParser.DoubleQuote = 75;
LPCParser.LeftBrace = 76;
LPCParser.RightBrace = 77;
LPCParser.LeftBracket = 78;
LPCParser.RightBracket = 79;
LPCParser.LeftParen = 80;
LPCParser.RightParen = 81;
LPCParser.Multiply = 82;
LPCParser.FunctionalScope = 83;
LPCParser.Identifier = 84;
LPCParser.BlockComment = 85;
LPCParser.LineComment = 86;
LPCParser.DefinePreprocessor = 87;
LPCParser.IncludePreprocessor = 88;
LPCParser.IfndefPreprocessor = 89;
LPCParser.IfdefPreprocessor = 90;
LPCParser.IfPreprocessor = 91;
LPCParser.ElseIfPreprocessor = 92;
LPCParser.EndIfPreprocessor = 93;
LPCParser.IntegerLiteral = 94;
LPCParser.FloatLiteral = 95;
LPCParser.StringLiteral = 96;
LPCParser.CharacterLiteral = 97;
LPCParser.Newline = 98;
LPCParser.Whitespace = 99;
LPCParser.RULE_lpcProgram = 0;
LPCParser.RULE_programDeclarations = 1;
LPCParser.RULE_programDeclaration = 2;
LPCParser.RULE_variableDeclaration = 3;
LPCParser.RULE_programVariableDeclaration = 4;
LPCParser.RULE_functionDeclaration = 5;
LPCParser.RULE_argumentList = 6;
LPCParser.RULE_argument = 7;
LPCParser.RULE_dataTypeList = 8;
LPCParser.RULE_functionDefinition = 9;
LPCParser.RULE_accessLevelModifier = 10;
LPCParser.RULE_functionTypeModifier = 11;
LPCParser.RULE_functionModifier = 12;
LPCParser.RULE_classDefinition = 13;
LPCParser.RULE_classIdentifier = 14;
LPCParser.RULE_classMembers = 15;
LPCParser.RULE_classMemberInitializer = 16;
LPCParser.RULE_variableModifier = 17;
LPCParser.RULE_variableList = 18;
LPCParser.RULE_variable = 19;
LPCParser.RULE_array = 20;
LPCParser.RULE_comparisonOperator = 21;
LPCParser.RULE_logicalOperator = 22;
LPCParser.RULE_bitOperator = 23;
LPCParser.RULE_arithmeticOperator = 24;
LPCParser.RULE_functionalDeclaration = 25;
LPCParser.RULE_anonymousFunctionalDeclaration = 26;
LPCParser.RULE_functionalStart = 27;
LPCParser.RULE_functionalEnd = 28;
LPCParser.RULE_functionalParameter = 29;
LPCParser.RULE_castOperation = 30;
LPCParser.RULE_expression = 31;
LPCParser.RULE_catchExpression = 32;
LPCParser.RULE_newExpression = 33;
LPCParser.RULE_newExpressionIdentifier = 34;
LPCParser.RULE_operator = 35;
LPCParser.RULE_assignmentOperator = 36;
LPCParser.RULE_notExpression = 37;
LPCParser.RULE_unaryOperator = 38;
LPCParser.RULE_literal = 39;
LPCParser.RULE_mappingDeclaration = 40;
LPCParser.RULE_mappingStart = 41;
LPCParser.RULE_mappingEnd = 42;
LPCParser.RULE_mappingElementList = 43;
LPCParser.RULE_mappingElement = 44;
LPCParser.RULE_mappingKey = 45;
LPCParser.RULE_mappingValue = 46;
LPCParser.RULE_arrayDeclaration = 47;
LPCParser.RULE_arrayStart = 48;
LPCParser.RULE_arrayEnd = 49;
LPCParser.RULE_indexOperator = 50;
LPCParser.RULE_index = 51;
LPCParser.RULE_range = 52;
LPCParser.RULE_block = 53;
LPCParser.RULE_statement = 54;
LPCParser.RULE_breakStatement = 55;
LPCParser.RULE_continueStatement = 56;
LPCParser.RULE_statementOrBlock = 57;
LPCParser.RULE_loopStatement = 58;
LPCParser.RULE_whileControlStatement = 59;
LPCParser.RULE_doLoopStatement = 60;
LPCParser.RULE_whileLoopStatement = 61;
LPCParser.RULE_forControlStatement = 62;
LPCParser.RULE_forLoopStatement = 63;
LPCParser.RULE_forInitialState = 64;
LPCParser.RULE_forLoopVariable = 65;
LPCParser.RULE_forCondition = 66;
LPCParser.RULE_forIncrementStep = 67;
LPCParser.RULE_foreachLoopStatement = 68;
LPCParser.RULE_foreachControlStatement = 69;
LPCParser.RULE_foreachVariableList = 70;
LPCParser.RULE_returnStatement = 71;
LPCParser.RULE_functionCall = 72;
LPCParser.RULE_expressionList = 73;
LPCParser.RULE_functionName = 74;
LPCParser.RULE_inheritanceDeclaration = 75;
LPCParser.RULE_stringExpression = 76;
LPCParser.RULE_dataType = 77;
LPCParser.RULE_functionReturnType = 78;
LPCParser.RULE_identifier = 79;
LPCParser.RULE_conditionalStatement = 80;
LPCParser.RULE_switchStatement = 81;
LPCParser.RULE_caseLabel = 82;
LPCParser.RULE_caseStatement = 83;
LPCParser.RULE_defaultSwitchStatement = 84;

var LpcProgramContext = /*#__PURE__*/function (_antlr4$ParserRuleCon) {
  _inherits(LpcProgramContext, _antlr4$ParserRuleCon);

  var _super2 = _createSuper(LpcProgramContext);

  function LpcProgramContext(parser, parent, invokingState) {
    var _this2;

    _classCallCheck(this, LpcProgramContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this2 = _super2.call(this, parent, invokingState);
    _this2.parser = parser;
    _this2.ruleIndex = LPCParser.RULE_lpcProgram;
    return _this2;
  }

  _createClass(LpcProgramContext, [{
    key: "EOF",
    value: function EOF() {
      return this.getToken(LPCParser.EOF, 0);
    }
  }, {
    key: "programDeclarations",
    value: function programDeclarations() {
      return this.getTypedRuleContext(ProgramDeclarationsContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterLpcProgram(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitLpcProgram(this);
      }
    }
  }]);

  return LpcProgramContext;
}(_antlr["default"].ParserRuleContext);

var ProgramDeclarationsContext = /*#__PURE__*/function (_antlr4$ParserRuleCon2) {
  _inherits(ProgramDeclarationsContext, _antlr4$ParserRuleCon2);

  var _super3 = _createSuper(ProgramDeclarationsContext);

  function ProgramDeclarationsContext(parser, parent, invokingState) {
    var _this3;

    _classCallCheck(this, ProgramDeclarationsContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this3 = _super3.call(this, parent, invokingState);

    _defineProperty(_assertThisInitialized(_this3), "programDeclaration", function (i) {
      if (i === undefined) {
        i = null;
      }

      if (i === null) {
        return this.getTypedRuleContexts(ProgramDeclarationContext);
      } else {
        return this.getTypedRuleContext(ProgramDeclarationContext, i);
      }
    });

    _this3.parser = parser;
    _this3.ruleIndex = LPCParser.RULE_programDeclarations;
    return _this3;
  }

  _createClass(ProgramDeclarationsContext, [{
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterProgramDeclarations(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitProgramDeclarations(this);
      }
    }
  }]);

  return ProgramDeclarationsContext;
}(_antlr["default"].ParserRuleContext);

var ProgramDeclarationContext = /*#__PURE__*/function (_antlr4$ParserRuleCon3) {
  _inherits(ProgramDeclarationContext, _antlr4$ParserRuleCon3);

  var _super4 = _createSuper(ProgramDeclarationContext);

  function ProgramDeclarationContext(parser, parent, invokingState) {
    var _this4;

    _classCallCheck(this, ProgramDeclarationContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this4 = _super4.call(this, parent, invokingState);
    _this4.parser = parser;
    _this4.ruleIndex = LPCParser.RULE_programDeclaration;
    return _this4;
  }

  _createClass(ProgramDeclarationContext, [{
    key: "programVariableDeclaration",
    value: function programVariableDeclaration() {
      return this.getTypedRuleContext(ProgramVariableDeclarationContext, 0);
    }
  }, {
    key: "inheritanceDeclaration",
    value: function inheritanceDeclaration() {
      return this.getTypedRuleContext(InheritanceDeclarationContext, 0);
    }
  }, {
    key: "functionDeclaration",
    value: function functionDeclaration() {
      return this.getTypedRuleContext(FunctionDeclarationContext, 0);
    }
  }, {
    key: "SemiColon",
    value: function SemiColon() {
      return this.getToken(LPCParser.SemiColon, 0);
    }
  }, {
    key: "functionDefinition",
    value: function functionDefinition() {
      return this.getTypedRuleContext(FunctionDefinitionContext, 0);
    }
  }, {
    key: "classDefinition",
    value: function classDefinition() {
      return this.getTypedRuleContext(ClassDefinitionContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterProgramDeclaration(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitProgramDeclaration(this);
      }
    }
  }]);

  return ProgramDeclarationContext;
}(_antlr["default"].ParserRuleContext);

var VariableDeclarationContext = /*#__PURE__*/function (_antlr4$ParserRuleCon4) {
  _inherits(VariableDeclarationContext, _antlr4$ParserRuleCon4);

  var _super5 = _createSuper(VariableDeclarationContext);

  function VariableDeclarationContext(parser, parent, invokingState) {
    var _this5;

    _classCallCheck(this, VariableDeclarationContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this5 = _super5.call(this, parent, invokingState);
    _this5.parser = parser;
    _this5.ruleIndex = LPCParser.RULE_variableDeclaration;
    return _this5;
  }

  _createClass(VariableDeclarationContext, [{
    key: "dataType",
    value: function dataType() {
      return this.getTypedRuleContext(DataTypeContext, 0);
    }
  }, {
    key: "variableList",
    value: function variableList() {
      return this.getTypedRuleContext(VariableListContext, 0);
    }
  }, {
    key: "SemiColon",
    value: function SemiColon() {
      return this.getToken(LPCParser.SemiColon, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterVariableDeclaration(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitVariableDeclaration(this);
      }
    }
  }]);

  return VariableDeclarationContext;
}(_antlr["default"].ParserRuleContext);

var ProgramVariableDeclarationContext = /*#__PURE__*/function (_antlr4$ParserRuleCon5) {
  _inherits(ProgramVariableDeclarationContext, _antlr4$ParserRuleCon5);

  var _super6 = _createSuper(ProgramVariableDeclarationContext);

  function ProgramVariableDeclarationContext(parser, parent, invokingState) {
    var _this6;

    _classCallCheck(this, ProgramVariableDeclarationContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this6 = _super6.call(this, parent, invokingState);
    _this6.parser = parser;
    _this6.ruleIndex = LPCParser.RULE_programVariableDeclaration;
    return _this6;
  }

  _createClass(ProgramVariableDeclarationContext, [{
    key: "variableDeclaration",
    value: function variableDeclaration() {
      return this.getTypedRuleContext(VariableDeclarationContext, 0);
    }
  }, {
    key: "variableModifier",
    value: function variableModifier() {
      return this.getTypedRuleContext(VariableModifierContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterProgramVariableDeclaration(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitProgramVariableDeclaration(this);
      }
    }
  }]);

  return ProgramVariableDeclarationContext;
}(_antlr["default"].ParserRuleContext);

var FunctionDeclarationContext = /*#__PURE__*/function (_antlr4$ParserRuleCon6) {
  _inherits(FunctionDeclarationContext, _antlr4$ParserRuleCon6);

  var _super7 = _createSuper(FunctionDeclarationContext);

  function FunctionDeclarationContext(parser, parent, invokingState) {
    var _this7;

    _classCallCheck(this, FunctionDeclarationContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this7 = _super7.call(this, parent, invokingState);
    _this7.parser = parser;
    _this7.ruleIndex = LPCParser.RULE_functionDeclaration;
    return _this7;
  }

  _createClass(FunctionDeclarationContext, [{
    key: "functionReturnType",
    value: function functionReturnType() {
      return this.getTypedRuleContext(FunctionReturnTypeContext, 0);
    }
  }, {
    key: "identifier",
    value: function identifier() {
      return this.getTypedRuleContext(IdentifierContext, 0);
    }
  }, {
    key: "LeftParen",
    value: function LeftParen() {
      return this.getToken(LPCParser.LeftParen, 0);
    }
  }, {
    key: "RightParen",
    value: function RightParen() {
      return this.getToken(LPCParser.RightParen, 0);
    }
  }, {
    key: "functionModifier",
    value: function functionModifier() {
      return this.getTypedRuleContext(FunctionModifierContext, 0);
    }
  }, {
    key: "argumentList",
    value: function argumentList() {
      return this.getTypedRuleContext(ArgumentListContext, 0);
    }
  }, {
    key: "dataTypeList",
    value: function dataTypeList() {
      return this.getTypedRuleContext(DataTypeListContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterFunctionDeclaration(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitFunctionDeclaration(this);
      }
    }
  }]);

  return FunctionDeclarationContext;
}(_antlr["default"].ParserRuleContext);

var ArgumentListContext = /*#__PURE__*/function (_antlr4$ParserRuleCon7) {
  _inherits(ArgumentListContext, _antlr4$ParserRuleCon7);

  var _super8 = _createSuper(ArgumentListContext);

  function ArgumentListContext(parser, parent, invokingState) {
    var _this8;

    _classCallCheck(this, ArgumentListContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this8 = _super8.call(this, parent, invokingState);

    _defineProperty(_assertThisInitialized(_this8), "argument", function (i) {
      if (i === undefined) {
        i = null;
      }

      if (i === null) {
        return this.getTypedRuleContexts(ArgumentContext);
      } else {
        return this.getTypedRuleContext(ArgumentContext, i);
      }
    });

    _defineProperty(_assertThisInitialized(_this8), "Comma", function (i) {
      if (i === undefined) {
        i = null;
      }

      if (i === null) {
        return this.getTokens(LPCParser.Comma);
      } else {
        return this.getToken(LPCParser.Comma, i);
      }
    });

    _this8.parser = parser;
    _this8.ruleIndex = LPCParser.RULE_argumentList;
    return _this8;
  }

  _createClass(ArgumentListContext, [{
    key: "Ellipsis",
    value: function Ellipsis() {
      return this.getToken(LPCParser.Ellipsis, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterArgumentList(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitArgumentList(this);
      }
    }
  }]);

  return ArgumentListContext;
}(_antlr["default"].ParserRuleContext);

var ArgumentContext = /*#__PURE__*/function (_antlr4$ParserRuleCon8) {
  _inherits(ArgumentContext, _antlr4$ParserRuleCon8);

  var _super9 = _createSuper(ArgumentContext);

  function ArgumentContext(parser, parent, invokingState) {
    var _this9;

    _classCallCheck(this, ArgumentContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this9 = _super9.call(this, parent, invokingState);
    _this9.parser = parser;
    _this9.ruleIndex = LPCParser.RULE_argument;
    return _this9;
  }

  _createClass(ArgumentContext, [{
    key: "dataType",
    value: function dataType() {
      return this.getTypedRuleContext(DataTypeContext, 0);
    }
  }, {
    key: "identifier",
    value: function identifier() {
      return this.getTypedRuleContext(IdentifierContext, 0);
    }
  }, {
    key: "array",
    value: function array() {
      return this.getTypedRuleContext(ArrayContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterArgument(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitArgument(this);
      }
    }
  }]);

  return ArgumentContext;
}(_antlr["default"].ParserRuleContext);

var DataTypeListContext = /*#__PURE__*/function (_antlr4$ParserRuleCon9) {
  _inherits(DataTypeListContext, _antlr4$ParserRuleCon9);

  var _super10 = _createSuper(DataTypeListContext);

  function DataTypeListContext(parser, parent, invokingState) {
    var _this10;

    _classCallCheck(this, DataTypeListContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this10 = _super10.call(this, parent, invokingState);

    _defineProperty(_assertThisInitialized(_this10), "Comma", function (i) {
      if (i === undefined) {
        i = null;
      }

      if (i === null) {
        return this.getTokens(LPCParser.Comma);
      } else {
        return this.getToken(LPCParser.Comma, i);
      }
    });

    _defineProperty(_assertThisInitialized(_this10), "dataTypeList", function (i) {
      if (i === undefined) {
        i = null;
      }

      if (i === null) {
        return this.getTypedRuleContexts(DataTypeListContext);
      } else {
        return this.getTypedRuleContext(DataTypeListContext, i);
      }
    });

    _this10.parser = parser;
    _this10.ruleIndex = LPCParser.RULE_dataTypeList;
    return _this10;
  }

  _createClass(DataTypeListContext, [{
    key: "dataType",
    value: function dataType() {
      return this.getTypedRuleContext(DataTypeContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterDataTypeList(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitDataTypeList(this);
      }
    }
  }]);

  return DataTypeListContext;
}(_antlr["default"].ParserRuleContext);

var FunctionDefinitionContext = /*#__PURE__*/function (_antlr4$ParserRuleCon10) {
  _inherits(FunctionDefinitionContext, _antlr4$ParserRuleCon10);

  var _super11 = _createSuper(FunctionDefinitionContext);

  function FunctionDefinitionContext(parser, parent, invokingState) {
    var _this11;

    _classCallCheck(this, FunctionDefinitionContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this11 = _super11.call(this, parent, invokingState);
    _this11.parser = parser;
    _this11.ruleIndex = LPCParser.RULE_functionDefinition;
    return _this11;
  }

  _createClass(FunctionDefinitionContext, [{
    key: "functionDeclaration",
    value: function functionDeclaration() {
      return this.getTypedRuleContext(FunctionDeclarationContext, 0);
    }
  }, {
    key: "block",
    value: function block() {
      return this.getTypedRuleContext(BlockContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterFunctionDefinition(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitFunctionDefinition(this);
      }
    }
  }]);

  return FunctionDefinitionContext;
}(_antlr["default"].ParserRuleContext);

var AccessLevelModifierContext = /*#__PURE__*/function (_antlr4$ParserRuleCon11) {
  _inherits(AccessLevelModifierContext, _antlr4$ParserRuleCon11);

  var _super12 = _createSuper(AccessLevelModifierContext);

  function AccessLevelModifierContext(parser, parent, invokingState) {
    var _this12;

    _classCallCheck(this, AccessLevelModifierContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this12 = _super12.call(this, parent, invokingState);
    _this12.parser = parser;
    _this12.ruleIndex = LPCParser.RULE_accessLevelModifier;
    return _this12;
  }

  _createClass(AccessLevelModifierContext, [{
    key: "Private",
    value: function Private() {
      return this.getToken(LPCParser.Private, 0);
    }
  }, {
    key: "Protected",
    value: function Protected() {
      return this.getToken(LPCParser.Protected, 0);
    }
  }, {
    key: "Public",
    value: function Public() {
      return this.getToken(LPCParser.Public, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterAccessLevelModifier(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitAccessLevelModifier(this);
      }
    }
  }]);

  return AccessLevelModifierContext;
}(_antlr["default"].ParserRuleContext);

var FunctionTypeModifierContext = /*#__PURE__*/function (_antlr4$ParserRuleCon12) {
  _inherits(FunctionTypeModifierContext, _antlr4$ParserRuleCon12);

  var _super13 = _createSuper(FunctionTypeModifierContext);

  function FunctionTypeModifierContext(parser, parent, invokingState) {
    var _this13;

    _classCallCheck(this, FunctionTypeModifierContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this13 = _super13.call(this, parent, invokingState);
    _this13.parser = parser;
    _this13.ruleIndex = LPCParser.RULE_functionTypeModifier;
    return _this13;
  }

  _createClass(FunctionTypeModifierContext, [{
    key: "NoMask",
    value: function NoMask() {
      return this.getToken(LPCParser.NoMask, 0);
    }
  }, {
    key: "VarArgs",
    value: function VarArgs() {
      return this.getToken(LPCParser.VarArgs, 0);
    }
  }, {
    key: "Static",
    value: function Static() {
      return this.getToken(LPCParser.Static, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterFunctionTypeModifier(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitFunctionTypeModifier(this);
      }
    }
  }]);

  return FunctionTypeModifierContext;
}(_antlr["default"].ParserRuleContext);

var FunctionModifierContext = /*#__PURE__*/function (_antlr4$ParserRuleCon13) {
  _inherits(FunctionModifierContext, _antlr4$ParserRuleCon13);

  var _super14 = _createSuper(FunctionModifierContext);

  function FunctionModifierContext(parser, parent, invokingState) {
    var _this14;

    _classCallCheck(this, FunctionModifierContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this14 = _super14.call(this, parent, invokingState);

    _defineProperty(_assertThisInitialized(_this14), "functionTypeModifier", function (i) {
      if (i === undefined) {
        i = null;
      }

      if (i === null) {
        return this.getTypedRuleContexts(FunctionTypeModifierContext);
      } else {
        return this.getTypedRuleContext(FunctionTypeModifierContext, i);
      }
    });

    _this14.parser = parser;
    _this14.ruleIndex = LPCParser.RULE_functionModifier;
    return _this14;
  }

  _createClass(FunctionModifierContext, [{
    key: "accessLevelModifier",
    value: function accessLevelModifier() {
      return this.getTypedRuleContext(AccessLevelModifierContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterFunctionModifier(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitFunctionModifier(this);
      }
    }
  }]);

  return FunctionModifierContext;
}(_antlr["default"].ParserRuleContext);

var ClassDefinitionContext = /*#__PURE__*/function (_antlr4$ParserRuleCon14) {
  _inherits(ClassDefinitionContext, _antlr4$ParserRuleCon14);

  var _super15 = _createSuper(ClassDefinitionContext);

  function ClassDefinitionContext(parser, parent, invokingState) {
    var _this15;

    _classCallCheck(this, ClassDefinitionContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this15 = _super15.call(this, parent, invokingState);
    _this15.parser = parser;
    _this15.ruleIndex = LPCParser.RULE_classDefinition;
    return _this15;
  }

  _createClass(ClassDefinitionContext, [{
    key: "classIdentifier",
    value: function classIdentifier() {
      return this.getTypedRuleContext(ClassIdentifierContext, 0);
    }
  }, {
    key: "LeftBrace",
    value: function LeftBrace() {
      return this.getToken(LPCParser.LeftBrace, 0);
    }
  }, {
    key: "RightBrace",
    value: function RightBrace() {
      return this.getToken(LPCParser.RightBrace, 0);
    }
  }, {
    key: "classMembers",
    value: function classMembers() {
      return this.getTypedRuleContext(ClassMembersContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterClassDefinition(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitClassDefinition(this);
      }
    }
  }]);

  return ClassDefinitionContext;
}(_antlr["default"].ParserRuleContext);

var ClassIdentifierContext = /*#__PURE__*/function (_antlr4$ParserRuleCon15) {
  _inherits(ClassIdentifierContext, _antlr4$ParserRuleCon15);

  var _super16 = _createSuper(ClassIdentifierContext);

  function ClassIdentifierContext(parser, parent, invokingState) {
    var _this16;

    _classCallCheck(this, ClassIdentifierContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this16 = _super16.call(this, parent, invokingState);
    _this16.parser = parser;
    _this16.ruleIndex = LPCParser.RULE_classIdentifier;
    return _this16;
  }

  _createClass(ClassIdentifierContext, [{
    key: "Class",
    value: function Class() {
      return this.getToken(LPCParser.Class, 0);
    }
  }, {
    key: "identifier",
    value: function identifier() {
      return this.getTypedRuleContext(IdentifierContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterClassIdentifier(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitClassIdentifier(this);
      }
    }
  }]);

  return ClassIdentifierContext;
}(_antlr["default"].ParserRuleContext);

var ClassMembersContext = /*#__PURE__*/function (_antlr4$ParserRuleCon16) {
  _inherits(ClassMembersContext, _antlr4$ParserRuleCon16);

  var _super17 = _createSuper(ClassMembersContext);

  function ClassMembersContext(parser, parent, invokingState) {
    var _this17;

    _classCallCheck(this, ClassMembersContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this17 = _super17.call(this, parent, invokingState);

    _defineProperty(_assertThisInitialized(_this17), "variableDeclaration", function (i) {
      if (i === undefined) {
        i = null;
      }

      if (i === null) {
        return this.getTypedRuleContexts(VariableDeclarationContext);
      } else {
        return this.getTypedRuleContext(VariableDeclarationContext, i);
      }
    });

    _this17.parser = parser;
    _this17.ruleIndex = LPCParser.RULE_classMembers;
    return _this17;
  }

  _createClass(ClassMembersContext, [{
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterClassMembers(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitClassMembers(this);
      }
    }
  }]);

  return ClassMembersContext;
}(_antlr["default"].ParserRuleContext);

var ClassMemberInitializerContext = /*#__PURE__*/function (_antlr4$ParserRuleCon17) {
  _inherits(ClassMemberInitializerContext, _antlr4$ParserRuleCon17);

  var _super18 = _createSuper(ClassMemberInitializerContext);

  function ClassMemberInitializerContext(parser, parent, invokingState) {
    var _this18;

    _classCallCheck(this, ClassMemberInitializerContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this18 = _super18.call(this, parent, invokingState);
    _this18.parser = parser;
    _this18.ruleIndex = LPCParser.RULE_classMemberInitializer;
    return _this18;
  }

  _createClass(ClassMemberInitializerContext, [{
    key: "Identifier",
    value: function Identifier() {
      return this.getToken(LPCParser.Identifier, 0);
    }
  }, {
    key: "Colon",
    value: function Colon() {
      return this.getToken(LPCParser.Colon, 0);
    }
  }, {
    key: "expression",
    value: function expression() {
      return this.getTypedRuleContext(ExpressionContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterClassMemberInitializer(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitClassMemberInitializer(this);
      }
    }
  }]);

  return ClassMemberInitializerContext;
}(_antlr["default"].ParserRuleContext);

var VariableModifierContext = /*#__PURE__*/function (_antlr4$ParserRuleCon18) {
  _inherits(VariableModifierContext, _antlr4$ParserRuleCon18);

  var _super19 = _createSuper(VariableModifierContext);

  function VariableModifierContext(parser, parent, invokingState) {
    var _this19;

    _classCallCheck(this, VariableModifierContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this19 = _super19.call(this, parent, invokingState);
    _this19.parser = parser;
    _this19.ruleIndex = LPCParser.RULE_variableModifier;
    return _this19;
  }

  _createClass(VariableModifierContext, [{
    key: "accessLevelModifier",
    value: function accessLevelModifier() {
      return this.getTypedRuleContext(AccessLevelModifierContext, 0);
    }
  }, {
    key: "Static",
    value: function Static() {
      return this.getToken(LPCParser.Static, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterVariableModifier(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitVariableModifier(this);
      }
    }
  }]);

  return VariableModifierContext;
}(_antlr["default"].ParserRuleContext);

var VariableListContext = /*#__PURE__*/function (_antlr4$ParserRuleCon19) {
  _inherits(VariableListContext, _antlr4$ParserRuleCon19);

  var _super20 = _createSuper(VariableListContext);

  function VariableListContext(parser, parent, invokingState) {
    var _this20;

    _classCallCheck(this, VariableListContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this20 = _super20.call(this, parent, invokingState);

    _defineProperty(_assertThisInitialized(_this20), "variable", function (i) {
      if (i === undefined) {
        i = null;
      }

      if (i === null) {
        return this.getTypedRuleContexts(VariableContext);
      } else {
        return this.getTypedRuleContext(VariableContext, i);
      }
    });

    _defineProperty(_assertThisInitialized(_this20), "Comma", function (i) {
      if (i === undefined) {
        i = null;
      }

      if (i === null) {
        return this.getTokens(LPCParser.Comma);
      } else {
        return this.getToken(LPCParser.Comma, i);
      }
    });

    _this20.parser = parser;
    _this20.ruleIndex = LPCParser.RULE_variableList;
    return _this20;
  }

  _createClass(VariableListContext, [{
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterVariableList(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitVariableList(this);
      }
    }
  }]);

  return VariableListContext;
}(_antlr["default"].ParserRuleContext);

var VariableContext = /*#__PURE__*/function (_antlr4$ParserRuleCon20) {
  _inherits(VariableContext, _antlr4$ParserRuleCon20);

  var _super21 = _createSuper(VariableContext);

  function VariableContext(parser, parent, invokingState) {
    var _this21;

    _classCallCheck(this, VariableContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this21 = _super21.call(this, parent, invokingState);
    _this21.parser = parser;
    _this21.ruleIndex = LPCParser.RULE_variable;
    return _this21;
  }

  _createClass(VariableContext, [{
    key: "identifier",
    value: function identifier() {
      return this.getTypedRuleContext(IdentifierContext, 0);
    }
  }, {
    key: "array",
    value: function array() {
      return this.getTypedRuleContext(ArrayContext, 0);
    }
  }, {
    key: "Assign",
    value: function Assign() {
      return this.getToken(LPCParser.Assign, 0);
    }
  }, {
    key: "expression",
    value: function expression() {
      return this.getTypedRuleContext(ExpressionContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterVariable(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitVariable(this);
      }
    }
  }]);

  return VariableContext;
}(_antlr["default"].ParserRuleContext);

var ArrayContext = /*#__PURE__*/function (_antlr4$ParserRuleCon21) {
  _inherits(ArrayContext, _antlr4$ParserRuleCon21);

  var _super22 = _createSuper(ArrayContext);

  function ArrayContext(parser, parent, invokingState) {
    var _this22;

    _classCallCheck(this, ArrayContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this22 = _super22.call(this, parent, invokingState);
    _this22.parser = parser;
    _this22.ruleIndex = LPCParser.RULE_array;
    return _this22;
  }

  _createClass(ArrayContext, [{
    key: "Multiply",
    value: function Multiply() {
      return this.getToken(LPCParser.Multiply, 0);
    }
  }, {
    key: "Array",
    value: function Array() {
      return this.getToken(LPCParser.Array, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterArray(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitArray(this);
      }
    }
  }]);

  return ArrayContext;
}(_antlr["default"].ParserRuleContext);

var ComparisonOperatorContext = /*#__PURE__*/function (_antlr4$ParserRuleCon22) {
  _inherits(ComparisonOperatorContext, _antlr4$ParserRuleCon22);

  var _super23 = _createSuper(ComparisonOperatorContext);

  function ComparisonOperatorContext(parser, parent, invokingState) {
    var _this23;

    _classCallCheck(this, ComparisonOperatorContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this23 = _super23.call(this, parent, invokingState);
    _this23.parser = parser;
    _this23.ruleIndex = LPCParser.RULE_comparisonOperator;
    return _this23;
  }

  _createClass(ComparisonOperatorContext, [{
    key: "LessThan",
    value: function LessThan() {
      return this.getToken(LPCParser.LessThan, 0);
    }
  }, {
    key: "LessThanEqualTo",
    value: function LessThanEqualTo() {
      return this.getToken(LPCParser.LessThanEqualTo, 0);
    }
  }, {
    key: "GreaterThan",
    value: function GreaterThan() {
      return this.getToken(LPCParser.GreaterThan, 0);
    }
  }, {
    key: "GreaterThanEqualTo",
    value: function GreaterThanEqualTo() {
      return this.getToken(LPCParser.GreaterThanEqualTo, 0);
    }
  }, {
    key: "Equals",
    value: function Equals() {
      return this.getToken(LPCParser.Equals, 0);
    }
  }, {
    key: "NotEquals",
    value: function NotEquals() {
      return this.getToken(LPCParser.NotEquals, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterComparisonOperator(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitComparisonOperator(this);
      }
    }
  }]);

  return ComparisonOperatorContext;
}(_antlr["default"].ParserRuleContext);

var LogicalOperatorContext = /*#__PURE__*/function (_antlr4$ParserRuleCon23) {
  _inherits(LogicalOperatorContext, _antlr4$ParserRuleCon23);

  var _super24 = _createSuper(LogicalOperatorContext);

  function LogicalOperatorContext(parser, parent, invokingState) {
    var _this24;

    _classCallCheck(this, LogicalOperatorContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this24 = _super24.call(this, parent, invokingState);
    _this24.parser = parser;
    _this24.ruleIndex = LPCParser.RULE_logicalOperator;
    return _this24;
  }

  _createClass(LogicalOperatorContext, [{
    key: "Or",
    value: function Or() {
      return this.getToken(LPCParser.Or, 0);
    }
  }, {
    key: "And",
    value: function And() {
      return this.getToken(LPCParser.And, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterLogicalOperator(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitLogicalOperator(this);
      }
    }
  }]);

  return LogicalOperatorContext;
}(_antlr["default"].ParserRuleContext);

var BitOperatorContext = /*#__PURE__*/function (_antlr4$ParserRuleCon24) {
  _inherits(BitOperatorContext, _antlr4$ParserRuleCon24);

  var _super25 = _createSuper(BitOperatorContext);

  function BitOperatorContext(parser, parent, invokingState) {
    var _this25;

    _classCallCheck(this, BitOperatorContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this25 = _super25.call(this, parent, invokingState);
    _this25.parser = parser;
    _this25.ruleIndex = LPCParser.RULE_bitOperator;
    return _this25;
  }

  _createClass(BitOperatorContext, [{
    key: "BitOr",
    value: function BitOr() {
      return this.getToken(LPCParser.BitOr, 0);
    }
  }, {
    key: "BitAnd",
    value: function BitAnd() {
      return this.getToken(LPCParser.BitAnd, 0);
    }
  }, {
    key: "BitXor",
    value: function BitXor() {
      return this.getToken(LPCParser.BitXor, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterBitOperator(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitBitOperator(this);
      }
    }
  }]);

  return BitOperatorContext;
}(_antlr["default"].ParserRuleContext);

var ArithmeticOperatorContext = /*#__PURE__*/function (_antlr4$ParserRuleCon25) {
  _inherits(ArithmeticOperatorContext, _antlr4$ParserRuleCon25);

  var _super26 = _createSuper(ArithmeticOperatorContext);

  function ArithmeticOperatorContext(parser, parent, invokingState) {
    var _this26;

    _classCallCheck(this, ArithmeticOperatorContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this26 = _super26.call(this, parent, invokingState);
    _this26.parser = parser;
    _this26.ruleIndex = LPCParser.RULE_arithmeticOperator;
    return _this26;
  }

  _createClass(ArithmeticOperatorContext, [{
    key: "LeftShift",
    value: function LeftShift() {
      return this.getToken(LPCParser.LeftShift, 0);
    }
  }, {
    key: "RightShift",
    value: function RightShift() {
      return this.getToken(LPCParser.RightShift, 0);
    }
  }, {
    key: "Add",
    value: function Add() {
      return this.getToken(LPCParser.Add, 0);
    }
  }, {
    key: "Subtract",
    value: function Subtract() {
      return this.getToken(LPCParser.Subtract, 0);
    }
  }, {
    key: "Multiply",
    value: function Multiply() {
      return this.getToken(LPCParser.Multiply, 0);
    }
  }, {
    key: "Divide",
    value: function Divide() {
      return this.getToken(LPCParser.Divide, 0);
    }
  }, {
    key: "Modulus",
    value: function Modulus() {
      return this.getToken(LPCParser.Modulus, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterArithmeticOperator(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitArithmeticOperator(this);
      }
    }
  }]);

  return ArithmeticOperatorContext;
}(_antlr["default"].ParserRuleContext);

var FunctionalDeclarationContext = /*#__PURE__*/function (_antlr4$ParserRuleCon26) {
  _inherits(FunctionalDeclarationContext, _antlr4$ParserRuleCon26);

  var _super27 = _createSuper(FunctionalDeclarationContext);

  function FunctionalDeclarationContext(parser, parent, invokingState) {
    var _this27;

    _classCallCheck(this, FunctionalDeclarationContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this27 = _super27.call(this, parent, invokingState);
    _this27.parser = parser;
    _this27.ruleIndex = LPCParser.RULE_functionalDeclaration;
    return _this27;
  }

  _createClass(FunctionalDeclarationContext, [{
    key: "functionalStart",
    value: function functionalStart() {
      return this.getTypedRuleContext(FunctionalStartContext, 0);
    }
  }, {
    key: "expressionList",
    value: function expressionList() {
      return this.getTypedRuleContext(ExpressionListContext, 0);
    }
  }, {
    key: "functionalEnd",
    value: function functionalEnd() {
      return this.getTypedRuleContext(FunctionalEndContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterFunctionalDeclaration(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitFunctionalDeclaration(this);
      }
    }
  }]);

  return FunctionalDeclarationContext;
}(_antlr["default"].ParserRuleContext);

var AnonymousFunctionalDeclarationContext = /*#__PURE__*/function (_antlr4$ParserRuleCon27) {
  _inherits(AnonymousFunctionalDeclarationContext, _antlr4$ParserRuleCon27);

  var _super28 = _createSuper(AnonymousFunctionalDeclarationContext);

  function AnonymousFunctionalDeclarationContext(parser, parent, invokingState) {
    var _this28;

    _classCallCheck(this, AnonymousFunctionalDeclarationContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this28 = _super28.call(this, parent, invokingState);
    _this28.parser = parser;
    _this28.ruleIndex = LPCParser.RULE_anonymousFunctionalDeclaration;
    return _this28;
  }

  _createClass(AnonymousFunctionalDeclarationContext, [{
    key: "Function",
    value: function Function() {
      return this.getToken(LPCParser.Function, 0);
    }
  }, {
    key: "LeftParen",
    value: function LeftParen() {
      return this.getToken(LPCParser.LeftParen, 0);
    }
  }, {
    key: "RightParen",
    value: function RightParen() {
      return this.getToken(LPCParser.RightParen, 0);
    }
  }, {
    key: "block",
    value: function block() {
      return this.getTypedRuleContext(BlockContext, 0);
    }
  }, {
    key: "argumentList",
    value: function argumentList() {
      return this.getTypedRuleContext(ArgumentListContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterAnonymousFunctionalDeclaration(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitAnonymousFunctionalDeclaration(this);
      }
    }
  }]);

  return AnonymousFunctionalDeclarationContext;
}(_antlr["default"].ParserRuleContext);

var FunctionalStartContext = /*#__PURE__*/function (_antlr4$ParserRuleCon28) {
  _inherits(FunctionalStartContext, _antlr4$ParserRuleCon28);

  var _super29 = _createSuper(FunctionalStartContext);

  function FunctionalStartContext(parser, parent, invokingState) {
    var _this29;

    _classCallCheck(this, FunctionalStartContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this29 = _super29.call(this, parent, invokingState);
    _this29.parser = parser;
    _this29.ruleIndex = LPCParser.RULE_functionalStart;
    return _this29;
  }

  _createClass(FunctionalStartContext, [{
    key: "LeftParen",
    value: function LeftParen() {
      return this.getToken(LPCParser.LeftParen, 0);
    }
  }, {
    key: "Colon",
    value: function Colon() {
      return this.getToken(LPCParser.Colon, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterFunctionalStart(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitFunctionalStart(this);
      }
    }
  }]);

  return FunctionalStartContext;
}(_antlr["default"].ParserRuleContext);

var FunctionalEndContext = /*#__PURE__*/function (_antlr4$ParserRuleCon29) {
  _inherits(FunctionalEndContext, _antlr4$ParserRuleCon29);

  var _super30 = _createSuper(FunctionalEndContext);

  function FunctionalEndContext(parser, parent, invokingState) {
    var _this30;

    _classCallCheck(this, FunctionalEndContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this30 = _super30.call(this, parent, invokingState);
    _this30.parser = parser;
    _this30.ruleIndex = LPCParser.RULE_functionalEnd;
    return _this30;
  }

  _createClass(FunctionalEndContext, [{
    key: "Colon",
    value: function Colon() {
      return this.getToken(LPCParser.Colon, 0);
    }
  }, {
    key: "RightParen",
    value: function RightParen() {
      return this.getToken(LPCParser.RightParen, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterFunctionalEnd(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitFunctionalEnd(this);
      }
    }
  }]);

  return FunctionalEndContext;
}(_antlr["default"].ParserRuleContext);

var FunctionalParameterContext = /*#__PURE__*/function (_antlr4$ParserRuleCon30) {
  _inherits(FunctionalParameterContext, _antlr4$ParserRuleCon30);

  var _super31 = _createSuper(FunctionalParameterContext);

  function FunctionalParameterContext(parser, parent, invokingState) {
    var _this31;

    _classCallCheck(this, FunctionalParameterContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this31 = _super31.call(this, parent, invokingState);
    _this31.parser = parser;
    _this31.ruleIndex = LPCParser.RULE_functionalParameter;
    return _this31;
  }

  _createClass(FunctionalParameterContext, [{
    key: "FunctionalScope",
    value: function FunctionalScope() {
      return this.getToken(LPCParser.FunctionalScope, 0);
    }
  }, {
    key: "IntegerLiteral",
    value: function IntegerLiteral() {
      return this.getToken(LPCParser.IntegerLiteral, 0);
    }
  }, {
    key: "LeftParen",
    value: function LeftParen() {
      return this.getToken(LPCParser.LeftParen, 0);
    }
  }, {
    key: "expression",
    value: function expression() {
      return this.getTypedRuleContext(ExpressionContext, 0);
    }
  }, {
    key: "RightParen",
    value: function RightParen() {
      return this.getToken(LPCParser.RightParen, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterFunctionalParameter(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitFunctionalParameter(this);
      }
    }
  }]);

  return FunctionalParameterContext;
}(_antlr["default"].ParserRuleContext);

var CastOperationContext = /*#__PURE__*/function (_antlr4$ParserRuleCon31) {
  _inherits(CastOperationContext, _antlr4$ParserRuleCon31);

  var _super32 = _createSuper(CastOperationContext);

  function CastOperationContext(parser, parent, invokingState) {
    var _this32;

    _classCallCheck(this, CastOperationContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this32 = _super32.call(this, parent, invokingState);
    _this32.parser = parser;
    _this32.ruleIndex = LPCParser.RULE_castOperation;
    return _this32;
  }

  _createClass(CastOperationContext, [{
    key: "LeftParen",
    value: function LeftParen() {
      return this.getToken(LPCParser.LeftParen, 0);
    }
  }, {
    key: "dataType",
    value: function dataType() {
      return this.getTypedRuleContext(DataTypeContext, 0);
    }
  }, {
    key: "RightParen",
    value: function RightParen() {
      return this.getToken(LPCParser.RightParen, 0);
    }
  }, {
    key: "expression",
    value: function expression() {
      return this.getTypedRuleContext(ExpressionContext, 0);
    }
  }, {
    key: "array",
    value: function array() {
      return this.getTypedRuleContext(ArrayContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterCastOperation(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitCastOperation(this);
      }
    }
  }]);

  return CastOperationContext;
}(_antlr["default"].ParserRuleContext);

var ExpressionContext = /*#__PURE__*/function (_antlr4$ParserRuleCon32) {
  _inherits(ExpressionContext, _antlr4$ParserRuleCon32);

  var _super33 = _createSuper(ExpressionContext);

  function ExpressionContext(parser, parent, invokingState) {
    var _this33;

    _classCallCheck(this, ExpressionContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this33 = _super33.call(this, parent, invokingState);

    _defineProperty(_assertThisInitialized(_this33), "expression", function (i) {
      if (i === undefined) {
        i = null;
      }

      if (i === null) {
        return this.getTypedRuleContexts(ExpressionContext);
      } else {
        return this.getTypedRuleContext(ExpressionContext, i);
      }
    });

    _defineProperty(_assertThisInitialized(_this33), "StringLiteral", function (i) {
      if (i === undefined) {
        i = null;
      }

      if (i === null) {
        return this.getTokens(LPCParser.StringLiteral);
      } else {
        return this.getToken(LPCParser.StringLiteral, i);
      }
    });

    _this33.parser = parser;
    _this33.ruleIndex = LPCParser.RULE_expression;
    return _this33;
  }

  _createClass(ExpressionContext, [{
    key: "LeftParen",
    value: function LeftParen() {
      return this.getToken(LPCParser.LeftParen, 0);
    }
  }, {
    key: "RightParen",
    value: function RightParen() {
      return this.getToken(LPCParser.RightParen, 0);
    }
  }, {
    key: "literal",
    value: function literal() {
      return this.getTypedRuleContext(LiteralContext, 0);
    }
  }, {
    key: "identifier",
    value: function identifier() {
      return this.getTypedRuleContext(IdentifierContext, 0);
    }
  }, {
    key: "functionCall",
    value: function functionCall() {
      return this.getTypedRuleContext(FunctionCallContext, 0);
    }
  }, {
    key: "functionalDeclaration",
    value: function functionalDeclaration() {
      return this.getTypedRuleContext(FunctionalDeclarationContext, 0);
    }
  }, {
    key: "anonymousFunctionalDeclaration",
    value: function anonymousFunctionalDeclaration() {
      return this.getTypedRuleContext(AnonymousFunctionalDeclarationContext, 0);
    }
  }, {
    key: "mappingDeclaration",
    value: function mappingDeclaration() {
      return this.getTypedRuleContext(MappingDeclarationContext, 0);
    }
  }, {
    key: "arrayDeclaration",
    value: function arrayDeclaration() {
      return this.getTypedRuleContext(ArrayDeclarationContext, 0);
    }
  }, {
    key: "catchExpression",
    value: function catchExpression() {
      return this.getTypedRuleContext(CatchExpressionContext, 0);
    }
  }, {
    key: "newExpression",
    value: function newExpression() {
      return this.getTypedRuleContext(NewExpressionContext, 0);
    }
  }, {
    key: "PlusPlus",
    value: function PlusPlus() {
      return this.getToken(LPCParser.PlusPlus, 0);
    }
  }, {
    key: "MinusMinus",
    value: function MinusMinus() {
      return this.getToken(LPCParser.MinusMinus, 0);
    }
  }, {
    key: "unaryOperator",
    value: function unaryOperator() {
      return this.getTypedRuleContext(UnaryOperatorContext, 0);
    }
  }, {
    key: "notExpression",
    value: function notExpression() {
      return this.getTypedRuleContext(NotExpressionContext, 0);
    }
  }, {
    key: "castOperation",
    value: function castOperation() {
      return this.getTypedRuleContext(CastOperationContext, 0);
    }
  }, {
    key: "functionalParameter",
    value: function functionalParameter() {
      return this.getTypedRuleContext(FunctionalParameterContext, 0);
    }
  }, {
    key: "operator",
    value: function operator() {
      return this.getTypedRuleContext(OperatorContext, 0);
    }
  }, {
    key: "Question",
    value: function Question() {
      return this.getToken(LPCParser.Question, 0);
    }
  }, {
    key: "Colon",
    value: function Colon() {
      return this.getToken(LPCParser.Colon, 0);
    }
  }, {
    key: "indexOperator",
    value: function indexOperator() {
      return this.getTypedRuleContext(IndexOperatorContext, 0);
    }
  }, {
    key: "MemberOperator",
    value: function MemberOperator() {
      return this.getToken(LPCParser.MemberOperator, 0);
    }
  }, {
    key: "Ellipsis",
    value: function Ellipsis() {
      return this.getToken(LPCParser.Ellipsis, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterExpression(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitExpression(this);
      }
    }
  }]);

  return ExpressionContext;
}(_antlr["default"].ParserRuleContext);

var CatchExpressionContext = /*#__PURE__*/function (_antlr4$ParserRuleCon33) {
  _inherits(CatchExpressionContext, _antlr4$ParserRuleCon33);

  var _super34 = _createSuper(CatchExpressionContext);

  function CatchExpressionContext(parser, parent, invokingState) {
    var _this34;

    _classCallCheck(this, CatchExpressionContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this34 = _super34.call(this, parent, invokingState);
    _this34.parser = parser;
    _this34.ruleIndex = LPCParser.RULE_catchExpression;
    return _this34;
  }

  _createClass(CatchExpressionContext, [{
    key: "Catch",
    value: function Catch() {
      return this.getToken(LPCParser.Catch, 0);
    }
  }, {
    key: "LeftParen",
    value: function LeftParen() {
      return this.getToken(LPCParser.LeftParen, 0);
    }
  }, {
    key: "expression",
    value: function expression() {
      return this.getTypedRuleContext(ExpressionContext, 0);
    }
  }, {
    key: "RightParen",
    value: function RightParen() {
      return this.getToken(LPCParser.RightParen, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterCatchExpression(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitCatchExpression(this);
      }
    }
  }]);

  return CatchExpressionContext;
}(_antlr["default"].ParserRuleContext);

var NewExpressionContext = /*#__PURE__*/function (_antlr4$ParserRuleCon34) {
  _inherits(NewExpressionContext, _antlr4$ParserRuleCon34);

  var _super35 = _createSuper(NewExpressionContext);

  function NewExpressionContext(parser, parent, invokingState) {
    var _this35;

    _classCallCheck(this, NewExpressionContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this35 = _super35.call(this, parent, invokingState);
    _this35.parser = parser;
    _this35.ruleIndex = LPCParser.RULE_newExpression;
    return _this35;
  }

  _createClass(NewExpressionContext, [{
    key: "New",
    value: function New() {
      return this.getToken(LPCParser.New, 0);
    }
  }, {
    key: "LeftParen",
    value: function LeftParen() {
      return this.getToken(LPCParser.LeftParen, 0);
    }
  }, {
    key: "newExpressionIdentifier",
    value: function newExpressionIdentifier() {
      return this.getTypedRuleContext(NewExpressionIdentifierContext, 0);
    }
  }, {
    key: "RightParen",
    value: function RightParen() {
      return this.getToken(LPCParser.RightParen, 0);
    }
  }, {
    key: "Comma",
    value: function Comma() {
      return this.getToken(LPCParser.Comma, 0);
    }
  }, {
    key: "expressionList",
    value: function expressionList() {
      return this.getTypedRuleContext(ExpressionListContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterNewExpression(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitNewExpression(this);
      }
    }
  }]);

  return NewExpressionContext;
}(_antlr["default"].ParserRuleContext);

var NewExpressionIdentifierContext = /*#__PURE__*/function (_antlr4$ParserRuleCon35) {
  _inherits(NewExpressionIdentifierContext, _antlr4$ParserRuleCon35);

  var _super36 = _createSuper(NewExpressionIdentifierContext);

  function NewExpressionIdentifierContext(parser, parent, invokingState) {
    var _this36;

    _classCallCheck(this, NewExpressionIdentifierContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this36 = _super36.call(this, parent, invokingState);
    _this36.parser = parser;
    _this36.ruleIndex = LPCParser.RULE_newExpressionIdentifier;
    return _this36;
  }

  _createClass(NewExpressionIdentifierContext, [{
    key: "expression",
    value: function expression() {
      return this.getTypedRuleContext(ExpressionContext, 0);
    }
  }, {
    key: "classIdentifier",
    value: function classIdentifier() {
      return this.getTypedRuleContext(ClassIdentifierContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterNewExpressionIdentifier(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitNewExpressionIdentifier(this);
      }
    }
  }]);

  return NewExpressionIdentifierContext;
}(_antlr["default"].ParserRuleContext);

var OperatorContext = /*#__PURE__*/function (_antlr4$ParserRuleCon36) {
  _inherits(OperatorContext, _antlr4$ParserRuleCon36);

  var _super37 = _createSuper(OperatorContext);

  function OperatorContext(parser, parent, invokingState) {
    var _this37;

    _classCallCheck(this, OperatorContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this37 = _super37.call(this, parent, invokingState);
    _this37.parser = parser;
    _this37.ruleIndex = LPCParser.RULE_operator;
    return _this37;
  }

  _createClass(OperatorContext, [{
    key: "arithmeticOperator",
    value: function arithmeticOperator() {
      return this.getTypedRuleContext(ArithmeticOperatorContext, 0);
    }
  }, {
    key: "comparisonOperator",
    value: function comparisonOperator() {
      return this.getTypedRuleContext(ComparisonOperatorContext, 0);
    }
  }, {
    key: "bitOperator",
    value: function bitOperator() {
      return this.getTypedRuleContext(BitOperatorContext, 0);
    }
  }, {
    key: "logicalOperator",
    value: function logicalOperator() {
      return this.getTypedRuleContext(LogicalOperatorContext, 0);
    }
  }, {
    key: "assignmentOperator",
    value: function assignmentOperator() {
      return this.getTypedRuleContext(AssignmentOperatorContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterOperator(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitOperator(this);
      }
    }
  }]);

  return OperatorContext;
}(_antlr["default"].ParserRuleContext);

var AssignmentOperatorContext = /*#__PURE__*/function (_antlr4$ParserRuleCon37) {
  _inherits(AssignmentOperatorContext, _antlr4$ParserRuleCon37);

  var _super38 = _createSuper(AssignmentOperatorContext);

  function AssignmentOperatorContext(parser, parent, invokingState) {
    var _this38;

    _classCallCheck(this, AssignmentOperatorContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this38 = _super38.call(this, parent, invokingState);
    _this38.parser = parser;
    _this38.ruleIndex = LPCParser.RULE_assignmentOperator;
    return _this38;
  }

  _createClass(AssignmentOperatorContext, [{
    key: "Assign",
    value: function Assign() {
      return this.getToken(LPCParser.Assign, 0);
    }
  }, {
    key: "AddAssign",
    value: function AddAssign() {
      return this.getToken(LPCParser.AddAssign, 0);
    }
  }, {
    key: "SubtractAssign",
    value: function SubtractAssign() {
      return this.getToken(LPCParser.SubtractAssign, 0);
    }
  }, {
    key: "MultiplyAssign",
    value: function MultiplyAssign() {
      return this.getToken(LPCParser.MultiplyAssign, 0);
    }
  }, {
    key: "DivideAssign",
    value: function DivideAssign() {
      return this.getToken(LPCParser.DivideAssign, 0);
    }
  }, {
    key: "ModulusAssign",
    value: function ModulusAssign() {
      return this.getToken(LPCParser.ModulusAssign, 0);
    }
  }, {
    key: "LeftShiftAssign",
    value: function LeftShiftAssign() {
      return this.getToken(LPCParser.LeftShiftAssign, 0);
    }
  }, {
    key: "RightShiftAssign",
    value: function RightShiftAssign() {
      return this.getToken(LPCParser.RightShiftAssign, 0);
    }
  }, {
    key: "BitAndAssign",
    value: function BitAndAssign() {
      return this.getToken(LPCParser.BitAndAssign, 0);
    }
  }, {
    key: "BitXorAssign",
    value: function BitXorAssign() {
      return this.getToken(LPCParser.BitXorAssign, 0);
    }
  }, {
    key: "BitOrAssign",
    value: function BitOrAssign() {
      return this.getToken(LPCParser.BitOrAssign, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterAssignmentOperator(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitAssignmentOperator(this);
      }
    }
  }]);

  return AssignmentOperatorContext;
}(_antlr["default"].ParserRuleContext);

var NotExpressionContext = /*#__PURE__*/function (_antlr4$ParserRuleCon38) {
  _inherits(NotExpressionContext, _antlr4$ParserRuleCon38);

  var _super39 = _createSuper(NotExpressionContext);

  function NotExpressionContext(parser, parent, invokingState) {
    var _this39;

    _classCallCheck(this, NotExpressionContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this39 = _super39.call(this, parent, invokingState);
    _this39.parser = parser;
    _this39.ruleIndex = LPCParser.RULE_notExpression;
    return _this39;
  }

  _createClass(NotExpressionContext, [{
    key: "Not",
    value: function Not() {
      return this.getToken(LPCParser.Not, 0);
    }
  }, {
    key: "expression",
    value: function expression() {
      return this.getTypedRuleContext(ExpressionContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterNotExpression(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitNotExpression(this);
      }
    }
  }]);

  return NotExpressionContext;
}(_antlr["default"].ParserRuleContext);

var UnaryOperatorContext = /*#__PURE__*/function (_antlr4$ParserRuleCon39) {
  _inherits(UnaryOperatorContext, _antlr4$ParserRuleCon39);

  var _super40 = _createSuper(UnaryOperatorContext);

  function UnaryOperatorContext(parser, parent, invokingState) {
    var _this40;

    _classCallCheck(this, UnaryOperatorContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this40 = _super40.call(this, parent, invokingState);
    _this40.parser = parser;
    _this40.ruleIndex = LPCParser.RULE_unaryOperator;
    return _this40;
  }

  _createClass(UnaryOperatorContext, [{
    key: "Add",
    value: function Add() {
      return this.getToken(LPCParser.Add, 0);
    }
  }, {
    key: "expression",
    value: function expression() {
      return this.getTypedRuleContext(ExpressionContext, 0);
    }
  }, {
    key: "Subtract",
    value: function Subtract() {
      return this.getToken(LPCParser.Subtract, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterUnaryOperator(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitUnaryOperator(this);
      }
    }
  }]);

  return UnaryOperatorContext;
}(_antlr["default"].ParserRuleContext);

var LiteralContext = /*#__PURE__*/function (_antlr4$ParserRuleCon40) {
  _inherits(LiteralContext, _antlr4$ParserRuleCon40);

  var _super41 = _createSuper(LiteralContext);

  function LiteralContext(parser, parent, invokingState) {
    var _this41;

    _classCallCheck(this, LiteralContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this41 = _super41.call(this, parent, invokingState);
    _this41.parser = parser;
    _this41.ruleIndex = LPCParser.RULE_literal;
    return _this41;
  }

  _createClass(LiteralContext, [{
    key: "StringLiteral",
    value: function StringLiteral() {
      return this.getToken(LPCParser.StringLiteral, 0);
    }
  }, {
    key: "IntegerLiteral",
    value: function IntegerLiteral() {
      return this.getToken(LPCParser.IntegerLiteral, 0);
    }
  }, {
    key: "FloatLiteral",
    value: function FloatLiteral() {
      return this.getToken(LPCParser.FloatLiteral, 0);
    }
  }, {
    key: "CharacterLiteral",
    value: function CharacterLiteral() {
      return this.getToken(LPCParser.CharacterLiteral, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterLiteral(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitLiteral(this);
      }
    }
  }]);

  return LiteralContext;
}(_antlr["default"].ParserRuleContext);

var MappingDeclarationContext = /*#__PURE__*/function (_antlr4$ParserRuleCon41) {
  _inherits(MappingDeclarationContext, _antlr4$ParserRuleCon41);

  var _super42 = _createSuper(MappingDeclarationContext);

  function MappingDeclarationContext(parser, parent, invokingState) {
    var _this42;

    _classCallCheck(this, MappingDeclarationContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this42 = _super42.call(this, parent, invokingState);
    _this42.parser = parser;
    _this42.ruleIndex = LPCParser.RULE_mappingDeclaration;
    return _this42;
  }

  _createClass(MappingDeclarationContext, [{
    key: "mappingStart",
    value: function mappingStart() {
      return this.getTypedRuleContext(MappingStartContext, 0);
    }
  }, {
    key: "mappingEnd",
    value: function mappingEnd() {
      return this.getTypedRuleContext(MappingEndContext, 0);
    }
  }, {
    key: "mappingElementList",
    value: function mappingElementList() {
      return this.getTypedRuleContext(MappingElementListContext, 0);
    }
  }, {
    key: "Comma",
    value: function Comma() {
      return this.getToken(LPCParser.Comma, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterMappingDeclaration(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitMappingDeclaration(this);
      }
    }
  }]);

  return MappingDeclarationContext;
}(_antlr["default"].ParserRuleContext);

var MappingStartContext = /*#__PURE__*/function (_antlr4$ParserRuleCon42) {
  _inherits(MappingStartContext, _antlr4$ParserRuleCon42);

  var _super43 = _createSuper(MappingStartContext);

  function MappingStartContext(parser, parent, invokingState) {
    var _this43;

    _classCallCheck(this, MappingStartContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this43 = _super43.call(this, parent, invokingState);
    _this43.parser = parser;
    _this43.ruleIndex = LPCParser.RULE_mappingStart;
    return _this43;
  }

  _createClass(MappingStartContext, [{
    key: "LeftParen",
    value: function LeftParen() {
      return this.getToken(LPCParser.LeftParen, 0);
    }
  }, {
    key: "LeftBracket",
    value: function LeftBracket() {
      return this.getToken(LPCParser.LeftBracket, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterMappingStart(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitMappingStart(this);
      }
    }
  }]);

  return MappingStartContext;
}(_antlr["default"].ParserRuleContext);

var MappingEndContext = /*#__PURE__*/function (_antlr4$ParserRuleCon43) {
  _inherits(MappingEndContext, _antlr4$ParserRuleCon43);

  var _super44 = _createSuper(MappingEndContext);

  function MappingEndContext(parser, parent, invokingState) {
    var _this44;

    _classCallCheck(this, MappingEndContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this44 = _super44.call(this, parent, invokingState);
    _this44.parser = parser;
    _this44.ruleIndex = LPCParser.RULE_mappingEnd;
    return _this44;
  }

  _createClass(MappingEndContext, [{
    key: "RightBracket",
    value: function RightBracket() {
      return this.getToken(LPCParser.RightBracket, 0);
    }
  }, {
    key: "RightParen",
    value: function RightParen() {
      return this.getToken(LPCParser.RightParen, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterMappingEnd(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitMappingEnd(this);
      }
    }
  }]);

  return MappingEndContext;
}(_antlr["default"].ParserRuleContext);

var MappingElementListContext = /*#__PURE__*/function (_antlr4$ParserRuleCon44) {
  _inherits(MappingElementListContext, _antlr4$ParserRuleCon44);

  var _super45 = _createSuper(MappingElementListContext);

  function MappingElementListContext(parser, parent, invokingState) {
    var _this45;

    _classCallCheck(this, MappingElementListContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this45 = _super45.call(this, parent, invokingState);

    _defineProperty(_assertThisInitialized(_this45), "mappingElement", function (i) {
      if (i === undefined) {
        i = null;
      }

      if (i === null) {
        return this.getTypedRuleContexts(MappingElementContext);
      } else {
        return this.getTypedRuleContext(MappingElementContext, i);
      }
    });

    _defineProperty(_assertThisInitialized(_this45), "Comma", function (i) {
      if (i === undefined) {
        i = null;
      }

      if (i === null) {
        return this.getTokens(LPCParser.Comma);
      } else {
        return this.getToken(LPCParser.Comma, i);
      }
    });

    _this45.parser = parser;
    _this45.ruleIndex = LPCParser.RULE_mappingElementList;
    return _this45;
  }

  _createClass(MappingElementListContext, [{
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterMappingElementList(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitMappingElementList(this);
      }
    }
  }]);

  return MappingElementListContext;
}(_antlr["default"].ParserRuleContext);

var MappingElementContext = /*#__PURE__*/function (_antlr4$ParserRuleCon45) {
  _inherits(MappingElementContext, _antlr4$ParserRuleCon45);

  var _super46 = _createSuper(MappingElementContext);

  function MappingElementContext(parser, parent, invokingState) {
    var _this46;

    _classCallCheck(this, MappingElementContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this46 = _super46.call(this, parent, invokingState);
    _this46.parser = parser;
    _this46.ruleIndex = LPCParser.RULE_mappingElement;
    return _this46;
  }

  _createClass(MappingElementContext, [{
    key: "mappingKey",
    value: function mappingKey() {
      return this.getTypedRuleContext(MappingKeyContext, 0);
    }
  }, {
    key: "Colon",
    value: function Colon() {
      return this.getToken(LPCParser.Colon, 0);
    }
  }, {
    key: "mappingValue",
    value: function mappingValue() {
      return this.getTypedRuleContext(MappingValueContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterMappingElement(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitMappingElement(this);
      }
    }
  }]);

  return MappingElementContext;
}(_antlr["default"].ParserRuleContext);

var MappingKeyContext = /*#__PURE__*/function (_antlr4$ParserRuleCon46) {
  _inherits(MappingKeyContext, _antlr4$ParserRuleCon46);

  var _super47 = _createSuper(MappingKeyContext);

  function MappingKeyContext(parser, parent, invokingState) {
    var _this47;

    _classCallCheck(this, MappingKeyContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this47 = _super47.call(this, parent, invokingState);
    _this47.parser = parser;
    _this47.ruleIndex = LPCParser.RULE_mappingKey;
    return _this47;
  }

  _createClass(MappingKeyContext, [{
    key: "expression",
    value: function expression() {
      return this.getTypedRuleContext(ExpressionContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterMappingKey(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitMappingKey(this);
      }
    }
  }]);

  return MappingKeyContext;
}(_antlr["default"].ParserRuleContext);

var MappingValueContext = /*#__PURE__*/function (_antlr4$ParserRuleCon47) {
  _inherits(MappingValueContext, _antlr4$ParserRuleCon47);

  var _super48 = _createSuper(MappingValueContext);

  function MappingValueContext(parser, parent, invokingState) {
    var _this48;

    _classCallCheck(this, MappingValueContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this48 = _super48.call(this, parent, invokingState);
    _this48.parser = parser;
    _this48.ruleIndex = LPCParser.RULE_mappingValue;
    return _this48;
  }

  _createClass(MappingValueContext, [{
    key: "expression",
    value: function expression() {
      return this.getTypedRuleContext(ExpressionContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterMappingValue(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitMappingValue(this);
      }
    }
  }]);

  return MappingValueContext;
}(_antlr["default"].ParserRuleContext);

var ArrayDeclarationContext = /*#__PURE__*/function (_antlr4$ParserRuleCon48) {
  _inherits(ArrayDeclarationContext, _antlr4$ParserRuleCon48);

  var _super49 = _createSuper(ArrayDeclarationContext);

  function ArrayDeclarationContext(parser, parent, invokingState) {
    var _this49;

    _classCallCheck(this, ArrayDeclarationContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this49 = _super49.call(this, parent, invokingState);
    _this49.parser = parser;
    _this49.ruleIndex = LPCParser.RULE_arrayDeclaration;
    return _this49;
  }

  _createClass(ArrayDeclarationContext, [{
    key: "arrayStart",
    value: function arrayStart() {
      return this.getTypedRuleContext(ArrayStartContext, 0);
    }
  }, {
    key: "arrayEnd",
    value: function arrayEnd() {
      return this.getTypedRuleContext(ArrayEndContext, 0);
    }
  }, {
    key: "expressionList",
    value: function expressionList() {
      return this.getTypedRuleContext(ExpressionListContext, 0);
    }
  }, {
    key: "Comma",
    value: function Comma() {
      return this.getToken(LPCParser.Comma, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterArrayDeclaration(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitArrayDeclaration(this);
      }
    }
  }]);

  return ArrayDeclarationContext;
}(_antlr["default"].ParserRuleContext);

var ArrayStartContext = /*#__PURE__*/function (_antlr4$ParserRuleCon49) {
  _inherits(ArrayStartContext, _antlr4$ParserRuleCon49);

  var _super50 = _createSuper(ArrayStartContext);

  function ArrayStartContext(parser, parent, invokingState) {
    var _this50;

    _classCallCheck(this, ArrayStartContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this50 = _super50.call(this, parent, invokingState);
    _this50.parser = parser;
    _this50.ruleIndex = LPCParser.RULE_arrayStart;
    return _this50;
  }

  _createClass(ArrayStartContext, [{
    key: "LeftParen",
    value: function LeftParen() {
      return this.getToken(LPCParser.LeftParen, 0);
    }
  }, {
    key: "LeftBrace",
    value: function LeftBrace() {
      return this.getToken(LPCParser.LeftBrace, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterArrayStart(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitArrayStart(this);
      }
    }
  }]);

  return ArrayStartContext;
}(_antlr["default"].ParserRuleContext);

var ArrayEndContext = /*#__PURE__*/function (_antlr4$ParserRuleCon50) {
  _inherits(ArrayEndContext, _antlr4$ParserRuleCon50);

  var _super51 = _createSuper(ArrayEndContext);

  function ArrayEndContext(parser, parent, invokingState) {
    var _this51;

    _classCallCheck(this, ArrayEndContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this51 = _super51.call(this, parent, invokingState);
    _this51.parser = parser;
    _this51.ruleIndex = LPCParser.RULE_arrayEnd;
    return _this51;
  }

  _createClass(ArrayEndContext, [{
    key: "RightBrace",
    value: function RightBrace() {
      return this.getToken(LPCParser.RightBrace, 0);
    }
  }, {
    key: "RightParen",
    value: function RightParen() {
      return this.getToken(LPCParser.RightParen, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterArrayEnd(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitArrayEnd(this);
      }
    }
  }]);

  return ArrayEndContext;
}(_antlr["default"].ParserRuleContext);

var IndexOperatorContext = /*#__PURE__*/function (_antlr4$ParserRuleCon51) {
  _inherits(IndexOperatorContext, _antlr4$ParserRuleCon51);

  var _super52 = _createSuper(IndexOperatorContext);

  function IndexOperatorContext(parser, parent, invokingState) {
    var _this52;

    _classCallCheck(this, IndexOperatorContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this52 = _super52.call(this, parent, invokingState);
    _this52.parser = parser;
    _this52.ruleIndex = LPCParser.RULE_indexOperator;
    return _this52;
  }

  _createClass(IndexOperatorContext, [{
    key: "LeftBracket",
    value: function LeftBracket() {
      return this.getToken(LPCParser.LeftBracket, 0);
    }
  }, {
    key: "range",
    value: function range() {
      return this.getTypedRuleContext(RangeContext, 0);
    }
  }, {
    key: "RightBracket",
    value: function RightBracket() {
      return this.getToken(LPCParser.RightBracket, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterIndexOperator(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitIndexOperator(this);
      }
    }
  }]);

  return IndexOperatorContext;
}(_antlr["default"].ParserRuleContext);

var IndexContext = /*#__PURE__*/function (_antlr4$ParserRuleCon52) {
  _inherits(IndexContext, _antlr4$ParserRuleCon52);

  var _super53 = _createSuper(IndexContext);

  function IndexContext(parser, parent, invokingState) {
    var _this53;

    _classCallCheck(this, IndexContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this53 = _super53.call(this, parent, invokingState);
    _this53.parser = parser;
    _this53.ruleIndex = LPCParser.RULE_index;
    return _this53;
  }

  _createClass(IndexContext, [{
    key: "expression",
    value: function expression() {
      return this.getTypedRuleContext(ExpressionContext, 0);
    }
  }, {
    key: "LessThan",
    value: function LessThan() {
      return this.getToken(LPCParser.LessThan, 0);
    }
  }, {
    key: "index",
    value: function index() {
      return this.getTypedRuleContext(IndexContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterIndex(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitIndex(this);
      }
    }
  }]);

  return IndexContext;
}(_antlr["default"].ParserRuleContext);

var RangeContext = /*#__PURE__*/function (_antlr4$ParserRuleCon53) {
  _inherits(RangeContext, _antlr4$ParserRuleCon53);

  var _super54 = _createSuper(RangeContext);

  function RangeContext(parser, parent, invokingState) {
    var _this54;

    _classCallCheck(this, RangeContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this54 = _super54.call(this, parent, invokingState);

    _defineProperty(_assertThisInitialized(_this54), "index", function (i) {
      if (i === undefined) {
        i = null;
      }

      if (i === null) {
        return this.getTypedRuleContexts(IndexContext);
      } else {
        return this.getTypedRuleContext(IndexContext, i);
      }
    });

    _this54.parser = parser;
    _this54.ruleIndex = LPCParser.RULE_range;
    return _this54;
  }

  _createClass(RangeContext, [{
    key: "Range",
    value: function Range() {
      return this.getToken(LPCParser.Range, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterRange(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitRange(this);
      }
    }
  }]);

  return RangeContext;
}(_antlr["default"].ParserRuleContext);

var BlockContext = /*#__PURE__*/function (_antlr4$ParserRuleCon54) {
  _inherits(BlockContext, _antlr4$ParserRuleCon54);

  var _super55 = _createSuper(BlockContext);

  function BlockContext(parser, parent, invokingState) {
    var _this55;

    _classCallCheck(this, BlockContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this55 = _super55.call(this, parent, invokingState);

    _defineProperty(_assertThisInitialized(_this55), "statement", function (i) {
      if (i === undefined) {
        i = null;
      }

      if (i === null) {
        return this.getTypedRuleContexts(StatementContext);
      } else {
        return this.getTypedRuleContext(StatementContext, i);
      }
    });

    _this55.parser = parser;
    _this55.ruleIndex = LPCParser.RULE_block;
    return _this55;
  }

  _createClass(BlockContext, [{
    key: "LeftBrace",
    value: function LeftBrace() {
      return this.getToken(LPCParser.LeftBrace, 0);
    }
  }, {
    key: "RightBrace",
    value: function RightBrace() {
      return this.getToken(LPCParser.RightBrace, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterBlock(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitBlock(this);
      }
    }
  }]);

  return BlockContext;
}(_antlr["default"].ParserRuleContext);

var StatementContext = /*#__PURE__*/function (_antlr4$ParserRuleCon55) {
  _inherits(StatementContext, _antlr4$ParserRuleCon55);

  var _super56 = _createSuper(StatementContext);

  function StatementContext(parser, parent, invokingState) {
    var _this56;

    _classCallCheck(this, StatementContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this56 = _super56.call(this, parent, invokingState);
    _this56.parser = parser;
    _this56.ruleIndex = LPCParser.RULE_statement;
    return _this56;
  }

  _createClass(StatementContext, [{
    key: "variableDeclaration",
    value: function variableDeclaration() {
      return this.getTypedRuleContext(VariableDeclarationContext, 0);
    }
  }, {
    key: "expression",
    value: function expression() {
      return this.getTypedRuleContext(ExpressionContext, 0);
    }
  }, {
    key: "SemiColon",
    value: function SemiColon() {
      return this.getToken(LPCParser.SemiColon, 0);
    }
  }, {
    key: "conditionalStatement",
    value: function conditionalStatement() {
      return this.getTypedRuleContext(ConditionalStatementContext, 0);
    }
  }, {
    key: "switchStatement",
    value: function switchStatement() {
      return this.getTypedRuleContext(SwitchStatementContext, 0);
    }
  }, {
    key: "loopStatement",
    value: function loopStatement() {
      return this.getTypedRuleContext(LoopStatementContext, 0);
    }
  }, {
    key: "breakStatement",
    value: function breakStatement() {
      return this.getTypedRuleContext(BreakStatementContext, 0);
    }
  }, {
    key: "continueStatement",
    value: function continueStatement() {
      return this.getTypedRuleContext(ContinueStatementContext, 0);
    }
  }, {
    key: "returnStatement",
    value: function returnStatement() {
      return this.getTypedRuleContext(ReturnStatementContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterStatement(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitStatement(this);
      }
    }
  }]);

  return StatementContext;
}(_antlr["default"].ParserRuleContext);

var BreakStatementContext = /*#__PURE__*/function (_antlr4$ParserRuleCon56) {
  _inherits(BreakStatementContext, _antlr4$ParserRuleCon56);

  var _super57 = _createSuper(BreakStatementContext);

  function BreakStatementContext(parser, parent, invokingState) {
    var _this57;

    _classCallCheck(this, BreakStatementContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this57 = _super57.call(this, parent, invokingState);
    _this57.parser = parser;
    _this57.ruleIndex = LPCParser.RULE_breakStatement;
    return _this57;
  }

  _createClass(BreakStatementContext, [{
    key: "Break",
    value: function Break() {
      return this.getToken(LPCParser.Break, 0);
    }
  }, {
    key: "SemiColon",
    value: function SemiColon() {
      return this.getToken(LPCParser.SemiColon, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterBreakStatement(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitBreakStatement(this);
      }
    }
  }]);

  return BreakStatementContext;
}(_antlr["default"].ParserRuleContext);

var ContinueStatementContext = /*#__PURE__*/function (_antlr4$ParserRuleCon57) {
  _inherits(ContinueStatementContext, _antlr4$ParserRuleCon57);

  var _super58 = _createSuper(ContinueStatementContext);

  function ContinueStatementContext(parser, parent, invokingState) {
    var _this58;

    _classCallCheck(this, ContinueStatementContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this58 = _super58.call(this, parent, invokingState);
    _this58.parser = parser;
    _this58.ruleIndex = LPCParser.RULE_continueStatement;
    return _this58;
  }

  _createClass(ContinueStatementContext, [{
    key: "Continue",
    value: function Continue() {
      return this.getToken(LPCParser.Continue, 0);
    }
  }, {
    key: "SemiColon",
    value: function SemiColon() {
      return this.getToken(LPCParser.SemiColon, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterContinueStatement(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitContinueStatement(this);
      }
    }
  }]);

  return ContinueStatementContext;
}(_antlr["default"].ParserRuleContext);

var StatementOrBlockContext = /*#__PURE__*/function (_antlr4$ParserRuleCon58) {
  _inherits(StatementOrBlockContext, _antlr4$ParserRuleCon58);

  var _super59 = _createSuper(StatementOrBlockContext);

  function StatementOrBlockContext(parser, parent, invokingState) {
    var _this59;

    _classCallCheck(this, StatementOrBlockContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this59 = _super59.call(this, parent, invokingState);
    _this59.parser = parser;
    _this59.ruleIndex = LPCParser.RULE_statementOrBlock;
    return _this59;
  }

  _createClass(StatementOrBlockContext, [{
    key: "statement",
    value: function statement() {
      return this.getTypedRuleContext(StatementContext, 0);
    }
  }, {
    key: "block",
    value: function block() {
      return this.getTypedRuleContext(BlockContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterStatementOrBlock(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitStatementOrBlock(this);
      }
    }
  }]);

  return StatementOrBlockContext;
}(_antlr["default"].ParserRuleContext);

var LoopStatementContext = /*#__PURE__*/function (_antlr4$ParserRuleCon59) {
  _inherits(LoopStatementContext, _antlr4$ParserRuleCon59);

  var _super60 = _createSuper(LoopStatementContext);

  function LoopStatementContext(parser, parent, invokingState) {
    var _this60;

    _classCallCheck(this, LoopStatementContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this60 = _super60.call(this, parent, invokingState);
    _this60.parser = parser;
    _this60.ruleIndex = LPCParser.RULE_loopStatement;
    return _this60;
  }

  _createClass(LoopStatementContext, [{
    key: "doLoopStatement",
    value: function doLoopStatement() {
      return this.getTypedRuleContext(DoLoopStatementContext, 0);
    }
  }, {
    key: "whileLoopStatement",
    value: function whileLoopStatement() {
      return this.getTypedRuleContext(WhileLoopStatementContext, 0);
    }
  }, {
    key: "forLoopStatement",
    value: function forLoopStatement() {
      return this.getTypedRuleContext(ForLoopStatementContext, 0);
    }
  }, {
    key: "foreachLoopStatement",
    value: function foreachLoopStatement() {
      return this.getTypedRuleContext(ForeachLoopStatementContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterLoopStatement(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitLoopStatement(this);
      }
    }
  }]);

  return LoopStatementContext;
}(_antlr["default"].ParserRuleContext);

var WhileControlStatementContext = /*#__PURE__*/function (_antlr4$ParserRuleCon60) {
  _inherits(WhileControlStatementContext, _antlr4$ParserRuleCon60);

  var _super61 = _createSuper(WhileControlStatementContext);

  function WhileControlStatementContext(parser, parent, invokingState) {
    var _this61;

    _classCallCheck(this, WhileControlStatementContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this61 = _super61.call(this, parent, invokingState);
    _this61.parser = parser;
    _this61.ruleIndex = LPCParser.RULE_whileControlStatement;
    return _this61;
  }

  _createClass(WhileControlStatementContext, [{
    key: "While",
    value: function While() {
      return this.getToken(LPCParser.While, 0);
    }
  }, {
    key: "LeftParen",
    value: function LeftParen() {
      return this.getToken(LPCParser.LeftParen, 0);
    }
  }, {
    key: "expression",
    value: function expression() {
      return this.getTypedRuleContext(ExpressionContext, 0);
    }
  }, {
    key: "RightParen",
    value: function RightParen() {
      return this.getToken(LPCParser.RightParen, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterWhileControlStatement(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitWhileControlStatement(this);
      }
    }
  }]);

  return WhileControlStatementContext;
}(_antlr["default"].ParserRuleContext);

var DoLoopStatementContext = /*#__PURE__*/function (_antlr4$ParserRuleCon61) {
  _inherits(DoLoopStatementContext, _antlr4$ParserRuleCon61);

  var _super62 = _createSuper(DoLoopStatementContext);

  function DoLoopStatementContext(parser, parent, invokingState) {
    var _this62;

    _classCallCheck(this, DoLoopStatementContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this62 = _super62.call(this, parent, invokingState);
    _this62.parser = parser;
    _this62.ruleIndex = LPCParser.RULE_doLoopStatement;
    return _this62;
  }

  _createClass(DoLoopStatementContext, [{
    key: "Do",
    value: function Do() {
      return this.getToken(LPCParser.Do, 0);
    }
  }, {
    key: "statementOrBlock",
    value: function statementOrBlock() {
      return this.getTypedRuleContext(StatementOrBlockContext, 0);
    }
  }, {
    key: "whileControlStatement",
    value: function whileControlStatement() {
      return this.getTypedRuleContext(WhileControlStatementContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterDoLoopStatement(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitDoLoopStatement(this);
      }
    }
  }]);

  return DoLoopStatementContext;
}(_antlr["default"].ParserRuleContext);

var WhileLoopStatementContext = /*#__PURE__*/function (_antlr4$ParserRuleCon62) {
  _inherits(WhileLoopStatementContext, _antlr4$ParserRuleCon62);

  var _super63 = _createSuper(WhileLoopStatementContext);

  function WhileLoopStatementContext(parser, parent, invokingState) {
    var _this63;

    _classCallCheck(this, WhileLoopStatementContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this63 = _super63.call(this, parent, invokingState);
    _this63.parser = parser;
    _this63.ruleIndex = LPCParser.RULE_whileLoopStatement;
    return _this63;
  }

  _createClass(WhileLoopStatementContext, [{
    key: "whileControlStatement",
    value: function whileControlStatement() {
      return this.getTypedRuleContext(WhileControlStatementContext, 0);
    }
  }, {
    key: "statementOrBlock",
    value: function statementOrBlock() {
      return this.getTypedRuleContext(StatementOrBlockContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterWhileLoopStatement(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitWhileLoopStatement(this);
      }
    }
  }]);

  return WhileLoopStatementContext;
}(_antlr["default"].ParserRuleContext);

var ForControlStatementContext = /*#__PURE__*/function (_antlr4$ParserRuleCon63) {
  _inherits(ForControlStatementContext, _antlr4$ParserRuleCon63);

  var _super64 = _createSuper(ForControlStatementContext);

  function ForControlStatementContext(parser, parent, invokingState) {
    var _this64;

    _classCallCheck(this, ForControlStatementContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this64 = _super64.call(this, parent, invokingState);

    _defineProperty(_assertThisInitialized(_this64), "SemiColon", function (i) {
      if (i === undefined) {
        i = null;
      }

      if (i === null) {
        return this.getTokens(LPCParser.SemiColon);
      } else {
        return this.getToken(LPCParser.SemiColon, i);
      }
    });

    _this64.parser = parser;
    _this64.ruleIndex = LPCParser.RULE_forControlStatement;
    return _this64;
  }

  _createClass(ForControlStatementContext, [{
    key: "For",
    value: function For() {
      return this.getToken(LPCParser.For, 0);
    }
  }, {
    key: "LeftParen",
    value: function LeftParen() {
      return this.getToken(LPCParser.LeftParen, 0);
    }
  }, {
    key: "RightParen",
    value: function RightParen() {
      return this.getToken(LPCParser.RightParen, 0);
    }
  }, {
    key: "forInitialState",
    value: function forInitialState() {
      return this.getTypedRuleContext(ForInitialStateContext, 0);
    }
  }, {
    key: "forCondition",
    value: function forCondition() {
      return this.getTypedRuleContext(ForConditionContext, 0);
    }
  }, {
    key: "forIncrementStep",
    value: function forIncrementStep() {
      return this.getTypedRuleContext(ForIncrementStepContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterForControlStatement(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitForControlStatement(this);
      }
    }
  }]);

  return ForControlStatementContext;
}(_antlr["default"].ParserRuleContext);

var ForLoopStatementContext = /*#__PURE__*/function (_antlr4$ParserRuleCon64) {
  _inherits(ForLoopStatementContext, _antlr4$ParserRuleCon64);

  var _super65 = _createSuper(ForLoopStatementContext);

  function ForLoopStatementContext(parser, parent, invokingState) {
    var _this65;

    _classCallCheck(this, ForLoopStatementContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this65 = _super65.call(this, parent, invokingState);
    _this65.parser = parser;
    _this65.ruleIndex = LPCParser.RULE_forLoopStatement;
    return _this65;
  }

  _createClass(ForLoopStatementContext, [{
    key: "forControlStatement",
    value: function forControlStatement() {
      return this.getTypedRuleContext(ForControlStatementContext, 0);
    }
  }, {
    key: "statementOrBlock",
    value: function statementOrBlock() {
      return this.getTypedRuleContext(StatementOrBlockContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterForLoopStatement(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitForLoopStatement(this);
      }
    }
  }]);

  return ForLoopStatementContext;
}(_antlr["default"].ParserRuleContext);

var ForInitialStateContext = /*#__PURE__*/function (_antlr4$ParserRuleCon65) {
  _inherits(ForInitialStateContext, _antlr4$ParserRuleCon65);

  var _super66 = _createSuper(ForInitialStateContext);

  function ForInitialStateContext(parser, parent, invokingState) {
    var _this66;

    _classCallCheck(this, ForInitialStateContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this66 = _super66.call(this, parent, invokingState);
    _this66.parser = parser;
    _this66.ruleIndex = LPCParser.RULE_forInitialState;
    return _this66;
  }

  _createClass(ForInitialStateContext, [{
    key: "forLoopVariable",
    value: function forLoopVariable() {
      return this.getTypedRuleContext(ForLoopVariableContext, 0);
    }
  }, {
    key: "Comma",
    value: function Comma() {
      return this.getToken(LPCParser.Comma, 0);
    }
  }, {
    key: "forInitialState",
    value: function forInitialState() {
      return this.getTypedRuleContext(ForInitialStateContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterForInitialState(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitForInitialState(this);
      }
    }
  }]);

  return ForInitialStateContext;
}(_antlr["default"].ParserRuleContext);

var ForLoopVariableContext = /*#__PURE__*/function (_antlr4$ParserRuleCon66) {
  _inherits(ForLoopVariableContext, _antlr4$ParserRuleCon66);

  var _super67 = _createSuper(ForLoopVariableContext);

  function ForLoopVariableContext(parser, parent, invokingState) {
    var _this67;

    _classCallCheck(this, ForLoopVariableContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this67 = _super67.call(this, parent, invokingState);
    _this67.parser = parser;
    _this67.ruleIndex = LPCParser.RULE_forLoopVariable;
    return _this67;
  }

  _createClass(ForLoopVariableContext, [{
    key: "variable",
    value: function variable() {
      return this.getTypedRuleContext(VariableContext, 0);
    }
  }, {
    key: "dataType",
    value: function dataType() {
      return this.getTypedRuleContext(DataTypeContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterForLoopVariable(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitForLoopVariable(this);
      }
    }
  }]);

  return ForLoopVariableContext;
}(_antlr["default"].ParserRuleContext);

var ForConditionContext = /*#__PURE__*/function (_antlr4$ParserRuleCon67) {
  _inherits(ForConditionContext, _antlr4$ParserRuleCon67);

  var _super68 = _createSuper(ForConditionContext);

  function ForConditionContext(parser, parent, invokingState) {
    var _this68;

    _classCallCheck(this, ForConditionContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this68 = _super68.call(this, parent, invokingState);
    _this68.parser = parser;
    _this68.ruleIndex = LPCParser.RULE_forCondition;
    return _this68;
  }

  _createClass(ForConditionContext, [{
    key: "expressionList",
    value: function expressionList() {
      return this.getTypedRuleContext(ExpressionListContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterForCondition(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitForCondition(this);
      }
    }
  }]);

  return ForConditionContext;
}(_antlr["default"].ParserRuleContext);

var ForIncrementStepContext = /*#__PURE__*/function (_antlr4$ParserRuleCon68) {
  _inherits(ForIncrementStepContext, _antlr4$ParserRuleCon68);

  var _super69 = _createSuper(ForIncrementStepContext);

  function ForIncrementStepContext(parser, parent, invokingState) {
    var _this69;

    _classCallCheck(this, ForIncrementStepContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this69 = _super69.call(this, parent, invokingState);
    _this69.parser = parser;
    _this69.ruleIndex = LPCParser.RULE_forIncrementStep;
    return _this69;
  }

  _createClass(ForIncrementStepContext, [{
    key: "expressionList",
    value: function expressionList() {
      return this.getTypedRuleContext(ExpressionListContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterForIncrementStep(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitForIncrementStep(this);
      }
    }
  }]);

  return ForIncrementStepContext;
}(_antlr["default"].ParserRuleContext);

var ForeachLoopStatementContext = /*#__PURE__*/function (_antlr4$ParserRuleCon69) {
  _inherits(ForeachLoopStatementContext, _antlr4$ParserRuleCon69);

  var _super70 = _createSuper(ForeachLoopStatementContext);

  function ForeachLoopStatementContext(parser, parent, invokingState) {
    var _this70;

    _classCallCheck(this, ForeachLoopStatementContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this70 = _super70.call(this, parent, invokingState);
    _this70.parser = parser;
    _this70.ruleIndex = LPCParser.RULE_foreachLoopStatement;
    return _this70;
  }

  _createClass(ForeachLoopStatementContext, [{
    key: "foreachControlStatement",
    value: function foreachControlStatement() {
      return this.getTypedRuleContext(ForeachControlStatementContext, 0);
    }
  }, {
    key: "statementOrBlock",
    value: function statementOrBlock() {
      return this.getTypedRuleContext(StatementOrBlockContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterForeachLoopStatement(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitForeachLoopStatement(this);
      }
    }
  }]);

  return ForeachLoopStatementContext;
}(_antlr["default"].ParserRuleContext);

var ForeachControlStatementContext = /*#__PURE__*/function (_antlr4$ParserRuleCon70) {
  _inherits(ForeachControlStatementContext, _antlr4$ParserRuleCon70);

  var _super71 = _createSuper(ForeachControlStatementContext);

  function ForeachControlStatementContext(parser, parent, invokingState) {
    var _this71;

    _classCallCheck(this, ForeachControlStatementContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this71 = _super71.call(this, parent, invokingState);
    _this71.parser = parser;
    _this71.ruleIndex = LPCParser.RULE_foreachControlStatement;
    return _this71;
  }

  _createClass(ForeachControlStatementContext, [{
    key: "Foreach",
    value: function Foreach() {
      return this.getToken(LPCParser.Foreach, 0);
    }
  }, {
    key: "LeftParen",
    value: function LeftParen() {
      return this.getToken(LPCParser.LeftParen, 0);
    }
  }, {
    key: "foreachVariableList",
    value: function foreachVariableList() {
      return this.getTypedRuleContext(ForeachVariableListContext, 0);
    }
  }, {
    key: "In",
    value: function In() {
      return this.getToken(LPCParser.In, 0);
    }
  }, {
    key: "expression",
    value: function expression() {
      return this.getTypedRuleContext(ExpressionContext, 0);
    }
  }, {
    key: "RightParen",
    value: function RightParen() {
      return this.getToken(LPCParser.RightParen, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterForeachControlStatement(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitForeachControlStatement(this);
      }
    }
  }]);

  return ForeachControlStatementContext;
}(_antlr["default"].ParserRuleContext);

var ForeachVariableListContext = /*#__PURE__*/function (_antlr4$ParserRuleCon71) {
  _inherits(ForeachVariableListContext, _antlr4$ParserRuleCon71);

  var _super72 = _createSuper(ForeachVariableListContext);

  function ForeachVariableListContext(parser, parent, invokingState) {
    var _this72;

    _classCallCheck(this, ForeachVariableListContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this72 = _super72.call(this, parent, invokingState);

    _defineProperty(_assertThisInitialized(_this72), "forLoopVariable", function (i) {
      if (i === undefined) {
        i = null;
      }

      if (i === null) {
        return this.getTypedRuleContexts(ForLoopVariableContext);
      } else {
        return this.getTypedRuleContext(ForLoopVariableContext, i);
      }
    });

    _defineProperty(_assertThisInitialized(_this72), "Comma", function (i) {
      if (i === undefined) {
        i = null;
      }

      if (i === null) {
        return this.getTokens(LPCParser.Comma);
      } else {
        return this.getToken(LPCParser.Comma, i);
      }
    });

    _this72.parser = parser;
    _this72.ruleIndex = LPCParser.RULE_foreachVariableList;
    return _this72;
  }

  _createClass(ForeachVariableListContext, [{
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterForeachVariableList(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitForeachVariableList(this);
      }
    }
  }]);

  return ForeachVariableListContext;
}(_antlr["default"].ParserRuleContext);

var ReturnStatementContext = /*#__PURE__*/function (_antlr4$ParserRuleCon72) {
  _inherits(ReturnStatementContext, _antlr4$ParserRuleCon72);

  var _super73 = _createSuper(ReturnStatementContext);

  function ReturnStatementContext(parser, parent, invokingState) {
    var _this73;

    _classCallCheck(this, ReturnStatementContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this73 = _super73.call(this, parent, invokingState);
    _this73.parser = parser;
    _this73.ruleIndex = LPCParser.RULE_returnStatement;
    return _this73;
  }

  _createClass(ReturnStatementContext, [{
    key: "Return",
    value: function Return() {
      return this.getToken(LPCParser.Return, 0);
    }
  }, {
    key: "SemiColon",
    value: function SemiColon() {
      return this.getToken(LPCParser.SemiColon, 0);
    }
  }, {
    key: "expressionList",
    value: function expressionList() {
      return this.getTypedRuleContext(ExpressionListContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterReturnStatement(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitReturnStatement(this);
      }
    }
  }]);

  return ReturnStatementContext;
}(_antlr["default"].ParserRuleContext);

var FunctionCallContext = /*#__PURE__*/function (_antlr4$ParserRuleCon73) {
  _inherits(FunctionCallContext, _antlr4$ParserRuleCon73);

  var _super74 = _createSuper(FunctionCallContext);

  function FunctionCallContext(parser, parent, invokingState) {
    var _this74;

    _classCallCheck(this, FunctionCallContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this74 = _super74.call(this, parent, invokingState);
    _this74.parser = parser;
    _this74.ruleIndex = LPCParser.RULE_functionCall;
    return _this74;
  }

  _createClass(FunctionCallContext, [{
    key: "functionName",
    value: function functionName() {
      return this.getTypedRuleContext(FunctionNameContext, 0);
    }
  }, {
    key: "LeftParen",
    value: function LeftParen() {
      return this.getToken(LPCParser.LeftParen, 0);
    }
  }, {
    key: "RightParen",
    value: function RightParen() {
      return this.getToken(LPCParser.RightParen, 0);
    }
  }, {
    key: "expressionList",
    value: function expressionList() {
      return this.getTypedRuleContext(ExpressionListContext, 0);
    }
  }, {
    key: "ScopeOperator",
    value: function ScopeOperator() {
      return this.getToken(LPCParser.ScopeOperator, 0);
    }
  }, {
    key: "functionCall",
    value: function functionCall() {
      return this.getTypedRuleContext(FunctionCallContext, 0);
    }
  }, {
    key: "identifier",
    value: function identifier() {
      return this.getTypedRuleContext(IdentifierContext, 0);
    }
  }, {
    key: "Efun",
    value: function Efun() {
      return this.getToken(LPCParser.Efun, 0);
    }
  }, {
    key: "Object",
    value: function Object() {
      return this.getToken(LPCParser.Object, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterFunctionCall(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitFunctionCall(this);
      }
    }
  }]);

  return FunctionCallContext;
}(_antlr["default"].ParserRuleContext);

var ExpressionListContext = /*#__PURE__*/function (_antlr4$ParserRuleCon74) {
  _inherits(ExpressionListContext, _antlr4$ParserRuleCon74);

  var _super75 = _createSuper(ExpressionListContext);

  function ExpressionListContext(parser, parent, invokingState) {
    var _this75;

    _classCallCheck(this, ExpressionListContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this75 = _super75.call(this, parent, invokingState);

    _defineProperty(_assertThisInitialized(_this75), "expression", function (i) {
      if (i === undefined) {
        i = null;
      }

      if (i === null) {
        return this.getTypedRuleContexts(ExpressionContext);
      } else {
        return this.getTypedRuleContext(ExpressionContext, i);
      }
    });

    _defineProperty(_assertThisInitialized(_this75), "Comma", function (i) {
      if (i === undefined) {
        i = null;
      }

      if (i === null) {
        return this.getTokens(LPCParser.Comma);
      } else {
        return this.getToken(LPCParser.Comma, i);
      }
    });

    _this75.parser = parser;
    _this75.ruleIndex = LPCParser.RULE_expressionList;
    return _this75;
  }

  _createClass(ExpressionListContext, [{
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterExpressionList(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitExpressionList(this);
      }
    }
  }]);

  return ExpressionListContext;
}(_antlr["default"].ParserRuleContext);

var FunctionNameContext = /*#__PURE__*/function (_antlr4$ParserRuleCon75) {
  _inherits(FunctionNameContext, _antlr4$ParserRuleCon75);

  var _super76 = _createSuper(FunctionNameContext);

  function FunctionNameContext(parser, parent, invokingState) {
    var _this76;

    _classCallCheck(this, FunctionNameContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this76 = _super76.call(this, parent, invokingState);
    _this76.parser = parser;
    _this76.ruleIndex = LPCParser.RULE_functionName;
    return _this76;
  }

  _createClass(FunctionNameContext, [{
    key: "identifier",
    value: function identifier() {
      return this.getTypedRuleContext(IdentifierContext, 0);
    }
  }, {
    key: "LeftParen",
    value: function LeftParen() {
      return this.getToken(LPCParser.LeftParen, 0);
    }
  }, {
    key: "Multiply",
    value: function Multiply() {
      return this.getToken(LPCParser.Multiply, 0);
    }
  }, {
    key: "expression",
    value: function expression() {
      return this.getTypedRuleContext(ExpressionContext, 0);
    }
  }, {
    key: "RightParen",
    value: function RightParen() {
      return this.getToken(LPCParser.RightParen, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterFunctionName(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitFunctionName(this);
      }
    }
  }]);

  return FunctionNameContext;
}(_antlr["default"].ParserRuleContext);

var InheritanceDeclarationContext = /*#__PURE__*/function (_antlr4$ParserRuleCon76) {
  _inherits(InheritanceDeclarationContext, _antlr4$ParserRuleCon76);

  var _super77 = _createSuper(InheritanceDeclarationContext);

  function InheritanceDeclarationContext(parser, parent, invokingState) {
    var _this77;

    _classCallCheck(this, InheritanceDeclarationContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this77 = _super77.call(this, parent, invokingState);
    _this77.parser = parser;
    _this77.ruleIndex = LPCParser.RULE_inheritanceDeclaration;
    return _this77;
  }

  _createClass(InheritanceDeclarationContext, [{
    key: "Inherit",
    value: function Inherit() {
      return this.getToken(LPCParser.Inherit, 0);
    }
  }, {
    key: "stringExpression",
    value: function stringExpression() {
      return this.getTypedRuleContext(StringExpressionContext, 0);
    }
  }, {
    key: "SemiColon",
    value: function SemiColon() {
      return this.getToken(LPCParser.SemiColon, 0);
    }
  }, {
    key: "accessLevelModifier",
    value: function accessLevelModifier() {
      return this.getTypedRuleContext(AccessLevelModifierContext, 0);
    }
  }, {
    key: "identifier",
    value: function identifier() {
      return this.getTypedRuleContext(IdentifierContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterInheritanceDeclaration(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitInheritanceDeclaration(this);
      }
    }
  }]);

  return InheritanceDeclarationContext;
}(_antlr["default"].ParserRuleContext);

var StringExpressionContext = /*#__PURE__*/function (_antlr4$ParserRuleCon77) {
  _inherits(StringExpressionContext, _antlr4$ParserRuleCon77);

  var _super78 = _createSuper(StringExpressionContext);

  function StringExpressionContext(parser, parent, invokingState) {
    var _this78;

    _classCallCheck(this, StringExpressionContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this78 = _super78.call(this, parent, invokingState);
    _this78.parser = parser;
    _this78.ruleIndex = LPCParser.RULE_stringExpression;
    return _this78;
  }

  _createClass(StringExpressionContext, [{
    key: "StringLiteral",
    value: function StringLiteral() {
      return this.getToken(LPCParser.StringLiteral, 0);
    }
  }, {
    key: "expression",
    value: function expression() {
      return this.getTypedRuleContext(ExpressionContext, 0);
    }
  }, {
    key: "Add",
    value: function Add() {
      return this.getToken(LPCParser.Add, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterStringExpression(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitStringExpression(this);
      }
    }
  }]);

  return StringExpressionContext;
}(_antlr["default"].ParserRuleContext);

var DataTypeContext = /*#__PURE__*/function (_antlr4$ParserRuleCon78) {
  _inherits(DataTypeContext, _antlr4$ParserRuleCon78);

  var _super79 = _createSuper(DataTypeContext);

  function DataTypeContext(parser, parent, invokingState) {
    var _this79;

    _classCallCheck(this, DataTypeContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this79 = _super79.call(this, parent, invokingState);
    _this79.parser = parser;
    _this79.ruleIndex = LPCParser.RULE_dataType;
    return _this79;
  }

  _createClass(DataTypeContext, [{
    key: "Float",
    value: function Float() {
      return this.getToken(LPCParser.Float, 0);
    }
  }, {
    key: "Function",
    value: function Function() {
      return this.getToken(LPCParser.Function, 0);
    }
  }, {
    key: "Int",
    value: function Int() {
      return this.getToken(LPCParser.Int, 0);
    }
  }, {
    key: "Mapping",
    value: function Mapping() {
      return this.getToken(LPCParser.Mapping, 0);
    }
  }, {
    key: "Mixed",
    value: function Mixed() {
      return this.getToken(LPCParser.Mixed, 0);
    }
  }, {
    key: "Object",
    value: function Object() {
      return this.getToken(LPCParser.Object, 0);
    }
  }, {
    key: "String",
    value: function String() {
      return this.getToken(LPCParser.String, 0);
    }
  }, {
    key: "Buffer",
    value: function Buffer() {
      return this.getToken(LPCParser.Buffer, 0);
    }
  }, {
    key: "classIdentifier",
    value: function classIdentifier() {
      return this.getTypedRuleContext(ClassIdentifierContext, 0);
    }
  }, {
    key: "array",
    value: function array() {
      return this.getTypedRuleContext(ArrayContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterDataType(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitDataType(this);
      }
    }
  }]);

  return DataTypeContext;
}(_antlr["default"].ParserRuleContext);

var FunctionReturnTypeContext = /*#__PURE__*/function (_antlr4$ParserRuleCon79) {
  _inherits(FunctionReturnTypeContext, _antlr4$ParserRuleCon79);

  var _super80 = _createSuper(FunctionReturnTypeContext);

  function FunctionReturnTypeContext(parser, parent, invokingState) {
    var _this80;

    _classCallCheck(this, FunctionReturnTypeContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this80 = _super80.call(this, parent, invokingState);
    _this80.parser = parser;
    _this80.ruleIndex = LPCParser.RULE_functionReturnType;
    return _this80;
  }

  _createClass(FunctionReturnTypeContext, [{
    key: "dataType",
    value: function dataType() {
      return this.getTypedRuleContext(DataTypeContext, 0);
    }
  }, {
    key: "array",
    value: function array() {
      return this.getTypedRuleContext(ArrayContext, 0);
    }
  }, {
    key: "Void",
    value: function Void() {
      return this.getToken(LPCParser.Void, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterFunctionReturnType(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitFunctionReturnType(this);
      }
    }
  }]);

  return FunctionReturnTypeContext;
}(_antlr["default"].ParserRuleContext);

var IdentifierContext = /*#__PURE__*/function (_antlr4$ParserRuleCon80) {
  _inherits(IdentifierContext, _antlr4$ParserRuleCon80);

  var _super81 = _createSuper(IdentifierContext);

  function IdentifierContext(parser, parent, invokingState) {
    var _this81;

    _classCallCheck(this, IdentifierContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this81 = _super81.call(this, parent, invokingState);
    _this81.parser = parser;
    _this81.ruleIndex = LPCParser.RULE_identifier;
    return _this81;
  }

  _createClass(IdentifierContext, [{
    key: "Identifier",
    value: function Identifier() {
      return this.getToken(LPCParser.Identifier, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterIdentifier(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitIdentifier(this);
      }
    }
  }]);

  return IdentifierContext;
}(_antlr["default"].ParserRuleContext);

var ConditionalStatementContext = /*#__PURE__*/function (_antlr4$ParserRuleCon81) {
  _inherits(ConditionalStatementContext, _antlr4$ParserRuleCon81);

  var _super82 = _createSuper(ConditionalStatementContext);

  function ConditionalStatementContext(parser, parent, invokingState) {
    var _this82;

    _classCallCheck(this, ConditionalStatementContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this82 = _super82.call(this, parent, invokingState);

    _defineProperty(_assertThisInitialized(_this82), "statementOrBlock", function (i) {
      if (i === undefined) {
        i = null;
      }

      if (i === null) {
        return this.getTypedRuleContexts(StatementOrBlockContext);
      } else {
        return this.getTypedRuleContext(StatementOrBlockContext, i);
      }
    });

    _this82.parser = parser;
    _this82.ruleIndex = LPCParser.RULE_conditionalStatement;
    return _this82;
  }

  _createClass(ConditionalStatementContext, [{
    key: "If",
    value: function If() {
      return this.getToken(LPCParser.If, 0);
    }
  }, {
    key: "LeftParen",
    value: function LeftParen() {
      return this.getToken(LPCParser.LeftParen, 0);
    }
  }, {
    key: "expression",
    value: function expression() {
      return this.getTypedRuleContext(ExpressionContext, 0);
    }
  }, {
    key: "RightParen",
    value: function RightParen() {
      return this.getToken(LPCParser.RightParen, 0);
    }
  }, {
    key: "Else",
    value: function Else() {
      return this.getToken(LPCParser.Else, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterConditionalStatement(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitConditionalStatement(this);
      }
    }
  }]);

  return ConditionalStatementContext;
}(_antlr["default"].ParserRuleContext);

var SwitchStatementContext = /*#__PURE__*/function (_antlr4$ParserRuleCon82) {
  _inherits(SwitchStatementContext, _antlr4$ParserRuleCon82);

  var _super83 = _createSuper(SwitchStatementContext);

  function SwitchStatementContext(parser, parent, invokingState) {
    var _this83;

    _classCallCheck(this, SwitchStatementContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this83 = _super83.call(this, parent, invokingState);

    _defineProperty(_assertThisInitialized(_this83), "caseStatement", function (i) {
      if (i === undefined) {
        i = null;
      }

      if (i === null) {
        return this.getTypedRuleContexts(CaseStatementContext);
      } else {
        return this.getTypedRuleContext(CaseStatementContext, i);
      }
    });

    _this83.parser = parser;
    _this83.ruleIndex = LPCParser.RULE_switchStatement;
    return _this83;
  }

  _createClass(SwitchStatementContext, [{
    key: "Switch",
    value: function Switch() {
      return this.getToken(LPCParser.Switch, 0);
    }
  }, {
    key: "LeftParen",
    value: function LeftParen() {
      return this.getToken(LPCParser.LeftParen, 0);
    }
  }, {
    key: "expression",
    value: function expression() {
      return this.getTypedRuleContext(ExpressionContext, 0);
    }
  }, {
    key: "RightParen",
    value: function RightParen() {
      return this.getToken(LPCParser.RightParen, 0);
    }
  }, {
    key: "LeftBrace",
    value: function LeftBrace() {
      return this.getToken(LPCParser.LeftBrace, 0);
    }
  }, {
    key: "RightBrace",
    value: function RightBrace() {
      return this.getToken(LPCParser.RightBrace, 0);
    }
  }, {
    key: "defaultSwitchStatement",
    value: function defaultSwitchStatement() {
      return this.getTypedRuleContext(DefaultSwitchStatementContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterSwitchStatement(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitSwitchStatement(this);
      }
    }
  }]);

  return SwitchStatementContext;
}(_antlr["default"].ParserRuleContext);

var CaseLabelContext = /*#__PURE__*/function (_antlr4$ParserRuleCon83) {
  _inherits(CaseLabelContext, _antlr4$ParserRuleCon83);

  var _super84 = _createSuper(CaseLabelContext);

  function CaseLabelContext(parser, parent, invokingState) {
    var _this84;

    _classCallCheck(this, CaseLabelContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this84 = _super84.call(this, parent, invokingState);
    _this84.parser = parser;
    _this84.ruleIndex = LPCParser.RULE_caseLabel;
    return _this84;
  }

  _createClass(CaseLabelContext, [{
    key: "literal",
    value: function literal() {
      return this.getTypedRuleContext(LiteralContext, 0);
    }
  }, {
    key: "identifier",
    value: function identifier() {
      return this.getTypedRuleContext(IdentifierContext, 0);
    }
  }, {
    key: "stringExpression",
    value: function stringExpression() {
      return this.getTypedRuleContext(StringExpressionContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterCaseLabel(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitCaseLabel(this);
      }
    }
  }]);

  return CaseLabelContext;
}(_antlr["default"].ParserRuleContext);

var CaseStatementContext = /*#__PURE__*/function (_antlr4$ParserRuleCon84) {
  _inherits(CaseStatementContext, _antlr4$ParserRuleCon84);

  var _super85 = _createSuper(CaseStatementContext);

  function CaseStatementContext(parser, parent, invokingState) {
    var _this85;

    _classCallCheck(this, CaseStatementContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this85 = _super85.call(this, parent, invokingState);

    _defineProperty(_assertThisInitialized(_this85), "statement", function (i) {
      if (i === undefined) {
        i = null;
      }

      if (i === null) {
        return this.getTypedRuleContexts(StatementContext);
      } else {
        return this.getTypedRuleContext(StatementContext, i);
      }
    });

    _this85.parser = parser;
    _this85.ruleIndex = LPCParser.RULE_caseStatement;
    return _this85;
  }

  _createClass(CaseStatementContext, [{
    key: "Case",
    value: function Case() {
      return this.getToken(LPCParser.Case, 0);
    }
  }, {
    key: "caseLabel",
    value: function caseLabel() {
      return this.getTypedRuleContext(CaseLabelContext, 0);
    }
  }, {
    key: "Colon",
    value: function Colon() {
      return this.getToken(LPCParser.Colon, 0);
    }
  }, {
    key: "breakStatement",
    value: function breakStatement() {
      return this.getTypedRuleContext(BreakStatementContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterCaseStatement(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitCaseStatement(this);
      }
    }
  }]);

  return CaseStatementContext;
}(_antlr["default"].ParserRuleContext);

var DefaultSwitchStatementContext = /*#__PURE__*/function (_antlr4$ParserRuleCon85) {
  _inherits(DefaultSwitchStatementContext, _antlr4$ParserRuleCon85);

  var _super86 = _createSuper(DefaultSwitchStatementContext);

  function DefaultSwitchStatementContext(parser, parent, invokingState) {
    var _this86;

    _classCallCheck(this, DefaultSwitchStatementContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this86 = _super86.call(this, parent, invokingState);

    _defineProperty(_assertThisInitialized(_this86), "statement", function (i) {
      if (i === undefined) {
        i = null;
      }

      if (i === null) {
        return this.getTypedRuleContexts(StatementContext);
      } else {
        return this.getTypedRuleContext(StatementContext, i);
      }
    });

    _this86.parser = parser;
    _this86.ruleIndex = LPCParser.RULE_defaultSwitchStatement;
    return _this86;
  }

  _createClass(DefaultSwitchStatementContext, [{
    key: "Default",
    value: function Default() {
      return this.getToken(LPCParser.Default, 0);
    }
  }, {
    key: "Colon",
    value: function Colon() {
      return this.getToken(LPCParser.Colon, 0);
    }
  }, {
    key: "breakStatement",
    value: function breakStatement() {
      return this.getTypedRuleContext(BreakStatementContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.enterDefaultSwitchStatement(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _LPCListener["default"]) {
        listener.exitDefaultSwitchStatement(this);
      }
    }
  }]);

  return DefaultSwitchStatementContext;
}(_antlr["default"].ParserRuleContext);

LPCParser.LpcProgramContext = LpcProgramContext;
LPCParser.ProgramDeclarationsContext = ProgramDeclarationsContext;
LPCParser.ProgramDeclarationContext = ProgramDeclarationContext;
LPCParser.VariableDeclarationContext = VariableDeclarationContext;
LPCParser.ProgramVariableDeclarationContext = ProgramVariableDeclarationContext;
LPCParser.FunctionDeclarationContext = FunctionDeclarationContext;
LPCParser.ArgumentListContext = ArgumentListContext;
LPCParser.ArgumentContext = ArgumentContext;
LPCParser.DataTypeListContext = DataTypeListContext;
LPCParser.FunctionDefinitionContext = FunctionDefinitionContext;
LPCParser.AccessLevelModifierContext = AccessLevelModifierContext;
LPCParser.FunctionTypeModifierContext = FunctionTypeModifierContext;
LPCParser.FunctionModifierContext = FunctionModifierContext;
LPCParser.ClassDefinitionContext = ClassDefinitionContext;
LPCParser.ClassIdentifierContext = ClassIdentifierContext;
LPCParser.ClassMembersContext = ClassMembersContext;
LPCParser.ClassMemberInitializerContext = ClassMemberInitializerContext;
LPCParser.VariableModifierContext = VariableModifierContext;
LPCParser.VariableListContext = VariableListContext;
LPCParser.VariableContext = VariableContext;
LPCParser.ArrayContext = ArrayContext;
LPCParser.ComparisonOperatorContext = ComparisonOperatorContext;
LPCParser.LogicalOperatorContext = LogicalOperatorContext;
LPCParser.BitOperatorContext = BitOperatorContext;
LPCParser.ArithmeticOperatorContext = ArithmeticOperatorContext;
LPCParser.FunctionalDeclarationContext = FunctionalDeclarationContext;
LPCParser.AnonymousFunctionalDeclarationContext = AnonymousFunctionalDeclarationContext;
LPCParser.FunctionalStartContext = FunctionalStartContext;
LPCParser.FunctionalEndContext = FunctionalEndContext;
LPCParser.FunctionalParameterContext = FunctionalParameterContext;
LPCParser.CastOperationContext = CastOperationContext;
LPCParser.ExpressionContext = ExpressionContext;
LPCParser.CatchExpressionContext = CatchExpressionContext;
LPCParser.NewExpressionContext = NewExpressionContext;
LPCParser.NewExpressionIdentifierContext = NewExpressionIdentifierContext;
LPCParser.OperatorContext = OperatorContext;
LPCParser.AssignmentOperatorContext = AssignmentOperatorContext;
LPCParser.NotExpressionContext = NotExpressionContext;
LPCParser.UnaryOperatorContext = UnaryOperatorContext;
LPCParser.LiteralContext = LiteralContext;
LPCParser.MappingDeclarationContext = MappingDeclarationContext;
LPCParser.MappingStartContext = MappingStartContext;
LPCParser.MappingEndContext = MappingEndContext;
LPCParser.MappingElementListContext = MappingElementListContext;
LPCParser.MappingElementContext = MappingElementContext;
LPCParser.MappingKeyContext = MappingKeyContext;
LPCParser.MappingValueContext = MappingValueContext;
LPCParser.ArrayDeclarationContext = ArrayDeclarationContext;
LPCParser.ArrayStartContext = ArrayStartContext;
LPCParser.ArrayEndContext = ArrayEndContext;
LPCParser.IndexOperatorContext = IndexOperatorContext;
LPCParser.IndexContext = IndexContext;
LPCParser.RangeContext = RangeContext;
LPCParser.BlockContext = BlockContext;
LPCParser.StatementContext = StatementContext;
LPCParser.BreakStatementContext = BreakStatementContext;
LPCParser.ContinueStatementContext = ContinueStatementContext;
LPCParser.StatementOrBlockContext = StatementOrBlockContext;
LPCParser.LoopStatementContext = LoopStatementContext;
LPCParser.WhileControlStatementContext = WhileControlStatementContext;
LPCParser.DoLoopStatementContext = DoLoopStatementContext;
LPCParser.WhileLoopStatementContext = WhileLoopStatementContext;
LPCParser.ForControlStatementContext = ForControlStatementContext;
LPCParser.ForLoopStatementContext = ForLoopStatementContext;
LPCParser.ForInitialStateContext = ForInitialStateContext;
LPCParser.ForLoopVariableContext = ForLoopVariableContext;
LPCParser.ForConditionContext = ForConditionContext;
LPCParser.ForIncrementStepContext = ForIncrementStepContext;
LPCParser.ForeachLoopStatementContext = ForeachLoopStatementContext;
LPCParser.ForeachControlStatementContext = ForeachControlStatementContext;
LPCParser.ForeachVariableListContext = ForeachVariableListContext;
LPCParser.ReturnStatementContext = ReturnStatementContext;
LPCParser.FunctionCallContext = FunctionCallContext;
LPCParser.ExpressionListContext = ExpressionListContext;
LPCParser.FunctionNameContext = FunctionNameContext;
LPCParser.InheritanceDeclarationContext = InheritanceDeclarationContext;
LPCParser.StringExpressionContext = StringExpressionContext;
LPCParser.DataTypeContext = DataTypeContext;
LPCParser.FunctionReturnTypeContext = FunctionReturnTypeContext;
LPCParser.IdentifierContext = IdentifierContext;
LPCParser.ConditionalStatementContext = ConditionalStatementContext;
LPCParser.SwitchStatementContext = SwitchStatementContext;
LPCParser.CaseLabelContext = CaseLabelContext;
LPCParser.CaseStatementContext = CaseStatementContext;
LPCParser.DefaultSwitchStatementContext = DefaultSwitchStatementContext;