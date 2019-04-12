$(document).ready(function(){

    // rendering articles
    $.getJSON("/articles", function(data) {
        for(var i = 0; i < data.length; i++) {
            $("#articles-list").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
        }
    });

    // notes
    $(document).on("click", "li", function() {
        $("#notes").empty();
        var tagId = $(this).attr("data-id");

        $.ajax({
            method: "GET",
            url: "/articles/" + tagId
        })
        .then(function(data) {
            console.log(data);

            $("#notes").append("<h2>" + data.title + "</h2>");
            $("#notes").append("<input id='titleinput' name='title' >");
            $("#notes").append("<textarea id= 'bodyinput' name='body'></textarea>");
            $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

            if (then.note) {
                $("#titleinput").val(data.note.title);
                $("#bodyinput"),val(data.note.body);
            }
        });
    });

// scrapping data
    $(document).on("click", "create-btn", function() {
        $("#articles").empty();
        var tagId = $(this).attr("data-id");

        $.ajax({
            method: "PUT",
            url: "/scrape" + tagId
        })
        .then(function(data) {
            console.log(data);
        });
        
        // end scrapping
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

});