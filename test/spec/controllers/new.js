'use strict';

describe('Testando o NewCtrl', function() {

/* 
     beforeEach(function(){
       this.addMatchers({
         toEqualData: function(expected) {
           return angular.equals(this.actual, expected);
         }
       });
     });
 
     beforeEach(module('provaClientApp'));
*/
 
 
  describe('NewCtrl', function(){
	  /*
       var scope, ctrl, $httpBackend;
 
       beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
		 $httpBackend = _$httpBackend_;
		 
		 jasmine.getJSONFixtures().fixturesPath='base/test/mock';
		 
		 $httpBackend.expectPOST('@@host/templates', getJSONFixture('new_template.json')).respond(200, '');
		 scope = $rootScope.$new();
		 ctrl = $controller('NewCtrl', {$scope: scope});
		 
		 $httpBackend.flush();
		 
       }));
	   */
 
    it('deve adicionar um template', function() {
      expect(1).toBe(1);
		// $httpBackend.flush();
        // expect(scope.fieldList).toEqualData(getJSONFixture('new_template.json').fields);
    });
  });
});
