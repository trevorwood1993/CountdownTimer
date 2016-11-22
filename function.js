function countDownTimer(){
	// haven't tested with daylight savings time

	var	hourToCountTo = 16, // military time
			hourToCountToTimezone = -6; // -6 = CST

	var d = new Date(),
			d_offset = d.getTimezoneOffset()/60,
			d_hours = d.getHours() + d_offset,
			d_minutes = d.getMinutes(),
			d_seconds = d.getSeconds(); 

	var c_hours = d_hours + hourToCountToTimezone,
			c_hours = hourToCountTo-c_hours-1,
			c_minutes = 59-d_minutes,
			c_seconds = 59-d_seconds;

	if(c_hours < 0){
		c_hours = c_hours+24; 
		console.log("adding 24");
	}

	var foo = c_hours+" hrs "+c_minutes+" mins "+c_seconds+" secs";
	document.getElementById("shipping_time").innerHTML = foo;
}

setInterval(function(){ 
	countDownTimer();
}, 1000);
