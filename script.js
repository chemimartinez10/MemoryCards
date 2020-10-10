const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

//track active card
let currentCardActive = 0

//Store DOM cards
const cardsEl = []

//Store card Data
const cardsData = getCardData()
// const cardsData = [
//   {
//     question: 'What must a variable begin with?',
//     answer: 'A letter, $ or _'
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'Container for a piece of data'
//   },
//   {
//     question: 'Example of Case Sensitive Variable',
//     answer: 'thisIsAVariable'
//   }
// ];


function createCard(data, index){
    const card = document.createElement('div')
    card.classList.add('card')
    
    if(index === 0){
        card.classList.add('active')
    }
    
    card.innerHTML = `
    <div class="inner-card">
    <div class="inner-card-front">
    <p>${data.question}</p>
    </div>
    <div class="inner-card-back">
    <p>${data.answer}</p>
    </div>
    </div>
    `
    
    card.addEventListener('click', () => card.classList.toggle('show-answer'))
    cardsEl.push(card)
    cardsContainer.appendChild(card)
    
    updateCurrentText()
}
function createCards(){
    cardsData.forEach((data, index) => createCard(data, index))
}
function updateCurrentText(){
    currentEl.innerText=`${currentCardActive+1}/${cardsEl.length}`
}


function getCardData(){
    const cards = JSON.parse(localStorage.getItem('cards'))
    return cards === null ? [] : cards
}
function setCardsData(cards){
    localStorage.setItem('cards', JSON.stringify(cards))
    window.location.reload()
}

showBtn.addEventListener('click', () => addContainer.classList.add('show'))
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'))
addCardBtn.addEventListener('click', () => {
    const question = questionEl.value
    const answer = answerEl.value
    
    if(question.trim() && answer.trim()){
        const newCard = {question,answer}
        createCard(newCard)
        
        questionEl.value=''
        answerEl.value=''
        
        addContainer.classList.remove('show')
        
        cardsData.push(newCard)
        setCardsData(cardsData)
    }
    
})

nextBtn.addEventListener('click', ()=>{
    cardsEl[currentCardActive].className = 'card left'
    
    currentCardActive++
    
    if(currentCardActive > cardsEl.length - 1){
        currentCardActive = cardsEl.length - 1
    }
    
    cardsEl[currentCardActive].className = 'card active'
    
    updateCurrentText()
})
prevBtn.addEventListener('click', ()=>{
    cardsEl[currentCardActive].className = 'card right'
    
    currentCardActive--
    
    if(currentCardActive < 0){
        currentCardActive = 0
    }
    
    cardsEl[currentCardActive].className = 'card active'
    
    updateCurrentText()
})

clearBtn.addEventListener('click', () => {
    localStorage.clear()
    cardsContainer.innerHTML=''
    window.location.reload()
})
createCards()