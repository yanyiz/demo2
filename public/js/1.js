$(() => {
    $(document).scroll(() => {
        // dung $(window) moi chay dc tren firefox
        var vitrihientai = $(window).scrollTop();
        console.log(vitrihientai);
        if (vitrihientai >= 100) {
            $('.navbar').addClass('biendoi');
        } else {
            $('.navbar').removeClass('biendoi');
        }

        //mo rong
        if (vitrihientai >= 600) {
            $('.portfolio').addClass('hienra');
        } else {
            $('.portfolio').removeClass('hienra');
        }
    })

    //click
    $('.pro').click(() => {
        /*truot xuong 700px*/
        $('body').animate({ scrollTop: 700 }, 2000 /*thoigianchuyendong*/ , "easeInOutElastic");
        return false;
    })
    $('.abo').click(() => {
        $('body').animate({ scrollTop: 1510 }, 2000, "easeInOutElastic");
        return false;
    })
    $('.con').click(() => {
        $('body').animate({ scrollTop: 2115 }, 2000, "easeInOutElastic");
        return false;
    })

})