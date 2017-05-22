angular.module('zeppelinWebApp').controller('LinkParameterCtrl', LinkParameterCtrl);



function LinkParameterCtrl ($scope, $rootScope, paragraphResultShareService) {
  'ngInject'

  $scope.data = {
    linkColumn: null,
    paragraph: null,
    availableOptions: [],
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

  $scope.$on('openLinkParameterModal', function (event, paragraphId) {
    if($scope.paragraphId == paragraphId) {
      if(paragraphResultShareService.get(paragraphId)) {
        $scope.data.availableOptions = [];
        var paragraphResults = paragraphResultShareService.get(paragraphId);
        for(var i = 0; i < paragraphResults.length; i++) {
          $scope.data.availableOptions.push({
            idx: paragraphResults[i].index, name: paragraphResults[i].name
          });
        }
      }
    }
  });
}
