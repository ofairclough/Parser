'use strict';

(function($) {
    $(document).ready(function () {



        $('#parse').click(function () {

            $('#roeReview').append('The following Records of Employment are documented in the Record of Employment Management System:')
            $('#initial').find('tr').each(function (i, el) {

                var row = $(this).find('td')
                var employer = row.eq(1).text();
                var fdw = moment(row.eq(2).text(), 'DD-MM-YYYY').format('MMMM DD YYYY')
                var ldp = moment(row.eq(3).text(),'DD-MM-YYYY').format('MMMM DD YYYY');
                var sn=row.eq(0).text();
                
                var input= moment(row.eq(5).text(),'DD-MM-YYYY');
var ROErange= moment.range(fdw,ldp)
                if (moment(ldp) > moment($('#BPC').val().format('MMMM D, YYYY'))) {
                         
                swal('Scenario X: the client has worked since BPC. Review the Claimant Reports in FTS against the ROE to determine if there are undeclared earnings.')
                     $(this).append('Check ROE '+sn+ "" ).css('background-color','red')      
                }
                
                
                
    
                
                
                var rfsdata = row.eq(6).text();
                if (rfsdata === "D") {
                    var rfs = "illness"

                }
                if (rfsdata === "E") {
                    var rfs = "Voluntary Separation/Quit"

                }

                
                 if (rfsdata === "A") {
                    var rfs = "Shortage of Work"

                }
                
                  if (rfsdata === "F") {
                    var rfs = "Maternity"

                }
                
                   if (rfsdata === "G") {
                    var rfs = "Retirement (mandatory/approved under Work Force Reduction program)"

                }
                
                        if (rfsdata === "M") {
                    var rfs = "Dismissal"

                }
                
                           if (rfsdata === "N") {
                    var rfs = "Leave of absence"

                }
                
                          if (rfsdata === "P") {
                    var rfs = "Parental"

                }
                
                           if (rfsdata === "J") {
                    var rfs = "Apprentice training"

                }
                
                           if (rfsdata === "K") {
                    var rfs = "Other"

                }
                            if (rfsdata === "Z") {
                    var rfs = "Compassionate care/Parents of Critically Ill Children"

                }
                
                
                            if (rfsdata === "K") {
                    var rfs = "Other"

                }
                
                $('#roeReview').append(
                ' A Record of Employment from ' + employer + ' the first day worked is ' + fdw + '. The last day worked is ' + ldp +
                '. The Reason for Separation is ' + rfs + '.')
  var $claimRanges=[];
               $('#previous').find('.prev').each(function(i,el){
                var bpc=    $(this).find(":input:first").val()
                    var   lrw =$(this).find('.pLRW').val();
                    console.log(lrw+'LRW')
                    console.log(bpc+'BPC')
                    var qp=$(this).find('.pQP').val()
                    var qpm= moment(qp).format('MM D, YYYY')
                    var dates= bpc +" to "+ lrw
                    var currentBPC= moment($('#BPC').val().format('MMMM D, YYYY'))
                    var bpcm = moment(bpc,'MM D, YYYY' )
                    var lrwm = moment(lrw, 'MM D, YYYY')
                    var $claimRanges= moment.range(bpcm,lrwm)
                    console.log(qp+"previous QP started")
                    var $previousQPs=moment.range(qpm,bpc)
                    var currentQPstart= moment(currentBPC).subtract(1,'year');
                    console.log(currentQPstart)
                    var currentQpr=moment.range(currentQPstart,currentBPC)
                    console.log($previousQPs)
                   /* if ( moment(ldp,'DD-MM-YYY').isBetween(moment(bpc).format('MM D, YYYY'),moment(lrw).format('MM D, YYYY') ))
                        
                         $('#previous').find('.prev').each(function(i,el){
                var bpc=    $(this).find(":input:first").val()
                    var   lrw =$(this).find('.pLRW').val();
                    console.log(lrw+'LRW')
                    console.log(bpc+'BPC')
                    var qp=$(this).find('.pQP').val()
    console.log(qp+'QP')
                     
                   });
                        {
                            swal('whowhowoh')
                            
                            
                        }
                   */
                   
                    //*********check if ROE overlaps previous Benefit Period
                   if (ROErange.intersect($claimRanges)){
                       $(this).parent().addClass('has-error')
                           $(this).append("Scenario 3: Review ROE Serial Number " +sn +" RFS is "+ rfs + " Employer is " +employer +" it intersects this Benefit Period."+"<br>" )
                       swal(' Scenario 3: ROE Covers Benefit Period of a Previous BP!!')
                       
                   }
                   
                   //***********check for contentious RFS after establishment of current BPC
                    
                    
                    console.log(rfsdata)
                    if (input.isAfter(currentBPC) && rfs != "Shortage of Work"  ){
                   swal(' Scenario 1 contentious RFS during current claim (roe was input after BPC) after current BPC was established')
                                              $(this).append("Scenario 1: Review ROE Serial Number " +sn +" RFS is "+ rfs + " it is was input after the current Benefit Period was established."+"<br>" )

                    console.log($($claimRanges))
                    //var jrange=JSON.stringify($range)
                   // console.log(jrange)
                        }
                       
                       //***********check for ROE covers QP of previous claim & and was input after claim established and ROE NOT shortage of work
                    
                console.log(rfsdata)
                   console.log(input)
                   
                   console.log(ROErange)
                    if (moment(input).isAfter(bpc) && rfs != "Shortage of Work" && ROErange.intersect($previousQPs)  ){
                   swal('Scenario 4 contentious RFS during the QP or BP of this Claim (ROE submitted after BPC')
                                              $(this).append("Scenario 4 Review ROE Serial Number " +sn +" RFS is "+ rfs + " it is was input after this previous Benefit Period was established, and covers the QP (make sure it was adjudicated)"+"<br>" )

                    console.log($($claimRanges))
                    //var jrange=JSON.stringify($range)
                   // console.log(jrange)
                        }
                   
                         if (moment(input).isAfter(currentBPC) && rfs != "Shortage of Work" && ROErange.intersect(currentQpr)&& ldp.isBefore(currentBP)) {
                   swal('Scenario 2  (ROE submitted after BPC RFS other than shortage of work')
                                              $(this).append("Scenario 2 Review ROE Serial Number " +sn +" RFS is "+ rfs + " it is was input after the CURRENT Benefit Period was established, and covers the QP (make sure it was adjudicated)"+"<br>" )

                    console.log($($claimRanges))
                    //var jrange=JSON.stringify($range)
                   // console.log(jrange)
                        }
                   
                   /// $($range).each(function(i, val ){
                        
                        
//});  var   lrw =$(this).find('.pLRW').val();
                   
                  
                        
                        
                    })
            }
            )
            
            
      
                    
                    
                    
            
            
            

        });
      $("#example-vertical").steps({
          headerTag: "h3",
          bodyTag: "section",
          transitionEffect: "slideLeft",
          stepsOrientation: "vertical",
          enableAllSteps:"true"
      });

var url= window.location.href.split('/')
     if( $.inArray('western', url) > -1){

$(".navbar-brand").html('Western Canada and Territories ISB') 

$(".esp,.local").css('display','none')
 }


//refresh inputs onload
    $(':input')
 .not(':button,:radio,:checkbox, submit, :reset,#usercode')
 .val('')
 .removeAttr('checked')
 .removeAttr('selected');

 $(':radio').removeAttr('checked')
 $(':checkbox').removeAttr('checked')

 $('.effort').tooltip();


//editable div
 $('.editable').each(function(){
        this.contentEditable = true;


    });



$('#timestart').click(function(){
var time= moment().format('MMMM Do YYYY, h:mm a');

//authentication
   var authentication = [];
            $.each($("input[name='auth']:checked"), function(){            
                authentication.push($(this).val());
                  });
    var selected;
    selected = authentication.join(' and ') ;

    $('#initial').append('The Integrity officer contacted the client on ' +
        time + '. The client was authenticated using '+ selected+'.')

});
 

$("input[name='readback']").change(function(){

   
    $('#closing').text($(this).val());

});

$("input[name='outcome']").change(function(){

   
    $('#closing').append(' The client was advised '+$(this).val());

});
    

$("input[name='statement']").change(function(){

   
    $('#initial').append(' <p>The officer advised the client that they should be aware that any undue '+ 
    'restrictions pertaining to them seeking or accepting work could result in the suspension'+
    ' of their benefits and that they should also be aware that they are to actively seek employment'+
     '(each day) and keep a written record of their efforts, including the date of each contact.'+
     'They were advised that if they required any information with respect to their claim, job search'+
      ' techniques or available courses, they could visit their local Service Canada Centre. ' +$(this).val()+'</p>');

});

$(".ques").click(function () {

    

    $('#action').val($(this).attr("data-q"))
})

//internal review

$('#rass').click(function(){
    $('#rass').after('<div class="editable" id="bunfiy"> </div>');
    $('.editable').each(function(){
        this.contentEditable = true;
    });

    $('#bunfiy').append('<p>The Benefit Period Commencement is '+ $('#BPC').val()+'. The client is entitled to '+
    $('#entit').val()+ ' weeks of benefits and has been paid '+ $('#wpaid').val()+' weeks of Regular Benefits.'+
    'The claimant is '+ $('#cat').val()+ '. Their Benefit Rate is '+$('#BR').val()+'. Their normal rate of pay, prior to their claim is '+
    $('#wage').val() + '. Their normal occupation is ' + $('#job').val() + '.' + $('#results').text()+$('#additional').val());

});
//dynamic
$('#dynamo').click(function() {
	

	$('#dynamic').append('<p>The Officer asked the client '+$('#dynamicQ').val()+
		'? The client replied '+$('#dynamicA').val());
	$('#dynamicQ,#dynamicA').val('');
    $( "#dynamicQ" ).focus();
});



$("input[name='selectivereason']").change(function() {
       $('#initial').html('The client was selected to undergo a Selective Interview due to '+ $(this).val());


    
    if ( ($(this).val())== 'a failure to attend previous Claimant Information sessions held on '){ 
        $('#missedsessions').css('display','block');

       

    }
    else if 

   ( ($(this).val())== 'a language barrier.'){


         $('#missedsessions').css('display','none');



}
    else if
       ( ($(this).val())== '*OTHER ENTER REASON*'){


         $('#missedsessions').css('display','none');


}
var reason = $(this).val();

});
$('#generatemissed').click (function(){


    $('#initial').append(($("#missed1").val())+', '+ ($("#missed2").val())+ ', and '+($("#missed3").val())+
        ' at the '+($("#location").val())+'.' );
});
$('input[name=missed],#BPC').datepicker({
                dateFormat: 'MM d, yy',
                stepMonths: 3,
                defaultDate: "-2MM",
                numberOfMonths: 3,
              showOtherMonths: true,
                selectOtherMonths: true,
               
                       changeMonth:true,
                       changeYear:true
                //

            });
$("#cat").change(function () {

    var choice= $(this).prop('selectedIndex')
    $("#catcalc").prop('selectedIndex', choice);
});

$("#effortDate").change(function () {
    $("#effortType").focus();
});


$('#effortDate').datepicker({
    dateFormat: 'MM d, yy',
    stepMonths: 3,
    showOn: "button",
    buttonText:'<span class="glyphicon glyphicon-calendar"></span>',
    defaultDate: "-2MM",
    numberOfMonths: 3,
    showOtherMonths: true,
   

});


$('.ui-datepicker-trigger').wrap('<span class="input-group-addon pad"></span>');

$('.ui-datepicker-trigger').prop('tabIndex', -1);


$('#effortSubmit').click(function () {
    $('.effort').val('');

    $('#effortDate').focus();

});

$('#consolidate').click(function(){

   var combined= $('<h2>Consolidated Notes</h2>'+ ( ($('#bunfiy').html()) + $('#initial').html())+ ($('#dynamic').html())+ ($('#closing').html()));
var text = $(combined).text();
text=text.replace(/ROE/g," Record of Employment").replace(/RFS/g,' Reason for Separation').replace(/NWS/g,' National Workload System');


$('#output').append(text)



});


$('#wpaid').change(function(){

$('#wpcalc').val($('#wpaid').val())



});




/*$('#cat').change(function(){

$('#catcalc').val($('#wpaid').val())



});*/


 $('#calcu').click(function (){



var category = $('#catcalc').val() 

var weekspaid =$('#wpcalc').val()

var base = $('#dollaz').val()
console.log(category)
if ( category === "an Occasional Claimant"){

            if ( weekspaid <= 4) {
            var suitablerate = Math.round(base *.9)
            var suitabletype="will be able to limit their search for a job to their usual occupation with wages at "

            }

           if (weekspaid >4 && weekspaid <15 ) {
            var suitablerate = Math.round(base *.8)
            var suitabletype='will be required to search for jobs similar to the job they normally perform with wages at '
          }
          if (weekspaid >15 ){


           
            var suitablerate = Math.round(base *.7)
            var suitabletype='will be required to further expand their job search to include any work they are qualified' 
            +' to perform (with on-the-job training if required) at a rate of '
}
};

 if  ( category ===  "a Long Tenured Worker") {

            if ( weekspaid <= 16) {
            var suitablerate = Math.round(base *.9)
          
            var suitabletype="will be able to limit their search for a job to their usual occupation with wages at "
            }

          if ( weekspaid >17) {

           
            var suitablerate = Math.round(base *.8)

          var suitabletype="will be required to search for jobs similar to the job they normally perform with wages at "
}

}


 if  ( category ===  "a Frequent Claimant") {

            if ( weekspaid <= 4) {
            var suitablerate = Math.round(base *.8)
            var suitabletype='will be required to search for jobs similar to the job they normally perform with wages at '


            }

            if ( weekspaid >= 5) {


            var suitablerate = Math.round(base *.7)
            var suitabletype= 'will be required to further expand their job search to include any work they are qualified to perform (with on-the-job training if required at a rate of '
console.log ()

}
}







$('#results').html('The client is a '+ $('#catcalc').val()+ ' .They ' 
  +suitabletype +' $'+  suitablerate + ' '+ $('#rate').val()
  +', but no lower than the minimum wage rate in the province or territory where employment is offered. ');

$("#outusercode").prepend(('The client is a '+ $('#catcalc').val()+ ' .They ' 
  +suitabletype +' $'+  suitablerate + ' '+ $('#rate').val()
  +', but no lower than the minimum wage rate in the province or territory where employment is offered. '));

$("#iistext").append(('The client is a '+ $('#catcalc').val()+ ' .They ' 
  +suitabletype +' $'+  suitablerate + ' '+ $('#rate').val()
  +', but no lower than the minimum wage rate in the province or territory where employment is offered. '));

});



      //locations
 $(function() {

     var Months =[

'January',
'February',
'March',
'April',
'May',
'Jun,',
'July',
'August',
'September',
'October',
'November',
'December',

     ];

     $('#effortDate').autocomplete({

         source: Months
     });

 });

 $(function () {

     var Efforts = [

'assessed employment opportunities',
'prepared a resume or cover letter',
'registered for job search tools or with electronic job banks or employment agencies',
'attending job search workshops or job fairs',
'networked',
'contacted prospective employers',
'submitted a job application',
'attendied an interviews',
'underwent evaluations of competencies'

     ];

     $('#effortType').autocomplete({

         source: Efforts
     });

 });


$('#addBPC').click(function(){
                   var box= "<div class='prev col-m-4'></div>"
                   
                   $('#previous').append($(box).append('<div class="form-group"><label class="col-md-4 control-label">Previous BPC</label><input type="text" class="pBPC form-control"/><label>Last renewable Week</label><input type="text" class="pLRW form-control"/></div><label>Qualifying Period Started</label> <input class="pQP form-control"/> ' ))
                   
                   $('.pBPC').datepicker({
                dateFormat: 'MM d, yy',
                stepMonths: 3,
                defaultDate: "-10MM",
                numberOfMonths: 3,
                showOtherMonths: true,
                selectOtherMonths: true,
               
                       changeMonth:true,
                       changeYear:true
                //

            });
    
                     $('.pLRW').datepicker({
                dateFormat: 'MM d, yy',
                stepMonths: 3,
                defaultDate: "-5MM",
                numberOfMonths: 3,
                showOtherMonths: true,
                selectOtherMonths: true,
                    selectYear:true,
                            changeMonth:true,
                       changeYear:true
                         
                //

            });
    
                 $('.pQP').datepicker({
                dateFormat: 'MM d, yy',
                stepMonths: 3,
                defaultDate: "-5MM",
                numberOfMonths: 3,
                showOtherMonths: true,
                selectOtherMonths: true,
                    selectYear:true,
                        changeMonth:true,
                       changeYear:true
                         
                         
                //

            });
    
    
        });

//locations
$(function() {

var Locations =[
"Barrie Service Canada Centre (3582)",
"Belleville Service Canada Centre (3607)",
"Bracebridge Service Canada Centre (3597)",
"Brampton Service Canada Centre (3841)",
"Brantford Service Canada Centre (3551)",
"Brockville Service Canada Centre (3102)",
"Burlington Service Canada Centre (3555)",
"Cambridge Service Canada Centre (3451)",
"Chatham-Kent Service Canada Centre (3556)",
"Collingwood Service Canada Centre (3590)",
"Guelph Service Canada Centre (3559)",
"Hamilton Main Service Canada Centre (3343)",
"Hawkesbury Service Canada Centre (3109)",
"Kingston Service Canada Centre (3792)",
"Kitchener Service Canada Centre (3580)",
"Leamington Service Canada Centre (3600)",
"Lindsay Service Canada Centre (3209)",
"London Service Canada Centre (3620)",
"Malton Service Canada Centre (3831)",
"Midland Service Canada Centre (3596)",
"Mississauga West Service Canada Centre (3830)",
"Oakville Service Canada Centre (3502)",
"Orillia Service Canada Centre (3595)",
"Oshawa Service Canada Centre (3599)",
"Ottawa East Service Canada Centre (3545)",
"Ottawa West Service Canada Centre (3745)",
"Perth Service Canada Centre (3131)",
"Peterboroug Service Canada Centre (3563)",
"Richmond Hill  Service Canada Centre (3624)",
"Sarnia Service Canada Centre (3571)",
"Toronto Scarborough Service Canada Centre (3583)",
"Simcoe Service Canada Centre (3361)",
"St. Catharines Service Canada Centre (3573)",
"St. Thomas Service Canada Centre (3359)",
"Sudbury Service Canada Centre (3612)",
"Thunder Bay Service Canada Centre (3616)",
"Tillsonburg Service Canada Centre (3365)",
"Toronto Centre Service Canada Centre (3505)",
"Toronto-College Street Service Canada Centre (3591)",
"Toronto West Humber Service Canada Centre (3588)",
"Walkerton Service Canada Centre (3782)",
"Wallaceburg Service Canada Centre (3414)",
"Welland Service Canada Centre (3565)",
"Windsor Service Canada Centre (3577)",
"Woodstock Service Canada Centre(3574)"
];
 
 if( $.inArray('western', url) > -1){




var Locations= [
"Morden Government of Canada Building (4113)",  
"Portage la Prairie Government of Canada Building (4114)",  
"Winnipeg North-East Rivergrove Shopping Mall Service Canada Centre (4117)", 
"Winnipeg St-Vital Service Canada Centre (4118)", 
"Winnipeg South-West Service Canada Centre (4122)", 
"Winnipeg Centre Portage Place Mall Service Canada Centre (4123)", 
"Dauphin Dauphin Service Canada Centre (4137)", 
"Swan River Swan River Service Canada Centre (4138)", 
"Notre-Dame-de-Lourdes  Service Canada Centre (4152)",  
"Saint-Pierre-Jolys Service Canada Centre (4153)",  
"Brandon Government of Canada Building (4162)", 
"The Pas Uptown Mall Service Canada Centre (4209)",  
"Steinbach Steinbach Place Service Canada Centre (4233)",  
"Selkirk Service Canada Centre (4234)", 
"Flin Flon Government of Canada Building (4235)", 
"Thompson Service Canada Centre (4236)",  
"Churchill Service Canada Centre (4238)", 
"North Battleford Service Canada Centre (4304)",  
"Prince Albert South Hill Mall Service Canada Centre (4306)",  
"Moose Jaw Victoria Place Service Canada Centre (4316)", 
"Melfort McKendry Plaza Service Canada Centre (4334)", 
"Swift Current  Chinook Building  (4341)",  
"Weyburn City Centre Mall (4344)",  
"La Ronge Service Canada Centre (4355)",  
"Buffalo Narrows Service Canada Centre (4358)", 
"Yorkton Imperial Plaza (4388)",  
"Estevan Service Canada Centre (4401)", 
"Saskatoon Federal Building (4422)",  
"Regina Alvin Hamilton Building (4424)",  
"Canmore Canmore Gateway Shops - Building C (4720)",  
"Slave Lake Sawridge Plaza Service Canada Centre (4750)",  
"Edmonton Hermitage SCC Northgate Centre now located at Hermitage Square (4752)", 
"Edmonton Westlink  Service Canada Centre (4866)",  
"Edmonton Canada Place 148 Millbourne Market Mall (4754)",  
"Calgary Centre One Executive Place (4802)",  
"Calgary North One Executive Place (4803)", 
"Calgary South One Executive Place (4804)", 
"Medicine Hat North side Centre Service Canada Centre (4807)", 
"Red Deer Service Canada Centre Service Canada Centre (4808)", 
"Calgary East One Executive Place location (4810)", 
"Iqaluit Iqaluit House, Building 622 location (4814)",  
"Iqaluit Iqaluit Service Canada Centre (4936)", 
"Cambridge Bay  Service Canada Centre (4815)",  
"Edson  Service Canada Centre (4818)",  
"Grande Prairie Service Canada Centre (4819)",  
"Edmonton Millbourne 148 Millbourne Market Mall Service Canada Centre (4820)", 
"Camrose Federal Building (4821)",  
"St. Paul Service Canada Centre (4824)",  
"Fort McMurray Service Canada Centre (4825)", 
"Lethbridge Crowsnest Trail Plaza, Unit 101 Service Canada Centre (4860)", 
"Lloydminster Service Canada Centre (4862)",  
"Brooks Cassils Plaza (4875)",  
"Yellowknife Greenstone Building (4901)", 
"Fort Simpson Federal Building (4904)", 
"Fort Smith Federal Building (4905)", 
"Hay River  Service Canada Centre (4906)",  
"Inuvik Service Canada Centre (4907)",  
"Rankin Inlet Service Canada Centre (4929)",  
"Ridge Meadows  Service Canada Centre (5150)",  
"Salmon Arm Service Canada Centre (5351)",  
"Quesnel  Service Canada Centre (5424)",  
"Smithers Service Canada Centre (5426)",  
"Vanderhoof Service Canada Centre (5439)",  
"Whitehorse Elijah Smith Building (5811)",  
"Vancouver East (Kingsway) Service Canada Centre (5821)", 
"Vancouver - Sinclair Centre Service Canada Centre (5822)", 
"Squamish Service Canada Centre (5825)",  
"Surrey North Service Canada Centre (5851)",  
"Surrey South Service Canada Centre (5852)",  
"Victoria Centre Service Canada Centre (5863)", 
"Burnaby Service Canada Centre (5907)", 
"Vancouver (West Broadway)  Service Canada Centre (5910)",  
"North Shore Service Canada Centre (5911)", 
"Richmond Service Canada Centre (5912)",  
"Powell River Service Canada Centre (5913)",  
"Cowichan (Duncan) Service Canada Centre (5918)", 
"Port Alberni Service Canada Centre (5919)",  
"Campbell River Service Canada Centre (5920)",  
"Comox Valley  Service Canada Centre (5921)", 
"Victoria West Shore Service Canada Centre (5927)", 
"New Westminster Service Canada Centre (5940)", 
"Chilliwack Service Canada Centre (5942)",  
"Abbotsford Service Canada Centre (5944)",  
"Coquitlam Service Canada Centre (5947)", 
"Langley Service Canada Centre (5952)", 
"Terrace Service Canada Centre (5962)", 
"Nelson Chahko Mika Mall (5972)", 
"Trail  Service Canada Centre (5973)",  
"Penticton  Service Canada Centre (5978)",  
"Vernon Service Canada Centre (5979)",  
"Kamloops Service Canada Centre (5986)",  
"Kelowna Service Canada Centre (5987)", 
"Nanaimo Service Canada Centre (5988)", 
"Prince Rupert Ocean Centre (5991)",  
"Williams Lake Service Canada Centre (5992)", 
"Prince George Service Canada Centre (5994)", 
"Dawson Creek Service Canada Centre (5996)",  
"Cranbrook Service Canada Centre (5977)"]


}











$('#location').autocomplete({

 source: Locations
});

});



/*
$('#prependtext').autocomplete({
	source: availableTags
});

	
//cookie autocomplete
(function ($)
{
    $.widget("fnLogic.CookieComplete",$.ui.autocomplete, {
        // These options will be used as defaults
        options: {
            CookieName: null,
            MaxRecords: 10,
            select: null,
            source: function (request, response)
            {
                var $this = this;
                if ($.cookie($this.options.CookieName) != null)
                {
                    var arr = $.cookie($this.options.CookieName).split('||');
                    response($.map(arr, function (item)
                    {
                        return {
                            label: item,
                            value: item
                        }
                    }));
                }
            }
        },
        _create: function ()
        {
            var $this = this;
            this.element.autocomplete(this.options)
            .bind('keyup', function (e)
            {
                if (e.keyCode == 13)
                {
                    $this.AddRecord($this.element.val());
                }
            })
            .bind('click', function ()
            {
                if ($(this).val().length == 0)
                {
                    $this.element.autocomplete('search', '');
                }
            });
        },
        destroy: function ()
        {
            // In jQuery UI 1.8, they must invoke the destroy method from the base widget
            $.Widget.prototype.destroy.call(this);
            // In jQuery UI 1.9 and above, they would define _destroy instead of destroy and not call the base method
        },
        AddRecord: function (record)
        {
            var $this = this;
            if ($.cookie($this.options.CookieName) === null)
            {
                $.cookie($this.options.CookieName, record, { expires: 7 });
                $.cookie($this.options.CookieName + "nextpos", 1, { expires: 7 });
            }
            else
            {
                var arr = $.cookie($this.options.CookieName).split("||");
                var nextpos = parseInt($.cookie($this.options.CookieName + "nextpos"));
                if ($.inArray(record, arr) == -1)
                {
                    if (arr.length < $this.options.MaxRecords)
                    {
                        arr.push(record);
                    }
                    else
                    {
                        arr[nextpos] = record;
                    }
                    nextpos = (nextpos + 1) % $this.options.MaxRecords;
                    $.cookie($this.options.CookieName, arr.join('||'), { expires: 7 });
                    $.cookie($this.options.CookieName + "nextpos", nextpos, { expires: 7 });
                }

            }
        }
    });


}(jQuery));
*/
    // Add theyr jQuery code here
  });
})(jQuery);
