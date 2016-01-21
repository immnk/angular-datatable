var treeData = [
  {
    title: "England", key: "England", expand: true, treeLevel: 0,
    children: [
      {
        title: "Region1", key: "Region1", select: true, activate: true, 
        expand:false,treeLevel: 1,
        children: [
          {title: "London", key: "London", select: true, treeLevel: 2},
          {title: "Leeds", key: "Leeds", select: true, treeLevel: 2}
        ]
      }, {
        title: "Region2", key: "Region2", activate: true, expand:false, treeLevel: 1,
        children: [
          {title: "NewYork", key: "NewYork", treeLevel: 2},
          {title: "Chicago", key: "Chicago", treeLevel: 2}
        ]
      },
      {
        title: "Region3", key: "Region3", activate: true, expand:false, treeLevel: 1,
        children: [
          {title: "London", key: "London", treeLevel: 2},
          {title: "Leeds", key: "Leeds", treeLevel: 2}
        ]
      }, {
        title: "Region4", key: "Region4", activate: true, expand:false, treeLevel: 1,
        children: [
          {title: "NewYork", key: "NewYork", treeLevel: 2},
          {title: "Chicago", key: "Chicago", treeLevel: 2}
        ]
      },
      {
        title: "Region5", key: "Region5", activate: true, expand:true, treeLevel: 1,
        children: [
          {title: "London", key: "London", select: true, treeLevel: 2},
          {title: "Leeds", key: "Leeds", treeLevel: 2}
        ]
      }, {
        title: "Region6", key: "Region6", activate: true, expand:false, treeLevel: 1,
        children: [
          {title: "NewYork", key: "NewYork", select: true, treeLevel: 2},
          {title: "Chicago", key: "Chicago", treeLevel: 2}
        ]
      },{
        title: "Region7", key: "Region7", select: true, activate: true, 
        expand:false,treeLevel: 1,
        children: [
          {title: "London", key: "London", select: true, treeLevel: 2},
          {title: "Leeds", key: "Leeds", select: true, treeLevel: 2}
        ]
      }, {
        title: "Region8", key: "Region8", activate: true, expand:false, treeLevel: 1,
        children: [
          {title: "NewYork", key: "NewYork", treeLevel: 2},
          {title: "Chicago", key: "Chicago", treeLevel: 2}
        ]
      },
      {
        title: "Region9", key: "Region9", activate: true, expand:false, treeLevel: 1,
        children: [
          {title: "London", key: "London", treeLevel: 2},
          {title: "Leeds", key: "Leeds", treeLevel: 2}
        ]
      }, {
        title: "Region10", key: "Region10", activate: true, expand:false, treeLevel: 1,
        children: [
          {title: "NewYork", key: "NewYork", treeLevel: 2},
          {title: "Chicago", key: "Chicago", treeLevel: 2}
        ]
      }, {
        title: "Region11", key: "Region11", activate: true, expand:true, treeLevel: 1,
        children: [
          {title: "London", key: "London", select: true, treeLevel: 2},
          {title: "Leeds", key: "Leeds", treeLevel: 2}
        ]
      }, {
        title: "Region12", key: "Region12", activate: true, expand:false, treeLevel: 1,
        children: [
          {title: "NewYork", key: "NewYork", select: true, treeLevel: 2},
          {title: "Chicago", key: "Chicago", treeLevel: 2}
        ]
      }, {
        title: "Region13", key: "Region13", activate: true, expand:false, treeLevel: 1,
        children: [
          {title: "NewYork", key: "NewYork", treeLevel: 2},
          {title: "Chicago", key: "Chicago", treeLevel: 2}
        ]
      }, {
        title: "Region14", key: "Region14", activate: true, expand:true, treeLevel: 1,
        children: [
          {title: "London", key: "London", select: true, treeLevel: 2},
          {title: "Leeds", key: "Leeds", treeLevel: 2}
        ]
      }, {
        title: "Region15", key: "Region15", activate: true, expand:false, treeLevel: 1,
        children: [
          {title: "NewYork", key: "NewYork", select: true, treeLevel: 2},
          {title: "Chicago", key: "Chicago", treeLevel: 2}
        ]
      }, {
        title: "Region16", key: "Region16", activate: true, expand:false, treeLevel: 1,
        children: [
          {title: "NewYork", key: "NewYork", treeLevel: 2},
          {title: "Chicago", key: "Chicago", treeLevel: 2}
        ]
      }, {
        title: "Region17", key: "Region17", activate: true, expand:true, treeLevel: 1,
        children: [
          {title: "London", key: "London", select: true, treeLevel: 2},
          {title: "Leeds", key: "Leeds", treeLevel: 2}
        ]
      }, {
        title: "Region18", key: "Region18", activate: true, expand:false, treeLevel: 1,
        children: [
          {title: "NewYork", key: "NewYork", select: true, treeLevel: 2},
          {title: "Chicago", key: "Chicago", treeLevel: 2}
        ]
      }, {
        title: "Region19", key: "Region19", activate: true, expand:false, treeLevel: 1,
        children: [
          {title: "NewYork", key: "NewYork", treeLevel: 2},
          {title: "Chicago", key: "Chicago", treeLevel: 2}
        ]
      }, {
        title: "Region20", key: "Region20", activate: true, expand:true, treeLevel: 1,
        children: [
          {title: "London", key: "London", select: true, treeLevel: 2},
          {title: "Leeds", key: "Leeds", treeLevel: 2}
        ]
      }, {
        title: "Region21", key: "Region21", activate: true, expand:false, treeLevel: 1,
        children: [
          {title: "NewYork", key: "NewYork", select: true, treeLevel: 2},
          {title: "Chicago", key: "Chicago", treeLevel: 2}
        ]
      }
    ]
  }
];

