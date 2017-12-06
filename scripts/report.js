
 
 
 var myFirebaseRef = new Firebase("https://ebenezerdcyoung.firebaseio.com/voter");
 var endpoint = 'https://ebenezerdcyoung.firebaseio.com/voter.json';
  
$(document).ajaxStart(function(){ $('.loading').show(); });
$(document).ajaxComplete(function(){ $('.loading').hide();	 });

function generateVoteReport(){
    
    $.ajax({
		url: endpoint,
		type: 'GET',
		success: function(data){
		    
		    var vote_report = new Object();
		if(data!=null){
         
          $.each(data,function(i,item){
              
              $.each(item.selection,function(i, item) {
                 if(vote_report.hasOwnProperty(item)){
                      vote_report[item]+=1;
                  }else{
                      vote_report[item]=1;
                  }
                 
              })
          });
          
          renderVoteReport(vote_report);
         }
			},
		});
    // myFirebaseRef.once("value", function(snapshot) {
    //     var vote_report = new Object();
        
    //     if(snapshot.val()!=null){
             
    //           $.each(snapshot.val(),function(i,item){
                  
    //               $.each(item.selection,function(i, item) {
    //                   console.log(item);
                      
    //                   if(vote_report.hasOwnProperty(item)){
    //                       vote_report[item]+=1;
    //                   }else{
    //                       vote_report[item]=1;
    //                   }
                     
    //               })
    //           });
              
    //           renderVoteReport(vote_report);
    //     }
    // });
        
}

function generateVotersReport(){
       $.ajax({
		url: endpoint,
		type: 'GET',
		success: function(data){
		 var vote_report = new Object();
         var voters_report = new Array();

         if(data!=null){
             
              $.each(data,function(i,item){
                   
                   var voter = new Object();
                   voter.name = i;
                   voter.votes= item.selection.length;
                   voters_report.push(voter);
                
              });
                console.log(voters_report);
              renderVotersReport(voters_report);
        }   
		
		 },
	   });
		
		
    // myFirebaseRef.once("value", function(snapshot) {
    //     var vote_report = new Object();
    //     var voters_report = new Array();

    //     if(snapshot.val()!=null){
             
    //           $.each(snapshot.val(),function(i,item){
                   
    //               var voter = new Object();
    //               voter.name = i;
    //               voter.votes= item.selection.length;
    //               voters_report.push(voter);
                
    //           });
    //             console.log(voters_report);
    //           renderVotersReport(voters_report);
    //     }
    // });
        
}

function generateVotersCommentsReport(){
    $.ajax({
		url: endpoint,
		type: 'GET',
		success: function(data){
	 var comment_report = new Array();

        if(data!=null){
             
              $.each(data,function(i,item){
                   
                   if(item.comment != null && item.comment != ''){
                       var voter = new Object();
                       voter.name = i;
                       voter.comment= item.comment;
                       comment_report.push(voter);
                       }
                
              });
              renderVotersCommentsReport(comment_report);
        }
		 },
	   });
	   
	   
    // myFirebaseRef.once("value", function(snapshot) {
     
    //     var comment_report = new Array();

    //     if(snapshot.val()!=null){
             
    //           $.each(snapshot.val(),function(i,item){
                   
    //               if(item.comment != null && item.comment != ''){
    //                   var voter = new Object();
    //                   voter.name = i;
    //                   voter.comment= item.comment;
    //                   comment_report.push(voter);
    //                   }
                
    //           });
    //           renderVotersCommentsReport(comment_report);
    //     }
    // });
        
}

function renderVoteReport(data){
 
 
    var $table = $('#report-table');
  $table.find("tr:gt(0)").remove();
  var sortable = [];
    for (var vehicle in data)
    sortable.push([vehicle, data[vehicle]])
    sortable.sort(function(a, b) {return b[1] - a[1]})

    //console.log(sortable);
   $.each(sortable,function(i, item) {
       
    var $tr = $('<tr>')
          .append($('<td>').text(item[0]))
          .append($('<td>').text(item[1]));
       $table.append($tr);
    });   
   
}

function renderVotersReport(data){
 
 
    var $table = $('#report-table');
  $table.find("tr:gt(0)").remove();
  
   $.each(data,function(i, item) {
       
    var $tr = $('<tr>')
          .append($('<td>').text(item.name))
          .append($('<td>').text(item.votes));
       $table.append($tr);
    });   
    
    var $tr = $('<tr>')
          .append($('<th>').text('Total Number of voters'))
          .append($('<th>').text(data.length));
       $table.append($tr);
       console.log(data.length);
}

function renderVotersCommentsReport(data){
 
 
    var $table = $('#report-table');
  $table.find("tr:gt(0)").remove();
  
   $.each(data,function(i, item) {
       
    var $tr = $('<tr>')
          .append($('<td>').text(item.name))
          .append($('<td>').text(item.comment));
       $table.append($tr);
    });   
   
}
