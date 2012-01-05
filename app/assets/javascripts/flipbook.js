Event.observe(window, 'load', testSelect);
Event.observe(window, 'load', updatePreview);
	
function testSelect(){                  
		//get a collection of the colors objects
			var colors = $$('.color_list li');
			//loop through each link, attaching the click function
			for(var i=0;i<colors.length;++i){
				
				//on click, add the selected class to the list item and update the color choice
				Event.observe( 
					colors[i], 
					'click',
					function( e ){
						colors.each(
							function(li){
								li.removeClassName('selected');
							}
						);
						$(this).toggleClassName('selected');
						$(this).getElementsByTagName('input')[0].checked = true;
						$('color_choice').innerHTML = $(this).getElementsByTagName('label')[0].innerHTML;
						//e.preventDefault();
						updatePreview();
					}
				);
				
			}//end for loop
}         
		
function updatePreview(){
	var t1 = $("text1").getValue();
	var t2 = $("text2").getValue();
	var color = $('dms_blue').getValue();//default is DMS Blue
	
	//get the checked radio for the color
	$$("input.cover_id").each(
		function(o){
			if(o.checked){
				color = o.getValue();
			}
		}
	);
	
	//create the url for the swf
	var src = "http://covers.flipclips.com/Dailymugshot/" + color + "/thumb_l.swf?";            
	src += "text1=" + t1 + "&text2=" + t2;
	
	//test to see if the title has been filled out, if so, show the next step button
	if( t1.split(" ").join('') != '' ){
		$('next_button').style.display = 'inline';
	}else{
		$('next_button').style.display = 'none';
	}
	$('preview_container').innerHTML = '';
		
	//build the flash object and re-embed it
	var previewFo = new SWFObject(src, "flash_preview","400", "226", "6","#FFFFFF");
	previewFo.addParam("wmode", "transparent");                             
	previewFo.write("preview_container");

}
