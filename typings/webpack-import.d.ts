declare module '*.css' {
    const names: { [name: string]: string };
    export default names;
}

declare module '*.scss';

declare module "*.svg" {
    const content: string;
    export default content;
}

declare module "*.png" {
    const content: string;
    export default content;
}

declare module "*.jpg" {
    const content: string;
    export default content;
}
