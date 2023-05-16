$(document).ready(function() {
    const table = $("#wrapper");
    var remaining = table.find("td").length / 2;
    var firstCard = null, secondCard = null;
    var disableClick = false;
    const cells = table.find("td");

    function handleClick(e) {
        const clickedCard = $(e.target);
        console.log("Clicked");

        if (!disableClick && !clickedCard.is(firstCard)) {
            showNumber(clickedCard);
            console.log(firstCard);
            clickedCard.removeClass("card");
        
            // first card selected
            if (!firstCard) {
                firstCard = clickedCard;
            } else {
                //verify if the cards match
                if (!secondCard) {
                    console.log("second card");
                    secondCard = clickedCard;
                    disableClick = true;
                    matchCard(firstCard, secondCard);
                } else { 
                    firstCard = clickedCard;
                    secondCard = null;
                }
            }
        }
    }

    function matchCard(firstCard, secondCard) {
        let firstElement = Number(firstCard.find(".back-card").text());
        let secondElement = Number(secondCard.find(".back-card").text());
        
        // cards are matching
        if (firstElement == secondElement) {
            remaining--;
            //no pairs remaining 
            if (remaining == 0) {
                alert("Game completed!");
                setTimeout(() => {
                    suffleCards();
                }, 1000);
            }
            firstCard.addClass("correct");
            secondCard.addClass("correct");
            
            firstCard.off("click", handleClick);
            secondCard.off("click", handleClick);
            firstCard = secondCard = null;
            disableClick = false;
        } else { // not matching
            setTimeout(() => {
                firstCard.addClass("card");
                secondCard.addClass("card");
                hideNumber(firstCard);
                hideNumber(secondCard);
                firstCard = secondCard = null;
                disableClick = false;
            }, 200);
        }
    }



    function suffleCards() {
        //randomize all the cards
        firstCard = secondCard = null;
        let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
        numbers.sort(() => Math.random() > 0.5 ? -1 : 1);
        
        cells.each(function(i) {
            $(this).addClass("card");
            $(this).find(".back-card").text(numbers[i]);
            hideNumber($(this));
            $(this).on("click", handleClick);
            $(this).removeClass("correct");
          });
    }

    function showNumber(cell) {
        cell.find(".back-card").show();
        cell.find(".front-card").hide();
      }
    
    function hideNumber(cell) {
        cell.find(".back-card").hide();
        cell.find(".front-card").show();
    }

    suffleCards();
});