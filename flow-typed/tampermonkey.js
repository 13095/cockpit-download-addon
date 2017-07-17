type Handler = (xhr: XMLHttpRequest) => void

type Details = {
  binary?: boolean;
  context?: any;
  data?: string;
  headers?: {
    [name: string]: string
  };
  method: 'GET' | 'HEAD' | 'POST';
  overrideMimeType?: string;
  password?: string;
  timeout?: number;
  upload?: Object;
  url: string;
  user?: string;
  onabort?: Handler;
  onerror?: Handler;
  onload?: Handler;
  onprogress?: Handler;
  onreadystatechange?: Handler;
  ontimeout?: Handler;
}

declare var GM_xmlhttpRequest: (details: Details) => void
