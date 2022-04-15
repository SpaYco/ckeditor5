import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import InsertInfoCommand from './insertinfocommand';

export default class InfoEditing extends Plugin {
	static get requires() {
		return [Widget];
	}

	init() {
		this._defineSchema();
		this._defineConverters();

		this.editor.commands.add('insertInfo', new InsertInfoCommand(this.editor));
	}

	_defineSchema() {
		const schema = this.editor.model.schema;

		schema.register('info', {
			// Behaves like a self-contained object (e.g. an image).
			isObject: true,

			// Allow in places where other blocks are allowed (e.g. directly in the root).
			allowWhere: '$block'
		});

		schema.register('infoBody', {
			// Cannot be split or left by the caret.
			isLimit: true,

			allowIn: 'info',

			// Allow content which is allowed in the root (e.g. paragraphs).
			allowContentOf: '$root'
		});

		schema.addChildCheck((context, childDefinition) => {
			if (context.endsWith('infoBody') && childDefinition.name == 'info') {
				return false;
			}
		});
	}

	_defineConverters() {
		const conversion = this.editor.conversion;

		conversion.for('upcast').elementToElement({
			model: 'info',
			view: {
				name: 'div',
				classes: 'helpjuice-callout info'
			}
		});
		conversion.for('dataDowncast').elementToElement({
			model: 'info',
			view: {
				name: 'div',
				classes: 'helpjuice-callout info'
			}
		});
		conversion.for('editingDowncast').elementToElement({
			model: 'info',
			view: (modelElement, { writer: viewWriter }) => {
				const div = viewWriter.createContainerElement('div', { class: 'helpjuice-callout info' });

				return toWidget(div, viewWriter, { label: 'Insert Info Callout' });
			}
		});

		conversion.for('upcast').elementToElement({
			model: 'infoBody',
			view: {
				name: 'div',
				classes: 'helpjuice-callout-body'
			}
		});
		conversion.for('dataDowncast').elementToElement({
			model: 'infoBody',
			view: {
				name: 'div',
				classes: 'helpjuice-callout-body'
			}
		});
		conversion.for('editingDowncast').elementToElement({
			model: 'infoBody',
			view: (modelElement, { writer: viewWriter }) => {
				// Note: You use a more specialized createEditableElement() method here.
				const div = viewWriter.createEditableElement('div', { class: 'helpjuice-callout-body' });

				return toWidgetEditable(div, viewWriter);
			}
		});
	}
}