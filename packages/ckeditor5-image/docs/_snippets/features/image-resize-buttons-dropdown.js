/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* globals ClassicEditor, console, window, document */

import { CS_CONFIG } from '@ckeditor/ckeditor5-cloud-services/tests/_utils/cloud-services-config.js';

ClassicEditor
	.create( document.querySelector( '#snippet-image-resize-buttons-dropdown' ), {
		removePlugins: [ 'LinkImage', 'AutoImage' ],
		toolbar: {
			viewportTopOffset: window.getViewportTopOffsetConfig()
		},
		image: {
			resizeOptions: [
				{
					name: 'resizeImage:original',
					label: 'Original',
					value: null
				},
				{
					name: 'resizeImage:50',
					label: '50%',
					value: '50'
				},
				{
					name: 'resizeImage:75',
					label: '75%',
					value: '75'
				}
			],
			toolbar: [
				'imageStyle:inline',
				'imageStyle:wrapText',
				'imageStyle:breakText',
				'|',
				'resizeImage'
			]
		},
		cloudServices: CS_CONFIG
	} )
	.then( editor => {
		window.editorResizeUIDropdown = editor;
	} )
	.catch( err => {
		console.error( err );
	} );
