var slides;

Template.Slides.onRendered(() => {
    slides = $('#carousel');
    slides.slick({
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 500,
    });
});

Template.Slides.events({

});