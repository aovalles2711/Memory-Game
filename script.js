function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there are elements in the array
  while (currentIndex !=0) {
    
    // Pick a random index
    randomindex = Math.floor(Math.random() * currentIndex);

    // Decrease counter by 1
    currentIndex--;

    // And swap the last element with it
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

var card = [
  {value: '2', image: '/Users/anthonyovalles/Desktop/Memory/Images/clubs_2.svg', matched: false},
  {value: '3', image: '/Users/anthonyovalles/Desktop/Memory/Images/clubs_3.svg', matched: false},
  {value: '2', image: '/Users/anthonyovalles/Desktop/Memory/Images/clubs_4.svg', matched: false},
  {value: '3', image: '/Users/anthonyovalles/Desktop/Memory/Images/clubs_5.svg', matched: false},
  {value: '4', image: '/Users/anthonyovalles/Desktop/Memory/Images/clubs_6.svg', matched: false},
  {value: '5', image: '/Users/anthonyovalles/Desktop/Memory/Images/clubs_7.svg', matched: false},
  {value: '2', image: '/Users/anthonyovalles/Desktop/Memory/Images/clubs_2.svg', matched: false},
  {value: '3', image: '/Users/anthonyovalles/Desktop/Memory/Images/clubs_3.svg', matched: false},
  {value: '2', image: '/Users/anthonyovalles/Desktop/Memory/Images/clubs_4.svg', matched: false},
  {value: '3', image: '/Users/anthonyovalles/Desktop/Memory/Images/clubs_5.svg', matched: false},
  {value: '4', image: '/Users/anthonyovalles/Desktop/Memory/Images/clubs_6.svg', matched: false},
  {value: '5', image: '/Users/anthonyovalles/Desktop/Memory/Images/clubs_7.svg', matched: false},
]
var card = ['1', '2', '3', '4', '5',];
var length = card.length;
  for (let i = 0; i < length; i++) {
    card[i] *= 2;
  } 
var cardEls = document.querySelectorAll('.card');
var firstAttempt = null;
var canAttempt  = true;
var flippedCards = 0;
var attempts = 0;

shuffle(card);

cardEls.forEach(function (el, index) {
  el.addEventListener('click', function() {
    if (index === firstAttempt || card[index].matched || !canAttempt) {
      alert('duplicate guess')
      return
    }

    var clickedCard = card[index]
    el.setAttribute('src', clickedCard.image)

    if (firstAttempt === null) {
        firstAttempt = index
    } else {
        attempts++
        document.querySelector('#attempts').textContent = attempts
        if (card[firstAttempt].value === card[index].value) {
          card[firstAttempt].matched = true
          card[index].matched = true
          firstAttempt = null
          flippedCards += 2

          //if player wins, reset
          if (flippedCards === card.length) {
            resetGame()
          }
        } else {
          canAttempt = false
          setTimeout(function() {
            cardEls[firstAttempt].setAttribute('src', '/Users/anthonyovalles/Desktop/Memory/Images/red.svg')
            cardEls[index].setAttribute('src', '/Users/anthonyovalles/Desktop/Memory/Images/red.svg')
            firstAttempt = null;
            canAttempt = true;
          }, 1000)
        }
    }

 

  })
}) 

function resetGame() {
    canAttempt = false
  
    setTimeout(function() {
      firstAttempt = null 
      canAttempt = true
      flippedCards = 0
      attempts = 0

      document.querySelector('#attempts').textContent = attempts

      cardEls.forEach(function(el, index) {
      el.setAttribute('src', '/Users/anthonyovalles/Desktop/Memory/Images/red.svg')
      })
  
      shuffle(card)
    }, 2000)
  }

document.querySelector('#reset').addEventListener('click', function() {
  alert('clicked!')
  resetGame()
})