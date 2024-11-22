$(document).ready(function () {
    let score = 0; // punkty gracza
    let cards = []; // tablica przechowująca karty
    const card_types = ["clubs", "diamonds", "hearts"]
    let next_card = null;

    // Funkcja tworząca kartę
    function createCard() {
        let cardValue = next_card
        next_card = Math.floor(Math.random() * 14) + 2;
        if (cardValue == null) {
            cardValue = Math.floor(Math.random() * 14) + 2;
        }
        if (cardValue > 14) cardValue = 14;

        const cardType = card_types[Math.floor(Math.random() * card_types.length)]; // 1-3
        const cardElement = $('<div class="card"><img src="cards/' + cardType + '_' + cardValue + '.png"/></div>');
        switch (cardValue) {
            case 12:
                cardValue = 4
                break;
            case 13:
                cardValue = 2
                break;
            case 14:
                cardValue = 3
                break;
        }
        cards.push(cardValue); // Dodanie wartości karty do tablicy
        updateScore(cardValue); // Zaktualizowanie punktów
        $('#card-container').append(cardElement); // Dodanie karty do kontenera
    }

    // Funkcja aktualizująca punkty
    function updateScore(value) {
        score += value;
        $('#score').text(score); // Aktualizacja punktów na stronie
        if (checkForOver21()) {
            addToTable()
            resetGame()
        }
    }

    // Funkcja usuwająca karty i resetująca punkty
    function resetGame() {
        cards = [];
        score = 0;
        $('#score').text(score);
        $('#card-container').empty(); // Czyszczenie kontenera z kartami
    }

    // $(document).ready(function () {
    //     var $viewcard = $('#view-card');

    //     // Po kliknięciu na przycisk, wyświetlamy diva
    //     $viewcard.on('click', function () {
    //         $followDiv.show();
    //     });

        // // Śledzenie pozycji myszy
        // $(document).on('mousemove', function (e) {
        //     if ($followDiv.is(":visible")) {
        //         var mouseX = e.pageX;
        //         var mouseY = e.pageY;
        //         $followDiv.css({
        //             left: mouseX + 10,  // 10px offset od kursora
        //             top: mouseY + 10   // 10px offset od kursora
        //         });
        //     }
        // });

        // // Sprawdzamy, czy myszka znajduje się nad przyciskiem
        // $viewcard.hover(
        //     function () {
        //        alert("")
        //     },
        //     function () {
        //         // Gdy myszka opuści przycisk, chowamy diva
        //         $followDiv.hide();
        //     }
        // );
    // });

    // Funkcja dodająca wiersz do tabeli
    function addToTable() {
        if (score === 0) return; // Jeśli punkty są równe 0, nie dodawaj wiersza

        const date = new Date().toLocaleString(); // Pobranie aktualnej daty
        const rowCount = $('#score-table tr').length + 1; // Liczenie liczby wierszy w tabeli

        const row = $('<tr></tr>');
        row.append(`<td>${rowCount}</td>`);
        row.append(`<td>${date}</td>`);
        row.append(`<td>${score}</td>`);

        $('#score-table').append(row); // Dodanie nowego wiersza do tabeli
    }

    // Funkcja sprawdzająca, czy punkty przekroczyły 21
    function checkForOver21() {
        if (score > 21) {
            alert('Przekroczyłeś 21 punktów! Gra zakończona.');
            return true; // Gra zakończona
        }
        return false; // Gra trwa
    }

    // Obsługa kliknięć przycisków
    $('#draw-card').click(function () {
        if (checkForOver21()) return; // Jeśli punkty przekroczyły 21, nie dobieraj karty
        createCard();
    });

    $('#restart-game').click(function () {
        addToTable(); // Dodaj wynik do tabeli, jeśli punkty > 0
        resetGame(); // Resetuj grę
    });

    $('#view-card').click(function () {
        let v = next_card;
        switch (v) {
            case 12:
                v = 4
                break;
            case 13:
                v = 2
                break;
            case 14:
                v = 3
                break;
        }
        alert("następna wartość karty: " + v)
    });
});
