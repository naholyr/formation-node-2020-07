(function () {

  var html = ''
    +'<html>'
    +'<head>'
    +'  <script type="text/javascript" src="https://code.jquery.com/jquery-1.11.0.min.js"></script>'
    +'  <script type="text/javascript" src="https://awwapp.com/static/1.0/aww.min.js"></script>'
    +'  <link rel="stylesheet" type="text/css" href="https://awwapp.com/static/1.0/aww.css"/>'
    +'</head>'
    +'<body>'
    +'  <script type="text/javascript">'
    +'    $(function() {'
    +'      $(document.body).awwCanvas();'
    +'      $(".pencil.submenu .thin a").click();'
    +'      document.addEventListener("keydown", function (event) {'
    +'        function color (name) {'
    +'          event.preventDefault();'
    +'          $(".color.submenu ." + name + " a").click();'
    +'        }'
    +'        function clear () {'
    +'          event.preventDefault();'
    +'          $(".menu.submenu .new a").click();'
    +'        }'
    +'        if (event.keyCode === 82) color("red");'
    +'        if (event.keyCode === 71) color("green");'
    +'        if (event.keyCode === 66) color("blue");'
    +'        if (event.keyCode === 75) color("black");'
    +'        if (event.keyCode === 46 && event.shiftKey) clear();'
    +'      }, false );'
    +'    });'
    +'  </script>'
    +'</body>'
    +'</html>';

  var popup;

  // Open the notes when the 's' key is hit
  document.addEventListener('keydown', function (event) {
    // Disregard the event if the target is editable or a modifier is present
    if (document.querySelector(':focus') !== null || event.shiftKey || event.altKey || event.ctrlKey || event.metaKey) return;

    if (event.keyCode === 87) {
      event.preventDefault();
      if (popup && !popup.closed) {
        popup.focus();
      } else {
        popup = window.open('data:text/html,' + html, 'reveal.js - Whiteboard', 'height='+screen.height+'width='+screen.width);
      }
    }
  }, false );

})();
