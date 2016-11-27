/**
 * Created by Iaroslav Zhbankov on 24.11.2016.
 */
(function () {
    var mode = false;
    var locked = true;
    var win = false;
    var brr = [];
    var arr = [];
    var sound = {
        0: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
        1: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
        2: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
        3: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
    };
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
        locked = !locked;
        if (locked) {
            $(".counter").text("");
        } else {
            $(".counter").text("00");
            win = false;
            arr = new Array();
            brr = new Array();
        }
        $('#toggle_event_editing button').eq(0).toggleClass('locked_inactive locked_active btn-default btn-info');
        $('#toggle_event_editing button').eq(1).toggleClass('unlocked_inactive unlocked_active btn-info btn-default');
    });

    $(".mode-js").click(function () {
        if (!locked) {
            if (!mode) {
                $(".pointer").css("background-color", "yellow");
                mode = true;
            } else {
                $(".pointer").css("background-color", "red");
                mode = false;
            }
        }
    });

    $(".but").click(function () {
        var same = this;
        if ((!locked)) {
            var promise = new Promise(function (resolve, reject) {
                fire($(".but").index($(same)));
                resolve($(".but").index($(same)));
            })
                .then(function (result) {
                    brr.push(result);
                    if (!isEqual(brr, arr)) {
                        $(".counter").text("!!");
                        if (mode) {
                            win = false;
                            arr = new Array();
                            brr = new Array();
                            simon(1);
                        } else {
                            arr.pop();
                            simon(1);
                        }
                    } else if (brr.length == 5) {
                        $(".counter").text("Win!");
                        win = true;
                    }
                    if (brr.length == arr.length) {
                        simon(1);
                        brr = new Array();
                    }
                });
        }
    });

    $(".start-js").click(function () {
        win = false;
        arr = new Array();
        brr = new Array();
        if (!locked) {
            simon(0);
        }
    });

    function simon(j) {
        if (!win) {
            var index = Math.floor(Math.random() * 4);
            arr.push(index);
            if (arr.length < 10) {
                $(".counter").text("0" + arr.length);
            } else {
                $(".counter").text(arr.length);
            }
            if (arr.length > 0) {
                for (var i = 0; i < arr.length; i++) {
                    fire(arr[i], i + j);
                }
            } else {
                fire(index);
            }
        }
    }

    function fire(index, i) {
        setTimeout(function () {
            $(".but").eq(index).css("background-color", newColors[index]);
            
            var audio = new Audio(sound[index]);
            audio.play();
            setTimeout(function () {
                $(".but").eq(index).css("background-color", colors[index]);
            }, 700);
        }, i * 1000);
    }

    function isEqual(brr, arr) {
        for (var i = 0; i < brr.length; i++) {
            if (arr[i] != brr[i]) {
                return false;
            }
        }
        return true;
    }
})();


