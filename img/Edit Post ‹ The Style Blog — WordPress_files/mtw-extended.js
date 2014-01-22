/**
 * WIPP (WordPress Image Portal Publisher)
 *
 */
(function($) {
	var media = wp.media;
	var MTW = MTW || {};

	/**
	 * Create a new controller that simply adds a mtw key
	 * to the library query
	 */
	
	media.controller.MTW = media.controller.Library.extend({
		defaults: _.defaults({
			id:         'mtw',
			router:     'mtw',
			toolbar:    'mtw-toolbar',
			title:      'Insert from Methode',
			priority:   200,
			searchable: true,
			sortable:   false
		}, media.controller.Library.prototype.defaults ),

		initialize: function() {
			if ( ! this.get('library') )
				this.set( 'library', media.query({ mtw: true }) );

			media.controller.Library.prototype.initialize.apply( this, arguments );
		},

		/**
		 * The original function saves content for the browse router only,
		 * so we hi-jack it a little bit.
		 */
		saveContentMode: function() {
			if ( 'mtw' !== this.get('router') )
				return;

			var mode = this.frame.content.mode(),
				view = this.frame.router.get();

			if ( view && view.get( mode ) ) {
				setUserSetting( 'libraryContent', mode );
			}
		}
	});

	delete media.controller.MTW.comparator;

	var attachmentSync = media.model.Attachment.prototype.sync;
	media.model.Attachment.prototype.sync = function( method, model, options ) {
		if ( model.get( 'mw_isMTW' ) ) {
			options.data = _.extend( options.data || {}, {
				is_mtw: true,
			} );
		}

		// Call the original sync routine.
		return attachmentSync.apply( this, arguments );
	};

	var attachmentInit = media.view.Attachment.prototype.initialize;
	media.view.Attachment.prototype.initialize = function() {
		if ( 'mtw' != this.controller.state().get('id') )
				return attachmentInit.apply( this, arguments );

		//Avoid being used by attachment details
		if( !this.focusManager ) {
			this.template = media.template('attachment-override');
			attachmentInit.apply(this);
		}
	};

	var modalMessages = media.View.extend({
		template: media.template('attachments-noresults')
	});

	var Attachments = media.view.Attachments;
	media.view.Attachments = Attachments.extend({
		initialize: function(options) {
			if ( 'mtw' != this.controller.state().get('id') )
				return Attachments.prototype.initialize.apply( this, arguments );

			this.controller.on('search:notSearching', this.noResultsFoundTemplate, this);

			Attachments.prototype.initialize.apply( this, arguments );
		},

		scroll: function( event ) {
			if ( 'mtw' != this.controller.state().get('id') )
				return Attachments.prototype.scroll.apply( this, arguments );

			// @todo: is this still necessary?
			if ( ! this.$el.is(':visible') )
				return;

			if ( this.collection.hasMore() && this.el.scrollHeight < this.el.scrollTop + ( this.el.clientHeight * this.options.refreshThreshold ) ) {
				this.collection.mirroring.numBy += 40;
				this.collection.more( { 'isScroll': true } ).done( this.scroll );
			}
		},
		prepare: function() {
			if ( 'mtw' != this.controller.state().get('id') )
				return Attachments.prototype.prepare.apply( this, arguments );

			var mtw = this;

			this.collection.on('attachments:fetchimages', this.waitingTemplate, this);
			this.collection.on('attachments:fetchimages', this.deleteSelection, this);
			this.collection.on('attachments:donefetching', this.clearAttachments, this);

			if( this.collection.mirroring ) {
				this.collection.mirroring.on('query:isError', this.errorTemplate, this);
				this.collection.mirroring.on('query:isComplete', this.clearAttachments, this);
				this.collection.mirroring.on('query:noResults', this.noResultsFoundTemplate, this);
			}

			Attachments.prototype.prepare.apply( this, arguments );
		},

		errorTemplate: function( options ) {
			var errorTemplate = media.template('attachments-error'), response;

			if( options.errors )
				response = options.errors.http_request_failed[0];
			else
				response = options.statusText;
			
			this.$el.html(errorTemplate({ 'error' : response }));
		},

		waitingTemplate: function() {
			var waitingTemplate = media.template('attachments-loading');
			//What's the haps on moving this to the prototype render action?
			this.$el.html(waitingTemplate());
		},

		noResultsFoundTemplate: function() {
			if( this.model.get('search') )
				return;

			var template = media.template('attachments-noresults');
			this.$el.html(template);
		},
		
		clearAttachments: function() {
			this.$el.empty();
		},

		//This code needs to move into the selection model
		deleteSelection: function() {
			var controller = this.controller,
				selection = controller.state().get('selection');

			if( typeof selection != 'undefined' && selection.length ) {
				selection.reset();
			}
		},

		render: function() {
			return Attachments.prototype.render.apply(this);
		},
	});

	
	var Search = media.view.Search;
	media.view.Search = Search.extend({
		initialize: function( options ) {
			if ( 'mtw' != this.controller.state().get('id') )
				return Search.prototype.initialize.apply( this, arguments );

			this.lastTimeKeyPressed = 0;
		},
		search: function( event ) {
			if ( 'mtw' != this.controller.state().get('id') )
				return Search.prototype.search.apply( this, arguments );

			var search = this;
			
			if( this.lastTimeKeyPressed !== 0 ) {
				clearTimeout(this.lastTimeKeyPressed);
			}

			this.lastTimeKeyPressed = setTimeout( function(){
				if ( event.target.value ) {
					search.model.set( 'search', event.target.value );
					search.controller.trigger('search:isSearching');
				}
				else {
					search.model.unset('search');
					search.controller.trigger('search:notSearching');
				}
			}, 500);
		}
	});

	var attachmentsMore = media.model.Attachments.prototype.more;
	media.model.Attachments.prototype.more = function( options ) {
		if( !this.props.get('mtw') )
			return attachmentsMore.apply(this, arguments);

		var deferred = $.Deferred(),
			mirroring = this.mirroring,
			attachments = this;

		options = options||{};

		if ( ! mirroring || ! mirroring.more )
			return deferred.resolveWith( this ).promise();

		// If we're mirroring another collection, forward `more` to
		// the mirrored collection. Account for a race condition by
		// checking if we're still mirroring that collection when
		// the request resolves.
		if( options.isScroll ) {
			if( mirroring.props.get('allModels') ) {
				var allModels = mirroring.props.get('allModels');
				attachments.add( mirroring.props.get('allModels').slice(0, mirroring.numBy) );
				if( attachments.length >= mirroring.props.get('allModels').length )
					mirroring._hasMore = false;
			}
			return deferred.promise();
		} else {
			//Trigger if we have a query
			if( mirroring.args.s )
				this.trigger('attachments:fetchimages');
			
			mirroring.more( options ).done( function(resp) {
				//attachments.trigger('attachments:donefetching');
				if( typeof resp == 'undefined' || !resp.length ) {
					this.trigger('query:noResults');
				}
				else if( this === attachments.mirroring )
					deferred.resolveWith( this );
			});
		}

		return deferred.promise();
	};

	var queryInit = media.model.Query.prototype.initialize;
	media.model.Query.prototype.initialize = function( options ) {
		this.numBy = 40;
		queryInit.apply(this, arguments);
	};

	var queryMore = media.model.Query.prototype.more;
	media.model.Query.prototype.more = function( options ) {
		if( !this.props.get('mtw') )
			return queryMore.apply(this, arguments);

		var query = this;

		if ( this._more && 'pending' === this._more.state() )
			return this._more;

		if ( ! this.hasMore() )
			return $.Deferred().resolveWith( this ).promise();

		options = options || {};
		options.remove = false;

		return this._more = this.fetch( options ).done( function( resp ) {
			if ( _.isEmpty( resp ) || -1 === this.args.posts_per_page || resp.length < this.args.posts_per_page )
				query._hasMore = false;
		});
	};

	var querySync = media.model.Query.prototype.sync;
	media.model.Query.prototype.sync = function(  method, model, options ) {
		if( !this.props.get('mtw') )
			return querySync.apply(this, arguments);

		var fallback, query = this;

		// Overload the read method so Attachment.fetch() functions correctly.
		if ( 'read' === method ) {
			options = options || {};
			options.context = this;
			options.data = _.extend( options.data || {}, {
				action:  'query-attachments',
				nonce:  wp.media.view.settings.nonce.searchImages,
				post_id: media.model.settings.post.id
			});

			//Override the success callback to slice to 20
			var success_call = options.success;
			options.success = function( resp ) {
				query.trigger('query:isComplete');
				
				if( resp.length === 0 )
					query.trigger('query:noResults');

				var arg = resp.slice(0, query.numBy);
				query.props.set('allModels', resp);
				success_call.apply( this, [arg] );
			};

			var error_call = options.error;
			options.error = function( resp ) {
				query.trigger('query:isError', resp);
			};

			options.timeout = 20000;

			// Clone the args so manipulation is non-destructive.
			args = _.clone( this.args );

			// Determine which page to query.
			if ( -1 !== args.posts_per_page )
				args.paged = Math.floor( this.length / args.posts_per_page ) + 1;

			options.data.query = args;
			return media.ajax( options );

		// Otherwise, fall back to Backbone.sync()
		} else {
			fallback = Attachments.prototype.sync ? Attachments.prototype : Backbone;
			return fallback.sync.apply( this, arguments );
		}
	};

	/**
	 * Extend the default Attachment Details view. Check for ms_isMTW before
	 * adding anything to these methods.
	 */
	var AttachmentDetails = media.view.Attachment.Details;
	media.view.Attachment.Details = AttachmentDetails.extend({

		initialize: function() {
			if( this.model.get('mw_isMTW') ) {
				_.extend( this.events, {
					'click a.view-full-image': 'showImagePreview'
				});

				this.template = media.template('methode-attachment-details');
			}
			return AttachmentDetails.prototype.initialize.apply( this, arguments );
		},

		showImagePreview: function() {
			MImageModal.render( this );
			return this;
		}

	});


	var AttachmentsBrowser = media.view.AttachmentsBrowser;
	media.view.AttachmentsBrowser = AttachmentsBrowser.extend({

		createUploader: function() {
			if ( 'mtw' != this.controller.state().get('id') )
				return AttachmentsBrowser.prototype.createUploader.apply( this, arguments );
		},

		createAttachments: function() {
			if ( 'mtw' != this.controller.state().get('id') )
				return AttachmentsBrowser.prototype.createAttachments.apply(this, arguments);
			
			this.removeContent();

			this.attachments = new media.view.Attachments({
				controller: this.controller,
				collection: this.collection,
				selection:  this.options.selection,
				model:      this.model,
				sortable:   this.options.sortable,

				// The single `Attachment` view to be used in the `Attachments` view.
				AttachmentView: this.options.AttachmentView
			});

			delete this.attachments.collection.comparator;

			this.views.add( this.attachments );
		},

		createToolbar: function() {
			if ( 'mtw' != this.controller.state().get('id') )
				return AttachmentsBrowser.prototype.createToolbar.apply( this, arguments );

			AttachmentsBrowser.prototype.createToolbar.apply( this, arguments );

			var controller = this;

			this.toolbar.set( 'filter', new DatabaseSelector({
				controller: this.controller,
				model: this.collection.props,
				priority: -80
			}).render() );
		}

	});


	var DatabaseSelector = media.View.extend({
		tagName: 'select',
		className: 'database-selector',

		events: {
			change: 'change'
		},

		initialize: function() {
			this.createDatabases();

			this.$el.html( _.chain( this.databases ).map(function( name, value) {
				return {
					el: $('<option></option>').val(name).text(name)[0],
				};
			}, this ).pluck('el').value() );

			this.change();
		},

		createDatabases: function() {
			this.databases = {
				production: 'Production',
				wires: 'Wires'
			};
		},

		change: function( event ) {
			if( event ) {
				this.model.set( 'database', event.currentTarget.value );
			} else {
				this.model.set( 'database', this.databases.production );
			}
		}
	});

	/**
	 * Add MTW-specific methods for all frames.
	 */
	_.extend( media.view.MediaFrame.prototype, { MTW: {

		checkOrWreck : 1,
		checkOrWreckTwo: 1,
		imageCheckedOut: false,
		fetchingImage: false,

		// When the MTW router is activated.
		activate: function() {
			var view = _.first( this.views.get( '.media-frame-router' ) ),
				viewSettings = {};

			view.set( viewSettings );

			// Intercept and clear all incoming uploads
			wp.Uploader.queue.on( 'add', this.MTW.disableUpload, this );

			this.content.mode( 'browse' );
		},

		// When navigated away from the MTW router.
		deactivate: function( view ) {
			wp.Uploader.queue.off( 'add', this.MTW.disableUpload );
		},

		// Disable dragdrop uploads in the MTW router.
		disableUpload: function( attachment ) {
			var uploader = this.uploader.uploader.uploader;
			uploader.stop();
			uploader.splice();
			attachment.destroy();
		},

		pubImage: function( sel, align, con ) {
			var mtw = this;
			(function() {
				var s = sel,
				a = align,
				c = con,
				model = sel.models[0];

				//Violating Yoda's principle rule here. No matter what happens, try to insert the image
				wp.media.post('publish-methode-image',
					{
						'loid': model.get('loid'),
						'nonce': wp.media.view.settings.nonce.publishImage
					}).done( function(data) {
						mtw.insertImage(s, a, c, model, true);
					})
					.fail( function(){
						mtw.insertImage(s, a, c, model, true);
					});
			})();
		},

		getImageUUID: function( loid ) {
			return wp.media.post('get-image-uuid',
				{
					'loid' : loid,
					'nonce': wp.media.view.settings.nonce.insertImage
				}
			);
		},

		getImagePath: function( uuid, model ) {
			var mtw = this;
			return wp.media.post( 'get-image-path',
				{
					'uuid' : uuid,
					'nonce': wp.media.view.settings.nonce.imagePath,
					'caption' : model.get('caption'),
					'img': model.get('url'),
					'imgSize': model.get('imgSize'),
					'attempt' : mtw.checkOrWreck + mtw.checkOrWreckTwo,
					'post_id': media.model.settings.post.id,
					'timeout': 20000
				}
			);
		},

		insertImage: function( sel, align, con, m, isPublish ) {
			var mtw = this;
			(function() {
				var s = sel,
				a = align,
				c = con,
				model = m||sel.models[0],
				loid = model.get('loid'),
				isPub = isPublish;
				mtw.getImageUUID(loid).done( function(uuid) {
					mtw.getImagePath(uuid, model).done( function(imgdata) {
						mtw.imageCheckedOut = true;

						var shortcode = [
							'[caption align="align' + a + '" width="' + imgdata.width + '" special="' + model.get('instructions') + '"]',
							'<img class="size-' + model.get('imgSize') + '" alt="' + model.get('caption').replace(/(\r\n|\n|\r)/gm,"") + '" src="' + imgdata.imgsrc + '" width="' + imgdata.width + '" height="' + imgdata.height + '" />',
							model.get('caption').replace(/(\r\n|\n|\r)/gm,""),
							'[/caption]' ];

							shortcode = shortcode.join('');
							c.trigger( 'insertFinish' );
							if( mtw.checkOrWreckTwo < 2 && mtw.checkOrWreck < 2 ) {
								media.editor.insert(shortcode);
							} else {
								MLZ.render(shortcode, '');
								MLZ.showHideEmbed();
							}
					}).fail( function(data) {
						//This will be a much shorter series of attemps,
						//don't want to hold up the line
						if( mtw.checkOrWreckTwo < 5 ) {
							MLZ.render('', mtw.checkOrWreckTwo);
							mtw.checkOrWreckTwo++;
							setTimeout( function() {
								mtw.insertImage( s, a, c, model);
							}, 10000);
						} else {
							//Three unsucessful attempts...probably something serious
							c.trigger( 'insertFinish' );
							MLZ.problem();
						}
					});
				}).fail( function(data){
					//This should be the real bouncer for whether or not something fails
					if( mtw.checkOrWreck < 5 ) {
						MLZ.render('', mtw.checkOrWreck);
						mtw.checkOrWreck++;
						setTimeout( function() {
							mtw.insertImage( s, a, c, model);
						}, 10000);
					} else {
						//Three unsucessful attempts...probably something serious
						c.trigger( 'insertFinish' );
						MLZ.problem();
					}
				});
			})();

			//This needs to be moved to whatever the close event of the controller is
			if( mtw.checkOrWreck > 1 && !con.options.closed ) {
				MLZ.render('', 1);
			}
		},

		// Runs on mtw:insert event fired by our custom toolbar
		insert: function( selection ) {
				var alignment = $('.attachment-display-settings .alignment').val(),
				size = $('.attachment-display-settings .size').val(),
				model = selection.models[0],
				mtw = this;

				model.set('imgSize', size);
			this.MTW.checkOrWreck = 1;
			this.MTW.checkOrWreckTwo = 1;
			this.MTW.fetchingImage = true;

			//Context is a child of the MediaFrame (we've extended
			//the media Frame with an MTW object, so access it by 
			//accessing the MTW object)
			
			//Chance's are there's a better place to stick this...
			$(window).on('beforeunload', function(){
				if( mtw.fetchingImage )
					return 'You\'re currently fetching an image.';
			});

			if( !model.get('firstPubDt') ) {
				this.MTW.pubImage( selection, alignment, this );
			} else {
				this.MTW.insertImage( selection, alignment, this );
			}

			return this;
		},

		// Create a custom toolbar
		createToolbar: function( toolbar ) {
			var controller = this;

			//Extend the current toolbar
			var insertAndPubToolbar = media.view.Toolbar.extend({
				refresh: function() {
					var state = this.controller.state('mtw'),
						library = state.get('library'),
						selection = state.get('selection');

					if( !selection.length )
						return false;

					var cur_selection = selection.models[0];
					/*_.each( this._views, function( button ) {
						if( !cur_selection.get('firstPubDt') ) {
							if( button.options.classes[0] == 'media-button-insert') {
								button.model.set('disabled', true );
							} else {
								button.model.set('disabled', false );
							}
						} else {
							if( button.options.classes[0] == 'media-button-publish') {
								button.model.set('disabled', true);
							} else {
								button.model.set('disabled', false);
							}
						}
					});*/
				}
			});

			this.toolbar.set( new insertAndPubToolbar({
				controller: this,
				items: {
					insert: {
						style:    'primary',
						text:     'Insert into post',
						priority: 80,
						//disabled: true,
						requires: {
							library: true,
							selection: true
						},

						click: function() {
							var state = controller.state(),
								selection = state.get('selection');

							if( selection.models.length > 0 ) {
								selection.models[0].set('caption', $('.attachment-details .setting[data-setting="caption"] textarea').val() );
								state.trigger( 'mtw:publish', selection ).reset();
								controller.trigger('insertFinish');
								controller.close();
							}
						}
					}
				}
			}));
		},

		//This code needs to move into the selection model
		deleteSelection: function() {
			var selection = this.state().get('selection');

			if( typeof selection != 'undefined' && selection.length ) {
				selection.reset();
			}
		},

		resetOpenVars: function() {
			this.options.closed = false;
		},

		resetClosingVars: function() {
			this.options.closed = true;
		}

	}});

	var MediaFrame = {};

	/**
	 * Extend the selection media frame
	 */
	MediaFrame.Select = media.view.MediaFrame.Select;
	media.view.MediaFrame.Select = MediaFrame.Select.extend({
		bindHandlers: function() {
			MediaFrame.Select.prototype.bindHandlers.apply( this, arguments );

			this.on( 'router:create:mtw', this.createRouter, this );
			this.on( 'router:activate:mtw', this.MTW.activate, this );
			this.on( 'router:deactivate:mtw', this.MTW.deactivate, this );

			this.on( 'toolbar:create:mtw-toolbar', this.MTW.createToolbar, this );
			this.on( 'mtw:insert', this.MTW.insert, this );
			this.on( 'mtw:publish', this.MTW.insert, this );

			this.on( 'deactivate', this.MTW.deleteSelection, this );
			this.on( 'activate', this.MTW.deleteSelection, this );
			this.on( 'selection:destory', this.MTW.deleteSelection, this );
			this.on( 'open', this.MTW.resetOpenVars, this );
			this.on( 'close', this.MTW.resetClosingVars, this );
			this.on( 'insertFinish', this.MTW.resetInsertVars, this );
		}
	});

	/**
	 * Extend the post editor media frame with our own
	 */
	MediaFrame.Post = media.view.MediaFrame.Post;
	media.view.MediaFrame.Post = MediaFrame.Post.extend({
		createStates: function() {
			MediaFrame.Post.prototype.createStates.apply( this, arguments );
			this.states.add([ new media.controller.MTW() ]);
		}
	});

	var MethodeMediaModal = Backbone.View.extend({
		className: 'mtw-image-container',
		template: media.template('mtw-image-modal'),

		render: function( controller ) {
			this.delegateEvents( {
				'click .mtw-media-modal' : 'closeModal'
			});

			this.model = controller.model;
			if( !this.$frame )
				this.$frame = $('.media-modal' );
			
			this.$el.html( this.template({ 'src': this.model.get('imgPath' ).replace('image_982w', 'image_606w')} ) );
			
			this.$modal = this.$('.mtw-media-modal');
			this.$frame.append( this.$el );
			this.$modal.slideDown( 'fast' );

			this.$el.find('.modal-image').load(function() {
				$('.image-loading').hide();
			});

			return this;
		},

		closeModal: function() {
			this.remove();
			return this;
		}
	});

	var MethodeLoadingZone = Backbone.View.extend({
		el: '#methode-media-loading-area',

		template: media.template('mlz-loading'),

		options: {
			not_showing: true
		},

		//Need to replace these arguments with a model
		render: function( embed_code, num ) {
			if( this.options.not_showing ) {
				$('#methodemedia_box').show();
				this.$el = $('#methode-media-loading-area');
				this.options.not_showing = false;
			}
			this.$el.html( this.template({ 'embed' : embed_code, 'num' : num }) );
			return this;
		},

		showHideEmbed: function() {

			var temp = this.$el;


			this.$loading_box = $('.mm-loading-embed-box');
			this.$embed_area = $('.mm-embed-code');
			this.$success = $('.mm-message-success');

			this.$loading_box.addClass('hidden');
			this.$embed_area.removeClass('hidden');
			this.$success.removeClass('hidden');

			this.$el.animate({
				'background-color': '#95ee6b'
			}, 400, 'swing', function() {
				temp.animate({
					'background-color': 'transparent'
				});
			});
		},

		problem: function() {

			var temp = this.$el;
			this.$loading_box = $('.mm-loading-embed-box');
			this.$failure = $('.mm-message-failure');
			this.$attempts = $('.mm-attempt-num');

			this.$attempts.addClass('hidden');
			this.$loading_box.addClass('hidden');
			this.$failure.removeClass('hidden');

			this.$el.animate({
				'background-color': '#FF4940'
			}, 400, 'swing', function() {
				temp.animate({
					'background-color': 'transparent'
				});
			});
		}

	});

	var MImageModal = new MethodeMediaModal();
	var MLZ = new MethodeLoadingZone();

})(jQuery);