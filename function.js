function checkHoliday(d,hour,first){
	// console.log('checkHoliday fire');
	// var	hourToCountTo = hour;

	var d = new Date(d),
			d_year = d.getFullYear(),
			d_month = d.getMonth()+1,
			d_date = d.getDate(),
			d_hours = d.getHours();

	var staticHolidays = [//month-day
		"1-1",
		"7-4",
		"12-24",
		"12-25"
	];

	var holidays = [//month-day-year // 1-10-2016
		//"11-29-2016","11-30-2016","12-1-2016","12-2-2016","12-3-2016",//testing purposes
		//memorial day, labor day, thanksgiving
		"5-29-2017","9-4-2017","11-23-2017",
		"5-28-2018","9-3-2018","11-22-2018",
		"5-27-2019","9-2-2019","11-28-2019",
		"5-25-2020","9-7-2020","11-26-2020",
		"5-31-2021","9-6-2021","11-25-2021"
	];

	var shc = d_month+"-"+d_date,
			hc = d_month+"-"+d_date+"-"+d_year;

			// console.log(d_hours);
			// console.log(hour);

	if(staticHolidays.indexOf(shc) >= 0 || holidays.indexOf(hc) >= 0){
		// check if today is a holiday
		d = d.setDate(d.getDate() + 1);	
		return 24+checkHoliday(d,hour,0);

	}
	// console.log("Not a holiday: "+hc);
	return skipSunday(d,hour,first);
	

}


function skipSunday(d,hour,first){


	var d = new Date(d),
			d_hours = d.getHours(),
			d_day = d.getDay();

	if(first == 1){
		//date && time has not been edited
		if(d_day == 6 && d_hours >= hour || d_day == 0 && d_hours <= hour){
			console.log("adding 24 b/c sunday.1");
			return 24;
		}
	}else{
		//just check if today is sunday
		if(d_day == 0){
			console.log("adding 24 b/c sunday.2");
			return 24;
		}
	}
	return 0;
}


function countDownTimer(){

	// haven't tested with daylight savings time

	// get current date
	// set it to utc 0 
	// then convert it to CST
	// check if holiday, if so, add day then check if next day holiday
	// then check if day after that is sunday

	var	hourToCountTo = 16, // military time
			hourToCountToTimezone = -6, // -6 = CST
			ctz = hourToCountToTimezone*60;


	var l = new Date();

	var ndt = l.valueOf() + l.getTimezoneOffset() * 60000;
			ndt = ndt+(ctz*60000);

	var d = new Date(ndt),	
			d_hours = d.getHours(),
			d_minutes = d.getMinutes(),
			d_seconds = d.getSeconds(), 
			d_day = d.getDay();//0 = sunday, 1 = monday

	var z_hours = hourToCountTo - d_hours-1,
			z_minutes = 59-d_minutes,
			z_seconds = 59-d_seconds;

	if(z_hours < 0){
		//add 24, today has been passed already
		d = d.setDate(d.getDate() + 1);	
		z_hours = 24+z_hours+checkHoliday(d,hourToCountTo,0);
	}else{
		z_hours = z_hours+checkHoliday(d,hourToCountTo,1);
	}

	
	var foo = z_hours+" hrs "+z_minutes+" mins "+z_seconds+" secs";
	document.getElementById("shipping_time").innerHTML = foo;
}

setInterval(function(){ 
	countDownTimer();
}, 1000);
