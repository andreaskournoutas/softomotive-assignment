(function mutationObserver() {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if ($(mutation.target).prop(mutation.attributeName) == "fontawesome-i2svg-active fontawesome-i2svg-complete") {
				cardPaddingForFooter();
				navHeight();
            }
        });
    });
    observer.observe(document.documentElement, {attributes: true});
}())

let deviceTier, deviceOrientation;

function tierAndOrientation() {
  	if ($(".visible-xl").css('display') == 'block') {
		deviceTier = "xl";
	}
	else if ($(".visible-lg").css('display') == 'block') {
		deviceTier = "lg";
	}
	else if ($(".visible-md").css('display') == 'block') {
		deviceTier = "md";
	}
	else if ($(".visible-sm").css('display') == 'block') {
		deviceTier = "sm";
	}
	else if ($(".visible-xs").css('display') == 'block') {
		deviceTier = "xs";
	}
	if (window.innerHeight >= window.innerWidth) {
		deviceOrientation = "portrait";
	}
	else {
		deviceOrientation = "landscape";
	}
	$("body").removeClass('xl lg md sm xs portrait landscape').addClass(deviceTier).addClass(deviceOrientation);
}

function navHeight() {
	$("nav").height($("body").height());
}

function img1x1() {
	$(".img-1x1").each(function() {
		$(this).width($(this).height());
	});
}

function img2x1() {
	$(".img-2x1").each(function() {
		$(this).height($(this).width() / 2);
	});
}

function cardPaddingForFooter() {
    $(".card-footer:not(.card-footer-horizontal").each(function() {
        $(this).parent().css('padding-bottom', $(this).innerHeight());
    });
}

function card2ColsManipulation() {
	let card2ColsImage = ".card-2-cols img";
    if ((deviceTier == "xl") || (deviceTier == "lg")) {
        let parentWidth = $(card2ColsImage).parent().width();
        $(card2ColsImage).removeClass('w-100 img-2x1').width(parentWidth).height('100%');
    }
    else {
        $(card2ColsImage).height('auto').addClass('w-100 img-2x1');
    }
}

function cardHorizontalManipulation() {
	if ((deviceTier == "xl") || (deviceTier == "lg")) {
		$(".card-horizontal .card-footer").parent().css('padding-bottom', 0)
		$(".card-horizontal h3").addClass('text-truncate');
		$(".card-horizontal").parent().height($(".card-horizontal .card-body").innerHeight());
		$(".card-horizontal .card-footer").addClass('card-footer-horizontal h-100').removeClass('position-absolute b-0 w-100');
		$(".card-horizontal .img-wrapper").addClass('h-100');
		$(".card-horizontal img").removeClass('img-2x1 w-100').addClass('img-1x1 h-100');
	}
	else {
		$(".card-horizontal h3").removeClass('text-truncate');
		$(".card-horizontal").parent().height('auto');
		$(".card-horizontal .card-footer").removeClass('card-footer-horizontal h-100').addClass('position-absolute b-0 w-100');
		$(".card-horizontal .img-wrapper").removeClass('h-100');
		$(".card-horizontal img").removeClass('img-1x1 h-100').addClass('img-2x1 w-100');
	}
}

$(function() {
    tierAndOrientation();
});

$(window).on("load", function (e) {
	card2ColsManipulation();
	cardHorizontalManipulation();
	img2x1();
	img1x1();
});

$(window).resize(function() {
	tierAndOrientation();
	card2ColsManipulation();
	cardHorizontalManipulation();
	cardPaddingForFooter();
	img2x1();
	img1x1();
	navHeight();
});

