import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from "@angular/animations";

export const leftLoadTrigger: AnimationTriggerMetadata =
    trigger( "loadLeft", [
        state( "in", style( { transform: "translateX(0)" } ) ),
        transition( "void => *", [
            style( { transform: "translateX(-20px)" } ),
            animate( 100 )
        ] )
    ] );

export const opacityLoadTrigger: AnimationTriggerMetadata =
    trigger( "opacityUp", [
        state( "in", style( { opacity: 1 } ) ),
        transition( "void => *", [
            style( { opacity: 0 } ),
            animate( 200 )
        ] )
    ] );

