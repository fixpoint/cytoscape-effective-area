(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('cytoscape')) :
  typeof define === 'function' && define.amd ? define(['exports', 'cytoscape'], factory) :
  (global = global || self, factory(global.cytoscapeDlbclick = {}));
}(this, function (exports) { 'use strict';

  var EffectiveArea = /** @class */ (function () {
      function EffectiveArea(cy) {
          this.cy = cy;
          this.original = {
              getCenterPan: cy.getCenterPan,
              getFitViewport: cy.getFitViewport,
          };
      }
      EffectiveArea.prototype.enable = function (effectiveAreaGetter) {
          var _this = this;
          var cy = this.cy;
          cy.getCenterPan = function () {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments[_i];
              }
              var effectiveArea = effectiveAreaGetter();
              var originalSize = cy.size;
              cy.size = function () {
                  return {
                      width: effectiveArea.width,
                      height: effectiveArea.height,
                  };
              };
              try {
                  var r = _this.original.getCenterPan.call(cy, args);
                  if (!r) {
                      return r;
                  }
                  r.x += effectiveArea.x;
                  r.y += effectiveArea.y;
                  return r;
              }
              finally {
                  cy.size = originalSize;
              }
          };
          cy.getFitViewport = function () {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments[_i];
              }
              var effectiveArea = effectiveAreaGetter();
              var originalSize = cy.size;
              cy.size = function () {
                  return {
                      width: effectiveArea.width,
                      height: effectiveArea.height,
                  };
              };
              try {
                  var r = _this.original.getFitViewport.call(cy, args);
                  if (!r) {
                      return r;
                  }
                  r.pan.x += effectiveArea.x;
                  r.pan.y += effectiveArea.y;
                  return r;
              }
              finally {
                  cy.size = originalSize;
              }
          };
      };
      EffectiveArea.prototype.disable = function () {
          var cy = this.cy;
          cy.getCenterPan = this.original.getCenterPan;
          cy.getFitViewport = this.original.getFitViewport;
      };
      return EffectiveArea;
  }());
  function extension(effectiveAreaGetter) {
      var effectiveArea = new EffectiveArea(this);
      effectiveArea.enable(effectiveAreaGetter);
      return effectiveArea;
  }

  function register(cy) {
      if (!cy) {
          return;
      }
      // Initialize extension
      // Register extension
      var extensionName = 'effectiveArea';
      cy('core', extensionName, extension);
      // cy('collection', extensionName, extension);
      // cy('layout', extensionName, extension);
      // cy('renderer', extensionName, extension);
  }
  if (typeof window.cytoscape !== 'undefined') {
      register(window.cytoscape);
  }

  exports.EffectiveArea = EffectiveArea;
  exports.default = register;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.js.map
