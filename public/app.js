function createArticles(data) {
  for (var i = 0; i < data.length; i++) {
    $("#articles-list").append(
      "<p data-id='" +
        data[i]._id +
        "'>" +
        "<a href=" +
        data[i].link +
        ">" +
        data[i].title +
        "</a></p>"
    );
  }
}

$(document).ready(function() {
  // rendering articles
  $.getJSON("/articles", function(data) {
    createArticles(data);
  });

  $(".btn-scrape").on("click", function() {
    $.get("/scrape").then(data => {
      createArticles(data);
    });
  });

  // var allArticles = $("#allArticles")
  // $(document).on("click", ".btn-scrape", articleScrape);
  // // $(document).on("click", ".btn.save", articleSave);
  // $(".clear").on("click", articleClear);

  // function articleScrape(articles) {
  //     var articleCard = [];
  //     for (var i=0; i < articles.length; i++) {
  //         articleCard.push(createCard(articles[i]));
  //     }
  //     allArticles.append(articleCard);
  // };

  // function createCard(article) {
  //     var card = $("<div class='card'>");
  //     var cardHeader = $("<div class='card-header'>").append(
  //         $("<h3>").append(
  //          $("<a class='article-link' target='_blank'>")
  //             .attr("href", article.url)
  //             .text(article.headline),
  //         $("<a class='btn btn-success save'>Save Article</a>")
  //        )
  //     );

  //     var cardBody = $("<div class='card-body'>").text(article.summary);

  //     card.append(cardHeader, cardBody);
  //     card.data("_id", article._id);
  //     return card;
  // }

<<<<<<< HEAD
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
=======
  // function articleClear() {
  //     $.get("/articles").then(function() {
  //       articleContainer.empty();
  //     });
  //   }

  // notes
  $(document).on("click", "li", function() {
    $("#notes").empty();
    var tagId = $(this).attr("data-id");

    $.ajax({
      method: "GET",
      url: "/articles/" + tagId
    }).done(function(data) {
      console.log(data);

      $("#notes").append("<h2>" + data.title + "</h2>");
      $("#notes").append("<input id='titleinput' name='title' >");
      $("#notes").append("<textarea id= 'bodyinput' name='body'></textarea>");
      $("#notes").append(
        "<button data-id='" + data._id + "' id='savenote'>Save Note</button>"
      );

      if (done.note) {
        $("#titleinput").val(data.note.title);
        $("#bodyinput"), val(data.note.body);
      }
>>>>>>> d12dc4fe07b0eba379346ac89a0d492b8b88dd1b
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
    }).done(function(data) {
      console.log(data);

<<<<<<< HEAD
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
=======
      $("#notes").empty();
>>>>>>> d12dc4fe07b0eba379346ac89a0d492b8b88dd1b
    });

    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
});
