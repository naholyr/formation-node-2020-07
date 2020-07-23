// dblclick on a code snippet to display it (almost) fullscreen
// dblclick again to hide it

(function () {
	"use strict";

	function expand (node) {
		node.addEventListener('dblclick', function () {
			var clone = node.cloneNode(true);
			clone.style.bottom = 0;
			clone.style.left = 0;
			// avoid cropping on weird screens
			clone.style.margin = '2em';
			clone.style.position = 'absolute';
			clone.style.right = 0;
			clone.style.top = 0;
			clone.style.width = 'auto';
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
		var nodes = document.querySelectorAll('pre');
		for (var i = 0, len = nodes.length; i < len; i++) {
			expand(nodes[i]);
		}
	}

	window.addEventListener("load", expandAll);
}());
