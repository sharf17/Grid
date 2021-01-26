$(document).ready(function () {
  var images = [
      "Agapanthus.jpg",
      "Airific.jpg",
      "city.png",
      "nithin.jpg",
  ];
  var image_src = images[Math.floor(Math.random() * 3 + 0.5)]; //generates random number from 0 to 3.
  $("#actualimg").attr("src", image_src);
  var gridsize = $(".buttons_box :radio:checked").val(); // takes the default checked value from radio button
  console.log(gridsize);
  imagePuzzle.startgame(gridsize, image_src);
  $(".buttons_box :radio").change(function () {
              $(".puzzle_box").empty(); // needed to clear earlier elements so as to not crowd.
    var gridsize = $(this).val();
    imagePuzzle.startgame(gridsize, image_src); //takes the updated gridsize value.
    console.log(gridsize);
  });
});
var imagePuzzle = {
  startgame: function (gridsize, image_src) {
    this.placeImage(gridsize, image_src);
    $(".puzzle_box").randomise();
    this.enableSwapnDrop(".puzzle_box li");
  },
  enableSwapnDrop: function (elem) {
    $(elem).draggable({
      snap: "#droppable",
      helper: "clone",
      snapmode: "outer",
      revert: false,
    });
    $(elem).droppable({
      drop: function (event, ui) {
        var $dragElem = $(ui.draggable).clone().replaceAll(this); //Replaces the dragged element over the target element while cloning itself.
        $(this).replaceAll(ui.draggable);

        currentList = $(".puzzle_box > li").map(function (i, el) {
                    // Creates an array which stores the data values of li elements
                    return $(el).attr("data-value");
        });
        if (isSorted(currentList)) {
          $(".console_wrapper").empty().html($(".results").html()); //Checks the data value if value matches the index order of an normal array.
        }
        imagePuzzle.enableSwapnDrop(this);
        imagePuzzle.enableSwapnDrop($dragElem);
      },
    });
  },

  placeImage: function (gridsize, image_src) {
    var percentage = 100 / (gridsize - 1); // Denotes the exact middle element in the grid column or row
    for (var i = 0; i < gridsize * gridsize; i++) {
      var xpos = percentage * (i % gridsize) + "%"; // We append the respective stying to denote a part of the source image.
      console.log(xpos);
      var ypos = percentage * Math.floor(i / gridsize) + "%";
      console.log(ypos);
      var li = $('<li class="item" data-value="' + i + '"></li>').css({
          "background-image": "url(" + image_src + ")",
          "background-size": gridsize * 100 + "%",
          "background-position": xpos + " " + ypos,
          width: 400 / gridsize,
          height: 400 / gridsize,
      });
      $(".puzzle_box").append(li);
    }
    $(".puzzle_box").randomise();
    },
    };

$.fn.randomise = function (selector) {
  var $elems = selector ? $(this).find(selector) : $(this).children(); //selects the child elements 
  $parents = $elems.parent();

  $parents.each(function () {
    $(this)
        .children(selector)
        .sort(function () {
            return Math.round(Math.random()) - 0.5; // loops a random number.
        })
        .remove() // helps to remove default position
        .appendTo(this); // appends new value
  });
  return this;
};
 
function isSorted(arr) { //Checks wheter the value matches the index order of an normal array
  for (var i = 0; i < arr.length - 1; i++) {              
    if (arr[i] != i) return false;
  }
  return true;
}