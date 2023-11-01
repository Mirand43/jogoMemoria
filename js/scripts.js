document.addEventListener("DOMContentLoaded", () => {
    const cards = [
        {
            name: 'android',
            img: 'images/android.png'
        },
        {
            name: 'git',
            img: 'images/git.png'
        },
        {
            name: 'chrome',
            img: 'images/chrome.png'
        },
        {
            name: 'github',
            img: 'images/github.png'
        },
        {
            name: 'android',
            img: 'images/android.png'
        },
        {
            name: 'git',
            img: 'images/git.png'
        },
        {
            name: 'chrome',
            img: 'images/chrome.png'
        },
        {
            name: 'github',
            img: 'images/github.png'
        },
        {
            name: 'boardRed',
            img: 'images/boardRed.png'
        }
    ];

    // Embaralhar todas as cartas
    cards.sort(() => 0.5 - Math.random());

    const board = document.querySelector('.board');
    const resultView = document.querySelector('#result');
    
    //cartas escolhidas
    let cardsChosen = [];

    //id da cartas escolhidas
    let cardsChosenId = [];

    //cartas combinadas
    let cardsWon = [];

    //valor acomulado
    let number = 0;

    function createBoard() {
        for (let i = 0; i < cards.length; i++) {
            const card = document.createElement('img');
            card.setAttribute('src', 'images/board.png');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            card.classList.add('board-image');
            board.appendChild(card);
        }
    }

    function flipCard() {
        let cardId = this.getAttribute('data-id');
        if (!cardsChosenId.includes(cardId)) {
            cardsChosen.push(cards[cardId].name);
            cardsChosenId.push(cardId);
            this.setAttribute('src', cards[cardId].img);

            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 500);
            }
        }
    }

    //verificar combinações
    function checkForMatch() {
        const cards = document.querySelectorAll('.board-image');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
    
        if (optionOneId == optionTwoId) {
            cards[optionOneId].setAttribute('src', 'images/board.png');
            cards[optionTwoId].setAttribute('src', 'images/board.png');
            alert('Você clicou na mesma imagem');
        } else if (cardsChosen[0] === cardsChosen[1]) {
            alert('Você encontrou uma combinação');
            cards[optionOneId].setAttribute('src', 'images/check.png');
            cards[optionTwoId].setAttribute('src', 'images/check.png');
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
    
            // Incrementar o contador de pares corretos
            resultView.textContent = 'Pares Encontrados: ' + cardsWon.length;
    
            if (cardsWon.length === cards.length / 2) {
                resultView.textContent = 'Parabéns! Você conseguiu encontrar todas as cartas';
            }
        } else {
            cards[optionOneId].setAttribute('src', 'images/board.png');
            cards[optionTwoId].setAttribute('src', 'images/board.png');
            alert('Errou, tente novamente');
    
            // Decrementar o contador de pares corretos se já tiver encontrado ao menos um par
            if (cardsWon.length > 0) {
                cardsWon.pop(); // Remove o último par encontrado
                resultView.textContent = 'Pares Encontrados: ' + cardsWon.length;
                // alert('Você zerou o joga, vamos começar do zero');                
            }

            if (cardsWon.length == 4) {
                alert('Você venceu');
            }
        }
    
        cardsChosen = [];
        cardsChosenId = [];
    }    

    createBoard();
});