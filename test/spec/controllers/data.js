'use strict';

describe('Testando o DataCtrl', function() {
 
  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });
 
  beforeEach(module('provaClientApp'));
 
 
  describe('DataCtrl', function(){
    var scope, ctrl, $httpBackend;
 
    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('@@host/templates').respond({id: '1'});
 
      scope = $rootScope.$new();
      ctrl = $controller('DataCtrl', {$scope: scope});
    }));
 
 
    it('deve receber 2 templates', function() {
      expect(scope.dataForm).toEqual({});
      $httpBackend.flush();
 
      expect(scope.dataForm).toEqualData({id: '1'});
    });
<<<<<<< HEAD
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(4).toBe(4);
=======
>>>>>>> 4550e8152c7cb4c04a929ef5a1dc7e4c8efa8036
  });
});