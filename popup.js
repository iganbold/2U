var overlay = document.querySelector('.overlay');
overlay.addEventListener('click', function() {
  console.log("hide popup");
  chrome.runtime.sendMessage({message: 'hide_popup'});
});

//listen for fab menus
$("#tou_red").click(function(data){
    chrome.runtime.sendMessage({message: 'ajax_tos'});
    // Materialize.toast('Terms of Use red Ajax Tos', 4000);
});

$("#tou_yellow").click(function(data){
    Materialize.toast('This feature coming soon', 4000);
});

$("#tou_green").click(function(data){
    Materialize.toast('Terms of Use green', 4000);
});

$("#tou_blue").click(function(data){
    Materialize.toast('Terms of Use blue', 4000);
});

var rankMap = new Map();
rankMap.set("A","Very Good");
rankMap.set("B","Good");
rankMap.set("C","Normal");
rankMap.set("D","Bad");
rankMap.set("E","Very Bad");

var btnColorMap = new Map();
btnColorMap.set("A","green accent-2");
btnColorMap.set("B","green accent-2");
btnColorMap.set("C","orange accent-2");
btnColorMap.set("D","red accent-2");
btnColorMap.set("E","red accent-2");

chrome.runtime.onMessage.addListener(function(result) {
  if (result.message == 'test_popup') {

    var points = result.data.points;
    var pointsData= result.data.pointsData;
    var point = "info_outline";
    var tosdr_class = result.data["class"];
    var color_class = "green"

    if(tosdr_class) {
      if(tosdr_class.toUpperCase() == "E" || tosdr_class.toUpperCase() == "D")
        color_class = "red";
      else if(tosdr_class.toUpperCase() == "C")
        color_class = "orange";

      $("#class"+tosdr_class.toUpperCase()).removeClass("grey lighten-1");
      $("#class"+tosdr_class.toUpperCase()).addClass(color_class+" accent-2");

      $('#container_class').append("<div class='chip' abcde>"+
        "<img src='./ic_cloud_circle_black_24dp_2x.png' alt='Very Good'>"+rankMap.get(tosdr_class.toUpperCase())+
      "</div>");
    } else {
      Materialize.toast('No class specified :)', 4000);
    }

    points.forEach(function(data){
      if(pointsData[data]["tosdr"]["point"] == "good")
      {
        point = "stars";
      }

      $('.tou-analyze').append(
        "<li>"+
          "<div class='collapsible-header'><i class='material-icons'>"+point+"</i>"+pointsData[data].title+"</div>"+
          "<div class='collapsible-body'><p>"+pointsData[data]["tosdr"]["tldr"]+"</p></div>"+
        "</li>");
      point = "info_outline";
      });

    $('#modal1').openModal();

  } else if(result.message == 'fab_color_change'){
      console.log("fab_color_change");
      var auto_tosdr_class = result.data["class"];

      if(auto_tosdr_class){
        $('#fabMain').removeClass("pink lighten-1");
        $('#fabMain').addClass(btnColorMap.get(auto_tosdr_class.toUpperCase()));
      }
      else {
        console.log("fab_color_change: none class");
      }
      Materialize.toast('Auto TOU status: '+rankMap.get(auto_tosdr_class.toUpperCase()), 4000);
  }
});
