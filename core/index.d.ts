import { Core } from 'cytoscape';
export interface Area {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
}
export declare class EffectiveArea {
    private cy;
    private original;
    constructor(cy: Core);
    enable(effectiveAreaGetter: () => Area): void;
    disable(): void;
}
export default function extension(this: Core, effectiveAreaGetter: () => Area): EffectiveArea;
