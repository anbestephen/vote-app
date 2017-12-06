
 

$('#wrapper').hide();
$('#vote-again').hide();

var myFirebaseRef = new Firebase("https://ebenezerdcyoung.firebaseio.com/voter");
var candidateRef = new Firebase("https://ebenezerdcyoung.firebaseio.com/candidate");

$('button.my-btn').attr('disabled','disabled');

// $('input').on('click',function(){
//   if($('input:checked').size() == 4){
//      $('button').removeAttr('disabled');
//      $('input').attr('disabled','disabled');
//   }else{
//       $('button').attr('disabled','disabled');
//      $('input').removeAttr('disabled');
//   }
// });


$('#myForm').on('click', 'input', function() {
     if($('input:checked').size() == 4){
     $('button.my-btn').removeAttr('disabled');
     $('input').attr('disabled','disabled');
   }else if($('input:checked').size() >=1){
      $('button.my-btn').removeAttr('disabled');
      $('input').removeAttr('disabled');
   }else{
      $('button.my-btn').attr('disabled','disabled');
     $('input').removeAttr('disabled');
   }
    
});

$('button.my-btn').on('click',function(){
   console.log($('input:checked').size());
  return false;
});


$('button.reset').on('click',function(){
   $('input:checked').removeAttr('checked');
  $('input').removeAttr('disabled');
  $('button.my-btn').attr('disabled','disabled');
  return false;
});


$('button.submit').on('click',function(){
   var user_name = $('#person').attr('value');
  
  var date = new Date();
  
  var formated_date = 
   date.getFullYear()
   +"-"+ date.getMonth()+1
   +"-"+date.getDate()
   +" "+date.getHours()
   +":"+date.getMinutes()
   +":"+date.getSeconds();
   
  var selected = '';
  var $post_data =new Object();
  $post_data.selection = new Array();
  $post_data.comment = $('#comment').val();
  $post_data.timeStamp = formated_date;
  $.each($('input:checked'),function(i,item){
      selected+=$(item).attr('value')+",";
      $post_data.selection.push($(item).attr('value'));
    });
  
   // alert('Thanks '+user_name+ '\n. You have selected '+ selected);
    //alert($('#comment').val());
  var data =new Object();
  //data[user_name] = user_name;
  data[user_name]=$post_data;
    
    myFirebaseRef.update(data);
    
    var $confirm_list =$("#vote-confirm");
    $confirm_list.empty();
     $.each($('input:checked'),function(i,item){
       $('<li>').text($(item).attr('value')).appendTo($confirm_list);
    });
    
    $('#myModal').modal('show');
  }
);



$('#add').keydown(function(event){ 
    var keyCode = (event.keyCode ? event.keyCode : event.which);   
    if (keyCode == 13) {
       // $('#startSearch').trigger('click');
        addCandidate();
    }
});


function addCandidate(){
    
    var $person=$('<div>');
    var $input = $('<input>')
    var $b=$('<b>');
    var $label=$('<label>');
    var candidate = $('#add').val();
    
    $person.attr('class','checkbox');
    $input.attr({type: 'checkbox', value: $('#add').val()});
    $b.text($('#add').val());
    $label.append($input);
    $label.append($b);
    $person.append($label);
    
//   <div class="checkbox">
//             <label>
//               <input type="checkbox" value="desta"><b>Danait Alem</b>
//             </label>
//           </div>
   var data = new Object();
  
   data[candidate] = "added by "+$('#person').attr('value');
    candidateRef.update(data);
    $('#add').val("");
    $('#marked').before($person);
    
}


function getVotingHistory(){
    myFirebaseRef.child($('#person').attr('value')).on("value", function(snapshot) {
        if(snapshot.val()==null){
          //  alert("no voting record");
            $('#vote-again').hide();
        }else{
        //alert(snapshot.val()); 
         var vote_data = snapshot.val();
         var $vote_list= $('#vote-list');
         $vote_list.empty();
         $.each(vote_data.selection,function(i, item) {
             $('<li>').text(item).appendTo($vote_list);
         })
        $('#vote-again').show();
        }
    });
}


function getAddedCandidates(){
    
     candidateRef.once("value", function(snapshot) {
        if(snapshot.val()!=null){
          $.each(snapshot.val(),function(i, item) {
              console.log(i);
            var $person=$('<div>');
            var $input = $('<input>')
            var $b=$('<b>');
            var $label=$('<label>');
            
            $person.attr('class','checkbox');
            $input.attr('type', 'checkbox');
            $input.attr('value', i);
            $b.text(i);
            $label.append($input);
            $label.append($b);
            $person.append($label);
            $('#marked').before($person);
          })
        }
    });
}
$('#facebook-home-btn').on('click',function() {
   top.location.href='https://www.facebook.com'; 
});

$('#myModal').modal({ show: false});

$( document ).ready(function() {
    getAddedCandidates();
});

