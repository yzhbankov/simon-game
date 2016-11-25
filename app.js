/**
 * Created by Iaroslav Zhbankov on 24.11.2016.
 */
(function () {
    var mode = false;
    var tumbler = false;
    var brr = [];
    var arr = [];
    var colors = {
        0: $(".but").eq(0).css("background-color"),
        1: $(".but").eq(1).css("background-color"),
        2: $(".but").eq(2).css("background-color"),
        3: $(".but").eq(3).css("background-color")
    };
    var newColors = {
        0: "#00b100",
        1: "#ff7d00",
        2: "#007fff",
        3: "#f4ff79"
    };
    $('#toggle_event_editing button').click(function () {
        /* reverse locking status */
        $('#toggle_event_editing button').eq(0).toggleClass('locked_inactive locked_active btn-default btn-info');
        $('#toggle_event_editing button').eq(1).toggleClass('unlocked_inactive unlocked_active btn-info btn-default');
    });

    $(".mode").click(function () {
        if (!mode) {
            $(".pointer").css("background-color", "yellow");
            mode = true;
        } else {
            $(".pointer").css("background-color", "red");
            mode = false;
        }
    });

    $(".but").click(function () {
        fire($(".but").index($(this)));
        brr.push($(".but").index($(this)));
        console.log("brr" + brr);
    });

    $(".start").click(function () {

        /*while (arr.length < 20) {*/
        var index = Math.floor(Math.random() * 4);
        arr.push(index);
        if (arr.length > 0) {
            for (var i = 0; i < arr.length; i++){
                fire(arr[i], i);
            };
        } else {
            fire(index)
        }
        console.log("arr" + arr);
    });

    function fire(index, i) {
        setTimeout(function () {
            $(".but").eq(index).css("background-color", newColors[index]);
            setTimeout(function () {
                $(".but").eq(index).css("background-color", colors[index]);
            }, 700);
        }, i*1000);
    }
})();

