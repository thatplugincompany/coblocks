/* global coblocksLayoutSelector */
/**
 * External dependencies
 */
import { kebabCase } from 'lodash';

/**
 * WordPress dependencies
 */
import { controls } from '@wordpress/data-controls';
import memoize from 'memize';
import { createReduxStore, register, resolveSelect } from '@wordpress/data';

const DEFAULT_STATE = {
	categories: coblocksLayoutSelector.categories || [],
	computedLayouts: [],
	layoutUsage: {},
	layouts: coblocksLayoutSelector.layouts || [],
	selectedCategory: 'most-used',
	templateSelector: false,
};

// Module constants
const MILLISECONDS_PER_HOUR = 3600 * 1000;
const MILLISECONDS_PER_DAY = 24 * 3600 * 1000;
const MILLISECONDS_PER_WEEK = 7 * 24 * 3600 * 1000;

// Taken from Core: https://github.com/WordPress/gutenberg/blob/e41e4f62074fac964d5c92e8836e826e90b289f7/packages/block-editor/src/store/selectors.js#L1434
const calculateFrequency = memoize( ( time, count ) => {
	if ( ! time ) {
		return count;
	}

	const duration = Date.now() - time;

	switch ( true ) {
		case duration < MILLISECONDS_PER_HOUR:
			return count * 4;
		case duration < MILLISECONDS_PER_DAY:
			return count * 2;
		case duration < MILLISECONDS_PER_WEEK:
			return count / 2;
		default:
			return count / 4;
	}
} );

const actions = {
	closeTemplateSelector: () => ( { type: 'CLOSE_TEMPLATE_SELECTOR' } ),
	incrementLayoutUsage: ( layout ) => ( { type: 'INCREMENT_LAYOUT_USAGE', layout, time: Date.now() } ),
	openTemplateSelector: () => ( { type: 'OPEN_TEMPLATE_SELECTOR' } ),
	updateCategories: ( categories ) => ( { type: 'UPDATE_CATEGORIES', categories } ),
	updateComputedLayouts: ( computedLayouts ) => ( { type: 'UPDATE_COMPUTED_LAYOUTS', computedLayouts } ),
	updateLayouts: ( layouts ) => ( { type: 'UPDATE_LAYOUTS', layouts } ),
	updateSelectedCategory: ( selectedCategory ) => ( { type: 'UPDATE_CATEGORY', selectedCategory } ),
};

const store = createReduxStore( 'coblocks/template-selector', {
	reducer( state = DEFAULT_STATE, action ) {
		switch ( action.type ) {
			case 'OPEN_TEMPLATE_SELECTOR':
				return {
					...state,
					templateSelector: true,
				};
			case 'CLOSE_TEMPLATE_SELECTOR':
				return {
					...state,
					templateSelector: false,
				};
			case 'UPDATE_LAYOUTS':
				return {
					...state,
					layouts: action.layouts,
				};
			case 'UPDATE_COMPUTED_LAYOUTS':
				return {
					...state,
					computedLayouts: action.computedLayouts,
				};
			case 'UPDATE_CATEGORIES':
				return {
					...state,
					categories: action.categories,
				};
			case 'UPDATE_CATEGORY':
				return {
					...state,
					selectedCategory: action.selectedCategory,
				};
			case 'INCREMENT_LAYOUT_USAGE':
				const layoutSlug = kebabCase( action.layout.label );
				return {
					...state,
					layoutUsage: {
						...state.layoutUsage,
						[ layoutSlug ]: {
							count: state.layoutUsage[ layoutSlug ] ? state.layoutUsage[ layoutSlug ].count + 1 : 1,
							time: action.time,
						},
					},
				};
		}

		return state;
	},

	actions,

	selectors: {
		isTemplateSelectorActive: ( state ) => state.templateSelector,
		hasLayouts: ( state ) => !! state.layouts.length,
		getLayouts: ( state ) => {
			const layouts = state.layouts || [];

			return layouts.map( ( layout ) => {
				const { time, count = 0 } = state.layoutUsage[ kebabCase( layout.label ) ] || {};
				return {
					...layout,
					frequency: calculateFrequency( time, count ),
				};
			} );
		},
		getComputedLayouts: ( state ) => state.computedLayouts,
		getCategories: ( state ) => state.categories || [],
		hasCategories: ( state ) => !! state.categories.length,
		getSelectedCategory: ( state ) => state.selectedCategory,
		getLayoutUsage: ( state ) => state.layoutUsage,
	},

	controls,

	resolvers: {
		* isTemplateSelectorActive() {
			const isCleanNewPost = yield resolveSelect( 'core/editor', 'isCleanNewPost' );
			return isCleanNewPost && actions.openTemplateSelector();
		},
	},

	persist: [ 'layoutUsage' ],
} );

register( store );

export default store;
