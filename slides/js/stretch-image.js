// dblclick on a code snippet to display it (almost) fullscreen
// dblclick again to hide it

(function () {
  "use strict";

  function expand (node) {
    node.addEventListener('dblclick', function () {
      var clone = node.cloneNode(true);
      // middle of screen
      clone.style.top = '5%';
      clone.style.left = 0;
      clone.style.right = 0;
      clone.style.margin = '0 auto 0 auto';
      clone.style.position = 'absolute';
      clone.style.width = 'auto';
      clone.style.height = '90%';
      // case of transparent images
      clone.style.background = 'white';
      clone.style.border = '1px solid black';
      // arrows have a zIndex of 30
      clone.style.zIndex = 42;
      clone.classList.add('stretch');
      document.querySelector('.reveal').appendChild(clone);

      clone.addEventListener('dblclick', function() {
        clone.remove();
      });
    });
  }

  function expandAll () {
    var nodes = document.querySelectorAll('img');
    for (var i = 0, len = nodes.length; i < len; i++) {
      expand(nodes[i]);
    }
  }

  window.addEventListener("load", expandAll);
}());