var enum_def = {
  INCLUDE_ROOT : true,
  NOT_INCLUDE_ROOT : false,
  STOP_ON_PARENTS : true
};

$(function(){
  $("#tree3").dynatree({
    checkbox: true,
    selectMode: 3,
    children: treeData,
    debugLevel: 0,
    onSelect: function(select, node) {
      var textTeamSelectedHtml = '';

      var selKeys = $.map(this.getSelectedNodes(enum_def.STOP_ON_PARENTS), 
          function(node){
            
            var children = node.getChildren();
            
            if(children!=null || children != undefined){
              var childrenStr = 
                $.map(children, function(child){return child.data.key}).join(", ");
              textTeamSelectedHtml +='<div>'+
                '<input type="radio" name="size" id="'+node.data.key+'" value="small"/>'+
                '<label class="accord_label parent" for="'+node.data.key+'">'+node.data.key+'</label>'+
                '<article><p>'+childrenStr+'</p></article>'+
                '</div>';
              
             } else{
              textTeamSelectedHtml +='<div>'+
                '<input type="radio" name="size" id="'+node.data.key+'" value="small"/>'+
                '<label class="accord_label" for="'+node.data.key+'">'+node.data.key+'</label>'+
                '</div>';
            }
          
            return node.data.key;
        });

      textTeamSelectedHtml += "";
      
      $("#accordionTeam").html(textTeamSelectedHtml);
      $("#displayText").val(selKeys.join(", "));
    },
    onDblClick: function(node, event) {
      node.toggleSelect();
    },
    onKeydown: function(node, event) {
      if( event.which == 32 ) {
        node.toggleSelect();
        return false;
      }
    },
    onPostInit: function(isReloading, isError) {
        // 'this' is the current tree
        var textTeamSelectedHtml = '';

        var selKeys = $.map(this.getSelectedNodes(enum_def.STOP_ON_PARENTS), 
          function(node){
            
            var children = node.getChildren();
            
            if(children!=null || children != undefined){
              var childrenStr = 
                $.map(children, function(child){return child.data.key}).join(", ");
              textTeamSelectedHtml +='<div>'+
                '<input type="radio" name="size" id="'+node.data.key+'" value="small"/>'+
                '<label class="accord_label parent" for="'+node.data.key+'"> + '+node.data.key+'</label>'+
                '<article><p>'+childrenStr+'</p></article>'+
                '</div>';
              
             } else{
              textTeamSelectedHtml +='<div>'+
                '<input type="radio" name="size" id="'+node.data.key+'" value="small"/>'+
                '<label class="accord_label" for="'+node.data.key+'">'+node.data.key+'</label>'+
                '</div>';
            }
          
            return node.data.key;
        });

        textTeamSelectedHtml += "";
        
        $("#accordionTeam").html(textTeamSelectedHtml);
        $("#displayText").val(selKeys.join(", "));
    },
  });

  $("#opener").click(function() {
     var tree = $("#tree3");
     var options = $("#options");
     if (tree.css("display") == "none") {
        tree.css("display", "block");
        options.css("display", "block");
     } else {
        tree.css("display", "none");
        options.css("display", "none");
     }
  });

  $("#btnSelectAll").click(function() {
    var dynaTree = $("#tree3").dynatree("getTree");
    dynaTree.visit(function(node){
      node.select(true);
    }, enum_def.INCLUDE_ROOT);
  });

  $("#btnDeselctAll").click(function() {
    var dynaTree = $("#tree3").dynatree("getTree");
    dynaTree.visit(function(node){
      node.select(false);
    }, enum_def.INCLUDE_ROOT);
  });

});