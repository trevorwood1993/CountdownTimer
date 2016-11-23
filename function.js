function checkHoliday(a){
	// console.log('checkHoliday fire');

	var d = new Date(a),
			d_year = d.getFullYear(),
			d_month = d.getMonth()+1,
			d_date = d.getDate();

	var staticHolidays = [//month-day-year
		"1-1",
		"7-4",
		"12-24",
		"12-25"
	];

	var holidays = [//month-day-year // 1-10-2016
		//memorial day, labor day, thanksgiving
		"11-24-2016",
		"5-29-2017","9-4-2017","11-23-2017",
		"5-28-2018","9-3-2018","11-22-2018",
		"5-27-2019","9-2-2019","11-28-2019",
		"5-25-2020","9-7-2020","11-26-2020",
		"5-31-2021","9-6-2021","11-25-2021"
	];

	var shc = d_month+"-"+d_date,
			hc = d_month+"-"+d_date+"-"+d_year;
	if(staticHolidays.indexOf(shc) >= 0 || holidays.indexOf(hc) >= 0){
		d = d.setDate(d.getDate() + 1);
		// console.log("checkHoliday - adding 24");
		return 24+checkHoliday(d);
	}
	return checkSunday(d);
	

}


function checkSunday(a){
	// console.log('checkSunday fire');
	var	hourToCountTo = 16;

	var d = new Date(a),
			d_hours = d.getHours(),
			d_day = d.getDay();

	if(d_day == 6 && d_hours >= hourToCountTo || d_day == 0 && d_hours <= hourToCountTo){
		// console.log("checkSunday - adding 24");
		return 24;
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

	var c_hours = hourToCountTo - d_hours-1,
			c_minutes = 59-d_minutes,
			c_seconds = 59-d_seconds;

	if(c_hours < 0){
		c_hours = c_hours+24; 
	}

	c_hours = c_hours+checkHoliday(d);
	
	var foo = c_hours+" hrs "+c_minutes+" mins "+c_seconds+" secs";
	document.getElementById("shipping_time").innerHTML = foo;
}

setInterval(function(){ 
	countDownTimer();
}, 1000);
