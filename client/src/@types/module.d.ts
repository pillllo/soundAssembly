declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module '*.png' {
  const url: string;
  export default url;
}