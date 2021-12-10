let app = document.querySelector('#app');
async function Weather(city) {
	let response = await fetch(
		`https://developers.parsijoo.ir/web-service/v1/weather/?type=search&city=${city}`,
		{
			headers: {
				'api-key': '3a720b7cd8e34f38b83df31659dcff83',
			},
		}
	);
	let data = await response.json();
	// console.log(data.result.hava.dayList[0]);
	let today = data.result.hava.dayList[0];
	let nowTemp = data.result.hava.summary.temp;

	switch (today.condition) {
		case 'آرام':
			today.color = 't1';
			break;
		case 'نسیم':
			today.color = 't2';
			break;
		case 'باد ملایم':
			today.color = 't3';
			break;
		case 'باد شدید':
			today.color = 't4';
			break;
		case 'طوفانی':
			today.color = 't5';
			break;

		default:
			today.color = 't2';
			break;
	}

	app.innerHTML = `
    <div class="wrapper ${today.color}" >
    
         <span>
        <i class="wi ${today.symbol}"></i>
                    </span>
                    <article>
                        <h2>شهر</h2>
                        <h3>${city}</h3>
                        <p>${today.condition}</p>
                    </article>
                    <div>
                        <span>${today.max}</span>
                        <span>${nowTemp}</span>
                        <span>${today.min}</span>
                    </div>
    </div>
    `;
}

let form = document.querySelector('form');
form.addEventListener('submit', (e) => {
	e.preventDefault();
	let inp = e.target.city.value;
	// console.log(e.target.city.value)
	Weather(inp);
	if (inp !== null) {
		inp = null;
	}
});
Weather('شیراز');
