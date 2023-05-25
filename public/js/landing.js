var cards = document.querySelector('.product-box');

[...cards].forEach((card)=>{
    card.addEventListener('mouseover', function(){
        card.classlist.add('is-hover');
    })
    card.addEventListener('mouseout', function(){
        card.classlist.remove('is-hover');
    })
});