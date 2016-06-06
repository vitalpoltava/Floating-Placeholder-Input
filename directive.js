/**
 * Floating Placeholder Input (Material Design)
 *
 * ver 0.1.0
 *
 * (c) Vitalii Omelkin, 2016
 * Licensed under the MIT License
 *
 */
;(function(){
    var fpInput = angular.module('input', []);

    // ------------------------
    //        DIRECTIVE
    // ------------------------
    // @ngInject
    fpInput.directive('fpInput', function($timeout) {
        return {
            restrict: 'A',
            scope: {
                fpPlaceholder: '@',
                fpValue: '=',
                fpPattern: '@'
            },
            template: '' +
            '<div class="floating-placeholder" ng-class="{\'input-error\': invalid}">' +
            '   <label>{{ fpPlaceholder }}</label>' +
            '   <input ng-model="fpValue" ng-pattern="fpPattern">' +
            '</div>',

            link: function($scope, $el) {
                var $input = $el.find('input');
                var $label = $el.find('label');
                var ngCtrl = $input.controller('ngModel');

                /**
                 * Simple validator (uses ngModel validation)
                 */
                var simpleValidate = function() {
                    $scope.invalid = !ngCtrl.$valid;
                };

                $timeout(function() {
                    if ($input.val()) {
                        $label.addClass('float-top');
                    }
                    ngCtrl.$viewChangeListeners.push(simpleValidate);
                });

                $input.on('focus', function() {
                    $label.addClass('float-top');
                });

                $input.on('blur', function() {
                    if (!ngCtrl.$viewValue) {
                        $label.removeClass('float-top');
                    }
                });
            }
        };
    });
}());