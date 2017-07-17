interface Image {
  src: string;
  alt: string;
}

interface Source {
  type: 'image' | 'comic' | 'ugoira';
  title: string;
  author: string;
  images: Image[];
}

interface Illust {
  action: 'cockpit-download-addon';
  src: Source;
}
