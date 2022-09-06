/// <reference path="jquery-3.6.0.js" />



$(function () {

    const toggleList = [];
    let newToggleList = [];
    $.ajax({
        url: "https://api.coingecko.com/api/v3/coins/list",
        error: err => alert("Error: " + err.message),
        success: coins => displayCoins(coins),
    })

    function displayCoins(coins) {
        $("#containerDiv").empty();
        for (let i = 0; i < 100; i++) {
            const coin = coins[i];
            const card = `
            <div class="col">
            <div class="card border-info mb-3" style="width: 18rem;text-align: center; overflow:auto;">
              <div class="card-body text-info">
              <label class="toggleSwitch" id="toggleSwitch${[i]}">
              <input type="checkbox">
              <span class="slider round"></span>
              </label>
                <h5 class="card-header">${coin.id}</h5>
                <p>-------------------------------------</p>
                <p class="card-text1">Name: ${coin.name}</p>
                <p class="card-text2">Symbol: ${coin.symbol}</p>
                <button data-toggle="toggle" data-target="toggle" class="btn-outline-info" id="toggle${[i]}">More Info</button>
                <footer class="footer"></footer>
              </div>
            </div>`;

            $("#containerDiv").append(card);
        }

        $("button").on("click", function () {
            const num = $(this).attr("id").replace("toggle", "");
            $.ajax({
                url: "https://api.coingecko.com/api/v3/coins/" + $(this).parent().parent().find(".card-header").text(),
                error: err => alert("Error: " + err.message),
                success: coinDetails => coinsDetails(coinDetails),
            });

            function coinsDetails(coinDetails) {
                let details = {
                    id: coinDetails.id,
                    image: coinDetails.image.small,
                    usd: coinDetails.market_data.current_price.usd,
                    eur: coinDetails.market_data.current_price.eur,
                    ils: coinDetails.market_data.current_price.ils,
                }
                showDetails(details);
            }

            function showDetails(details) {
                localStorage.setItem(details.id, JSON.stringify(details));
                readDetails(details);
            }

            function readDetails(details) {
                const coins = localStorage.getItem(details.id);
                const coin = JSON.parse(coins);
                const coinToggleCard = `
                
                        <p>USD: ${coin.usd}</p>
                        <p>EUR: ${coin.eur}</p>
                        <p>ILS: ${coin.ils}</p>
                        <p>-------------------------------------</p>
                        <p><img src="${coin.image}" alt="${coin.name}" style="width:100px;height:100px;"></p>
                        <button id=lessInfoBTN${num}>Less Info</button>
                   `;
                $(`#toggle${num}`).toggle("More Info");
                $(`#toggle${num}`).parent().parent().find(".footer").append(coinToggleCard);

                $(`#lessInfoBTN${num}`).on("click", function () {
                    $(`#toggle${num}`).toggle("More Info");
                    $(`#toggle${num}`).parent().parent().find(".footer").empty();
                });}
        });


        $(".toggleSwitch").on("click", function () {
            const num = $(this).attr("id").replace("toggleSwitch", "");
            const coinName = $(this).parent().parent().find(".card-header").text();
            const coinSymbol = $(this).parent().parent().find(".card-text2").text();
            const coin = [coinName, coinSymbol];
            const coinCard = `<div class="col">
            <div class="card border-info mb-3" style="width: 18rem;text-align: center; overflow:auto;">
              <div class="card-body text-info">
                <h5 class="card-header">${coin[0]}</h5>
                <p>-------------------------------------</p>
                <p class="card-text1">Name: ${coin[0]}</p>
                <p class="card-text2">Symbol: ${coin[1]}</p>
                </div>
                </div>
                </div>`;
               if ($(this).find("input").is(":checked")) {
                toggleList.push(coin);
                newToggleList.push(coin);
               $("#reports").append(coinCard);
                
            }
            else  {
                toggleList.splice(toggleList.indexOf(coin), 1);
                newToggleList.splice(newToggleList.indexOf(coin), 1);
                $(`#reports`).find(`div:contains(${coin[0]})`).remove();
            }
            

        });


    }





    $("#home").click(function(){
        $("#coinsSection").show();
        $("#reportsSection").hide();
        $("#aboutSection").hide();
    });

    $("#cReports").click(function(){
        $("#coinsSection").hide();
        $("#reportsSection").show();
        $("#aboutSection").hide();
    });

    $("#aboutLink").click(function(){
        $("#coinsSection").hide();
        $("#reportsSection").hide();
        $("#aboutSection").show();
    });



});




