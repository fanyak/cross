System.register([], function () {
  'use strict';
  return {
    execute: function () {

      function _typeof(obj) {
        "@babel/helpers - typeof";

        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function (obj) {
            return typeof obj;
          };
        } else {
          _typeof = function (obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
          };
        }

        return _typeof(obj);
      }

      function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(_next, _throw);
        }
      }

      function _asyncToGenerator(fn) {
        return function () {
          var self = this,
              args = arguments;
          return new Promise(function (resolve, reject) {
            var gen = fn.apply(self, args);

            function _next(value) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }

            function _throw(err) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }

            _next(undefined);
          });
        };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
      }

      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }

        return obj;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            writable: true,
            configurable: true
          }
        });
        if (superClass) _setPrototypeOf(subClass, superClass);
      }

      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
          return o.__proto__ || Object.getPrototypeOf(o);
        };
        return _getPrototypeOf(o);
      }

      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
          o.__proto__ = p;
          return o;
        };

        return _setPrototypeOf(o, p);
      }

      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct) return false;
        if (Reflect.construct.sham) return false;
        if (typeof Proxy === "function") return true;

        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
          return true;
        } catch (e) {
          return false;
        }
      }

      function _construct(Parent, args, Class) {
        if (_isNativeReflectConstruct()) {
          _construct = Reflect.construct;
        } else {
          _construct = function _construct(Parent, args, Class) {
            var a = [null];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) _setPrototypeOf(instance, Class.prototype);
            return instance;
          };
        }

        return _construct.apply(null, arguments);
      }

      function _isNativeFunction(fn) {
        return Function.toString.call(fn).indexOf("[native code]") !== -1;
      }

      function _wrapNativeSuper(Class) {
        var _cache = typeof Map === "function" ? new Map() : undefined;

        _wrapNativeSuper = function _wrapNativeSuper(Class) {
          if (Class === null || !_isNativeFunction(Class)) return Class;

          if (typeof Class !== "function") {
            throw new TypeError("Super expression must either be null or a function");
          }

          if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);

            _cache.set(Class, Wrapper);
          }

          function Wrapper() {
            return _construct(Class, arguments, _getPrototypeOf(this).constructor);
          }

          Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
              value: Wrapper,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          return _setPrototypeOf(Wrapper, Class);
        };

        return _wrapNativeSuper(Class);
      }

      function _assertThisInitialized(self) {
        if (self === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return self;
      }

      function _possibleConstructorReturn(self, call) {
        if (call && (typeof call === "object" || typeof call === "function")) {
          return call;
        }

        return _assertThisInitialized(self);
      }

      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();

        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived),
              result;

          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;

            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }

          return _possibleConstructorReturn(this, result);
        };
      }

      function _superPropBase(object, property) {
        while (!Object.prototype.hasOwnProperty.call(object, property)) {
          object = _getPrototypeOf(object);
          if (object === null) break;
        }

        return object;
      }

      function _get(target, property, receiver) {
        if (typeof Reflect !== "undefined" && Reflect.get) {
          _get = Reflect.get;
        } else {
          _get = function _get(target, property, receiver) {
            var base = _superPropBase(target, property);

            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);

            if (desc.get) {
              return desc.get.call(receiver);
            }

            return desc.value;
          };
        }

        return _get(target, property, receiver || target);
      }

      function _taggedTemplateLiteral(strings, raw) {
        if (!raw) {
          raw = strings.slice(0);
        }

        return Object.freeze(Object.defineProperties(strings, {
          raw: {
            value: Object.freeze(raw)
          }
        }));
      }

      function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
      }

      function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
      }

      function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) return _arrayLikeToArray(arr);
      }

      function _arrayWithHoles(arr) {
        if (Array.isArray(arr)) return arr;
      }

      function _iterableToArray(iter) {
        if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
      }

      function _iterableToArrayLimit(arr, i) {
        if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;

        try {
          for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);

            if (i && _arr.length === i) break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"] != null) _i["return"]();
          } finally {
            if (_d) throw _e;
          }
        }

        return _arr;
      }

      function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
      }

      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;

        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

        return arr2;
      }

      function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }

      function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }

      function _createForOfIteratorHelper(o, allowArrayLike) {
        var it;

        if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
          if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;

            var F = function () {};

            return {
              s: F,
              n: function () {
                if (i >= o.length) return {
                  done: true
                };
                return {
                  done: false,
                  value: o[i++]
                };
              },
              e: function (e) {
                throw e;
              },
              f: F
            };
          }

          throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }

        var normalCompletion = true,
            didErr = false,
            err;
        return {
          s: function () {
            it = o[Symbol.iterator]();
          },
          n: function () {
            var step = it.next();
            normalCompletion = step.done;
            return step;
          },
          e: function (e) {
            didErr = true;
            err = e;
          },
          f: function () {
            try {
              if (!normalCompletion && it.return != null) it.return();
            } finally {
              if (didErr) throw err;
            }
          }
        };
      }

      // REF https://v8.dev/features/modules
      var Variable = /*#__PURE__*/function () {
        function Variable(i, j, direction, length) {
          _classCallCheck(this, Variable);

          ///Create a new variable with starting point, direction, and length."""
          this.i = i;
          this.j = j;
          this.direction = direction;
          this.length = length;
          this.cells = [];

          for (var k = 0; k < this.length; k++) {
            this.cells.push([this.i + (this.direction == Variable.DOWN ? k : 0), this.j + (this.direction == Variable.ACROSS ? k : 0)]);
          }
        }

        _createClass(Variable, [{
          key: "equals",
          value: function equals(other) {
            return this.i == other.i && this.j == other.j && this.direction == other.direction && this.length == other.length;
          }
        }, {
          key: "toString",
          value: function toString() {
            return "(".concat(this.i, ", ").concat(this.j, ", '").concat(this.direction, "', ").concat(this.length, ")");
          }
        }, {
          key: "intersection",
          value: function intersection(other) {
            var _this = this;

            var _intersection = new Set();

            var _iterator = _createForOfIteratorHelper(other.cells),
                _step;

            try {
              var _loop = function _loop() {
                var elem = _step.value;

                if (_this.cells.find(function (cell) {
                  return Variable.isSameCell(elem, cell);
                })) {
                  _intersection.add(elem);
                }
              };

              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                _loop();
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            return _intersection;
          }
        }]);

        return Variable;
      }(); // Adding properties to the Constructor of Variable - not to the prototype
      // This is a workaround to Static Methods, not supported in safari
      // https://www.w3schools.com/js/js_object_constructors.asp


      Variable.ACROSS = 'across';
      Variable.DOWN = 'down';

      Variable.isSameCell = function (cell1, cell2) {
        // console.log(cell1, cell2)
        if (cell1.length !== cell2.length) {
          return false;
        }

        var _iterator2 = _createForOfIteratorHelper(cell1.keys()),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var key = _step2.value;

            if (cell1[key] != cell2[key]) {
              // not strict equality => want to match strings to numbers instead of parsing
              return false;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        return true;
      };

      var Crossword = /*#__PURE__*/function () {
        function Crossword(structure, words, height, width) {
          var _this2 = this;

          _classCallCheck(this, Crossword);

          //  Determine structure of crossword      
          var constraints = structure.constraints; // console.log(constraints)

          this.height = height;
          this.width = width;
          this.structure = [];

          var _loop2 = function _loop2(i) {
            var row = [];

            var _loop3 = function _loop3(_j) {
              if (constraints.find(function (val) {
                return val == i * _this2.height + _j + 1;
              })) {
                row.push(false);
              } else {
                row.push(true);
              }
            };

            for (var _j = 0; _j < _this2.width; _j++) {
              _loop3(_j);
            }

            _this2.structure.push(row);
          };

          for (var i = 0; i < this.height; i++) {
            _loop2(i);
          } // console.log(this.structure)


          this.words = _toConsumableArray(new Set(words.vocab.map(function (word) {
            return word.toUpperCase();
          }))); //console.log(this.words.slice(0,10))
          // Determine variable set

          this.variables = new Set();

          for (var _i = 0; _i < this.height; _i++) {
            for (var j = 0; j < this.width; j++) {
              // Vertical words
              var starts_word = this.structure[_i][j] && (_i == 0 || !this.structure[_i - 1][j]);

              if (starts_word) {
                var length = 1;

                for (var k = _i + 1; k < this.height; k++) {
                  if (this.structure[k][j]) {
                    length += 1;
                  } else {
                    break;
                  }
                }

                if (length > 1) {
                  this.variables.add(new Variable(_i, j, Variable.DOWN, length));
                }
              } // Horizontal words


              starts_word = this.structure[_i][j] && (j == 0 || !this.structure[_i][j - 1]);

              if (starts_word) {
                var _length = 1;

                for (var _k = j + 1; _k < this.width; _k++) {
                  if (this.structure[_i][_k]) {
                    _length += 1;
                  } else {
                    break;
                  }
                }

                if (_length > 1) {
                  this.variables.add(new Variable(_i, j, Variable.ACROSS, _length));
                }
              }
            }
          } // Compute overlaps for each word
          // For any pair of variables v1, v2, their overlap is either:
          // null, if the two variables do not overlap; or
          // [i, j], where v1's ith character overlaps v2's jth character


          this.overlaps = new Map();

          var _iterator3 = _createForOfIteratorHelper(this.variables),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var v1 = _step3.value;

              var _iterator4 = _createForOfIteratorHelper(this.variables),
                  _step4;

              try {
                for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                  var v2 = _step4.value;

                  // console.log(v1, v2)
                  if (v1.equals(v2)) {
                    continue;
                  }

                  var intersection = v1.intersection(v2);

                  if (!intersection.size) {
                    this.overlaps.set([v1, v2], null);
                  } else {
                    (function () {
                      var union = intersection.values().next();
                      var index1 = v1.cells.findIndex(function (cell) {
                        return Variable.isSameCell(cell, union.value);
                      });
                      var index2 = v2.cells.findIndex(function (cell) {
                        return Variable.isSameCell(cell, union.value);
                      });

                      _this2.overlaps.set([v1, v2], [index1, index2]);
                    })();
                  }
                }
              } catch (err) {
                _iterator4.e(err);
              } finally {
                _iterator4.f();
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }

        _createClass(Crossword, [{
          key: "neighbors",
          value: function neighbors(variable) {
            /// Given a variable, return set of overlapping variables.
            var _neighbors = new Set();

            var _iterator5 = _createForOfIteratorHelper(this.variables),
                _step5;

            try {
              for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                var v = _step5.value;

                if (v.equals(variable)) {
                  continue;
                }

                if (this.overlaps.has([v, variable])) {
                  _neighbors.add(variable);
                }
              }
            } catch (err) {
              _iterator5.e(err);
            } finally {
              _iterator5.f();
            }

            return _neighbors;
          }
        }]);

        return Crossword;
      }();

      // HELPER  FUNCTIONS
      function isBlackCell(cell) {
        // className returns a SVGAnimatedString for className
        var SVGAnimatedString = cell.className;
        return SVGAnimatedString.baseVal.includes('black');
      }
      function isHiddenNode(node) {
        // className returns a SVGAnimatedString for className
        var SVGAnimatedString = node.className;
        return SVGAnimatedString && SVGAnimatedString.baseVal && SVGAnimatedString.baseVal.includes('hidden');
      }
      function isLetterEnglish(char) {
        return /^[A-Za-z]{1}$/.test(char);
      }
      function getCellNumber(cell) {
        return parseInt(cell.id.split('-')[2]);
      }
      function getCellVariable(cell, direction) {
        return cell.getAttribute("data-variable-".concat(direction));
      }
      function getCellCoords(cell, width, height) {
        var cellNumber = parseInt(cell.id.split('-')[2]);
        var i = Math.floor(cellNumber / height);
        var j = cellNumber % width;
        return [i, j];
      }
      function fillWhite(cell) {
        cell.setAttributeNS(null, 'fill', '#fff');
      }
      function fillBlue(cell) {
        cell.setAttributeNS(null, 'fill', 'lightblue');
      }
      function fillYellow(cell) {
        cell.setAttributeNS(null, 'fill', '#fdea3f');
      }
      function not(fn) {
        return function (data) {
          return !fn(data);
        };
      }
      function createUserActivationAction() {
        var userAction = '';

        if (window.PointerEvent) {
          userAction = 'pointerdown';
        } else {
          userAction = navigator.maxTouchPoints < 1 ? 'mousedown' : 'touchstart';
        }

        return userAction;
      }
      function createUserActionEnd(evt) {
        var userActionEnd = evt.type.replace('down', 'up').replace('start', 'end');
        return userActionEnd;
      }
      function touchesDistance(touch1, touch2) {
        var dist = Math.hypot(touch1.pageX - touch2.pageX, touch1.pageY - touch2.pageY);
        return dist;
      }
      function getTouchCoordsFromEvent(evt) {
        // let c1, c2;
        // // use touch.clientX, touch.clientY
        // // REF: https://developer.mozilla.org/en-US/docs/Web/API/Touch/clientX#example
        // c1 = [touch1.clientX, touch1.clientY];
        // if (touch2) {
        //   c2 = [touch2.clientX, touch2.clientY];
        // }
        // return c1;
        var point = [];

        if (evt.targetTouches) {
          // Prefer Touch Events
          point = [evt.targetTouches[0].clientX, evt.targetTouches[0].clientY];
        } else {
          // Either Mouse event or Pointer Event
          point = [evt.clientX, evt.clientY];
        }

        return point;
      }

      var Action = /*#__PURE__*/function () {
        function Action(crossword, direction, startOfWordCells, shadowRoot) {
          _classCallCheck(this, Action);

          this.crossword = crossword;
          this.rafPending = false;
          this.selected;
          this.direction = direction; // initial direction setting

          this.cellSpace;
          this.shadowRoot = shadowRoot; // these are static once the crossword is complete, don't recalculate it every time  

          this.startOfWordCells = startOfWordCells; // this is ordered by word index for the display cells    

          this.variables = Array.from(crossword.variables);

          var cells = _toConsumableArray(this.shadowRoot.querySelectorAll('svg [id*="cell-id"]'));

          this.activeCells = cells.filter(not(isBlackCell)); // handle Multi-Touch events for devices that support PointerEvents

          this.pointerCaches = {
            'pointerdown': []
          };
          this.handleActivationOnEnd;
          this.movePending = false;
          this.moveResetPending = false;
          this.zoomStart;
          this.zoomLevel = 1;
          this.zoomPending = false;
          this.zoomInLimit = 3;
          this.zoomOutLimit = 0.6;
          this.zoomResetPending = false;
          this.initialTouch;
          this.lastHoldPosition = [0, 0];
          this.position = [0, 0];
          this.selectedClue;
        } // Receives a keyboard Event or a synthesized event for direct call
        // synthesized event: {key, code, type, shiftKey}


        _createClass(Action, [{
          key: "keydown",
          value: function keydown(evt) {
            var _this = this;

            // if not manually sent from an event on the body 
            if (evt instanceof Event) {
              evt.preventDefault();
            } // actual Event or synthesized for direct call


            var target = evt.target || this.selected;
            var cellId = target.id;
            var cellNumber = getCellNumber(target); // edit cell content

            var char = isLetterEnglish(evt.key);

            if (char) {
              var _this$removeExistingC = this.removeExistingContent(cellId),
                  _this$removeExistingC2 = _slicedToArray(_this$removeExistingC, 2),
                  text = _this$removeExistingC2[0],
                  hiddenText = _this$removeExistingC2[1]; // replace or add content in the cell


              var letter = evt.key.toUpperCase();
              var content = document.createTextNode(letter);
              text.appendChild(content);
              hiddenText.textContent = letter; // activate the next empty cell

              if (this.direction == 'across') {
                this.changeActiveCell(cellNumber, 1);
              } else {
                this.changeActiveCell(cellNumber, 15);
              }

              return;
            }

            if (['Delete', 'Backspace'].includes(evt.key)) {
              var _this$removeExistingC3 = this.removeExistingContent(cellId),
                  _this$removeExistingC4 = _slicedToArray(_this$removeExistingC3, 3),
                  existingContent = _this$removeExistingC4[2];

              if (evt.key == 'Backspace') {
                var next;

                if (this.direction == 'across') {
                  next = this.changeActiveCell(cellNumber, -1);
                } else {
                  next = this.changeActiveCell(cellNumber, -15);
                } // if the cell where we clicked backspace was empty, delete the previous cell contents


                if (next && !existingContent) {
                  var nextCellId = next.id;
                  this.removeExistingContent(nextCellId);
                }
              }

              return;
            } // navigate actions 


            if (evt.key == 'ArrowDown') {
              // const nextId = cellNumber + crossword.width;
              this.changeActiveCell(cellNumber, this.crossword.width);
              return;
            }

            if (evt.key == 'ArrowUp') {
              // const nextId = cellNumber -crossword.width;
              this.changeActiveCell(cellNumber, -this.crossword.width);
              return;
            }

            if (evt.key == 'ArrowLeft') {
              //const nextId = cellNumber - 1;
              this.changeActiveCell(cellNumber, -1);
              return;
            }

            if (evt.key == 'ArrowRight') {
              // const nextId = cellNumber + 1;
              this.changeActiveCell(cellNumber, 1);
              return;
            }

            if (evt.key == 'Tab') {
              var _next;

              var currentIndex = this.startOfWordCells.findIndex(function (_ref) {
                var cell = _ref.cell;
                return getCellVariable(cell, _this.direction) == getCellVariable(target, _this.direction);
              });

              if (evt.shiftKey) {
                // go back 1 word
                var anchor = currentIndex == 0 ? this.startOfWordCells.length : currentIndex;
                _next = this.startOfWordCells[anchor - 1];
              } else {
                // go to next word
                var _anchor = currentIndex == this.startOfWordCells.length - 1 ? -1 : currentIndex;

                _next = this.startOfWordCells[_anchor + 1];
              }

              if (_next) {
                this.direction = _next.startOfWordVariable.direction; // synchronous dispatch : https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
                // :dispatchEvent() invokes event handlers synchronously
                // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events#event_bubbling
                //: trigger an event from a child element, and have an ancestor catch it(svg will catch it)

                _next.cell.dispatchEvent(new Event(createUserActivationAction()), {
                  bubbles: true
                });
              }

              return;
            }
          }
        }, {
          key: "activate",
          value: function activate(evt) {
            evt.preventDefault();

            if (isBlackCell(evt.target)) {
              return;
            } // prevent cell activation when we have multi-touch
            // // https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Multi-touch_interaction#pointer_down
            // if the device doesn't support PointerEvents, then we are listening to touches
            // In this case we don't want to listen to zooming (2 fingers)


            if (evt.touches && evt.touches.length == 2) {
              return;
            } // Handle dispatched synthetic event for initial highlighting


            if (!evt.touches && !evt.pointerType) {
              // dispatched event
              this.handleActivationEvent(evt);
              return;
            } // Handle MULTI-TOUCH event In case the device supports Pointer Events (we have set the PointerDown event in main.mjs)
            // we don't want to activate a cell when zooming or moving
            // @TODO: SEE ALSO PointerCancel: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/pointercancel_event


            if (this.pointerCaches[evt.type] && this.pointerCaches[evt.type].length) {
              this.clearCache(evt.type);
              return;
            } // non - synthetic events
            // Manage MULTI-touch event in case the device supports Pointer Events
            // the function will check if it is a PointerDown event
            // will not apply for Touch events


            this.pushEvent(evt); // Applies to PointerDown / TouchStart / MouseDown
            // we handle activation on PointerUp / TouchEnd / MouseUp 
            // because we want to cancel the activation if the user goes on to Zoom or Move the Board after the initial Start/Down event

            this.handleActivationOnEnd = this.handleActivationEvent.bind(this, evt);
            evt.target.addEventListener(createUserActionEnd(evt), this.handleActivationOnEnd, true);
          } // Captures Pointer, Touch and Mouse Events
          // the Function is overloaed with pointerupEvent if not called by dispatched synthetic event

        }, {
          key: "handleActivationEvent",
          value: function handleActivationEvent(startEvent, endEvent) {
            var el = this.shadowRoot.querySelector("#".concat(startEvent.target.id));

            if (el && el.id.includes('cell') && not(isBlackCell)(el)) {
              if (endEvent) {
                // If not dispatched synthetic event
                // Remove the PoinerUp eventListener from the cell that we will activate
                this.clearCache(startEvent.type);
              }

              if (this.rafPending) {
                return;
              } // doubleclicking to change direction (if not synthetic event (clicked from the list of clues))


              if (endEvent && this.selected && el.id == this.selected.id) {
                this.changeDirection();
                return;
              }

              this.selected = el;
              this.rafPending = true;
              var updateCellView = this.updateCellView.bind(this, startEvent);
              window.requestAnimationFrame(updateCellView); // allow next activation
            }
          } // @TODO - cache this in order not to search every time

        }, {
          key: "updateCellView",
          value: function updateCellView(evt) {
            var _this2 = this;

            if (!this.rafPending) {
              return;
            } // get the coords of the selected = variable


            var selectedVariableCoords = getCellVariable(this.selected, this.direction); // selected.getAttribute(`data-variable-${direction}`);           
            // get the cells that belong to the same variable as the selected  

            var refCells = this.activeCells.filter(function (cell) {
              return getCellVariable(cell, _this2.direction) == selectedVariableCoords;
            }); // @TODO/ cache the previously selected cells  to deselect them instead of updating all the activecells

            var notInSelectedCells = this.activeCells.filter(function (cell) {
              return !refCells.includes(cell);
            });
            notInSelectedCells.forEach(fillWhite);
            refCells.forEach(fillBlue);
            fillYellow(this.selected);
            this.rafPending = false; // make Aria Label

            var calculateWordIndexAndUpdate = this.calculateWordIndexAndUpdate.bind(this); // @ TODO - Move this to a Worker?

            window.requestAnimationFrame(calculateWordIndexAndUpdate);
          }
        }, {
          key: "calculateWordIndexAndUpdate",
          value: function calculateWordIndexAndUpdate() {
            var _this3 = this;

            var selectedCellCoords = getCellCoords(this.selected, this.crossword.width, this.crossword.height);
            var selectedCellVariable = getCellVariable(this.selected, this.direction).split('-'); //selected.getAttribute(`data-variable-${direction}`).split('-');

            var word = this.variables.find(function (v) {
              return Variable.isSameCell([v.i, v.j], selectedCellVariable) && v.direction == _this3.direction;
            });
            var letterIndex = word.cells.findIndex(function (cell) {
              return Variable.isSameCell(selectedCellCoords, cell);
            });
            var wordNumber = this.startOfWordCells.findIndex(function (_ref2) {
              var cell = _ref2.cell;
              return getCellVariable(cell, _this3.direction) == getCellVariable(_this3.selected, _this3.direction);
            });
            var clueNumber = wordNumber + 1; // make updates

            this.updateCluesList(clueNumber, this.direction);
            this.activeCells.forEach(this.makeCellAriaLabel.bind(this, word, letterIndex, clueNumber));
          }
        }, {
          key: "makeCellAriaLabel",
          value: function makeCellAriaLabel(word, letterIndex, clueNumber, cell) {
            var wordLengthDesc = "".concat(word.length, " letters");
            var prefix = "".concat(this.direction[0]).toUpperCase();
            cell.setAttributeNS(null, 'aria-label', "".concat(prefix).concat(clueNumber, ": clue, Answer: ").concat(wordLengthDesc, ", Letter ").concat(letterIndex + 1));
          }
        }, {
          key: "changeActiveCell",
          value: function changeActiveCell(cellNumber, diff) {
            var nextId = cellNumber + diff;
            var next = this.shadowRoot.querySelector("#cell-id-".concat(nextId));

            while (next && isBlackCell(next)) {
              nextId += diff;
              next = this.shadowRoot.querySelector("#cell-id-".concat(nextId));
            }

            if (next) {
              // synchronous dispatch : https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
              next.dispatchEvent(new Event(createUserActivationAction()), {
                bubbles: true
              }); // @TODO add new Event support for IE 11?
            }

            return next;
          }
        }, {
          key: "removeExistingContent",
          value: function removeExistingContent(cellId) {
            var letterId = cellId.replace('cell', 'letter');
            var text = this.shadowRoot.querySelector("#".concat(letterId));
            var hiddenText = this.shadowRoot.querySelector("#".concat(letterId, " .hidden"));

            var content = _toConsumableArray(text.childNodes).find(not(isHiddenNode));

            if (content) {
              text.removeChild(content);
            }

            return [text, hiddenText, content];
          }
        }, {
          key: "changeDirection",
          value: function changeDirection() {
            var _this4 = this;

            var _filter = [Variable.ACROSS, Variable.DOWN].filter(function (dir) {
              return dir !== _this4.direction;
            }),
                _filter2 = _slicedToArray(_filter, 1),
                changeDirection = _filter2[0];

            this.direction = changeDirection;
            var cell = this.selected;
            this.selected = null; // prevent loop

            cell.dispatchEvent(new Event(createUserActivationAction()), {
              bubbles: true
            });
          } // zoom and touchMove events

        }, {
          key: "touchAction",
          value: function touchAction(src, evt) {
            if (evt.cancelable) {
              evt.preventDefault();
            } // clear the cache for the pointerdown event that started this touchmove action, since we don't want to activate a cell


            this.clearCache('pointerdown'); // don't Move or PinchZoom for large devices

            if (window.screen.availWidth > 900) {
              //@TODO Ipad PRo?
              return;
            } // Zooming Applies Only to Touch Events


            if (evt.touches && evt.touches.length >= 2) {
              // REF: https://developers.google.com/web/fundamentals/design-and-ux/input/touch#use_requestanimationframe
              if (this.zoomPending || this.movePending) {
                return;
              }

              if (!this.zoomStart) {
                this.zoomStart = touchesDistance.apply(void 0, _toConsumableArray(evt.touches)); // consider the first pinch  as the Start event

                return;
              }

              var zoomNext = touchesDistance.apply(void 0, _toConsumableArray(evt.touches));
              var change = zoomNext - this.zoomStart; // Zoom In

              if (change > 0) {
                this.zoomLevel += change / 10;
              } else {
                // Zoom Out               
                this.zoomLevel -= (this.zoomStart - zoomNext) / 10;
              } // set zoom limits


              if (this.zoomLevel > this.zoomInLimit) {
                this.zoomLevel = this.zoomInLimit;
              }

              if (this.zoomLevel < this.zoomOutLimit) {
                this.zoomLevel = this.zoomOutLimit;
              }

              this.zoomPending = true;
              var f = this.pinchZoom.bind(this, src);
              window.requestAnimationFrame(f);
            } else {
              // Only for 1 finger Event = move
              // REF: https://developers.google.com/web/fundamentals/design-and-ux/input/touch#use_requestanimationframe
              if (this.zoomPending || this.movePending || this.zoomLevel == 1) {
                return;
              }

              if (!this.initialTouch) {
                this.initialTouch = getTouchCoordsFromEvent(evt);
                return;
              } else {
                var _getTouchCoordsFromEv = getTouchCoordsFromEvent(evt),
                    _getTouchCoordsFromEv2 = _slicedToArray(_getTouchCoordsFromEv, 2),
                    nextX = _getTouchCoordsFromEv2[0],
                    nextY = _getTouchCoordsFromEv2[1];

                var x = this.position[0] + -(this.initialTouch[0] - nextX);
                var y = this.position[1] + -(this.initialTouch[1] - nextY);

                var _f = this.touchMove.bind(this, src, x, y);

                this.movePending = true;
                window.requestAnimationFrame(_f);
              }
            }
          }
        }, {
          key: "pinchZoom",
          value: function pinchZoom(src) {
            if (!this.zoomPending) {
              return;
            }

            var x, y;

            if (this.zoomLevel == 1) {
              x = y = 0;
              this.lastHoldPosition = [x, y];
            } else {
              var _ref3 = _toConsumableArray(this.lastHoldPosition);

              x = _ref3[0];
              y = _ref3[1];
              // if there was a move
              // DO WE NEED THIS?
              x += Math.abs(this.zoomLevel - this.zoomInLimit) < Math.abs(this.zoomLevel - this.zoomOutLimit) ? 0.5 : -0.5;
              y += Math.abs(this.zoomLevel - this.zoomInLimit) < Math.abs(this.zoomLevel - this.zoomOutLimit) ? 0.5 : -0.5;
              this.lastHoldPosition = [x, y];
            }

            src.style.transition = 'transform 0s ease-out 0s';
            src.style.transform = "translate(".concat(x, "px, ").concat(y, "px) scale(").concat(this.zoomLevel, ")"); // allow next animation

            this.zoomPending = false;
            this.zoomStart = undefined;
          }
        }, {
          key: "touchMove",
          value: function touchMove(src, x, y) {
            if (!this.movePending) {
              return;
            }

            src.style.transition = 'transform 0s ease-out 0s';
            src.style.transform = "translate(".concat(x, "px, ").concat(y, "px) scale(").concat(this.zoomLevel, ")");
            this.lastHoldPosition = [x, y]; // allow next move

            this.movePending = false;
          } // this may be called before a previously scheduled RAF - the Browswer goes to render steps between or after tasks

        }, {
          key: "reset",
          value: function reset(src, evt) {
            if (evt.cancelable) {
              evt.preventDefault();
            } // update move event when touchMove ends


            this.position = _toConsumableArray(this.lastHoldPosition);
            this.initialTouch = undefined;
            this.zoomStart = undefined; // cancel beginning or zoom if we are resetting       
            //Schedule a reset if too large or to small
            //if too small, then reset to 1 AND center to the middle(x = y = o)
            // if too big, then reset to 2

            if (!this.zoomResetPending && (parseFloat(this.zoomLevel) < 1 || 2 <= parseFloat(this.zoomLevel))) {
              var resetZoom = function () {
                var x, y;

                if (!this.zoomResetPending) {
                  return;
                }

                this.zoomLevel = parseFloat(this.zoomLevel) < 1 ? 1 : 2; // touchEnd

                if (this.zoomLevel == 1) {
                  x = y = 0;
                  this.lastHoldPosition = [x, y];
                  this.position = _toConsumableArray(this.lastHoldPosition);
                } else {
                  var _this$lastHoldPositio = _slicedToArray(this.lastHoldPosition, 2);

                  x = _this$lastHoldPositio[0];
                  y = _this$lastHoldPositio[1];
                  // DO WE NEED THIS?
                  x += Math.abs(this.zoomLevel - this.zoomInLimit) < Math.abs(this.zoomLevel - this.zoomOutLimit) ? 0.5 : -0.5;
                  y += Math.abs(this.zoomLevel - this.zoomInLimit) < Math.abs(this.zoomLevel - this.zoomOutLimit) ? 0.5 : -0.5;
                  this.lastHoldPosition = [x, y];
                }

                src.style.transition = 'transform 0.5s ease-in 0s'; /// x,y are taken from the closure

                src.style.transform = "translate(".concat(x, "px, ").concat(y, "px) scale(").concat(this.zoomLevel, ")");
                this.zoomResetPending = false;
              }.bind(this);

              this.zoomResetPending = true;
              window.requestAnimationFrame(resetZoom);
            } // Schedule a reset touch position too left or too right


            var _src$getBoundingClien = src.getBoundingClientRect();
                _src$getBoundingClien.x;
                _src$getBoundingClien.y;
                var width = _src$getBoundingClien.width,
                height = _src$getBoundingClien.height,
                left = _src$getBoundingClien.left,
                top = _src$getBoundingClien.top,
                bottom = _src$getBoundingClien.bottom,
                right = _src$getBoundingClien.right;

            var keyBoardHeight = this.shadowRoot.querySelector('.touchControls.touch').getBoundingClientRect().height; //;

            var _window$screen = window.screen,
                availWidth = _window$screen.availWidth,
                availHeight = _window$screen.availHeight;
            var statusBarHeight = availHeight - window.innerHeight; // the reset values for the translate function are relative to the original position, considered 0, no matter the x,y values

            var _ref4 = _toConsumableArray(this.position),
                resetX = _ref4[0],
                resetY = _ref4[1];

            if (!this.moveResetPending && this.zoomLevel > 1) {
              var resetMove = function () {
                if (!this.moveResetPending) {
                  return;
                }

                if (left < -(width - availWidth)) {
                  resetX = (availWidth - width) / 2 - 10;
                } else if (right > width) {
                  // if we have moved from the original (right = width)
                  resetX = Math.abs((availWidth - width) / 2) + 10;
                } // console.log(top, height, bottom, availHeight);


                if (bottom > height) {
                  // if we moved down
                  resetY = Math.abs((availHeight - (keyBoardHeight + 10 + statusBarHeight) - height) / 2); //relative to the original
                } else if (top < -(height - statusBarHeight)) {
                  // don't pass over half of the screen
                  resetY = (availHeight - statusBarHeight - height) / 2;
                } // touchEnd         


                src.style.transition = 'transform 0.5s ease-in 0s'; /// x,y are taken from the closure

                src.style.transform = "translate(".concat(resetX, "px, ").concat(resetY, "px) scale(").concat(this.zoomLevel, ")");
                this.position = [resetX, resetY];
                this.lastHoldPosition = _toConsumableArray(this.position);
                this.moveResetPending = false;
              }.bind(this);

              this.moveResetPending = true;
              window.requestAnimationFrame(resetMove);
            }
          } // hanlde Multi-Touch events for devices that support PointerEvents
          // REF: https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Multi-touch_interaction#miscellaneous_functions

        }, {
          key: "getCache",
          value: function getCache(type) {
            // Return the cache for this event's target element
            return this.pointerCaches[type];
          }
        }, {
          key: "pushEvent",
          value: function pushEvent(ev) {
            // Save this event in the target's cache
            var cache = this.getCache(ev.type);

            if (cache) {
              // applies only for pointerdown events
              cache.push(ev);
            }
          }
        }, {
          key: "clearCache",
          value: function clearCache(type) {
            // Remove this event from the target's cache
            var cache = this.getCache(type);

            if (!cache) {
              return;
            }

            for (var i = 0; i < cache.length; i++) {
              //@ TODO change? be careful!! REMOVE the pointerup event for type = cache[pointerdown]       
              cache[i].target.removeEventListener(createUserActionEnd({
                type: type
              }), this.handleActivationOnEnd, true);
            }

            this.pointerCaches[type] = [];
            this.handleActivationOnEnd = undefined;
          }
        }, {
          key: "updateCluesList",
          value: function updateCluesList(clueNumber, direction) {
            var fromCluesList = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var addHighlight = this.addHighlight.bind(this); // remove previously selected style in Clues List

            if (this.selectedClue) {
              // no new change but maybe the crossed word has changed
              var _this$selectedClue$sp = this.selectedClue.split('-'),
                  _this$selectedClue$sp2 = _slicedToArray(_this$selectedClue$sp, 2),
                  previousDir = _this$selectedClue$sp2[0],
                  previousNum = _this$selectedClue$sp2[1];

              if (previousDir == direction && previousNum == clueNumber) {
                window.requestAnimationFrame(addHighlight);
                return;
              }

              this.shadowRoot.querySelector("[data-dir='".concat(previousDir, "'] [data-li-clue-index ='").concat(previousNum, "']")).classList.remove('activeClue');
            } // make the change


            this.direction = direction; //@TODO change the way we do this

            this.selectedClue = "".concat(this.direction, "-").concat(clueNumber);
            var active = this.shadowRoot.querySelector("[data-dir='".concat(this.direction, "'] [data-li-clue-index ='").concat(clueNumber, "']"));
            active.classList.add('activeClue');

            if (fromCluesList) {
              var gridCell = this.startOfWordCells[clueNumber - 1].cell;
              gridCell.dispatchEvent(new Event(createUserActivationAction(), {
                bubbles: true
              })); // first send the event to the svg
            } else {
              active.scrollIntoView();
            }

            window.requestAnimationFrame(addHighlight);
          } // animationFrame Queues don't run until all queued are completed
          // HightLight the crossed Clue for the one that is selected

        }, {
          key: "addHighlight",
          value: function addHighlight() {
            // IF WE ARE ON MOBILE DONT'T CONTINUE // SOS SOS SOS!!!!!!!!!!!  
            var scrolls = this.shadowRoot.querySelector('.scrolls ol');

            if (!scrolls) {
              console.log('touch');
              return;
            }

            if (this.highlightedClue) {
              var _this$highlightedClue = this.highlightedClue.split('-'),
                  _this$highlightedClue2 = _slicedToArray(_this$highlightedClue, 2),
                  previousDir = _this$highlightedClue2[0],
                  previousNum = _this$highlightedClue2[1];

              this.shadowRoot.querySelector("[data-dir='".concat(previousDir, "'] [data-li-clue-index ='").concat(previousNum, "']")).classList.remove('highlightedClue');
            }

            var otherDirection = this.direction == 'across' ? 'down' : 'across';
            var highlightedVariable = getCellVariable(this.selected, otherDirection); //selected.getAttribute(`data-variable-${direction}`).split('-');

            var highlightedClue = this.startOfWordCells.findIndex(function (_ref5) {
              var cell = _ref5.cell;
              return getCellVariable(cell, otherDirection) == highlightedVariable;
            }); // maybe there isn't a word on the other direction

            if (highlightedClue > -1) {
              var highlightedClueNumber = highlightedClue + 1;
              var highlightedLi = this.shadowRoot.querySelector("[data-dir='".concat(otherDirection, "'] [data-li-clue-index ='").concat(highlightedClueNumber, "']"));
              this.highlightedClue = "".concat(otherDirection, "-").concat(highlightedClueNumber);
              highlightedLi.classList.add('highlightedClue'); //@TODO SOS MAKE SURE WE ARE NOT DOING THIS ON MOBILE, BECAUSE IT WLL SCROLL TO VIEW THE OTHER DIRECTION!!!!!!!!!!!

              highlightedLi.scrollIntoView();
            }
          }
        }]);

        return Action;
      }(); // The Task queue is on the opposite side of the Render steps Ιnside a Frame
      // Rendering can happen in between Javascript Tasks BUT ALSO many tasks can happen before the BROWSER chooses to go to render steps
      // Javascript runs first in a frame BEFORE RAF: javascript -> style -> layout -> paint !!!!!!!!!!! (javascript -> RAF -> style-> layout -> paint)
      // BUT after javascript -> style -> layout -> paint, we can have another Javascript in the SAME frame
      //INSIDE A FRAME: Javasript will run to completion (empty task queue??) BEFORE rendering can happen:
      // An Event Listener  callbacks are queued Tasks (not a microTask)
      // Microtasks = promises, mutationObservers:
      // Event Listener callbacks are called asyncrhonously by User Interaction 
      // Event Listener callbacks are called synchronously by javascript
      //  If we have an asyncrhonous Task (User Interaction), that means that THIS task will run to completion, before a microtask can execute
      // If we have a syncrhonous function (DispatchEvent), then the SCRIPT is on the task queue and IT will have to execute to completion
      // before we can run microtasks
      // RAF RUNS IN THE RENDER STEPS, AFTER JAVASCRIPT EXECUTION !!!!!!!!!!! (oposite side of the Event Loop from the task queue) INSIDE A FRAME => , 
      // if we had changed style with javascript before RAF,
      // then in the render steps RAF will override the javascript changes when executing its own callback
      // FRAME: Javascript -> RAF -> style -> layout -> render

      var qwerty = [['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'], ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'], ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '&#9003;']];
      function createKeys() {
        var board = document.querySelector('.keyboard');
        console.log(board);

        var _iterator = _createForOfIteratorHelper(qwerty),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var row = _step.value;
            var group = document.createElement('div');
            group.classList.add('keyboard_row');

            var _iterator2 = _createForOfIteratorHelper(row),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var key = _step2.value;
                var btn = document.createElement('span');
                btn.innerHTML = key;
                btn.setAttribute('data-key', key);
                btn.classList.add('button');

                if (key == '&#9003;') {
                  btn.classList.add('backspace');
                }

                btn.setAttribute('role', 'button');
                group.appendChild(btn);
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }

            board.appendChild(group);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      function extractKeyEvent(evt) {
        var target = evt.target;
        var key = target.getAttribute('data-key') && target.getAttribute('data-key').trim();

        if (key == '&#9003;') {
          key = 'Backspace';
        } else {
          target.classList.add('pressed');
        }

        var type = evt.type,
            code = evt.code,
            shiftKey = evt.shiftKey;
        return {
          key: key,
          code: code,
          type: type,
          shiftKey: shiftKey
        };
      }
      function toggleKeyPressClass(evt) {
        evt.target.classList.remove('pressed');
        evt.target.removeEventListener('animationend', toggleKeyPressClass, true);
      }

      function init(shadowRoot) {
        var crosswordDimentions = [15, 15];
        var gridFiles = ['api/grids/7', 'api/words/'];
        var solutionFiles = ['api/solutions/7', 'api/clues/7']; // @TODO how dow we choose size?

        var cellSize = 33;
        var gridSpan = 495;
        var padding = 3;
        var letterFontSize = 22;
        var indexSize = 11;
        var letterPaddingLeft = cellSize * 0.25;
        var letterPaddingTop = cellSize * 0.85;
        var wordIndexPaddingLeft = padding / 1.5;
        var wordIndexPaddingTop = padding * 3.5; //startOfWordCells: Array of Objects: {cell, startOfWordVariable }[]

        var startOfWordCells = []; // this is in the order of the word indices for the display cells

        var svgNamespace = 'http://www.w3.org/2000/svg';
        shadowRoot.querySelector('main');
        var svg = shadowRoot.querySelector('svg');
        var board = shadowRoot.querySelector('.board');
        var keyboard = shadowRoot.querySelector('.keyboard');
        var touchControls = shadowRoot.querySelector('.touchControls'); // initial check for displaying a virtual keyboard, 
        // must change if there is touch BUT also a physical keyboard

        var useTouch = navigator.maxTouchPoints > 0;
        var checkedKeyboardAPI = false; //@TODO we don't need the vocab file for displaying a generated crossword

        Promise.all(gridFiles.map(function (file) {
          return fetch(file);
        })).then(function (responses) {
          return Promise.all(responses.map(function (response) {
            return response.json();
          }));
        }).then(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              structure = _ref2[0],
              words = _ref2[1];

          return _construct(Crossword, [structure, words].concat(crosswordDimentions));
        }).then(function (crossword) {
          return makeCells(crossword);
        }).then(function (crossword) {
          return makeGrid(crossword);
        }).then(function (crossword) {
          return addActions(crossword);
        }).then(function (actionInstance) {
          return displayKeyboard(actionInstance);
        }).catch(function (err) {
          console.log(err); // @ TODO handle the error
        }).then(function (actionInstance) {
          return Promise.all(solutionFiles.map(function (file) {
            return fetch(file);
          })) // create clusure for actionInstance
          .then(function (responses) {
            return Promise.all(responses.map(function (response) {
              return response.json();
            }));
          }).then(function (data) {
            return getClues(data);
          }).then(function (clues) {
            return displayClues(clues, actionInstance);
          }).then(function (actionInstance) {
            return initializeView(actionInstance);
          });
        }).catch(function (err) {
          console.log(err);
        }); // REF: https://www.motiontricks.com/creating-dynamic-svg-elements-with-javascript/

        function makeGrid(crossword) {
          var cellWidth = cellSize,
              cellHeight = cellWidth;
          var grid = document.createElementNS(svgNamespace, 'g');
          grid.setAttributeNS(null, 'data-group', 'grid'); // create the grid using a path element 

          var path = document.createElementNS(svgNamespace, 'path');
          var d = ''; // create  horizontal lines

          for (var i = 0; i < crossword.height - 1; i++) {
            d += "M".concat(padding, ",").concat((i + 1) * cellHeight + padding, " l").concat(gridSpan, ",0 ");
          } // create  vertical lines


          for (var _i = 0; _i < crossword.width - 1; _i++) {
            d += "M".concat((_i + 1) * cellHeight + padding, ",").concat(padding, " l0,").concat(gridSpan, " ");
          }

          path.setAttributeNS(null, 'd', d);
          path.setAttributeNS(null, 'stroke', 'dimgray');
          path.setAttributeNS(null, 'stroke-width', 1);
          path.setAttributeNS(null, 'vector-effect', 'non-scaling-stroke');
          grid.appendChild(path); // create the outlines

          var outline = document.createElementNS(svgNamespace, 'rect');
          outline.setAttributeNS(null, 'width', gridSpan + padding);
          outline.setAttributeNS(null, 'height', gridSpan + padding);
          outline.setAttributeNS(null, 'x', padding / 2);
          outline.setAttributeNS(null, 'y', padding / 2);
          outline.setAttributeNS(null, 'stroke', 'black');
          outline.setAttributeNS(null, 'stroke-width', padding);
          outline.setAttributeNS(null, 'fill', 'none');
          grid.appendChild(outline);
          svg.appendChild(grid);
          return crossword;
        }

        function makeCells(crossword) {
          var rectWidth, rectHeight;
          var variables = Array.from(crossword.variables);
          var counter = 1;
          var rowGroup = document.createElementNS(svgNamespace, 'g');
          rowGroup.setAttributeNS(null, 'data-group', 'cells');
          rowGroup.setAttributeNS(null, 'role', 'rowgroup'); //console.log(variables);

          var _loop = function _loop(i) {
            var row = crossword.structure[i];
            var cellGroup = document.createElementNS(svgNamespace, 'g');
            cellGroup.setAttributeNS(null, 'role', 'row');

            var _loop2 = function _loop2(j) {
              var wordIndex = document.createElementNS(svgNamespace, 'text');
              wordIndex.setAttributeNS(null, 'x', j * cellSize + padding + wordIndexPaddingLeft);
              wordIndex.setAttributeNS(null, 'y', i * cellSize + padding + wordIndexPaddingTop);
              wordIndex.setAttributeNS(null, 'stroke', 'black');
              wordIndex.setAttributeNS(null, 'stroke-width', '0.2');
              wordIndex.setAttributeNS(null, 'style', "font-size: ".concat(indexSize, "px"));
              var letter = document.createElementNS(svgNamespace, 'text');
              letter.setAttributeNS(null, 'x', j * cellSize + padding + letterPaddingLeft);
              letter.setAttributeNS(null, 'y', i * cellSize + padding + letterPaddingTop);
              letter.setAttributeNS(null, 'stroke', 'black');
              letter.setAttributeNS(null, 'stroke-width', '0.3');
              letter.setAttributeNS(null, 'id', "letter-id-".concat(i * crossword.width + j));
              letter.setAttributeNS(null, 'style', "font-size: ".concat(letterFontSize, "px")); // Help for Aria 

              var ariaLetter = document.createElementNS(svgNamespace, 'text');
              ariaLetter.setAttributeNS(null, 'aria-live', 'polite');
              ariaLetter.classList.add('hidden');
              letter.appendChild(ariaLetter);
              var cell = document.createElementNS(svgNamespace, 'rect');
              cell.setAttributeNS(null, 'id', "cell-id-".concat(i * crossword.width + j));

              if (!row[j]) {
                rectWidth = cellSize, rectHeight = rectWidth;
                cell.setAttributeNS(null, 'x', j * cellSize + padding);
                cell.setAttributeNS(null, 'y', i * cellSize + padding);
                cell.setAttributeNS(null, 'fill', '#333');
                cell.classList.add('black');
              } else {
                cell.setAttributeNS(null, 'id', "cell-id-".concat(i * crossword.width + j));
                var selectedVariables = variables.filter(function (v) {
                  return v.cells.find(function (cell) {
                    return Variable.isSameCell(cell, [i, j]);
                  });
                });

                var _iterator = _createForOfIteratorHelper(selectedVariables),
                    _step;

                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    var selectedVariable = _step.value;
                    cell.setAttributeNS(null, "data-variable-".concat(selectedVariable.direction), "".concat(selectedVariable.i, "-").concat(selectedVariable.j));
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }

                rectWidth = cellSize, rectHeight = rectWidth; // account for stroke width of the grid

                cell.setAttributeNS(null, 'x', j * cellSize + padding); // account for stroke width of the grid

                cell.setAttributeNS(null, 'y', i * cellSize + padding);
                cell.setAttributeNS(null, 'fill', '#fff'); // should be transparent? => fill = none
                //@TODO: precalculate this??? ([direction[counter]: ])

                var startOfWordVariable = variables.find(function (v) {
                  return v.i == i && v.j == j;
                });

                if (startOfWordVariable) {
                  wordIndex.textContent = counter;
                  startOfWordCells.push({
                    cell: cell,
                    startOfWordVariable: startOfWordVariable
                  });
                  counter++;
                }
              }

              cell.setAttributeNS(null, 'width', rectWidth);
              cell.setAttributeNS(null, 'height', rectHeight);
              cell.setAttributeNS(null, 'stroke-width', 0); // ARIA LABELS

              cell.setAttributeNS(null, 'role', 'gridcell');
              cellGroup.appendChild(cell); // the most deeply nested element will catch the events in the capturing phase

              cellGroup.appendChild(wordIndex);
              cellGroup.appendChild(letter); //letter.textContent = 'A';            

              rowGroup.appendChild(cellGroup);
            };

            for (var j = 0; j < crossword.width; j++) {
              _loop2(j);
            }
          };

          for (var i = 0; i < crossword.height; i++) {
            _loop(i);
          }

          svg.appendChild(rowGroup);
          return crossword;
        }

        function addActions(crossword) {
          var direction = startOfWordCells[0].startOfWordVariable.direction;
          var action = new Action(crossword, direction, startOfWordCells, shadowRoot);
          var activate = action.activate.bind(action);
          var keydown = action.keydown.bind(action);
          var touchAction = action.touchAction.bind(action, board);
          var reset = action.reset.bind(action, board);
          var cell = shadowRoot.querySelector('#cell-id-0');
          action.cellSpace = cell.getBoundingClientRect(); // ACTIVATE CELL EVENT

          if (window.PointerEvent) {
            // Add Pointer Event Listener
            // allow click event on cell to bubble upwards to the svg 
            // clicks will be captured by the svg before the cells underneath it        
            svg.addEventListener('pointerdown', activate, true);
          } else {
            // add Touch event
            svg.addEventListener('touchstart', activate, true);
            svg.addEventListener('mousedown', activate, true);
          } // @ TODO: DO we need this when we have a touch screen?
          // Trap device Keyboard  Events!


          document.addEventListener('keydown', function (evt) {
            evt.preventDefault(); // @ TODO replace the target check if it is out of functional elements

            if (!action.selected && evt.key == 'Tab') {
              // send the activation event to parent (svg) via the child (cell)          
              cell.dispatchEvent(new Event(createUserActivationAction(), {
                bubbles: true
              }));
              return;
            }

            if (action.selected) {
              var key = evt.key,
                  code = evt.code,
                  type = evt.type,
                  shiftKey = evt.shiftKey; // send Sythesized event      
              // keydown({target: action.selected, id:action.selected.id, key, code, type, shiftKey});            

              keydown({
                key: key,
                code: code,
                type: type,
                shiftKey: shiftKey
              });
            } //If a keydown event has been sent, then the user has keyboard => we can remove virtual keyboard and touch


            keyboard.classList.remove('touch');
            useTouch = false;
          }, true); // treat move event as initial touch

          board.addEventListener('touchmove', touchAction, true); // for zooming

          board.addEventListener('touchend', reset, true); // hanlde Move Actions for Pens on touch-enabled screens

          if (window.PointerEvent && useTouch) {
            // Add Pointer Event Listener for touch screens AND input devices other than touch (like pen)
            var penEventHandler = function penEventHandler(evt) {
              // https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/pointerType - touch, mouse, pen
              if (evt.pointerType == 'pen') {
                if (evt.type == 'pointermove') {
                  evt.target.setPointerCapture(evt.pointerId);
                  touchAction(evt);
                }

                if (evt.type == 'pointerup') {
                  evt.target.releasePointerCapture(evt.pointerId);
                  reset(evt);
                }
              }
            };

            board.addEventListener('pointermove', penEventHandler, true);
            board.addEventListener('pointerup', penEventHandler, true);
          } // return the action instance 


          return action;
        }

        function displayKeyboard(_x) {
          return _displayKeyboard.apply(this, arguments);
        } // @TODO Move to generation files!!!!!!!!!!!!!! 


        function _displayKeyboard() {
          _displayKeyboard = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(actionInstance) {
            var keydown, handleKeyEvent;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!(useTouch && navigator.keyboard)) {
                      _context.next = 10;
                      break;
                    }

                    if (!checkedKeyboardAPI) {
                      _context.next = 5;
                      break;
                    }

                    _context.t0 = useTouch;
                    _context.next = 8;
                    break;

                  case 5:
                    _context.next = 7;
                    return navigator.keyboard.getLayoutMap().then(function (map) {
                      return !Boolean(map.size);
                    });

                  case 7:
                    _context.t0 = _context.sent;

                  case 8:
                    useTouch = _context.t0;
                    // uses keyboard
                    checkedKeyboardAPI = true;

                  case 10:
                    if (!useTouch) {
                      // browser supports multi-touch
                      keyboard.classList.remove('touch');
                    } else {
                      keyboard.classList.add('touch');
                      console.log('touch'); // Manage keyDown events on the virtual keyboard        

                      keydown = actionInstance.keydown.bind(actionInstance);

                      handleKeyEvent = function handleKeyEvent(evt) {
                        // handle virtual keyboar animations
                        evt.target.addEventListener('animationend', toggleKeyPressClass, true);
                        keydown(extractKeyEvent(evt));
                      };

                      Promise.resolve(createKeys()).then(function (_) {
                        // Add crossword keyboard Events for touch devices that don't have keyboard
                        if (window.PointerEvent) {
                          // Add Pointer Event Listener                    
                          keyboard.addEventListener('pointerdown', handleKeyEvent, true);
                        } else {
                          // add Touch Event Listener
                          keyboard.addEventListener('touchstart', handleKeyEvent, true); // might be using a mouse with a touch enambled device that doesn't use a keyboard? eg. Microsoft surface?

                          keyboard.addEventListener('mousedown', handleKeyEvent, true);
                        }
                      }).catch(console.error);
                    }

                    return _context.abrupt("return", actionInstance);

                  case 12:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));
          return _displayKeyboard.apply(this, arguments);
        }

        function getClues(_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              solution = _ref4[0].solution,
              clues = _ref4[1].clues;

          //console.log(solution, clues)
          var allClues = {
            'across': {},
            'down': {}
          };

          var _loop3 = function _loop3(keyVariable) {
            // convert to javascript class from json string
            var classFunction = new Function("Variable = ".concat(Variable, "; return new ").concat(keyVariable, "; "));
            var variable = classFunction();
            var clue = solution[keyVariable];
            var wordIndex = startOfWordCells.findIndex(function (_ref5) {
              var startOfWordVariable = _ref5.startOfWordVariable;
              return startOfWordVariable.i == variable.i && startOfWordVariable.j == variable.j;
            });
            allClues[variable.direction][wordIndex + 1] = _defineProperty({}, clue, clues[clue]);
          };

          for (var keyVariable in solution) {
            _loop3(keyVariable);
          }
          return allClues;
        }

        function displayClues(clues, actionInstance) {
          console.log(clues);

          if (!useTouch) {
            displayDesktopClues(clues, actionInstance);
          } else {
            displayTouchClues(clues, actionInstance);
          }

          return actionInstance;
        }

        function createCluesList(clues, direction) {
          var ol = document.createElement('ol');
          ol.setAttribute('data-dir', direction);

          for (var clueNumber in clues[direction]) {
            var li = document.createElement('li');
            li.setAttribute('data-li-clue-index', "".concat(clueNumber));
            var numberCell = document.createElement('span');
            var numberText = void 0;

            if (useTouch) {
              numberText = document.createTextNode("".concat(clueNumber).concat(direction[0]));
            } else {
              numberText = document.createTextNode("".concat(clueNumber));
            }

            numberCell.appendChild(numberText);
            li.appendChild(numberCell);
            var clueCell = document.createElement('span');
            var obj = clues[direction][clueNumber];
            var clueText = document.createTextNode("".concat(Object.values(obj)[0]));
            clueCell.setAttribute('data-clue-index', "".concat(clueNumber));
            numberCell.setAttribute('data-clue-index', "".concat(clueNumber));
            clueCell.appendChild(clueText);
            li.appendChild(clueCell);
            ol.appendChild(li);
          }

          return ol;
        }

        function activateFromCluesList(evt, parent, actionInstance) {
          var target = evt.target;
          var clueNumber = target.getAttribute('data-clue-index');

          if (!clueNumber) {
            return;
          } // @TODO change directly the actionInstace directin from here??


          var direction = parent.getAttribute('data-dir');

          if (actionInstance.selectedClue && actionInstance.selectedClue == "".concat(direction, "-").concat(clueNumber)) {
            return;
          }

          actionInstance.updateCluesList(clueNumber, direction, true);
        }

        function displayDesktopClues(clues, actionInstance) {
          var section = shadowRoot.querySelector('section[aria-label="puzzle clues"]');
          var sectionDiv = shadowRoot.querySelector('section .scrolls');

          var activationFunction = function activationFunction(evt) {
            var parentElement = this;
            activateFromCluesList(evt, parentElement, actionInstance);
          };

          for (var direction in clues) {
            var div = document.createElement('div');
            var header = document.createElement('h4');
            var headerTitle = document.createTextNode("".concat(direction));
            header.appendChild(headerTitle);
            div.appendChild(header);
            var list = createCluesList(clues, direction);
            div.appendChild(list);
            sectionDiv.appendChild(div);

            if (window.PointerEvent) {
              list.addEventListener('pointerdown', activationFunction, true);
            } else {
              list.addEventListener('touchstart', activationFunction, true);
              list.addEventListener('mousedown', activationFunction, true);
            }
          }

          sectionDiv.removeAttribute('hidden');
          section.removeAttribute('hidden');
        }

        function displayTouchClues(clues, actionInstance) {
          var cluesDiv = shadowRoot.querySelector('.touchClues');
          var cluesText = shadowRoot.querySelector('.clueText .container');

          var _shadowRoot$querySele = shadowRoot.querySelectorAll('.touchClues .chevron'),
              _shadowRoot$querySele2 = _slicedToArray(_shadowRoot$querySele, 2),
              leftnav = _shadowRoot$querySele2[0],
              rightnav = _shadowRoot$querySele2[1]; // cluesDiv.setAttribute('data-dir', actionInstance.direction);
          // cluesText.setAttribute('data-clue-index', 1);


          var changeDirectionFunction = actionInstance.changeDirection.bind(actionInstance);
          var keydown = actionInstance.keydown.bind(actionInstance);
          var reset = actionInstance.reset.bind(actionInstance, board);

          var navigationFunction = function navigationFunction(evt) {
            evt.preventDefault(); // synthesized event: {key, code, type, shiftKey}       

            var synthesizedEvent = {
              key: 'Tab',
              code: 'Tab',
              type: evt.type,
              shiftKey: evt.target == leftnav
            }; // closure

            keydown(synthesizedEvent); // this should be synchronously dispatched!
            // the selected cell sould be set synchronously by the syncrhonous keydown call above

            if (actionInstance.zoomLevel > 1 && !actionInstance.movePending) {
              var _actionInstance$selec = actionInstance.selected.getBoundingClientRect(),
                  x = _actionInstance$selec.x,
                  y = _actionInstance$selec.y;

              var diffX = actionInstance.lastHoldPosition[0] - x + window.screen.availWidth / 2;
              var diffY = actionInstance.lastHoldPosition[1] - y + window.screen.availHeight / 4;
              var moveTo = actionInstance.touchMove.bind(actionInstance, board, diffX, diffY);
              actionInstance.movePending = true;
              window.requestAnimationFrame(moveTo);
            }
          };

          for (var direction in clues) {
            var list = createCluesList(clues, direction);
            cluesText.appendChild(list);

            if (window.PointerEvent) {
              list.addEventListener('pointerdown', changeDirectionFunction, true);
            } else {
              list.addEventListener('touchstart', changeDirectionFunction, true);
              list.addEventListener('mousedown', changeDirectionFunction, true);
            }
          } // add navigation action from chevrons


          if (window.PointerEvent) {
            leftnav.addEventListener('pointerdown', navigationFunction, true);
            rightnav.addEventListener('pointerdown', navigationFunction, true);
            leftnav.addEventListener('pointerup', reset, true);
            rightnav.addEventListener('pointerup', reset, true);
          } else {
            leftnav.addEventListener('touchstart', navigationFunction, true);
            rightnav.addEventListener('touchstart', navigationFunction, true);
            leftnav.addEventListener('touchend', reset, true);
            rightnav.addEventListener('touchend', reset, true);
            leftnav.addEventListener('mousedown', navigationFunction, true);
            rightnav.addEventListener('mousedown', navigationFunction, true);
            leftnav.addEventListener('mouseup', reset, true);
            rightnav.addEventListener('mouseup', reset, true);
          }

          cluesDiv.classList.add('touch');
          touchControls.classList.add('touch');
        }

        function initializeView(actionInstance) {
          // set initial active cell
          if (!actionInstance.selected) {
            var firstWord = startOfWordCells[0];
            firstWord.cell.dispatchEvent(new Event(createUserActivationAction(), {
              bubbles: true
            }));
          }
        }
      }

      /**
       * @license
       * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
       * This code may only be used under the BSD style license found at
       * http://polymer.github.io/LICENSE.txt
       * The complete set of authors may be found at
       * http://polymer.github.io/AUTHORS.txt
       * The complete set of contributors may be found at
       * http://polymer.github.io/CONTRIBUTORS.txt
       * Code distributed by Google as part of the polymer project is also
       * subject to an additional IP rights grant found at
       * http://polymer.github.io/PATENTS.txt
       */

      /**
       * True if the custom elements polyfill is in use.
       */
      var isCEPolyfill = typeof window !== 'undefined' && window.customElements != null && window.customElements.polyfillWrapFlushCallback !== undefined;
      /**
       * Removes nodes, starting from `start` (inclusive) to `end` (exclusive), from
       * `container`.
       */

      var removeNodes = function removeNodes(container, start) {
        var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

        while (start !== end) {
          var n = start.nextSibling;
          container.removeChild(start);
          start = n;
        }
      };

      /**
       * @license
       * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
       * This code may only be used under the BSD style license found at
       * http://polymer.github.io/LICENSE.txt
       * The complete set of authors may be found at
       * http://polymer.github.io/AUTHORS.txt
       * The complete set of contributors may be found at
       * http://polymer.github.io/CONTRIBUTORS.txt
       * Code distributed by Google as part of the polymer project is also
       * subject to an additional IP rights grant found at
       * http://polymer.github.io/PATENTS.txt
       */

      /**
       * An expression marker with embedded unique key to avoid collision with
       * possible text in templates.
       */
      var marker = "{{lit-".concat(String(Math.random()).slice(2), "}}");
      /**
       * An expression marker used text-positions, multi-binding attributes, and
       * attributes with markup-like text values.
       */

      var nodeMarker = "<!--".concat(marker, "-->");
      var markerRegex = new RegExp("".concat(marker, "|").concat(nodeMarker));
      /**
       * Suffix appended to all bound attribute names.
       */

      var boundAttributeSuffix = '$lit$';
      /**
       * An updatable Template that tracks the location of dynamic parts.
       */

      var Template = function Template(result, element) {
        _classCallCheck(this, Template);

        this.parts = [];
        this.element = element;
        var nodesToRemove = [];
        var stack = []; // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null

        var walker = document.createTreeWalker(element.content, 133
        /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
        , null, false); // Keeps track of the last index associated with a part. We try to delete
        // unnecessary nodes, but we never want to associate two different parts
        // to the same index. They must have a constant node between.

        var lastPartIndex = 0;
        var index = -1;
        var partIndex = 0;
        var strings = result.strings,
            length = result.values.length;

        while (partIndex < length) {
          var node = walker.nextNode();

          if (node === null) {
            // We've exhausted the content inside a nested template element.
            // Because we still have parts (the outer for-loop), we know:
            // - There is a template in the stack
            // - The walker will find a nextNode outside the template
            walker.currentNode = stack.pop();
            continue;
          }

          index++;

          if (node.nodeType === 1
          /* Node.ELEMENT_NODE */
          ) {
              if (node.hasAttributes()) {
                var attributes = node.attributes;
                var _length = attributes.length; // Per
                // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
                // attributes are not guaranteed to be returned in document order.
                // In particular, Edge/IE can return them out of order, so we cannot
                // assume a correspondence between part index and attribute index.

                var count = 0;

                for (var i = 0; i < _length; i++) {
                  if (endsWith(attributes[i].name, boundAttributeSuffix)) {
                    count++;
                  }
                }

                while (count-- > 0) {
                  // Get the template literal section leading up to the first
                  // expression in this attribute
                  var stringForPart = strings[partIndex]; // Find the attribute name

                  var name = lastAttributeNameRegex.exec(stringForPart)[2]; // Find the corresponding attribute
                  // All bound attributes have had a suffix added in
                  // TemplateResult#getHTML to opt out of special attribute
                  // handling. To look up the attribute value we also need to add
                  // the suffix.

                  var attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
                  var attributeValue = node.getAttribute(attributeLookupName);
                  node.removeAttribute(attributeLookupName);
                  var statics = attributeValue.split(markerRegex);
                  this.parts.push({
                    type: 'attribute',
                    index: index,
                    name: name,
                    strings: statics
                  });
                  partIndex += statics.length - 1;
                }
              }

              if (node.tagName === 'TEMPLATE') {
                stack.push(node);
                walker.currentNode = node.content;
              }
            } else if (node.nodeType === 3
          /* Node.TEXT_NODE */
          ) {
              var data = node.data;

              if (data.indexOf(marker) >= 0) {
                var parent = node.parentNode;

                var _strings = data.split(markerRegex);

                var lastIndex = _strings.length - 1; // Generate a new text node for each literal section
                // These nodes are also used as the markers for node parts

                for (var _i = 0; _i < lastIndex; _i++) {
                  var insert = void 0;
                  var s = _strings[_i];

                  if (s === '') {
                    insert = createMarker();
                  } else {
                    var match = lastAttributeNameRegex.exec(s);

                    if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                      s = s.slice(0, match.index) + match[1] + match[2].slice(0, -boundAttributeSuffix.length) + match[3];
                    }

                    insert = document.createTextNode(s);
                  }

                  parent.insertBefore(insert, node);
                  this.parts.push({
                    type: 'node',
                    index: ++index
                  });
                } // If there's no text, we must insert a comment to mark our place.
                // Else, we can trust it will stick around after cloning.


                if (_strings[lastIndex] === '') {
                  parent.insertBefore(createMarker(), node);
                  nodesToRemove.push(node);
                } else {
                  node.data = _strings[lastIndex];
                } // We have a part for each match found


                partIndex += lastIndex;
              }
            } else if (node.nodeType === 8
          /* Node.COMMENT_NODE */
          ) {
              if (node.data === marker) {
                var _parent = node.parentNode; // Add a new marker node to be the startNode of the Part if any of
                // the following are true:
                //  * We don't have a previousSibling
                //  * The previousSibling is already the start of a previous part

                if (node.previousSibling === null || index === lastPartIndex) {
                  index++;

                  _parent.insertBefore(createMarker(), node);
                }

                lastPartIndex = index;
                this.parts.push({
                  type: 'node',
                  index: index
                }); // If we don't have a nextSibling, keep this node so we have an end.
                // Else, we can remove it to save future costs.

                if (node.nextSibling === null) {
                  node.data = '';
                } else {
                  nodesToRemove.push(node);
                  index--;
                }

                partIndex++;
              } else {
                var _i2 = -1;

                while ((_i2 = node.data.indexOf(marker, _i2 + 1)) !== -1) {
                  // Comment node has a binding marker inside, make an inactive part
                  // The binding won't work, but subsequent bindings will
                  // TODO (justinfagnani): consider whether it's even worth it to
                  // make bindings in comments work
                  this.parts.push({
                    type: 'node',
                    index: -1
                  });
                  partIndex++;
                }
              }
            }
        } // Remove text binding nodes after the walk to not disturb the TreeWalker


        for (var _i3 = 0, _nodesToRemove = nodesToRemove; _i3 < _nodesToRemove.length; _i3++) {
          var n = _nodesToRemove[_i3];
          n.parentNode.removeChild(n);
        }
      };

      var endsWith = function endsWith(str, suffix) {
        var index = str.length - suffix.length;
        return index >= 0 && str.slice(index) === suffix;
      };

      var isTemplatePartActive = function isTemplatePartActive(part) {
        return part.index !== -1;
      }; // Allows `document.createComment('')` to be renamed for a
      // small manual size-savings.

      var createMarker = function createMarker() {
        return document.createComment('');
      };
      /**
       * This regex extracts the attribute name preceding an attribute-position
       * expression. It does this by matching the syntax allowed for attributes
       * against the string literal directly preceding the expression, assuming that
       * the expression is in an attribute-value position.
       *
       * See attributes in the HTML spec:
       * https://www.w3.org/TR/html5/syntax.html#elements-attributes
       *
       * " \x09\x0a\x0c\x0d" are HTML space characters:
       * https://www.w3.org/TR/html5/infrastructure.html#space-characters
       *
       * "\0-\x1F\x7F-\x9F" are Unicode control characters, which includes every
       * space character except " ".
       *
       * So an attribute is:
       *  * The name: any character except a control character, space character, ('),
       *    ("), ">", "=", or "/"
       *  * Followed by zero or more space characters
       *  * Followed by "="
       *  * Followed by zero or more space characters
       *  * Followed by:
       *    * Any character except space, ('), ("), "<", ">", "=", (`), or
       *    * (") then any non-("), or
       *    * (') then any non-(')
       */

      var lastAttributeNameRegex = // eslint-disable-next-line no-control-regex
      /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;

      /**
       * @license
       * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
       * This code may only be used under the BSD style license found at
       * http://polymer.github.io/LICENSE.txt
       * The complete set of authors may be found at
       * http://polymer.github.io/AUTHORS.txt
       * The complete set of contributors may be found at
       * http://polymer.github.io/CONTRIBUTORS.txt
       * Code distributed by Google as part of the polymer project is also
       * subject to an additional IP rights grant found at
       * http://polymer.github.io/PATENTS.txt
       */
      var walkerNodeFilter = 133
      /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
      ;
      /**
       * Removes the list of nodes from a Template safely. In addition to removing
       * nodes from the Template, the Template part indices are updated to match
       * the mutated Template DOM.
       *
       * As the template is walked the removal state is tracked and
       * part indices are adjusted as needed.
       *
       * div
       *   div#1 (remove) <-- start removing (removing node is div#1)
       *     div
       *       div#2 (remove)  <-- continue removing (removing node is still div#1)
       *         div
       * div <-- stop removing since previous sibling is the removing node (div#1,
       * removed 4 nodes)
       */

      function removeNodesFromTemplate(template, nodesToRemove) {
        var content = template.element.content,
            parts = template.parts;
        var walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
        var partIndex = nextActiveIndexInTemplateParts(parts);
        var part = parts[partIndex];
        var nodeIndex = -1;
        var removeCount = 0;
        var nodesToRemoveInTemplate = [];
        var currentRemovingNode = null;

        while (walker.nextNode()) {
          nodeIndex++;
          var node = walker.currentNode; // End removal if stepped past the removing node

          if (node.previousSibling === currentRemovingNode) {
            currentRemovingNode = null;
          } // A node to remove was found in the template


          if (nodesToRemove.has(node)) {
            nodesToRemoveInTemplate.push(node); // Track node we're removing

            if (currentRemovingNode === null) {
              currentRemovingNode = node;
            }
          } // When removing, increment count by which to adjust subsequent part indices


          if (currentRemovingNode !== null) {
            removeCount++;
          }

          while (part !== undefined && part.index === nodeIndex) {
            // If part is in a removed node deactivate it by setting index to -1 or
            // adjust the index as needed.
            part.index = currentRemovingNode !== null ? -1 : part.index - removeCount; // go to the next active part.

            partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
            part = parts[partIndex];
          }
        }

        nodesToRemoveInTemplate.forEach(function (n) {
          return n.parentNode.removeChild(n);
        });
      }

      var countNodes = function countNodes(node) {
        var count = node.nodeType === 11
        /* Node.DOCUMENT_FRAGMENT_NODE */
        ? 0 : 1;
        var walker = document.createTreeWalker(node, walkerNodeFilter, null, false);

        while (walker.nextNode()) {
          count++;
        }

        return count;
      };

      var nextActiveIndexInTemplateParts = function nextActiveIndexInTemplateParts(parts) {
        var startIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

        for (var i = startIndex + 1; i < parts.length; i++) {
          var part = parts[i];

          if (isTemplatePartActive(part)) {
            return i;
          }
        }

        return -1;
      };
      /**
       * Inserts the given node into the Template, optionally before the given
       * refNode. In addition to inserting the node into the Template, the Template
       * part indices are updated to match the mutated Template DOM.
       */


      function insertNodeIntoTemplate(template, node) {
        var refNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var content = template.element.content,
            parts = template.parts; // If there's no refNode, then put node at end of template.
        // No part indices need to be shifted in this case.

        if (refNode === null || refNode === undefined) {
          content.appendChild(node);
          return;
        }

        var walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
        var partIndex = nextActiveIndexInTemplateParts(parts);
        var insertCount = 0;
        var walkerIndex = -1;

        while (walker.nextNode()) {
          walkerIndex++;
          var walkerNode = walker.currentNode;

          if (walkerNode === refNode) {
            insertCount = countNodes(node);
            refNode.parentNode.insertBefore(node, refNode);
          }

          while (partIndex !== -1 && parts[partIndex].index === walkerIndex) {
            // If we've inserted the node, simply adjust all subsequent parts
            if (insertCount > 0) {
              while (partIndex !== -1) {
                parts[partIndex].index += insertCount;
                partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
              }

              return;
            }

            partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
          }
        }
      }

      /**
       * @license
       * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
       * This code may only be used under the BSD style license found at
       * http://polymer.github.io/LICENSE.txt
       * The complete set of authors may be found at
       * http://polymer.github.io/AUTHORS.txt
       * The complete set of contributors may be found at
       * http://polymer.github.io/CONTRIBUTORS.txt
       * Code distributed by Google as part of the polymer project is also
       * subject to an additional IP rights grant found at
       * http://polymer.github.io/PATENTS.txt
       */
      var directives = new WeakMap();
      var isDirective = function isDirective(o) {
        return typeof o === 'function' && directives.has(o);
      };

      /**
       * @license
       * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
       * This code may only be used under the BSD style license found at
       * http://polymer.github.io/LICENSE.txt
       * The complete set of authors may be found at
       * http://polymer.github.io/AUTHORS.txt
       * The complete set of contributors may be found at
       * http://polymer.github.io/CONTRIBUTORS.txt
       * Code distributed by Google as part of the polymer project is also
       * subject to an additional IP rights grant found at
       * http://polymer.github.io/PATENTS.txt
       */

      /**
       * A sentinel value that signals that a value was handled by a directive and
       * should not be written to the DOM.
       */
      var noChange = {};
      /**
       * A sentinel value that signals a NodePart to fully clear its content.
       */

      var nothing = {};

      /**
       * An instance of a `Template` that can be attached to the DOM and updated
       * with new values.
       */

      var TemplateInstance = /*#__PURE__*/function () {
        function TemplateInstance(template, processor, options) {
          _classCallCheck(this, TemplateInstance);

          this.__parts = [];
          this.template = template;
          this.processor = processor;
          this.options = options;
        }

        _createClass(TemplateInstance, [{
          key: "update",
          value: function update(values) {
            var i = 0;

            var _iterator = _createForOfIteratorHelper(this.__parts),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var part = _step.value;

                if (part !== undefined) {
                  part.setValue(values[i]);
                }

                i++;
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            var _iterator2 = _createForOfIteratorHelper(this.__parts),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var _part = _step2.value;

                if (_part !== undefined) {
                  _part.commit();
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }
        }, {
          key: "_clone",
          value: function _clone() {
            // There are a number of steps in the lifecycle of a template instance's
            // DOM fragment:
            //  1. Clone - create the instance fragment
            //  2. Adopt - adopt into the main document
            //  3. Process - find part markers and create parts
            //  4. Upgrade - upgrade custom elements
            //  5. Update - set node, attribute, property, etc., values
            //  6. Connect - connect to the document. Optional and outside of this
            //     method.
            //
            // We have a few constraints on the ordering of these steps:
            //  * We need to upgrade before updating, so that property values will pass
            //    through any property setters.
            //  * We would like to process before upgrading so that we're sure that the
            //    cloned fragment is inert and not disturbed by self-modifying DOM.
            //  * We want custom elements to upgrade even in disconnected fragments.
            //
            // Given these constraints, with full custom elements support we would
            // prefer the order: Clone, Process, Adopt, Upgrade, Update, Connect
            //
            // But Safari does not implement CustomElementRegistry#upgrade, so we
            // can not implement that order and still have upgrade-before-update and
            // upgrade disconnected fragments. So we instead sacrifice the
            // process-before-upgrade constraint, since in Custom Elements v1 elements
            // must not modify their light DOM in the constructor. We still have issues
            // when co-existing with CEv0 elements like Polymer 1, and with polyfills
            // that don't strictly adhere to the no-modification rule because shadow
            // DOM, which may be created in the constructor, is emulated by being placed
            // in the light DOM.
            //
            // The resulting order is on native is: Clone, Adopt, Upgrade, Process,
            // Update, Connect. document.importNode() performs Clone, Adopt, and Upgrade
            // in one step.
            //
            // The Custom Elements v1 polyfill supports upgrade(), so the order when
            // polyfilled is the more ideal: Clone, Process, Adopt, Upgrade, Update,
            // Connect.
            var fragment = isCEPolyfill ? this.template.element.content.cloneNode(true) : document.importNode(this.template.element.content, true);
            var stack = [];
            var parts = this.template.parts; // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null

            var walker = document.createTreeWalker(fragment, 133
            /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
            , null, false);
            var partIndex = 0;
            var nodeIndex = 0;
            var part;
            var node = walker.nextNode(); // Loop through all the nodes and parts of a template

            while (partIndex < parts.length) {
              part = parts[partIndex];

              if (!isTemplatePartActive(part)) {
                this.__parts.push(undefined);

                partIndex++;
                continue;
              } // Progress the tree walker until we find our next part's node.
              // Note that multiple parts may share the same node (attribute parts
              // on a single element), so this loop may not run at all.


              while (nodeIndex < part.index) {
                nodeIndex++;

                if (node.nodeName === 'TEMPLATE') {
                  stack.push(node);
                  walker.currentNode = node.content;
                }

                if ((node = walker.nextNode()) === null) {
                  // We've exhausted the content inside a nested template element.
                  // Because we still have parts (the outer for-loop), we know:
                  // - There is a template in the stack
                  // - The walker will find a nextNode outside the template
                  walker.currentNode = stack.pop();
                  node = walker.nextNode();
                }
              } // We've arrived at our part's node.


              if (part.type === 'node') {
                var _part2 = this.processor.handleTextExpression(this.options);

                _part2.insertAfterNode(node.previousSibling);

                this.__parts.push(_part2);
              } else {
                var _this$__parts;

                (_this$__parts = this.__parts).push.apply(_this$__parts, _toConsumableArray(this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options)));
              }

              partIndex++;
            }

            if (isCEPolyfill) {
              document.adoptNode(fragment);
              customElements.upgrade(fragment);
            }

            return fragment;
          }
        }]);

        return TemplateInstance;
      }();

      /**
       * Our TrustedTypePolicy for HTML which is declared using the html template
       * tag function.
       *
       * That HTML is a developer-authored constant, and is parsed with innerHTML
       * before any untrusted expressions have been mixed in. Therefor it is
       * considered safe by construction.
       */

      var policy = window.trustedTypes && trustedTypes.createPolicy('lit-html', {
        createHTML: function createHTML(s) {
          return s;
        }
      });
      var commentMarker = " ".concat(marker, " ");
      /**
       * The return type of `html`, which holds a Template and the values from
       * interpolated expressions.
       */

      var TemplateResult = /*#__PURE__*/function () {
        function TemplateResult(strings, values, type, processor) {
          _classCallCheck(this, TemplateResult);

          this.strings = strings;
          this.values = values;
          this.type = type;
          this.processor = processor;
        }
        /**
         * Returns a string of HTML used to create a `<template>` element.
         */


        _createClass(TemplateResult, [{
          key: "getHTML",
          value: function getHTML() {
            var l = this.strings.length - 1;
            var html = '';
            var isCommentBinding = false;

            for (var i = 0; i < l; i++) {
              var s = this.strings[i]; // For each binding we want to determine the kind of marker to insert
              // into the template source before it's parsed by the browser's HTML
              // parser. The marker type is based on whether the expression is in an
              // attribute, text, or comment position.
              //   * For node-position bindings we insert a comment with the marker
              //     sentinel as its text content, like <!--{{lit-guid}}-->.
              //   * For attribute bindings we insert just the marker sentinel for the
              //     first binding, so that we support unquoted attribute bindings.
              //     Subsequent bindings can use a comment marker because multi-binding
              //     attributes must be quoted.
              //   * For comment bindings we insert just the marker sentinel so we don't
              //     close the comment.
              //
              // The following code scans the template source, but is *not* an HTML
              // parser. We don't need to track the tree structure of the HTML, only
              // whether a binding is inside a comment, and if not, if it appears to be
              // the first binding in an attribute.

              var commentOpen = s.lastIndexOf('<!--'); // We're in comment position if we have a comment open with no following
              // comment close. Because <-- can appear in an attribute value there can
              // be false positives.

              isCommentBinding = (commentOpen > -1 || isCommentBinding) && s.indexOf('-->', commentOpen + 1) === -1; // Check to see if we have an attribute-like sequence preceding the
              // expression. This can match "name=value" like structures in text,
              // comments, and attribute values, so there can be false-positives.

              var attributeMatch = lastAttributeNameRegex.exec(s);

              if (attributeMatch === null) {
                // We're only in this branch if we don't have a attribute-like
                // preceding sequence. For comments, this guards against unusual
                // attribute values like <div foo="<!--${'bar'}">. Cases like
                // <!-- foo=${'bar'}--> are handled correctly in the attribute branch
                // below.
                html += s + (isCommentBinding ? commentMarker : nodeMarker);
              } else {
                // For attributes we use just a marker sentinel, and also append a
                // $lit$ suffix to the name to opt-out of attribute-specific parsing
                // that IE and Edge do for style and certain SVG attributes.
                html += s.substr(0, attributeMatch.index) + attributeMatch[1] + attributeMatch[2] + boundAttributeSuffix + attributeMatch[3] + marker;
              }
            }

            html += this.strings[l];
            return html;
          }
        }, {
          key: "getTemplateElement",
          value: function getTemplateElement() {
            var template = document.createElement('template');
            var value = this.getHTML();

            if (policy !== undefined) {
              // this is secure because `this.strings` is a TemplateStringsArray.
              // TODO: validate this when
              // https://github.com/tc39/proposal-array-is-template-object is
              // implemented.
              value = policy.createHTML(value);
            }

            template.innerHTML = value;
            return template;
          }
        }]);

        return TemplateResult;
      }();

      var isPrimitive = function isPrimitive(value) {
        return value === null || !(_typeof(value) === 'object' || typeof value === 'function');
      };
      var isIterable = function isIterable(value) {
        return Array.isArray(value) || // eslint-disable-next-line @typescript-eslint/no-explicit-any
        !!(value && value[Symbol.iterator]);
      };
      /**
       * Writes attribute values to the DOM for a group of AttributeParts bound to a
       * single attribute. The value is only set once even if there are multiple parts
       * for an attribute.
       */

      var AttributeCommitter = /*#__PURE__*/function () {
        function AttributeCommitter(element, name, strings) {
          _classCallCheck(this, AttributeCommitter);

          this.dirty = true;
          this.element = element;
          this.name = name;
          this.strings = strings;
          this.parts = [];

          for (var i = 0; i < strings.length - 1; i++) {
            this.parts[i] = this._createPart();
          }
        }
        /**
         * Creates a single part. Override this to create a differnt type of part.
         */


        _createClass(AttributeCommitter, [{
          key: "_createPart",
          value: function _createPart() {
            return new AttributePart(this);
          }
        }, {
          key: "_getValue",
          value: function _getValue() {
            var strings = this.strings;
            var l = strings.length - 1;
            var parts = this.parts; // If we're assigning an attribute via syntax like:
            //    attr="${foo}"  or  attr=${foo}
            // but not
            //    attr="${foo} ${bar}" or attr="${foo} baz"
            // then we don't want to coerce the attribute value into one long
            // string. Instead we want to just return the value itself directly,
            // so that sanitizeDOMValue can get the actual value rather than
            // String(value)
            // The exception is if v is an array, in which case we do want to smash
            // it together into a string without calling String() on the array.
            //
            // This also allows trusted values (when using TrustedTypes) being
            // assigned to DOM sinks without being stringified in the process.

            if (l === 1 && strings[0] === '' && strings[1] === '') {
              var v = parts[0].value;

              if (_typeof(v) === 'symbol') {
                return String(v);
              }

              if (typeof v === 'string' || !isIterable(v)) {
                return v;
              }
            }

            var text = '';

            for (var i = 0; i < l; i++) {
              text += strings[i];
              var part = parts[i];

              if (part !== undefined) {
                var _v = part.value;

                if (isPrimitive(_v) || !isIterable(_v)) {
                  text += typeof _v === 'string' ? _v : String(_v);
                } else {
                  var _iterator = _createForOfIteratorHelper(_v),
                      _step;

                  try {
                    for (_iterator.s(); !(_step = _iterator.n()).done;) {
                      var t = _step.value;
                      text += typeof t === 'string' ? t : String(t);
                    }
                  } catch (err) {
                    _iterator.e(err);
                  } finally {
                    _iterator.f();
                  }
                }
              }
            }

            text += strings[l];
            return text;
          }
        }, {
          key: "commit",
          value: function commit() {
            if (this.dirty) {
              this.dirty = false;
              this.element.setAttribute(this.name, this._getValue());
            }
          }
        }]);

        return AttributeCommitter;
      }();
      /**
       * A Part that controls all or part of an attribute value.
       */

      var AttributePart = /*#__PURE__*/function () {
        function AttributePart(committer) {
          _classCallCheck(this, AttributePart);

          this.value = undefined;
          this.committer = committer;
        }

        _createClass(AttributePart, [{
          key: "setValue",
          value: function setValue(value) {
            if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
              this.value = value; // If the value is a not a directive, dirty the committer so that it'll
              // call setAttribute. If the value is a directive, it'll dirty the
              // committer if it calls setValue().

              if (!isDirective(value)) {
                this.committer.dirty = true;
              }
            }
          }
        }, {
          key: "commit",
          value: function commit() {
            while (isDirective(this.value)) {
              var directive = this.value;
              this.value = noChange;
              directive(this);
            }

            if (this.value === noChange) {
              return;
            }

            this.committer.commit();
          }
        }]);

        return AttributePart;
      }();
      /**
       * A Part that controls a location within a Node tree. Like a Range, NodePart
       * has start and end locations and can set and update the Nodes between those
       * locations.
       *
       * NodeParts support several value types: primitives, Nodes, TemplateResults,
       * as well as arrays and iterables of those types.
       */

      var NodePart = /*#__PURE__*/function () {
        function NodePart(options) {
          _classCallCheck(this, NodePart);

          this.value = undefined;
          this.__pendingValue = undefined;
          this.options = options;
        }
        /**
         * Appends this part into a container.
         *
         * This part must be empty, as its contents are not automatically moved.
         */


        _createClass(NodePart, [{
          key: "appendInto",
          value: function appendInto(container) {
            this.startNode = container.appendChild(createMarker());
            this.endNode = container.appendChild(createMarker());
          }
          /**
           * Inserts this part after the `ref` node (between `ref` and `ref`'s next
           * sibling). Both `ref` and its next sibling must be static, unchanging nodes
           * such as those that appear in a literal section of a template.
           *
           * This part must be empty, as its contents are not automatically moved.
           */

        }, {
          key: "insertAfterNode",
          value: function insertAfterNode(ref) {
            this.startNode = ref;
            this.endNode = ref.nextSibling;
          }
          /**
           * Appends this part into a parent part.
           *
           * This part must be empty, as its contents are not automatically moved.
           */

        }, {
          key: "appendIntoPart",
          value: function appendIntoPart(part) {
            part.__insert(this.startNode = createMarker());

            part.__insert(this.endNode = createMarker());
          }
          /**
           * Inserts this part after the `ref` part.
           *
           * This part must be empty, as its contents are not automatically moved.
           */

        }, {
          key: "insertAfterPart",
          value: function insertAfterPart(ref) {
            ref.__insert(this.startNode = createMarker());

            this.endNode = ref.endNode;
            ref.endNode = this.startNode;
          }
        }, {
          key: "setValue",
          value: function setValue(value) {
            this.__pendingValue = value;
          }
        }, {
          key: "commit",
          value: function commit() {
            if (this.startNode.parentNode === null) {
              return;
            }

            while (isDirective(this.__pendingValue)) {
              var directive = this.__pendingValue;
              this.__pendingValue = noChange;
              directive(this);
            }

            var value = this.__pendingValue;

            if (value === noChange) {
              return;
            }

            if (isPrimitive(value)) {
              if (value !== this.value) {
                this.__commitText(value);
              }
            } else if (value instanceof TemplateResult) {
              this.__commitTemplateResult(value);
            } else if (value instanceof Node) {
              this.__commitNode(value);
            } else if (isIterable(value)) {
              this.__commitIterable(value);
            } else if (value === nothing) {
              this.value = nothing;
              this.clear();
            } else {
              // Fallback, will render the string representation
              this.__commitText(value);
            }
          }
        }, {
          key: "__insert",
          value: function __insert(node) {
            this.endNode.parentNode.insertBefore(node, this.endNode);
          }
        }, {
          key: "__commitNode",
          value: function __commitNode(value) {
            if (this.value === value) {
              return;
            }

            this.clear();

            this.__insert(value);

            this.value = value;
          }
        }, {
          key: "__commitText",
          value: function __commitText(value) {
            var node = this.startNode.nextSibling;
            value = value == null ? '' : value; // If `value` isn't already a string, we explicitly convert it here in case
            // it can't be implicitly converted - i.e. it's a symbol.

            var valueAsString = typeof value === 'string' ? value : String(value);

            if (node === this.endNode.previousSibling && node.nodeType === 3
            /* Node.TEXT_NODE */
            ) {
                // If we only have a single text node between the markers, we can just
                // set its value, rather than replacing it.
                // TODO(justinfagnani): Can we just check if this.value is primitive?
                node.data = valueAsString;
              } else {
              this.__commitNode(document.createTextNode(valueAsString));
            }

            this.value = value;
          }
        }, {
          key: "__commitTemplateResult",
          value: function __commitTemplateResult(value) {
            var template = this.options.templateFactory(value);

            if (this.value instanceof TemplateInstance && this.value.template === template) {
              this.value.update(value.values);
            } else {
              // Make sure we propagate the template processor from the TemplateResult
              // so that we use its syntax extension, etc. The template factory comes
              // from the render function options so that it can control template
              // caching and preprocessing.
              var instance = new TemplateInstance(template, value.processor, this.options);

              var fragment = instance._clone();

              instance.update(value.values);

              this.__commitNode(fragment);

              this.value = instance;
            }
          }
        }, {
          key: "__commitIterable",
          value: function __commitIterable(value) {
            // For an Iterable, we create a new InstancePart per item, then set its
            // value to the item. This is a little bit of overhead for every item in
            // an Iterable, but it lets us recurse easily and efficiently update Arrays
            // of TemplateResults that will be commonly returned from expressions like:
            // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
            // If _value is an array, then the previous render was of an
            // iterable and _value will contain the NodeParts from the previous
            // render. If _value is not an array, clear this part and make a new
            // array for NodeParts.
            if (!Array.isArray(this.value)) {
              this.value = [];
              this.clear();
            } // Lets us keep track of how many items we stamped so we can clear leftover
            // items from a previous render


            var itemParts = this.value;
            var partIndex = 0;
            var itemPart;

            var _iterator2 = _createForOfIteratorHelper(value),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var item = _step2.value;
                // Try to reuse an existing part
                itemPart = itemParts[partIndex]; // If no existing part, create a new one

                if (itemPart === undefined) {
                  itemPart = new NodePart(this.options);
                  itemParts.push(itemPart);

                  if (partIndex === 0) {
                    itemPart.appendIntoPart(this);
                  } else {
                    itemPart.insertAfterPart(itemParts[partIndex - 1]);
                  }
                }

                itemPart.setValue(item);
                itemPart.commit();
                partIndex++;
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }

            if (partIndex < itemParts.length) {
              // Truncate the parts array so _value reflects the current state
              itemParts.length = partIndex;
              this.clear(itemPart && itemPart.endNode);
            }
          }
        }, {
          key: "clear",
          value: function clear() {
            var startNode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.startNode;
            removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
          }
        }]);

        return NodePart;
      }();
      /**
       * Implements a boolean attribute, roughly as defined in the HTML
       * specification.
       *
       * If the value is truthy, then the attribute is present with a value of
       * ''. If the value is falsey, the attribute is removed.
       */

      var BooleanAttributePart = /*#__PURE__*/function () {
        function BooleanAttributePart(element, name, strings) {
          _classCallCheck(this, BooleanAttributePart);

          this.value = undefined;
          this.__pendingValue = undefined;

          if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
            throw new Error('Boolean attributes can only contain a single expression');
          }

          this.element = element;
          this.name = name;
          this.strings = strings;
        }

        _createClass(BooleanAttributePart, [{
          key: "setValue",
          value: function setValue(value) {
            this.__pendingValue = value;
          }
        }, {
          key: "commit",
          value: function commit() {
            while (isDirective(this.__pendingValue)) {
              var directive = this.__pendingValue;
              this.__pendingValue = noChange;
              directive(this);
            }

            if (this.__pendingValue === noChange) {
              return;
            }

            var value = !!this.__pendingValue;

            if (this.value !== value) {
              if (value) {
                this.element.setAttribute(this.name, '');
              } else {
                this.element.removeAttribute(this.name);
              }

              this.value = value;
            }

            this.__pendingValue = noChange;
          }
        }]);

        return BooleanAttributePart;
      }();
      /**
       * Sets attribute values for PropertyParts, so that the value is only set once
       * even if there are multiple parts for a property.
       *
       * If an expression controls the whole property value, then the value is simply
       * assigned to the property under control. If there are string literals or
       * multiple expressions, then the strings are expressions are interpolated into
       * a string first.
       */

      var PropertyCommitter = /*#__PURE__*/function (_AttributeCommitter) {
        _inherits(PropertyCommitter, _AttributeCommitter);

        var _super = _createSuper(PropertyCommitter);

        function PropertyCommitter(element, name, strings) {
          var _this;

          _classCallCheck(this, PropertyCommitter);

          _this = _super.call(this, element, name, strings);
          _this.single = strings.length === 2 && strings[0] === '' && strings[1] === '';
          return _this;
        }

        _createClass(PropertyCommitter, [{
          key: "_createPart",
          value: function _createPart() {
            return new PropertyPart(this);
          }
        }, {
          key: "_getValue",
          value: function _getValue() {
            if (this.single) {
              return this.parts[0].value;
            }

            return _get(_getPrototypeOf(PropertyCommitter.prototype), "_getValue", this).call(this);
          }
        }, {
          key: "commit",
          value: function commit() {
            if (this.dirty) {
              this.dirty = false; // eslint-disable-next-line @typescript-eslint/no-explicit-any

              this.element[this.name] = this._getValue();
            }
          }
        }]);

        return PropertyCommitter;
      }(AttributeCommitter);
      var PropertyPart = /*#__PURE__*/function (_AttributePart) {
        _inherits(PropertyPart, _AttributePart);

        var _super2 = _createSuper(PropertyPart);

        function PropertyPart() {
          _classCallCheck(this, PropertyPart);

          return _super2.apply(this, arguments);
        }

        return PropertyPart;
      }(AttributePart); // Detect event listener options support. If the `capture` property is read
      // from the options object, then options are supported. If not, then the third
      // argument to add/removeEventListener is interpreted as the boolean capture
      // value so we should only pass the `capture` property.

      var eventOptionsSupported = false; // Wrap into an IIFE because MS Edge <= v41 does not support having try/catch
      // blocks right into the body of a module

      (function () {
        try {
          var options = {
            get capture() {
              eventOptionsSupported = true;
              return false;
            }

          }; // eslint-disable-next-line @typescript-eslint/no-explicit-any

          window.addEventListener('test', options, options); // eslint-disable-next-line @typescript-eslint/no-explicit-any

          window.removeEventListener('test', options, options);
        } catch (_e) {// event options not supported
        }
      })();

      var EventPart = /*#__PURE__*/function () {
        function EventPart(element, eventName, eventContext) {
          var _this2 = this;

          _classCallCheck(this, EventPart);

          this.value = undefined;
          this.__pendingValue = undefined;
          this.element = element;
          this.eventName = eventName;
          this.eventContext = eventContext;

          this.__boundHandleEvent = function (e) {
            return _this2.handleEvent(e);
          };
        }

        _createClass(EventPart, [{
          key: "setValue",
          value: function setValue(value) {
            this.__pendingValue = value;
          }
        }, {
          key: "commit",
          value: function commit() {
            while (isDirective(this.__pendingValue)) {
              var directive = this.__pendingValue;
              this.__pendingValue = noChange;
              directive(this);
            }

            if (this.__pendingValue === noChange) {
              return;
            }

            var newListener = this.__pendingValue;
            var oldListener = this.value;
            var shouldRemoveListener = newListener == null || oldListener != null && (newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive);
            var shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);

            if (shouldRemoveListener) {
              this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
            }

            if (shouldAddListener) {
              this.__options = getOptions(newListener);
              this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
            }

            this.value = newListener;
            this.__pendingValue = noChange;
          }
        }, {
          key: "handleEvent",
          value: function handleEvent(event) {
            if (typeof this.value === 'function') {
              this.value.call(this.eventContext || this.element, event);
            } else {
              this.value.handleEvent(event);
            }
          }
        }]);

        return EventPart;
      }(); // We copy options because of the inconsistent behavior of browsers when reading
      // the third argument of add/removeEventListener. IE11 doesn't support options
      // at all. Chrome 41 only reads `capture` if the argument is an object.

      var getOptions = function getOptions(o) {
        return o && (eventOptionsSupported ? {
          capture: o.capture,
          passive: o.passive,
          once: o.once
        } : o.capture);
      };

      /**
       * @license
       * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
       * This code may only be used under the BSD style license found at
       * http://polymer.github.io/LICENSE.txt
       * The complete set of authors may be found at
       * http://polymer.github.io/AUTHORS.txt
       * The complete set of contributors may be found at
       * http://polymer.github.io/CONTRIBUTORS.txt
       * Code distributed by Google as part of the polymer project is also
       * subject to an additional IP rights grant found at
       * http://polymer.github.io/PATENTS.txt
       */
      /**
       * The default TemplateFactory which caches Templates keyed on
       * result.type and result.strings.
       */

      function templateFactory(result) {
        var templateCache = templateCaches.get(result.type);

        if (templateCache === undefined) {
          templateCache = {
            stringsArray: new WeakMap(),
            keyString: new Map()
          };
          templateCaches.set(result.type, templateCache);
        }

        var template = templateCache.stringsArray.get(result.strings);

        if (template !== undefined) {
          return template;
        } // If the TemplateStringsArray is new, generate a key from the strings
        // This key is shared between all templates with identical content


        var key = result.strings.join(marker); // Check if we already have a Template for this key

        template = templateCache.keyString.get(key);

        if (template === undefined) {
          // If we have not seen this key before, create a new Template
          template = new Template(result, result.getTemplateElement()); // Cache the Template for this key

          templateCache.keyString.set(key, template);
        } // Cache all future queries for this TemplateStringsArray


        templateCache.stringsArray.set(result.strings, template);
        return template;
      }
      var templateCaches = new Map();

      /**
       * @license
       * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
       * This code may only be used under the BSD style license found at
       * http://polymer.github.io/LICENSE.txt
       * The complete set of authors may be found at
       * http://polymer.github.io/AUTHORS.txt
       * The complete set of contributors may be found at
       * http://polymer.github.io/CONTRIBUTORS.txt
       * Code distributed by Google as part of the polymer project is also
       * subject to an additional IP rights grant found at
       * http://polymer.github.io/PATENTS.txt
       */
      var parts = new WeakMap();
      /**
       * Renders a template result or other value to a container.
       *
       * To update a container with new values, reevaluate the template literal and
       * call `render` with the new result.
       *
       * @param result Any value renderable by NodePart - typically a TemplateResult
       *     created by evaluating a template tag like `html` or `svg`.
       * @param container A DOM parent to render to. The entire contents are either
       *     replaced, or efficiently updated if the same result type was previous
       *     rendered there.
       * @param options RenderOptions for the entire render tree rendered to this
       *     container. Render options must *not* change between renders to the same
       *     container, as those changes will not effect previously rendered DOM.
       */

      var render$1 = function render(result, container, options) {
        var part = parts.get(container);

        if (part === undefined) {
          removeNodes(container, container.firstChild);
          parts.set(container, part = new NodePart(Object.assign({
            templateFactory: templateFactory
          }, options)));
          part.appendInto(container);
        }

        part.setValue(result);
        part.commit();
      };

      /**
       * Creates Parts when a template is instantiated.
       */

      var DefaultTemplateProcessor = /*#__PURE__*/function () {
        function DefaultTemplateProcessor() {
          _classCallCheck(this, DefaultTemplateProcessor);
        }

        _createClass(DefaultTemplateProcessor, [{
          key: "handleAttributeExpressions",
          value:
          /**
           * Create parts for an attribute-position binding, given the event, attribute
           * name, and string literals.
           *
           * @param element The element containing the binding
           * @param name  The attribute name
           * @param strings The string literals. There are always at least two strings,
           *   event for fully-controlled bindings with a single expression.
           */
          function handleAttributeExpressions(element, name, strings, options) {
            var prefix = name[0];

            if (prefix === '.') {
              var _committer = new PropertyCommitter(element, name.slice(1), strings);

              return _committer.parts;
            }

            if (prefix === '@') {
              return [new EventPart(element, name.slice(1), options.eventContext)];
            }

            if (prefix === '?') {
              return [new BooleanAttributePart(element, name.slice(1), strings)];
            }

            var committer = new AttributeCommitter(element, name, strings);
            return committer.parts;
          }
          /**
           * Create parts for a text-position binding.
           * @param templateFactory
           */

        }, {
          key: "handleTextExpression",
          value: function handleTextExpression(options) {
            return new NodePart(options);
          }
        }]);

        return DefaultTemplateProcessor;
      }();
      var defaultTemplateProcessor = new DefaultTemplateProcessor();

      /**
       * @license
       * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
       * This code may only be used under the BSD style license found at
       * http://polymer.github.io/LICENSE.txt
       * The complete set of authors may be found at
       * http://polymer.github.io/AUTHORS.txt
       * The complete set of contributors may be found at
       * http://polymer.github.io/CONTRIBUTORS.txt
       * Code distributed by Google as part of the polymer project is also
       * subject to an additional IP rights grant found at
       * http://polymer.github.io/PATENTS.txt
       */
      // This line will be used in regexes to search for lit-html usage.
      // TODO(justinfagnani): inject version number at build time

      if (typeof window !== 'undefined') {
        (window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.3.0');
      }
      /**
       * Interprets a template literal as an HTML template that can efficiently
       * render to and update a container.
       */


      var html = function html(strings) {
        for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          values[_key - 1] = arguments[_key];
        }

        return new TemplateResult(strings, values, 'html', defaultTemplateProcessor);
      };

      var getTemplateCacheKey = function getTemplateCacheKey(type, scopeName) {
        return "".concat(type, "--").concat(scopeName);
      };

      var compatibleShadyCSSVersion = true;

      if (typeof window.ShadyCSS === 'undefined') {
        compatibleShadyCSSVersion = false;
      } else if (typeof window.ShadyCSS.prepareTemplateDom === 'undefined') {
        console.warn("Incompatible ShadyCSS version detected. " + "Please update to at least @webcomponents/webcomponentsjs@2.0.2 and " + "@webcomponents/shadycss@1.3.1.");
        compatibleShadyCSSVersion = false;
      }
      /**
       * Template factory which scopes template DOM using ShadyCSS.
       * @param scopeName {string}
       */


      var shadyTemplateFactory = function shadyTemplateFactory(scopeName) {
        return function (result) {
          var cacheKey = getTemplateCacheKey(result.type, scopeName);
          var templateCache = templateCaches.get(cacheKey);

          if (templateCache === undefined) {
            templateCache = {
              stringsArray: new WeakMap(),
              keyString: new Map()
            };
            templateCaches.set(cacheKey, templateCache);
          }

          var template = templateCache.stringsArray.get(result.strings);

          if (template !== undefined) {
            return template;
          }

          var key = result.strings.join(marker);
          template = templateCache.keyString.get(key);

          if (template === undefined) {
            var element = result.getTemplateElement();

            if (compatibleShadyCSSVersion) {
              window.ShadyCSS.prepareTemplateDom(element, scopeName);
            }

            template = new Template(result, element);
            templateCache.keyString.set(key, template);
          }

          templateCache.stringsArray.set(result.strings, template);
          return template;
        };
      };
      var TEMPLATE_TYPES = ['html', 'svg'];
      /**
       * Removes all style elements from Templates for the given scopeName.
       */

      var removeStylesFromLitTemplates = function removeStylesFromLitTemplates(scopeName) {
        TEMPLATE_TYPES.forEach(function (type) {
          var templates = templateCaches.get(getTemplateCacheKey(type, scopeName));

          if (templates !== undefined) {
            templates.keyString.forEach(function (template) {
              var content = template.element.content; // IE 11 doesn't support the iterable param Set constructor

              var styles = new Set();
              Array.from(content.querySelectorAll('style')).forEach(function (s) {
                styles.add(s);
              });
              removeNodesFromTemplate(template, styles);
            });
          }
        });
      };

      var shadyRenderSet = new Set();
      /**
       * For the given scope name, ensures that ShadyCSS style scoping is performed.
       * This is done just once per scope name so the fragment and template cannot
       * be modified.
       * (1) extracts styles from the rendered fragment and hands them to ShadyCSS
       * to be scoped and appended to the document
       * (2) removes style elements from all lit-html Templates for this scope name.
       *
       * Note, <style> elements can only be placed into templates for the
       * initial rendering of the scope. If <style> elements are included in templates
       * dynamically rendered to the scope (after the first scope render), they will
       * not be scoped and the <style> will be left in the template and rendered
       * output.
       */

      var prepareTemplateStyles = function prepareTemplateStyles(scopeName, renderedDOM, template) {
        shadyRenderSet.add(scopeName); // If `renderedDOM` is stamped from a Template, then we need to edit that
        // Template's underlying template element. Otherwise, we create one here
        // to give to ShadyCSS, which still requires one while scoping.

        var templateElement = !!template ? template.element : document.createElement('template'); // Move styles out of rendered DOM and store.

        var styles = renderedDOM.querySelectorAll('style');
        var length = styles.length; // If there are no styles, skip unnecessary work

        if (length === 0) {
          // Ensure prepareTemplateStyles is called to support adding
          // styles via `prepareAdoptedCssText` since that requires that
          // `prepareTemplateStyles` is called.
          //
          // ShadyCSS will only update styles containing @apply in the template
          // given to `prepareTemplateStyles`. If no lit Template was given,
          // ShadyCSS will not be able to update uses of @apply in any relevant
          // template. However, this is not a problem because we only create the
          // template for the purpose of supporting `prepareAdoptedCssText`,
          // which doesn't support @apply at all.
          window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
          return;
        }

        var condensedStyle = document.createElement('style'); // Collect styles into a single style. This helps us make sure ShadyCSS
        // manipulations will not prevent us from being able to fix up template
        // part indices.
        // NOTE: collecting styles is inefficient for browsers but ShadyCSS
        // currently does this anyway. When it does not, this should be changed.

        for (var i = 0; i < length; i++) {
          var _style = styles[i];

          _style.parentNode.removeChild(_style);

          condensedStyle.textContent += _style.textContent;
        } // Remove styles from nested templates in this scope.


        removeStylesFromLitTemplates(scopeName); // And then put the condensed style into the "root" template passed in as
        // `template`.

        var content = templateElement.content;

        if (!!template) {
          insertNodeIntoTemplate(template, condensedStyle, content.firstChild);
        } else {
          content.insertBefore(condensedStyle, content.firstChild);
        } // Note, it's important that ShadyCSS gets the template that `lit-html`
        // will actually render so that it can update the style inside when
        // needed (e.g. @apply native Shadow DOM case).


        window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
        var style = content.querySelector('style');

        if (window.ShadyCSS.nativeShadow && style !== null) {
          // When in native Shadow DOM, ensure the style created by ShadyCSS is
          // included in initially rendered output (`renderedDOM`).
          renderedDOM.insertBefore(style.cloneNode(true), renderedDOM.firstChild);
        } else if (!!template) {
          // When no style is left in the template, parts will be broken as a
          // result. To fix this, we put back the style node ShadyCSS removed
          // and then tell lit to remove that node from the template.
          // There can be no style in the template in 2 cases (1) when Shady DOM
          // is in use, ShadyCSS removes all styles, (2) when native Shadow DOM
          // is in use ShadyCSS removes the style if it contains no content.
          // NOTE, ShadyCSS creates its own style so we can safely add/remove
          // `condensedStyle` here.
          content.insertBefore(condensedStyle, content.firstChild);
          var removes = new Set();
          removes.add(condensedStyle);
          removeNodesFromTemplate(template, removes);
        }
      };
      /**
       * Extension to the standard `render` method which supports rendering
       * to ShadowRoots when the ShadyDOM (https://github.com/webcomponents/shadydom)
       * and ShadyCSS (https://github.com/webcomponents/shadycss) polyfills are used
       * or when the webcomponentsjs
       * (https://github.com/webcomponents/webcomponentsjs) polyfill is used.
       *
       * Adds a `scopeName` option which is used to scope element DOM and stylesheets
       * when native ShadowDOM is unavailable. The `scopeName` will be added to
       * the class attribute of all rendered DOM. In addition, any style elements will
       * be automatically re-written with this `scopeName` selector and moved out
       * of the rendered DOM and into the document `<head>`.
       *
       * It is common to use this render method in conjunction with a custom element
       * which renders a shadowRoot. When this is done, typically the element's
       * `localName` should be used as the `scopeName`.
       *
       * In addition to DOM scoping, ShadyCSS also supports a basic shim for css
       * custom properties (needed only on older browsers like IE11) and a shim for
       * a deprecated feature called `@apply` that supports applying a set of css
       * custom properties to a given location.
       *
       * Usage considerations:
       *
       * * Part values in `<style>` elements are only applied the first time a given
       * `scopeName` renders. Subsequent changes to parts in style elements will have
       * no effect. Because of this, parts in style elements should only be used for
       * values that will never change, for example parts that set scope-wide theme
       * values or parts which render shared style elements.
       *
       * * Note, due to a limitation of the ShadyDOM polyfill, rendering in a
       * custom element's `constructor` is not supported. Instead rendering should
       * either done asynchronously, for example at microtask timing (for example
       * `Promise.resolve()`), or be deferred until the first time the element's
       * `connectedCallback` runs.
       *
       * Usage considerations when using shimmed custom properties or `@apply`:
       *
       * * Whenever any dynamic changes are made which affect
       * css custom properties, `ShadyCSS.styleElement(element)` must be called
       * to update the element. There are two cases when this is needed:
       * (1) the element is connected to a new parent, (2) a class is added to the
       * element that causes it to match different custom properties.
       * To address the first case when rendering a custom element, `styleElement`
       * should be called in the element's `connectedCallback`.
       *
       * * Shimmed custom properties may only be defined either for an entire
       * shadowRoot (for example, in a `:host` rule) or via a rule that directly
       * matches an element with a shadowRoot. In other words, instead of flowing from
       * parent to child as do native css custom properties, shimmed custom properties
       * flow only from shadowRoots to nested shadowRoots.
       *
       * * When using `@apply` mixing css shorthand property names with
       * non-shorthand names (for example `border` and `border-width`) is not
       * supported.
       */


      var render = function render(result, container, options) {
        if (!options || _typeof(options) !== 'object' || !options.scopeName) {
          throw new Error('The `scopeName` option is required.');
        }

        var scopeName = options.scopeName;
        var hasRendered = parts.has(container);
        var needsScoping = compatibleShadyCSSVersion && container.nodeType === 11
        /* Node.DOCUMENT_FRAGMENT_NODE */
        && !!container.host; // Handle first render to a scope specially...

        var firstScopeRender = needsScoping && !shadyRenderSet.has(scopeName); // On first scope render, render into a fragment; this cannot be a single
        // fragment that is reused since nested renders can occur synchronously.

        var renderContainer = firstScopeRender ? document.createDocumentFragment() : container;
        render$1(result, renderContainer, Object.assign({
          templateFactory: shadyTemplateFactory(scopeName)
        }, options)); // When performing first scope render,
        // (1) We've rendered into a fragment so that there's a chance to
        // `prepareTemplateStyles` before sub-elements hit the DOM
        // (which might cause them to render based on a common pattern of
        // rendering in a custom element's `connectedCallback`);
        // (2) Scope the template with ShadyCSS one time only for this scope.
        // (3) Render the fragment into the container and make sure the
        // container knows its `part` is the one we just rendered. This ensures
        // DOM will be re-used on subsequent renders.

        if (firstScopeRender) {
          var part = parts.get(renderContainer);
          parts.delete(renderContainer); // ShadyCSS might have style sheets (e.g. from `prepareAdoptedCssText`)
          // that should apply to `renderContainer` even if the rendered value is
          // not a TemplateInstance. However, it will only insert scoped styles
          // into the document if `prepareTemplateStyles` has already been called
          // for the given scope name.

          var template = part.value instanceof TemplateInstance ? part.value.template : undefined;
          prepareTemplateStyles(scopeName, renderContainer, template);
          removeNodes(container, container.firstChild);
          container.appendChild(renderContainer);
          parts.set(container, part);
        } // After elements have hit the DOM, update styling if this is the
        // initial render to this container.
        // This is needed whenever dynamic changes are made so it would be
        // safest to do every render; however, this would regress performance
        // so we leave it up to the user to call `ShadyCSS.styleElement`
        // for dynamic changes.


        if (!hasRendered && needsScoping) {
          window.ShadyCSS.styleElement(container.host);
        }
      };

      /**
       * @license
       * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
       * This code may only be used under the BSD style license found at
       * http://polymer.github.io/LICENSE.txt
       * The complete set of authors may be found at
       * http://polymer.github.io/AUTHORS.txt
       * The complete set of contributors may be found at
       * http://polymer.github.io/CONTRIBUTORS.txt
       * Code distributed by Google as part of the polymer project is also
       * subject to an additional IP rights grant found at
       * http://polymer.github.io/PATENTS.txt
       */
      var _a;
      /**
       * Use this module if you want to create your own base class extending
       * [[UpdatingElement]].
       * @packageDocumentation
       */

      /*
       * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
       * replaced at compile time by the munged name for object[property]. We cannot
       * alias this function, so we have to use a small shim that has the same
       * behavior when not compiling.
       */


      window.JSCompiler_renameProperty = function (prop, _obj) {
        return prop;
      };

      var defaultConverter = {
        toAttribute: function toAttribute(value, type) {
          switch (type) {
            case Boolean:
              return value ? '' : null;

            case Object:
            case Array:
              // if the value is `null` or `undefined` pass this through
              // to allow removing/no change behavior.
              return value == null ? value : JSON.stringify(value);
          }

          return value;
        },
        fromAttribute: function fromAttribute(value, type) {
          switch (type) {
            case Boolean:
              return value !== null;

            case Number:
              return value === null ? null : Number(value);

            case Object:
            case Array:
              return JSON.parse(value);
          }

          return value;
        }
      };
      /**
       * Change function that returns true if `value` is different from `oldValue`.
       * This method is used as the default for a property's `hasChanged` function.
       */

      var notEqual = function notEqual(value, old) {
        // This ensures (old==NaN, value==NaN) always returns false
        return old !== value && (old === old || value === value);
      };
      var defaultPropertyDeclaration = {
        attribute: true,
        type: String,
        converter: defaultConverter,
        reflect: false,
        hasChanged: notEqual
      };
      var STATE_HAS_UPDATED = 1;
      var STATE_UPDATE_REQUESTED = 1 << 2;
      var STATE_IS_REFLECTING_TO_ATTRIBUTE = 1 << 3;
      var STATE_IS_REFLECTING_TO_PROPERTY = 1 << 4;
      /**
       * The Closure JS Compiler doesn't currently have good support for static
       * property semantics where "this" is dynamic (e.g.
       * https://github.com/google/closure-compiler/issues/3177 and others) so we use
       * this hack to bypass any rewriting by the compiler.
       */

      var finalized = 'finalized';
      /**
       * Base element class which manages element properties and attributes. When
       * properties change, the `update` method is asynchronously called. This method
       * should be supplied by subclassers to render updates as desired.
       * @noInheritDoc
       */

      var UpdatingElement = /*#__PURE__*/function (_HTMLElement) {
        _inherits(UpdatingElement, _HTMLElement);

        var _super = _createSuper(UpdatingElement);

        function UpdatingElement() {
          var _this;

          _classCallCheck(this, UpdatingElement);

          _this = _super.call(this);

          _this.initialize();

          return _this;
        }
        /**
         * Returns a list of attributes corresponding to the registered properties.
         * @nocollapse
         */


        _createClass(UpdatingElement, [{
          key: "initialize",
          value:
          /**
           * Performs element initialization. By default captures any pre-set values for
           * registered properties.
           */
          function initialize() {
            var _this2 = this;

            this._updateState = 0;
            this._updatePromise = new Promise(function (res) {
              return _this2._enableUpdatingResolver = res;
            });
            this._changedProperties = new Map();

            this._saveInstanceProperties(); // ensures first update will be caught by an early access of
            // `updateComplete`


            this.requestUpdateInternal();
          }
          /**
           * Fixes any properties set on the instance before upgrade time.
           * Otherwise these would shadow the accessor and break these properties.
           * The properties are stored in a Map which is played back after the
           * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
           * (<=41), properties created for native platform properties like (`id` or
           * `name`) may not have default values set in the element constructor. On
           * these browsers native properties appear on instances and therefore their
           * default value will overwrite any element default (e.g. if the element sets
           * this.id = 'id' in the constructor, the 'id' will become '' since this is
           * the native platform default).
           */

        }, {
          key: "_saveInstanceProperties",
          value: function _saveInstanceProperties() {
            var _this3 = this;

            // Use forEach so this works even if for/of loops are compiled to for loops
            // expecting arrays
            this.constructor._classProperties.forEach(function (_v, p) {
              if (_this3.hasOwnProperty(p)) {
                var value = _this3[p];
                delete _this3[p];

                if (!_this3._instanceProperties) {
                  _this3._instanceProperties = new Map();
                }

                _this3._instanceProperties.set(p, value);
              }
            });
          }
          /**
           * Applies previously saved instance properties.
           */

        }, {
          key: "_applyInstanceProperties",
          value: function _applyInstanceProperties() {
            var _this4 = this;

            // Use forEach so this works even if for/of loops are compiled to for loops
            // expecting arrays
            // tslint:disable-next-line:no-any
            this._instanceProperties.forEach(function (v, p) {
              return _this4[p] = v;
            });

            this._instanceProperties = undefined;
          }
        }, {
          key: "connectedCallback",
          value: function connectedCallback() {
            // Ensure first connection completes an update. Updates cannot complete
            // before connection.
            this.enableUpdating();
          }
        }, {
          key: "enableUpdating",
          value: function enableUpdating() {
            if (this._enableUpdatingResolver !== undefined) {
              this._enableUpdatingResolver();

              this._enableUpdatingResolver = undefined;
            }
          }
          /**
           * Allows for `super.disconnectedCallback()` in extensions while
           * reserving the possibility of making non-breaking feature additions
           * when disconnecting at some point in the future.
           */

        }, {
          key: "disconnectedCallback",
          value: function disconnectedCallback() {}
          /**
           * Synchronizes property values when attributes change.
           */

        }, {
          key: "attributeChangedCallback",
          value: function attributeChangedCallback(name, old, value) {
            if (old !== value) {
              this._attributeToProperty(name, value);
            }
          }
        }, {
          key: "_propertyToAttribute",
          value: function _propertyToAttribute(name, value) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultPropertyDeclaration;
            var ctor = this.constructor;

            var attr = ctor._attributeNameForProperty(name, options);

            if (attr !== undefined) {
              var attrValue = ctor._propertyValueToAttribute(value, options); // an undefined value does not change the attribute.


              if (attrValue === undefined) {
                return;
              } // Track if the property is being reflected to avoid
              // setting the property again via `attributeChangedCallback`. Note:
              // 1. this takes advantage of the fact that the callback is synchronous.
              // 2. will behave incorrectly if multiple attributes are in the reaction
              // stack at time of calling. However, since we process attributes
              // in `update` this should not be possible (or an extreme corner case
              // that we'd like to discover).
              // mark state reflecting


              this._updateState = this._updateState | STATE_IS_REFLECTING_TO_ATTRIBUTE;

              if (attrValue == null) {
                this.removeAttribute(attr);
              } else {
                this.setAttribute(attr, attrValue);
              } // mark state not reflecting


              this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE;
            }
          }
        }, {
          key: "_attributeToProperty",
          value: function _attributeToProperty(name, value) {
            // Use tracking info to avoid deserializing attribute value if it was
            // just set from a property setter.
            if (this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE) {
              return;
            }

            var ctor = this.constructor; // Note, hint this as an `AttributeMap` so closure clearly understands
            // the type; it has issues with tracking types through statics
            // tslint:disable-next-line:no-unnecessary-type-assertion

            var propName = ctor._attributeToPropertyMap.get(name);

            if (propName !== undefined) {
              var options = ctor.getPropertyOptions(propName); // mark state reflecting

              this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY;
              this[propName] = // tslint:disable-next-line:no-any
              ctor._propertyValueFromAttribute(value, options); // mark state not reflecting

              this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY;
            }
          }
          /**
           * This protected version of `requestUpdate` does not access or return the
           * `updateComplete` promise. This promise can be overridden and is therefore
           * not free to access.
           */

        }, {
          key: "requestUpdateInternal",
          value: function requestUpdateInternal(name, oldValue, options) {
            var shouldRequestUpdate = true; // If we have a property key, perform property update steps.

            if (name !== undefined) {
              var ctor = this.constructor;
              options = options || ctor.getPropertyOptions(name);

              if (ctor._valueHasChanged(this[name], oldValue, options.hasChanged)) {
                if (!this._changedProperties.has(name)) {
                  this._changedProperties.set(name, oldValue);
                } // Add to reflecting properties set.
                // Note, it's important that every change has a chance to add the
                // property to `_reflectingProperties`. This ensures setting
                // attribute + property reflects correctly.


                if (options.reflect === true && !(this._updateState & STATE_IS_REFLECTING_TO_PROPERTY)) {
                  if (this._reflectingProperties === undefined) {
                    this._reflectingProperties = new Map();
                  }

                  this._reflectingProperties.set(name, options);
                }
              } else {
                // Abort the request if the property should not be considered changed.
                shouldRequestUpdate = false;
              }
            }

            if (!this._hasRequestedUpdate && shouldRequestUpdate) {
              this._updatePromise = this._enqueueUpdate();
            }
          }
          /**
           * Requests an update which is processed asynchronously. This should
           * be called when an element should update based on some state not triggered
           * by setting a property. In this case, pass no arguments. It should also be
           * called when manually implementing a property setter. In this case, pass the
           * property `name` and `oldValue` to ensure that any configured property
           * options are honored. Returns the `updateComplete` Promise which is resolved
           * when the update completes.
           *
           * @param name {PropertyKey} (optional) name of requesting property
           * @param oldValue {any} (optional) old value of requesting property
           * @returns {Promise} A Promise that is resolved when the update completes.
           */

        }, {
          key: "requestUpdate",
          value: function requestUpdate(name, oldValue) {
            this.requestUpdateInternal(name, oldValue);
            return this.updateComplete;
          }
          /**
           * Sets up the element to asynchronously update.
           */

        }, {
          key: "_enqueueUpdate",
          value: function () {
            var _enqueueUpdate2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var result;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      this._updateState = this._updateState | STATE_UPDATE_REQUESTED;
                      _context.prev = 1;
                      _context.next = 4;
                      return this._updatePromise;

                    case 4:
                      _context.next = 8;
                      break;

                    case 6:
                      _context.prev = 6;
                      _context.t0 = _context["catch"](1);

                    case 8:
                      result = this.performUpdate(); // If `performUpdate` returns a Promise, we await it. This is done to
                      // enable coordinating updates with a scheduler. Note, the result is
                      // checked to avoid delaying an additional microtask unless we need to.

                      if (!(result != null)) {
                        _context.next = 12;
                        break;
                      }

                      _context.next = 12;
                      return result;

                    case 12:
                      return _context.abrupt("return", !this._hasRequestedUpdate);

                    case 13:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this, [[1, 6]]);
            }));

            function _enqueueUpdate() {
              return _enqueueUpdate2.apply(this, arguments);
            }

            return _enqueueUpdate;
          }()
        }, {
          key: "_hasRequestedUpdate",
          get: function get() {
            return this._updateState & STATE_UPDATE_REQUESTED;
          }
        }, {
          key: "hasUpdated",
          get: function get() {
            return this._updateState & STATE_HAS_UPDATED;
          }
          /**
           * Performs an element update. Note, if an exception is thrown during the
           * update, `firstUpdated` and `updated` will not be called.
           *
           * You can override this method to change the timing of updates. If this
           * method is overridden, `super.performUpdate()` must be called.
           *
           * For instance, to schedule updates to occur just before the next frame:
           *
           * ```
           * protected async performUpdate(): Promise<unknown> {
           *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
           *   super.performUpdate();
           * }
           * ```
           */

        }, {
          key: "performUpdate",
          value: function performUpdate() {
            // Abort any update if one is not pending when this is called.
            // This can happen if `performUpdate` is called early to "flush"
            // the update.
            if (!this._hasRequestedUpdate) {
              return;
            } // Mixin instance properties once, if they exist.


            if (this._instanceProperties) {
              this._applyInstanceProperties();
            }

            var shouldUpdate = false;
            var changedProperties = this._changedProperties;

            try {
              shouldUpdate = this.shouldUpdate(changedProperties);

              if (shouldUpdate) {
                this.update(changedProperties);
              } else {
                this._markUpdated();
              }
            } catch (e) {
              // Prevent `firstUpdated` and `updated` from running when there's an
              // update exception.
              shouldUpdate = false; // Ensure element can accept additional updates after an exception.

              this._markUpdated();

              throw e;
            }

            if (shouldUpdate) {
              if (!(this._updateState & STATE_HAS_UPDATED)) {
                this._updateState = this._updateState | STATE_HAS_UPDATED;
                this.firstUpdated(changedProperties);
              }

              this.updated(changedProperties);
            }
          }
        }, {
          key: "_markUpdated",
          value: function _markUpdated() {
            this._changedProperties = new Map();
            this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;
          }
          /**
           * Returns a Promise that resolves when the element has completed updating.
           * The Promise value is a boolean that is `true` if the element completed the
           * update without triggering another update. The Promise result is `false` if
           * a property was set inside `updated()`. If the Promise is rejected, an
           * exception was thrown during the update.
           *
           * To await additional asynchronous work, override the `_getUpdateComplete`
           * method. For example, it is sometimes useful to await a rendered element
           * before fulfilling this Promise. To do this, first await
           * `super._getUpdateComplete()`, then any subsequent state.
           *
           * @returns {Promise} The Promise returns a boolean that indicates if the
           * update resolved without triggering another update.
           */

        }, {
          key: "updateComplete",
          get: function get() {
            return this._getUpdateComplete();
          }
          /**
           * Override point for the `updateComplete` promise.
           *
           * It is not safe to override the `updateComplete` getter directly due to a
           * limitation in TypeScript which means it is not possible to call a
           * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
           * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
           * This method should be overridden instead. For example:
           *
           *   class MyElement extends LitElement {
           *     async _getUpdateComplete() {
           *       await super._getUpdateComplete();
           *       await this._myChild.updateComplete;
           *     }
           *   }
           */

        }, {
          key: "_getUpdateComplete",
          value: function _getUpdateComplete() {
            return this._updatePromise;
          }
          /**
           * Controls whether or not `update` should be called when the element requests
           * an update. By default, this method always returns `true`, but this can be
           * customized to control when to update.
           *
           * @param _changedProperties Map of changed properties with old values
           */

        }, {
          key: "shouldUpdate",
          value: function shouldUpdate(_changedProperties) {
            return true;
          }
          /**
           * Updates the element. This method reflects property values to attributes.
           * It can be overridden to render and keep updated element DOM.
           * Setting properties inside this method will *not* trigger
           * another update.
           *
           * @param _changedProperties Map of changed properties with old values
           */

        }, {
          key: "update",
          value: function update(_changedProperties) {
            var _this5 = this;

            if (this._reflectingProperties !== undefined && this._reflectingProperties.size > 0) {
              // Use forEach so this works even if for/of loops are compiled to for
              // loops expecting arrays
              this._reflectingProperties.forEach(function (v, k) {
                return _this5._propertyToAttribute(k, _this5[k], v);
              });

              this._reflectingProperties = undefined;
            }

            this._markUpdated();
          }
          /**
           * Invoked whenever the element is updated. Implement to perform
           * post-updating tasks via DOM APIs, for example, focusing an element.
           *
           * Setting properties inside this method will trigger the element to update
           * again after this update cycle completes.
           *
           * @param _changedProperties Map of changed properties with old values
           */

        }, {
          key: "updated",
          value: function updated(_changedProperties) {}
          /**
           * Invoked when the element is first updated. Implement to perform one time
           * work on the element after update.
           *
           * Setting properties inside this method will trigger the element to update
           * again after this update cycle completes.
           *
           * @param _changedProperties Map of changed properties with old values
           */

        }, {
          key: "firstUpdated",
          value: function firstUpdated(_changedProperties) {}
        }], [{
          key: "observedAttributes",
          get: function get() {
            var _this6 = this;

            // note: piggy backing on this to ensure we're finalized.
            this.finalize();
            var attributes = []; // Use forEach so this works even if for/of loops are compiled to for loops
            // expecting arrays

            this._classProperties.forEach(function (v, p) {
              var attr = _this6._attributeNameForProperty(p, v);

              if (attr !== undefined) {
                _this6._attributeToPropertyMap.set(attr, p);

                attributes.push(attr);
              }
            });

            return attributes;
          }
          /**
           * Ensures the private `_classProperties` property metadata is created.
           * In addition to `finalize` this is also called in `createProperty` to
           * ensure the `@property` decorator can add property metadata.
           */

          /** @nocollapse */

        }, {
          key: "_ensureClassProperties",
          value: function _ensureClassProperties() {
            var _this7 = this;

            // ensure private storage for property declarations.
            if (!this.hasOwnProperty(JSCompiler_renameProperty('_classProperties', this))) {
              this._classProperties = new Map(); // NOTE: Workaround IE11 not supporting Map constructor argument.

              var superProperties = Object.getPrototypeOf(this)._classProperties;

              if (superProperties !== undefined) {
                superProperties.forEach(function (v, k) {
                  return _this7._classProperties.set(k, v);
                });
              }
            }
          }
          /**
           * Creates a property accessor on the element prototype if one does not exist
           * and stores a PropertyDeclaration for the property with the given options.
           * The property setter calls the property's `hasChanged` property option
           * or uses a strict identity check to determine whether or not to request
           * an update.
           *
           * This method may be overridden to customize properties; however,
           * when doing so, it's important to call `super.createProperty` to ensure
           * the property is setup correctly. This method calls
           * `getPropertyDescriptor` internally to get a descriptor to install.
           * To customize what properties do when they are get or set, override
           * `getPropertyDescriptor`. To customize the options for a property,
           * implement `createProperty` like this:
           *
           * static createProperty(name, options) {
           *   options = Object.assign(options, {myOption: true});
           *   super.createProperty(name, options);
           * }
           *
           * @nocollapse
           */

        }, {
          key: "createProperty",
          value: function createProperty(name) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultPropertyDeclaration;

            // Note, since this can be called by the `@property` decorator which
            // is called before `finalize`, we ensure storage exists for property
            // metadata.
            this._ensureClassProperties();

            this._classProperties.set(name, options); // Do not generate an accessor if the prototype already has one, since
            // it would be lost otherwise and that would never be the user's intention;
            // Instead, we expect users to call `requestUpdate` themselves from
            // user-defined accessors. Note that if the super has an accessor we will
            // still overwrite it


            if (options.noAccessor || this.prototype.hasOwnProperty(name)) {
              return;
            }

            var key = _typeof(name) === 'symbol' ? Symbol() : "__".concat(name);
            var descriptor = this.getPropertyDescriptor(name, key, options);

            if (descriptor !== undefined) {
              Object.defineProperty(this.prototype, name, descriptor);
            }
          }
          /**
           * Returns a property descriptor to be defined on the given named property.
           * If no descriptor is returned, the property will not become an accessor.
           * For example,
           *
           *   class MyElement extends LitElement {
           *     static getPropertyDescriptor(name, key, options) {
           *       const defaultDescriptor =
           *           super.getPropertyDescriptor(name, key, options);
           *       const setter = defaultDescriptor.set;
           *       return {
           *         get: defaultDescriptor.get,
           *         set(value) {
           *           setter.call(this, value);
           *           // custom action.
           *         },
           *         configurable: true,
           *         enumerable: true
           *       }
           *     }
           *   }
           *
           * @nocollapse
           */

        }, {
          key: "getPropertyDescriptor",
          value: function getPropertyDescriptor(name, key, options) {
            return {
              // tslint:disable-next-line:no-any no symbol in index
              get: function get() {
                return this[key];
              },
              set: function set(value) {
                var oldValue = this[name];
                this[key] = value;
                this.requestUpdateInternal(name, oldValue, options);
              },
              configurable: true,
              enumerable: true
            };
          }
          /**
           * Returns the property options associated with the given property.
           * These options are defined with a PropertyDeclaration via the `properties`
           * object or the `@property` decorator and are registered in
           * `createProperty(...)`.
           *
           * Note, this method should be considered "final" and not overridden. To
           * customize the options for a given property, override `createProperty`.
           *
           * @nocollapse
           * @final
           */

        }, {
          key: "getPropertyOptions",
          value: function getPropertyOptions(name) {
            return this._classProperties && this._classProperties.get(name) || defaultPropertyDeclaration;
          }
          /**
           * Creates property accessors for registered properties and ensures
           * any superclasses are also finalized.
           * @nocollapse
           */

        }, {
          key: "finalize",
          value: function finalize() {
            // finalize any superclasses
            var superCtor = Object.getPrototypeOf(this);

            if (!superCtor.hasOwnProperty(finalized)) {
              superCtor.finalize();
            }

            this[finalized] = true;

            this._ensureClassProperties(); // initialize Map populated in observedAttributes


            this._attributeToPropertyMap = new Map(); // make any properties
            // Note, only process "own" properties since this element will inherit
            // any properties defined on the superClass, and finalization ensures
            // the entire prototype chain is finalized.

            if (this.hasOwnProperty(JSCompiler_renameProperty('properties', this))) {
              var props = this.properties; // support symbols in properties (IE11 does not support this)

              var propKeys = [].concat(_toConsumableArray(Object.getOwnPropertyNames(props)), _toConsumableArray(typeof Object.getOwnPropertySymbols === 'function' ? Object.getOwnPropertySymbols(props) : [])); // This for/of is ok because propKeys is an array

              var _iterator = _createForOfIteratorHelper(propKeys),
                  _step;

              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var p = _step.value;
                  // note, use of `any` is due to TypeSript lack of support for symbol in
                  // index types
                  // tslint:disable-next-line:no-any no symbol in index
                  this.createProperty(p, props[p]);
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            }
          }
          /**
           * Returns the property name for the given attribute `name`.
           * @nocollapse
           */

        }, {
          key: "_attributeNameForProperty",
          value: function _attributeNameForProperty(name, options) {
            var attribute = options.attribute;
            return attribute === false ? undefined : typeof attribute === 'string' ? attribute : typeof name === 'string' ? name.toLowerCase() : undefined;
          }
          /**
           * Returns true if a property should request an update.
           * Called when a property value is set and uses the `hasChanged`
           * option for the property if present or a strict identity check.
           * @nocollapse
           */

        }, {
          key: "_valueHasChanged",
          value: function _valueHasChanged(value, old) {
            var hasChanged = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : notEqual;
            return hasChanged(value, old);
          }
          /**
           * Returns the property value for the given attribute value.
           * Called via the `attributeChangedCallback` and uses the property's
           * `converter` or `converter.fromAttribute` property option.
           * @nocollapse
           */

        }, {
          key: "_propertyValueFromAttribute",
          value: function _propertyValueFromAttribute(value, options) {
            var type = options.type;
            var converter = options.converter || defaultConverter;
            var fromAttribute = typeof converter === 'function' ? converter : converter.fromAttribute;
            return fromAttribute ? fromAttribute(value, type) : value;
          }
          /**
           * Returns the attribute value for the given property value. If this
           * returns undefined, the property will *not* be reflected to an attribute.
           * If this returns null, the attribute will be removed, otherwise the
           * attribute will be set to the value.
           * This uses the property's `reflect` and `type.toAttribute` property options.
           * @nocollapse
           */

        }, {
          key: "_propertyValueToAttribute",
          value: function _propertyValueToAttribute(value, options) {
            if (options.reflect === undefined) {
              return;
            }

            var type = options.type;
            var converter = options.converter;
            var toAttribute = converter && converter.toAttribute || defaultConverter.toAttribute;
            return toAttribute(value, type);
          }
        }]);

        return UpdatingElement;
      }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
      _a = finalized;
      /**
       * Marks class as having finished creating properties.
       */

      UpdatingElement[_a] = true;

      /**
      @license
      Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
      This code may only be used under the BSD style license found at
      http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
      http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
      found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
      part of the polymer project is also subject to an additional IP rights grant
      found at http://polymer.github.io/PATENTS.txt
      */

      /**
       * Whether the current browser supports `adoptedStyleSheets`.
       */
      var supportsAdoptingStyleSheets = window.ShadowRoot && (window.ShadyCSS === undefined || window.ShadyCSS.nativeShadow) && 'adoptedStyleSheets' in Document.prototype && 'replace' in CSSStyleSheet.prototype;
      var constructionToken = Symbol();
      var CSSResult = /*#__PURE__*/function () {
        function CSSResult(cssText, safeToken) {
          _classCallCheck(this, CSSResult);

          if (safeToken !== constructionToken) {
            throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
          }

          this.cssText = cssText;
        } // Note, this is a getter so that it's lazy. In practice, this means
        // stylesheets are not created until the first element instance is made.


        _createClass(CSSResult, [{
          key: "styleSheet",
          get: function get() {
            if (this._styleSheet === undefined) {
              // Note, if `supportsAdoptingStyleSheets` is true then we assume
              // CSSStyleSheet is constructable.
              if (supportsAdoptingStyleSheets) {
                this._styleSheet = new CSSStyleSheet();

                this._styleSheet.replaceSync(this.cssText);
              } else {
                this._styleSheet = null;
              }
            }

            return this._styleSheet;
          }
        }, {
          key: "toString",
          value: function toString() {
            return this.cssText;
          }
        }]);

        return CSSResult;
      }();
      /**
       * Wrap a value for interpolation in a [[`css`]] tagged template literal.
       *
       * This is unsafe because untrusted CSS text can be used to phone home
       * or exfiltrate data to an attacker controlled site. Take care to only use
       * this with trusted input.
       */

      var unsafeCSS = function unsafeCSS(value) {
        return new CSSResult(String(value), constructionToken);
      };

      var textFromCSSResult = function textFromCSSResult(value) {
        if (value instanceof CSSResult) {
          return value.cssText;
        } else if (typeof value === 'number') {
          return value;
        } else {
          throw new Error("Value passed to 'css' function must be a 'css' function result: ".concat(value, ". Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security."));
        }
      };
      /**
       * Template tag which which can be used with LitElement's [[LitElement.styles |
       * `styles`]] property to set element styles. For security reasons, only literal
       * string values may be used. To incorporate non-literal values [[`unsafeCSS`]]
       * may be used inside a template string part.
       */


      var css = function css(strings) {
        for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          values[_key - 1] = arguments[_key];
        }

        var cssText = values.reduce(function (acc, v, idx) {
          return acc + textFromCSSResult(v) + strings[idx + 1];
        }, strings[0]);
        return new CSSResult(cssText, constructionToken);
      };

      // This line will be used in regexes to search for LitElement usage.
      // TODO(justinfagnani): inject version number at build time

      (window['litElementVersions'] || (window['litElementVersions'] = [])).push('2.4.0');
      /**
       * Sentinal value used to avoid calling lit-html's render function when
       * subclasses do not implement `render`
       */

      var renderNotImplemented = {};
      /**
       * Base element class that manages element properties and attributes, and
       * renders a lit-html template.
       *
       * To define a component, subclass `LitElement` and implement a
       * `render` method to provide the component's template. Define properties
       * using the [[`properties`]] property or the [[`property`]] decorator.
       */

      var LitElement = /*#__PURE__*/function (_UpdatingElement) {
        _inherits(LitElement, _UpdatingElement);

        var _super = _createSuper(LitElement);

        function LitElement() {
          _classCallCheck(this, LitElement);

          return _super.apply(this, arguments);
        }

        _createClass(LitElement, [{
          key: "initialize",
          value:
          /**
           * Performs element initialization. By default this calls
           * [[`createRenderRoot`]] to create the element [[`renderRoot`]] node and
           * captures any pre-set values for registered properties.
           */
          function initialize() {
            _get(_getPrototypeOf(LitElement.prototype), "initialize", this).call(this);

            this.constructor._getUniqueStyles();

            this.renderRoot = this.createRenderRoot(); // Note, if renderRoot is not a shadowRoot, styles would/could apply to the
            // element's getRootNode(). While this could be done, we're choosing not to
            // support this now since it would require different logic around de-duping.

            if (window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot) {
              this.adoptStyles();
            }
          }
          /**
           * Returns the node into which the element should render and by default
           * creates and returns an open shadowRoot. Implement to customize where the
           * element's DOM is rendered. For example, to render into the element's
           * childNodes, return `this`.
           * @returns {Element|DocumentFragment} Returns a node into which to render.
           */

        }, {
          key: "createRenderRoot",
          value: function createRenderRoot() {
            return this.attachShadow({
              mode: 'open'
            });
          }
          /**
           * Applies styling to the element shadowRoot using the [[`styles`]]
           * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where
           * available and will fallback otherwise. When Shadow DOM is polyfilled,
           * ShadyCSS scopes styles and adds them to the document. When Shadow DOM
           * is available but `adoptedStyleSheets` is not, styles are appended to the
           * end of the `shadowRoot` to [mimic spec
           * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
           */

        }, {
          key: "adoptStyles",
          value: function adoptStyles() {
            var styles = this.constructor._styles;

            if (styles.length === 0) {
              return;
            } // There are three separate cases here based on Shadow DOM support.
            // (1) shadowRoot polyfilled: use ShadyCSS
            // (2) shadowRoot.adoptedStyleSheets available: use it
            // (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after
            // rendering


            if (window.ShadyCSS !== undefined && !window.ShadyCSS.nativeShadow) {
              window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map(function (s) {
                return s.cssText;
              }), this.localName);
            } else if (supportsAdoptingStyleSheets) {
              this.renderRoot.adoptedStyleSheets = styles.map(function (s) {
                return s instanceof CSSStyleSheet ? s : s.styleSheet;
              });
            } else {
              // This must be done after rendering so the actual style insertion is done
              // in `update`.
              this._needsShimAdoptedStyleSheets = true;
            }
          }
        }, {
          key: "connectedCallback",
          value: function connectedCallback() {
            _get(_getPrototypeOf(LitElement.prototype), "connectedCallback", this).call(this); // Note, first update/render handles styleElement so we only call this if
            // connected after first update.


            if (this.hasUpdated && window.ShadyCSS !== undefined) {
              window.ShadyCSS.styleElement(this);
            }
          }
          /**
           * Updates the element. This method reflects property values to attributes
           * and calls `render` to render DOM via lit-html. Setting properties inside
           * this method will *not* trigger another update.
           * @param _changedProperties Map of changed properties with old values
           */

        }, {
          key: "update",
          value: function update(changedProperties) {
            var _this = this;

            // Setting properties in `render` should not trigger an update. Since
            // updates are allowed after super.update, it's important to call `render`
            // before that.
            var templateResult = this.render();

            _get(_getPrototypeOf(LitElement.prototype), "update", this).call(this, changedProperties); // If render is not implemented by the component, don't call lit-html render


            if (templateResult !== renderNotImplemented) {
              this.constructor.render(templateResult, this.renderRoot, {
                scopeName: this.localName,
                eventContext: this
              });
            } // When native Shadow DOM is used but adoptedStyles are not supported,
            // insert styling after rendering to ensure adoptedStyles have highest
            // priority.


            if (this._needsShimAdoptedStyleSheets) {
              this._needsShimAdoptedStyleSheets = false;

              this.constructor._styles.forEach(function (s) {
                var style = document.createElement('style');
                style.textContent = s.cssText;

                _this.renderRoot.appendChild(style);
              });
            }
          }
          /**
           * Invoked on each update to perform rendering tasks. This method may return
           * any value renderable by lit-html's `NodePart` - typically a
           * `TemplateResult`. Setting properties inside this method will *not* trigger
           * the element to update.
           */

        }, {
          key: "render",
          value: function render() {
            return renderNotImplemented;
          }
        }], [{
          key: "getStyles",
          value:
          /**
           * Return the array of styles to apply to the element.
           * Override this method to integrate into a style management system.
           *
           * @nocollapse
           */
          function getStyles() {
            return this.styles;
          }
          /** @nocollapse */

        }, {
          key: "_getUniqueStyles",
          value: function _getUniqueStyles() {
            // Only gather styles once per class
            if (this.hasOwnProperty(JSCompiler_renameProperty('_styles', this))) {
              return;
            } // Take care not to call `this.getStyles()` multiple times since this
            // generates new CSSResults each time.
            // TODO(sorvell): Since we do not cache CSSResults by input, any
            // shared styles will generate new stylesheet objects, which is wasteful.
            // This should be addressed when a browser ships constructable
            // stylesheets.


            var userStyles = this.getStyles();

            if (Array.isArray(userStyles)) {
              // De-duplicate styles preserving the _last_ instance in the set.
              // This is a performance optimization to avoid duplicated styles that can
              // occur especially when composing via subclassing.
              // The last item is kept to try to preserve the cascade order with the
              // assumption that it's most important that last added styles override
              // previous styles.
              var addStyles = function addStyles(styles, set) {
                return styles.reduceRight(function (set, s) {
                  return (// Note: On IE set.add() does not return the set
                    Array.isArray(s) ? addStyles(s, set) : (set.add(s), set)
                  );
                }, set);
              }; // Array.from does not work on Set in IE, otherwise return
              // Array.from(addStyles(userStyles, new Set<CSSResult>())).reverse()


              var set = addStyles(userStyles, new Set());
              var styles = [];
              set.forEach(function (v) {
                return styles.unshift(v);
              });
              this._styles = styles;
            } else {
              this._styles = userStyles === undefined ? [] : [userStyles];
            } // Ensure that there are no invalid CSSStyleSheet instances here. They are
            // invalid in two conditions.
            // (1) the sheet is non-constructible (`sheet` of a HTMLStyleElement), but
            //     this is impossible to check except via .replaceSync or use
            // (2) the ShadyCSS polyfill is enabled (:. supportsAdoptingStyleSheets is
            //     false)


            this._styles = this._styles.map(function (s) {
              if (s instanceof CSSStyleSheet && !supportsAdoptingStyleSheets) {
                // Flatten the cssText from the passed constructible stylesheet (or
                // undetectable non-constructible stylesheet). The user might have
                // expected to update their stylesheets over time, but the alternative
                // is a crash.
                var cssText = Array.prototype.slice.call(s.cssRules).reduce(function (css, rule) {
                  return css + rule.cssText;
                }, '');
                return unsafeCSS(cssText);
              }

              return s;
            });
          }
        }]);

        return LitElement;
      }(UpdatingElement);
      /**
       * Ensure this class is marked as `finalized` as an optimization ensuring
       * it will not needlessly try to `finalize`.
       *
       * Note this property name is a string to prevent breaking Closure JS Compiler
       * optimizations. See updating-element.ts for more information.
       */

      LitElement['finalized'] = true;
      /**
       * Reference to the underlying library method used to render the element's
       * DOM. By default, points to the `render` method from lit-html's shady-render
       * module.
       *
       * **Most users will never need to touch this property.**
       *
       * This  property should not be confused with the `render` instance method,
       * which should be overridden to define a template for the element.
       *
       * Advanced users creating a new base class based on LitElement can override
       * this property to point to a custom render method with a signature that
       * matches [shady-render's `render`
       * method](https://lit-html.polymer-project.org/api/modules/shady_render.html#render).
       *
       * @nocollapse
       */

      LitElement.render = render;

      var _templateObject, _templateObject2;

      var CrossWordElement = /*#__PURE__*/function (_LitElement) {
        _inherits(CrossWordElement, _LitElement);

        var _super = _createSuper(CrossWordElement);

        function CrossWordElement() {
          var _this;

          _classCallCheck(this, CrossWordElement);

          _this = _super.call(this); // Request an update in response to an event

          _this.addEventListener('load-complete', /*#__PURE__*/function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      console.log(e.detail.message); //console.log(e.detail.message.getBoundingClientRect())

                      _context.t0 = console;
                      _context.next = 4;
                      return _this.requestUpdate();

                    case 4:
                      _context.t1 = _context.sent;

                      _context.t0.log.call(_context.t0, _context.t1);

                    case 6:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }));

            return function (_x) {
              return _ref.apply(this, arguments);
            };
          }());

          return _this;
        }

        _createClass(CrossWordElement, [{
          key: "render",
          value: function render() {
            return html(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n        <main>\n        <div>\n\n            <article aria-label=\"puzzle game\">\n                <section aria-label=\"puzzle grid\">\n                    <div class=\"board\">\n                        <svg viewBox=\"0 0 501 501\" xmlns=\"http://www.w3.org/2000/svg\" role=\"grid\"\n                            aria-labelledby=\"id-grid-layout\">\n                            <title id=\"id-grid-layout\">Puzzle Grid</title>\n                           \n                            \n                        </svg>\n                    </div>\n                </section>\n\n                <section hidden aria-label=\"puzzle clues\">\n                    <div class=\"scrolls\" hidden>\n                    </div>\n                </section>\n\n            </article>\n\n            <div class=\"touchControls\">\n                <div class=\"touchClues\" aria-label=\"puzzle clues carousel\">\n                    <span class=\"chevron left\">&lsaquo;</span>\n                    <div class=\"clueText\">\n                        <div class=\"container\"></div>\n                    </div>\n                    <span class=\"chevron right\">&rsaquo;</span>\n                </div>\n                <div class=\"keyboard\">\n                </div>\n            </div>\n\n        </div>\n    </main>\n    "])));
          }
        }, {
          key: "connectedCallback",
          value: function connectedCallback() {
            _get(_getPrototypeOf(CrossWordElement.prototype), "connectedCallback", this).call(this);

            console.log(this.shadowRoot);
          }
        }, {
          key: "firstUpdated",
          value: function firstUpdated() {
            _get(_getPrototypeOf(CrossWordElement.prototype), "firstUpdated", this).call(this);

            init(this.shadowRoot);
            var newMessage = new CustomEvent('load-complete', {
              detail: {
                message: 'load completed'
              }
            }); // Custom DOM events which are fired on internal nodes in a shadow tree 
            // DO not bubble out of the shadow boundary unless the event is created using the composed: true flag:
            // https://developers.google.com/web/fundamentals/web-components/shadowdom#events

            this.dispatchEvent(newMessage);
          }
        }], [{
          key: "styles",
          get: function get() {
            return css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n        :root {\n            --black: rgba(0, 0, 0, 0.692);\n            /*--lt-grey: #f5f7f7;*/\n            --lt-grey: #f8f8f8;\n            --med-grey: #999;\n            --dk-grey: #444;\n            /*--wh-blue: #f2f9ff;*/\n            --lt-blue: #def1ff;\n            --lt-blue-mono: #ededed;\n            --med-blue: #55b8fe;\n            --dk-blue: #0181dc;\n            --dk-blue-mono: #656565;\n            --green: #00ff00;\n            --red: #ff3333;\n          }\n        \n         \n          \n          body {\n            font-family: \"arial,sans-serif\";\n            /* font-family: 'Libre Franklin', sans-serif; */\n          }\n        \n          /* containing the whole page */\n          main > div:first-child {\n            position: relative;\n            display:flex;\n            flex-direction: column;\n            height: 90vh; /* TODO!!!!!!!!!!!! */\n            width: calc(100vw - 16px); /* calculating margin 8px on each side */\n            justify-content: space-between;\n            overflow: hidden;\n          }\n        \n          article[aria-label=\"puzzle game\"] {\n            display: flex;\n            width: 100%;  /* relevant to the main div */\n            height: 100%;\n            max-width: 100%;\n            max-height: 100%;\n            flex-wrap: wrap;\n          }\n        \n          section[aria-label=\"puzzle grid\"], section[aria-label = \"puzzle clues\"] {\n            /* display: inline-block; */\n          }\n        \n          /* containing the svg */\n          section[aria-label=\"puzzle grid\"] {\n            position: relative;\n            height: 60vh;\n            flex-basis: 100%; /* mobile first */\n            max-width: 100%;\n            overflow: hidden\n          } \n        \n          /* VERY SMALL PHONES */\n          \n          @media screen and (max-width: 320px) {\n            section[aria-label=\"puzzle grid\"] {\n              height: auto;\n              /* flex-grow: 1; */\n            }\n          \n            section[aria-label=\"puzzle clues\"] {\n              font-size: 13px;\n            }\n        \n            .scrolls ol::-webkit-scrollbar {\n              width: 8px;\n            }\n          }\n        \n          \n        @media screen and (min-width:768px) and (max-width:1199px) {\n          section[aria-label=\"puzzle grid\"] {\n            flex-basis: 50%;\n            /* flex-grow: 1; */\n          }\n        \n          section[aria-label=\"puzzle clues\"] {\n            flex-basis: 50%;\n          }\n        }\n        \n              \n         @media screen and (min-width: 1200px) {\n        \n          main {\n            font-size: 15px;\n            box-sizing: border-box;\n          }\n        \n          main > div:first-child {\n            /* width: 80vw; check syndication */\n          }\n        \n          article[aria-label=\"puzzle game\"] {\n            height: 100%; /* percentage of the main div for desktop when we don't show controls*/\n            min-height: 100%;    \n            justify-content: center;\n        \n          }\n          \n          section[aria-label=\"puzzle grid\"] {\n            flex-basis: 30%;\n            height: 65vh;    \n            max-height: 65vh; \n            min-height: 65vh; \n          }\n        \n          section[aria-label=\"puzzle clues\"] {\n            flex-basis: 30%;\n            /* percentage of the main > div for desktop when we don't show controls   */    \n          }\n        \n        } /* end of media */\n        \n        \n        /* scrolls */\n        .scrolls:not([hidden]) {\n          display: flex;\n          justify-content:space-around; \n        }\n        \n        .scrolls:not([hidden]) > div {\n          margin-left: 1vw;\n        }\n        \n        .scrolls:not([hidden]) ol {   \n          height: calc(20vh - 30px);\n          min-height: calc(20vh - 30px);\n          max-height: calc(20vh - 30px);\n          font-size: 1vw;\n          list-style-type: none;    \n          padding-inline-start: 0;\n          padding-left: 0;\n          overflow-y: scroll;\n          list-style-type: none;\n          font-size: inherit;\n          box-sizing: border-box;\n        }\n        \n        @media screen and (min-width: 768px){\n          .scrolls:not([hidden]) ol {   \n            height: calc(80vh - 30px);\n            min-height: calc(80vh - 30px);\n            max-height: calc(80vh - 30px);  \n          }\n        }\n          \n        .scrolls ol li {\n          border-left: 10px solid transparent;\n          cursor: pointer;\n          display: flex;\n          padding-right: 1vw;\n          box-sizing: border-box;\n        }\n        \n        .scrolls h4 {\n          width: 95%;\n          margin: 0;\n          padding-bottom: 5px;\n          text-transform: uppercase;\n          border-bottom: solid 1px #ccc;\n        }\n        \n        .scrolls ol li.activeClue {\n          border-left: 10px solid transparent;\n          cursor: pointer;\n          display: flex;\n          background-color: lightblue;\n        }\n        \n        .scrolls ol li.highlightedClue {\n          border-color: lightblue;\n        }\n        \n        .scrolls ol li span {\n          line-height: 1.3;\n          padding: 5px 1px;\n          background: transparent;\n        }\n        \n        .scrolls ol li > span:first-child {\n          font-weight: bold;\n          width: 20px;\n          text-align: right;\n          margin-right: 5px;\n          box-sizing: border-box;\n        }\n        \n        .scrolls ol li > span:nth-child(2) {\n          width: calc(100% - 24px);\n        } \n        \n        \n        @media screen and (min-width: 1200px) {\n          .scrolls ol::-webkit-scrollbar {\n            width: 12px;\n            /* height: 5px; */\n            border-radius: 4px;\n            background-color:#ddd; /* or add it to the track */\n          }\n          \n          .scrolls ol::-webkit-scrollbar-thumb {\n            background: #aaa ;\n            border-radius: 3px;\n          }\n        }\n        \n        \n        .board {\n          position: absolute; /* RELATIVE TO: section[aria-label=\"puzzle grid\"] */\n          top: 1px;\n          left: 1px;\n          right: 1px;\n          bottom: 1px;\n          box-sizing: border-box;\n          transition: transform 0s ease-in-out 0s;  /* name duration transition function delay */\n          transform: translate(0px, 0px) scale(1);\n          touch-action: none; /*Disable browser handling of all panning and zooming gestures.*/\n          user-select: none;\n          -webkit-user-drag: none;\n          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n        }\n        \n          \n        @media (min-width: 1399px) {\n          .board {\n            /* justify-content: space-between; */\n            top: 0;\n            left:0;\n            right: unset;\n            bottom: unset;    \n          }\n        }\n        \n        /* mobile first */\n        svg {\n          display: block;\n          width: 100%;\n          max-width: 100%; \n          max-height: 100%;\n          user-select: none;\n        }\n          \n        svg text {    \n            font-weight: \"100\";\n            font-family: 'inherit';\n            pointer-events: none;\n        }\n        \n        svg rect {\n          -webkit-tap-highlight-color: transparent;     \n        }\n        \n        svg path {\n          user-select: none;\n        }\n        \n        svg:focus, svg rect:focus {\n          outline: none;\n        }\n        \n        svg rect::-moz-focus-inner {\n          outline: none;\n        }\n        \n        @media (min-width: 1399px) {\n          svg {\n            /* width: 100%; */\n            width: 501px;\n            height: 501px;\n          }\n        }\n        \n        /* @media (max-width: 1398px) and (min-height: 700px) {\n          svg {\n            height: 100%;\n          }\n        } */\n        \n        \n        .hidden {\n          width: 0;\n          height: 0;\n          pointer-events: none;\n          opacity: 0.001;\n          user-select: none;\n        }\n        \n        .keyboard:not(touch) {\n          display:none;\n        } \n        \n        .keyboard.touch {\n          position: relative;\n          /* bottom:0;\n          left:0; */\n          z-index:1;\n          display: flex;\n          flex-direction: column;\n          justify-content: space-around;\n          width: 100%;\n          height: 22vh;\n          max-height: 22vh;\n          min-height: 22vh;\n          overflow-y: visible; \n          padding: 2px 0;\n          background-color: lightgrey;\n          touch-action: none;\n        }\n        \n        .keyboard.touch .keyboard_row {\n          display: flex;\n          flex-direction: row; \n          justify-content: center;\n          align-items: center;\n          max-width: 100%;\n          height: 30%;\n          max-height: 30%;\n          overflow-y: visible;\n          margin-top: 1%;\n        }\n        \n        .keyboard.touch .button {\n          display: flex;\n          justify-content: center;\n          align-items: center;\n          position: relative;\n          height: 100%;\n          margin: 1.5% 0.6%;\n          outline: none;\n          padding: 1% 0.5%;\n          width: 8.5%; \n          text-align: center;\n          background-color: #fff;\n          border-radius: 3px;\n          -webkit-box-shadow: 0 1px 1px 0 rgb(0 0 0 / 8%);\n          box-shadow: 0 1px 1px 0 rgb(0 0 0 / 8%);\n          color: #000;\n          font: 300 3vw sans-serif;  \n        }\n        \n        .keyboard.touch .button.backspace {\n          font-size: 7.5vw;\n          padding-right: 5px;\n          color: darkslategrey;\n        }\n        \n        .keyboard.touch .button.pressed {\n          z-index: 2;\n          font: normal 8vw sans-serif;\n          animation: grow 0.3s backwards;\n        }\n        \n        @media (max-width: 499px) {\n          .keyboard.touch .button {\n              font-size: 7vw;\n              height: 92%;\n              margin: 2px;\n          }\n        }\n        \n        \n        @keyframes grow {\n          50% {\n            background-color: #fff;\n            border-bottom: none;\n            padding-top: 2%;\n            padding-bottom: 8%;\n            top: -10%;\n          }\n        }\n        \n        \n        .touchClues {\n          display: none;\n        }\n        \n        .touchClues.touch {\n          display: flex;\n          justify-content: space-between;\n          align-items: center;\n          width: 100%;\n          max-width: 100%;\n          height: 7.5vh;\n          max-height: 7.5vh;\n          overflow: hidden;\n          z-index:1;\n          background-color:lightblue;\n          touch-action: none;\n        }\n        \n        .touchClues.touch span.chevron {\n          flex-grow: 1;\n          font-size: 15vw; \n          line-height: 0.6;\n          padding-bottom: 1.3vw;\n          text-align: center;\n          box-sizing: border-box;\n          color: white;\n        \n        }\n        \n        .touchClues.touch span.chevron.left {\n          /* padding-left: 10px; */\n        }\n        \n        .touchClues.touch span.chevron.right {\n          /* padding-left: 8px; */\n        }\n        \n        .touchClues.touch .clueText  {\n          height: 100%;\n          flex-basis: 72vw;\n          max-width: 72vw;\n          box-sizing: border-box;\n          overflow: hidden;\n        }\n        \n        .touchClues.touch .clueText .container {\n          width: auto;\n          height: auto;\n        }\n        \n        .touchClues.touch .clueText ol {\n          list-style-type: none;\n          margin-block-start: 0;\n          margin-block-end: 0;\n          padding-inline-start: 0;\n        }\n         \n        .touchClues.touch .clueText ol li {\n          display:flex;\n          justify-content: start;\n          align-items: center; \n          height: 7.5vh;\n          max-height: 7.5vh;\n          width: 72vw;\n          max-width: 72vw;\n          box-sizing: border-box; \n          font-size: 4.7vw;\n          user-select: none;\n        }\n        \n        .touchClues.touch .clueText ol li span:nth-child(1) {\n          padding-left: 2vw;\n          box-sizing: border-box;\n          font-weight: bold;\n          text-transform: uppercase;\n          user-select: none;\n        }\n        \n        .touchClues.touch .clueText ol li span:nth-child(2) {\n          padding-left: 2.5vw;\n          box-sizing: border-box;\n          text-align: left;\n          user-select: none;\n        }\n        \n        \n        .touchControls {\n          display: none;  \n        }\n        \n        .touchControls.touch {\n          display: flex; \n          flex-direction: column; \n          z-index: 1;\n        }\n        \n        \n        \n        "])));
          }
        }]);

        return CrossWordElement;
      }(LitElement);

      customElements.define('cross-word', CrossWordElement);

    }
  };
});
