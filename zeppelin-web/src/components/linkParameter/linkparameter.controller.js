angular.module('zeppelinWebApp').controller('LinkParameterCtrl', LinkParameterCtrl);



function LinkParameterCtrl ($scope, $rootScope) {
  'ngInject'

  $scope.data = {
    linkColumn: null,
    paragraph: null,
    availableOptions: [
      {id: '1', name: 'cust_no'},
      {id: '2', name: '_col1'}
    ],
    linkParameterRows: [{
      column : '',
      inputName : ''
    }],
    addedLinks: [],
    source: null
  };

  $scope.addRow = function(index){
    var emptyRow = { column : '', inputName : '' };
    $scope.data.linkParameterRows.splice(index + 1, 0, emptyRow);
  };

  $scope.deleteRow = function(index) {
    if(index > 0) {
      $scope.data.linkParameterRows.splice(index, 1);
    }
  };

  $scope.addLink = function(paragraphId) {
    var rows = $scope.data.linkParameterRows;

    var linkParameters = [];
    for(var i = 0; i < rows.length; i++) {
      var linkParameter = {};
      linkParameter[rows[i].column] = rows[i].inputName;
      linkParameters.push(linkParameter);
    }

    var addingLink = {
      linkColumn: $scope.data.linkColumn,
      targetParagraph: $scope.data.paragraph,
      linkParameters:linkParameters
    }
    $scope.data.addedLinks.push(addingLink);

    $rootScope.$broadcast('linkParameter', {
      sourceParagraphId: paragraphId,
      targetParagraph: $scope.data.paragraph,
      sourceParagraphLinkColumnIdx: 0,
      targetParagraphLinkParameters: linkParameters
    });
  };

  $scope.deleteLink = function(index) {
    $scope.data.addedLinks.splice(index, 1);
  };


}
