(function($) {
	var MTWModal = {
		init: function() {
			var media = wp.media;
		
			this.mFrame = wp.media({
				state: 'mtw',
				states: [ new media.controller.MTW() ],
				MTW: { hideToolbar: true }
			});

			this.registerEvents();

			return false;
		},
		registerEvents: function() {
			var t = this;
			$('.insert-methode-media').click(function() {
				t.openPhotoSelection();
			});
		},
		openPhotoSelection: function() {
			this.mFrame.open();
		}
	};

MTWModal.init();

})(jQuery);