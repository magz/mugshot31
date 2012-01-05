Event.observe(window, 'load', setupImageTips);

function setupImageTips(){
		
	var images_loaded = false;
	var pause_loading = false;
	
	
	//what is the var for the image path
	var sImgVar = '?large=';
		
	function preloadTip( oLink , opts){
		
		if( !oLink.match('.loaded') && !oLink.match('.loading') ){
			
			//first get the large image path
			var oThumb = $(oLink).getElementsByTagName('img')[0];
			
			//add a class name of loading
			oLink.addClassName('loading');
			
			if( oThumb ){
			
				var sImgPath = $(oThumb).readAttribute('src');			
				sImgPath = sImgPath.substring( sImgPath.indexOf(sImgVar) + sImgVar.length , sImgPath.length);
				
				//this function waits til' rollover and then 
				//injects the image into the tip
				var oTip = $(oLink).getElementsByClassName('tip')[0];
				
				if( oTip ){
					
					var oImg = document.createElement('img');
					oImg.onload = oImg.onerror = function(){					
						oTip.innerHTML = '<img src="' + oImg.src + '" />';
						$(oLink).addClassName('loaded');
						if( opts.callback && typeof opts.callback == 'function'){
							//resume loading of other tips
							pause_loading = false;

							opts.callback();
							
							delete oImg;
							
						}
						
					}
					oImg.src = sImgPath;
				}
			}
		
		}else{
			//console.log("done loaded");
		}
	}	
	
	//get a collection of the link objects
	var aImageTips = $$('#sequence_list li a');
	
	//loop through each link, attaching the rollover function
	for(var i=0;i<aImageTips.length;++i){
		
		//on mouseover, load the image and show it
		Event.observe( 
			aImageTips[i], 
			'mouseover',
			function( e ){
				var oLink = Event.element(e);
				$(oLink).addClassName('hover');
				pause_loading = true;
				preloadTip( oLink , {});
				
			}
		);
		Event.observe( 
			aImageTips[i], 
			'mouseout',
			function( e ){
				var oLink = Event.element(e);
				$(oLink).removeClassName('hover');
			}
		);
		
	}//end for loop
	
	
	function preloadNext(){
		
		//only load if there are images to load and flag to pause isnt set
		if( images_loaded != true && pause_loading != true ){
		
			for(var i=0;i<aImageTips.length;++i){
				if( !$(aImageTips[i]).match('.loading')  && !$(aImageTips[i]).match('.loaded')) break;	
			}
			if( i<aImageTips.length ){
				preloadTip( 
					aImageTips[i] , 
					{ callback: preloadNext }
				);
			}else{
				images_loaded = true;
			}
		}
				
	}
	
	//kick off the recursive tip loading
	preloadNext();

}
