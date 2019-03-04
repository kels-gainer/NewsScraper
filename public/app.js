$.getJSON("/articles", function(data) {
    for(var i = 0; i < data.length; i++) {
        $("#articles").appened("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});

$(document).on("click", "p", function() {
    $("#notes").empty();
    var tagId = $(this).attr("data0id");

    $.ajax({
        method: "GET",
        url: "/articles/" + tagId
    })
    .then(function(data) {
        console.log(data);

        $("#notes").appened("<h2>" + data.title + "</h2>");
        $("#notes").appened("<input id='titleinput' name='title' >");
        $("#notes").appened("<textarea id= 'bodyinput' name='body'></textarea>");
        $("#notes").appened("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

        if (data.note) {
            $("#titleinput").val(data.note.title);
            $("#bodyinput"),val(data.note.body);
        }
    });
});

$(document).on("click", "#savenote", function() {
    var tagId = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/articles/" + tagId,
        data: {
            title: $("#titleinput").val(),
            body: $("#bodyinput").val()
        }
    })
    .then(function(data) {
        console.log(data);

        $("#notes").empty();
    });

    $("#titleinput").val("");
    $("#bodyinput").val("");
});