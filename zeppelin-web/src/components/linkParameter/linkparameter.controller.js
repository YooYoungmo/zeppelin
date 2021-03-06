angular.module('zeppelinWebApp').controller('LinkParameterCtrl', LinkParameterCtrl);



function LinkParameterCtrl ($scope, $rootScope, paragraphResultShareService, websocketMsgSrv) {
  'ngInject'

  $scope.data = null;

  function init(paragraphId) {
    $scope.data = {
      selectedLinkColumn: null,
      paragraph: null,
      availableLinkColumns: [],
      linkParameterRows: [{
        column : '',
        inputName : ''
      }],
      addedLinks: [],
      source: null
    };

    if($scope.paragraphId == paragraphId) {
      if(paragraphResultShareService.get(paragraphId)) {
        $scope.data.availableLinkColumns = [];
        var paragraphResults = paragraphResultShareService.get(paragraphId);
        for(var i = 0; i < paragraphResults.length; i++) {
          $scope.data.availableLinkColumns.push({
            idx: paragraphResults[i].index, name: paragraphResults[i].name
          });
        }
      }
    }
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
      if(rows[i].column && rows[i].inputName) {
        var linkParameter = {};
        linkParameter[rows[i].column] = rows[i].inputName;
        linkParameters.push(linkParameter);
      }
    }

    var selectedLinkColumn = JSON.parse($scope.data.selectedLinkColumn);

    var addingLink = {
      linkColumn: selectedLinkColumn.name,
      targetParagraph: $scope.data.paragraph,
      linkParameters:linkParameters
    };

    $scope.data.addedLinks.push(addingLink);
    websocketMsgSrv.linkParameter(paragraphId, selectedLinkColumn.idx, $scope.data.paragraph, linkParameters);
  };

  $scope.deleteLink = function(index) {
    $scope.data.addedLinks.splice(index, 1);
  };

  $scope.$on('openLinkParameterModal', function (event, paragraphId) {
    init(paragraphId);
  });
}
