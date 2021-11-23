declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module '*.png' {
  const url: string;
  export default url;
}

declare module 'exact' {
  const exact: true;
  export default exact;
}


// declare module 'App' {

// }

// declare module 'Dashboard' {

// }