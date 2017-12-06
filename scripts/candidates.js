
 
  
 var candidatesEndpoint = new Firebase("https://ebenezerdcyoung.firebaseio.com/candidates");
//  var endpoint = 'https://ebenezerdcyoung.firebaseio.com/voter.json';
 var endpoint = 'https://ebenezerdcyoung.firebaseio.com/candidates.json'; 
  
$(document).ajaxStart(function(){ $('.loading').show(); });
$(document).ajaxComplete(function(){ $('.loading').hide();	 });

function getCandidates(){
    
    $.ajax({
		url: endpoint,
		type: 'GET',
		success: function(data){
		 
		if(data!=null){
          renderCandidates(data);
         }
			},
		});
}

function getCandidatesAsTable(){
    
    $.ajax({
		url: endpoint,
		type: 'GET',
		success: function(data){
		 
		if(data!=null){
          renderCandidatesAsTable(data);
         }
			},
		});
}

function renderCandidates(data){

  var $candidates = $('#candidates');
 
   $.each(data,function(i, item) {
 
    if(item != null){

       var $candidate = $('<div>').attr('class','checkbox')
          .append(
             $('<label>')
                  .append($('<input>').attr('type','checkbox').val(i))
                  .append($('<img>').attr('class','profile-img').attr('src',item.photo))
                  .append($('<b>').text(i))
              
              );
        $candidates.append($candidate);
 
      }
    });   
   
}


function renderCandidatesAsTable(data){

  var $candidates = $('#candidates');
 
  var $table = $('<table>').addClass('table table-striped');
   
   $.each(data,function(i, item) {
 
    if(item != null){
       var $column = $('<tr>')
              .append($('<td>').attr({'data-name' : i , 'class' : 'candidate-name'}).text(i))
              .append($('<td>').append($('<img>').attr('class','profile-img').attr('src',item.photo)))
              .append($('<td>').append($('<button>').addClass('btn btn-danger delete').text('Delete'))
        );
        $table.append($column);
      }
    });   
 $candidates.append($table);
}

$('button.add').on('click',function(){
   
    $('#myModal-add').modal('show');
  }
);


$('button.submit').on('click',function(){
   var name = $('#name').val();
   var photo = $('#photo').val();
  
  var $post_data =new Object();
  
  $post_data.photo = photo;

  var data = new Object();
  data[name]=$post_data
    console.log(name);
    console.log(photo);
    candidatesEndpoint.update(data);
    
});


$(document).on('click','button.delete',function(){

  
   var name =  $(this).parent().siblings('.candidate-name').attr('data-name');
    var status = confirm("Are you sure you want to delete : "+  name);
    if(status){
      candidatesEndpoint.child(name).remove();
      window.location= "https://ebenezerdc-vote-anbestephen.c9users.io/report/candidates.html"
    }
});


