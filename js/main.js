"use strict";

/*-----------------------
    FUNCTIONS
-----------------------*/
function boxCreation (howManyColumn) {
    // Svuoto il contenuto prima di inserire i box per renderlo più dinamico al cambio di difficoltà
    boxContainer.innerHTML = "";
    // Dichiaro variabile che generi i box totaliin base alle colonne
    let howManyBox = howManyColumn * howManyColumn;
    // Array contenente le bombe
    let bombNumbers = [];
    let i = 0;
    let score = 0;
    const winBanner = document.getElementById('win-banner');
    const loseBanner = document.getElementById('lose-banner');
    const totalWinScore = document.getElementById('total-win-score');
    const totalScore = document.getElementById('total-score');
    while ( i < 16 ) {
        let random = Math.floor(Math.random() * howManyBox) + 1;
        if (!bombNumbers.includes(random)){
            bombNumbers.push(random);
            i++;
        }
    }
    console.log(bombNumbers);
    // Inizializzo un ciclo for per creare i miei box dinamicamente dentro il box__container
    let gameOver = false;
    for ( let i = 1; i <= howManyBox; i++ ){
        let boxItem = document.createElement("div");
        boxItem.innerHTML = i;
        boxItem.classList.add('box__item',`box__item${howManyColumn}`);
        boxContainer.append(boxItem);
        // Aggiungo evento click al box della cella
        boxItem.addEventListener("click", function(){
            if ( gameOver ){
                return;
            }
            let boxBomb = bombNumbers.includes(Number(boxItem.innerHTML));
            const reset = document.getElementById('reset');
            reset.addEventListener('click', function(){
                window.location.reload();
            });
            if ( boxBomb ){
                advice.innerHTML = `<span style="font-size:24px; color:red;">Gioco finito, premi il tasto reset se vuoi ricominciare.</span>`;
                loseBanner.classList.add('show');
                reset.classList.add('show');
                for ( let i = 0; i < bombNumbers.length; i++ ){
                    document.querySelector(`.box__item:nth-child(${bombNumbers[i]}`).classList.add('bg-change-error');
                }
                gameOver = true;
            } else {
                if ( !this.classList.contains("bg-change") ){
                    this.classList.add("bg-change");
                    score++;
                    advice.innerHTML = `<span style="font-size:24px;">Il tuo punteggio attuale è di: ${score} punti</span>`;
                } else {
                    score = score;
                }
            }
            if ( score === howManyBox - 16 ){
                winBanner.classList.add('show');
                advice.innerHTML = `<span style="font-size:24px; color:red;">Gioco finito, premi il tasto reset se vuoi ricominciare.</span>`;
                reset.classList.add('show');
                gameOver = true;
            }
            totalWinScore.innerHTML = `<span style="font-size: 30px; color: red; font-weight: bold">${score} su ${score}</score>`;
            totalScore.innerHTML = `<span style="font-size: 30px; color: red; font-weight: bold">${score}</score>`;
            console.log(`Hai cliccato la casella numero: ${this.innerHTML}`);
        })
    }
}
/*-----------------------
    MAIN
-----------------------*/
// Dichiaro la variabile relativa al box__container
const boxContainer = document.getElementById('box__container');
const advice = document.querySelector('#advice');

// Dichiaro la variabile relativa al bottone play
const play = document.getElementById('play__btn');

// Aggiungo evento al play che mostra la griglia
play.addEventListener('click', function(){
    boxContainer.classList.add('show');
    // Aggiungo variabile relativa al value delle opzioni:
    let difficulties = document.querySelector('#difficulties').value; 
    // Impostando valore di howManyColumn = difficulties, posso richiamare direttamente difficulties dentro la funzione
    boxCreation(difficulties);
})
