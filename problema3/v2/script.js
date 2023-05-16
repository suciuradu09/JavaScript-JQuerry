$(document).ready(function() {
    const table = $("#wrapper");
    var remaining = table.find("td").length / 2;
    var firstCard = null, secondCard = null;
    var disableClick = false;
    const cells = table.find("td");
        
    var imgNames = [
        "ambulance",
        "bicycle",
        "car",
        "plane",
        "police",
        "sailing-boat",
        "scooter",
        "truck"
    ];

    function handleClick(e) {
        const clickedCard = $(e.target);

        if (!disableClick && !clickedCard.is(firstCard)) {
            showImage(clickedCard);
            clickedCard.removeClass("card");
        
            // first card selected
            if (!firstCard) {
                firstCard = clickedCard;
            }
            else {
                //verify if the cards match
                if (!secondCard) {
                    secondCard = clickedCard;
                    disableClick = true;
                    matchCard(firstCard, secondCard);
                }
                else{ 
                    firstCard = clickedCard;
                    secondCard = null;
                }
            }
        }
    }

    function matchCard(firstCard, secondCard) {
        // cards are matching
        if (firstCard.find(".back-card").find("img").attr("src") == secondCard.find(".back-card").find("img").attr("src")) {
            console.log("equal");
            remaining--;
            //no pairs remaining 
            if (remaining == 0) {
                setTimeout(() => {
                    alert("Game completed!");
                    suffleCards();
                }, 1000);
            }
            firstCard.addClass("correct");
            secondCard.addClass("correct");
            
            firstCard.off("click", handleClick);
            secondCard.off("click", handleClick);
            firstCard = secondCard = null;
            disableClick = false;
        }
        else { // not matching
            setTimeout(() => {
                firstCard.addClass("card");
                secondCard.addClass("card");
                hideImage(firstCard);
                hideImage(secondCard);
                firstCard = secondCard = "";
                disableClick = false;
            }, 200);
        }
        
    }



    function suffleCards() {
        //randomize all the cards
        firstCard = secondCard = null;
        var imgNames = [
            "ambulance",
            "bicycle",
            "car",
            "plane",
            "police",
            "sailing-boat",
            "scooter",
            "truck",
            "ambulance",
            "bicycle",
            "car",
            "plane",
            "police",
            "sailing-boat",
            "scooter",
            "truck"
        ];
        imgNames.sort(() => Math.random() > 0.5 ? -1 : 1);
        
        cells.each(function(i){
            $(this).addClass("card");
            $(this).find(".back-card").find("img").attr("src", `images/${imgNames[i]}.png`);
            hideImage($(this));
            $(this).on("click", handleClick);
            $(this).removeClass("correct");
        });
    }

    
    function showImage(cell) {
        cell.find(".back-card").show();
        cell.find(".front-card").hide();
      }
    
    function hideImage(cell) {
        cell.find(".back-card").hide();
        cell.find(".front-card").show();
    }

    suffleCards();
});