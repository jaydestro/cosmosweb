$(function () {

    $(".os-select").click(function () {
        var os = $(this).data("trailTarget");

        $(".os-select").removeClass("active");
        $(".os-select." + os).addClass("active");

        $(".os-toggle").hide();
        $(".os-toggle." + os).show();

        return false;
    });

    $("body").scrollspy({ target: ".nav-page" });

    $(".toc").affix({
      offset: {
          top: $(".jumbotron").outerHeight()
        }
    });
});