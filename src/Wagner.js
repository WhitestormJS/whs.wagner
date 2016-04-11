/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * Wagner.
 *
 * @param {Object} type Type of wagner effect. (REQUIRED)
 * @param {Object} params Parameters. (OPTIONAL)
 * @return {Object} Scope.
 */


WHS.Wagner = class Wagner {

	constructor( scope ) {

	    scope._composer = new WAGNER.Composer(scope._renderer);
	    
	    scope._composer.setSize( 
            +(scope._settings.width * scope._settings.rWidth).toFixed(), 
            +(scope._settings.height * scope._settings.rHeight).toFixed()
        );

	    scope._composer.autoClearColor = true;

	    scope._composer.reset();
	    scope._composer.render(scope.scene, scope._camera);

	    scope._composer.stack = new WAGNER.Stack( new WAGNER.ShadersPool() );

	    this._settings = {
	    	composer: scope._composer
	    };

	}

	add(type, params) {

	    'use strict';

	    var target = WHS.API.extend(params, {
	        hex: 0x000000,
	        near: 0.015,
	        far: 1000,
	        density: 0.00025
	    });

	    switch (type) {
	        case "ZoomBlurPass":

	            target = WHS.API.extend(target, { 
	                strength: .05,

	                center: {
	                    x: .5 * this._settings.composer.width, y: .5 * this._settings.composer.height
	                }
	            });

	            break;

	        case "MultiPassBloomPass":

	            target = WHS.API.extend(target, { 
	                strength: .5,
	                blurAmount: 1.32,
	                applyZoomBlur: true,
	                zoomBlurStrength: 0.84,
	                useTexture: true,

	                center: {
	                    x: .5 * this._settings.composer.width,
	                    y: .5 * this._settings.composer.height
	                }
	            });

	            break;

	        case "VignettePass":

	            target = WHS.API.extend(target, { 
	                amount: 0.7,
	                falloff: 0.2
	            });

	            break;

	        case "DirectionalBlurPass":

	            target = WHS.API.extend(target, { delta: 0.1 });

	            break;

	        case "MotionBlurPass":

	            target = WHS.API.extend(target, { delta: 0 });

	            break;

	        case "ASCIIPass":

	        	// TODO: Params defaults for this effect.

	            break;

	        case "DotScreenPass":

	        	// TODO: Params defaults for this effect.

	            break;

	        case "FxaaPass":

	        	// TODO: Params defaults for this effect.

	            break;

	        case "ChromaticAberrationPass":

	        	// TODO: Params defaults for this effect.

	            break;

	        case "DirtPass":

	        	// TODO: Params defaults for this effect.

	            break;

	        case "EdgeDetectionPass":

	        	// TODO: Params defaults for this effect.

	            break;

	        case "HighPassPass":

	        	// TODO: Params defaults for this effect.

	            break;
	            
	        case "GrayscalePass":

	        	// TODO: Params defaults for this effect.

	            break;
	            
	        case "HalftonePass":

	        	// TODO: Params defaults for this effect.

	            break;
	            
	        case "InvertPass":

	        	// TODO: Params defaults for this effect.

	            break;

	        default:
	            console.warn("No Wagner effect \"" + type + "\" exists. If it should exist, open an issue. (@addWagner)");

	            return;
	    }

	    this._settings.composer.stack.addPass(type, true, target);

	    return this;
    
	}

}

WHS.World.prototype.Wagner = function() {
	return new WHS.Wagner( this );
}