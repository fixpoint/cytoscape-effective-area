import { Area, EffectiveArea } from './core';
export { Area, EffectiveArea };
export default function register(cy?: any): void;
declare global {
    interface Window {
        cytoscape?: any;
    }
}
import 'cytoscape';
declare module 'cytoscape' {
    interface Core {
        effectiveArea(effectiveAreaGetter: () => Area): EffectiveArea;
    }
}
