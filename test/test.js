$(function () {

    module("Object tests");

      test("should provide no conflict", function () {
        var simplebar = $.fn.simplebar.noConflict();
        ok(!$.fn.simplebar, 'simplebar was set back to undefined (org value)');
        $.fn.simplebar = simplebar;
      });

      test("should be defined on jquery object", function () {
        ok($('.test2').simplebar, 'simplebar method is defined')
      });

      test("should return element", function () {
        ok($('.test2').simplebar()[0] == $('.test2')[0], 'test2 dom element returned')
      });

    module("DOM manipulation tests");
});